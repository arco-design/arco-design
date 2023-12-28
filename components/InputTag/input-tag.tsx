import React, {
  useContext,
  useState,
  useRef,
  useImperativeHandle,
  ElementRef,
  useEffect,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ConfigContext } from '../ConfigProvider';
import Tag from '../Tag';
import useMergeValue from '../_util/hooks/useMergeValue';
import cs from '../_util/classNames';
import InputComponent from '../Input/input-element';
import IconHover from '../_class/icon-hover';
import IconClose from '../../icon/react-icon/IconClose';
import { isObject, isArray } from '../_util/is';
import getHotkeyHandler from '../_util/getHotkeyHandler';
import { Backspace } from '../_util/keycode';
// import { pickTriggerPropsFromRest } from '../_util/constant';
import { ObjectValueType, InputTagProps, ValueChangeReason } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import Draggable from '../_class/Draggable';
import omit from '../_util/omit';
import fillNBSP from '../_util/fillNBSP';

const CSS_TRANSITION_DURATION = 300;
const REACT_KEY_FOR_INPUT = `__input_${Math.random().toFixed(10).slice(2)}`;

const isEmptyNode = (node: ReactNode): boolean => {
  return node === null || node === undefined;
};

const keepFocus = (e) => {
  e.target.tagName !== 'INPUT' && e.preventDefault();
};

const formatValue = (value: (ObjectValueType | string)[]) => {
  if (!isArray(value)) {
    return [];
  }
  return value.map((item) => {
    return isObject(item)
      ? {
          ...item,
          label: 'label' in item ? item.label : item.value,
          value: item.value,
          closable: item.closable,
        }
      : {
          label: item,
          value: item,
        };
  });
};

type InputTagHandle = {
  focus: () => void;
  blur: () => void;
};

// Deal with the delay of recomputing input width
const useComputeAutoWidthDelay = (value: InputTagProps<any>['value']) => {
  const refDelay = useRef(0);
  const refPrevValueLength = useRef(value.length);

  useEffect(() => {
    refDelay.current =
      value.length === 0 && refPrevValueLength.current > 0 ? CSS_TRANSITION_DURATION : 0;
    refPrevValueLength.current = value.length;
  }, [value]);

  return refDelay;
};

const UsedTransitionGroup = ({
  prefixCls,
  children,
  animation,
}: PropsWithChildren<{ prefixCls: string; animation: boolean }>) => {
  return animation ? (
    <TransitionGroup component="div" className={`${prefixCls}-inner`}>
      {children}
    </TransitionGroup>
  ) : (
    <div className={`${prefixCls}-inner`}>{children}</div>
  );
};

const defaultProps: InputTagProps = {
  animation: true,
  validate: (inputValue, values) => inputValue && values.every((item) => item.value !== inputValue),
};

function InputTag(baseProps: InputTagProps<string | ObjectValueType>, ref) {
  const { getPrefixCls, size: ctxSize, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<InputTagProps>(baseProps, defaultProps, componentConfig?.InputTag);
  const {
    className,
    style,
    placeholder,
    error,
    disabled,
    readOnly,
    allowClear,
    autoFocus,
    labelInValue,
    disableInput,
    animation,
    saveOnBlur,
    dragToSort,
    icon,
    prefix,
    suffix,
    addBefore,
    addAfter,
    tokenSeparators,
    validate,
    renderTag,
    tagClassName,
    onInputChange,
    onKeyDown,
    onPaste,
    onChange,
    onFocus,
    onBlur,
    onPressEnter,
    onRemove,
    onClear,
    onClick,
    ...rest
  } = props;
  const prefixCls = getPrefixCls('input-tag');
  const size = 'size' in props ? props.size : ctxSize;

  const refInput = useRef<ElementRef<typeof InputComponent>>();
  const refTSLastSeparateTriggered = useRef<number>(null);

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useMergeValue<ObjectValueType[]>([], {
    defaultValue: 'defaultValue' in props ? formatValue(props.defaultValue) : undefined,
    value: 'value' in props ? formatValue(props.value) : undefined,
  });
  const [inputValue, setInputValue] = useMergeValue('', {
    value: props.inputValue,
  });
  const refDelay = useComputeAutoWidthDelay(value);
  const draggable = !!(dragToSort && !readOnly && !disabled);

  useImperativeHandle<any, InputTagHandle>(
    ref,
    () => {
      return {
        blur: refInput.current?.blur,
        focus: refInput.current?.focus,
      };
    },
    []
  );

  const valueChangeHandler = (value: ObjectValueType[], reason: ValueChangeReason) => {
    if (disabled || readOnly) {
      return;
    }
    if (!('value' in props)) {
      setValue(value);
    }

    onChange && onChange(labelInValue ? value : value.map((x) => x.value), reason);
  };

  const tagCloseHandler = (itemValue: ObjectValueType, index: number, event) => {
    onRemove && onRemove(itemValue, index, event);
    valueChangeHandler([...value.slice(0, index), ...value.slice(index + 1)], 'remove');
  };

  const hotkeyHandler = getHotkeyHandler(
    new Map([
      [
        Backspace.code,
        (event) => {
          if (!event.target.value && value.length) {
            for (let index = value.length - 1; index >= 0; index--) {
              const itemValue = value[index];
              if (itemValue.closable !== false) {
                tagCloseHandler(itemValue, index, event);
                return;
              }
            }
          }
        },
      ],
    ])
  );

  const tryAddInputValueToTag = async () => {
    try {
      const validateResult =
        typeof validate === 'function' ? await validate(inputValue, value) : true;
      if (validateResult) {
        valueChangeHandler(
          value.concat({
            value: validateResult === true ? inputValue : validateResult,
            label: inputValue,
          }),
          'add'
        );
        setInputValue('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mergedRenderTag = (item: ObjectValueType, index: number) => {
    const { value: itemValue, label } = item;
    const closable = !readOnly && !disabled && item.closable !== false;
    const onClose = (event) => {
      tagCloseHandler(item, index, event);
    };

    if (renderTag) {
      return renderTag(
        {
          value: itemValue,
          label,
          closable,
          onClose,
        },
        index,
        value
      );
    }

    return (
      <Tag
        visible
        className={cs(`${prefixCls}-tag`, {
          [tagClassName]: tagClassName,
        })}
        closable={closable}
        closeIcon={icon && icon.removeIcon}
        __closeIconProps={{
          onMouseDown: keepFocus,
        }}
        title={typeof label === 'string' ? label : undefined}
        onClose={onClose}
      >
        {fillNBSP(label)}
      </Tag>
    );
  };

  const handleTokenSeparators = async (str: string) => {
    // clear the timestamp, and then we can judge whether tokenSeparators has been triggered
    // according to timestamp value
    refTSLastSeparateTriggered.current = null;

    if (isArray(tokenSeparators) && tokenSeparators.length) {
      const splitTextList = str.split(new RegExp(`[${tokenSeparators.join('')}]`));

      if (splitTextList.length > 1) {
        // record the timestamp of tokenSeparators triggered
        refTSLastSeparateTriggered.current = Date.now();

        const validatedValueList: ObjectValueType[] = [];

        await Promise.all(
          splitTextList.map(async (text) => {
            // filter empty string and validate it
            const validateResult = text
              ? typeof validate === 'function'
                ? await validate(text, value)
                : true
              : false;
            if (validateResult) {
              validatedValueList.push({
                value: validateResult === true ? text : validateResult,
                label: text,
              });
            }
          })
        );

        if (validatedValueList.length) {
          valueChangeHandler(value.concat(validatedValueList), 'add');
        }
      }
    }
  };

  const clearIcon =
    allowClear && !disabled && !readOnly && value.length ? (
      <IconHover
        size={size}
        key="clearIcon"
        className={`${prefixCls}-clear-icon`}
        onClick={(e) => {
          e.stopPropagation();
          valueChangeHandler([], 'clear');
          if (!focused) {
            refInput.current?.focus();
          }
          onClear?.();
        }}
      >
        {(icon && icon.clearIcon) || <IconClose />}
      </IconHover>
    ) : null;

  const disableInputComponent = disabled || disableInput;

  // CSSTransition needs to be a direct child of TransitionGroup, otherwise the animation will NOT work
  // https://github.com/arco-design/arco-design/issues/622
  const childrenWithAnimation = value
    .map((x, i) => {
      // Check whether two tags have same value. If so, set different key for them to avoid only rendering one tag.
      const isRepeat = value.findIndex((item) => item.value === x.value) !== i;
      const eleTag = mergedRenderTag(x, i);
      return React.isValidElement(eleTag) ? (
        <CSSTransition
          key={typeof x.value === 'object' ? i : isRepeat ? `${x.value}-${i}` : x.value}
          timeout={CSS_TRANSITION_DURATION}
          classNames="zoomIn"
        >
          {eleTag}
        </CSSTransition>
      ) : (
        eleTag
      );
    })
    .concat(
      <CSSTransition
        key={REACT_KEY_FOR_INPUT}
        timeout={CSS_TRANSITION_DURATION}
        classNames="zoomIn"
      >
        <InputComponent
          autoComplete="off"
          size={size}
          disabled={disableInputComponent}
          readOnly={readOnly}
          ref={refInput}
          autoFocus={autoFocus}
          placeholder={!value.length ? placeholder : ''}
          prefixCls={`${prefixCls}-input`}
          autoFitWidth={{
            delay: () => refDelay.current,
            pure: true,
          }}
          onPressEnter={async (e) => {
            inputValue && e.preventDefault();
            onPressEnter?.(e);
            await tryAddInputValueToTag();
          }}
          onFocus={(e) => {
            if (!disableInputComponent && !readOnly) {
              setFocused(true);
              onFocus?.(e);
            }
          }}
          onBlur={async (e) => {
            setFocused(false);
            onBlur?.(e);
            if (saveOnBlur) {
              await tryAddInputValueToTag();
            }
            setInputValue('');
          }}
          value={inputValue}
          onChange={(value, event) => {
            // Only fire callback on user input to ensure parent component can get real input value on controlled mode.
            onInputChange?.(value, event);

            // Pasting in the input box will trigger onPaste first and then onChange, but the value of onChange does not contain a newline character.
            // If word segmentation has just been triggered due to pasting, onChange will no longer attempt word segmentation.
            // Do NOT use await, need to update input value right away.
            event.nativeEvent.inputType !== 'insertFromPaste' && handleTokenSeparators(value);

            if (refTSLastSeparateTriggered.current) {
              setInputValue('');
            } else {
              setInputValue(value);
            }
          }}
          onKeyDown={(event) => {
            hotkeyHandler(event as any);
            onKeyDown?.(event);
          }}
          onPaste={(event) => {
            onPaste?.(event);
            handleTokenSeparators(event.clipboardData.getData('text'));
          }}
        />
      </CSSTransition>
    );

  const hasPrefix = !isEmptyNode(prefix);
  const hasSuffix = !isEmptyNode(suffix) || !isEmptyNode(clearIcon);
  const needAddBefore = !isEmptyNode(addBefore);
  const needAddAfter = !isEmptyNode(addAfter);
  const needWrapper = needAddBefore || needAddAfter;

  const status = props.status || (error ? 'error' : undefined);
  const innerClassNames = cs(prefixCls, {
    [`${prefixCls}-size-${size}`]: size,
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-${status}`]: status,
    [`${prefixCls}-focus`]: focused,
    [`${prefixCls}-readonly`]: readOnly,
    [`${prefixCls}-has-suffix`]: hasSuffix,
    [`${prefixCls}-has-placeholder`]: !value.length,
    [`${prefixCls}-rtl`]: rtl,
  });
  const propsAppliedToRoot = { style, className };

  const eleInputTagCore = (
    <div
      {...omit(rest, ['status', 'size', 'defaultValue', 'value', 'inputValue'])}
      {...(needWrapper ? {} : propsAppliedToRoot)}
      className={needWrapper ? innerClassNames : cs(innerClassNames, propsAppliedToRoot.className)}
      onMouseDown={(event) => {
        focused && keepFocus(event);
      }}
      onClick={(e) => {
        !focused && refInput.current?.focus();
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <div className={`${prefixCls}-view`}>
        {hasPrefix && (
          <div className={`${prefixCls}-prefix`} onMouseDown={keepFocus}>
            {prefix}
          </div>
        )}

        {draggable ? (
          <UsedTransitionGroup
            key="transitionGroupWithDrag"
            prefixCls={prefixCls}
            animation={animation}
          >
            <Draggable
              itemWrapperStyle={{ display: 'inline-block' }}
              direction="horizontal"
              onIndexChange={(index, prevIndex) => {
                const moveItem = function (arr, fromIndex, toIndex) {
                  arr = arr.slice();
                  const isMoveLeft = fromIndex > toIndex;
                  const [item] = arr.splice(fromIndex, 1);
                  arr.splice(isMoveLeft ? toIndex : toIndex - 1, 0, item);
                  return arr;
                };
                valueChangeHandler(moveItem(value, prevIndex, index), 'sort');
              }}
            >
              {childrenWithAnimation}
            </Draggable>
          </UsedTransitionGroup>
        ) : (
          <UsedTransitionGroup prefixCls={prefixCls} animation={animation}>
            {childrenWithAnimation}
          </UsedTransitionGroup>
        )}

        {hasSuffix && (
          <div className={`${prefixCls}-suffix`} onMouseDown={keepFocus}>
            {clearIcon}
            {suffix}
          </div>
        )}
      </div>
    </div>
  );

  if (!needWrapper) {
    return eleInputTagCore;
  }

  return (
    <div
      {...propsAppliedToRoot}
      className={cs(
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-rtl`]: rtl,
        },
        propsAppliedToRoot.className
      )}
    >
      {needAddBefore && <div className={`${prefixCls}-addbefore`}>{addBefore}</div>}
      {eleInputTagCore}
      {needAddAfter && <div className={`${prefixCls}-addafter`}>{addAfter}</div>}
    </div>
  );
}

const InputTagRef = React.forwardRef<InputTagHandle, InputTagProps<any>>(InputTag);

InputTagRef.displayName = 'InputTag';

export default InputTagRef;

export { InputTagProps };

import React, {
  useContext,
  useRef,
  useState,
  useImperativeHandle,
  CSSProperties,
  useMemo,
} from 'react';
import { TextAreaProps } from './interface';
import cs from '../_util/classNames';
import autoSizeTextAreaHeight from './autoSizeTextAreaHeight';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import { formatValue } from './input';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconClose from '../../icon/react-icon/IconClose';
import IconHover from '../_class/icon-hover';
import { isObject } from '../_util/is';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';
import useComposition from './useComposition';

const TextArea = (props: TextAreaProps, ref) => {
  const {
    className,
    style,
    wrapperStyle,
    placeholder,
    disabled,
    error,
    maxLength: propMaxLength,
    showWordLimit,
    allowClear,
    onChange,
    onClear,
    onKeyDown,
    onPressEnter,
    status,
    clearIcon,
    ...rest
  } = props;

  // Only for error judgement
  const wordLimitMaxLength = isObject(propMaxLength) ? propMaxLength.length : propMaxLength;
  // The real maxLength passed to input element
  const maxLength = isObject(propMaxLength)
    ? propMaxLength.errorOnly
      ? undefined
      : propMaxLength.length
    : propMaxLength;

  const textareaRef = useRef<HTMLTextAreaElement>();
  const [textAreaStyle, setTextAreaStyle] = useState<CSSProperties>({});
  const [value, setValue] = useMergeValue('', {
    defaultValue: 'defaultValue' in props ? formatValue(props.defaultValue, maxLength) : undefined,
    value: 'value' in props ? formatValue(props.value, maxLength) : undefined,
  });

  const {
    compositionValue,
    compositionHandler,
    valueChangeHandler,
    keyDownHandler,
    triggerValueChangeCallback,
  } = useComposition({
    value,
    maxLength,
    onChange,
    onKeyDown,
    onPressEnter,
    beforeTriggerValueChangeCallback: (v) => {
      if (!('value' in props) && (maxLength === undefined || v.length <= maxLength)) {
        setValue(v);
      }
    },
  });

  const textareaDisplayedText = compositionValue || value || '';
  const { getPrefixCls, rtl } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('textarea');
  if (disabled) {
    textAreaStyle.resize = 'none';
  }

  // set element focus and caret position
  const onFocus = () => {
    if (textareaRef.current && textareaRef.current.focus) {
      if (textareaRef.current.setSelectionRange) {
        const caretPos = textareaRef.current.textContent.length;
        // reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
        textareaRef.current.setSelectionRange(caretPos, caretPos);
      }
      textareaRef.current.focus();
    }
  };

  const resizeTextAreaHeight = () => {
    const textAreaStyle = autoSizeTextAreaHeight(props.autoSize, textareaRef.current);
    if (textAreaStyle) {
      setTextAreaStyle(textAreaStyle);
    }
  };

  const handleClearClick = (e) => {
    e.stopPropagation();
    onFocus();
    triggerValueChangeCallback('', e);
    onClear?.();
  };

  useIsomorphicLayoutEffect(() => {
    resizeTextAreaHeight();
  }, [textareaDisplayedText]);

  useImperativeHandle(
    ref,
    () => ({
      dom: textareaRef.current,
      focus: () => {
        onFocus();
      },
      blur: () => {
        textareaRef.current && textareaRef.current.blur && textareaRef.current.blur();
      },
    }),
    []
  );

  const valueLength = value ? value.length : 0;
  const withWrapper = (wordLimitMaxLength && showWordLimit) || allowClear;

  const lengthError = useMemo(() => {
    if (!maxLength && wordLimitMaxLength) {
      return valueLength > wordLimitMaxLength;
    }
    return false;
  }, [valueLength, wordLimitMaxLength, maxLength]);

  const inputStatus = status || (error || lengthError ? 'error' : undefined);

  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-${inputStatus}`]: inputStatus,
      // [`${prefixCls}-error`]: error || lengthError || status === 'error',
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );

  const TextAreaElement = (
    <textarea
      {...omit(rest, ['autoSize', 'defaultValue'])}
      maxLength={maxLength}
      ref={textareaRef}
      style={{ ...style, ...textAreaStyle }}
      className={classNames}
      placeholder={placeholder}
      disabled={disabled}
      value={textareaDisplayedText}
      onChange={valueChangeHandler}
      onKeyDown={keyDownHandler}
      onCompositionStart={compositionHandler}
      onCompositionUpdate={compositionHandler}
      onCompositionEnd={compositionHandler}
    />
  );

  if (withWrapper) {
    const showClearIcon = !disabled && allowClear && value;
    const [leftWord, rightWord] = rtl
      ? [wordLimitMaxLength, valueLength]
      : [valueLength, wordLimitMaxLength];
    return (
      <div
        className={cs(`${prefixCls}-wrapper`, {
          [`${prefixCls}-clear-wrapper`]: allowClear,
          [`${prefixCls}-wrapper-rtl`]: rtl,
        })}
        style={wrapperStyle}
      >
        {TextAreaElement}
        {showClearIcon ? (
          clearIcon !== undefined ? (
            <span
              className={`${prefixCls}-clear-icon`}
              onClick={handleClearClick}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              {clearIcon}
            </span>
          ) : (
            <IconHover className={`${prefixCls}-clear-icon`}>
              <IconClose
                onClick={handleClearClick}
                // keep focus status
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              />
            </IconHover>
          )
        ) : null}
        {wordLimitMaxLength && showWordLimit && (
          <span
            className={cs(`${prefixCls}-word-limit`, {
              [`${prefixCls}-word-limit-error`]: lengthError,
            })}
          >
            {leftWord}/{rightWord}
          </span>
        )}
      </div>
    );
  }

  return TextAreaElement;
};

export type RefTextAreaType = {
  /** 使输入框失去焦点 */
  blur: () => void;
  /** 使输入框获取焦点 */
  focus: () => void;
  /** textarea dom元素 */
  dom: HTMLTextAreaElement;
};

const TextAreaRef = React.forwardRef<RefTextAreaType, TextAreaProps>(TextArea);

TextAreaRef.displayName = 'TextArea';

export default TextAreaRef;

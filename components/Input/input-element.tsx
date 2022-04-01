import React, { useState, useRef, useImperativeHandle, useEffect } from 'react';
import { InputComponentProps, RefInputType } from './interface';
import cs from '../_util/classNames';
import omit from '../_util/omit';
import { Enter } from '../_util/keycode';
import ResizeObserver from '../_util/resizeObserver';
import IconClose from '../../icon/react-icon/IconClose';
import IconHover from '../_class/icon-hover';
import { isObject } from '../_util/is';

const InputComponent = React.forwardRef<RefInputType, InputComponentProps>(
  (props: InputComponentProps, ref) => {
    const {
      allowClear,
      error,
      disabled,
      placeholder,
      className,
      style,
      height,
      prefixCls,
      hasParent,
      size,
      value,
      autoFitWidth,
      onClear,
      readOnly,
      onValueChange,
      maxLength: propMaxLength,
      ...rest
    } = props;

    const otherProps = omit(rest, [
      'showWordLimit',
      'className',
      'defaultValue',
      'addBefore',
      'addAfter',
      'afterStyle',
      'beforeStyle',
      'onKeyDown',
      'onPressEnter',
      'prefix',
      'suffix',
    ]);

    const [compositionValue, setCompositionValue] = useState('');

    const refIsComposition = useRef(false);
    const refInput = useRef<HTMLInputElement>();
    const refInputMirror = useRef<HTMLSpanElement>();
    const refPrevInputWidth = useRef<number>(null);

    const maxLength = isObject(propMaxLength) ? propMaxLength.length : propMaxLength;
    const mergedMaxLength =
      isObject(propMaxLength) && propMaxLength.errorOnly ? undefined : maxLength;

    const inputClassNames = cs(
      prefixCls,
      prefixCls && {
        [`${prefixCls}-size-${size}`]: size,
        [`${prefixCls}-error`]: error,
        [`${prefixCls}-disabled`]: disabled,
      },
      hasParent ? undefined : className
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          dom: refInput.current,
          focus: () => {
            refInput.current && refInput.current.focus && refInput.current.focus();
          },
          blur: () => {
            refInput.current && refInput.current.blur && refInput.current.blur();
          },
        };
      },
      []
    );

    const updateInputWidth = () => {
      if (refInputMirror.current && refInput.current) {
        const width = refInputMirror.current.offsetWidth;
        refInput.current.style.width = `${width + (width ? 8 : 4)}px`;
      }
    };

    // 设定 <input> 初始宽度，之后的更新交由 ResizeObserver 触发
    useEffect(() => autoFitWidth && updateInputWidth(), []);

    const tryTriggerValueChangeCallback: typeof onValueChange = (newValue, e) => {
      if (
        onValueChange &&
        // https://github.com/arco-design/arco-design/issues/520
        // Avoid triggering onChange repeatedly for the same value
        // Compositionend is earlier than onchange in Firefox, different with chrome
        newValue !== value &&
        (mergedMaxLength === undefined || newValue.length <= mergedMaxLength)
      ) {
        onValueChange(newValue, e);
      }
    };

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e: any) => {
      const newValue = e.target.value;
      if (!refIsComposition.current) {
        compositionValue && setCompositionValue(undefined);
        tryTriggerValueChangeCallback(newValue, e);
      } else {
        // https://github.com/arco-design/arco-design/issues/397
        // compositionupdate => onchange
        refIsComposition.current = false;
        setCompositionValue(newValue);
      }
    };

    const onComposition = (e) => {
      refIsComposition.current = e.type !== 'compositionend';
      if (!refIsComposition.current) {
        setCompositionValue(undefined);
        tryTriggerValueChangeCallback(e.target.value, e);
      }
    };

    const onKeyDown = (e) => {
      const { onKeyDown, onPressEnter } = props;
      const keyCode = e.keyCode || e.which;

      if (refIsComposition.current) {
        return;
      }

      onKeyDown && onKeyDown(e);
      if (keyCode === Enter.code) {
        onPressEnter && onPressEnter(e);
      }
    };

    const inputProps = {
      'aria-invalid': error,
      ...otherProps,
      readOnly,
      maxLength: mergedMaxLength,
      value: compositionValue || value || '',
      disabled,
      placeholder,
      onChange,
      onKeyDown,
      className: inputClassNames,
      onCompositionStart: onComposition,
      onCompositionUpdate: onComposition,
      onCompositionEnd: onComposition,
    };

    const mirrorValue = inputProps.value || placeholder;

    return (
      <>
        {allowClear ? (
          <>
            <input ref={refInput} {...inputProps} />
            {!readOnly && !disabled && allowClear && value ? (
              <IconHover
                className={`${prefixCls}-clear-icon`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (refInput.current && refInput.current.focus) {
                    refInput.current.focus();
                  }
                  tryTriggerValueChangeCallback('', e);
                  onClear && onClear();
                }}
              >
                <IconClose
                  // keep focus status
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                />
              </IconHover>
            ) : null}
          </>
        ) : (
          <input
            ref={refInput}
            {...inputProps}
            style={hasParent ? {} : { ...style, ...('height' in props ? { height } : {}) }}
          />
        )}
        {autoFitWidth && (
          <ResizeObserver
            onResize={() => {
              const inputWidth = refInputMirror.current.offsetWidth;
              if (typeof autoFitWidth === 'object') {
                const delay =
                  typeof autoFitWidth.delay === 'function'
                    ? autoFitWidth.delay(inputWidth, refPrevInputWidth.current)
                    : autoFitWidth.delay;
                delay ? setTimeout(updateInputWidth, delay) : updateInputWidth();
              } else {
                updateInputWidth();
              }
              refPrevInputWidth.current = inputWidth;
            }}
          >
            <span className={`${prefixCls}-mirror`} ref={refInputMirror}>
              {mirrorValue && mirrorValue.replace(/\s/g, '\u00A0')}
            </span>
          </ResizeObserver>
        )}
      </>
    );
  }
);

InputComponent.displayName = 'InputComponent';

export default InputComponent;

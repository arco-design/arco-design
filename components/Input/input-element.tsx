import React, { useRef, useImperativeHandle, useEffect } from 'react';
import { InputComponentProps, RefInputType } from './interface';
import cs from '../_util/classNames';
import omit from '../_util/omit';
import ResizeObserver from '../_util/resizeObserver';
import IconClose from '../../icon/react-icon/IconClose';
import IconHover from '../_class/icon-hover';
import { isObject } from '../_util/is';
import useComposition from './useComposition';

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
      onChange,
      onKeyDown,
      onPressEnter,
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
      'prefix',
      'suffix',
    ]);

    const refInput = useRef<HTMLInputElement>();
    const refInputMirror = useRef<HTMLSpanElement>();
    const refPrevInputWidth = useRef<number>(null);

    const maxLength = isObject(propMaxLength)
      ? propMaxLength.errorOnly
        ? undefined
        : propMaxLength.length
      : propMaxLength;

    const {
      compositionValue,
      valueChangeHandler,
      compositionHandler,
      keyDownHandler,
      triggerValueChangeCallback,
    } = useComposition({ value, maxLength, onChange, onKeyDown, onPressEnter });

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

    const inputProps = {
      'aria-invalid': error,
      ...otherProps,
      readOnly,
      maxLength,
      disabled,
      placeholder,
      value: compositionValue || value || '',
      className: inputClassNames,
      onKeyDown: keyDownHandler,
      onChange: valueChangeHandler,
      onCompositionStart: compositionHandler,
      onCompositionUpdate: compositionHandler,
      onCompositionEnd: compositionHandler,
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
                  triggerValueChangeCallback('', e);
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

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
    const isComposition = useRef(false);
    const [compositionValue, setCompositionValue] = useState('');
    const refInput = useRef<HTMLInputElement>();
    const refInputMirror = useRef<HTMLSpanElement>();
    const refPrevInputWidth = useRef<number>(null);

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
      onValueChange,
      maxLength,
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

    const trueMaxLength = isObject(maxLength) ? maxLength.length : maxLength;
    const mergedMaxLength = isObject(maxLength) && maxLength.errorOnly ? undefined : trueMaxLength;

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e: any) => {
      const newValue = e.target.value;
      if (!isComposition.current) {
        if (!onValueChange) {
          return;
        }

        if (mergedMaxLength) {
          if (newValue.length <= trueMaxLength) {
            onValueChange(newValue, e);
          }
        } else {
          onValueChange(newValue, e);
        }
      } else {
        setCompositionValue(newValue);
      }
    };

    // 处理中文输入
    const onComposition = (e) => {
      if (e.type === 'compositionend') {
        isComposition.current = false;
        setCompositionValue(undefined);
        onValueChange && onValueChange(e.target.value, e);
      } else {
        isComposition.current = true;
      }
    };

    const onKeyDown = (e) => {
      const { onKeyDown, onPressEnter } = props;
      const keyCode = e.keyCode || e.which;

      if (isComposition.current) {
        return;
      }

      onKeyDown && onKeyDown(e);
      if (keyCode === Enter.code) {
        onPressEnter && onPressEnter(e);
      }
    };

    const inputProps = {
      ...otherProps,
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
            {!disabled && allowClear && value ? (
              <IconHover
                className={`${prefixCls}-clear-icon`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (refInput.current && refInput.current.focus) {
                    refInput.current.focus();
                  }
                  onValueChange && onValueChange('', e);
                  onClear && onClear();
                }}
                // keep focus status
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              >
                <IconClose />
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

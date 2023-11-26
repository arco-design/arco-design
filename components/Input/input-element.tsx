import React, { useRef, useImperativeHandle, useEffect, CSSProperties, useState } from 'react';
import { InputComponentProps, InputProps, RefInputType } from './interface';
import cs from '../_util/classNames';
import omit from '../_util/omit';
import ResizeObserver from '../_util/resizeObserver';
import IconClose from '../../icon/react-icon/IconClose';
import IconHover from '../_class/icon-hover';
import { isFunction, isObject } from '../_util/is';
import useComposition from './useComposition';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';
import fillNBSP from '../_util/fillNBSP';

// 设置 input 元素缓冲宽度，避免 autoWidth.minWidth < padding + border 时，content 区域宽度为0，光标会看不到
// 后续可考虑是否作为 autoWidth 的一个配置项暴露
const inputContentWidth = 2;

// 从 input 标签获取影响到宽度计算的"文本样式属性"和“布局”属性 https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text
// 为什么不是直接把 input 标签的类名设置给 mirror 元素？避免用户对 input 类名自定义样式会影响到 mirror
// 仅在 mounted 的时候执行一次
const getStyleFromInput = (input: HTMLElement): CSSProperties => {
  if (!input) {
    return {};
  }
  const computeStyle = window.getComputedStyle(input);

  const cssKeys = [
    'font',
    'letterSpacing',
    'overflow',
    'tabSize',
    'textIndent',
    'textTransform',
    'whiteSpace',
    'wordBreak',
    'wordSpacing',
    'paddingLeft',
    'paddingRight',
    'borderLeft',
    'borderRight',
    'boxSizing',
  ];

  return cssKeys.reduce((t, n) => {
    t[n] = computeStyle[n];
    return t;
  }, {});
};

const InputComponent = React.forwardRef<RefInputType, InputComponentProps>(
  (props: InputComponentProps, ref) => {
    const {
      allowClear,
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
      clearIcon,
      ...rest
    } = props;

    const otherProps = omit(rest, [
      'error',
      'status',
      'showWordLimit',
      'className',
      'defaultValue',
      'addBefore',
      'addAfter',
      'afterStyle',
      'beforeStyle',
      'prefix',
      'suffix',
      'normalize',
      'normalizeTrigger',
      'autoWidth',
    ]);

    const [inputComputeStyle, setInputComputeStyle] = useState<CSSProperties>();

    const getKeyboardEvents = useKeyboardEvent();
    const refInput = useRef<HTMLInputElement>();
    const refInputMirror = useRef<HTMLSpanElement>();
    const refPrevInputWidth = useRef<number>(null);

    const maxLength = isObject(propMaxLength)
      ? propMaxLength.errorOnly
        ? undefined
        : propMaxLength.length
      : propMaxLength;

    const normalizeHandler = (type: InputProps['normalizeTrigger'][number]) => {
      let handler;
      const normalizeTrigger = props.normalizeTrigger || ['onBlur'];
      if (
        Array.isArray(normalizeTrigger) &&
        normalizeTrigger.indexOf(type) > -1 &&
        isFunction(props.normalize)
      ) {
        handler = props.normalize;
      }
      return handler;
    };

    const {
      compositionValue,
      valueChangeHandler,
      compositionHandler,
      keyDownHandler,
      triggerValueChangeCallback,
    } = useComposition({
      value,
      maxLength,
      onChange,
      onKeyDown,
      onPressEnter,
      normalizeHandler,
    });

    const inputClassNames = cs(
      prefixCls,
      prefixCls && {
        [`${prefixCls}-size-${size}`]: size,
        [`${prefixCls}-${props.status}`]: props.status,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-autowidth`]: autoFitWidth,
      },
      hasParent ? undefined : className
    );
    const inputProps = {
      'aria-invalid': props.status === 'error' || undefined,
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
      onBlur: (e) => {
        props.onBlur?.(e);
        const normalize = normalizeHandler('onBlur');
        normalize && triggerValueChangeCallback(normalize(e.target.value), e);
      },
    };

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

        refInput.current.style.width = `${width + inputContentWidth}px`;
      }
    };

    // Set the initial width of <input>, and subsequent updates are triggered by ResizeObserver
    useEffect(() => {
      if (autoFitWidth) {
        if (!isObject(autoFitWidth) || !autoFitWidth.pure) {
          setInputComputeStyle(getStyleFromInput(refInput?.current));
        }
        updateInputWidth();
      }
    }, [autoFitWidth]);

    // Here also need placeholder to trigger updateInputWidth after user-input is cleared
    const mirrorValue = inputProps.value || placeholder;

    const handleClear = (e) => {
      if (refInput.current && refInput.current.focus) {
        refInput.current.focus();
      }
      triggerValueChangeCallback('', e);
      onClear?.();
    };

    return (
      <>
        {allowClear ? (
          <>
            <input ref={refInput} {...inputProps} />
            {!readOnly && !disabled && allowClear && value ? (
              clearIcon !== undefined ? (
                <span
                  tabIndex={0}
                  className={`${prefixCls}-clear-icon`}
                  {...getKeyboardEvents({ onPressEnter: handleClear })}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear(e);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  {clearIcon}
                </span>
              ) : (
                <IconHover
                  tabIndex={0}
                  className={`${prefixCls}-clear-icon`}
                  {...getKeyboardEvents({ onPressEnter: handleClear })}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear(e);
                  }}
                >
                  <IconClose
                    // keep focus status
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </IconHover>
              )
            ) : null}
          </>
        ) : (
          <input
            ref={refInput}
            {...inputProps}
            style={
              hasParent
                ? {}
                : {
                    minWidth: isObject(autoFitWidth) ? autoFitWidth.minWidth : undefined,
                    maxWidth: isObject(autoFitWidth) ? autoFitWidth.maxWidth : undefined,
                    ...style,
                    ...('height' in props ? { height } : {}),
                  }
            }
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
            <span
              className={cs(`${prefixCls}-mirror`)}
              style={
                hasParent
                  ? inputComputeStyle
                  : {
                      ...inputComputeStyle,
                      ...style,
                      ...('height' in props ? { height } : {}),
                    }
              }
              ref={refInputMirror}
            >
              {fillNBSP(mirrorValue)}
            </span>
          </ResizeObserver>
        )}
      </>
    );
  }
);

InputComponent.displayName = 'InputComponent';

export default InputComponent;

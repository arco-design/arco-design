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
import { Enter } from '../_util/keycode';
import autoSizeTextAreaHeight from './autoSizeTextAreaHeight';
import omit from '../_util/omit';
import { ConfigContext } from '../ConfigProvider';
import { formatValue } from './input';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconClose from '../../icon/react-icon/IconClose';
import IconHover from '../_class/icon-hover';
import { isObject } from '../_util/is';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';

const TextArea = (props: TextAreaProps, ref) => {
  const {
    className,
    style,
    wrapperStyle,
    placeholder,
    disabled,
    error,
    maxLength,
    showWordLimit,
    allowClear,
    onClear,
    ...rest
  } = props;

  const trueMaxLength = isObject(maxLength) ? maxLength.length : maxLength;
  const mergedMaxLength = isObject(maxLength) && maxLength.errorOnly ? undefined : trueMaxLength;

  const isComposition = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>();
  const [compositionValue, setCompositionValue] = useState('');
  const [textAreaStyle, setTextAreaStyle] = useState<CSSProperties>({});
  const [value, setValue] = useMergeValue('', {
    defaultValue:
      'defaultValue' in props ? formatValue(props.defaultValue, mergedMaxLength) : undefined,
    value: 'value' in props ? formatValue(props.value, mergedMaxLength) : undefined,
  });

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('textarea');
  if (disabled) {
    textAreaStyle.resize = 'none';
  }

  // set element focus and caret position
  const onFocus = () => {
    if (textareaRef.current && textareaRef.current.focus) {
      const caretPos = textareaRef.current.textContent.length;
      // reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
      textareaRef.current.setSelectionRange(caretPos, caretPos);
      textareaRef.current.focus();
    }
  };

  const handleChangeValue = (value, e) => {
    const { onChange } = props;
    if (!('value' in props)) {
      setValue(value);
    }
    onChange && onChange(value, e);
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const newValue = e.currentTarget.value;
    if (!isComposition.current) {
      if (mergedMaxLength) {
        if (newValue.length <= trueMaxLength) {
          handleChangeValue(newValue, e);
        }
      } else {
        handleChangeValue(newValue, e);
      }
    } else {
      setCompositionValue(newValue);
    }
  };

  const onComposition = (e) => {
    if (e.type === 'compositionend') {
      isComposition.current = false;
      setCompositionValue(undefined);
      handleChangeValue(e.target.value, e);
    } else {
      isComposition.current = true;
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
    handleChangeValue('', e);
    onClear && onClear();
  };

  useIsomorphicLayoutEffect(() => {
    resizeTextAreaHeight();
  }, [value]);

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

  const withWrapper = (trueMaxLength && showWordLimit) || allowClear;

  const lengthError = useMemo(() => {
    if (!mergedMaxLength && trueMaxLength) {
      return valueLength > trueMaxLength;
    }
    return false;
  }, [valueLength, trueMaxLength, mergedMaxLength]);

  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-error`]: error || lengthError,
      [`${prefixCls}-disabled`]: disabled,
    },
    className
  );

  const TextAreaElement = (
    <textarea
      {...omit(rest, ['autoSize', 'defaultValue', 'onPressEnter'])}
      maxLength={mergedMaxLength}
      ref={textareaRef}
      style={{ ...style, ...textAreaStyle }}
      className={classNames}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={(e) => {
        const { onKeyDown, onPressEnter } = props;
        const keyCode = e.keyCode || e.which;
        onKeyDown && onKeyDown(e);
        if (keyCode === Enter.code) {
          onPressEnter && onPressEnter(e);
        }
      }}
      onCompositionStart={onComposition}
      onCompositionUpdate={onComposition}
      onCompositionEnd={onComposition}
      value={compositionValue || value || ''}
    />
  );

  if (withWrapper) {
    const showClearIcon = !disabled && allowClear && value;
    return (
      <div
        className={cs(`${prefixCls}-wrapper`, {
          [`${prefixCls}-clear-wrapper`]: allowClear,
        })}
        style={wrapperStyle}
      >
        {TextAreaElement}
        {showClearIcon ? (
          <IconHover className={`${prefixCls}-clear-icon`}>
            <IconClose
              onClick={handleClearClick}
              // keep focus status
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            />
          </IconHover>
        ) : null}
        {trueMaxLength && showWordLimit && (
          <span
            className={cs(`${prefixCls}-word-limit`, {
              [`${prefixCls}-word-limit-error`]: lengthError,
            })}
          >
            {valueLength}/{trueMaxLength}
          </span>
        )}
      </div>
    );
  }

  return TextAreaElement;
};

const TextAreaRef = React.forwardRef<unknown, TextAreaProps>(TextArea);

TextAreaRef.displayName = 'TextArea';

export default TextAreaRef;

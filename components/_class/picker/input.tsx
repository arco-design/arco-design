import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
  CSSProperties,
  ReactNode,
  useState,
} from 'react';
import { Dayjs } from 'dayjs';
import usePickerFocused from '../../DatePicker/hooks/usePickerFocused';
import omit from '../../_util/omit';
import { Enter, Esc } from '../../_util/keycode';
import { ConfigContext } from '../../ConfigProvider';
import IconClose from '../../../icon/react-icon/IconClose';
import IconHover from '../../_class/icon-hover';
import cs from '../../_util/classNames';
import { isArray } from '../../_util/is';

export interface DateInputProps {
  style?: CSSProperties;
  className?: string | string[];
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: Dayjs;
  inputValue?: string;
  popupVisible?: boolean;
  format?: string | ((value: Dayjs) => string);
  prefixCls?: string;
  size?: 'mini' | 'small' | 'default' | 'large';
  allowClear?: boolean;
  onClear?: (e) => void;
  editable?: boolean;
  onPressEnter?: () => void;
  onPressEsc?: () => void;
  onChange?: (e) => void;
  suffixIcon?: ReactNode;
  isPlaceholder?: boolean;
}

type DateInputHandle = {
  focus: () => void;
  blur: () => void;
  setFocused: (focused: boolean) => void;
};

function DateInput(
  {
    style,
    className,
    prefixCls: propPrefixCls,
    allowClear,
    error,
    disabled,
    placeholder,
    format,
    size: propSize,
    onClear,
    editable,
    value,
    inputValue,
    onPressEnter,
    onPressEsc,
    suffixIcon,
    onChange,
    popupVisible,
    isPlaceholder,
    ...rest
  }: DateInputProps,
  ref
) {
  const { getPrefixCls, size: ctxSize, locale, rtl } = useContext(ConfigContext);
  const input = useRef<HTMLInputElement>(null);
  const size = propSize || ctxSize;
  const [focused, setFocused] = useState(false);

  useImperativeHandle<any, DateInputHandle>(ref, () => ({
    focus() {
      input.current && input.current.focus && input.current.focus();
    },
    blur() {
      input.current && input.current.blur && input.current.blur();
    },
    setFocused(val) {
      setFocused(val);
    },
  }));

  function onKeyDown(e) {
    const keyCode = e.keyCode || e.which;
    switch (keyCode) {
      case Enter.code: {
        onPressEnter && onPressEnter();
        break;
      }
      case Esc.code: {
        onPressEsc && onPressEsc();
        break;
      }
      default:
        break;
    }
  }

  let showValue = '';
  if (inputValue !== undefined) {
    showValue = inputValue;
  } else if (value && !isArray(value)) {
    showValue =
      typeof format === 'function'
        ? format(value)
        : value.locale(locale.dayjsLocale).format(format);
  }

  const readOnlyProps = editable ? {} : { readOnly: true };

  const prefixCls = propPrefixCls || getPrefixCls('picker');
  const classNames = cs(
    prefixCls,
    `${prefixCls}-size-${size}`,
    {
      [`${prefixCls}-focused`]: focused,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-error`]: error,
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );

  usePickerFocused(
    (e) => {
      if (e.target === input.current) {
        setFocused(true);
      } else {
        setFocused(false);
      }
    },
    popupVisible,
    setFocused
  );

  return (
    <div style={style} className={classNames} {...omit(rest, ['onChange', 'onPressEnter'])}>
      <div
        className={cs(`${prefixCls}-input`, { [`${prefixCls}-input-placeholder`]: isPlaceholder })}
      >
        <input
          ref={input}
          disabled={disabled}
          placeholder={placeholder}
          className={`${prefixCls}-start-time`}
          value={showValue}
          onKeyDown={onKeyDown}
          onChange={onChange}
          {...readOnlyProps}
        />
      </div>
      <div className={`${prefixCls}-suffix`}>
        {allowClear && showValue && (
          <IconHover prefix={prefixCls} onClick={onClear} className={`${prefixCls}-clear-icon`}>
            <IconClose />
          </IconHover>
        )}
        <span className={`${prefixCls}-suffix-icon`}>{suffixIcon}</span>
      </div>
    </div>
  );
}

export default forwardRef<DateInputHandle, DateInputProps>(DateInput);

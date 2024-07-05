import React, {
  useRef,
  useImperativeHandle,
  useContext,
  forwardRef,
  CSSProperties,
  ReactNode,
  useState,
} from 'react';
import { Dayjs } from 'dayjs';
import IconClose from '../../../icon/react-icon/IconClose';
import IconHover from '../../_class/icon-hover';
import cs from '../../_util/classNames';
import { Enter, Tab } from '../../_util/keycode';
import omit from '../../_util/omit';
import { ConfigContext } from '../../ConfigProvider';
import { isArray } from '../../_util/is';

export interface DateInputRangeProps {
  style?: CSSProperties;
  className?: string | string[];
  error?: boolean;
  status?: 'error' | 'warning';
  disabled?: boolean | boolean[];
  placeholder?: string[];
  value?: Dayjs[];
  popupVisible?: boolean;
  format?: string | string[];
  size?: 'mini' | 'small' | 'default' | 'large';
  allowClear?: boolean;
  onClear?: (e) => void;
  onPressEnter?: () => void;
  onPressTab?: (e) => void;
  editable?: boolean;
  suffixIcon?: ReactNode;
  onChange?: (e) => void;
  inputValue?: string;
  separator?: ReactNode;
  changeFocusedInputIndex?: (index: number, silent?: boolean) => void;
  focusedInputIndex?: number;
  isPlaceholder?: boolean;
  prefix?: ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>[];
  onBlur?: (e) => void;
}

type DateInputHandle = {
  focus: () => void;
  blur: () => void;
};

function DateInput(
  {
    allowClear,
    error,
    status,
    style,
    className,
    disabled,
    placeholder = [],
    value = [],
    popupVisible,
    format,
    size: propSize,
    onClear,
    editable,
    inputValue,
    onPressEnter,
    onPressTab,
    onChange,
    separator,
    suffixIcon,
    changeFocusedInputIndex,
    focusedInputIndex,
    isPlaceholder,
    prefix,
    inputProps = [],
    onBlur,
    ...rest
  }: DateInputRangeProps,
  ref
) {
  const { getPrefixCls, size: ctxSize, locale, rtl } = useContext(ConfigContext);
  const input0 = useRef<HTMLInputElement>(null);
  const input1 = useRef<HTMLInputElement>(null);
  const refRootWrapper = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState([false, false]);

  const disabled1 = isArray(disabled) ? disabled[0] : disabled;
  const disabled2 = isArray(disabled) ? disabled[1] : disabled;

  useImperativeHandle<any, DateInputHandle>(ref, () => ({
    focus(index?: number) {
      const focusedIndex = typeof index === 'number' ? index : focusedInputIndex;
      const focusElement = focusedIndex === 0 ? input0 : input1;
      if ((focusedInputIndex === 0 && !disabled1) || (focusedInputIndex === 1 && !disabled2)) {
        focusElement.current && focusElement.current.focus && focusElement.current.focus();
      }
    },
    blur() {
      if (focusedInputIndex === 0) {
        input0.current && input0.current.blur && input0.current.blur();
      }
      if (focusedInputIndex === 1) {
        input1.current && input1.current.blur && input1.current.blur();
      }
    },
    getRootDOMNode: () => {
      return refRootWrapper.current;
    },
  }));

  function changeFocusedInput(e, index: number) {
    inputProps?.[index]?.onClick?.(e);

    if (focusedInputIndex !== index) {
      changeFocusedInputIndex(index);
    }
  }

  function onKeyDown(e, index) {
    const keyCode = e.keyCode || e.which;

    inputProps?.[index]?.onKeyDown?.(e);

    if (keyCode === Enter.code) {
      onPressEnter?.();
    }
    if (keyCode === Tab.code) {
      // e.preventDefault(); // fix: cannot move focus away from the component with tab
      onPressTab && onPressTab(e);
    }
  }

  function onChangeInput(e, index) {
    e.stopPropagation();
    inputProps?.[index]?.onChange?.(e);
    onChange && onChange(e);
  }

  function onBlurInput(e, index) {
    setFocused((prev) => {
      prev[index] = false;
      return [...prev];
    });
    inputProps?.[index]?.onBlur?.(e);
    onBlur?.(e);
  }

  function onFocusInput(e, index) {
    if ((index === 0 && !disabled1 && editable) || (index === 1 && !disabled2 && editable)) {
      setFocused((prev) => {
        prev[index] = true;
        return [...prev];
      });
      if (focusedInputIndex !== index) {
        changeFocusedInputIndex(index, true);
      }
    }
    inputProps?.[index]?.onFocus?.(e);
  }

  const prefixCls = getPrefixCls('picker');
  const size = propSize || ctxSize;

  const mergedFocused = focused[0] || focused[1] || !!popupVisible;
  const inputStatus = status || (error ? 'error' : undefined);
  const inputClassNames = cs(
    prefixCls,
    `${prefixCls}-range`,
    `${prefixCls}-size-${size}`,
    {
      [`${prefixCls}-focused`]: mergedFocused,
      [`${prefixCls}-disabled`]: disabled1 && disabled2,
      [`${prefixCls}-${inputStatus}`]: inputStatus,
      [`${prefixCls}-rtl`]: rtl,
      [`${prefixCls}-has-prefix`]: prefix,
    },
    className
  );
  const getInputValue = (index: number) => {
    const valueText = value[index]
      ? value[index].locale(locale.dayjsLocale).format(isArray(format) ? format[index] : format)
      : '';
    if (inputValue) {
      return index === focusedInputIndex ? inputValue : valueText;
    }
    return valueText;
  };
  const readOnlyProps = editable ? {} : { readOnly: true };

  function getFocusInputClassName(index: number) {
    return cs(`${prefixCls}-input`, {
      [`${prefixCls}-input-active`]: focusedInputIndex === index,
      [`${prefixCls}-input-placeholder`]: isPlaceholder && focusedInputIndex === index,
    });
  }

  return (
    <div
      style={style}
      ref={refRootWrapper}
      className={inputClassNames}
      {...omit(rest, ['onChange', 'onPressEnter'])}
    >
      {prefix && <div className={`${prefixCls}-prefix`}>{prefix}</div>}
      <div className={getFocusInputClassName(0)}>
        <input
          ref={input0}
          {...inputProps[0]}
          disabled={disabled1}
          placeholder={placeholder[0]}
          value={getInputValue(0)}
          onChange={(e) => onChangeInput(e, 0)}
          onKeyDown={(e) => onKeyDown(e, 0)}
          onClick={(e) => changeFocusedInput(e, 0)}
          onBlur={(e) => onBlurInput(e, 0)}
          onFocus={(e) => onFocusInput(e, 0)}
          {...readOnlyProps}
        />
      </div>
      <span className={`${prefixCls}-separator`}>{separator || '-'}</span>
      <div className={getFocusInputClassName(1)}>
        <input
          ref={input1}
          {...inputProps[1]}
          disabled={disabled2}
          placeholder={placeholder[1]}
          value={getInputValue(1)}
          onChange={(e) => onChangeInput(e, 1)}
          onKeyDown={(e) => onKeyDown(e, 1)}
          onClick={(e) => changeFocusedInput(e, 1)}
          onBlur={(e) => onBlurInput(e, 1)}
          onFocus={(e) => onFocusInput(e, 1)}
          {...readOnlyProps}
        />
      </div>
      <div className={`${prefixCls}-suffix`}>
        {allowClear && value.length === 2 && (
          <IconHover prefix={prefixCls} onClick={onClear} className={`${prefixCls}-clear-icon`}>
            <IconClose />
          </IconHover>
        )}
        <span className={`${prefixCls}-suffix-icon`}>{suffixIcon}</span>
      </div>
    </div>
  );
}

export default forwardRef<DateInputHandle, DateInputRangeProps>(DateInput);

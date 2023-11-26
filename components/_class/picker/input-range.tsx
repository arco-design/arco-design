import React, {
  useRef,
  useImperativeHandle,
  useContext,
  forwardRef,
  CSSProperties,
  ReactNode,
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
  changeFocusedInputIndex?: (index: number) => void;
  focusedInputIndex?: number;
  isPlaceholder?: boolean;
  prefix?: ReactNode;
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
    ...rest
  }: DateInputRangeProps,
  ref
) {
  const { getPrefixCls, size: ctxSize, locale, rtl } = useContext(ConfigContext);
  const input0 = useRef<HTMLInputElement>(null);
  const input1 = useRef<HTMLInputElement>(null);

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
  }));

  function changeFocusedInput(index: number) {
    if (focusedInputIndex !== index) {
      changeFocusedInputIndex(index);
    }
  }

  function onKeyDown(e) {
    const keyCode = e.keyCode || e.which;
    if (keyCode === Enter.code) {
      onPressEnter?.();
    }
    if (keyCode === Tab.code) {
      e.preventDefault();
      onPressTab && onPressTab(e);
    }
  }

  function onChangeInput(e) {
    e.stopPropagation();
    onChange && onChange(e);
  }

  const prefixCls = getPrefixCls('picker');
  const size = propSize || ctxSize;

  const inputStatus = status || (error ? 'error' : undefined);
  const inputClassNames = cs(
    prefixCls,
    `${prefixCls}-range`,
    `${prefixCls}-size-${size}`,
    {
      [`${prefixCls}-focused`]: !!popupVisible,
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
    <div style={style} className={inputClassNames} {...omit(rest, ['onChange', 'onPressEnter'])}>
      {prefix && <div className={`${prefixCls}-prefix`}>{prefix}</div>}
      <div className={getFocusInputClassName(0)}>
        <input
          ref={input0}
          disabled={disabled1}
          placeholder={placeholder[0]}
          value={getInputValue(0)}
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          onClick={() => changeFocusedInput(0)}
          {...readOnlyProps}
        />
      </div>
      <span className={`${prefixCls}-separator`}>{separator || '-'}</span>
      <div className={getFocusInputClassName(1)}>
        <input
          ref={input1}
          disabled={disabled2}
          placeholder={placeholder[1]}
          value={getInputValue(1)}
          onChange={onChangeInput}
          onKeyDown={onKeyDown}
          onClick={() => changeFocusedInput(1)}
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

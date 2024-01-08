import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import IconUp from '../../icon/react-icon/IconUp';
import IconDown from '../../icon/react-icon/IconDown';
import IconPlus from '../../icon/react-icon/IconPlus';
import IconMinus from '../../icon/react-icon/IconMinus';
import { isNumber } from '../_util/is';
import cs from '../_util/classNames';
import { ArrowUp, ArrowDown } from '../_util/keycode';
import { ConfigContext } from '../ConfigProvider';
import Input, { InputProps } from '../Input';
import { RefInputType } from '../Input/interface';
import { InputNumberProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import omit from '../_util/omit';
import useSelectionRange from './useSelectionRange';
import { getDecimal, Decimal } from './Decimal';

// Value's auto change speed when user holds on plus or minus
const AUTO_CHANGE_INTERVAL = 200;

// Delay to auto change value when user holds on plus or minus
const AUTO_CHANGE_START_DELAY = 1000;

type StepMethods = 'minus' | 'plus';

const defaultProps: InputNumberProps = {
  max: Infinity,
  min: -Infinity,
  step: 1,
  mode: 'embed',
  parser: (input) => input?.replace(/[^\w\.-]+/g, '') || '',
};

function InputNumber(baseProps: InputNumberProps, ref) {
  const { getPrefixCls, size: ctxSize, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<InputNumberProps>(
    baseProps,
    defaultProps,
    componentConfig?.InputNumber
  );
  const {
    className,
    style,
    defaultValue,
    disabled,
    error,
    readOnly,
    strictMode,
    placeholder,
    hideControl,
    suffix,
    prefix,
    icons,
    mode,
    size,
    step,
    precision,
    min,
    max,
    parser,
    formatter,
    onBlur,
    onFocus,
    onChange,
    onKeyDown,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('input-number');
  const mergedSize = size || ctxSize;
  const mergedPrecision = (() => {
    if (isNumber(precision)) {
      const decimal = `${step}`.split('.')[1];
      const stepPrecision = (decimal && decimal.length) || 0;
      return Math.max(stepPrecision, precision);
    }
    return null;
  })();

  const [innerValue, setInnerValue] = useState<Decimal>(() => {
    return getDecimal(
      'value' in props ? props.value : 'defaultValue' in props ? defaultValue : undefined
    );
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);

  const refAutoTimer = useRef(null);
  const refInput = useRef<RefInputType>(null);
  // Ref to keep track of whether user has taken operations since the last change of prop value
  const refHasOperateSincePropValueChanged = useRef(false);

  const value = useMemo<Decimal>(() => {
    return 'value' in props ? getDecimal(props.value) : innerValue;
  }, [props.value, innerValue]);

  const [maxDecimal, minDecimal] = useMemo<Decimal[]>(() => {
    return [getDecimal(max), getDecimal(min)];
  }, [max, min]);

  useImperativeHandle(ref, () => refInput.current, []);

  const setValue = (newValue: Decimal) => {
    setInnerValue(newValue);
    if (!newValue.equals(value) && onChange) {
      const newValueStr = newValue.toString({ safe: true, precision: mergedPrecision });
      onChange(
        newValue.isEmpty
          ? undefined
          : strictMode
          ? (newValueStr as any)
          : newValue.isNaN
          ? NaN
          : Number(newValueStr)
      );
    }
  };

  const stop = () => {
    refAutoTimer.current && clearTimeout(refAutoTimer.current);
    refAutoTimer.current = null;
  };

  const getLegalValue = useCallback<(value: Decimal) => Decimal>(
    (changedValue) => {
      let finalValue = changedValue;

      if (finalValue.less(minDecimal)) {
        finalValue = minDecimal;
      } else if (maxDecimal.less(finalValue)) {
        finalValue = maxDecimal;
      }

      return finalValue;
    },
    [minDecimal, maxDecimal]
  );

  useEffect(() => {
    return () => stop();
  }, []);

  useEffect(() => {
    refHasOperateSincePropValueChanged.current = false;
  }, [props.value]);

  useEffect(() => {
    const _isOutOfRange = value.less(minDecimal) || maxDecimal.less(value);

    // Don't correct the illegal value caused by prop value. Wait for user to take actions.
    if (_isOutOfRange && refHasOperateSincePropValueChanged.current) {
      setValue(getLegalValue(value));
    }

    setIsOutOfRange(_isOutOfRange);
  }, [minDecimal, maxDecimal, value, getLegalValue]);

  const handleArrowKey = (event, method: StepMethods, needRepeat = false) => {
    event.persist();
    event.preventDefault();
    setIsUserTyping(false);

    if (disabled || readOnly) {
      return;
    }

    const finalValue = value.isInvalid
      ? getDecimal(min === -Infinity ? 0 : min)
      : value.add(method === 'plus' ? step : -step);

    setValue(getLegalValue(finalValue));
    refInput.current && refInput.current.focus();

    // auto change while holding
    if (needRepeat) {
      const isFirstRepeat = refAutoTimer.current === null;
      refAutoTimer.current = setTimeout(
        () => event.target.dispatchEvent(event.nativeEvent),
        isFirstRepeat ? AUTO_CHANGE_START_DELAY : AUTO_CHANGE_INTERVAL
      );
    }
  };

  const displayedInputValue = useMemo<string>(() => {
    let _value: string;

    if (isUserTyping) {
      _value = parser ? `${parser(inputValue)}` : inputValue;
    } else if (isNumber(mergedPrecision)) {
      _value = value.toString({ safe: true, precision: mergedPrecision });
    } else if (value.isInvalid) {
      _value = '';
    } else {
      _value = value.toString();
    }

    return formatter ? formatter(_value, { userTyping: isUserTyping, input: inputValue }) : _value;
  }, [value, inputValue, isUserTyping, mergedPrecision, parser, formatter]);

  const updateSelectionRangePosition = useSelectionRange({
    inputElement: refInput.current?.dom,
    inputValue: displayedInputValue,
  });

  const inputEventHandlers: Partial<InputProps> = {
    onChange: (rawText, event) => {
      setIsUserTyping(true);
      rawText = rawText.trim().replace(/。/g, '.');
      const parsedValue = parser ? parser(rawText) : rawText;

      if (isNumber(+parsedValue) || parsedValue === '-' || !parsedValue || parsedValue === '.') {
        setInputValue(rawText);
        setValue(getLegalValue(getDecimal(parsedValue)));
        updateSelectionRangePosition(event);
      }
    },
    onKeyDown: (e) => {
      const key = e.key;
      if (key === ArrowDown.key) {
        e.stopPropagation();
        handleArrowKey(e, 'minus');
      } else if (key === ArrowUp.key) {
        e.stopPropagation();
        handleArrowKey(e, 'plus');
      }

      stop();
      onKeyDown?.(e as any);
    },
    onFocus: (e) => {
      // Both tab and button click trigger focus event. This can be used to determine whether user has taken operations
      refHasOperateSincePropValueChanged.current = true;
      setInputValue(refInput.current?.dom?.value);
      onFocus?.(e);
    },
    onBlur: (e) => {
      setValue(getLegalValue(value));
      setIsUserTyping(false);
      onBlur?.(e);
    },
  };

  const getControlButtonEventsHandlers = (method: StepMethods) => {
    return readOnly
      ? {}
      : {
          onMouseDown: (e) => handleArrowKey(e, method, true),
        };
  };

  const shouldRenderButton = !hideControl && mode === 'button';
  const shouldRenderLayer = !hideControl && !readOnly && mode === 'embed';

  const renderStepButton = (method: StepMethods, icon) => {
    const isStepButtonValid =
      !disabled &&
      (value.isInvalid ||
        (method === 'plus'
          ? maxDecimal.isInvalid || value.less(maxDecimal)
          : minDecimal.isInvalid || minDecimal.less(value)));
    return (
      <div
        className={cs(`${prefixCls}-step-button`, {
          [`${prefixCls}-step-button-disabled`]: !isStepButtonValid,
        })}
        onMouseLeave={stop}
        onMouseUp={stop}
        {...(isStepButtonValid ? getControlButtonEventsHandlers(method) : {})}
      >
        {icon}
      </div>
    );
  };

  return (
    <Input
      _ignorePropsFromGlobal
      role="spinbutton"
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value.isEmpty ? undefined : value.toNumber()}
      {...omit(rest, ['allowClear'])}
      {...inputEventHandlers}
      style={style}
      className={cs(
        prefixCls,
        `${prefixCls}-mode-${mode}`,
        `${prefixCls}-size-${mergedSize}`,
        {
          [`${prefixCls}-readonly`]: readOnly,
          [`${prefixCls}-illegal-value`]: !value.isEmpty && isOutOfRange,
        },
        className
      )}
      ref={refInput}
      size={mergedSize}
      error={error}
      disabled={disabled}
      readOnly={readOnly}
      value={displayedInputValue}
      placeholder={placeholder}
      prefix={prefix && <div className={`${prefixCls}-prefix`}>{prefix}</div>}
      suffix={
        <>
          {shouldRenderLayer && (
            <div className={`${prefixCls}-step-layer`}>
              {renderStepButton('plus', icons && icons.up ? icons.up : <IconUp />)}
              {renderStepButton('minus', icons && icons.down ? icons.down : <IconDown />)}
            </div>
          )}
          {suffix && <div className={`${prefixCls}-suffix`}>{suffix}</div>}
        </>
      }
      addBefore={
        shouldRenderButton &&
        renderStepButton('minus', icons && icons.minus ? icons.minus : <IconMinus />)
      }
      addAfter={
        shouldRenderButton &&
        renderStepButton('plus', icons && icons.plus ? icons.plus : <IconPlus />)
      }
    />
  );
}

const InputNumberComponent = React.forwardRef<RefInputType, InputNumberProps>(InputNumber);

InputNumberComponent.displayName = 'InputNumber';

export default InputNumberComponent;

export { InputNumberProps };

import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import NP from 'number-precision';
import IconUp from '../../icon/react-icon/IconUp';
import IconDown from '../../icon/react-icon/IconDown';
import IconPlus from '../../icon/react-icon/IconPlus';
import IconMinus from '../../icon/react-icon/IconMinus';
import { isNumber } from '../_util/is';
import cs from '../_util/classNames';
import { ArrowUp, ArrowDown } from '../_util/keycode';
import { ConfigContext } from '../ConfigProvider';
import Input from '../Input';
import { RefInputType } from '../Input/interface';
import { InputNumberProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import omit from '../_util/omit';

NP.enableBoundaryChecking(false);

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
  parser: (input) => input.replace(/[^\w\.-]+/g, ''),
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

  const [innerValue, setInnerValue] = useState<InputNumberProps['value']>(
    'defaultValue' in props ? defaultValue : undefined
  );
  const value = (() => {
    const mergedValue = 'value' in props ? props.value : innerValue;
    return typeof mergedValue === 'string' && mergedValue !== '' ? +mergedValue : mergedValue;
  })();

  const [inputValue, setInputValue] = useState<string>('');
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const [isUserInputting, setIsUserInputting] = useState(false);

  // Value is not set
  const isEmptyValue = value === '' || value === undefined || value === null;

  const refAutoTimer = useRef(null);
  const refInput = useRef<RefInputType>(null);
  // Ref to keep track of whether user has taken operations since the last change of prop value
  const refHasOperateSincePropValueChanged = useRef(false);

  useImperativeHandle(ref, () => refInput.current, []);

  const setValue = (newVal) => {
    setInnerValue(newVal);

    const newValue = isNumber(+newVal) ? +newVal : undefined;
    if (newValue !== value) {
      onChange && onChange(newValue);
    }
  };

  const stop = () => {
    refAutoTimer.current && clearTimeout(refAutoTimer.current);
    refAutoTimer.current = null;
  };

  const getLegalValue = useCallback(
    (changedValue) => {
      let finalValue: string | number = Number(changedValue);

      if (!changedValue && changedValue !== 0) {
        finalValue = undefined;
      } else if (!isNumber(finalValue)) {
        finalValue = changedValue === '-' ? changedValue : '';
      }

      if (finalValue < min) {
        finalValue = min;
      }

      if (finalValue > max) {
        finalValue = max;
      }

      return isNumber(finalValue)
        ? isNumber(mergedPrecision)
          ? Number(finalValue.toFixed(mergedPrecision))
          : finalValue
        : undefined;
    },
    [min, max, mergedPrecision]
  );

  useEffect(() => {
    return () => stop();
  }, []);

  useEffect(() => {
    refHasOperateSincePropValueChanged.current = false;
  }, [props.value]);

  useEffect(() => {
    const _isOutOfRange = (isNumber(min) && value < min) || (isNumber(max) && value > max);

    // Don't correct the illegal value caused by prop value. Wait for user to take actions.
    if (_isOutOfRange && refHasOperateSincePropValueChanged.current) {
      setValue(getLegalValue(value));
    }

    setIsOutOfRange(_isOutOfRange);
  }, [min, max, value, getLegalValue]);

  const handleArrowKey = (event, method: StepMethods, needRepeat = false) => {
    event.persist();
    event.preventDefault();
    setIsUserInputting(false);

    if (disabled) {
      return;
    }

    let finalValue = min === -Infinity ? 0 : min;

    if (!isEmptyValue) {
      finalValue = NP[method](value, step);
    }

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

  const getDisplayInputValue = () => {
    let _value: string | number;

    if (isUserInputting) {
      _value = inputValue;
    } else if (isNumber(value) && isNumber(mergedPrecision)) {
      _value = value.toFixed(mergedPrecision);
    } else if (value == null) {
      _value = '';
    } else {
      _value = value.toString();
    }

    return formatter ? formatter(_value) : _value;
  };

  const inputEventHandlers = {
    onChange: (value) => {
      setIsUserInputting(true);

      let targetValue = value.trim().replace(/。/g, '.');
      targetValue = parser ? parser(targetValue) : targetValue;

      if (isNumber(+targetValue) || targetValue === '-' || !targetValue || targetValue === '.') {
        const formatValue = getLegalValue(targetValue);

        setInputValue(targetValue);
        setValue(formatValue);
      }
    },
    onKeyDown: (e) => {
      e.stopPropagation();

      const key = e.key;
      if (key === ArrowDown.key) {
        handleArrowKey(e, 'minus');
      } else if (key === ArrowUp.key) {
        handleArrowKey(e, 'plus');
      }

      stop();
      onKeyDown && onKeyDown(e);
    },
    onFocus: (e) => {
      // Both tab and button click trigger focus event. This can be used to determine whether user has taken operations
      refHasOperateSincePropValueChanged.current = true;
      setInputValue(refInput.current?.dom?.value);
      onFocus && onFocus(e);
    },
    onBlur: (e) => {
      setValue(getLegalValue(value));
      setIsUserInputting(false);
      onBlur && onBlur(e);
    },
  };

  const getControlButtonEventsHandlers = (method: StepMethods) => {
    return readOnly
      ? {}
      : {
          onMouseDown: (e) => handleArrowKey(e, method, true),
          onMouseLeave: stop,
          onMouseUp: stop,
        };
  };

  const shouldRenderButton = !hideControl && mode === 'button';
  const shouldRenderLayer = !hideControl && !readOnly && mode === 'embed';

  const renderStepButton = (method: StepMethods, icon) => {
    return (
      <div
        className={cs(`${prefixCls}-step-button`, {
          [`${prefixCls}-step-button-disabled`]:
            disabled || (method === 'plus' ? +value >= +max : +value <= +min),
        })}
        {...getControlButtonEventsHandlers(method)}
      >
        {icon}
      </div>
    );
  };

  return (
    <Input
      role="spinbutton"
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value as number}
      {...omit(rest, ['allowClear'])}
      {...inputEventHandlers}
      style={style}
      className={cs(
        prefixCls,
        `${prefixCls}-mode-${mode}`,
        `${prefixCls}-size-${mergedSize}`,
        {
          [`${prefixCls}-readonly`]: readOnly,
          [`${prefixCls}-illegal-value`]: !isEmptyValue && isOutOfRange,
        },
        className
      )}
      ref={refInput}
      size={mergedSize}
      error={error}
      disabled={disabled}
      readOnly={readOnly}
      value={getDisplayInputValue()}
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

import React, { useContext, useRef, useState, ReactElement } from 'react';
import { Dayjs } from 'dayjs';
import cs from '../_util/classNames';
import Trigger from '../Trigger';
import { PickerProps, CalendarValue } from './interface';
import { isArray, isDayjs } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import {
  getDayjsValue,
  getSortedDayjsArray,
  isDayjsArrayChange,
  isDayjsChange,
  isValidTimeString,
  toLocal,
  toTimezone,
} from '../_util/dayjs';
import IconClockCircle from '../../icon/react-icon/IconClockCircle';
import Input from '../_class/picker/input';
import InputRange from '../_class/picker/input-range';
import useMergeProps from '../_util/hooks/useMergeProps';
import usePrevious from '../_util/hooks/usePrevious';
import useUpdate from '../_util/hooks/useUpdate';
import PickerContext from './context';
import { getFormatTime } from './util';
import { pickDataAttributes } from '../_util/pick';

function getFormat(props) {
  return props.format || 'HH:mm:ss';
}

interface InnerPickerProps extends PickerProps {
  defaultValue?: CalendarValue | CalendarValue[];
  value?: CalendarValue | CalendarValue[];
  onSelect?: (value: string | string[], dayjsValue: Dayjs | Dayjs[]) => void;
  onChange?: (value: string | string[], dayjsValue: Dayjs | Dayjs[]) => void;
  isRangePicker?: boolean;
  picker?: ReactElement;
  hideFooter?: boolean;
  order?: boolean;
}

const defaultProps: InnerPickerProps = {
  allowClear: true,
  position: 'bl',
  format: 'HH:mm:ss',
  editable: true,
  order: true,
  scrollSticky: true,
};

const Picker = (baseProps: InnerPickerProps) => {
  const { locale, getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  if (rtl) {
    defaultProps.position = 'br';
  }
  const props = useMergeProps<InnerPickerProps>(
    baseProps,
    defaultProps,
    componentConfig?.TimePicker
  );
  const {
    allowClear = true,
    className,
    disableConfirm,
    style,
    placeholder,
    getPopupContainer,
    disabled,
    position,
    isRangePicker,
    picker,
    error,
    triggerElement,
    triggerProps,
    value: propsValue,
    onChange,
    icons,
    size,
    editable,
    unmountOnExit,
    order,
    utcOffset,
    timezone,
  } = props;

  const format = getFormat(props);

  const prefixCls = getPrefixCls('timepicker');

  function getDefaultValue() {
    let value;
    if (props.value) {
      value = getDayjsValue(props.value, format, utcOffset, timezone);
    } else if (props.defaultValue) {
      value = getDayjsValue(props.defaultValue, format, utcOffset, timezone);
    }
    return value;
  }

  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [value, setValue] = useState<Dayjs | Dayjs[]>(getDefaultValue());
  const [valueShow, setValueShow] = useState<Dayjs | Dayjs[]>();
  const [inputValue, setInputValue] = useState<string>();
  const [focusedInputIndex, setFocusedInputIndex] = useState<number>(0);

  // controlled mode / uncontrolled mode
  const mergedValue =
    'value' in props ? getDayjsValue(propsValue, format, utcOffset, timezone) : value;
  const mergedPopupVisible = 'popupVisible' in props ? props.popupVisible : popupVisible;

  const previousUtcOffset = usePrevious(utcOffset);
  const previousTimezone = usePrevious(timezone);

  // when timezone or utcOffset change changed
  useUpdate(() => {
    if (value && (previousUtcOffset !== utcOffset || timezone !== previousTimezone)) {
      const localValue = isArray(value)
        ? value.map((v) => toLocal(v, previousUtcOffset, previousTimezone))
        : toLocal(value, previousUtcOffset, previousTimezone);
      const zoneValue = isArray(localValue)
        ? localValue.map((v) => toTimezone(v, utcOffset, timezone))
        : toTimezone(localValue, utcOffset, timezone);
      setValue(zoneValue);
    }
  }, [utcOffset, previousUtcOffset, timezone, previousTimezone]);

  const refInput = useRef(null);

  function focusInput(index?: number) {
    refInput.current && refInput.current.focus && refInput.current.focus(index);
  }

  function changeFocusedInputIndex(index: number) {
    setFocusedInputIndex(index);
    setTimeout(() => focusInput(index));
  }

  function onVisibleChange(visible) {
    if (visible) {
      setOpen(visible, () => {
        setTimeout(() => focusInput());
      });
    } else {
      setOpen(false);
    }
  }

  function setOpen(visible, callback?: () => void) {
    setPopupVisible(visible);
    setInputValue(undefined);
    callback && callback();
    if (!visible) {
      setValueShow(undefined);
    }
  }

  function onConfirmValue(vs: Dayjs | Dayjs[]) {
    const newValue =
      isRangePicker && order && isArray(vs)
        ? getSortedDayjsArray(vs.map((v) => getFormatTime(v)))
        : vs;
    setValue(newValue);
    setValueShow(undefined);
    setInputValue(undefined);

    onHandleChange(newValue);

    if (!disableConfirm) {
      setOpen(false);
    }
  }

  function onHandleChange(vs: Dayjs | Dayjs[]) {
    if (isArray(vs) && isDayjsArrayChange(mergedValue as Dayjs[], vs)) {
      onChange &&
        onChange(
          vs.map((t) => toLocal(t, utcOffset, timezone).format(format)),
          vs.map((t) => toLocal(t, utcOffset, timezone))
        );
    }
    if (isDayjs(vs) && isDayjsChange(mergedValue as Dayjs, vs)) {
      onChange &&
        onChange(toLocal(vs, utcOffset, timezone).format(format), toLocal(vs, utcOffset, timezone));
    }
  }

  function renderPopup(panelOnly?: boolean) {
    const vs = isRangePicker
      ? isArray(valueShow) && valueShow.length
        ? valueShow
        : mergedValue
      : valueShow || mergedValue;

    return (
      <div
        className={cs(`${prefixCls}-container`, panelOnly ? className : '')}
        style={panelOnly ? style : {}}
        onClick={() => focusInput()}
      >
        {React.cloneElement(picker as ReactElement, {
          ...props,
          format,
          inputValue,
          setInputValue,
          onConfirmValue,
          setValueShow,
          valueShow: vs,
          value: mergedValue,
          popupVisible: mergedPopupVisible,
          focusedInputIndex,
          changeFocusedInputIndex,
        })}
      </div>
    );
  }

  function onChangeInput(e) {
    const newInputValue = e.target.value;
    if (!popupVisible) {
      setPopupVisible(true);
    }
    setInputValue(newInputValue);
    confirmInputValue(newInputValue);
  }

  function confirmInputValue(newInputValue?: string) {
    const newInputDayjs = getDayjsValue(newInputValue, format) as Dayjs;
    if (isRangePicker) {
      const newValueShow = [...(isArray(valueShow) ? valueShow : (value as Dayjs[]) || [])];
      if (isValidTimeString(newInputValue, format)) {
        newValueShow[focusedInputIndex] = newInputDayjs;
        const localDayjsArray = newValueShow.map((nv) => toLocal(nv, utcOffset, timezone));
        props.onSelect &&
          props.onSelect(
            localDayjsArray.map((la) => la && la.format(format)),
            localDayjsArray
          );
        setValueShow(newValueShow);
        setInputValue(undefined);
      }
    } else if (isValidTimeString(newInputValue, format)) {
      const localDayjs = toLocal(newInputDayjs, utcOffset, timezone);
      props.onSelect && props.onSelect(localDayjs.format(format), localDayjs);
      setValueShow(newInputDayjs);
      setInputValue(undefined);
    }
  }

  function onPressEnter() {
    if (isRangePicker) {
      if (isArray(valueShow) && valueShow.length) {
        if (inputValue && !isValidTimeString(inputValue, format)) {
          setOpen(false);
        } else if (valueShow[0] === undefined || valueShow[1] === undefined) {
          changeFocusedInputIndex(focusedInputIndex === 0 ? 1 : 0);
        } else if (valueShow.length === 2) {
          onConfirmValue(valueShow);
        }
      } else {
        setOpen(false);
      }
    } else {
      onConfirmValue(valueShow || mergedValue);
    }
  }

  function onClear(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    onConfirmValue(undefined);
    onChange && onChange(undefined, undefined);
    props.onClear && props.onClear();
  }

  const rangePickerPlaceholder =
    isRangePicker && isArray(placeholder) ? placeholder : locale.TimePicker.placeholders;
  const inputPlaceHolder = placeholder || locale.TimePicker.placeholder;

  const suffixIcon = (icons && icons.inputSuffix) || <IconClockCircle />;

  const baseInputProps = {
    style,
    className,
    popupVisible: mergedPopupVisible,
    format,
    disabled,
    error,
    size,
    onPressEnter,
    onClear,
    suffixIcon,
    editable,
    allowClear,
    prefix: props.prefix,
    ...pickDataAttributes(props),
  };

  return (
    <PickerContext.Provider value={{ utcOffset, timezone }}>
      {triggerElement === null ? (
        renderPopup(true)
      ) : (
        <Trigger
          popup={() => renderPopup()}
          trigger="click"
          clickToClose={false}
          position={position}
          disabled={disabled}
          popupAlign={{ bottom: 4 }}
          getPopupContainer={getPopupContainer}
          onVisibleChange={onVisibleChange}
          popupVisible={mergedPopupVisible}
          classNames="slideDynamicOrigin"
          unmountOnExit={!!unmountOnExit}
          {...triggerProps}
        >
          {triggerElement ||
            (isRangePicker ? (
              <InputRange
                {...baseInputProps}
                ref={refInput}
                placeholder={rangePickerPlaceholder as string[]}
                value={
                  (isArray(valueShow) && valueShow.length ? valueShow : mergedValue) as Dayjs[]
                }
                onChange={onChangeInput}
                inputValue={inputValue}
                changeFocusedInputIndex={changeFocusedInputIndex}
                focusedInputIndex={focusedInputIndex}
              />
            ) : (
              <Input
                {...baseInputProps}
                ref={refInput}
                placeholder={inputPlaceHolder}
                value={(valueShow || mergedValue) as Dayjs}
                inputValue={inputValue as string}
                onChange={onChangeInput}
              />
            ))}
        </Trigger>
      )}
    </PickerContext.Provider>
  );
};

export default Picker;

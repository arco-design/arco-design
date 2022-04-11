import React, { useState, useRef, useEffect, useContext, ReactElement } from 'react';
import { Dayjs, UnitType } from 'dayjs';
import Trigger from '../Trigger';
import DateInput from '../_class/picker/input';
import { PickerProps, CalendarValue, ShortcutType, ModeType } from './interface';
import { TimePickerProps } from '../TimePicker/interface';
import { isArray, isDayjs, isObject } from '../_util/is';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import {
  getDayjsValue,
  dayjs,
  getNow,
  getValueWithTime,
  methods,
  isDayjsChange,
  initializeDateLocale,
  toLocal,
  toTimezone,
} from '../_util/dayjs';
import IconCalendar from '../../icon/react-icon/IconCalendar';
import IconCalendarClock from '../../icon/react-icon/IconCalendarClock';
import Footer from './panels/footer';
import Shortcuts from './panels/shortcuts';
import useMergeProps from '../_util/hooks/useMergeProps';
import PickerContext from './context';
import usePrevious from '../_util/hooks/usePrevious';
import useUpdate from '../_util/hooks/useUpdate';

function getFormat(props) {
  const { format, picker, showTime } = props;
  let valueFormat;
  switch (picker.props.pickerType) {
    case 'date':
      valueFormat = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
      break;
    case 'month':
      valueFormat = 'YYYY-MM';
      break;
    case 'year':
      valueFormat = 'YYYY';
      break;
    case 'week':
      valueFormat = 'gggg-wo';
      break;
    case 'quarter':
      valueFormat = 'YYYY-[Q]Q';
      break;
    default:
      valueFormat = 'YYYY-MM-DD';
  }
  if (format) {
    valueFormat = format;
  }
  return valueFormat;
}

interface InnerPickerProps extends PickerProps {
  disabledDate?: (current: Dayjs) => boolean;
  picker?: ReactElement;
  format?: string;
  defaultValue?: CalendarValue | CalendarValue[];
  value?: CalendarValue | CalendarValue[];
  showTime?: boolean | TimePickerProps;
  onSelect?: (dateString: string, date: Dayjs) => void;
  onChange?: (dateString: string, date: Dayjs) => void;
  showNowBtn?: boolean;
}

const defaultProps: InnerPickerProps = {
  allowClear: true,
  unmountOnExit: true,
  position: 'bl',
  editable: true,
  showNowBtn: true,
  dayStartOfWeek: 0,
};

const Picker = (baseProps: InnerPickerProps) => {
  const { getPrefixCls, locale, size: ctxSize, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<InnerPickerProps>(
    baseProps,
    defaultProps,
    componentConfig?.DatePicker
  );
  const {
    allowClear,
    className,
    style,
    placeholder,
    getPopupContainer,
    disabled,
    position,
    error,
    unmountOnExit,
    editable,
    triggerProps,
    picker,
    shortcuts,
    onSelect,
    onVisibleChange,
    value: propsValue,
    onChange,
    icons,
    disabledDate,
    showTime,
    showNowBtn,
    onSelectShortcut,
    extra,
    shortcutsPlacementLeft,
    onOk,
    defaultPickerValue,
    pickerValue,
    onPickerValueChange,
    triggerElement,
    utcOffset,
    timezone,
  } = props;

  const prefixCls = getPrefixCls('picker');
  const DATEPICKER_LOCALE = locale.DatePicker;

  initializeDateLocale(locale.dayjsLocale, props.dayStartOfWeek);

  const mode = picker.props.pickerType;

  const refInput = useRef(null);
  const refPanel = useRef(null);
  const refShortcuts = useRef(null);

  const realFormat = getFormat(props);
  let format = realFormat;
  if (typeof format === 'function') {
    format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  }

  function getDefaultValue() {
    let value;

    if (props.value) {
      value = getDayjsValue(props.value, format, utcOffset, timezone);
    } else {
      value = getDayjsValue(props.defaultValue, format, utcOffset, timezone);
    }
    return value;
  }

  const [value, setValue] = useState<Dayjs>(getDefaultValue());
  const [popupVisible, setPopupVisible] = useState<boolean>(props.popupVisible);
  const [isTimePanel, setIsTimePanel] = useState<boolean>(false);
  const [hoverPlaceholderValue, setHoverPlaceholderValue] = useState<string>();

  const mergedPopupVisible = 'popupVisible' in props ? props.popupVisible : popupVisible;

  const mergedValue =
    'value' in props ? (getDayjsValue(propsValue, format, utcOffset, timezone) as Dayjs) : value;

  const defaultPageShowDate =
    mergedValue || (getDayjsValue(defaultPickerValue, format) as Dayjs) || getNow();

  const [inputValue, setInputValue] = useState<string | undefined>();

  const [valueShow, setValueShow] = useState<Dayjs>();

  const [shortcutValue, setShortcutValue] = useState<Dayjs>();

  const [pageShowDate, setPageShowDate] = useState<Dayjs>(defaultPageShowDate);

  const mergedPageShowDate = getDayjsValue(pickerValue, format) || pageShowDate;

  const panelValue = shortcutValue || valueShow || mergedValue;

  const [panelMode, setPanelMode] = useState<ModeType>(mode);

  const defaultTimeValue = isObject(showTime)
    ? (getDayjsValue(
        showTime.defaultValue,
        showTime.format || 'HH:mm:ss',
        utcOffset,
        timezone
      ) as Dayjs)
    : getNow(utcOffset, timezone);
  const timeValue = panelValue || defaultTimeValue;

  function focusInput() {
    refInput.current && refInput.current.blur && refInput.current.focus();
  }

  function blurInput() {
    refInput.current && refInput.current.blur && refInput.current.blur();
  }

  const previousUtcOffset = usePrevious(utcOffset);
  const previousTimezone = usePrevious(timezone);

  // when timezone or utcOffset change changed
  useUpdate(() => {
    if (value && (previousUtcOffset !== utcOffset || timezone !== previousTimezone)) {
      const localValue = toLocal(value, previousUtcOffset, previousTimezone);
      setValue(toTimezone(localValue, utcOffset, timezone));
    }
  }, [utcOffset, previousUtcOffset, timezone, previousTimezone]);

  useEffect(() => {
    setInputValue(undefined);
    setHoverPlaceholderValue(undefined);

    if (mergedPopupVisible) {
      setPageShowDate(defaultPageShowDate);
      if (shortcutsPlacementLeft) {
        refShortcuts.current.style.maxHeight = `${refPanel.current.clientHeight}px`;
      }
    } else {
      setValueShow(undefined);
      setShortcutValue(undefined);
      setTimeout(() => {
        setIsTimePanel(false);
        setPanelMode(mode);
        blurInput();
      }, 100);
    }
  }, [mergedPopupVisible]);

  function visibleChange(visible) {
    if (visible) {
      setOpen(visible, () => {
        focusInput();
      });
    } else {
      setOpen(false);
    }
  }

  function handlePickerValueChange(v: Dayjs) {
    onPickerValueChange && onPickerValueChange(v.format(format), v);
  }

  function setOpen(visible, callback?: () => void) {
    setPopupVisible(visible);
    onVisibleChange && onVisibleChange(visible);
    callback && callback();
  }

  function onClear(e) {
    e.stopPropagation();
    setValue(undefined);
    setValueShow(undefined);
    onHandleChange(undefined);
    props.onClear && props.onClear();
  }

  function onClickConfirmBtn() {
    onConfirmValue();
    onOk && onOk(panelValue && panelValue.format(format), panelValue);
  }

  function onConfirmValue() {
    setValue(panelValue);
    onHandleChange(panelValue);
    setOpen(false);
  }

  function onHandleSelect(_: string, date?: Dayjs, now?: boolean) {
    setInputValue(undefined);
    setHoverPlaceholderValue(undefined);
    if (showTime) {
      const newTime = now ? date : getValueWithTime(date, timeValue);
      setValueShow(newTime);
      setPageShowDate(newTime);

      const localTime = toLocal(newTime, utcOffset, timezone);
      onSelect && onSelect(localTime.format(format), localTime);
    } else {
      const localTime = toLocal(date, utcOffset, timezone);
      onSelect && onSelect(localTime ? localTime.format(format) : undefined, localTime);
      setValue(date);
      onHandleChange(date);
      setOpen(false);
    }
  }

  function onHandleChange(newValue: Dayjs | undefined) {
    if (isDayjsChange(newValue, mergedValue)) {
      const localValue = toLocal(newValue, utcOffset, timezone);
      onChange && onChange(localValue ? localValue.format(format) : undefined, localValue);
    }
  }

  function onTimePickerSelect(_: string, time: Dayjs) {
    const _valueShow = panelValue || getNow(utcOffset, timezone);
    const newValueShow = getValueWithTime(_valueShow, time);
    setValueShow(newValueShow);

    const localNewValueShow = toLocal(newValueShow, utcOffset, timezone);
    onSelect && onSelect(localNewValueShow.format(format), localNewValueShow);
  }

  function isValid(time): boolean {
    return (
      typeof time === 'string' &&
      dayjs(time, format).format(format) === time &&
      (typeof disabledDate === 'function' ? !disabledDate(dayjs(time, format)) : true)
    );
  }

  function onChangeInput(e) {
    const niv = e.target.value;
    setInputValue(niv);
    if (!mergedPopupVisible) {
      setOpen(true);
    }
    if (isValid(niv)) {
      const newValue = getDayjsValue(niv, format, utcOffset, timezone) as Dayjs;
      setValueShow(newValue);
      setPageShowDate(newValue);
      setInputValue(undefined);
    }
  }

  function onPressEnter() {
    if (panelValue) {
      onConfirmValue();
      blurInput();
    } else if (mergedPopupVisible) {
      setOpen(false);
    }
  }

  function changePageShowDate(type: 'prev' | 'next', unit: UnitType, num = 1) {
    let newPageShowDate;
    if (type === 'prev') {
      newPageShowDate = methods.subtract(mergedPageShowDate, num, unit);
    }
    if (type === 'next') {
      newPageShowDate = methods.add(mergedPageShowDate, num, unit);
    }

    handlePickerValueChange(newPageShowDate);
    setPageShowDate(newPageShowDate);
  }

  function getHeaderOperations(pickMode: ModeType = mode) {
    if (pickMode === 'date' || pickMode === 'week') {
      return {
        onPrev: () => changePageShowDate('prev', 'month'),
        onNext: () => changePageShowDate('next', 'month'),
        onSuperPrev: () => changePageShowDate('prev', 'year'),
        onSuperNext: () => changePageShowDate('next', 'year'),
      };
    }
    if (pickMode === 'month' || pickMode === 'quarter') {
      return {
        onSuperPrev: () => changePageShowDate('prev', 'year'),
        onSuperNext: () => changePageShowDate('next', 'year'),
      };
    }
    if (pickMode === 'year') {
      return {
        onSuperPrev: () => changePageShowDate('prev', 'year', 10),
        onSuperNext: () => changePageShowDate('next', 'year', 10),
      };
    }
  }

  function onSelectNow() {
    const now = getNow(utcOffset, timezone);
    handlePickerValueChange(now);
    onHandleSelect(now.format(format), now, true);
  }

  function onMouseEnterCell(value: Dayjs, disabled: boolean) {
    if (!disabled) {
      const placeHolderValue = showTime ? getValueWithTime(value, timeValue) : value;
      setHoverPlaceholderValue(
        typeof realFormat === 'function' ? realFormat(value) : placeHolderValue.format(format)
      );
    }
  }

  function onMouseLeaveCell() {
    setHoverPlaceholderValue(undefined);
  }

  function onMouseEnterShortcut(shortcut) {
    if (typeof shortcut.value === 'function' && isDayjs(shortcut.value())) {
      const sv = getDayjsValue(shortcut.value(), format, utcOffset, timezone) as Dayjs;
      setPageShowDate(sv);
      handlePickerValueChange(sv);
      setShortcutValue(sv);
    }
  }

  function onMouseLeaveShortcut() {
    const newValue = valueShow || mergedValue || getNow(utcOffset, timezone);
    setShortcutValue(undefined);
    setPageShowDate(newValue);
    handlePickerValueChange(newValue);
  }

  function onHandleSelectShortcut(shortcut: ShortcutType) {
    onSelectShortcut && onSelectShortcut(shortcut);
    if (typeof shortcut.value === 'function' && isDayjs(shortcut.value())) {
      const time = getDayjsValue(shortcut.value(), format, utcOffset, timezone) as Dayjs;
      setValue(time);
      onHandleChange(time);
      setOpen(false);
    }
  }

  function onClickSelectTimeBtn() {
    setIsTimePanel(!isTimePanel);
  }

  function renderPopup(panelOnly?: boolean) {
    const classNames = cs(
      `${prefixCls}-container`,
      {
        [`${prefixCls}-panel-only`]: panelOnly,
        [`${prefixCls}-container-shortcuts-placement-left`]:
          isArray(shortcuts) && shortcutsPlacementLeft,
      },
      panelOnly ? className : ''
    );

    const shortcutsProps = {
      prefixCls,
      showTime,
      shortcuts,
      onSelectNow,
      showNowBtn,
      onMouseEnterShortcut,
      onMouseLeaveShortcut,
      onSelectShortcut: onHandleSelectShortcut,
    };

    const shouldShowFooter =
      (showTime && panelMode === 'date') ||
      extra ||
      (isArray(shortcuts) && shortcuts.length && !shortcutsPlacementLeft) ||
      (!showTime && panelMode === 'date' && showNowBtn);

    const content = (
      <>
        {React.cloneElement(picker as ReactElement, {
          ...omit(props, ['style']),
          ...getHeaderOperations(),
          getHeaderOperations,
          onSelect: onHandleSelect,
          onTimePickerSelect,
          onSelectNow,
          popupVisible: mergedPopupVisible,
          format,
          value: panelValue,
          pageShowDate: mergedPageShowDate,
          localeName: locale.dayjsLocale,
          setPageShowDate: (v) => {
            setPageShowDate(v);
            handlePickerValueChange(v);
          },
          timeValue,
          isTimePanel,
          panelMode,
          setPanelMode,
          onMouseEnterCell,
          onMouseLeaveCell,
        })}
        {shouldShowFooter && (
          <Footer
            {...shortcutsProps}
            DATEPICKER_LOCALE={DATEPICKER_LOCALE}
            disabled={!panelValue}
            onClickConfirmBtn={onClickConfirmBtn}
            extra={extra}
            mode={panelMode}
            shortcutsPlacementLeft={shortcutsPlacementLeft}
            onClickSelectTimeBtn={onClickSelectTimeBtn}
            isTimePanel={isTimePanel}
          />
        )}
      </>
    );

    return (
      <div
        className={classNames}
        onClick={() => {
          refInput.current && refInput.current.focus && refInput.current.focus();
        }}
        style={panelOnly ? style : {}}
      >
        {shortcutsPlacementLeft ? (
          <>
            <Shortcuts ref={refShortcuts} {...shortcutsProps} />
            <div ref={refPanel} className={`${prefixCls}-panel-wrapper`}>
              {content}
            </div>
          </>
        ) : (
          content
        )}
      </div>
    );
  }

  const size = props.size || ctxSize;

  const suffixIcon =
    icons && icons.inputSuffix === null
      ? null
      : (icons && icons.inputSuffix) || (showTime ? <IconCalendarClock /> : <IconCalendar />);

  const baseInputProps = {
    style,
    className,
    popupVisible: mergedPopupVisible,
    format: realFormat,
    disabled: disabled as boolean,
    error,
    size,
    onPressEnter,
    onClear,
    suffixIcon,
    editable: editable && typeof realFormat !== 'function',
    allowClear,
  };

  if (triggerElement === null) {
    return renderPopup(true);
  }

  return (
    <PickerContext.Provider value={{ utcOffset, timezone }}>
      <Trigger
        popup={renderPopup}
        trigger="click"
        clickToClose={false}
        position={position}
        disabled={disabled as boolean}
        popupAlign={{ bottom: 4 }}
        getPopupContainer={getPopupContainer}
        onVisibleChange={visibleChange}
        popupVisible={mergedPopupVisible}
        classNames="slideDynamicOrigin"
        unmountOnExit={unmountOnExit}
        {...triggerProps}
      >
        {triggerElement || (
          <DateInput
            {...baseInputProps}
            ref={refInput}
            placeholder={placeholder || DATEPICKER_LOCALE.placeholder[mode]}
            popupVisible={mergedPopupVisible}
            value={valueShow || mergedValue}
            inputValue={hoverPlaceholderValue || inputValue}
            prefixCls={prefixCls}
            onChange={onChangeInput}
            isPlaceholder={!!hoverPlaceholderValue}
          />
        )}
      </Trigger>
    </PickerContext.Provider>
  );
};

export default Picker;

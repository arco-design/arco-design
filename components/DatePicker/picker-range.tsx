import React, { useState, useRef, useEffect, useContext } from 'react';
import { Dayjs, UnitType, QUnitType } from 'dayjs';
import Trigger from '../Trigger';
import DateInputRange from '../_class/picker/input-range';
import { RangePickerProps, ShortcutType, ModeType } from './interface';
import { isArray, isDayjs, isObject, isUndefined } from '../_util/is';
import cs from '../_util/classNames';
import { pickDataAttributes } from '../_util/pick';
import { ConfigContext } from '../ConfigProvider';
import {
  getDayjsValue,
  getValueWithTime,
  getNow,
  methods,
  getSortedDayjsArray,
  isDayjsArrayChange,
  toTimezone,
  toLocal,
  isValidTimeString,
} from '../_util/dayjs';
import IconCalendar from '../../icon/react-icon/IconCalendar';
import IconCalendarClock from '../../icon/react-icon/IconCalendarClock';
import RangePickerPanel from './panels/range';
import Footer from './panels/footer';
import Shortcuts from './panels/shortcuts';
import { getAvailableDayjsLength, getDefaultWeekStart, getLocaleDayjsValue } from './util';
import useMergeProps from '../_util/hooks/useMergeProps';
import usePrevious from '../_util/hooks/usePrevious';
import useUpdate from '../_util/hooks/useUpdate';
import PickerContext from './context';

// get default format by mode
function getFormat(props) {
  const { format, showTime, mode } = props;
  let valueFormat;
  switch (mode) {
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
      valueFormat = 'YYYY-wo';
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

const defaultProps: RangePickerProps = {
  allowClear: true,
  unmountOnExit: true,
  position: 'bl',
  editable: true,
  mode: 'date',
};

const Picker = (baseProps: RangePickerProps) => {
  const { getPrefixCls, locale, size: ctxSize, componentConfig, rtl } = useContext(ConfigContext);
  if (rtl) {
    defaultProps.position = 'br';
  }
  const props = useMergeProps<RangePickerProps>(
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
    status,
    unmountOnExit,
    editable,
    triggerProps,
    shortcuts,
    onSelect,
    onVisibleChange,
    value: propsValue,
    onChange,
    icons,
    disabledDate,
    disabledTime,
    mode,
    showTime,
    onSelectShortcut,
    extra,
    shortcutsPlacementLeft,
    onOk,
    defaultPickerValue,
    pickerValue,
    panelRender,
    onPickerValueChange,
    triggerElement,
    clearRangeOnReselect,
    separator,
    utcOffset,
    timezone,
  } = props;

  const prefixCls = getPrefixCls('picker-range');

  const weekStart = isUndefined(props.dayStartOfWeek)
    ? getDefaultWeekStart(locale.dayjsLocale)
    : props.dayStartOfWeek;

  const refInput = useRef(null);
  const refPanel = useRef(null);
  const refShortcuts = useRef(null);

  const shortcutEnterTimer = useRef(null);
  const shortcutLeaveTimer = useRef(null);

  const format = getFormat(props);

  // get input index when half disabled
  function getAvailableInputIndex() {
    if (isArray(disabled)) {
      if (disabled[0] && !disabled[1]) {
        return 1;
      }
      if (disabled[1] && !disabled[0]) {
        return 0;
      }
    }
  }

  const availableInputIndex = getAvailableInputIndex();
  const isHalfAvailable = typeof availableInputIndex === 'number';

  const disabledTimePickerIndex = isHalfAvailable ? 1 ^ availableInputIndex : undefined;

  // current focus index
  const [focusedInputIndex, setFocusedInputIndex] = useState<number>(
    isHalfAvailable ? availableInputIndex : 0
  );

  useEffect(() => {
    if (isHalfAvailable) {
      setFocusedInputIndex(availableInputIndex);
    }
  }, [disabled]);

  const nextFocusedInputIndex = 1 ^ focusedInputIndex;

  const [inputValue, setInputValue] = useState<string | undefined>();
  const [hoverPlaceholderValue, setHoverPlaceholderValue] = useState<string>();

  const [value, setValue] = useState<Dayjs[]>(getDefaultValue());
  const [valueShow, setValueShow] = useState<Dayjs[]>();
  const [valueShowHover, setValueShowHover] = useState<Dayjs[]>();

  const [shortcutsValue, setShortcutsValue] = useState<Dayjs[]>();
  const [popupVisible, setPopupVisible] = useState<boolean>(props.popupVisible);

  const [panelModes, setPanelModes] = useState<ModeType[]>([mode, mode]);

  const [isTimePanel, setIsTimePanel] = useState<boolean>(false);

  const mergedPopupVisible = 'popupVisible' in props ? props.popupVisible : popupVisible;
  const propsValueDayjs = getDayjsValue(propsValue, format, utcOffset, timezone) as Dayjs[];
  const mergedValue = 'value' in props ? propsValueDayjs : value;

  const panelValue = shortcutsValue || valueShow || mergedValue || [];

  const selectedLength = getAvailableDayjsLength(valueShow || mergedValue);

  // the first time we select a range after open
  const firstRange = useRef<boolean>(true);

  const now = getNow();
  const zoneNow = toTimezone(now, utcOffset, timezone);

  function getTimeValues(): Dayjs[] {
    const timeValues: Dayjs[] = [];
    const defaultTimeValue =
      isObject(showTime) && showTime.defaultValue
        ? getDayjsValue(showTime.defaultValue, showTime.format || 'HH:mm:ss')
        : [];
    timeValues[0] = panelValue[0] || defaultTimeValue[0] || zoneNow;
    timeValues[1] = panelValue[1] || defaultTimeValue[1] || zoneNow;
    return timeValues;
  }

  const timeValues = getTimeValues();

  const selectedDisabledDate = isHalfAvailable
    ? (current: Dayjs) =>
        availableInputIndex === 0
          ? current.isAfter(panelValue[1], mode as QUnitType)
          : current.isBefore(panelValue[0], mode as QUnitType)
    : undefined;

  // if triggerElement !== undefined, we should activate clearRangeOnReselect by default
  const customTriggerElement = triggerElement !== undefined;
  const resetRange = customTriggerElement || clearRangeOnReselect;

  function getDefaultValue() {
    let value;

    if (props.value) {
      value = getDayjsValue(props.value, format, utcOffset, timezone);
    } else {
      value = getDayjsValue(props.defaultValue, format, utcOffset, timezone);
    }

    if (isHalfAvailable && (!value || (value && !value[nextFocusedInputIndex]))) {
      const nv = [];
      nv[nextFocusedInputIndex] = getNow(utcOffset, timezone);
      return nv;
    }

    return value;
  }

  const defaultPageShowDates = mergedValue ||
    (getDayjsValue(defaultPickerValue, format) as Dayjs[]) || [now, now];

  // show date at two panels
  const [pageShowDates, setPageShowDates] = useState<Dayjs[]>(
    getShowDatesFromFocused(defaultPageShowDates)
  );

  const mergedPageShowDate =
    getShowDatesFromFocused(getDayjsValue(pickerValue, format, utcOffset, timezone) as Dayjs[]) ||
    pageShowDates;

  const previousUtcOffset = usePrevious(utcOffset);
  const previousTimezone = usePrevious(timezone);

  // when timezone or utcOffset change changed
  useUpdate(() => {
    if (isArray(value) && (previousUtcOffset !== utcOffset || timezone !== previousTimezone)) {
      const localValue = value.map((v) => toLocal(v, previousUtcOffset, previousTimezone));
      const zoneValue = localValue.map((v) => toTimezone(v, utcOffset, timezone));
      setValue(zoneValue);
    }
  }, [utcOffset, previousUtcOffset, timezone, previousTimezone]);

  // panel open and change mode
  useUpdate(() => {
    setPageShowDates(getShowDatesFromFocused(defaultPageShowDates));
  }, [mode]);

  useEffect(() => {
    setPanelModes([mode, mode]);
  }, [mode]);

  useEffect(() => {
    setHoverPlaceholderValue(undefined);
    setInputValue(undefined);

    if (mergedPopupVisible) {
      const resetPageShowDates = getShowDatesFromFocused(defaultPageShowDates);
      setIsTimePanel(false);
      setPanelModes([mode, mode]);
      setPageShowDates(resetPageShowDates);
      handlePickerValueChange(resetPageShowDates);
      setValueShow(mergedValue);
      if (shortcutsPlacementLeft) {
        refShortcuts.current.style.maxHeight = `${refPanel.current.clientHeight}px`;
      }
    } else {
      setValueShow(undefined);
      setValueShowHover(undefined);
      setShortcutsValue(undefined);
      blurInput();
    }
    firstRange.current = mergedPopupVisible;
  }, [mergedPopupVisible]);

  const startStr = propsValueDayjs?.[0]?.format(format);
  const endStr = propsValueDayjs?.[1]?.format(format);

  useEffect(() => {
    setValueShow(undefined);
    setValueShowHover(undefined);
  }, [startStr, endStr]);

  function setFixedPageShowDates(innerValue, index = focusedInputIndex) {
    const newPageShowDates = getShowDatesFromFocused(innerValue, index);
    setPageShowDates(newPageShowDates);
    handlePickerValueChange(newPageShowDates);
  }

  function handlePickerValueChange(v: Dayjs[]) {
    if (!isSamePanel([v[0], pageShowDates[0]], mode)) {
      onPickerValueChange &&
        onPickerValueChange(isArray(v) ? v.map((v) => v && v.format(format)) : undefined, v);
    }
  }

  function getShowDatesFromFocused(dates?: Dayjs[], index = focusedInputIndex) {
    const prev = index === 0 || isSamePanel(dates, mode);
    if (isArray(dates) && dates.length < 2) {
      return getPageShowDatesByValue(dates[0] || getNow(utcOffset, timezone), mode, 'prev');
    }
    if (isArray(dates) && dates.length === 2) {
      if (dates[index]) {
        return getPageShowDatesByValue(dates[index], mode, prev ? 'prev' : 'next');
      }
      return getPageShowDatesByValue(
        dates[index === 0 ? 1 : 0] || getNow(utcOffset, timezone),
        mode,
        prev && !dates[index === 0 ? 1 : 0] ? 'prev' : 'next'
      );
    }
  }

  function isSamePanel(innerValue: Dayjs[], pickerMode: ModeType) {
    if (innerValue && innerValue.length === 2 && isValidDayjsArray(innerValue)) {
      return (
        ((pickerMode === 'date' || pickerMode === 'week') &&
          innerValue[0].isSame(innerValue[1], 'month')) ||
        ((pickerMode === 'month' || pickerMode === 'quarter') &&
          innerValue[0].isSame(innerValue[1], 'year')) ||
        (pickerMode === 'year' &&
          Math.floor(innerValue[0].year() / 10) === Math.floor(innerValue[1].year() / 10))
      );
    }
  }

  // get page show date by specify value
  function getPageShowDatesByValue(
    value = getNow(utcOffset, timezone),
    pickerMode = mode,
    type: 'prev' | 'next' = 'prev'
  ) {
    const prev = type === 'prev';
    switch (pickerMode) {
      case 'date':
      case 'week':
        return prev
          ? [value, methods.add(value, 1, 'month')]
          : [methods.subtract(value, 1, 'month'), value];
      case 'month':
      case 'quarter':
        return prev
          ? [value, methods.add(value, 1, 'year')]
          : [methods.subtract(value, 1, 'year'), value];
      case 'year':
        return prev
          ? [value, methods.add(value, 10, 'year')]
          : [methods.subtract(value, 10, 'year'), value];
      default:
        return [];
    }
  }

  function focusInput(index?: number) {
    refInput.current &&
      refInput.current.focus &&
      refInput.current.focus(isHalfAvailable ? availableInputIndex : index);
  }

  function blurInput() {
    refInput.current && refInput.current.blur && refInput.current.blur();
  }

  function visibleChange(visible) {
    if (visible) {
      setTimeout(() => focusInput());
      setOpen(visible);
    } else {
      setOpen(false);
    }
  }

  // open or close popup
  function setOpen(visible: boolean) {
    onVisibleChange && onVisibleChange(visible);
    setPopupVisible(visible);
  }

  function onClear(e) {
    e.stopPropagation();
    let newValueShow = [...panelValue];
    if (isHalfAvailable) {
      newValueShow[availableInputIndex] = undefined;
    } else {
      newValueShow = undefined;
    }
    setValue(newValueShow);
    setValueShow(newValueShow);
    onHandleChange(newValueShow);
    props.onClear && props.onClear();
  }

  function changeFocusedInputIndex(index: number, silent?: boolean) {
    setInputValue(undefined);
    setFocusedInputIndex(index);
    if (panelValue && panelValue.length && !silent) {
      const newPageShowDates = getShowDatesFromFocused(panelValue, index);
      setPageShowDates(newPageShowDates);
      handlePickerValueChange(newPageShowDates);
    }
  }

  function isDisabledDate(date: Dayjs): boolean {
    const selectedDisabled =
      typeof selectedDisabledDate === 'function' ? selectedDisabledDate(date) : false;
    const originDisabledDate = typeof disabledDate === 'function' ? disabledDate(date) : false;
    return originDisabledDate || selectedDisabled;
  }

  // Determine whether the input date is in the correct format
  function isValid(time): boolean {
    return (
      isValidTimeString(time, format) && !isDisabledDate(getDayjsValue(time, format) as Dayjs)
      // (panelValue[nextFocusedInputIndex]
      //   ? nextFocusedInputIndex === 0
      //     ? panelValue[nextFocusedInputIndex].isBefore(dayjs(time, format))
      //     : panelValue[nextFocusedInputIndex].isAfter(dayjs(time, format))
      //   : true)
    );
  }

  function onChangeInput(e) {
    const newValueShow = [...(panelValue || [])];
    const niv = e.target.value;
    setInputValue(niv);
    if (!mergedPopupVisible) {
      setOpen(true);
    }
    if (isValid(niv)) {
      newValueShow[focusedInputIndex] = getDayjsValue(niv, format) as Dayjs;
      setValueShow(newValueShow);
      setFixedPageShowDates(newValueShow);
      setInputValue(undefined);
    }
  }

  // Compare with the last value, trigger onChange only if the value changes
  function onHandleChange(newValue: Dayjs[] | undefined) {
    if (isDayjsArrayChange(mergedValue, newValue)) {
      const localValue = isArray(newValue)
        ? newValue.map((v) =>
            getLocaleDayjsValue(toLocal(v, utcOffset, timezone), locale.dayjsLocale)
          )
        : undefined;
      onChange &&
        onChange(
          isArray(localValue) ? localValue.map((v) => v && v.format(format)) : undefined,
          localValue
        );
    }
  }

  function onPressEnter() {
    if (isArray(valueShow) && valueShow.length) {
      if (inputValue && !isValid(inputValue)) {
        setInputValue(undefined);
      } else if (selectedLength !== 2) {
        switchFocusedInput();
      } else if (selectedLength === 2) {
        onConfirmValue(valueShow);
      }
    } else if (mergedPopupVisible) {
      setOpen(false);
    }
  }

  // Confirm and update component value
  function onConfirmValue(date?: Dayjs[], keepOpen?: boolean) {
    const confirmValue = date || panelValue;
    if (!confirmValue || !confirmValue[0] || !confirmValue[1]) {
      return;
    }
    const sortedValues = getSortedDayjsArray(confirmValue);
    setValue(sortedValues);
    onHandleChange(sortedValues);
    if (triggerElement !== null && !keepOpen) {
      setOpen(false);
    }
  }

  // Callback when click the confirm button
  function onClickConfirmBtn() {
    onConfirmValue();
    const localePanelValue = panelValue.map((v) => getLocaleDayjsValue(v, locale.dayjsLocale));
    onOk &&
      onOk(
        localePanelValue.map((v) => v && v.format(format)),
        localePanelValue
      );
  }

  function getUnit(): QUnitType {
    switch (mode) {
      case 'date':
      case 'week':
        return 'date';
      case 'month':
        return 'month';
      case 'year':
        return 'year';
      default:
        return undefined;
    }
  }

  function outOfRange(date: Dayjs): boolean {
    if (selectedLength !== 2) {
      return false;
    }
    const v = valueShow || mergedValue;
    if (focusedInputIndex === 0 && date.isAfter(v[1], getUnit())) {
      return true;
    }
    if (focusedInputIndex === 1 && date.isBefore(v[0], getUnit())) {
      return true;
    }
    return false;
  }

  // Callback when click the panel date cell
  function onSelectPanel(_: string, date: Dayjs) {
    const isOutOfRange = outOfRange(date) && firstRange.current;
    const newValueShow =
      resetRange && selectedLength === 2 && !isHalfAvailable ? [] : [...panelValue];

    // if custom triggerElement, focused input index always 0 -> 1
    const focusedIndex = customTriggerElement
      ? selectedLength === 0 || selectedLength === 2
        ? 0
        : 1
      : focusedInputIndex;
    const newDate = showTime ? getValueWithTime(date, timeValues[focusedIndex]) : date;

    if (isOutOfRange) {
      newValueShow[focusedIndex] = newDate;
      newValueShow[1 ^ focusedIndex] = undefined;
    } else {
      newValueShow[focusedIndex] = newDate;
    }

    const sortedValueShow = getSortedDayjsArray(newValueShow);

    onSelectValueShow(sortedValueShow);
    setInputValue(undefined);
    setHoverPlaceholderValue(undefined);

    const newSelectedLength = getAvailableDayjsLength(newValueShow);

    if (resetRange) {
      if (selectedLength === 0 || (selectedLength === 2 && !isHalfAvailable)) {
        customTriggerElement ? setFocusedInputIndex(1) : switchFocusedInput(true);
      } else if (!showTime) {
        onConfirmValue(newValueShow);
      }
    } else if (newSelectedLength <= 1) {
      switchFocusedInput(true);
    } else if (selectedLength === 2 && firstRange.current && !isHalfAvailable) {
      firstRange.current = false;
      switchFocusedInput(true);
      if (!showTime && !isOutOfRange) {
        onConfirmValue(newValueShow, true);
      }
    } else {
      firstRange.current = false;
      if (!showTime && !isOutOfRange) {
        onConfirmValue(newValueShow);
      }
    }
  }

  // Callback when click TimePicker
  function onTimePickerSelect(index: number, _: string, time: Dayjs) {
    const newValueShow = isArray(panelValue) ? [...panelValue] : [];
    const newTimeValue = getValueWithTime(newValueShow[index] || getNow(utcOffset, timezone), time);
    newValueShow[index] = newTimeValue;
    onSelectValueShow(newValueShow);
  }

  function onSelectValueShow(newValueShow) {
    setValueShow(newValueShow);
    setValueShowHover(undefined);
    const sortedValues = getSortedDayjsArray(newValueShow);
    const zoneValues = sortedValues.map((v) =>
      getLocaleDayjsValue(toLocal(v, utcOffset, timezone), locale.dayjsLocale)
    );
    onSelect &&
      onSelect(
        zoneValues.map((v) => v && v.format(format)),
        zoneValues,
        { type: focusedInputIndex === 1 ? 'end' : 'start' }
      );
  }

  // Switch to next focused input
  function switchFocusedInput(silent?: boolean) {
    changeFocusedInputIndex(nextFocusedInputIndex, silent);
    setTimeout(() => focusInput(nextFocusedInputIndex));
  }

  // Callback when mouse entered the date cell
  function onMouseEnterCell(date: Dayjs, disabled: boolean) {
    const newValueShowHover = [...(panelValue || [])];
    const needShowHover = resetRange ? selectedLength === 1 : selectedLength !== 0;
    if (!disabled && needShowHover && !outOfRange(date)) {
      newValueShowHover[focusedInputIndex] = getValueWithTime(date, timeValues[focusedInputIndex]);
      setValueShowHover(newValueShowHover);
      setInputValue(undefined);
    }
    if (!disabled) {
      const placeHolderValue = showTime
        ? getValueWithTime(date, timeValues[focusedInputIndex])
        : date;
      setHoverPlaceholderValue(placeHolderValue.locale(locale.dayjsLocale).format(format));
    }
  }

  function onMouseLeaveCell() {
    setValueShowHover(undefined);
    setHoverPlaceholderValue(undefined);
  }

  function isValidDayjsArray(sv) {
    return sv && isArray(sv) && sv.length === 2 && isDayjs(sv[0]) && isDayjs(sv[1]);
  }

  // Determine whether the value entered in the shortcut is in the correct format
  function isValidShortcut(shortcut) {
    const sv = typeof shortcut.value === 'function' && shortcut.value();

    return isValidDayjsArray(sv);
  }

  function clearShortcutsTimer() {
    clearTimeout(shortcutEnterTimer.current);
    clearTimeout(shortcutLeaveTimer.current);
    shortcutEnterTimer.current = null;
    shortcutLeaveTimer.current = null;
  }

  // Callback when mouse entered the shortcuts
  function onMouseEnterShortcut(shortcut) {
    clearShortcutsTimer();
    shortcutEnterTimer.current = setTimeout(() => {
      if (isValidShortcut(shortcut)) {
        const nv = getDayjsValue(shortcut.value(), format, utcOffset, timezone) as Dayjs[];
        setShortcutsValue(nv);
        setFixedPageShowDates(nv);
      }
    }, 50);
  }

  // Callback when mouse leaved the shortcuts
  function onMouseLeaveShortcut() {
    clearShortcutsTimer();
    shortcutLeaveTimer.current = setTimeout(() => {
      setShortcutsValue(undefined);
      setFixedPageShowDates(
        valueShow || mergedValue || [getNow(utcOffset, timezone), getNow(utcOffset, timezone)]
      );
    }, 50);
  }

  // Callback when click the shortcuts button
  function onHandleSelectShortcut(shortcut: ShortcutType) {
    onSelectShortcut && onSelectShortcut(shortcut);
    if (isValidShortcut(shortcut)) {
      const time = getDayjsValue(shortcut.value(), format, utcOffset, timezone) as Dayjs[];
      onConfirmValue(time);
    }
  }

  // Modify panel date (the value of the panel itself, not the component value)
  function changePageShowDates(type: 'prev' | 'next', unit: UnitType, num = 1) {
    const index = type === 'prev' ? 0 : 1;
    let newPageShowDates = [...mergedPageShowDate];
    if (type === 'prev') {
      newPageShowDates[index] = methods.subtract(mergedPageShowDate[index], num, unit);
    }
    if (type === 'next') {
      newPageShowDates[index] = methods.add(mergedPageShowDate[index], num, unit);
    }
    newPageShowDates = getPageShowDatesByValue(newPageShowDates[index], mode, type);

    setFixedPageShowDates(newPageShowDates);
  }

  // Callback when click the prev or next button
  function getHeaderOperations(pickerMode: ModeType = mode) {
    if (pickerMode === 'date' || pickerMode === 'week') {
      return {
        onPrev: () => changePageShowDates('prev', 'month'),
        onNext: () => changePageShowDates('next', 'month'),
        onSuperPrev: () => changePageShowDates('prev', 'year'),
        onSuperNext: () => changePageShowDates('next', 'year'),
      };
    }
    if (pickerMode === 'month' || pickerMode === 'quarter') {
      return {
        onSuperPrev: () => changePageShowDates('prev', 'year'),
        onSuperNext: () => changePageShowDates('next', 'year'),
      };
    }
    if (pickerMode === 'year') {
      return {
        onSuperPrev: () => changePageShowDates('prev', 'year', 10),
        onSuperNext: () => changePageShowDates('next', 'year', 10),
      };
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
        [`${prefixCls}-container-rtl`]: rtl,
      },
      panelOnly ? className : ''
    );

    const shortcutsProps = {
      prefixCls: getPrefixCls('picker'),
      showTime: showTime as any,
      shortcuts,
      onMouseEnterShortcut,
      onMouseLeaveShortcut,
      onSelectShortcut: onHandleSelectShortcut,
    };

    const shouldShowFooter =
      (showTime && panelModes[0] === 'date' && panelModes[1] === 'date') ||
      extra ||
      (isArray(shortcuts) && shortcuts.length && !shortcutsPlacementLeft);

    const content = (
      <>
        <RangePickerPanel
          {...props}
          {...getHeaderOperations()}
          getHeaderOperations={getHeaderOperations}
          setRangePageShowDates={setFixedPageShowDates}
          pageShowDates={mergedPageShowDate}
          value={panelValue}
          format={format}
          onSelectPanel={onSelectPanel}
          onMouseEnterCell={onMouseEnterCell}
          onMouseLeaveCell={onMouseLeaveCell}
          disabledDate={(current) => isDisabledDate(current)}
          disabledTime={disabledTime}
          mode={mode}
          localeName={locale.dayjsLocale}
          showTime={showTime}
          timeValues={shortcutsValue || timeValues}
          onTimePickerSelect={onTimePickerSelect}
          popupVisible={mergedPopupVisible}
          disabledTimePickerIndex={disabledTimePickerIndex}
          isTimePanel={isTimePanel}
          valueShowHover={valueShowHover}
          panelModes={panelModes}
          setPanelModes={setPanelModes}
        />
        {shouldShowFooter && (
          <Footer
            {...shortcutsProps}
            DATEPICKER_LOCALE={locale.DatePicker}
            disabled={!(isArray(panelValue) && panelValue[0] && panelValue[1])}
            onClickConfirmBtn={onClickConfirmBtn}
            extra={extra}
            shortcutsPlacementLeft={shortcutsPlacementLeft}
            onClickSelectTimeBtn={onClickSelectTimeBtn}
            isTimePanel={isTimePanel}
          />
        )}
      </>
    );

    const contentWithShortcuts = shortcutsPlacementLeft ? (
      <>
        <Shortcuts ref={refShortcuts} {...shortcutsProps} />
        <div ref={refPanel} className={`${prefixCls}-panel-wrapper`}>
          {content}
        </div>
      </>
    ) : (
      content
    );

    const panelNode =
      typeof panelRender === 'function' ? panelRender(contentWithShortcuts) : contentWithShortcuts;

    return (
      <div className={classNames} onClick={() => focusInput()} style={panelOnly ? style : {}}>
        {panelNode}
      </div>
    );
  }

  const size = props.size || ctxSize;

  const placeholders = isArray(placeholder) ? placeholder : locale.DatePicker.placeholders[mode];
  const suffixIcon =
    icons && icons.inputSuffix === null
      ? null
      : (icons && icons.inputSuffix) || (showTime ? <IconCalendarClock /> : <IconCalendar />);

  const baseInputProps = {
    style,
    className,
    popupVisible: mergedPopupVisible,
    format,
    disabled,
    error,
    status,
    size,
    onPressEnter,
    onClear,
    suffixIcon,
    editable,
    allowClear,
    prefix: props.prefix,
  };

  const triggerDisabled = isArray(disabled) ? disabled[0] && disabled[1] : disabled;

  return (
    <PickerContext.Provider value={{ utcOffset, timezone, weekStart }}>
      {triggerElement === null ? (
        renderPopup(true)
      ) : (
        <Trigger
          popup={renderPopup}
          trigger="click"
          clickToClose={false}
          position={position}
          disabled={triggerDisabled}
          popupAlign={{ bottom: 4 }}
          getPopupContainer={getPopupContainer}
          onVisibleChange={visibleChange}
          popupVisible={mergedPopupVisible}
          classNames="slideDynamicOrigin"
          unmountOnExit={unmountOnExit}
          {...triggerProps}
        >
          {triggerElement || (
            <DateInputRange
              {...pickDataAttributes(props)}
              {...baseInputProps}
              ref={refInput}
              placeholder={placeholders}
              value={valueShow || mergedValue}
              onChange={onChangeInput}
              inputValue={hoverPlaceholderValue || inputValue}
              changeFocusedInputIndex={changeFocusedInputIndex}
              focusedInputIndex={focusedInputIndex}
              isPlaceholder={!!hoverPlaceholderValue}
              separator={separator}
            />
          )}
        </Trigger>
      )}
    </PickerContext.Provider>
  );
};

Picker.displayName = 'RangePicker';

export default Picker;

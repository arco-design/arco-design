import React, { useState, useRef, useEffect, useContext } from 'react';
import { Dayjs, UnitType, QUnitType } from 'dayjs';
import Trigger from '../Trigger';
import DateInputRange from '../_class/picker/input-range';
import { RangePickerProps, ShortcutType, ModeType } from './interface';
import { isArray, isDayjs, isObject } from '../_util/is';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import {
  getDayjsValue,
  getValueWithTime,
  dayjs,
  getNow,
  methods,
  getSortedDayjsArray,
  isDayjsArrayChange,
  initializeDateLocale,
  getResolvedDayjsLocaleName,
} from '../_util/dayjs';
import IconCalendar from '../../icon/react-icon/IconCalendar';
import IconCalendarClock from '../../icon/react-icon/IconCalendarClock';
import RangePickerPanel from './panels/range';
import Footer from './panels/footer';
import Shortcuts from './panels/shortcuts';
import { getAvailableDayjsLength } from './util';
import useMergeProps from '../_util/hooks/useMergeProps';

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
  dayStartOfWeek: 0,
};

const Picker = (baseProps: RangePickerProps) => {
  const { getPrefixCls, locale, size: ctxSize, componentConfig } = useContext(ConfigContext);
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
    dayStartOfWeek,
    onOk,
    defaultPickerValue,
    pickerValue,
    onPickerValueChange,
    triggerElement,
    clearRangeOnReselect,
  } = props;

  const prefixCls = getPrefixCls('picker-range');

  const localeName = getResolvedDayjsLocaleName(locale.locale);

  initializeDateLocale(localeName, dayStartOfWeek);

  const refInput = useRef(null);
  const refPanel = useRef(null);
  const refShortcuts = useRef(null);

  const shortcutEnterTimer = useRef(null);
  const shortcutLeaveTimer = useRef(null);

  const format = getFormat(props);

  // 获取半禁用时的序号
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

  // 当前聚焦的输入框
  const [focusedInputIndex, setFocusedInputIndex] = useState<number>(
    isHalfAvailable ? availableInputIndex : 0
  );
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
  const propsValueDayjs = getDayjsValue(propsValue, format) as Dayjs[];
  const mergedValue = 'value' in props ? propsValueDayjs : value;

  const panelValue = shortcutsValue || valueShow || mergedValue || [];

  const selectedLength = getAvailableDayjsLength(valueShow || mergedValue);

  // the first time we select a range after open
  const firstRange = useRef<boolean>(true);

  const now = getNow();

  function getTimeValues(): Dayjs[] {
    const timeValues: Dayjs[] = [];
    const defaultTimeValue =
      isObject(showTime) && showTime.defaultValue ? showTime.defaultValue : [];
    timeValues[0] = panelValue[0] || defaultTimeValue[0] || now;
    timeValues[1] = panelValue[1] || defaultTimeValue[1] || now;
    return timeValues;
  }

  const timeValues = getTimeValues();

  const initialDisabledDate = isHalfAvailable
    ? (current: Dayjs) =>
        availableInputIndex === 0
          ? current.isAfter(panelValue[1], mode as QUnitType)
          : current.isBefore(panelValue[0], mode as QUnitType)
    : undefined;

  const selectedDisabledDate = useRef<(current?: Dayjs) => boolean>(initialDisabledDate);

  // if triggerElement !== undefined, we should activate clearRangeOnReselect by default
  const customTriggerElement = triggerElement !== undefined;
  const resetRange = customTriggerElement || clearRangeOnReselect;

  function getDefaultValue() {
    let value;

    if (props.value) {
      value = getDayjsValue(props.value, format);
    } else {
      value = getDayjsValue(props.defaultValue, format);
    }

    if (isHalfAvailable && (!value || (value && !value[nextFocusedInputIndex]))) {
      const nv = [];
      nv[nextFocusedInputIndex] = getNow();
      return nv;
    }

    return value;
  }

  const defaultPageShowDates = mergedValue ||
    (getDayjsValue(defaultPickerValue, format) as Dayjs[]) || [getNow(), getNow()];

  // 控制两个日期选择器面板显示的日期
  const [pageShowDates, setPageShowDates] = useState<Dayjs[]>(
    getShowDatesFromFocused(defaultPageShowDates)
  );

  const mergedPageShowDate =
    getShowDatesFromFocused(getDayjsValue(pickerValue, format) as Dayjs[]) || pageShowDates;

  useEffect(() => {
    setPanelModes([mode, mode]);
  }, [mode]);

  useEffect(() => {
    setHoverPlaceholderValue(undefined);
    setInputValue(undefined);

    if (mergedPopupVisible) {
      setIsTimePanel(false);
      setPanelModes([mode, mode]);
      setPageShowDates(getShowDatesFromFocused(defaultPageShowDates));
      setValueShow(mergedValue);
      if (shortcutsPlacementLeft) {
        refShortcuts.current.style.maxHeight = `${refPanel.current.clientHeight}px`;
      }
    } else {
      setValueShow(undefined);
      setValueShowHover(undefined);
      setShortcutsValue(undefined);
      resetSelectedDisabledDate();
    }
    firstRange.current = mergedPopupVisible;
  }, [mergedPopupVisible]);

  const startStr = propsValueDayjs?.[0]?.format(format);
  const endStr = propsValueDayjs?.[1]?.format(format);

  useEffect(() => {
    setValueShow(undefined);
    setValueShowHover(undefined);
  }, [startStr, endStr]);

  function setFixedPageShowDates(innerValue) {
    const newPageShowDates = getShowDatesFromFocused(innerValue);
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
      return getPageShowDatesByValue(dates[0] || getNow(), mode, 'prev');
    }
    if (isArray(dates) && dates.length === 2) {
      if (dates[index]) {
        return getPageShowDatesByValue(dates[index], mode, prev ? 'prev' : 'next');
      }
      return getPageShowDatesByValue(
        dates[index === 0 ? 1 : 0] || getNow(),
        mode,
        prev && !dates[index === 0 ? 1 : 0] ? 'prev' : 'next'
      );
    }
  }

  function setNestPageShowDates(dates: Dayjs[], pickerMode: ModeType, index: number) {
    if (isArray(dates) && dates[index]) {
      setPageShowDates(
        getPageShowDatesByValue(dates[index], pickerMode, index === 0 ? 'prev' : 'next')
      );
      handlePickerValueChange(dates);
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

  // 获取默认的面板显示日期
  function getPageShowDatesByValue(
    value = getNow(),
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

  function visibleChange(visible) {
    if (!('popupVisible' in props)) {
      if (visible) {
        setTimeout(() => focusInput());
        setOpen(visible);
      } else {
        setOpen(false);
      }
    }
  }

  // 弹出框打开关闭的回调
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
      typeof selectedDisabledDate.current === 'function'
        ? selectedDisabledDate.current(date)
        : false;
    const originDisabledDate = typeof disabledDate === 'function' ? disabledDate(date) : false;
    return originDisabledDate || selectedDisabled;
  }

  // 判断输入日期是否格式正确
  function isValid(time): boolean {
    return (
      typeof time === 'string' &&
      dayjs(time, format).format(format) === time &&
      !isDisabledDate(dayjs(time, format))
      // (panelValue[nextFocusedInputIndex]
      //   ? nextFocusedInputIndex === 0
      //     ? panelValue[nextFocusedInputIndex].isBefore(dayjs(time, format))
      //     : panelValue[nextFocusedInputIndex].isAfter(dayjs(time, format))
      //   : true)
    );
  }

  function resetSelectedDisabledDate() {
    selectedDisabledDate.current = initialDisabledDate;
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

  // 跟上次的值进行对比，如果值改变了才触发 onChange
  function onHandleChange(newValue: Dayjs[] | undefined) {
    if (isDayjsArrayChange(mergedValue, newValue)) {
      onChange &&
        onChange(
          isArray(newValue) ? newValue.map((v) => v && v.format(format)) : undefined,
          newValue
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
    } else {
      setOpen(false);
    }
  }

  function onPressTab(e) {
    e.preventDefault();
  }

  // 确认更新组件值
  function onConfirmValue(date?: Dayjs[], keepOpen?: boolean) {
    const confirmValue = date || panelValue;
    if (!confirmValue || !confirmValue[0] || !confirmValue[1]) {
      return;
    }
    const sortedValues = getSortedDayjsArray(confirmValue);
    setValue(sortedValues);
    onHandleChange(sortedValues);
    resetSelectedDisabledDate();
    if (triggerElement !== null && !keepOpen) {
      setOpen(false);
    }
  }

  // 点击确认按钮的回调
  function onClickConfirmBtn() {
    onConfirmValue();
    onOk &&
      onOk(
        panelValue.map((v) => v && v.format(format)),
        panelValue
      );
  }

  // 点击面板日期的回调
  function onSelectPanel(_: string, date: Dayjs) {
    const newValueShow =
      resetRange && selectedLength === 2 && !isHalfAvailable ? [] : [...panelValue];
    // if custom triggerElement, focused input index always 0 -> 1
    const focusedIndex = customTriggerElement
      ? selectedLength === 0 || selectedLength === 2
        ? 0
        : 1
      : focusedInputIndex;
    const newDate = showTime ? getValueWithTime(date, timeValues[focusedIndex]) : date;
    newValueShow[focusedIndex] = newDate;

    const sortedValueShow = getSortedDayjsArray(newValueShow);

    onSelectValueShow(sortedValueShow);
    setInputValue(undefined);
    setHoverPlaceholderValue(undefined);

    if (resetRange) {
      if (selectedLength === 0 || (selectedLength === 2 && !isHalfAvailable)) {
        customTriggerElement ? setFocusedInputIndex(1) : switchFocusedInput(true);
      } else if (!showTime) {
        onConfirmValue(newValueShow);
      }
    } else {
      setFixedPageShowDates(sortedValueShow);
      if (selectedLength === 0) {
        switchFocusedInput(true);
      } else if (selectedLength === 2 && firstRange.current && !isHalfAvailable) {
        firstRange.current = false;
        switchFocusedInput(true);
        if (!showTime) {
          onConfirmValue(newValueShow, true);
        }
      } else {
        firstRange.current = false;
        if (!showTime) {
          onConfirmValue(newValueShow);
        }
      }
    }
  }

  // 点击时间的回调
  function onTimePickerSelect(index: number, _: string, time: Dayjs) {
    const newValueShow = isArray(panelValue) ? [...panelValue] : [];
    const newTimeValue = getValueWithTime(newValueShow[index], time);
    newValueShow[index] = newTimeValue;
    onSelectValueShow(newValueShow);
  }

  function onSelectValueShow(newValueShow) {
    setValueShow(newValueShow);
    setValueShowHover(undefined);
    const sortedValues = getSortedDayjsArray(newValueShow);
    onSelect &&
      onSelect(
        sortedValues.map((v) => v && v.format(format)),
        sortedValues,
        { type: focusedInputIndex === 1 ? 'end' : 'start' }
      );
  }

  // 切换到另一个输入框
  function switchFocusedInput(silent?: boolean) {
    changeFocusedInputIndex(nextFocusedInputIndex, silent);
    setTimeout(() => focusInput(nextFocusedInputIndex));
  }

  // 鼠标移入单元格的回调
  function onMouseEnterCell(date: Dayjs, disabled: boolean) {
    const newValueShowHover = [...(panelValue || [])];
    const needShowHover = resetRange ? selectedLength === 1 : selectedLength !== 0;
    if (!disabled && needShowHover) {
      newValueShowHover[focusedInputIndex] = getValueWithTime(date, timeValues[focusedInputIndex]);
      setValueShowHover(newValueShowHover);
      setInputValue(undefined);
    }
    if (!disabled) {
      const placeHolderValue = showTime
        ? getValueWithTime(date, timeValues[focusedInputIndex])
        : date;
      setHoverPlaceholderValue(placeHolderValue.format(format));
    }
  }

  function onMouseLeaveCell() {
    setValueShowHover(undefined);
    setHoverPlaceholderValue(undefined);
  }

  function isValidDayjsArray(sv) {
    return sv && isArray(sv) && sv.length === 2 && isDayjs(sv[0]) && isDayjs(sv[1]);
  }

  // 判断快捷输入的值是否格式正确
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

  // 鼠标移入快捷输入按钮
  function onMouseEnterShortcut(shortcut) {
    clearShortcutsTimer();
    shortcutEnterTimer.current = setTimeout(() => {
      if (isValidShortcut(shortcut)) {
        const nv = getDayjsValue(shortcut.value(), format) as Dayjs[];
        setShortcutsValue(nv);
        setFixedPageShowDates(nv);
      }
    }, 50);
  }

  // 鼠标移出快捷输入按钮
  function onMouseLeaveShortcut() {
    clearShortcutsTimer();
    shortcutLeaveTimer.current = setTimeout(() => {
      setShortcutsValue(undefined);
      setFixedPageShowDates(valueShow || mergedValue || [getNow(), getNow()]);
    }, 50);
  }

  // 点击选择快捷输入按钮
  function onHandleSelectShortcut(shortcut: ShortcutType) {
    onSelectShortcut && onSelectShortcut(shortcut);
    if (isValidShortcut(shortcut)) {
      const time = getDayjsValue(shortcut.value(), format) as Dayjs[];
      onConfirmValue(time);
    }
  }

  // 修改面板日期（面板自身的值，并非选中的值）
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

  // 点击翻页按钮的回调
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

  // 实际渲染的弹出框的内容
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
          setRangePageShowDates={setNestPageShowDates}
          pageShowDates={mergedPageShowDate}
          value={panelValue}
          format={format}
          onSelectPanel={onSelectPanel}
          onMouseEnterCell={onMouseEnterCell}
          onMouseLeaveCell={onMouseLeaveCell}
          disabledDate={(current) => isDisabledDate(current)}
          disabledTime={disabledTime}
          mode={mode}
          localeName={localeName}
          showTime={showTime}
          timeValues={shortcutsValue || timeValues}
          onTimePickerSelect={onTimePickerSelect}
          popupVisible={mergedPopupVisible}
          dayStartOfWeek={dayStartOfWeek}
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

    return (
      <div className={classNames} onClick={() => focusInput()} style={panelOnly ? style : {}}>
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
    size,
    onPressEnter,
    onPressTab,
    onClear,
    suffixIcon,
    editable,
    allowClear,
  };

  const triggerDisabled = isArray(disabled) ? disabled[0] && disabled[1] : disabled;

  if (triggerElement === null) {
    return renderPopup(true);
  }

  return (
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
          {...baseInputProps}
          ref={refInput}
          placeholder={placeholders}
          value={valueShow || mergedValue}
          onChange={onChangeInput}
          inputValue={hoverPlaceholderValue || inputValue}
          changeFocusedInputIndex={changeFocusedInputIndex}
          focusedInputIndex={focusedInputIndex}
          isPlaceholder={!!hoverPlaceholderValue}
        />
      )}
    </Trigger>
  );
};

Picker.displayName = 'RangePicker';

export default Picker;

import React, { useContext, useCallback, ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { TimePickerProps, CalendarValue } from './interface';
import { padStart } from '../_util/pad';
import { getColumnsFromFormat } from './util';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { dayjs, getNow, getDayjsValue, toLocal } from '../_util/dayjs';
import Button from '../Button';
import TimeColumn from './time-column';
import PickerContext from './context';

interface InnerTimePickerProps extends TimePickerProps {
  confirmBtnDisabled?: boolean;
  popupVisible?: boolean;
  step?: { hour?: number; minute?: number; second?: number };
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour) => number[];
  disabledSeconds?: (selectedHour, selectedMinute) => number[];
  hideDisabledOptions?: boolean;
  onConfirmValue?: (value: Dayjs) => void;
  isRangePicker?: boolean;
  extra?: ReactNode;
  valueShow?: CalendarValue;
  setValueShow?: (valueShow: Dayjs) => void;
  hideFooter?: boolean;
}

const AMPM = ['am', 'pm'];

function isUse12Hours(props: InnerTimePickerProps) {
  return props.use12Hours || getColumnsFromFormat(props.format).use12Hours;
}

function TimePicker(props: InnerTimePickerProps) {
  const {
    format = 'HH:mm:ss',
    onSelect,
    popupVisible,
    step = {},
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,
    onConfirmValue,
    isRangePicker,
    confirmBtnDisabled,
    valueShow: propsValueShow,
    setValueShow,
    extra,
    disableConfirm,
    hideFooter,
    showNowBtn = true,
    scrollSticky,
  } = props;

  const { getPrefixCls, locale } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('timepicker');

  const { utcOffset, timezone } = useContext(PickerContext);

  const valueShow = getDayjsValue(propsValueShow, format) as Dayjs;
  const ampm = valueShow && valueShow.hour() >= 12 ? 'pm' : 'am';
  const use12Hours = isUse12Hours(props);

  const getShowList = useCallback(
    (type: 'hour' | 'minute' | 'second') => {
      const stepHour = step.hour || 1;
      const stepMinute = step.minute || 1;
      const stepSecond = step.second || 1;
      const list: number[] = [];
      if (type === 'hour') {
        for (let i = 0; i < (use12Hours ? 12 : 24); i += stepHour) {
          list.push(i);
        }
        if (use12Hours) {
          list[0] = 12;
        }
      }
      if (type === 'minute') {
        for (let i = 0; i < 60; i += stepMinute) {
          list.push(i);
        }
      }
      if (type === 'second') {
        for (let i = 0; i < 60; i += stepSecond) {
          list.push(i);
        }
      }

      return list;
    },
    [step.hour, step.minute, step.second, use12Hours]
  );

  const HOURS = getShowList('hour');
  const MINUTES = getShowList('minute');
  const SECONDS = getShowList('second');

  let selectedHour = valueShow && valueShow.hour();
  selectedHour = use12Hours ? (selectedHour > 12 ? selectedHour - 12 : selectedHour) : selectedHour;
  if (use12Hours && selectedHour === 0 && ampm === 'am') {
    selectedHour += 12;
  }
  const selectedMinute = valueShow && valueShow.minute();
  const selectedSecond = valueShow && valueShow.second();

  const getDefaultStr = useCallback(
    (type: 'hour' | 'minute' | 'second') => {
      switch (type) {
        case 'hour':
          return typeof disabledHours === 'function'
            ? padStart(HOURS.find((h) => disabledHours().indexOf(h) === -1) || 0, 2, '0')
            : padStart(HOURS[0], 2, '0');
        case 'minute':
          return typeof disabledMinutes === 'function'
            ? padStart(
                MINUTES.find((m) => disabledMinutes(selectedHour).indexOf(m) === -1) || 0,
                2,
                '0'
              )
            : padStart(MINUTES[0], 2, '0');
        case 'second':
          return typeof disabledSeconds === 'function'
            ? padStart(
                SECONDS.find(
                  (s) => disabledSeconds(selectedHour, selectedMinute).indexOf(s) === -1
                ) || 0,
                2,
                '0'
              )
            : padStart(SECONDS[0], 2, '0');

        default:
          return '00';
      }
    },
    [
      HOURS,
      MINUTES,
      SECONDS,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      selectedHour,
      selectedMinute,
    ]
  );

  function onHandleSelect(selectedValue: number | string, unit: string) {
    const isUpperCase = getColumnsFromFormat(format).list.indexOf('A') !== -1;
    const _valueShow =
      valueShow ||
      dayjs(
        `${getDefaultStr('hour')}:${getDefaultStr('minute')}:${getDefaultStr('second')}`,
        'HH:mm:ss'
      );
    let hour = _valueShow.hour();
    const minute = _valueShow.minute();
    const second = _valueShow.second();
    const selectedAmpm = isUpperCase ? ampm.toUpperCase() : ampm;
    let valueFormat = 'HH:mm:ss';
    let newValue;
    if (use12Hours) {
      if (isUpperCase) {
        valueFormat = `${valueFormat} A`;
      } else {
        valueFormat = `${valueFormat} a`;
      }
    }
    if (use12Hours) {
      hour = hour > 12 ? hour - 12 : hour;
    }
    if (unit === 'hour') {
      newValue = dayjs(`${selectedValue}:${minute}:${second} ${selectedAmpm}`, valueFormat, 'en');
    }
    if (unit === 'minute') {
      newValue = dayjs(`${hour}:${selectedValue}:${second} ${selectedAmpm}`, valueFormat, 'en');
    }
    if (unit === 'second') {
      newValue = dayjs(`${hour}:${minute}:${selectedValue} ${selectedAmpm}`, valueFormat, 'en');
    }
    if (unit === 'ampm') {
      newValue = dayjs(
        `${hour}:${minute}:${second} ${
          isUpperCase ? (selectedValue as string).toUpperCase() : selectedValue
        }`,
        valueFormat,
        'en'
      );
    }

    newValue = dayjs(newValue, valueFormat).locale(dayjs.locale());

    onSelect &&
      onSelect(
        toLocal(newValue, utcOffset, timezone).format(format),
        toLocal(newValue, utcOffset, timezone)
      );

    if (!isRangePicker) {
      setValueShow && setValueShow(newValue);

      if (disableConfirm) {
        onConfirmValue(newValue);
      }
    }
  }

  function onConfirmTime() {
    if (valueShow) {
      onConfirmValue(valueShow);
    }
  }

  function onSelectNow() {
    const now = getNow();
    const zoneNow = getNow(utcOffset, timezone);
    onSelect && onSelect(now.format(format), now);
    if (disableConfirm) {
      onConfirmValue(zoneNow);
    } else {
      setValueShow && setValueShow(zoneNow);
    }
  }

  const baseTimeColumnProps = {
    prefixCls,
    onHandleSelect,
    popupVisible,
    scrollSticky,
  };

  function renderHours() {
    const hours =
      hideDisabledOptions && typeof disabledHours === 'function'
        ? HOURS.filter((h) => disabledHours().indexOf(h) === -1)
        : HOURS;
    const list = hours.map((h) => ({
      label: padStart(`${h}`, 2, '0'),
      value: h,
      selected: selectedHour !== undefined && selectedHour === h,
      disabled: typeof disabledHours === 'function' && disabledHours().indexOf(h) !== -1,
    }));
    return <TimeColumn {...baseTimeColumnProps} list={list} value={selectedHour} unit="hour" />;
  }

  function renderMinutes() {
    const minutes =
      hideDisabledOptions && typeof disabledMinutes === 'function'
        ? MINUTES.filter((h) => disabledMinutes(selectedHour).indexOf(h) === -1)
        : MINUTES;
    const list = minutes.map((m) => ({
      label: padStart(`${m}`, 2, '0'),
      value: m,
      selected: selectedHour !== undefined && selectedMinute === m,
      disabled:
        typeof disabledMinutes === 'function' && disabledMinutes(selectedHour).indexOf(m) !== -1,
    }));

    return <TimeColumn {...baseTimeColumnProps} list={list} value={selectedMinute} unit="minute" />;
  }

  function renderSeconds() {
    const seconds =
      hideDisabledOptions && typeof disabledSeconds === 'function'
        ? SECONDS.filter((h) => disabledSeconds(selectedHour, selectedMinute).indexOf(h) === -1)
        : SECONDS;
    const list = seconds.map((s) => ({
      label: padStart(`${s}`, 2, '0'),
      value: s,
      selected: selectedHour !== undefined && selectedSecond === s,
      disabled:
        typeof disabledSeconds === 'function' &&
        disabledSeconds(selectedHour, selectedMinute).indexOf(s) !== -1,
    }));
    return <TimeColumn {...baseTimeColumnProps} list={list} value={selectedSecond} unit="second" />;
  }

  function renderAmPm() {
    const isUpperCase = getColumnsFromFormat(format).list.indexOf('A') !== -1;
    const list = AMPM.map((a) => ({
      label: isUpperCase ? a.toUpperCase() : a,
      value: a,
      selected: ampm === a,
    }));
    return <TimeColumn {...baseTimeColumnProps} list={list} value={ampm} unit="ampm" />;
  }

  const { list } = getColumnsFromFormat(format);
  const classNames = cs(prefixCls);

  const _hideFooter =
    hideFooter ||
    (disableConfirm && isRangePicker) ||
    (!isRangePicker && disableConfirm && !showNowBtn);

  return (
    <>
      <div className={classNames}>
        {(list.indexOf('H') !== -1 || list.indexOf('h') !== -1) && renderHours()}
        {list.indexOf('m') !== -1 && renderMinutes()}
        {list.indexOf('s') !== -1 && renderSeconds()}
        {use12Hours && renderAmPm()}
      </div>
      {extra && <div className={`${prefixCls}-footer-extra-wrapper`}>{extra}</div>}
      {!_hideFooter && (
        <div className={`${prefixCls}-footer-btn-wrapper`}>
          {!isRangePicker && showNowBtn ? (
            <Button size="mini" onClick={onSelectNow}>
              {locale.TimePicker.now}
            </Button>
          ) : (
            <div />
          )}
          {!disableConfirm && (
            <Button
              type="primary"
              size="mini"
              onClick={onConfirmTime}
              disabled={confirmBtnDisabled || !valueShow}
            >
              {locale.TimePicker.ok}
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default TimePicker;

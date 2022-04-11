import React, { useContext, ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import DatePickerPanel from '../date';
import WeekPickerPanel from '../week';
import MonthPickerPanel from '../month';
import YearPickerPanel from '../year';
import QuarterPickerPanel from '../quarter';
import {
  RangePickerProps,
  IconsType,
  DisabledTimeFunc,
  PrivateCType,
  ModeType,
  DisabledTimeProps,
} from '../../interface';
import { ConfigContext } from '../../../ConfigProvider';
import { getNow, getDayjsValue } from '../../../_util/dayjs';
import { TimePickerProps } from '../../../TimePicker/interface';
import { isObject } from '../../../_util/is';
import PickerContext from '../../context';

interface InnerRangePickerProps extends RangePickerProps {
  disabledDate?: (current: Dayjs) => boolean;
  dateRender?: (currentDate: Dayjs) => ReactNode;
  icons?: IconsType;
  locale?: Record<string, any>;
  pageShowDates?: Dayjs[];
  onSelectPanel?: (dateString: string, date: Dayjs) => void;
  onMouseEnterCell?: (time: Dayjs, disabled: boolean) => void;
  onMouseLeaveCell?: (time: Dayjs, disabled: boolean) => void;
  onPrev?: () => void;
  onSuperPrev?: () => void;
  onNext?: () => void;
  onSuperNext?: () => void;
  localeName?: string;
  onTimePickerSelect?: (index: number, timeString: string, time: Dayjs) => void;
  setRangePageShowDates?: (dates: Dayjs[], mode: ModeType, index: number) => void;
  disabledTimePickerIndex?: number;
  timeValues?: Dayjs[];
  isTimePanel?: boolean;
  valueShowHover?: Dayjs[];
  panelModes?: ModeType[];
  setPanelModes?: (modes: ModeType[]) => void;
}

function range(start: number, end: number): number[] {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function RangePicker(props: InnerRangePickerProps & PrivateCType) {
  const {
    mode = 'date',
    showTime,
    dayStartOfWeek = 0,
    disabledDate,
    disabledTime,
    format,
    dateRender,
    value: propsValue,
    timeValues,
    icons,
    locale,
    pageShowDates,
    onMouseEnterCell,
    onMouseLeaveCell,
    onTimePickerSelect: onSelectTime,
    onSelectPanel,
    onPrev,
    onSuperPrev,
    onNext,
    onSuperNext,
    localeName,
    popupVisible,
    timepickerProps,
    getHeaderOperations,
    setRangePageShowDates,
    disabledTimePickerIndex,
    hideNotInViewDates,
    isTimePanel,
    valueShowHover,
    panelModes,
    setPanelModes,
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('picker-range');

  const { utcOffset, timezone } = useContext(PickerContext);

  const startShowDate = pageShowDates[0] || getNow(utcOffset, timezone);
  const endShowDate = pageShowDates[1] || getNow(utcOffset, timezone);

  const value = getDayjsValue(propsValue, format) as Dayjs[];

  const basePickerProps = {
    isRangePicker: true,
    rangeValues: value,
    onMouseEnterCell,
    onMouseLeaveCell,
    format,
    locale,
    disabledDate,
    onSelect: onSelectPanel,
    dateRender,
    getHeaderOperations,
    icons,
    valueShowHover,
  };

  const startPickerProps = {
    pageShowDate: startShowDate,
    panelMode: panelModes[0],
    setPanelMode: (m) => setPanelModes([m, panelModes[1]]),
  };
  const endPickerProps = {
    pageShowDate: endShowDate,
    panelMode: panelModes[1],
    setPanelMode: (m) => setPanelModes([panelModes[0], m]),
  };

  function renderDate() {
    const startOperations = {
      onPrev,
      onSuperPrev,
    };
    const endOperations = {
      onNext,
      onSuperNext,
    };

    const pickerProps = {
      ...basePickerProps,
      dayStartOfWeek,
      localeName,
      popupVisible,
      timepickerProps,
      getHeaderOperations,
      hideNotInViewDates,
      isTimePanel,
    };

    if (mode === 'week') {
      return (
        <>
          <WeekPickerPanel
            setPageShowDate={(d) => setRangePageShowDates([d, d], 'week', 0)}
            {...startOperations}
            {...pickerProps}
            {...startPickerProps}
          />
          <WeekPickerPanel
            setPageShowDate={(d) => setRangePageShowDates([d, d], 'week', 1)}
            {...endOperations}
            {...pickerProps}
            {...endPickerProps}
          />
        </>
      );
    }

    const showTimeProps = {
      disabledTime: disabledTime as DisabledTimeFunc,
      showTime: showTime as TimePickerProps,
    };

    const disabledTimePickerProps: {
      disabledTime?: (current?: Dayjs) => DisabledTimeProps;
      showTime?: TimePickerProps;
    } = {};

    // 禁用面板时，TimePicker 被整体禁用同时关闭 hideDisabledOptions 防止用户传 true 导致空白
    if (typeof disabledTimePickerIndex === 'number') {
      disabledTimePickerProps.disabledTime = () => ({
        disabledHours: () => range(0, 24),
        disabledMinutes: () => range(0, 60),
        disabledSeconds: () => range(0, 60),
      });
      if (isObject(showTime)) {
        const st = { ...showTime, defaultValue: undefined };
        disabledTimePickerProps.showTime = { ...st, hideDisabledOptions: false };
      }
    }

    return (
      <>
        <DatePickerPanel
          {...startOperations}
          {...pickerProps}
          {...showTimeProps}
          {...(disabledTimePickerIndex === 0 ? disabledTimePickerProps : {})}
          onTimePickerSelect={(timeString, time) => {
            onSelectTime(0, timeString, time);
          }}
          index={0}
          setPageShowDate={(d) => setRangePageShowDates([d, d], 'date', 0)}
          timeValue={timeValues[0]}
          {...startPickerProps}
        />
        <DatePickerPanel
          {...endOperations}
          {...pickerProps}
          {...showTimeProps}
          {...(disabledTimePickerIndex === 1 ? disabledTimePickerProps : {})}
          onTimePickerSelect={(timeString, time) => {
            onSelectTime(1, timeString, time);
          }}
          index={1}
          setPageShowDate={(d) => setRangePageShowDates([d, d], 'date', 1)}
          timeValue={timeValues[1]}
          {...endPickerProps}
        />
      </>
    );
  }

  function renderMonth() {
    const startOperations = {
      onSuperPrev,
    };
    const endOperations = {
      onSuperNext,
    };

    const pickerProps = basePickerProps;

    return (
      <>
        <MonthPickerPanel
          setPageShowDate={(d) => setRangePageShowDates([d, d], 'month', 0)}
          {...startOperations}
          {...pickerProps}
          {...startPickerProps}
        />
        <MonthPickerPanel
          setPageShowDate={(d) => setRangePageShowDates([d, d], 'month', 1)}
          {...endOperations}
          {...pickerProps}
          {...endPickerProps}
        />
      </>
    );
  }

  function renderYear() {
    const startOperations = {
      onSuperPrev,
    };
    const endOperations = {
      onSuperNext,
    };

    const pickerProps = basePickerProps;

    return (
      <>
        <YearPickerPanel {...startOperations} {...pickerProps} pageShowDate={startShowDate} />
        <YearPickerPanel {...endOperations} {...pickerProps} pageShowDate={endShowDate} />
      </>
    );
  }

  function renderQuarter() {
    const startOperations = {
      onSuperPrev,
    };
    const endOperations = {
      onSuperNext,
    };

    const pickerProps = basePickerProps;

    return (
      <>
        <QuarterPickerPanel
          setPageShowDate={(d) => setRangePageShowDates([d, d], 'quarter', 0)}
          {...startOperations}
          {...pickerProps}
          {...startPickerProps}
        />
        <QuarterPickerPanel
          setPageShowDate={(d) => setRangePageShowDates([d, d], 'quarter', 1)}
          {...endOperations}
          {...pickerProps}
          {...endPickerProps}
        />
      </>
    );
  }

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-wrapper`}>
        {(mode === 'date' || mode === 'week') && renderDate()}
        {mode === 'month' && renderMonth()}
        {mode === 'year' && renderYear()}
        {mode === 'quarter' && renderQuarter()}
      </div>
    </div>
  );
}

RangePicker.defaultProps = {
  dayStartOfWeek: 0,
  pickerType: 'range',
};

export default RangePicker;

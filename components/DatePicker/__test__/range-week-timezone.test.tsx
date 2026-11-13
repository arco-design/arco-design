import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker, { RangePickerProps } from '..';
import { getDayjsValue, toLocal } from '../../_util/dayjs';
import { render, fireEvent } from '../../../tests/util';
import { getDateCell, getInput } from './utils';
import '../../../tests/mockDate';

const { RangePicker } = DatePicker;
const zones: Pick<RangePickerProps, 'timezone' | 'utcOffset'>[] = [
  {},
  { timezone: 'Asia/Shanghai' },
  { timezone: 'America/Los_Angeles' },
  { timezone: 'Asia/Tokyo' },
  { utcOffset: 0 },
  { utcOffset: -480 },
  { utcOffset: 840 },
  { utcOffset: -720 },
  { timezone: 'Asia/Tokyo', utcOffset: -480 },
];
const inputValues = (component) =>
  [0, 1].map((index) => getInput(component, index).getAttribute('value'));

describe.each(zones)('default week values with %p', (zone) => {
  it.each(['value', 'defaultValue'])('keeps week strings stable in %s', (prop) => {
    const component = render(
      <RangePicker mode="week" {...zone} {...{ [prop]: ['2026-3周', '2026-4周'] }} />
    );
    expect(inputValues(component)).toEqual(['2026-3周', '2026-4周']);
  });

  it.each(['pickerValue', 'defaultPickerValue'])(
    'locates week strings in %s without shifting',
    (prop) => {
      const component = render(
        <RangePicker mode="week" {...zone} {...{ [prop]: ['2026-1周', '2026-2周'] }} />
      );
      fireEvent.click(component.container.firstElementChild!);
      expect(
        Array.from(component.find('[class$="-header-value"]')).map((node) => node.textContent)
      ).toEqual(['2025年12月', '2026年1月']);
    }
  );
});

describe.each([
  { timezone: 'America/Los_Angeles' },
  { timezone: 'Asia/Tokyo' },
  { utcOffset: -480 },
  { utcOffset: 840 },
])('week callback round-trip with %p', (zone) => {
  it('preserves week labels and callback instants when another endpoint is selected', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();
    function Controlled() {
      const [value, setValue] = useState<string[]>();
      return (
        <RangePicker
          mode="week"
          {...zone}
          value={value}
          defaultPickerValue={[dayjs('2026-01-01'), dayjs('2026-02-01')]}
          onSelect={onSelect}
          onChange={(strings, dates) => {
            onChange(strings, dates);
            setValue(strings);
          }}
        />
      );
    }
    const component = render(<Controlled />);
    fireEvent.click(component.container.firstElementChild!);
    fireEvent.click(getDateCell(component, 0, 1).querySelector('.arco-picker-date')!);
    fireEvent.click(getDateCell(component, 0, 9).querySelector('.arco-picker-date')!);
    const expectedDates = ['2025-12-29', '2026-01-05'].map((value) =>
      toLocal(dayjs(value), zone.utcOffset, zone.timezone).valueOf()
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(['2026-1周', '2026-2周']);
    expect(onSelect.mock.calls[1][0]).toEqual(['2026-1周', '2026-2周']);
    expect(onChange.mock.calls[0][1].map((date) => date.valueOf())).toEqual(expectedDates);
    expect(onSelect.mock.calls[1][1].map((date) => date.valueOf())).toEqual(expectedDates);
    expect(
      onChange.mock.calls[0][1].map((date: Dayjs) =>
        (zone.utcOffset === undefined
          ? date.tz(zone.timezone)
          : date.utcOffset(zone.utcOffset)
        ).format('YYYY-MM-DD HH:mm:ss')
      )
    ).toEqual(['2025-12-29 00:00:00', '2026-01-05 00:00:00']);
    expect(inputValues(component)).toEqual(['2026-1周', '2026-2周']);

    fireEvent.click(component.container.firstElementChild!);
    fireEvent.focus(getInput(component, 1));
    expect(getDateCell(component, 1, 17).textContent).toBe('12');
    fireEvent.click(getDateCell(component, 1, 17).querySelector('.arco-picker-date')!);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toEqual(['2026-1周', '2026-3周']);
    expect(onChange.mock.calls[1][1][0].valueOf()).toBe(expectedDates[0]);
    expect(inputValues(component)).toEqual(['2026-1周', '2026-3周']);
  });

  it('types week strings without changing their week', () => {
    const onChange = jest.fn();
    const component = render(
      <RangePicker
        mode="week"
        {...zone}
        defaultValue={['2026-2周', '2026-4周']}
        onChange={onChange}
      />
    );
    fireEvent.click(component.container.firstElementChild!);
    fireEvent.focus(getInput(component, 0));
    fireEvent.change(getInput(component, 0), { target: { value: '2026-1周' } });
    fireEvent.focus(getInput(component, 1));
    fireEvent.change(getInput(component, 1), { target: { value: '2026-3周' } });
    fireEvent.keyDown(getInput(component, 1), { key: 'Enter', keyCode: 13 });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(['2026-1周', '2026-3周']);
    expect(onChange.mock.calls[0][1].map((date) => date.valueOf())).toEqual(
      ['2025-12-29', '2026-01-12'].map((value) =>
        toLocal(dayjs(value), zone.utcOffset, zone.timezone).valueOf()
      )
    );
    expect(inputValues(component)).toEqual(['2026-1周', '2026-3周']);
  });

  it('does not replace a clicked date with the week start in callbacks', () => {
    const onSelect = jest.fn();
    const component = render(
      <RangePicker
        mode="week"
        {...zone}
        defaultPickerValue={[dayjs('2026-01-01'), dayjs('2026-02-01')]}
        onSelect={onSelect}
      />
    );
    fireEvent.click(component.container.firstElementChild!);
    expect(getDateCell(component, 0, 4).textContent).toBe('1');
    fireEvent.click(getDateCell(component, 0, 4).querySelector('.arco-picker-date')!);
    const [labels, dates] = onSelect.mock.calls[0];
    expect(labels[0]).toBe('2026-1周');
    const date =
      zone.utcOffset === undefined
        ? dates[0].tz(zone.timezone)
        : dates[0].utcOffset(zone.utcOffset);
    expect(date.format('YYYY-MM-DD HH:mm:ss')).toBe('2026-01-01 00:00:00');
  });
});

it.each(['2026-03-09', '2026-07-06', '2026-11-02'])(
  'keeps Los Angeles week labels around DST: %s',
  (date) => {
    const labels = [dayjs(date), dayjs(date).add(1, 'week')].map((value) =>
      value.locale('zh-cn').format('gggg-wo')
    );
    const component = render(
      <RangePicker mode="week" timezone="America/Los_Angeles" value={labels} />
    );
    expect(inputValues(component)).toEqual(labels);
  }
);

it('preserves instant conversion for a mixed week string and Dayjs value', () => {
  const date = dayjs('2026-02-01 00:00:00');
  const expected = getDayjsValue(date, 'gggg-wo', undefined, 'America/Los_Angeles') as Dayjs;
  const component = render(
    <RangePicker mode="week" timezone="America/Los_Angeles" value={['2026-3周', date]} />
  );
  expect(inputValues(component)).toEqual(['2026-3周', expected.locale('zh-cn').format('gggg-wo')]);
});

it('keeps controlled week strings stable when the target timezone changes', () => {
  const component = render(
    <RangePicker mode="week" timezone="Asia/Tokyo" value={['2026-3周', '2026-4周']} />
  );
  component.rerender(
    <RangePicker mode="week" timezone="America/Los_Angeles" value={['2026-3周', '2026-4周']} />
  );
  expect(inputValues(component)).toEqual(['2026-3周', '2026-4周']);
});

it('checks the canonical week start against disabledDate', () => {
  const onChange = jest.fn();
  const component = render(
    <RangePicker
      mode="week"
      defaultValue={['2026-2周', '2026-4周']}
      disabledDate={(date) => date.isBefore(dayjs('2026-01-01'), 'day')}
      onChange={onChange}
    />
  );
  fireEvent.click(component.container.firstElementChild!);
  fireEvent.change(getInput(component, 0), { target: { value: '2026-1周' } });
  fireEvent.keyDown(getInput(component, 0), { key: 'Enter', keyCode: 13 });
  expect(onChange).not.toHaveBeenCalled();
  expect(inputValues(component)).toEqual(['2026-2周', '2026-4周']);
});

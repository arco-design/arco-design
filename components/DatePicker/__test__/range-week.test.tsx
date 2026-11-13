import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DatePicker from '..';
import ConfigProvider from '../../ConfigProvider';
import enUS from '../../locale/en-US';
import { getDayjsValue } from '../../_util/dayjs';
import { render, fireEvent } from '../../../tests/util';
import { getDateCell, getInput } from './utils';
import '../../../tests/mockDate';

const { RangePicker } = DatePicker;

describe('RangePicker default week format', () => {
  it.each([1, 2, 3, 4, 5, 6, 7])('selects the same week-year from first-row cell %s', (index) => {
    const onSelect = jest.fn();
    const component = render(
      <RangePicker
        mode="week"
        defaultPickerValue={[dayjs('2026-01-01'), dayjs('2026-02-01')]}
        onSelect={onSelect}
      />
    );
    fireEvent.click(component.container.firstElementChild!);
    fireEvent.click(getDateCell(component, 0, index).querySelector('.arco-picker-date')!);
    const [strings, dates] = onSelect.mock.calls[0];
    expect(dates[0].format('YYYY-MM-DD')).toBe(
      dayjs('2025-12-29')
        .add(index - 1, 'day')
        .format('YYYY-MM-DD')
    );
    expect(strings[0]).toBe('2026-1周');
    expect(getInput(component, 0).getAttribute('value')).toBe('2026-1周');
  });

  it('round-trips onChange strings through a controlled value', () => {
    const onChange = jest.fn();
    function ControlledRange() {
      const [value, setValue] = useState<string[]>();
      return (
        <RangePicker
          mode="week"
          value={value}
          onChange={(strings, dates) => {
            onChange(strings, dates);
            setValue(strings);
          }}
          defaultPickerValue={[dayjs('2026-01-01'), dayjs('2026-02-01')]}
        />
      );
    }
    const component = render(<ControlledRange />);
    fireEvent.click(component.container.firstElementChild!);
    fireEvent.click(getDateCell(component, 0, 1).querySelector('.arco-picker-date')!);
    fireEvent.click(getDateCell(component, 0, 9).querySelector('.arco-picker-date')!);
    expect(onChange).toHaveBeenCalledTimes(1);
    const [strings, dates] = onChange.mock.calls[0];
    expect(strings).toEqual(['2026-1周', '2026-2周']);
    expect(dates.map((date) => date.format('YYYY-MM-DD'))).toEqual(['2025-12-29', '2026-01-05']);
    expect(getInput(component, 0).getAttribute('value')).toBe('2026-1周');
    expect(getInput(component, 1).getAttribute('value')).toBe('2026-2周');
    fireEvent.click(component.container.firstElementChild!);
    expect(
      Array.from(component.find('[class$="-header-value"]')).map((node) => node.textContent)
    ).toEqual(['2025年12月', '2026年1月']);
  });

  it.each(['value', 'defaultValue'])('parses week strings in %s', (prop) => {
    const component = render(
      <RangePicker mode="week" {...{ [prop]: ['2020-53周', '2021-1周'] }} />
    );
    expect(getInput(component, 0).getAttribute('value')).toBe('2020-53周');
    expect(getInput(component, 1).getAttribute('value')).toBe('2021-1周');
  });

  it.each(['value', 'defaultValue'])('preserves calendar-string parsing in %s', (prop) => {
    const values = ['2026-01-05', '2026-04-06'];
    const expected = getDayjsValue(values, 'YYYY-wo') as Dayjs[];
    const component = render(<RangePicker mode="week" {...{ [prop]: values }} />);
    expect(getInput(component, 0).getAttribute('value')).toBe(
      expected[0].locale('zh-cn').format('gggg-wo')
    );
    expect(getInput(component, 1).getAttribute('value')).toBe(
      expected[1].locale('zh-cn').format('gggg-wo')
    );
  });

  it.each(['pickerValue', 'defaultPickerValue'])('accepts calendar strings in %s', (prop) => {
    const component = render(
      <RangePicker mode="week" {...{ [prop]: ['2026-01-01', '2026-02-01'] }} />
    );
    fireEvent.click(component.container.firstElementChild!);
    expect(getDateCell(component, 0, 1).textContent).toBe('29');
    expect(getDateCell(component, 0, 4).textContent).toBe('1');
  });

  it.each(['dayjs', 'date', 'timestamp'])(
    'supports %s values at the other year boundary',
    (type) => {
      const dates = [dayjs('2021-01-01'), dayjs('2021-01-04')];
      const value = dates.map((date) =>
        type === 'dayjs' ? date : type === 'date' ? date.toDate() : date.valueOf()
      );
      const component = render(<RangePicker mode="week" value={value} />);
      expect(getInput(component, 0).getAttribute('value')).toBe('2020-53周');
      expect(getInput(component, 1).getAttribute('value')).toBe('2021-1周');
    }
  );

  it.each([
    '2025-12-29T00:00:00+08:00',
    '2026/01/05',
    '2026-01-05 12:34:56.789',
    '2026-01-05 12:34',
    '2026-04-06',
    '2026-04-06 12:34:56',
    '2026',
    '20260105',
  ])('preserves legacy parsing and timezone support for %s', (value) => {
    const expected = getDayjsValue(
      [value, value],
      'YYYY-wo',
      undefined,
      'Asia/Shanghai'
    ) as Dayjs[];
    expect(expected.every((date) => date.isValid())).toBe(true);
    const component = render(
      <RangePicker mode="week" value={[value, value]} timezone="Asia/Shanghai" />
    );
    expect(getInput(component, 0).getAttribute('value')).toBe(
      expected[0].locale('zh-cn').format('gggg-wo')
    );
    fireEvent.click(component.container.firstElementChild!);
    expect(component.find('.arco-picker-body')).toHaveLength(2);
  });

  it('uses the component locale without changing the global locale', () => {
    const previous = dayjs.locale();
    const component = render(
      <ConfigProvider locale={enUS}>
        <RangePicker mode="week" value={['2026-1st', '2026-2nd']} />
      </ConfigProvider>
    );
    expect(getInput(component, 0).getAttribute('value')).toBe('2026-1st');
    expect(getInput(component, 1).getAttribute('value')).toBe('2026-2nd');
    expect(dayjs.locale()).toBe(previous);
  });

  it('accepts typed week strings and represents every week by its start', () => {
    const onChange = jest.fn();
    const component = render(
      <RangePicker
        mode="week"
        defaultValue={[dayjs('2025-12-15'), dayjs('2026-02-02')]}
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
    expect(onChange.mock.calls[0][1].map((date) => date.format('YYYY-MM-DD'))).toEqual([
      '2025-12-29',
      '2026-01-12',
    ]);
  });

  it.each(['2026-0周', '2026-54周', '2025-53周', '2026-2nd'])(
    'rejects invalid typed week %s',
    (value) => {
      const onChange = jest.fn();
      const component = render(
        <RangePicker
          mode="week"
          defaultValue={[dayjs('2026-01-05'), dayjs('2026-02-02')]}
          onChange={onChange}
        />
      );
      fireEvent.click(component.container.firstElementChild!);
      fireEvent.change(getInput(component, 0), { target: { value } });
      fireEvent.keyDown(getInput(component, 0), { key: 'Enter', keyCode: 13 });
      expect(onChange).not.toHaveBeenCalled();
      expect(getInput(component, 0).getAttribute('value')).toBe('2026-2周');
    }
  );

  it('still applies disabledDate to typed weeks', () => {
    const onChange = jest.fn();
    const component = render(
      <RangePicker
        mode="week"
        defaultValue={[dayjs('2026-01-05'), dayjs('2026-02-02')]}
        disabledDate={(date) => date.isSame(dayjs('2026-01-12'), 'week')}
        onChange={onChange}
      />
    );
    fireEvent.click(component.container.firstElementChild!);
    fireEvent.change(getInput(component, 0), { target: { value: '2026-3周' } });
    fireEvent.keyDown(getInput(component, 0), { key: 'Enter', keyCode: 13 });
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each([
    { format: 'YYYY-wo', end: '2026-2周' },
    { format: ['YYYY-wo', 'YYYY/wo'], end: '2026/2周' },
  ])('leaves explicit format %p unchanged', ({ format, end }) => {
    const component = render(
      <RangePicker mode="week" format={format} value={[dayjs('2025-12-29'), dayjs('2026-01-05')]} />
    );
    expect(getInput(component, 0).getAttribute('value')).toBe('2025-1周');
    expect(getInput(component, 1).getAttribute('value')).toBe(end);
  });

  it.each([
    { format: 'YYYY-wo', values: ['2026-3周', '2026-4周'] },
    { format: ['YYYY-wo', 'YYYY/wo'], values: ['2026-3周', '2026/4周'] },
    { format: ['gggg-wo', 'YYYY-MM-DD'], values: ['2026-3周', '2026-01-19'] },
  ])('preserves parsing with a custom format %p', ({ format, values }) => {
    const expected = getDayjsValue(values, format) as Dayjs[];
    const component = render(<RangePicker mode="week" format={format} value={values} />);
    [0, 1].forEach((index) => {
      expect(getInput(component, index).getAttribute('value')).toBe(
        expected[index].locale('zh-cn').format(Array.isArray(format) ? format[index] : format)
      );
    });
  });
});

describe.each([{ format: 'gggg-wo' }, { format: ['gggg-wo', 'gggg-wo'] }])(
  'RangePicker explicit default week format %p',
  ({ format }) => {
    it('preserves parsing and instant conversion for other input values', () => {
      const values = [dayjs('2026-01-12'), '2026-01-19'];
      const expected = getDayjsValue(values, format, undefined, 'America/Los_Angeles') as Dayjs[];
      const component = render(
        <RangePicker mode="week" format={format} value={values} timezone="America/Los_Angeles" />
      );
      [0, 1].forEach((index) => {
        expect(getInput(component, index).getAttribute('value')).toBe(
          expected[index].locale('zh-cn').format('gggg-wo')
        );
      });
    });

    it('uses the component locale for week strings', () => {
      const component = render(
        <ConfigProvider locale={enUS}>
          <RangePicker mode="week" format={format} value={['2026-1st', '2026-2nd']} />
        </ConfigProvider>
      );
      expect(getInput(component, 0).getAttribute('value')).toBe('2026-1st');
      expect(getInput(component, 1).getAttribute('value')).toBe('2026-2nd');
    });

    it.each(['value', 'defaultValue'])('parses week strings in %s', (prop) => {
      const component = render(
        <RangePicker mode="week" format={format} {...{ [prop]: ['2026-3周', '2026-4周'] }} />
      );
      expect(getInput(component, 0).getAttribute('value')).toBe('2026-3周');
      expect(getInput(component, 1).getAttribute('value')).toBe('2026-4周');
    });

    it.each(['pickerValue', 'defaultPickerValue'])('locates week strings in %s', (prop) => {
      const component = render(
        <RangePicker mode="week" format={format} {...{ [prop]: ['2026-1周', '2026-2周'] }} />
      );
      fireEvent.click(component.container.firstElementChild!);
      expect(
        Array.from(component.find('[class$="-header-value"]')).map((node) => node.textContent)
      ).toEqual(['2025年12月', '2026年1月']);
    });

    it('accepts typed week strings in both inputs', () => {
      const onChange = jest.fn();
      const component = render(
        <RangePicker
          mode="week"
          format={format}
          defaultValue={[dayjs('2025-12-15'), dayjs('2026-02-02')]}
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
      expect(onChange.mock.calls[0][1].map((date) => date.format('YYYY-MM-DD'))).toEqual([
        '2025-12-29',
        '2026-01-12',
      ]);
    });

    it.each(['2026-0周', '2026-54周', '2025-53周', '2026-2nd'])(
      'rejects invalid typed week %s',
      (value) => {
        const onChange = jest.fn();
        const component = render(
          <RangePicker
            mode="week"
            format={format}
            defaultValue={['2026-2周', '2026-4周']}
            onChange={onChange}
          />
        );
        fireEvent.click(component.container.firstElementChild!);
        fireEvent.change(getInput(component, 0), { target: { value } });
        fireEvent.keyDown(getInput(component, 0), { key: 'Enter', keyCode: 13 });
        expect(onChange).not.toHaveBeenCalled();
        expect(getInput(component, 0).getAttribute('value')).toBe('2026-2周');
      }
    );

    it('still applies disabledDate to typed weeks', () => {
      const onChange = jest.fn();
      const component = render(
        <RangePicker
          mode="week"
          format={format}
          defaultValue={['2026-2周', '2026-4周']}
          disabledDate={(date) => date.isSame(dayjs('2026-01-12'), 'week')}
          onChange={onChange}
        />
      );
      fireEvent.click(component.container.firstElementChild!);
      fireEvent.change(getInput(component, 0), { target: { value: '2026-3周' } });
      fireEvent.keyDown(getInput(component, 0), { key: 'Enter', keyCode: 13 });
      expect(onChange).not.toHaveBeenCalled();
      expect(getInput(component, 0).getAttribute('value')).toBe('2026-2周');
    });

    it.each([{ timezone: 'America/Los_Angeles' }, { utcOffset: 840 }])(
      'round-trips selected strings with %p',
      (zone) => {
        const onChange = jest.fn();
        const onSelect = jest.fn();
        function ControlledRange() {
          const [value, setValue] = useState<string[]>();
          return (
            <RangePicker
              mode="week"
              format={format}
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
        const component = render(<ControlledRange />);
        fireEvent.click(component.container.firstElementChild!);
        fireEvent.click(getDateCell(component, 0, 1).querySelector('.arco-picker-date')!);
        fireEvent.click(getDateCell(component, 0, 9).querySelector('.arco-picker-date')!);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toEqual(['2026-1周', '2026-2周']);
        expect(onSelect.mock.calls[1][0]).toEqual(['2026-1周', '2026-2周']);
        expect(
          onChange.mock.calls[0][1].map((date: Dayjs) =>
            (zone.utcOffset === undefined
              ? date.tz(zone.timezone)
              : date.utcOffset(zone.utcOffset)
            ).format('YYYY-MM-DD HH:mm:ss')
          )
        ).toEqual(['2025-12-29 00:00:00', '2026-01-05 00:00:00']);
        expect(getInput(component, 0).getAttribute('value')).toBe('2026-1周');
        expect(getInput(component, 1).getAttribute('value')).toBe('2026-2周');
      }
    );
  }
);

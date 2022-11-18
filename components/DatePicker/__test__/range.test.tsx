import React from 'react';
import dayjs from 'dayjs';
import { render, fireEvent, sleep } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import { getDateCell, getInput, checkRangeTime } from './utils';
import '../../../tests/mockDate';

const { RangePicker } = DatePicker;

mountTest(RangePicker);

describe('RangePicker', () => {
  it('control mode', () => {
    const component = render(<RangePicker showTime={{ defaultValue: ['00:00:00', '01:02:03'] }} />);

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('button.arco-picker-btn-select-time')[0]);

    checkRangeTime(component, 0, '00', '00', '00');
    checkRangeTime(component, 1, '01', '02', '03');

    component.rerender(
      <RangePicker
        value={['2021-06-10 02:02:02', '2021-06-11 06:06:06']}
        showTime={{ defaultValue: ['00:00:00', '01:02:03'] }}
      />
    );

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe(
      '2021-06-10 02:02:02'
    );

    expect(component.find('.arco-picker-input input')[1].getAttribute('value')).toBe(
      '2021-06-11 06:06:06'
    );

    checkRangeTime(component, 0, '02', '02', '02');
    checkRangeTime(component, 1, '06', '06', '06');

    component.rerender(
      <RangePicker value={undefined} showTime={{ defaultValue: ['00:00:00', '01:02:03'] }} />
    );

    checkRangeTime(component, 0, '00', '00', '00');
    checkRangeTime(component, 1, '01', '02', '03');
  });

  it('hideNotInViewDates', () => {
    const component = render(<DatePicker.RangePicker hideNotInViewDates triggerElement={null} />);

    expect(component.find('.arco-picker-cell-hidden')).toHaveLength(23);
  });

  it('hover placeholder', async () => {
    const component = render(<DatePicker.RangePicker popupVisible />);

    function checkPlaceholder(index: number, isPlaceholder: boolean) {
      expect(
        getInput(component, index).parentElement?.classList.contains(
          'arco-picker-input-placeholder'
        )
      ).toBe(isPlaceholder);
    }
    jest.useRealTimers();
    await sleep(100);
    // 2020-04-06: mouseenter
    fireEvent.mouseEnter(getDateCell(component, 0, 7));

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-06');
    checkPlaceholder(0, true);
    checkPlaceholder(1, false);

    // 2020-04-07: mouseenter
    fireEvent.mouseEnter(getDateCell(component, 0, 8));

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-07');
    checkPlaceholder(0, true);
    checkPlaceholder(1, false);

    // 2020-04-07: mouseleave
    fireEvent.mouseLeave(getDateCell(component, 0, 8));

    expect(getInput(component, 0).getAttribute('value')).toBe('');
    checkPlaceholder(0, false);
    checkPlaceholder(1, false);

    // 2020-04-06: re mouseenter and select
    expect(
      getInput(component, 0).parentElement?.classList.contains('arco-picker-input-active')
    ).toBeTruthy();

    fireEvent.click(getDateCell(component, 0, 7).querySelector('.arco-picker-date')!);

    expect(
      getInput(component, 1).parentElement?.classList.contains('arco-picker-input-active')
    ).toBeTruthy();

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-06');
    expect(getInput(component, 1).getAttribute('value')).toBe('');
    checkPlaceholder(0, false);
    checkPlaceholder(1, false);

    // 2020-04-07: mouseenter
    fireEvent.mouseEnter(getDateCell(component, 0, 8));

    expect(getInput(component, 1).getAttribute('value')).toBe('2020-04-07');
    checkPlaceholder(0, false);
    checkPlaceholder(1, true);

    // 2020-04-07: click
    fireEvent.click(getDateCell(component, 0, 8).querySelector('.arco-picker-date')!);

    expect(getInput(component, 1).getAttribute('value')).toBe('2020-04-07');
    checkPlaceholder(0, false);
    checkPlaceholder(1, false);
  });

  it('shortcuts', async () => {
    const component = render(
      <DatePicker.RangePicker
        shortcuts={[
          {
            text: 'next 7 days',
            value: () => [dayjs(), dayjs().add(1, 'week')],
          },
        ]}
        popupVisible
      />
    );

    jest.useRealTimers();
    await sleep(100);

    expect(getInput(component, 0).getAttribute('value')).toBe('');
    expect(getInput(component, 1).getAttribute('value')).toBe('');

    // 2020-04-10 - 2020-04-17: shortcuts mouseenter
    fireEvent.mouseEnter(await component.findByText('next 7 days'));

    await sleep(100);

    expect(getInput(component, 0).getAttribute('value')).toBe('');
    expect(getInput(component, 0).getAttribute('value')).toBe('');

    // 2020-04-10 - 2020-04-17
    expect(
      getDateCell(component, 0, 11).classList.contains('arco-picker-cell-range-start')
    ).toBeTruthy();
    expect(
      getDateCell(component, 0, 18).classList.contains('arco-picker-cell-range-end')
    ).toBeTruthy();

    // 2020-04-10 - 2020-04-17: shortcuts mouseleave
    fireEvent.mouseLeave(await component.findByText('next 7 days'));

    await sleep(100);

    expect(
      getDateCell(component, 0, 11).classList.contains('arco-picker-cell-range-start')
    ).toBeFalsy();
    expect(
      getDateCell(component, 0, 18).classList.contains('arco-picker-cell-range-end')
    ).toBeFalsy();

    // 2020-04-10 - 2020-04-17: shortcuts click
    fireEvent.click(await component.findByText('next 7 days'));

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-10');
    expect(getInput(component, 1).getAttribute('value')).toBe('2020-04-17');
    expect(
      getDateCell(component, 0, 11).classList.contains('arco-picker-cell-range-start')
    ).toBeTruthy();
    expect(
      getDateCell(component, 0, 18).classList.contains('arco-picker-cell-range-end')
    ).toBeTruthy();
  });

  it('clearRangeOnReselect', async () => {
    const onChange = jest.fn();

    const component = render(
      <DatePicker.RangePicker
        // 2020-04-10 - 2020-04-17
        defaultValue={[dayjs(), dayjs().add(1, 'week')]}
        onChange={onChange}
        popupVisible
      />
    );
    jest.useRealTimers();
    await sleep(100);

    // 2020-04-11
    fireEvent.click(getDateCell(component, 0, 13).querySelector('.arco-picker-date')!);

    expect(onChange.mock.calls.length).toBe(1);

    component.rerender(
      <DatePicker.RangePicker
        defaultValue={[dayjs(), dayjs().add(1, 'week')]}
        onChange={onChange}
        popupVisible
        clearRangeOnReselect
      />
    );

    // 2020-04-12
    fireEvent.click(getDateCell(component, 0, 14).querySelector('.arco-picker-date')!);

    expect(onChange.mock.calls.length).toBe(1);

    // 2020-04-13
    fireEvent.click(getDateCell(component, 0, 15).querySelector('.arco-picker-date')!);

    expect(onChange.mock.calls.length).toBe(2);
  });

  it('onSelect & onChange', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();

    const component = render(<DatePicker.RangePicker onSelect={onSelect} onChange={onChange} />);

    // open, start
    fireEvent.click(getInput(component, 0));

    fireEvent.click(getDateCell(component, 0, 13).querySelector('.arco-picker-date')!);

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toEqual(['2020-04-12']);
    expect(onSelect.mock.calls[0][2]).toEqual({ type: 'start' });

    expect(onChange.mock.calls.length).toBe(0);

    fireEvent.click(getDateCell(component, 0, 14).querySelector('.arco-picker-date')!);

    expect(onSelect.mock.calls.length).toBe(2);
    expect(onSelect.mock.calls[1][0]).toEqual(['2020-04-12', '2020-04-13']);
    expect(onSelect.mock.calls[1][2]).toEqual({ type: 'end' });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(['2020-04-12', '2020-04-13']);
  });

  it('onSelect & onChange (showTime)', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();

    const component = render(
      <DatePicker.RangePicker onSelect={onSelect} onChange={onChange} showTime />
    );

    // open, start
    fireEvent.click(getInput(component, 0));

    fireEvent.click(getDateCell(component, 0, 13).querySelector('.arco-picker-date')!);

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toEqual(['2020-04-12 20:32:59']);
    expect(onSelect.mock.calls[0][2]).toEqual({ type: 'start' });

    expect(onChange.mock.calls.length).toBe(0);

    fireEvent.click(getDateCell(component, 0, 14).querySelector('.arco-picker-date')!);

    expect(onSelect.mock.calls.length).toBe(2);
    expect(onSelect.mock.calls[1][0]).toEqual(['2020-04-12 20:32:59', '2020-04-13 20:32:59']);
    expect(onSelect.mock.calls[1][2]).toEqual({ type: 'end' });

    expect(onChange.mock.calls.length).toBe(0);

    fireEvent.click(component.find('button.arco-picker-btn-confirm')[0]);

    expect(onSelect.mock.calls.length).toBe(2);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(['2020-04-12 20:32:59', '2020-04-13 20:32:59']);
  });

  // issue: https://github.com/arco-design/arco-design/issues/1570
  it('change mode', async () => {
    const component = render(<RangePicker popupVisible />);
    jest.useRealTimers();
    await sleep(100);

    function getFirstPickerHeaderValue(component) {
      return component.find('.arco-picker-header-value').item(0).textContent;
    }

    function getSecondPickerHeaderValue(component) {
      return component.find('.arco-picker-header-value').item(1).textContent;
    }

    expect(getFirstPickerHeaderValue(component)).toBe('2020-04');

    expect(getSecondPickerHeaderValue(component)).toBe('2020-05');

    component.rerender(<RangePicker popupVisible mode="month" />);

    expect(getFirstPickerHeaderValue(component)).toBe('2020');

    expect(getSecondPickerHeaderValue(component)).toBe('2021');

    component.rerender(<RangePicker popupVisible mode="year" />);

    expect(getFirstPickerHeaderValue(component)).toBe('2020 - 2030');

    expect(getSecondPickerHeaderValue(component)).toBe('2030 - 2040');

    component.rerender(<RangePicker popupVisible mode="quarter" />);

    expect(getFirstPickerHeaderValue(component)).toBe('2020');

    expect(getSecondPickerHeaderValue(component)).toBe('2021');

    component.rerender(<RangePicker popupVisible mode="week" />);

    expect(getFirstPickerHeaderValue(component)).toBe('2020-04');

    expect(getSecondPickerHeaderValue(component)).toBe('2020-05');

    expect(component.find('.arco-picker-cell-week')).toHaveLength(12);
  });

  it('separator', () => {
    const component = render(<RangePicker separator="to" popupVisible />);

    expect(component.find('.arco-picker-separator')[0].textContent).toBe('to');
  });

  it('change disabled', () => {
    const component = render(<RangePicker disabled={false} />);

    component.rerender(
      <RangePicker disabled={[true, false]} value={['2020-04-01 00:00:00']} popupVisible />
    );

    fireEvent.click(getInput(component, 0));

    expect(
      component.find('.arco-picker-input')[1].classList.contains('arco-picker-input-active')
    ).toBeTruthy();

    expect(getDateCell(component, 0, 1).className).toBe(
      'arco-picker-cell arco-picker-cell-disabled'
    );

    expect(getDateCell(component, 0, 2).className).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-selected arco-picker-cell-range-start'
    );
  });
});

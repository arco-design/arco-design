import React from 'react';
import dayjs from 'dayjs';
import { fireEvent, render, sleep, screen } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import DatePicker from '..';
import { checkTime, getDateCell, getInput } from './utils';
import '../../../tests/mockDate';

mountTest(DatePicker);
componentConfigTest(DatePicker, 'DatePicker');

describe('DatePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('dayStartOfWeek', () => {
    const component = render(<DatePicker />);
    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-picker-week-list-item').item(0).textContent).toBe('一');
    component.rerender(<DatePicker dayStartOfWeek={0} />);

    expect(component.find('.arco-picker-week-list-item').item(0).textContent).toBe('日');
    component.rerender(<DatePicker dayStartOfWeek={6} />);

    expect(component.find('.arco-picker-week-list-item').item(0).textContent).toBe('六');
  });

  it('defaultValue', () => {
    const component = render(<DatePicker defaultValue="2020-02-02" />);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-02-02');

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(
      component.find('.arco-picker-date').item(8) // 2020-02-04
    );

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-02-04');
  });

  it('today', () => {
    const component = render(<DatePicker />);

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-picker-cell-today')[0].textContent).toBe('10');

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('');
    fireEvent.click(component.find('.arco-picker-footer .arco-link')[0]);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-04-10');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = render(<DatePicker allowClear onClear={onClear} />);

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('.arco-picker-footer .arco-link')[0]);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-04-10');
    fireEvent.click(component.find('.arco-icon-close')[0]);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });

  it('control mode (showTime)', async () => {
    const component = render(<DatePicker showTime={{ defaultValue: '00:00:00' }} />);

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('button.arco-picker-btn-select-time')[0]);

    checkTime(component, '00', '00', '00');
    component.rerender(
      <DatePicker value="2021-06-10 01:02:03" showTime={{ defaultValue: '00:00:00' }} />
    );

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe(
      '2021-06-10 01:02:03'
    );

    checkTime(component, '01', '02', '03');
    component.rerender(<DatePicker value={undefined} showTime={{ defaultValue: '00:00:00' }} />);

    checkTime(component, '00', '00', '00');
  });

  it('control mode (showTime={})', async () => {
    const component = render(<DatePicker showTime={{}} />);

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('button.arco-picker-btn-select-time')[0]);

    checkTime(component, '20', '32', '59');
  });

  it('showTime', async () => {
    jest.useRealTimers();
    const component = render(<DatePicker showTime />);

    fireEvent.click(component.container.firstChild!);

    function getTimePickerCell(index, cellIndex) {
      return component
        .find('.arco-timepicker-list')
        .item(index)
        .querySelectorAll('.arco-timepicker-cell')
        .item(cellIndex);
    }

    function getInputValue() {
      return component.find('.arco-picker-input input')[0].getAttribute('value');
    }
    fireEvent.click(component.find('button.arco-picker-btn-select-time')[0]);

    checkTime(component, '20', '32', '59');

    fireEvent.click(getTimePickerCell(0, 10));
    fireEvent.click(getTimePickerCell(1, 11));
    fireEvent.click(getTimePickerCell(2, 12));

    checkTime(component, '10', '11', '12');

    expect(getInputValue()).toBe('2020-04-10 10:11:12');

    fireEvent.click(component.find('.arco-picker-footer-btn-wrapper .arco-btn-primary')[0]);

    expect(getInputValue()).toBe('2020-04-10 10:11:12');

    // click now btn
    fireEvent.click(component.find('.arco-picker')[0]);

    await sleep(1000);
    fireEvent.click(component.queryByText('选择时间')!);

    fireEvent.click(component.find('.arco-picker-footer-btn-wrapper .arco-btn-secondary')[0]);

    expect(getInputValue()).toBe('2020-04-10 20:32:59');

    checkTime(component, '20', '32', '59');

    // confirm
    fireEvent.click(component.find('.arco-picker-footer-btn-wrapper .arco-btn-primary')[0]);

    expect(getInputValue()).toBe('2020-04-10 20:32:59');
  });

  it('hideNotInViewDates', () => {
    const component = render(<DatePicker hideNotInViewDates triggerElement={null} />);

    expect(component.find('.arco-picker-cell-hidden')).toHaveLength(12);
  });

  it('update value', () => {
    const component = render(<DatePicker value="2020-04-01" />);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-04-01');
    component.rerender(<DatePicker value="2020-05-06" />);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-05-06');
  });

  it('hover placeholder', async () => {
    jest.useRealTimers();
    const component = render(<DatePicker popupVisible />);

    function checkPlaceholder(isPlaceholder: boolean) {
      expect(
        getInput(component, 0).parentElement!.classList.contains('arco-picker-input-placeholder')
      ).toBe(isPlaceholder);
    }

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('');

    await sleep(10);
    // 2020-04-06: mouseenter
    fireEvent.mouseEnter(getDateCell(component, 0, 7));

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-06');
    checkPlaceholder(true);

    // 2020-04-06: mouseleave
    fireEvent.mouseLeave(getDateCell(component, 0, 7));

    expect(getInput(component, 0).getAttribute('value')).toBe('');
    checkPlaceholder(false);

    // 2020-04-06: re mouseenter and click
    fireEvent.mouseEnter(getDateCell(component, 0, 7));
    fireEvent.click(getDateCell(component, 0, 7).querySelector('.arco-picker-date')!);

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-06');
    checkPlaceholder(false);

    // 2020-04-07: has value and mouseenter
    fireEvent.mouseEnter(getDateCell(component, 0, 8));

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-07');
    checkPlaceholder(true);

    // 2020-04-06: has value and mouseleave
    fireEvent.mouseLeave(getDateCell(component, 0, 8));

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-06');
    checkPlaceholder(false);
  });

  it('shortcuts', async () => {
    jest.useRealTimers();
    const component = render(
      <DatePicker
        shortcuts={[
          {
            text: 'tomorrow',
            value: () => dayjs().add(1, 'day'),
          },
        ]}
        popupVisible
      />
    );

    expect(getInput(component, 0).getAttribute('value')).toBe('');
    expect(component.find('.arco-picker-cell-selected')).toHaveLength(0);

    await sleep(1000);
    // 2020-04-11: shortcuts mouseenter
    fireEvent.mouseEnter(await component.findByText('tomorrow'));
    await sleep(10);
    expect(getInput(component, 0).getAttribute('value')).toBe('');
    // 2020-04-11
    expect(
      getDateCell(component, 0, 12).classList.contains('arco-picker-cell-selected')
    ).toBeTruthy();
    expect(component.find('.arco-picker-cell-selected')).toHaveLength(1);

    // 2020-04-11: shortcuts mouseleave
    fireEvent.mouseLeave(await component.findByText('tomorrow'));

    expect(
      getDateCell(component, 0, 12).classList.contains('arco-picker-cell-selected')
    ).toBeFalsy();
    expect(component.find('.arco-picker-cell-selected')).toHaveLength(0);

    // 2020-04-11: shortcuts click
    fireEvent.click(await component.findByText('tomorrow'));

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-11');
    expect(
      getDateCell(component, 0, 12).classList.contains('arco-picker-cell-selected')
    ).toBeTruthy();
    expect(component.find('.arco-picker-cell-selected')).toHaveLength(1);
  });

  it('onSelect & onChange', async () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    jest.useRealTimers();
    const component = render(<DatePicker onSelect={onSelect} onChange={onChange} popupVisible />);

    await sleep(10);
    // 2020-04-06
    fireEvent.click(getDateCell(component, 0, 7).querySelector('.arco-picker-date')!);

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe('2020-04-06');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('2020-04-06');
  });

  it('onSelect & onChange (showTime)', async () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    jest.useRealTimers();
    const component = render(
      <DatePicker
        onSelect={onSelect}
        onChange={onChange}
        defaultValue={Date.now()}
        showTime
        popupVisible
      />
    );

    await sleep(10);
    // 2020-04-05
    fireEvent.click(getDateCell(component, 0, 7).querySelector('.arco-picker-date')!);

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe('2020-04-06 20:32:59');
    expect(onChange.mock.calls.length).toBe(0);

    // confirm
    fireEvent.click(component.find('button.arco-picker-btn-confirm')[0]);

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('2020-04-06 20:32:59');
  });

  it('panelRender correctly', () => {
    const component = render(
      <DatePicker
        triggerProps={{
          trigger: 'hover',
        }}
        panelRender={(panelNode) => {
          return (
            <>
              <div className="custom-content">Custom content</div>
              {panelNode}
            </>
          );
        }}
      />
    );
    fireEvent.mouseEnter(component.container.firstChild!);

    jest.runAllTimers();
    expect(screen.getAllByText('Custom content').length).toBe(1);
  });
});

import React from 'react';
import dayjs from 'dayjs';
import { fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import TimePicker from '..';

mountTest(TimePicker);
componentConfigTest(TimePicker, 'TimePicker');

function getCells(component, listIndex) {
  return component
    .find('.arco-timepicker-list')
    .item(listIndex)
    .querySelectorAll('li.arco-timepicker-cell');
}

function getInputValue(component, index) {
  return component.find('.arco-picker-input input').item(index).getAttribute('value');
}

describe('TimePicker', () => {
  it('basic render', () => {
    const component = render(<TimePicker />);

    expect(component.find('svg.arco-icon-clock-circle')).toHaveLength(1);

    fireEvent.click(component.find('.arco-picker')[0]);

    expect(component.find('.arco-timepicker-list')).toHaveLength(3);
    expect(component.find('.arco-timepicker-footer-btn-wrapper button')).toHaveLength(2);
    expect(getCells(component, 0)).toHaveLength(24);
    expect(getCells(component, 1)).toHaveLength(60);
    expect(getCells(component, 2)).toHaveLength(60);
  });

  it('click TimePicker items should change active and call the right callback', () => {
    const onChange = jest.fn();
    const component = render(<TimePicker onChange={onChange} />);
    fireEvent.click(component.find('.arco-picker')[0]);
    fireEvent.click(getCells(component, 0).item(1));
    fireEvent.click(component.find('.arco-timepicker-footer-btn-wrapper button').item(1));
    expect(onChange.mock.calls).toHaveLength(1);
  });

  // it('click RangePicker items should change active and call the right callback', () => {
  //   const props: RangePickerProps = {
  //     onChange: jest.fn(),
  //   };
  //   const component = render(<RangePicker {...props} />);

  //   component.find('.arco-picker-range').simulate('click');

  //   component
  //     .find('.arco-timepicker-list')
  //     .at(0)
  //     .find('li.arco-timepicker-cell')
  //     .at(1)
  //     .simulate('click');

  //   component
  //     .find('.arco-timepicker-list')
  //     .at(3)
  //     .find('li.arco-timepicker-cell')
  //     .at(1)
  //     .simulate('click');

  //   expect(props.onChange).toBeCalled();
  // });

  it('defaultValue', () => {
    const component = render(<TimePicker defaultValue="18:24:23" />);
    expect(getInputValue(component, 0)).toBe('18:24:23');
  });

  it('format', () => {
    const component = render(<TimePicker format="HH:mm" defaultValue={dayjs('09:24', 'HH:mm')} />);

    fireEvent.click(component.find('.arco-picker')[0]);

    expect(getCells(component, 0)).toHaveLength(24);

    expect(getCells(component, 1)).toHaveLength(60);
  });

  describe('use12hours', () => {
    it('use12Hours === true', () => {
      const component = render(
        <TimePicker
          use12Hours
          format="hh:mm:ss A"
          defaultValue={dayjs('12:20:20 AM', 'hh:mm:ss A')}
        />
      );

      fireEvent.click(component.find('.arco-picker')[0]);

      const time = document.querySelectorAll(
        '.arco-timepicker .arco-timepicker-list:first-child .arco-timepicker-cell:last-child .arco-timepicker-cell-inner'
      )[0].textContent;

      expect(time).toBe('11');
    });

    it('use12Hours === false', () => {
      const component = render(
        <TimePicker
          use12Hours={false}
          format="hh:mm:ss A"
          defaultValue={dayjs('12:20:20 AM', 'hh:mm:ss A')}
        />
      );
      fireEvent.click(component.find('.arco-picker')[0]);

      const time = document.querySelectorAll(
        '.arco-timepicker .arco-timepicker-list:first-child .arco-timepicker-cell:last-child .arco-timepicker-cell-inner'
      )[0].textContent;

      expect(time).toBe('23');
    });
  });

  it('step', () => {
    const component = render(
      <TimePicker
        defaultValue="10:25:30"
        step={{
          hour: 2,
          minute: 5,
          second: 10,
        }}
      />
    );

    fireEvent.click(component.find('.arco-picker')[0]);

    expect(getCells(component, 0)).toHaveLength(12);

    expect(getCells(component, 1)).toHaveLength(12);

    expect(getCells(component, 2)).toHaveLength(6);
  });

  it('disabledHours / disabledMinutes / disabledSeconds', () => {
    const component = render(
      <TimePicker
        disabledHours={() => [1, 2, 4, 14]}
        disabledMinutes={() => [1, 2, 3, 4, 14, 15, 16, 20, 50]}
        disabledSeconds={() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]}
      />
    );

    fireEvent.click(component.find('.arco-picker')[0]);

    expect(
      component
        .find('.arco-timepicker-list')
        .item(0)
        .querySelectorAll('.arco-timepicker-cell-disabled')
    ).toHaveLength(4);

    expect(
      component
        .find('.arco-timepicker-list')
        .item(1)
        .querySelectorAll('.arco-timepicker-cell-disabled')
    ).toHaveLength(9);

    expect(
      component
        .find('.arco-timepicker-list')
        .item(2)
        .querySelectorAll('.arco-timepicker-cell-disabled')
    ).toHaveLength(9);
  });

  // it('RangePicker Input', () => {
  //   const onChange = jest.fn();

  //   const component = render(<RangePicker onChange={onChange} />);

  //   component.find('.arco-picker-range').simulate('click');

  //   component
  //     .find('.arco-timepicker-list')
  //     .at(0)
  //     .find('li.arco-timepicker-cell')
  //     .at(1)
  //     .simulate('click');

  //   component
  //     .find('.arco-timepicker-list')
  //     .at(3)
  //     .find('li.arco-timepicker-cell')
  //     .at(1)
  //     .simulate('click');

  //   component
  //     .find('.arco-picker-input input')
  //     .at(0)
  //     .simulate('change');

  //   expect(onChange).toBeCalled();
  // });

  it('allowClear', () => {
    const onChange = jest.fn();

    const component = render(<TimePicker onChange={onChange} defaultValue="18:24:23" />);

    fireEvent.click(component.find('.arco-picker-clear-icon').item(0));

    expect(onChange.mock.calls).toHaveLength(1);
    expect(component.find('.arco-timepicker-container').length).toBe(0);
  });

  it('disableConfirm', () => {
    const onChange = jest.fn();
    const component = render(<TimePicker disableConfirm onChange={onChange} />);

    fireEvent.click(component.find('.arco-picker')[0]);

    fireEvent.click(getCells(component, 0).item(1));
    expect(getInputValue(component, 0)).toBe('01:00:00');
    expect(onChange.mock.calls).toHaveLength(1);
  });

  // https://github.com/arco-design/arco-design/issues/358
  it('set to undefined and onChange correctly', () => {
    const onChange = jest.fn();
    const component = render(
      <TimePicker value={dayjs('00:00:00', 'HH:mm:ss')} disableConfirm onChange={onChange} />
    );

    expect(getInputValue(component, 0)).toBe('00:00:00');

    component.rerender(<TimePicker value={undefined} disableConfirm onChange={onChange} />);

    expect(getInputValue(component, 0)).toBe('');

    fireEvent.click(component.find('.arco-picker')[0]);

    fireEvent.click(getCells(component, 0).item(0));

    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange.mock.calls[0][0]).toBe('00:00:00');
  });

  // https://github.com/arco-design/arco-design/issues/494
  it('should get non-disabled value as default', () => {
    const component = render(
      <TimePicker
        disabledHours={() => [0, 1, 2]}
        disabledMinutes={() => [1, 2]}
        disabledSeconds={() => [0]}
      />
    );
    fireEvent.click(component.find('.arco-picker')[0]);
    fireEvent.click(getCells(component, 1).item(0));
    fireEvent.click(component.find('.arco-timepicker-footer-btn-wrapper button').item(1));
    expect(getInputValue(component, 0)).toBe('03:00:01');
  });
});

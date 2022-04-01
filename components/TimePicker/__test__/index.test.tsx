import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import TimePicker from '..';

mountTest(TimePicker);
componentConfigTest(TimePicker, 'TimePicker');

function getCells(component, listIndex) {
  return component.find('.arco-timepicker-list').at(listIndex).find('li.arco-timepicker-cell');
}

function getInputValue(component, index) {
  return component.find('.arco-picker-input input').at(index).getDOMNode().getAttribute('value');
}

describe('TimePicker', () => {
  it('basic render', () => {
    const component = mount(<TimePicker />);

    expect(component.find('svg.arco-icon-clock-circle')).toHaveLength(1);

    component.find('.arco-picker').simulate('click');

    expect(component.find('.arco-timepicker-list')).toHaveLength(3);
    expect(component.find('.arco-timepicker-footer-btn-wrapper button')).toHaveLength(2);
    expect(getCells(component, 0)).toHaveLength(24);
    expect(getCells(component, 1)).toHaveLength(60);
    expect(getCells(component, 2)).toHaveLength(60);
  });

  it('click TimePicker items should change active and call the right callback', () => {
    const onChange = jest.fn();
    const component = mount(<TimePicker onChange={onChange} />);
    component.find('.arco-picker').simulate('click');
    getCells(component, 0).at(1).simulate('click');
    component.find('.arco-timepicker-footer-btn-wrapper button').at(1).simulate('click');
    expect(onChange.mock.calls).toHaveLength(1);
  });

  // it('click RangePicker items should change active and call the right callback', () => {
  //   const props: RangePickerProps = {
  //     onChange: jest.fn(),
  //   };
  //   const component = mount(<RangePicker {...props} />);

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
    const component = mount(<TimePicker defaultValue="18:24:23" />);
    expect(getInputValue(component, 0)).toBe('18:24:23');
  });

  it('format', () => {
    const component = mount(<TimePicker format="HH:mm" defaultValue={dayjs('09:24', 'HH:mm')} />);

    component.find('.arco-picker').simulate('click');

    expect(getCells(component, 0)).toHaveLength(24);

    expect(getCells(component, 1)).toHaveLength(60);
  });

  it('use12hours', () => {
    const component = mount(
      <TimePicker
        use12Hours
        format="hh:mm:ss A"
        defaultValue={dayjs('12:20:20 AM', 'hh:mm:ss A')}
      />
    );

    component.find('.arco-picker').simulate('click');

    expect(getCells(component, 3)).toHaveLength(2);
  });

  it('step', () => {
    const component = mount(
      <TimePicker
        defaultValue="10:25:30"
        step={{
          hour: 2,
          minute: 5,
          second: 10,
        }}
      />
    );
    component.find('.arco-picker').simulate('click');

    expect(getCells(component, 0)).toHaveLength(12);

    expect(getCells(component, 1)).toHaveLength(12);

    expect(getCells(component, 2)).toHaveLength(6);
  });

  it('disabledHours / disabledMinutes / disabledSeconds', () => {
    const component = mount(
      <TimePicker
        disabledHours={() => [1, 2, 4, 14]}
        disabledMinutes={() => [1, 2, 3, 4, 14, 15, 16, 20, 50]}
        disabledSeconds={() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]}
      />
    );

    component.find('.arco-picker').simulate('click');

    expect(
      component.find('.arco-timepicker-list').at(0).find('.arco-timepicker-cell-disabled')
    ).toHaveLength(4);

    expect(
      component.find('.arco-timepicker-list').at(1).find('.arco-timepicker-cell-disabled')
    ).toHaveLength(9);

    expect(
      component.find('.arco-timepicker-list').at(2).find('.arco-timepicker-cell-disabled')
    ).toHaveLength(9);
  });

  // it('RangePicker Input', () => {
  //   const onChange = jest.fn();

  //   const component = mount(<RangePicker onChange={onChange} />);

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

    const component = mount(<TimePicker onChange={onChange} defaultValue="18:24:23" />);

    component.find('.arco-picker-clear-icon').at(0).simulate('click');

    expect(onChange.mock.calls).toHaveLength(1);
    expect(component.find('.arco-timepicker-container').exists()).toBeFalsy();
  });

  it('disableConfirm', () => {
    const onChange = jest.fn();
    const component = mount(<TimePicker disableConfirm onChange={onChange} />);

    component.find('.arco-picker').simulate('click');

    getCells(component, 0).at(1).simulate('click');
    expect(getInputValue(component, 0)).toBe('01:00:00');
    expect(onChange.mock.calls).toHaveLength(1);
  });

  // https://github.com/arco-design/arco-design/issues/358
  it('set to undefined and onChange correctly', () => {
    const onChange = jest.fn();
    const component = mount(
      <TimePicker value={dayjs('00:00:00', 'HH:mm:ss')} disableConfirm onChange={onChange} />
    );

    expect(getInputValue(component, 0)).toBe('00:00:00');

    component.setProps({ value: undefined });

    expect(getInputValue(component, 0)).toBe('');

    component.find('.arco-picker').simulate('click');

    getCells(component, 0).at(0).simulate('click');

    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange.mock.calls[0][0]).toBe('00:00:00');
  });

  // https://github.com/arco-design/arco-design/issues/494
  it('should get non-disabled value as default', () => {
    const component = mount(
      <TimePicker
        disabledHours={() => [0, 1, 2]}
        disabledMinutes={() => [1, 2]}
        disabledSeconds={() => [0]}
      />
    );
    component.find('.arco-picker').simulate('click');
    getCells(component, 1).at(0).simulate('click');
    component.find('.arco-timepicker-footer-btn-wrapper button').at(1).simulate('click');
    expect(getInputValue(component, 0)).toBe('03:00:01');
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Switch from '..';
import Popconfirm from '../../Popconfirm';
import IconCheck from '../../../icon/react-icon/IconCheck';
import IconClose from '../../../icon/react-icon/IconClose';

mountTest(Switch);
componentConfigTest(Switch, 'Switch');

describe('Switch', () => {
  it('onChange listener correctly', () => {
    const onChange = jest.fn();
    const component = mount(<Switch defaultChecked onChange={onChange} />);

    expect(component.find('.arco-switch').hasClass('arco-switch-checked')).toBe(true);

    component.simulate('click');

    expect(component.find('.arco-switch').hasClass('arco-switch-checked')).toBe(false);
    expect(onChange.mock.calls[0][0]).toBe(false);
  });

  it('different size correctly', () => {
    const component = mount(<Switch size="small" defaultChecked />);

    expect(component.find('.arco-switch').hasClass('arco-switch-small')).toBe(true);
  });

  it('different type correctly', () => {
    const component = mount(<Switch type="round" defaultChecked />);
    const component2 = mount(<Switch type="line" defaultChecked />);

    expect(component.find('.arco-switch').hasClass('arco-switch-type-round')).toBe(true);
    expect(component2.find('.arco-switch').hasClass('arco-switch-type-line')).toBe(true);
  });

  it('checked and unchecked correctly', () => {
    const component = mount(<Switch defaultChecked checkedText="ON" uncheckedText="OFF" />);
    expect(component.find('.arco-switch').hasClass('arco-switch-checked')).toBe(true);

    component.simulate('click');

    expect(component.find('.arco-switch').hasClass('arco-switch-checked')).toBe(false);
  });

  it('as formItem checked correctly', () => {
    const component = mount(<Switch value />);
    expect(component.find('.arco-switch').hasClass('arco-switch-checked')).toBe(true);
  });

  it('loading', () => {
    const component = mount(<Switch defaultChecked loading />);
    expect(component.find('.arco-switch').hasClass('arco-switch-checked')).toBe(true);
    expect(
      component.find('.arco-switch-dot .arco-switch-dot-icon svg').hasClass('arco-icon-loading')
    ).toBe(true);

    component.simulate('click');

    expect(component.find('.arco-switch').hasClass('arco-switch-checked')).toBe(true);
  });

  it('dot icon', () => {
    const component = mount(<Switch checkedIcon={<IconCheck />} uncheckedIcon={<IconClose />} />);

    expect(
      component.find('.arco-switch-dot .arco-switch-dot-icon svg').hasClass('arco-icon-close')
    ).toBe(true);

    act(() => {
      component.simulate('click');
    });

    component.find('.arco-switch-dot .arco-switch-dot-icon svg').hasClass('arco-icon-check');
  });

  it('showTriger ', () => {
    const component = mount(
      <Popconfirm title="xxx">
        <Switch />
      </Popconfirm>
    );

    act(() => {
      component.simulate('click');
    });

    component.update();

    expect(component.find('.arco-popconfirm')).toHaveLength(1);
  });
});

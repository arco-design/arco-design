import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Checkbox from '..';

mountTest(Checkbox);
componentConfigTest(Checkbox, 'Checkbox');

describe('Checkbox uncontrolled', () => {
  it('Checkbox default check', () => {
    const wrapper = mount(<Checkbox defaultChecked>Checkbox</Checkbox>);
    expect(wrapper.find('.arco-checkbox').hasClass('arco-checkbox-checked')).toBe(true);
  });

  it('Checkbox onChange', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Checkbox onChange={mockFn}>Checkbox</Checkbox>);
    wrapper.find('.arco-checkbox > input').simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(mockFn.call.length).toBe(1);

    expect(wrapper.find('.arco-checkbox').hasClass('arco-checkbox-checked')).toBe(true);
  });
});

describe('Checkbox controlled', () => {
  it('Checkbox check', () => {
    const mockFn = jest.fn();

    const wrapper = mount(
      <Checkbox onChange={mockFn} checked>
        Checkbox
      </Checkbox>
    );
    expect(wrapper.find('.arco-checkbox').hasClass('arco-checkbox-checked')).toBe(true);
    wrapper.find('.arco-checkbox > input').simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(mockFn.call.length).toBe(1);

    expect(wrapper.find('.arco-checkbox').hasClass('arco-checkbox-checked')).toBe(true);
  });

  it('Checkbox onChange', () => {
    let checked = false;
    const wrapper = mount(
      <Checkbox checked={checked} onChange={(v) => (checked = v)}>
        Checkbox
      </Checkbox>
    );
    wrapper.find('.arco-checkbox > input').simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(checked).toBe(true);
    wrapper.setProps({ checked });

    expect(wrapper.find('.arco-checkbox').hasClass('arco-checkbox-checked')).toBe(true);

    wrapper.find('.arco-checkbox > input').simulate('change', {
      target: {
        checked: false,
      },
    });
    expect(checked).toBe(false);
    wrapper.setProps({ checked: false });
    expect(wrapper.find('.arco-checkbox').hasClass('arco-checkbox-checked')).toBe(false);
  });
});

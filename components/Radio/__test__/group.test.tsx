import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Radio from '..';

const RadioGroup = Radio.Group;

mountTest(RadioGroup);
componentConfigTest(RadioGroup, 'Radio.Group');

describe('Radio.Group', () => {
  function test(options, isChildren) {
    const children = isChildren
      ? options.map((x) => (
          <Radio key={x} value={x}>
            {x}
          </Radio>
        ))
      : null;
    it('expect render correctly', () => {
      const radioGroup = mount(
        <RadioGroup defaultValue="zhou" options={options}>
          {children}
        </RadioGroup>
      );
      expect(radioGroup.find('.arco-radio').length).toBe(3);

      expect(radioGroup.find('.arco-radio').at(0).hasClass('arco-radio-checked')).toBeTruthy();
    });
    it('expect onChange correctly', () => {
      const mockFn = jest.fn();
      const radioGroup = mount(
        <RadioGroup defaultValue="zhou" onChange={mockFn} options={options}>
          {children}
        </RadioGroup>
      );

      expect(radioGroup.find('.arco-radio').at(0).hasClass('arco-radio-checked')).toBeTruthy();

      radioGroup.find('.arco-radio input').at(2).simulate('change');

      expect(mockFn).toBeCalledTimes(1);
    });

    it('value control', () => {
      let value = 'zhou';
      const radioGroup = mount(
        <RadioGroup value={value} onChange={(v) => (value = v)} options={options}>
          {children}
        </RadioGroup>
      );
      expect(radioGroup.find('.arco-radio').at(0).hasClass('arco-radio-checked')).toBeTruthy();

      radioGroup.find('.arco-radio input').at(1).simulate('change');

      expect(value).toBe('jie');
      radioGroup.setProps({ value });

      expect(radioGroup.find('.arco-radio').at(1).hasClass('arco-radio-checked')).toBeTruthy();

      radioGroup.setProps({ value: 'lun' });

      expect(radioGroup.find('.arco-radio').at(2).hasClass('arco-radio-checked')).toBeTruthy();
    });
  }

  test(['zhou', 'jie', 'lun'], true);

  test(['zhou', 'jie', 'lun'], false);

  test(
    [
      { value: 'zhou', label: '周' },
      { value: 'jie', label: '杰' },
      { value: 'lun', label: '伦' },
    ],
    false
  );

  it('test disabled props', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <RadioGroup
        onChange={mockFn}
        options={[
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3', disabled: true },
        ]}
        defaultValue="2"
      />
    );

    expect(wrapper.find('.arco-radio').at(2).hasClass('arco-radio-disabled')).toBeTruthy();

    expect(wrapper.find('.arco-radio').at(1).hasClass('arco-radio-checked')).toBeTruthy();

    wrapper.find('.arco-radio input').at(0).simulate('change');
    expect(wrapper.find('.arco-radio').at(0).hasClass('arco-radio-checked')).toBeTruthy();
    expect(mockFn).toBeCalledTimes(1);

    wrapper.find('.arco-radio input').at(2).simulate('change');
    expect(wrapper.find('.arco-radio').at(0).hasClass('arco-radio-checked')).toBeTruthy();

    expect(mockFn).toBeCalledTimes(1);
  });
});

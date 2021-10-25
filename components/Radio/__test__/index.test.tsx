import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Radio, { RadioProps } from '..';

mountTest(Radio);
componentConfigTest(Radio, 'Radio');

function mountRadio<T>(component: React.ReactElement) {
  return mount<React.PureComponent<RadioProps<T>>, React.PropsWithChildren<RadioProps<T>>>(
    component
  );
}

describe('Radio', () => {
  it('radio render correctly', () => {
    const wrapper = mountRadio(<Radio>周</Radio>);
    expect(wrapper.find('.arco-radio')).toHaveLength(1);

    wrapper
      .find('.arco-radio input')
      .at(0)
      .simulate('change');
    expect(
      wrapper
        .find('.arco-radio')
        .at(0)
        .hasClass('arco-radio-checked')
    ).toBeTruthy();
  });

  it('radio defaultChecked correctly', () => {
    const wrapper = mountRadio(<Radio defaultChecked>周</Radio>);
    expect(wrapper.find('.arco-radio')).toHaveLength(1);

    expect(
      wrapper
        .find('.arco-radio')
        .at(0)
        .hasClass('arco-radio-checked')
    ).toBeTruthy();
  });

  it('radio onChange correctly', () => {
    const mockFn = jest.fn();
    const checked = false;
    const wrapper = mountRadio(
      <Radio checked={checked} onChange={mockFn}>
        周
      </Radio>
    );
    expect(wrapper.find('.arco-radio')).toHaveLength(1);

    expect(
      wrapper
        .find('.arco-radio')
        .at(0)
        .hasClass('arco-radio-checked')
    ).toBeFalsy();

    wrapper
      .find('.arco-radio input')
      .at(0)
      .simulate('change');

    expect(mockFn).toBeCalledTimes(1);
  });
});

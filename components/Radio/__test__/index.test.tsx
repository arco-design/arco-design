import React from 'react';
import { act, fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Radio from '..';

mountTest(Radio);
componentConfigTest(Radio, 'Radio');

function mountRadio(component: React.ReactElement) {
  return render(component);
}

describe('Radio', () => {
  it('radio render correctly', () => {
    const wrapper = mountRadio(<Radio>周</Radio>);
    expect(wrapper.find('.arco-radio')).toHaveLength(1);

    fireEvent.click(wrapper.find('.arco-radio')[0]);
    expect(wrapper.find('.arco-radio')[0]).toHaveClass('arco-radio-checked');
  });

  it('radio defaultChecked correctly', () => {
    const wrapper = mountRadio(<Radio defaultChecked>周</Radio>);
    expect(wrapper.find('.arco-radio')).toHaveLength(1);

    expect(wrapper.find('.arco-radio')[0]).toHaveClass('arco-radio-checked');
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

    expect(wrapper.find('.arco-radio')[0].className).toBe('arco-radio');

    act(() => {
      fireEvent.click(wrapper.find('.arco-radio')[0]);
    });

    expect(mockFn).toBeCalledTimes(1);
    expect(wrapper.find('.arco-radio')[0].className).toBe('arco-radio');
  });
});

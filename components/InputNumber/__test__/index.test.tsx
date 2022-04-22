import React, { useState } from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import InputNumber from '..';

mountTest(InputNumber);
componentConfigTest(InputNumber, 'InputNumber');

function mountInputNumber(component: React.ReactElement) {
  return mount(component);
}

describe('InputNumber ', () => {
  it('init value correctly', () => {
    const wrapper = mountInputNumber(<InputNumber defaultValue={8} min={0} max={15} />);
    const input = wrapper.find('.arco-input');

    expect(+input.prop('value')).toBe(8);
    input.simulate('change', { target: { value: '12' } });
    expect(+wrapper.find('.arco-input').prop('value')).toBe(12);
    input.simulate('change', { target: { value: '123' } });
    expect(+wrapper.find('.arco-input').prop('value')).toBe(123);
    input.simulate('blur');
    expect(+wrapper.find('.arco-input').prop('value')).toBe(15);
    input.simulate('change', { target: { value: '-123' } });
    expect(+wrapper.find('.arco-input').prop('value')).toBe(-123);
    input.simulate('blur');
    expect(+wrapper.find('.arco-input').prop('value')).toBe(0);
  });

  it('init value with empty string correctly', () => {
    const wrapper = mountInputNumber(<InputNumber value="" />);
    expect(wrapper.find('.arco-input').prop('value')).toBe('');
  });

  it('init value with string correctly', () => {
    const wrapper = mountInputNumber(<InputNumber value="8.0000" precision={2} />);
    expect(wrapper.find('.arco-input').prop('value')).toBe('8.00');
  });

  it('value control mode', () => {
    const Demo = () => {
      const [value, setValue] = useState(0);
      return (
        <div>
          <button id="clear" onClick={() => setValue(undefined)}>
            clear
          </button>
          <InputNumber value={value} min={10} />;
        </div>
      );
    };
    const wrapper = mountInputNumber(<Demo />);
    expect(+wrapper.find('.arco-input').prop('value')).toBe(0);
    wrapper.find('#clear').at(0).simulate('click');
    expect(wrapper.find('.arco-input').prop('value')).toBe('');
  });

  it('plus correctly', () => {
    const wrapper = mountInputNumber(<InputNumber min={0} max={15} />);
    const plusButton = wrapper.find('.arco-input-number-step-button').at(0);

    expect(wrapper.find('.arco-input').prop('value')).toBe('');

    for (let i = 0; i <= 20; i++) {
      plusButton.simulate('mousedown');
      plusButton.simulate('mouseup');
      if (i < 15) {
        expect(+wrapper.find('.arco-input').prop('value')).toBe(i);
      } else {
        expect(+wrapper.find('.arco-input').prop('value')).toBe(15);
      }
    }
  });

  it('minus correctly', () => {
    const wrapper = mountInputNumber(<InputNumber min={0} max={15} />);
    const buttons = wrapper.find('.arco-input-number-step-button');
    const plusButton = buttons.at(0);
    const minusButton = buttons.at(1);

    plusButton.simulate('mousedown');
    plusButton.simulate('mouseup');
    expect(+wrapper.find('input').prop('value')).toBe(0);

    for (let i = 0; i < 5; i++) {
      minusButton.simulate('mousedown');
      plusButton.simulate('mouseup');
      expect(+wrapper.find('input').prop('value')).toBe(0);
    }
  });

  it('keyboard plus correctly', () => {
    const wrapper = mountInputNumber(<InputNumber min={0} max={15} />);
    const input = wrapper.find('.arco-input');
    input.simulate('keydown', {
      key: 'ArrowUp',
    });

    expect(+wrapper.find('input').prop('value')).toBe(0);
    for (let i = 0; i < 5; i++) {
      input.simulate('keydown', {
        key: 'ArrowUp',
      });
      expect(+wrapper.find('input').prop('value')).toBe(i + 1);
    }
  });

  it('keyboard minus correctly', () => {
    const wrapper = mountInputNumber(<InputNumber defaultValue={6} min={0} max={15} />);
    const input = wrapper.find('.arco-input');

    input.simulate('keydown', {
      key: 'ArrowDown',
    });
    expect(+wrapper.find('input').prop('value')).toBe(5);

    for (let i = 5; i > 0; i--) {
      input.simulate('keydown', {
        key: 'ArrowDown',
      });
      expect(+wrapper.find('input').prop('value')).toBe(i - 1);
    }
  });

  it('step precision correctly', () => {
    const wrapper = mountInputNumber(<InputNumber defaultValue={6} min={0} max={15} step={0.01} />);
    expect(+wrapper.find('input').prop('value')).toBe(6);
  });

  it('props precision correctly', () => {
    let wrapper = mountInputNumber(<InputNumber defaultValue={6} step={0.01} precision={3} />);
    expect(wrapper.find('input').prop('value')).toBe('6.000');

    wrapper = mountInputNumber(<InputNumber defaultValue={6.1234} precision={3} />);
    expect(wrapper.find('input').prop('value')).toBe('6.123');

    wrapper = mountInputNumber(<InputNumber defaultValue={6.1235} precision={3} />);
    expect(wrapper.find('input').prop('value')).toBe('6.124');
  });

  describe('formatter', () => {
    it('formatter on default', () => {
      const wrapper = mountInputNumber(
        <InputNumber defaultValue={6} min={0} max={15} formatter={(num) => `${num}%`} />
      );
      expect(wrapper.find('input').prop('value')).toBe('6%');
    });

    it('formatter on mousedown', () => {
      const wrapper = mountInputNumber(
        <InputNumber defaultValue={6} min={0} max={15} formatter={(num) => `${num}%`} />
      );
      const buttons = wrapper.find('.arco-input-number-step-button');
      const plusButton = buttons.at(0);
      const minusButton = buttons.at(1);

      plusButton.simulate('mousedown');
      plusButton.simulate('mouseup');
      expect(wrapper.find('input').prop('value')).toBe('7%');

      minusButton.simulate('mousedown');
      minusButton.simulate('mouseup');
      expect(wrapper.find('input').prop('value')).toBe('6%');
    });

    it('formatter on keydown', () => {
      const wrapper = mountInputNumber(
        <InputNumber defaultValue={6} min={0} max={15} formatter={(num) => `${num}%`} />
      );
      const input = wrapper.find('.arco-input');

      input.simulate('keydown', {
        key: 'ArrowDown',
      });
      expect(wrapper.find('input').prop('value')).toBe('5%');

      for (let i = 5; i > 0; i--) {
        input.simulate('keydown', {
          key: 'ArrowDown',
        });
        expect(wrapper.find('input').prop('value')).toBe(`${i - 1}%`);
      }
      expect(wrapper.find('input').prop('value')).toBe('0%');

      for (let i = 0; i < 5; i++) {
        input.simulate('keydown', {
          key: 'ArrowUp',
        });
        expect(wrapper.find('input').prop('value')).toBe(`${i + 1}%`);
      }
    });

    it('formatter on input', () => {
      let changeValue = 6;
      const wrapper = mountInputNumber(
        <InputNumber
          defaultValue={6}
          min={0}
          max={15}
          formatter={(num) => `${num}%`}
          onChange={(val) => (changeValue = val)}
        />
      );
      const input = wrapper.find('.arco-input');

      input.simulate('focus');
      input.simulate('change', { target: { value: '12' } });
      expect(wrapper.find('input').prop('value')).toBe('12%');
      expect(changeValue).toBe(12);
      input.simulate('blur');
      expect(wrapper.find('input').prop('value')).toBe('12%');
    });

    it('formatter and parser', () => {
      let changeValue = 0;
      const wrapper = mountInputNumber(
        <InputNumber
          min={0}
          max={1000000000}
          onChange={(val) => (changeValue = val)}
          parser={(value) => Number(value) / 100}
          formatter={(value) => `${Number(value) * 100}`}
          step={0.1}
        />
      );
      const input = wrapper.find('.arco-input');
      input.simulate('focus');
      input.simulate('change', { target: { value: '12' } });
      expect(wrapper.find('input').prop('value')).toBe('12');
      expect(changeValue).toBe(0.12);
      input.simulate('blur');
      expect(wrapper.find('input').prop('value')).toBe('12');
      expect(changeValue).toBe(0.12);
    });
  });

  describe('blur and focus', () => {
    it('onBlur and onFocus', () => {
      const onBlur = jest.fn();
      const onFocus = jest.fn();
      const wrapper = mountInputNumber(
        <InputNumber onBlur={onBlur} onFocus={onFocus} defaultValue={7} min={0} max={15} />
      );
      const input = wrapper.find('.arco-input');

      input.simulate('focus');
      expect(onFocus.mock.calls.length).toBe(1);
      input.simulate('blur');
      expect(onBlur.mock.calls.length).toBe(1);
    });
  });

  it('max and min works fine', () => {
    const Demo = () => {
      const [value, setValue] = useState(5);
      return (
        <div>
          <button onClick={() => setValue(value + 10)}>Add</button>
          <InputNumber min={10} max={20} value={value} onChange={setValue} />
        </div>
      );
    };
    const wrapper = mount(<Demo />);

    expect(wrapper.find('input').prop('value')).toBe('5');

    wrapper.find('button').simulate('click');
    expect(wrapper.find('input').prop('value')).toBe('15');

    wrapper.find('button').simulate('click');
    expect(wrapper.find('input').prop('value')).toBe('25');

    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('blur');
    expect(wrapper.find('input').prop('value')).toBe('20');
  });
});

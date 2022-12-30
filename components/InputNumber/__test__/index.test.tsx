import React, { useState } from 'react';
import { render, fireEvent } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import InputNumber from '..';
import { ArrowDown, ArrowUp } from '../../_util/keycode';

mountTest(InputNumber);
componentConfigTest(InputNumber, 'InputNumber');

const getInputValue = (wrapper, index?: number) => {
  return wrapper.find('.arco-input').item(index ?? 0).value;
};

describe('InputNumber ', () => {
  it('init value correctly', () => {
    const wrapper = render(<InputNumber defaultValue={8} min={0} max={15} />);
    const input = wrapper.find<HTMLInputElement>('.arco-input')[0];

    expect(input.value).toBe('8');
    fireEvent.change(input, { target: { value: '12' } });
    expect(getInputValue(wrapper)).toBe('12');
    fireEvent.change(input, { target: { value: '123' } });
    expect(getInputValue(wrapper)).toBe('123');
    fireEvent.blur(input);
    expect(getInputValue(wrapper)).toBe('15');
    fireEvent.change(input, { target: { value: '-123' } });
    expect(getInputValue(wrapper)).toBe('-123');
    fireEvent.blur(input);
    expect(getInputValue(wrapper)).toBe('0');
  });

  it('init value with scientific notation', () => {
    const wrapper = render(
      <>
        <InputNumber defaultValue={1.234e5} />
        <InputNumber defaultValue={-2.34e-5} />
        <InputNumber defaultValue={-0.000000000000000000001} />
        <InputNumber defaultValue={10000000000000000000000} />
        <InputNumber defaultValue={-10000000000000000000000} />
      </>
    );
    expect(getInputValue(wrapper, 0)).toBe('123400');
    expect(getInputValue(wrapper, 1)).toBe('-0.0000234');
    expect(getInputValue(wrapper, 2)).toBe('-0.000000000000000000001');
    expect(getInputValue(wrapper, 3)).toBe('10000000000000000000000');
    expect(getInputValue(wrapper, 4)).toBe('-10000000000000000000000');
  });

  it('init value with empt string correctly', () => {
    const wrapper = render(<InputNumber value="" />);
    expect(getInputValue(wrapper)).toBe('');
  });
  it('init value with string correctly', () => {
    const wrapper = render(<InputNumber value="8.0000" precision={2} />);
    expect(getInputValue(wrapper)).toBe('8.00');
  });

  it('value control mode', () => {
    const Demo = () => {
      const [value, setValue] = useState<number | undefined>(0);
      return (
        <div>
          <button id="clear" onClick={() => setValue(undefined)}>
            clear
          </button>
          <InputNumber value={value} min={10} />;
        </div>
      );
    };
    const wrapper = render(<Demo />);
    expect(getInputValue(wrapper)).toBe('0');
    const clearIcon = wrapper.querySelector('#clear');
    fireEvent.click(clearIcon!);
    expect(getInputValue(wrapper)).toBe('');
  });

  it('plus correctly', () => {
    const wrapper = render(<InputNumber min={0} max={15} />);
    const plusButton = wrapper.find('.arco-input-number-step-button').item(0);

    expect(getInputValue(wrapper, 0)).toBe('');

    for (let i = 0; i <= 20; i++) {
      fireEvent.mouseDown(plusButton);
      fireEvent.mouseUp(plusButton);
      if (i < 15) {
        expect(getInputValue(wrapper, 0)).toBe(String(i));
      } else {
        expect(getInputValue(wrapper, 0)).toBe('15');
      }
    }
  });

  it('minus correctly', () => {
    const wrapper = render(<InputNumber min={0} max={15} />);
    const buttons = wrapper.find('.arco-input-number-step-button');
    const plusButton = buttons.item(0);
    const minusButton = buttons.item(1);

    fireEvent.mouseDown(plusButton);
    fireEvent.mouseUp(plusButton);
    expect(getInputValue(wrapper, 0)).toBe('0');

    for (let i = 0; i < 5; i++) {
      fireEvent.mouseDown(minusButton);
      fireEvent.mouseUp(plusButton);
      expect(getInputValue(wrapper, 0)).toBe('0');
    }
  });

  it('keyboard plus correctly', () => {
    const wrapper = render(<InputNumber min={0} max={15} />);
    const input = wrapper.getByRole('spinbutton');
    for (let i = 0; i < 5; i++) {
      fireEvent.keyDown(input, { keyCode: ArrowUp.code });
      expect(getInputValue(wrapper, 0)).toBe(String(i));
    }
  });

  it('keyboard minus correctly', () => {
    const wrapper = render(<InputNumber defaultValue={6} min={0} max={15} />);
    const input = wrapper.getByRole('spinbutton');
    fireEvent.keyDown(input, { keyCode: ArrowDown.code });

    expect(getInputValue(wrapper, 0)).toBe('5');

    for (let i = 5; i > 0; i--) {
      fireEvent.keyDown(input, { keyCode: ArrowDown.code });
      expect(getInputValue(wrapper, 0)).toBe(String(i - 1));
    }
  });

  it('step precision correctly', () => {
    const wrapper = render(<InputNumber defaultValue={6} min={0} max={15} step={0.01} />);
    expect(getInputValue(wrapper, 0)).toBe('6');
  });

  it('props precision correctly', () => {
    const wrapper = render(<InputNumber defaultValue={6} step={0.01} precision={3} />);
    expect(getInputValue(wrapper, 0)).toBe('6.000');

    const wrapper2 = render(<InputNumber defaultValue={6.1234} precision={3} />);
    expect(getInputValue(wrapper2, 1)).toBe('6.123');

    const wrapper3 = render(<InputNumber defaultValue={6.1235} precision={3} />);
    expect(getInputValue(wrapper3, 2)).toBe('6.124');
  });

  describe('formatter', () => {
    it('formatter on default', () => {
      const wrapper = render(
        <InputNumber defaultValue={6} min={0} max={15} formatter={(num) => `${num}%`} />
      );
      expect(getInputValue(wrapper)).toBe('6%');
    });

    it('formatter on mousedown', () => {
      const wrapper = render(
        <InputNumber defaultValue={6} min={0} max={15} formatter={(num) => `${num}%`} />
      );
      const buttons = wrapper.find('.arco-input-number-step-button');
      const plusButton = buttons.item(0);
      const minusButton = buttons.item(1);
      fireEvent.mouseDown(plusButton);
      fireEvent.mouseUp(plusButton);
      expect(getInputValue(wrapper)).toBe('7%');

      fireEvent.mouseDown(minusButton);
      fireEvent.mouseUp(minusButton);
      expect(getInputValue(wrapper)).toBe('6%');
    });

    it('formatter on keydown', () => {
      const wrapper = render(
        <InputNumber defaultValue={6} min={0} max={15} formatter={(num) => `${num}%`} />
      );
      const input = wrapper.find('.arco-input')[0];
      fireEvent.keyDown(input, { keyCode: ArrowDown.code });
      expect(getInputValue(wrapper)).toBe('5%');

      for (let i = 5; i > 0; i--) {
        fireEvent.keyDown(input, { keyCode: ArrowDown.code });
        expect(getInputValue(wrapper)).toBe(`${i - 1}%`);
      }
      expect(getInputValue(wrapper)).toBe('0%');

      for (let i = 0; i < 5; i++) {
        fireEvent.keyDown(input, { keyCode: ArrowUp.code });
        expect(getInputValue(wrapper)).toBe(`${i + 1}%`);
      }
    });

    it('formatter on input', () => {
      let changeValue = 6;
      const wrapper = render(
        <InputNumber
          defaultValue={6}
          min={0}
          max={15}
          formatter={(value, { userTyping, input }) =>
            userTyping ? input : `${`${value}`.replace(/%/g, '')}%`
          }
          parser={(value) => value.replace('%', '')}
          onChange={(val) => (changeValue = val)}
        />
      );
      const input = wrapper.find('.arco-input')[0];
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: '12' } });
      expect(getInputValue(wrapper)).toBe('12');
      expect(changeValue).toBe(12);
      fireEvent.blur(input);
      expect(getInputValue(wrapper)).toBe('12%');
    });

    it('formatter and parser', () => {
      let changeValue = 0;
      const wrapper = render(
        <InputNumber
          min={0}
          max={1000000000}
          onChange={(val) => (changeValue = val)}
          parser={(value) => Number(value) / 100}
          formatter={(value) => `${Number(value) * 100}`}
          step={0.1}
        />
      );
      const input = wrapper.find('.arco-input')[0];
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: '12' } });
      expect(getInputValue(wrapper)).toBe('12');
      expect(changeValue).toBe(0.12);
      fireEvent.blur(input);
      expect(getInputValue(wrapper)).toBe('12');
      expect(changeValue).toBe(0.12);
    });
  });

  describe('blur and focus', () => {
    it('onBlur and onFocus', () => {
      const onBlur = jest.fn();
      const onFocus = jest.fn();
      const wrapper = render(
        <InputNumber onBlur={onBlur} onFocus={onFocus} defaultValue={7} min={0} max={15} />
      );
      const input = wrapper.find('.arco-input')[0];

      fireEvent.focus(input);
      expect(onFocus.mock.calls.length).toBe(1);
      fireEvent.blur(input);
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
    const wrapper = render(<Demo />);

    expect(getInputValue(wrapper)).toBe('5');
    const addValBtn = wrapper.find('button')[0];

    fireEvent.click(addValBtn);
    expect(getInputValue(wrapper)).toBe('15');

    fireEvent.click(addValBtn);
    expect(getInputValue(wrapper)).toBe('25');

    fireEvent.focus(wrapper.find('input')[0]);
    fireEvent.blur(wrapper.find('input')[0]);
    expect(getInputValue(wrapper)).toBe('20');
  });

  it('big decimal', () => {
    const valueStrAfterAddOnce = '1000000000000000019884624838656.000000000000000000000000000001';
    const onChange = jest.fn();
    const wrapper = render(
      <InputNumber mode="button" strictMode defaultValue={1e30} step={1e-30} onChange={onChange} />
    );

    fireEvent.mouseDown(wrapper.querySelectorAll('.arco-input-number-step-button')[1]);
    expect(getInputValue(wrapper)).toBe(valueStrAfterAddOnce);
    expect(onChange).toBeCalledWith(valueStrAfterAddOnce);
  });

  it('avoid Number.toFixed() error while precision is larger than 100', () => {
    const wrapper = render(<InputNumber defaultValue={1e-200} />);
    expect(getInputValue(wrapper)).toBe('0');
  });
});

import React from 'react';
import InputTag from '..';
import { sleep, render, fireEvent } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import { Backspace, Enter } from '../../_util/keycode';

mountTest(InputTag);
componentConfigTest(InputTag, 'InputTag');

describe('InputTag', () => {
  it('render correctly', () => {
    const placeholder = 'Please input';
    const wrapper = render(<InputTag disabled readOnly error placeholder={placeholder} />);

    expect(wrapper.querySelector('input')?.getAttribute('placeholder')).toBe(placeholder);
    expect(wrapper.querySelector('.arco-input-tag')).toHaveClass(
      'arco-input-tag-disabled',
      'arco-input-tag-error',
      'arco-input-tag-readonly'
    );
  });

  it('input correctly', async () => {
    const mockOnChange = jest.fn();
    const mockOnRemove = jest.fn();
    const wrapper = render(
      <InputTag onChange={mockOnChange} onRemove={mockOnRemove} defaultValue={['a']} />
    );
    const eleInput = wrapper.querySelector('input') as HTMLElement;
    const eleRoot = wrapper.querySelector('.arco-input-tag');

    expect(document.querySelectorAll('.arco-tag')).toHaveLength(1);

    fireEvent.focus(eleInput);
    expect(eleRoot).toHaveClass('arco-input-tag-focus');

    fireEvent.change(eleInput, { target: { value: 'b' } });
    await sleep(10);
    fireEvent.keyDown(eleInput, { keyCode: Enter.code });
    await sleep(10);
    expect(JSON.stringify(mockOnChange.mock.calls[0][0])).toBe(JSON.stringify(['a', 'b']));

    fireEvent.keyDown(eleInput, { keyCode: Backspace.code });
    expect(mockOnRemove.mock.calls.length).toBe(1);
  });

  it('saveOnBlur works', async () => {
    const inputValue = 'a';
    const mockOnChange = jest.fn();
    const wrapper = render(<InputTag saveOnBlur onChange={mockOnChange} />);
    const eleInput = wrapper.querySelector('input') as HTMLElement;

    fireEvent.change(eleInput, { target: { value: inputValue } });
    await sleep(10);
    fireEvent.blur(eleInput);
    await sleep(10);

    expect(JSON.stringify(mockOnChange.mock.calls[0][0])).toBe(JSON.stringify([inputValue]));
  });

  it('onClick called correctly', async () => {
    const mockOnClick = jest.fn();
    const wrapper = render(<InputTag onClick={mockOnClick} />);

    fireEvent.click(wrapper.querySelector('input') as HTMLElement);
    expect(mockOnClick).toBeCalled();
  });

  it('test contains together allowClear and readOnly and do not show the clear button', () => {
    const component = render(<InputTag allowClear readOnly defaultValue={['123']} />);
    expect(component.querySelector('.arco-input-tag-clear-icon svg')).toBeFalsy();
  });

  it('validate should format user input', async () => {
    const inputValue = 'hello';
    const mockOnChange = jest.fn();
    const defaultValue = [
      { label: '1', value: { word: 'One' } },
      { label: '2', value: { word: 'Two' } },
    ];

    const wrapper = render(
      <InputTag
        defaultValue={defaultValue}
        onChange={mockOnChange}
        validate={(inputValue) => ({ word: inputValue })}
      />
    );

    fireEvent.change(wrapper.querySelector('input') as HTMLElement, {
      target: { value: inputValue },
    });
    await sleep(10);
    fireEvent.keyDown(wrapper.querySelector('input') as HTMLElement, { keyCode: Enter.code });
    await sleep(10);

    expect(JSON.stringify(mockOnChange.mock.calls[0][0])).toBe(
      JSON.stringify(defaultValue.map(({ value }) => value).concat({ word: inputValue }))
    );
  });

  it('tokenSeparators', async () => {
    const onChange = jest.fn();
    const wrapper = render(
      <InputTag
        tokenSeparators={[',', ';', '\n']}
        labelInValue
        validate={async (text) => {
          // only allow number less than 10
          return isNaN(+text) ? false : +text > 10 ? `+${text}` : text;
        }}
        onChange={onChange}
      />
    );
    const eleInput = wrapper.querySelector('input');

    fireEvent.change(eleInput, { target: { value: 'a,b,1,2,12' } });
    await sleep(10);
    expect(onChange.mock.calls[0][0]).toEqual([
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '12', value: '+12' },
    ]);
  });

  it('tokenSeparators validate failed', async () => {
    const onValidate = jest.fn();
    const value = [];
    const wrapper = render(
      <InputTag
        tokenSeparators={[',']}
        validate={(text) => {
          const exist = value.indexOf(text) > -1;
          onValidate(text);
          return !exist;
        }}
      />
    );

    const simulatePaste = () => {
      const eleInput = wrapper.querySelector('input');
      fireEvent.paste(eleInput, { clipboardData: { getData: () => 'a,b,c' } });
      fireEvent.change(eleInput, {
        target: { value: 'a,b,c' },
      });
    };

    simulatePaste();
    await sleep(10);

    expect(onValidate).toBeCalledTimes(6);
    expect(wrapper.querySelectorAll('.arco-tag')).toHaveLength(3);
    expect(wrapper.querySelector('input').getAttribute('value')).toBe('');
  });
});

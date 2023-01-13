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
    fireEvent.keyDown(wrapper.querySelector('input') as HTMLElement, { keyCode: Enter.code });

    await sleep(10);

    expect(JSON.stringify(mockOnChange.mock.calls[0][0])).toBe(
      JSON.stringify(defaultValue.map(({ value }) => value).concat({ word: inputValue }))
    );
  });

  it('tokenSeparators', async () => {
    const onChange = jest.fn();
    const wrapper = render(<InputTag tokenSeparators={[',', ';', '\n']} onChange={onChange} />);
    const eleInput = wrapper.querySelector('input');

    fireEvent.change(eleInput, { target: { value: 'a,b' } });
    expect(onChange.mock.calls[0][0]).toEqual(['a', 'b']);
  });
});

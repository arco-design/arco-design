import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import InputTag from '..';
import { sleep } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import { Backspace, Enter } from '../../_util/keycode';

mountTest(InputTag);
componentConfigTest(InputTag, 'InputTag');

const getInputAttr = (wrapper, name) => {
  return wrapper
    .find('input')
    .getDOMNode()
    .getAttribute(name);
};

describe('InputTag', () => {
  it('render correctly', () => {
    const wrapper = mount(<InputTag placeholder="请输入" />);

    expect(getInputAttr(wrapper, 'placeholder')).toEqual('请输入');

    wrapper.setProps({
      readOnly: true,
    });

    expect(getInputAttr(wrapper, 'readonly')).toBe('');
    wrapper.setProps({
      disabled: true,
    });

    expect(getInputAttr(wrapper, 'disabled')).toEqual('');

    wrapper.setProps({
      error: true,
    });

    expect(wrapper.find('.arco-input-tag').hasClass('arco-input-tag-error')).toBe(true);
  });

  it('input correctly', async () => {
    const mockOnChange = jest.fn();
    const mockOnRemove = jest.fn();
    const wrapper = mount(
      <InputTag
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        placeholder="请输入"
        defaultValue={['aaa']}
      />
    );

    expect(wrapper.find('Tag')).toHaveLength(1);

    // 聚焦
    act(() => {
      wrapper.find('input').simulate('focus');
    });
    wrapper.update();
    expect(wrapper.find('.arco-input-tag').hasClass('arco-input-tag-focus')).toBe(true);

    // 输入后回车
    act(() => {
      wrapper
        .find('input')
        .simulate('change', { currentTarget: { value: 'bbb' }, target: { value: 'bbb' } });
    });
    // 回车依赖了输入的值，所以要放在下一个 act 中
    act(() => {
      wrapper.find('input').simulate('keydown', { keyCode: Enter.code });
    });
    await sleep(10);
    expect(mockOnChange.mock.calls.length).toBe(1);

    // 删除
    act(() => {
      wrapper.find('input').simulate('keydown', { keyCode: Backspace.code });
    });
    expect(mockOnRemove.mock.calls.length).toBe(1);
  });

  it('saveOnBlur works', async () => {
    const inputValue = 'bbb';
    const mockOnChange = jest.fn();
    const wrapper = mount(<InputTag saveOnBlur onChange={mockOnChange} />);
    act(() => {
      wrapper.find('input').simulate('change', {
        currentTarget: { value: inputValue },
        target: { value: inputValue },
      });
    });
    act(() => {
      wrapper.find('input').simulate('blur');
    });
    await sleep(10);
    expect(JSON.stringify(mockOnChange.mock.calls[0][0])).toBe(JSON.stringify([inputValue]));
  });

  it('onClick called correctly', async () => {
    const mockOnClick = jest.fn();
    const wrapper = mount(<InputTag onClick={mockOnClick} />);

    // click
    act(() => {
      wrapper.find('input').simulate('click');
    });
    expect(mockOnClick).toBeCalled();
  });
});

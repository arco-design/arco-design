import React from 'react';
import { mount } from 'enzyme';
import { ArrowDown, ArrowUp, Enter, Esc } from '../../_util/keycode';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import AutoComplete from '..';
import Input from '../../Input';

const { TextArea } = Input;

mountTest(AutoComplete);
componentConfigTest(AutoComplete, 'AutoComplete');

function mountAutoComplete(component: React.ReactElement) {
  return mount(component);
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('AutoComplete', () => {
  it('AutoComplete simple use correctly', () => {
    const wrapper = mountAutoComplete(
      <AutoComplete
        placeholder="请输入城市"
        data={[
          '北京',
          '上海',
          '深圳',
          {
            name: '杭州',
            value: '杭州',
          },
        ]}
        triggerElement={<TextArea style={{ width: 520, height: 96 }} />}
      />
    );
    wrapper.find('TextArea').simulate('focus');
    expect(wrapper.find('.arco-trigger')).toHaveLength(1);
  });

  it('AutoComplete with children', () => {
    const wrapper = mountAutoComplete(
      <AutoComplete>
        <AutoComplete.Option value="beijing">Beijing</AutoComplete.Option>
        <AutoComplete.Option value="shanghai">Shanghai</AutoComplete.Option>
      </AutoComplete>
    );
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('.arco-trigger')).toHaveLength(1);
  });

  it('AutoComplete callback correctly', () => {
    const onSearch = jest.fn();
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onPressEnter = jest.fn();
    const onInputChange = jest.fn();

    const wrapper = mountAutoComplete(
      <AutoComplete
        placeholder="请输入城市"
        data={['北京', '上海', '深圳', '杭州']}
        style={{ width: 260, marginRight: 20, marginBottom: 20 }}
        onSearch={onSearch}
        onSelect={onSelect}
        onChange={onChange}
        onFocus={onFocus}
        inputProps={{
          onKeyDown,
          onChange: onInputChange,
        }}
        onPressEnter={onPressEnter}
      />
    );
    wrapper.find('input').simulate('focus');
    expect(onFocus).toBeCalled();

    wrapper.find('input').simulate('change', {
      target: {
        value: '上',
      },
    });
    expect(onSearch).toBeCalled();
    expect(onChange).toBeCalled();
    expect(onInputChange).toBeCalled();

    wrapper.find('input').simulate('keydown', {
      keyCode: Enter.code,
    });
    expect(onPressEnter).toBeCalled();

    wrapper
      .find('.arco-select-option')
      .at(0)
      .simulate('click');
    expect(onSelect).toBeCalled();
  });

  it('keyboard events correctly', () => {
    const wrapper = mountAutoComplete(
      <AutoComplete
        placeholder="请输入城市"
        data={['北京', '上海', '深圳', '杭州']}
        style={{ width: 260, marginRight: 20, marginBottom: 20 }}
      />
    );
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('keyDown', { keyCode: ArrowDown.code });
    expect(wrapper.find('.arco-select-option-hover').text()).toBe('上海');

    wrapper.find('input').simulate('keyDown', { keyCode: ArrowUp.code });
    expect(wrapper.find('.arco-select-option-hover').text()).toBe('北京');

    wrapper.find('input').simulate('keyDown', { keyCode: Enter.code });
    wrapper.find('input').simulate('keyDown', { keyCode: Esc.code });
    expect(wrapper.find('input').prop('value')).toBe('北京');
  });
});

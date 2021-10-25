import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Mentions from '..';
import { ArrowDown, Enter } from '../../_util/keycode';

mountTest(Mentions);
componentConfigTest(Mentions, 'Mentions');

let wrapper = null;

describe('Mentions', () => {
  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  it('Prefix works', () => {
    wrapper = mount(
      <Mentions
        getPopupContainer={(node) => {
          return node;
        }}
        options={['beijing', 'shanghai', 'guangzhou']}
      />
    );

    wrapper.find('textarea').simulate('keyup', { key: '@', target: { value: '@' } });
    expect(wrapper.find('.arco-select-option')).toHaveLength(3);

    wrapper.find('textarea').simulate('keyup', { key: '@bei', target: { value: '@bei' } });
    expect(wrapper.find('.arco-select-option')).toHaveLength(1);
    expect(
      wrapper
        .find('.arco-select-option .arco-select-highlight')
        .at(0)
        .text()
    ).toBe('bei');
  });

  it('onChange triggered by user input', () => {
    const onChange = jest.fn();

    wrapper = mount(
      <Mentions
        getPopupContainer={(node) => {
          return node;
        }}
        options={['beijing', 'shanghai', 'guangzhou']}
        onChange={onChange}
      />
    );

    act(() => {
      wrapper.find('textarea').prop('onChange')({ currentTarget: { value: 'hello' } });
    });

    expect(onChange.mock.calls[0][0]).toBe('hello');
  });

  it('onChange triggered by click option', () => {
    const onChange = jest.fn();

    wrapper = mount(
      <Mentions
        getPopupContainer={(node) => {
          return node;
        }}
        options={['beijing', 'shanghai', 'guangzhou']}
        onChange={onChange}
      />
    );

    wrapper.find('textarea').simulate('keyup', { key: '@', target: { value: '@' } });
    wrapper
      .find('.arco-select-option')
      .at(0)
      .simulate('click');

    expect(onChange.mock.calls[0][0]).toBe('@beijing');
  });

  it('Options hide when blur textarea', () => {
    wrapper = mount(
      <Mentions
        getPopupContainer={(node) => {
          return node;
        }}
        options={['beijing', 'shanghai', 'guangzhou']}
      />
    );

    wrapper.find('textarea').simulate('keyup', { key: '@', target: { value: '@' } });
    expect(wrapper.find('.arco-select-option')).toHaveLength(3);

    wrapper.find('textarea').simulate('blur');
    expect(wrapper.find('.arco-select-option')).toHaveLength(0);
  });

  it('Shortcut works', () => {
    wrapper = mount(
      <Mentions
        getPopupContainer={(node) => {
          return node;
        }}
        options={['beijing', 'shanghai', 'guangzhou']}
      />
    );

    wrapper.find('textarea').simulate('keyup', { key: '@', target: { value: '@' } });
    expect(wrapper.find('.arco-select-option')).toHaveLength(3);

    wrapper
      .find('textarea')
      .simulate('keydown', { keyCode: ArrowDown.code })
      .simulate('keydown', { keyCode: Enter.code });
    expect(wrapper.find('textarea').text()).toBe('@shanghai');
  });
});

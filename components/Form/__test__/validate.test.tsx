import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import { Form, Input } from '../..';

describe('validate form', () => {
  it('validate trigger in rules', () => {
    let form;

    const mockClickFn = jest.fn();
    const mockBlurFn = jest.fn();
    const mockChangeFn = jest.fn();

    const wrapper = mount(
      <Form ref={(node) => (form = node)} style={{ width: 600 }}>
        <Form.Item
          label="Username"
          field="name"
          required
          rules={[
            {
              validateTrigger: 'onClick',
              validator: mockClickFn,
            },
            {
              validateTrigger: ['onFocus', 'onBlur'],
              validator: mockBlurFn,
            },
            {
              validator: mockChangeFn,
            },
          ]}
        >
          <Input placeholder="please enter your username" />
        </Form.Item>
      </Form>
    );

    const input = wrapper.find('input');
    act(() => {
      input.simulate('click');
    });
    expect(mockClickFn).toHaveBeenCalledTimes(1);
    expect(mockChangeFn).toHaveBeenCalledTimes(0);
    expect(mockBlurFn).toHaveBeenCalledTimes(0);

    act(() => {
      input.simulate('focus');
    });
    expect(mockBlurFn).toHaveBeenCalledTimes(1);
    act(() => {
      input.simulate('blur');
    });
    expect(mockBlurFn).toHaveBeenCalledTimes(2);
    expect(mockChangeFn).toHaveBeenCalledTimes(0);

    act(() => {
      input.simulate('change', {
        target: {
          value: 'Hello',
        },
      });
    });

    expect(mockChangeFn).toHaveBeenCalledTimes(1);
    expect(mockBlurFn).toHaveBeenCalledTimes(2);
    expect(mockClickFn).toHaveBeenCalledTimes(1);

    form.submit();
    // 全部执行
    expect(mockChangeFn).toHaveBeenCalledTimes(2);
    expect(mockBlurFn).toHaveBeenCalledTimes(3);
    expect(mockClickFn).toHaveBeenCalledTimes(2);
  });
});

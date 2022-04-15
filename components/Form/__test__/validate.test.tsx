import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import { Form, Input } from '../..';
import { sleep } from '../../../tests/util';

describe('validate form', () => {
  it('validate trigger in form', async () => {
    let form;

    const mockClickFn = jest.fn();
    const mockBlurFn = jest.fn();
    const mockChangeFn = jest.fn();

    const wrapper = mount(
      <Form ref={(node) => (form = node)} validateTrigger="onBlur" style={{ width: 600 }}>
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
    await sleep(10);
    expect(mockClickFn).toHaveBeenCalledTimes(1);
    expect(mockChangeFn).toHaveBeenCalledTimes(0);
    expect(mockBlurFn).toHaveBeenCalledTimes(0);

    act(() => {
      input.simulate('focus');
    });
    await sleep(10);
    expect(mockBlurFn).toHaveBeenCalledTimes(1);
    act(() => {
      input.simulate('blur');
    });
    await sleep(10);
    expect(mockBlurFn).toHaveBeenCalledTimes(2);
    expect(mockChangeFn).toHaveBeenCalledTimes(1);

    act(() => {
      input.simulate('change', {
        target: {
          value: 'Hello',
        },
      });
    });
    await sleep(10);
    expect(mockChangeFn).toHaveBeenCalledTimes(1);
    expect(mockBlurFn).toHaveBeenCalledTimes(2);
    expect(mockClickFn).toHaveBeenCalledTimes(1);

    form.submit();
    await sleep(10);
    // 全部执行
    expect(mockChangeFn).toHaveBeenCalledTimes(2);
    expect(mockBlurFn).toHaveBeenCalledTimes(3);
    expect(mockClickFn).toHaveBeenCalledTimes(2);
  });

  it('validate trigger in rules', async () => {
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
    await sleep(10);
    expect(mockClickFn).toHaveBeenCalledTimes(1);
    expect(mockChangeFn).toHaveBeenCalledTimes(0);
    expect(mockBlurFn).toHaveBeenCalledTimes(0);

    act(() => {
      input.simulate('focus');
    });
    await sleep(10);
    expect(mockBlurFn).toHaveBeenCalledTimes(1);
    act(() => {
      input.simulate('blur');
    });
    await sleep(10);
    expect(mockBlurFn).toHaveBeenCalledTimes(2);
    expect(mockChangeFn).toHaveBeenCalledTimes(0);

    act(() => {
      input.simulate('change', {
        target: {
          value: 'Hello',
        },
      });
    });
    await sleep(10);
    expect(mockChangeFn).toHaveBeenCalledTimes(1);
    expect(mockBlurFn).toHaveBeenCalledTimes(2);
    expect(mockClickFn).toHaveBeenCalledTimes(1);

    form.submit();
    await sleep(10);
    // 全部执行
    expect(mockChangeFn).toHaveBeenCalledTimes(2);
    expect(mockBlurFn).toHaveBeenCalledTimes(3);
    expect(mockClickFn).toHaveBeenCalledTimes(2);
  });

  it('validateLevel in rules', async () => {
    let form;
    const wrapper = mount(
      <Form ref={(node) => (form = node)} style={{ width: 600 }}>
        <Form.Item
          label="url"
          field="url"
          required
          rules={[
            {
              type: 'email',
              validateLevel: 'warning',
            },
            {
              required: true,
              type: 'string',
              minLength: 6,
            },
          ]}
        >
          <Input placeholder="please enter your username" />
        </Form.Item>
      </Form>
    );

    const input = wrapper.find('input');
    await act(() => {
      input.simulate('change', {
        target: {
          value: 'Hello',
        },
      });
    });

    await sleep(100);
    wrapper.update();

    expect(wrapper.find('.arco-form-message').at(0).html()).toBe(
      '<div class="arco-form-message arco-form-message-help"><div role="alert">字符数最少为 6</div><div role="alert" class="arco-form-message-help-warning">Hello 不是合法的邮箱地址</div></div>'
    );
    expect(wrapper.find('.arco-form-message-help-warning')).toHaveLength(1); // warning 信息

    await act(() => {
      input.simulate('change', {
        target: {
          value: 'Helloo',
        },
      });
    });
    await sleep(10);
    wrapper.update();

    expect(wrapper.find('.arco-form-item-status-error')).toHaveLength(0);
    expect(wrapper.find('.arco-form-message-help-warning')).toHaveLength(1);

    form.setFields({
      url: {
        warning: 'hahahaha',
      },
    });
    wrapper.update();

    expect(wrapper.find('.arco-form-message-help-warning').at(0).text()).toBe('hahahaha');
  });

  it('validate messages', async () => {
    const wrapper = mount(
      <Form
        validateMessages={{
          required: (_, { label }) => `必须填写 ${label}`,
          string: {
            length: `字符数必须是 #{length}`,
            match: `不匹配正则 #{pattern}`,
          },
        }}
      >
        <Form.Item
          label="Username"
          field="name"
          required
          rules={[
            {
              type: 'string',
              required: true,
              length: 3,
              match: /abc/,
            },
          ]}
        >
          <Input placeholder="please enter your username" />
        </Form.Item>
      </Form>
    );

    const input = wrapper.find('input');

    await act(() => {
      input.simulate('change', {
        target: {
          value: 'Hello',
        },
      });
    });
    await sleep(10);
    wrapper.update();

    expect(wrapper.find('.arco-form-message').childAt(0).text()).toBe('字符数必须是 3');

    await act(() => {
      input.simulate('change', {
        target: {
          value: '',
        },
      });
    });
    await sleep(10);
    wrapper.update();

    expect(wrapper.find('.arco-form-message').childAt(0).text()).toBe('必须填写 Username');

    await act(() => {
      input.simulate('change', {
        target: {
          value: '123',
        },
      });
    });
    await sleep(10);
    wrapper.update();

    expect(wrapper.find('.arco-form-message').childAt(0).text()).toBe('不匹配正则 /abc/');
  });
});

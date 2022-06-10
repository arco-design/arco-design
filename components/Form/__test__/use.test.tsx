import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import { Form, Input } from '../..';
import { sleep } from '../../../tests/util';

function Demo1() {
  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const age = Form.useWatch('age', form);
  const dymaic = Form.useWatch('dymaic', form);

  return (
    <div>
      <Form form={form}>
        <Form.Item label="Name" field="name">
          <Input placeholder="enter name" />
        </Form.Item>
        <Form.Item label="age" field="age">
          <Input placeholder="enter name" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {(v) => {
            return v.name ? (
              <Form.Item field="dymaic" label="dymaic">
                <Input />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <span id="name">{name}</span>
        <span id="age">{age}</span>
        <span id="dymaic">{dymaic}</span>
      </Form>
    </div>
  );
}

function DemoText() {
  const name = Form.useWatch('name');
  const age = Form.useWatch('age');

  return (
    <span>
      <span id="name">{name}</span>
      <span id="age">{age}</span>
    </span>
  );
}

function Demo2() {
  const [form] = Form.useForm();

  return (
    <div>
      <Form form={form}>
        <Form.Item label="Name" field="name">
          <Input placeholder="enter name" />
        </Form.Item>
        <Form.Item label="age" field="age">
          <Input placeholder="enter name" />
        </Form.Item>
        <DemoText />
      </Form>
    </div>
  );
}

describe('Form.useWatch', () => {
  it('form.useWatch ', async () => {
    const wrapper = mount(<Demo1 />);

    act(() => {
      wrapper
        .find('input')
        .at(0)
        .simulate('change', {
          target: { value: 'aaa' },
        });
    });

    await sleep(10);

    wrapper.update();

    expect(wrapper.find('#name').last().text()).toBe('aaa');

    act(() => {
      wrapper
        .find('input')
        .at(1)
        .simulate('change', {
          target: { value: 'bbb' },
        });
    });
    await sleep(10);

    expect(wrapper.find('#age').last().text()).toBe('bbb');
  });

  it('form.useWatch dymic ', async () => {
    const wrapper = mount(<Demo1 />);

    act(() => {
      wrapper
        .find('input')
        .at(0)
        .simulate('change', {
          target: { value: 'aaa' },
        });
    });

    await sleep(10);

    wrapper.update();

    expect(wrapper.find('#name').last().text()).toBe('aaa');
    expect(wrapper.find('#dymaic').last().text()).toBe('');

    act(() => {
      wrapper
        .find('input')
        .at(2)
        .simulate('change', {
          target: { value: 'dymaic' },
        });
    });
    await sleep(10);

    expect(wrapper.find('#dymaic').last().text()).toBe('dymaic');
  });

  it('form.useWatch child ', async () => {
    const wrapper = mount(<Demo2 />);

    act(() => {
      wrapper
        .find('input')
        .at(0)
        .simulate('change', {
          target: { value: 'aaa' },
        });
    });

    await sleep(10);

    expect(wrapper.find('#name').last().text()).toBe('aaa');

    act(() => {
      wrapper
        .find('input')
        .at(1)
        .simulate('change', {
          target: { value: 'bbb' },
        });
    });
    await sleep(10);

    expect(wrapper.find('#age').last().text()).toBe('bbb');
  });
});

describe('Form.useFormContext', () => {
  it('form useFormContext', async () => {
    let form = null;
    let formInstance;
    function Child() {
      const { form } = Form.useFormContext();
      formInstance = form;
      return <span />;
    }
    mount(
      <Form ref={(node) => (form = node)}>
        <Child />
      </Form>
    );

    expect(formInstance).toBe(form);
  });
});

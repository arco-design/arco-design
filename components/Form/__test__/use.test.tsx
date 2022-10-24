import React from 'react';
import { act } from 'react-test-renderer';
import { Form, Input } from '../..';
import { sleep, render, fireEvent } from '../../../tests/util';

function Demo1() {
  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const age = Form.useWatch('age', form);
  const dymaic = Form.useWatch('dymaic', form);
  const values = Form.useWatch(['name', 'age', 'dymaic'], form);

  return (
    <div>
      <Form form={form} id="_test_">
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
        <span id="values">{JSON.stringify(values)}</span>
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
      <Form form={form} id="__test2">
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
    const wrapper = render(<Demo1 />);

    act(() => {
      fireEvent.change(wrapper.find('input')[0], {
        target: { value: 'aaa' },
      });
    });

    expect(wrapper.querySelector('#name')?.textContent).toBe('aaa');

    act(() => {
      fireEvent.change(wrapper.find('input')[1], {
        target: { value: 'bbb' },
      });
    });

    expect(wrapper.querySelector('#age')?.textContent).toBe('bbb');
  });

  it('form.useWatch dymic ', async () => {
    const wrapper = render(<Demo1 />);

    act(() => {
      fireEvent.change(wrapper.find('input')[0], {
        target: { value: 'aaa' },
      });
    });

    await sleep(10);

    expect(wrapper.querySelector('#name')?.textContent).toBe('aaa');
    expect(wrapper.querySelector('#dymaic')?.textContent).toBe('');

    act(() => {
      fireEvent.change(wrapper.find('input')[2], {
        target: { value: 'dymaic' },
      });
    });

    expect(wrapper.querySelector('#dymaic')?.textContent).toBe('dymaic');

    expect(JSON.parse(wrapper.querySelector('#values')?.textContent || '')).toEqual({
      dymaic: 'dymaic',
      name: 'aaa',
    });
  });

  it('form.useWatch child ', async () => {
    const wrapper = render(<Demo2 />);

    act(() => {
      fireEvent.change(wrapper.find('input')[0], {
        target: { value: 'aaa' },
      });
    });

    expect(wrapper.querySelector('#name')?.textContent).toBe('aaa');

    act(() => {
      fireEvent.change(wrapper.find('input')[1], {
        target: { value: 'bbb' },
      });
    });
    await sleep(10);

    expect(wrapper.querySelector('#age')?.textContent).toBe('bbb');
  });
});

describe('Form.useFormContext', () => {
  it('form useFormContext', async () => {
    let form;
    let formInstance;
    function Child() {
      const { form } = Form.useFormContext();
      formInstance = form;
      return <span />;
    }
    render(
      <Form ref={(node) => (form = node)}>
        <Child />
      </Form>
    );

    expect(formInstance).toBe(form);
  });
});

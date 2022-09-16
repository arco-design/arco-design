import React, { useState } from 'react';
import mountTest from '../../../tests/mountTest';
import { Form, Input, Radio, Select, Button } from '../..';
import { sleep, render, fireEvent } from '../../../tests/util';

mountTest(Form);

function mountForm(component: React.ReactElement) {
  return render(component);
}

function Demo(props) {
  const [form] = Form.useForm();
  const [value, setValue] = useState(0);

  return (
    <div>
      <Form
        form={form}
        onSubmit={(v) => {
          props.onSubmit && props.onSubmit({ ...v, value });
        }}
        onValuesChange={(v) => {
          props.onValuesChange && props.onValuesChange({ ...v, value });
        }}
      >
        <Form.Item label="name" field="name">
          <Input />
        </Form.Item>
        <Button className="submit-btn" type="primary" htmlType="submit">
          确定
        </Button>
        <Button
          className="setvalue-btn"
          onClick={() => {
            setValue(value + 1);
          }}
        >
          setValue
        </Button>
      </Form>
    </div>
  );
}

describe('function component useForm', () => {
  it('submit', async () => {
    let value;
    const wrapper = mountForm(
      <Demo
        onSubmit={(v) => {
          value = v.value;
        }}
        onValuesChange={(v) => {
          value = v.value;
        }}
      />
    );

    fireEvent.submit(wrapper.querySelector('form') as Element);

    await sleep(10);

    const setValueBtn = wrapper.querySelector('.setvalue-btn') as Element;

    expect(value).toBe(0);

    fireEvent.click(setValueBtn);
    fireEvent.submit(wrapper.querySelector('form') as Element);

    await sleep(10);

    expect(value).toBe(1);
  });

  it('onValuesChange', async () => {
    let value;
    const wrapper = mountForm(
      <Demo
        onValuesChange={(v) => {
          value = v.value;
        }}
      />
    );

    fireEvent.change(wrapper.querySelector('input') as Element, { target: { value: '111' } });

    const setValueBtn = wrapper.querySelector('.setvalue-btn') as Element;

    expect(value).toBe(0);

    fireEvent.click(setValueBtn);
    fireEvent.change(wrapper.querySelector('input') as Element, { target: { value: 'ceshi' } });

    expect(value).toBe(1);
  });
});

// form item 的children 函数
describe('form item children funtion', () => {
  it('default', async () => {
    let formRef;

    const wrapper = mountForm(
      <Form
        ref={(node) => {
          formRef = node;
        }}
      >
        <Form.Item field="type" label="类型">
          <Radio.Group options={['类型A', '类型B']} />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {(values) => {
            return values.type === '类型A' ? (
              <Form.Item field="nameA" label="类型A名字">
                <Input placeholder="请输入类型A名字" />
              </Form.Item>
            ) : (
              values.type === '类型B' && (
                <Form.Item field="nameB" label="类型B名字">
                  <Select options={['B1', 'B2', 'B3']} placeholder="请选择类型B名字" />
                </Form.Item>
              )
            );
          }}
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, next) => prev.type !== next.type}>
          {(values) => {
            return values.type ? (
              <Form.Item field="remark" label="备注">
                <Input.TextArea placeholder={`${values.type}的备注`} />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
      </Form>
    );

    expect(wrapper.container.querySelectorAll('.arco-form-label-item')).toHaveLength(1);

    formRef.setFieldsValue({ type: '类型A' });

    expect(wrapper.container.querySelectorAll('.arco-form-label-item label')[1].innerHTML).toBe(
      ' 类型A名字'
    );
    expect(wrapper.container.querySelector('.arco-textarea')?.getAttribute('placeholder')).toBe(
      '类型A的备注'
    );

    fireEvent.change(wrapper.querySelector('.arco-input') as Element, { target: { value: '123' } });
    expect(formRef.getFields()).toEqual({ type: '类型A', nameA: '123' });

    formRef.setFieldsValue({ type: '类型B' });

    await sleep(10);

    expect(wrapper.container.querySelectorAll('.arco-form-label-item label')[1].innerHTML).toBe(
      ' 类型B名字'
    );
    expect(wrapper.querySelector('textarea')?.getAttribute('placeholder')).toBe('类型B的备注');

    expect(formRef.getFieldsValue()).toEqual({ type: '类型B' });
    expect(formRef.getFields()).toEqual({ type: '类型B', nameA: '123' });
    fireEvent.click(wrapper.querySelector('.arco-select-view') as Element);
    fireEvent.click(wrapper.find('.arco-select-option')[1]);
    expect(formRef.getFieldsValue()).toEqual({ type: '类型B', nameB: 'B2' });

    formRef.setFieldsValue({ type: '类型A' });

    expect(wrapper.querySelector('.arco-input')?.getAttribute('value')).toBe('123');
    expect(formRef.getFieldsValue()).toEqual({ type: '类型A', nameA: '123' });
    expect(formRef.getFields()).toEqual({ type: '类型A', nameA: '123', nameB: 'B2' });
  });
});

describe('form initialvalue', () => {
  let form;
  render(
    <Form initialValues={{ name: '123' }} ref={(node) => (form = node)}>
      <Form.Item label="name" field="name" initialValue="456">
        <Input />
      </Form.Item>
    </Form>
  );

  expect(form.getFieldValue('name')).toBe('456');
});

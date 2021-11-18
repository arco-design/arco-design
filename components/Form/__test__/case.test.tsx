import React, { useState } from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import { Form, Input, Radio, Select, Button } from '../..';
import { FormProps } from '../interface';
import { sleep } from '../../../tests/util';

mountTest(Form);

function mountForm(component: React.ReactElement) {
  return mount<typeof Form, React.PropsWithChildren<FormProps>>(component);
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

    wrapper.find('form').simulate('submit');

    await sleep(10);

    const setValueBtn = wrapper.find('.setvalue-btn').at(1);

    expect(value).toBe(0);

    setValueBtn.simulate('click');
    wrapper.find('form').simulate('submit');

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

    wrapper.find('Input').simulate('change', { target: { value: '111' } });

    const setValueBtn = wrapper.find('.setvalue-btn').at(1);

    expect(value).toBe(0);

    setValueBtn.simulate('click');
    wrapper.find('Input').simulate('change', { target: { value: 'ceshi' } });

    expect(value).toBe(1);
  });
});

// form item 的children 函数
describe('form item children funtion', () => {
  it('default', () => {
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

    expect(wrapper.getDOMNode().querySelectorAll('.arco-form-label-item')).toHaveLength(1);

    formRef.setFieldsValue({ type: '类型A' });

    expect(wrapper.getDOMNode().querySelectorAll('.arco-form-label-item label')[1].innerHTML).toBe(
      ' 类型A名字'
    );
    expect(
      wrapper
        .getDOMNode()
        .querySelector('.arco-textarea')
        .getAttribute('placeholder')
    ).toBe('类型A的备注');

    wrapper.update();

    wrapper.find('.arco-input').simulate('change', { target: { value: '123' } });
    expect(formRef.getFields()).toEqual({ type: '类型A', nameA: '123' });

    formRef.setFieldsValue({ type: '类型B' });
    wrapper.update();

    expect(wrapper.getDOMNode().querySelectorAll('.arco-form-label-item label')[1].innerHTML).toBe(
      ' 类型B名字'
    );
    expect(
      wrapper
        .find('textarea')
        .getDOMNode()
        .getAttribute('placeholder')
    ).toBe('类型B的备注');

    expect(formRef.getFieldsValue()).toEqual({ type: '类型B' });
    expect(formRef.getFields()).toEqual({ type: '类型B', nameA: '123' });
    wrapper.find('.arco-select-view').simulate('click');
    wrapper
      .find('.arco-select-option')
      .at(1)
      .simulate('click');
    expect(formRef.getFieldsValue()).toEqual({ type: '类型B', nameB: 'B2' });

    formRef.setFieldsValue({ type: '类型A' });

    wrapper.update();

    expect(
      wrapper
        .find('.arco-input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('123');
    expect(formRef.getFieldsValue()).toEqual({ type: '类型A', nameA: '123' });
    expect(formRef.getFields()).toEqual({ type: '类型A', nameA: '123', nameB: 'B2' });
  });
});

describe('form initialvalue', () => {
  let form;
  mount(
    <Form initialValues={{ name: '123' }} ref={(node) => (form = node)}>
      <Form.Item label="name" field="name" initialValue="456">
        <Input />
      </Form.Item>
    </Form>
  );

  expect(form.getFieldValue('name')).toBe('456');
});

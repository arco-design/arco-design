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

describe('form usewatch ', () => {
  it('field change', () => {
    let form;

    function Demo({ field }) {
      const value = Form.useWatch(field, form);

      return <div id="text">{value || ''}</div>;
    }

    const wrapper = render(
      <Form ref={(node) => (form = node)}>
        <Form.Item label="name" field="name">
          <Input />
        </Form.Item>
        <Form.Item label="name" field="name2">
          <Input />
        </Form.Item>
        <Demo field="name" />
      </Form>
    );

    fireEvent.change(wrapper.find('input').item(0), {
      target: { value: '111' },
    });

    expect(wrapper.querySelector('#text')?.textContent).toBe('111');

    wrapper.rerender(
      <Form ref={(node) => (form = node)}>
        <Form.Item label="name" field="name">
          <Input />
        </Form.Item>
        <Form.Item label="name" field="name2">
          <Input />
        </Form.Item>
        <Demo field="name2" />
      </Form>
    );

    fireEvent.change(wrapper.find('input').item(1), {
      target: { value: '123' },
    });
    expect(wrapper.querySelector('#text')?.textContent).toBe('123');
  });

  it('form reset & shouldupdate', () => {
    let form;
    let renderCount = 0;
    let render2Count = 0;

    render(
      <Form ref={(node) => (form = node)}>
        <Form.Item label="name" field="name" initialValue="456">
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate={() => false}>
          {() => {
            renderCount++;
            return <div />;
          }}
        </Form.Item>

        <Form.Item>
          {() => {
            render2Count++;
            return <div />;
          }}
        </Form.Item>
      </Form>
    );

    expect(renderCount).toBe(1);
    expect(render2Count).toBe(1);

    form.resetFields(['name']);

    expect(renderCount).toBe(1);
    expect(render2Count).toBeGreaterThan(1); // 保持原有行为不变，避免 breaking change
  });

  it('value should keep equal', () => {
    const changeMockFn = jest.fn();

    const CustomInput = (props) => {
      React.useEffect(() => {
        changeMockFn(props.value);
      }, [props.value]);

      return (
        <Input
          value={props.value?.name}
          onChange={(v) => props.onChange?.({ ...props.value, name: v })}
        />
      );
    };

    const wrapper = render(
      <Form>
        <Form.Item label="name" field="input">
          <CustomInput />
        </Form.Item>
      </Form>
    );

    expect(changeMockFn).toBeCalledTimes(1);
    expect(changeMockFn).toBeCalledWith(undefined);
    fireEvent.change(wrapper.find('input')[0], {
      target: {
        value: 'aaa',
      },
    });

    expect(changeMockFn).toBeCalledTimes(2);
    wrapper.rerender(
      <Form>
        <Form.Item label="name" field="input">
          <CustomInput />
        </Form.Item>
      </Form>
    );
    expect(changeMockFn).toBeCalledWith({ name: 'aaa' });

    wrapper.rerender(
      <Form>
        <Form.Item label="name" field="input">
          <CustomInput />
        </Form.Item>
      </Form>
    );

    // 引用地址不变，不出发 useEffect
    expect(changeMockFn).toBeCalledTimes(2);
  });

  it('form item disabled', () => {
    const wrapper = render(
      <Form style={{ width: 600 }}>
        <Form.Item disabled field="aaa">
          <Input disabled={false} />
        </Form.Item>
        <Form.Item disabled>
          <Input disabled={false} />
        </Form.Item>

        <Form.Item disabled>
          <Input disabled={false} />
          <Input disabled={false} />
        </Form.Item>
      </Form>
    );

    expect(wrapper.find('.arco-input-disabled')).toHaveLength(0);
    expect(wrapper.find('.arco-input')).toHaveLength(4);
  });
});

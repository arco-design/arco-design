import React from 'react';
import { fireEvent, render, sleep } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import { Button, Form, FormInstance, Input, Radio } from '../..';

mountTest(Form);

function mountForm(component: React.ReactElement) {
  return render(component);
}

describe('setFieldsValue for shouldUpdate items', () => {
  it('basic form', () => {
    let formRef;
    let changeValue;

    const wrapper = mountForm(
      <div>
        <Button
          type="primary"
          onClick={() =>
            formRef.setFieldsValue({
              type: 'B',
              field1: 'setValue',
              field2: { field2: 'setValue' },
              'field3.field': 'a',
            })
          }
          className="form-button"
        >
          click to setFieldsValue
        </Button>
        <Form
          ref={(node) => {
            formRef = node;
          }}
          onValuesChange={(v) => {
            changeValue = v;
          }}
          style={{ maxWidth: 650 }}
        >
          <Form.Item field="type" label="Type">
            <Radio.Group options={['A', 'B']} />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {(values) => {
              return (
                values.type === 'B' && (
                  <Form.Item
                    field="field1"
                    label="field1"
                    initialValue="initialValue"
                    extra="as expected"
                  >
                    <Input />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {(values) => {
              return (
                values.type === 'B' && (
                  <Form.Item
                    field="field2.field2"
                    label="field2.field2"
                    initialValue="initialValue"
                    extra="wrong"
                  >
                    <Input />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {(values) => {
              return (
                values.type === 'B' && (
                  <Form.Item
                    field="field3.field"
                    label="field3.field"
                    initialValue="initialValue"
                    extra="wrong"
                  >
                    <Input />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
        </Form>
      </div>
    );

    fireEvent.click(wrapper.querySelector('.form-button') as HTMLElement);
    expect(formRef.getFieldsValue()).toEqual({
      type: 'B',
      field1: 'setValue',
      field2: { field2: 'setValue' },
      field3: { field: 'a' },
    });
    expect(changeValue).toEqual({
      type: 'B',
      field1: 'setValue',
      field2: { field2: 'setValue' },
      'field3.field': 'a',
    });
  });
});

describe('dependencies', () => {
  it('default', async () => {
    let form: FormInstance = {} as FormInstance;
    const mockValidatorFn = jest.fn();
    const wrapper = render(
      <Form
        ref={(node: FormInstance) => {
          form = node;
        }}
      >
        <Form.Item field="password" rules={[{ required: true, message: 'password is required' }]}>
          <Input id="password" />
        </Form.Item>
        <Form.Item
          field="confirm_password"
          dependencies={['password']}
          rules={[
            {
              validator: (v, cb) => {
                mockValidatorFn();
                if (!v) {
                  return cb('confirm_password is required');
                }
                if (form.getFieldValue('password') !== v) {
                  return cb('confirm_password must be equal with password');
                }
                cb(null);
              },
            },
          ]}
        >
          <Input id="confirm_password" />
        </Form.Item>
      </Form>
    );

    expect(mockValidatorFn.mock.calls.length).toBe(0);
    fireEvent.change(wrapper.find('input').item(0), {
      target: { value: '123' },
    });

    expect(mockValidatorFn.mock.calls.length).toBe(0);

    expect(form?.getFieldValue('password')).toBe('123');

    fireEvent.change(wrapper.find('input').item(1), {
      target: { value: '12' },
    });
    expect(mockValidatorFn.mock.calls.length).toBe(1);
    await sleep(10);
    expect(wrapper.queryByRole('alert')?.textContent).toBe(
      'confirm_password must be equal with password'
    );
    fireEvent.change(wrapper.find('input').item(0), {
      target: { value: '12' },
    });
    await sleep(10);
    expect(wrapper.queryAllByRole('alert')).toHaveLength(0);

    form.setFieldValue('password', '123');
    await sleep(10);
    expect(wrapper.queryByRole('alert')?.textContent).toBe(
      'confirm_password must be equal with password'
    );
    fireEvent.change(wrapper.find('input').item(1), {
      target: { value: '123' },
    });
    await sleep(10);
    expect(wrapper.queryAllByRole('alert')).toHaveLength(0);
  });
});

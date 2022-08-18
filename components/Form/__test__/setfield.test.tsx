import React from 'react';
import { Form, Select } from '../..';
import Input from '../../Input';
import { render } from '../../../tests/util';

const FormItem = Form.Item;

describe('setfieldsvalue should work', () => {
  it('should empty array and object be collected as key', () => {
    function SetFieldForm() {
      const [form] = Form.useForm();

      form.setFieldsValue({
        name: '',
        select: [],
      });

      return (
        <Form style={{ width: 600 }} form={form}>
          <FormItem label="Name" field="name" initialValue="initial">
            <Input placeholder="please enter your post..." />
          </FormItem>
          <FormItem label="Select" field="select" initialValue={['initial']}>
            <Select mode="tags" placeholder="please enter your post..." />
          </FormItem>
        </Form>
      );
    }

    const component = render(<SetFieldForm />);
    expect(component.find('input')[0].getAttribute('value')).toBe('');
    expect(component.find('input')[1].getAttribute('value')).toBe('');
  });

  it('should react node be escaped and get its key', () => {
    function SetFieldForm() {
      const [form] = Form.useForm();

      form.setFieldsValue({
        name: '',
        select: <div>test</div>,
      });

      return (
        <Form style={{ width: 600 }} form={form}>
          <FormItem label="Name" field="name" initialValue="initial">
            <Input placeholder="please enter your post..." />
          </FormItem>
          <FormItem label="Select" field="select" initialValue={['initial']}>
            <Select mode="tags" placeholder="please enter your post..." />
          </FormItem>
        </Form>
      );
    }

    const component = render(<SetFieldForm />);
    expect(component.find('input')[0].getAttribute('value')).toBe('');
    expect(component.find('input')[1].getAttribute('value')).toBe('');
  });
});

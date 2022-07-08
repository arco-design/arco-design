import React, { useEffect } from 'react';

import { Form, Input } from '@self';

const CustomInput = (props) => {
  useEffect(() => {
    props.onChange('asd');
  }, [props.onChange]);
  return <Input onChange={props.onChange} value={props.value} />;
};

export const Demo = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <Form form={form}>
        <Form.Item field="a">
          <CustomInput />
        </Form.Item>
      </Form>
    </div>
  );
};

export default {
  title: 'Form',
};

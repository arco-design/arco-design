---
order: 22
title:
  zh-CN: 获取表单上下文
  en-US: Get Form Context
---

## zh-CN

在函数式组件里可以使用 `Form.useFormContext` 获取 Form 组件上下文，便于表单控件的封装。(version `2.33.0`)

## en-US

In functional components, you can use `Form.useFormContext` to get a form context. Facilitate the encapsulation of form controls. (version `2.33.0`)

```js
import React from 'react';
import { Form, Input, Button, Switch, InputNumber } from '@arco-design/web-react';

const FormItem = Form.Item;

function DemoButton() {
  const { form, disabled } = Form.useFormContext();
  return (
    <Button
      type="text"
      disabled={disabled}
      onClick={() => {
        form.setFieldsValue({
          name: 'admin',
          age: 11,
        });
      }}
    >
      Fill Form
    </Button>
  );
}

function App() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = React.useState(false);
  return (
    <Form
      form={form}
      autoComplete="off"
      style={{ width: 600 }}
      initialValues={{ name: 'admin' }}
      disabled={disabled}
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={(v) => {
        console.log(v);
      }}
    >
      <FormItem label="Disabled" disabled={false}>
        <Switch onChange={setDisabled}></Switch>
      </FormItem>
      <FormItem label="Username" field="name" rules={[{ required: true }]}>
        <Input placeholder="please enter your username" />
      </FormItem>
      <FormItem
        label="Age"
        field="age"
        rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
      >
        <InputNumber placeholder="please enter your age" />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
          Submit
        </Button>
        <Button
          style={{ marginRight: 24 }}
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </Button>
        <DemoButton />
      </FormItem>
    </Form>
  );
}

export default App;
```

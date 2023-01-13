---
order: 22
title:
  zh-CN: 获取表单上下文
  en-US: Get Form Context
---

## zh-CN

在函数式组件里可以使用 `Form.useFormContext` 获取 Form 组件上下文，便于表单控件的封装。(version `2.33.0`, `isSubmitting` in `2.44.0`). `isSubmitting` 仅在通过 `type=submit` 的 `button` 触发表单 `Form` 的 `onSubmit` 属性进行提交时有效。如果 `onSubmit` 内部包含异步逻辑，请返回一个 Promise.

## en-US

In functional components, you can use `Form.useFormContext` to get a form context. Facilitate the encapsulation of form controls. (version `2.33.0`, `isSubmitting` in `2.44.0`).
`isSubmitting` is only valid when the `onSubmit` attribute of the form `Form` is triggered to be submitted by a `button` with `type=submit`. If `onSubmit` contains asynchronous logic inside, return a Promise.

```js
import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, Switch, InputNumber, Message } from '@arco-design/web-react';

const FormItem = Form.Item;

function DemoButton() {
  const { form, disabled, isSubmitting } = Form.useFormContext();
  const messageRef = useRef(null)

  useEffect(() => {
    if (isSubmitting) {
      messageRef.current = 'id-' + Date.now()
      Message.loading({
        id: messageRef.current,
        content: 'submitting',
        duration: 0
      });
    } else {
      if (messageRef.current) {
        const isError = Object.keys(form.getFieldsError()).length > 0;

        Message[isError ? 'error' : 'success']({
          id: messageRef.current,
          content: isError ? 'validate failed' : 'submitted',
          duration: 3000
        });
      }
      messageRef.current = null
    }
  }, [isSubmitting])

  return (
    <>
      <Button
        type="primary"
        htmlType="submit"
        disabled={disabled}
        loading={isSubmitting}
        style={{ marginRight: 24 }}
      >
        Submit
      </Button>
      <Button
        disabled={disabled}
        style={{ marginRight: 24 }}
        onClick={() => {
          form.resetFields();
        }}
      >
        Reset
      </Button>
    </>
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
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1)
          }, 3000)
        })
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
        <DemoButton />
      </FormItem>
    </Form>
  );
}

export default App;
```

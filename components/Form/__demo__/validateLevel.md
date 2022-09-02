---
order: 19
title:
  zh-CN: 表单校验失败不阻塞提交
  en-US: validate level
---

## zh-CN

可以通过 `validateLevel` 设置表单校验失败是显示为 `warning` 状态，不阻塞表单提交。

## en-US

You can use 'validateLevel' to set form validation failures to 'warning' and not block form submission.

```js
import { Form, Input, Button, Message, InputNumber } from '@arco-design/web-react';
const FormItem = Form.Item;

function App() {
  const [form] = Form.useForm();
  return (
    <Form form={form} autoComplete="off" style={{ width: 600 }}>
      <Form.Item
        field="email"
        label="Email"
        rules={[
          {
            type: 'email',
            validateLevel: 'warning',
          },
          {
            required: true,
            type: 'string',
            minLength: 6,
          },
        ]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <FormItem
        label="Age"
        field="age"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber placeholder="please enter your age" />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button
          type="primary"
          onClick={async () => {
            try {
              await form.validate();
              Message.success('校验通过');
            } catch (e) {
              Message.error('校验失败');
            }
          }}
          style={{ marginRight: 24 }}
        >
          Validate Form
        </Button>
        <Button
          type="primary"
          onClick={async () => {
            try {
              await form.validate(['email']);
              Message.success('Email 校验通过');
            } catch (e) {
              Message.error('Email 校验失败');
            }
          }}
          style={{ marginRight: 24 }}
        >
          Validate Email
        </Button>
        <Button
          style={{ marginRight: 24 }}
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </Button>
      </FormItem>
    </Form>
  );
}

export default App;
```

---
order: 17
title:
  zh-CN: 表单校验
  en-US: validate
---

## zh-CN

可以通过 `form.validate` 方法进行表单字段的校验。可以通过参数指定校验特定字段。

## en-US

The form field can be validated through the `form.validate` method. You can specify to verify specific fields through parameters.

```js
import { Form, Input, Button, Message, InputNumber } from '@arco-design/web-react';
const FormItem = Form.Item;

function App() {
  const [form] = Form.useForm();
  return (
    <Form form={form} autoComplete="off" style={{ width: 600 }}>
      <FormItem
        label="Username"
        field="name"
        required
        rules={[
          {
            validator(value, cb) {
              if (value !== 'hahaha') {
                return cb('必须填写hahaha');
              }

              return cb();
            },
          },
        ]}
      >
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
              await form.validate(['name']);
              Message.success('Username 校验通过');
            } catch (e) {
              Message.error('Username 校验失败');
            }
          }}
          style={{ marginRight: 24 }}
        >
          Validate Username
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

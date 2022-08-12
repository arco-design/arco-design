---
order: 13
title:
  zh-CN: 注册表单
  en-US: Register
---

## zh-CN

填写必须的信息以注册新用户

## en-US

Fill in the necessary information to register a new user

```js
import { Form, Input, Button, Message } from '@arco-design/web-react';
const FormItem = Form.Item;

function App() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      style={{ width: 320 }}
      wrapperCol={{ span: 24 }}
      autoComplete="off"
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={(v) => {
        console.log(v);
        Message.success('success');
      }}
    >
      <FormItem field="name" rules={[{ required: true, message: 'username is required' }]}>
        <Input placeholder="please enter your username" />
      </FormItem>
      <FormItem field="phone" rules={[{ required: true, message: 'phone number is required' }]}>
        <Input placeholder="please enter your phone number" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" long>
          Register
        </Button>
      </FormItem>
    </Form>
  );
}

export default App;
```

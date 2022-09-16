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
      <FormItem field="password" rules={[{ required: true, message: 'password is required' }]}>
        <Input placeholder="please enter your password" />
      </FormItem>
      <FormItem
        field="confirm_password"
        dependencies={['password']}
        rules={[{
          validator: (v, cb) => {
            if (!v) {
              return cb('confirm_password is required')
            } else if (form.getFieldValue('password') !== v) {
              return cb('confirm_password must be equal with password')
            }
            cb(null)
          }
        }]}
      >
        <Input placeholder="please confirm your password" />
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

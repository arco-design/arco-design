---
order: 18
title:
  zh-CN: 表单异步校验
  en-US: async validate
---

## zh-CN

在 `rules` 中自定义 `validator` 方法，并返回一个 `Promise` 即可实现表单的异步校验。

p.s: 如果用 `lodash.debounce` 不生效，建议使用 `debounce.promise` ，它返回的是一个 `promise`。

## en-US

Customize the `validator` method in `rules` and return a `Promise` to achieve asynchronous validation of the form.

p.s: If using `lodash.debounce` does not work, it is recommended to use `debounce.promise`, which returns a `promise`.

```js
import { Form, Input, Button, Message, InputNumber } from '@arco-design/web-react';
const FormItem = Form.Item;

function App() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      style={{
        width: 600,
      }}
    >
      <FormItem
        label="Username"
        field="name"
        required
        rules={[
          {
            validator: async (value, callback) => {
              return new Promise((resolve) => {
                if (value !== 'admin') {
                  setTimeout(() => {
                    callback('Name must be admin');
                    resolve();
                  }, 3000);
                } else {
                  resolve();
                }
              });
            },
          },
        ]}
      >
        <Input placeholder="please enter your username" />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: 24 }}
        >
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
      </FormItem>
    </Form>
  );
}

export default App;
```

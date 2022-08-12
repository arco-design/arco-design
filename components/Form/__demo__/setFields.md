---
order: 4
title:
  zh-CN: 控制表单项错误状态
  en-US: Set Error status
---

## zh-CN

通过 `setFields` 方法的 `error` 参数，可以在外部控制表单项的错误状态。

## en-US

You can externally control the error status of form entries by using the `error` parameter of the `setFields` method.

```js
import { Form, Input, Button, InputNumber } from '@arco-design/web-react';
const FormItem = Form.Item;

function App() {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      style={{ width: 600 }}
      initialValues={{ name: 'admin' }}
      autoComplete="off"
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={(v) => {
        console.log(v);
      }}
    >
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
        <Button
          type="text"
          onClick={() => {
            form.setFields({
              age: {
                value: 200,
                error: {
                  message: 'Maximum is 200',
                },
                warning: <div>warning info ...</div>,
              },
            });
          }}
        >
          Set Error Age
        </Button>
      </FormItem>
    </Form>
  );
}

export default App;
```

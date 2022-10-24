---
order: 21
title:
  zh-CN: useWatch
  en-US: useWatch
---

## zh-CN

可以通过 `Form.useWatch` 监听表单内部字段值的变动。（`2.33.0` 支持）


## en-US

You can use `Form.useWatch` to monitor the changes of field values inside the form. (`2.33.0` support)


```js
import { Form, Typography, Input, InputNumber } from '@arco-design/web-react';

function App() {
  const [form] = Form.useForm();
  const name = Form.useWatch('name', form);
  const age = Form.useWatch('age', form);
  return (
    <div>
      <Form form={form} autoComplete="off">
        <Form.Item label="Name" field="name">
          <Input placeholder="enter name" />
        </Form.Item>

        <Form.Item label="Age" field="age">
          <InputNumber placeholder="enter age" />
        </Form.Item>
        <Form.Item label=" ">
          <Typography.Text code>
            Name: {name}; Age: {age}
          </Typography.Text>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
```

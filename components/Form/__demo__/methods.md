---
order: 3
title:
  zh-CN: 表单方法调用
  en-US: Methods
---

## zh-CN

在函数式组件里可以使用`Form.useForm`获取表单实例。通过该实例调用表单方法，例如设置表单字段值，重置表单等。
在类组件里可以使用`ref` 获取表单实例。

## en-US

In functional components, you can use `Form.useForm` to get a form instance, You can call all form methods through this instance, such as setting form value, reset form, etc. If you are using class component, you can get it by `ref`.

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
            form.setFieldsValue({
              name: 'admin',
              age: 11,
            });
          }}
        >
          Fill Form
        </Button>


        <Button
          type="text"
          onClick={() => {
            // 仅校验值，不会有 UI 表现
            form.validate({validateOnly: true}).then(() => {
              console.log('pass');
            }).catch(e => {

              console.log(e.errors)
            });

          }}
        >
          validateOnly
        </Button>
      </FormItem>
    </Form>
  );
}

export default App;
```

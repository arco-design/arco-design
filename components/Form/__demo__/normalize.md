---
order: 10
title:
  zh-CN: 处理表单项的值
  en-US: Normalize
---

## zh-CN

首先，在使用受控表单时，所有表单项的值在改变时，都会被 `Form` 收集到。如果需要对表单项的值进行处理后再存储在 `Form` 中，可以使用 `normalize` 属性。与之相对，在进行表单项的渲染时，都会从 `Form` 中取值，并作为 `value` 属性传递给对应的表单项，如果需要对从 `Form` 中取出的值进行转换再传递给表单项，可以使用 `formatter` 属性。

## en-US

First, when using a controlled form, the values ​​of all form items will be collected by `Form` when they change. If you need to process the value of the form item and store it in the `Form`, you can use the `normalize` attribute. In contrast, when the form item is rendered, the value is taken from the `Form` and passed to the corresponding form item as the `value` attribute. If the value taken from the `Form` needs to be converted and then passed to For form items, you can use the `formatter` attribute.

```js
import { Form, DatePicker, Input, Button } from '@arco-design/web-react';
const FormItem = Form.Item;

const App = () => {
  return (
    <Form style={{ width: 600 }}>
      <FormItem
        label="Number"
        extra="Please enter number"
        field="number"
        autoComplete="off"
        rules={[{ required: true, message: 'Please enter number' }]}
        normalize={(value) => {
          if (value) {
            const val = value.replace(/[^\d]/g, '');
            return `$ ${val}`;
          }

          return value;
        }}
      >
        <Input placeholder="please enter..." />
      </FormItem>
      <FormItem
        label="Date"
        extra="Please enter number"
        field="date"
        rules={[{ required: true, message: 'Please enter number' }]}
        normalize={(value) => {
          return {
            begin: value && value[0],
            end: value && value[1],
          };
        }}
        formatter={(value) => {
          return value && value.begin ? [value.begin, value.end] : [];
        }}
      >
        <DatePicker.RangePicker placeholder="please enter..." />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button type="primary" htmlType="submit">
          Ok
        </Button>
      </FormItem>
      <FormItem shouldUpdate>
        {(value) => {
          return <pre>{JSON.stringify(value, null, 2)}</pre>;
        }}
      </FormItem>
    </Form>
  );
};

export default App;
```

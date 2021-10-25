---
order: 10
title:
  zh-CN: 对值进行转换
  en-US: Normalize
---

## zh-CN

使用 `normalize` 可以对控件的 `value` 进行转换。
使用 `formatter` 可以对保存在 `form` 中的值进行过转换后，再传递给控件。

## en-US

Use `normalize` to convert the `value` of the children component.
Use `formatter` to convert the `value` of the formItem, and then set to the component.

```js
import { Form, DatePicker, Input, Button } from '@arco-design/web-react';

const FormItem = Form.Item;

ReactDOM.render(
  <Form style={{ width: 600 }}>
    <FormItem
      label="Number"
      extra="Please enter number"
      field="number"
      rules={[
        {
          required: true,
          message: 'Please enter number',
        },
      ]}
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
      rules={[
        {
          required: true,
          message: 'Please enter number',
        },
      ]}
      normalize={(value) => {
        return { begin: value && value[0], end: value && value[1]}
      }}
      formatter={value => {
        return value && value.begin ? [value.begin, value.end] : []
      }}
    >
      <DatePicker.RangePicker placeholder="please enter..." />
    </FormItem>
    <FormItem
      wrapperCol={{
        offset: 5,
      }}
    >
      <Button type="primary" htmlType="submit">Ok</Button>
    </FormItem>
    <FormItem shouldUpdate>
      {
        value => {
          return <pre>
            {JSON.stringify(value ,null ,2)}
          </pre>
        }
      }
    </FormItem>
  </Form>,
  CONTAINER
);
```

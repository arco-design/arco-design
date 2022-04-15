---
order: 18
title:
  zh-CN: 表单校验信息模板
  en-US: validate messages
---

## zh-CN

可以通过 `validateMessages` 属性设置校验信息提示模板(`2.32.0`支持)。[示例](https://github.com/arco-design/arco-design/blob/main/components/locale/zh-CN.tsx#L165)

也可以在 `ConfigProvider` 组件的 `componentConfig` 参数，为全局的 `Form` 组件设置 `validateMessages` 。

## en-US

The validation message prompt template can be set through the `validateMessages` property (`2.32.0` support). [example](https://github.com/arco-design/arco-design/blob/main/components/locale/zh-CN.tsx#L165)

You can also set `validateMessages` for the global `Form` component in the `componentConfig` parameter of the `ConfigProvider` component.

```js
import { Form, Input, Button, Message, InputNumber } from '@arco-design/web-react';

const FormItem = Form.Item;

function Demo() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      style={{ width: 600 }}
      validateMessages={{
        required: (_, { label }) => `必须填写 ${label}`,
        string: {
          length: `字符数必须是 #{length}`,
          match: `不匹配正则 #{pattern}`,
        },
        number: {
          min: `最小值为 #{min}`,
          max: `最大值为 #{max}`
        }
      }}
    >
      <FormItem
        label="Username"
        field="name"
        required
        rules={[{
          type: 'string',
          required: true,
          length: 3,
          match: /abc/
        }]}
      >
        <Input placeholder='please enter your username' />
      </FormItem>
      <FormItem
        label='Age'
        field="age"
        rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
      >
        <InputNumber placeholder='please enter your age' />
      </FormItem>
      <FormItem
        wrapperCol={{
          offset: 5,
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
          Validate
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

ReactDOM.render(
  <Demo/>,
  CONTAINER
);
```

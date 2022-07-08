---
order: 2
title:
  zh-CN: 受控模式
  en-US: Controlled
---

## zh-CN

`Mentions` 在 `Form` 中的使用。

## en-US

An example that `Mentions` is used with `Form`,

```js
import { Form, Input, Button, Mentions } from '@arco-design/web-react';
const FormItem = Form.Item;

function App() {
  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
  };

  return (
    <Form
      style={{ width: 360 }}
      initialValues={{ task: 'Component usage' }}
      onValuesChange={onValuesChange}
    >
      <FormItem label="Task" field="task" rules={[{ required: true, message: 'Task is required' }]}>
        <Input />
      </FormItem>
      <FormItem label="Name" field="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Mentions
          placeholder="You can use @ Plato to mention Platon"
          options={['Jack', 'Steven', 'Platon', 'Mary']}
          alignTextarea={false}
          rows={2}
        />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button style={{ margin: '0 12px' }} type="primary">
          Submit
        </Button>
        <Button>Reset</Button>
      </FormItem>
    </Form>
  );
}

export default App;
```

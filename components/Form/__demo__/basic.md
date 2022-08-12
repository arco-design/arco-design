---
order: 0
title: 
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

非受控模式的用法。

## en-US

Usage of uncontrolled mode.

```js
import { Form, Input, Button, Checkbox } from '@arco-design/web-react';
const FormItem = Form.Item;

const App = () => {
  return (
    <Form style={{ width: 600 }} autoComplete="off">
      <FormItem label="Username">
        <Input placeholder="please enter your username..." />
      </FormItem>
      <FormItem label="Post">
        <Input placeholder="please enter your post..." />
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Checkbox>I have read the manual</Checkbox>
      </FormItem>
      <FormItem wrapperCol={{ offset: 5 }}>
        <Button type="primary">Submit</Button>
      </FormItem>
    </Form>
  );
};

export default App;
```

---
order: 1
title:
  zh-CN: 表单布局
  en-US: Layout
---

## zh-CN

`Form` 支持三种排列方式：

horizontal 水平排列 (**默认**)、 vertical 垂直排列、 inline 行内排列

## en-US

`Form` supports three layout: horizontal (**default**), vertical, inline.

```js
import React from 'react';
import { Form, Input, Checkbox, Button, Radio } from '@arco-design/web-react';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function App() {
  const [layout, setLayout] = React.useState('horizontal');
  return (
    <Form
      style={
        layout === 'inline'
          ? {
              width: '100%',
            }
          : {
              maxWidth: 600,
            }
      }
      autoComplete="off"
      layout={layout}
    >
      <FormItem label="Layout" >
        <RadioGroup onChange={setLayout} type="button" name="layout" value={layout}>
          <Radio value="horizontal">horizontal</Radio>
          <Radio value="vertical">vertical</Radio>
          <Radio value="inline">inline</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="Username" field="username" tooltip={<div>Username is required </div>} rules={[{ required: true }]}>
        <Input style={{ width: 270 }} placeholder="please enter your name" />
      </FormItem>
      <FormItem label="Post">
        <Input style={{ width: 270 }} placeholder="please enter your post" />
      </FormItem>
      <FormItem
        wrapperCol={
          layout === 'horizontal'
            ? {
                offset: 5,
              }
            : {}
        }
      >
        <Checkbox>I have read the manual</Checkbox>
      </FormItem>
      <FormItem
        wrapperCol={
          layout === 'horizontal'
            ? {
                offset: 5,
              }
            : {}
        }
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </FormItem>
    </Form>
  );
}

export default App;
```

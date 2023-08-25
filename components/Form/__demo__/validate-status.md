---
order: 16
title:
  zh-CN: 自定义表单校验状态
  en-US: Validate status
---

## zh-CN

`Form.Item` 支持通过 hasFeedback`validateStatus` 和 `help` 属性自定义表单校验状态及校验文案。

## en-US

`Form.Item` supports customizing the form verification status and verification copy through the hasFeedback`validateStatus` and `help` attributes.

```js
import React from 'react';
import {
  Form,
  AutoComplete,
  Input,
  Select,
  Cascader,
  InputNumber,
  Grid,
  DatePicker,
  TreeSelect,
  TimePicker,
  Radio,
} from '@arco-design/web-react';

const FormItem = Form.Item;

function App() {
  const [status, setStatus] = React.useState('error');
  const [size, setSize] = React.useState('default');
  return (
    <div style={{ maxWidth: 650 }}>
      <Form labelCol={{ span: 8 }} autoComplete="off" wrapperCol={{ span: 16 }} size={size}>
        <div>
          <Radio.Group
            value={status}
            type="button"
            onChange={setStatus}
            options={['validating', 'success', 'error', 'warning']}
          ></Radio.Group>
          <br />
          <br />

          <Radio.Group
            type="button"
            onChange={setSize}
            options={['mini', 'small', 'default', 'large']}
          ></Radio.Group>
        </div>
        <br />
        <FormItem
          hasFeedback
          validateStatus={status}
          help="This is custom message"
          extra="This is extra text"
        >
          <Input placeholder="Input... " />
        </FormItem>
        <FormItem
          hasFeedback
          validateStatus={status}
          help="This is custom message"
          extra="This is extra text"
        >
          <div>
            <Input placeholder="Input... " allowClear />
          </div>
        </FormItem>
        <FormItem hasFeedback validateStatus={status} help="Choose at least one">
          <AutoComplete
            style={{ width: '100%' }}
            placeholder="AutoComplete..."
            data={['123', '234', '345', '456']}
          />
        </FormItem>
        <FormItem hasFeedback validateStatus={status}>
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            showTime
            onChange={(a) => {
              console.log(a);
            }}
            placeholder={['Start Time', 'End Time']}
          />
        </FormItem>
        <FormItem help="Please select date" validateStatus={status} hasFeedback>
          <Input.Group>
            <DatePicker style={{ width: '48%' }} placeholder="Select date" />
            <span
              style={{
                width: '4%',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              -
            </span>
            <TimePicker placeholder="Select time" style={{ width: '48%' }}  />
          </Input.Group>
        </FormItem>
        <FormItem hasFeedback validateStatus={status} help="Choose at least one">
          <Cascader placeholder="Cascader..." allowClear options={[]} />
        </FormItem>
        <FormItem hasFeedback validateStatus={status}>
          <Select
            mode="multiple"
            allowCreate
            placeholder="Select..."
            options={['a', 'b', 'c', 'd', 'e']}
          />
        </FormItem>
        <FormItem hasFeedback validateStatus={status} help="This is InputNumber">
          <InputNumber placeholder="InputNumber..." />
        </FormItem>
        <FormItem help="Select tree node" hasFeedback validateStatus={status}>
          <TreeSelect placeholder="TreeSelect...">
            <TreeSelect.Node key="node1" title="Node 1">
              <TreeSelect.Node key="node2" title="Node 2" />
            </TreeSelect.Node>
          </TreeSelect>
        </FormItem>
      </Form>
    </div>
  );
}

export default App;
```

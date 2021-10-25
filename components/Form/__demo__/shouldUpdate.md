---
order: 6
title:
  zh-CN: 嵌套控件
  en-US: Nest Form.Item
---

## zh-CN

`Form.Item` 可以互相嵌套。

## en-US

`Form.Item` can be nested.

```js

import { Form, Input, Button, Grid, Select, InputNumber, Tooltip } from '@arco-design/web-react';
import { IconExclamationCircle } from '@arco-design/web-react/icon';

import { useRef, useState } from 'react';

function Demo() {
  const formRef = useRef();
  const [values, setValues] = useState({});

  return (
    <div>
      <Form
        ref={formRef}
        style={{ maxWidth: 500 }}
        initialValues={{
          city: 'Beijing'
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        onValuesChange={(_, values) => {
          console.log(values);
        }}
      >
        <Form.Item label="User" required>
          <Grid.Row style={{flexWrap: 'nowrap'}}>
            <Form.Item field="name" noStyle={{showErrorTip: true}} rules={[{ required: true, message: 'name is required' }]}>
              <Input placeholder="please enter you username" />
            </Form.Item>
            <Form.Item field="age" noStyle={{showErrorTip: true}} rules={[{ required: true, message: 'age is required' }]}>
              <Input placeholder="please enter your age" style={{marginLeft: 8}} />
            </Form.Item>
          </Grid.Row>
        </Form.Item>
       <Form.Item label="Gender" required>
          <Grid.Row align="center">
            <Form.Item field="gender" noStyle={{showErrorTip: true}} rules={[{ required: true, message: 'name is required' }]}>
              <Select options={['male', 'female', 'other']} placeholder="please enter you gender" style={{ flex: 1 }}/>
            </Form.Item>
              <Tooltip content="必须填写哦">
                <IconExclamationCircle style={{ marginLeft: 8, color: 'rgb(var(--arcoblue-6))' }}/>
              </Tooltip>
          </Grid.Row>
        </Form.Item>
        <Form.Item label="Province" field="province" rules={[{ required: true, message: 'province is required' }]}>
          <Select allowClear placeholder="please select" options={['Beijing', 'Shanghai']}></Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {(values) => {
            return values.province ? (
              <Form.Item field="city" key="city" label="City" >
                <Select allowClear placeholder="please select" options={[values.province]}></Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
            Submit
          </Button>
          <Button
            onClick={() => {
              formRef.current.resetFields();
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

ReactDOM.render(<Demo />, CONTAINER);


```

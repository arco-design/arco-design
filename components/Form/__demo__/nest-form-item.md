---
order: 6
title:
  zh-CN: 表单控件嵌套
  en-US: Nest Form.Item
---

## zh-CN

`Form.Item` 可以互相嵌套。

## en-US

`Form.Item` can be nested.

```js
import { Form, Input, Button, Grid, Select, InputNumber, Tooltip, Space } from '@arco-design/web-react';
import { IconExclamationCircle } from '@arco-design/web-react/icon';
import { useRef, useState } from 'react';

function App() {
  const formRef = useRef();
  const [values, setValues] = useState({});
  return (
    <div>
      <Form
        ref={formRef}
        style={{ maxWidth: 500 }}
        initialValues={{ city: 'Beijing' }}
        autoComplete="off"
        onSubmit={(values) => {
          console.log(values);
        }}
        onValuesChange={(_, values) => {
          console.log(values);
        }}
      >
        <Form.Item label="User" required style={{ marginBottom: 0 }}>
          <Grid.Row gutter={8}>
            <Grid.Col span={12}>
              <Form.Item field="name" rules={[{ required: true }]}>
                <Input placeholder="please enter you username" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item field="age" rules={[{ required: true }]}>
                <Input placeholder="please enter your age" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form.Item>
        <Form.Item label="Gender" required>
          <Grid.Row align="center">
            <Form.Item field="gender" noStyle={{ showErrorTip: true }} rules={[{ required: true }]}>
              <Select
                options={['male', 'female', 'other']}
                placeholder="please enter you gender"
                style={{ flex: 1 }}
              />
            </Form.Item>
            <Tooltip content="必须填写哦">
              <IconExclamationCircle style={{ margin: '0 8px', color: 'rgb(var(--arcoblue-6))' }} />
            </Tooltip>
          </Grid.Row>
        </Form.Item>
        <Form.Item label="Province" field="province" rules={[{ required: true }]}>
          <Select allowClear placeholder="please select" options={['Beijing', 'Shanghai']}></Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {(values) => {
            return values.province ? (
              <Form.Item field="city" key="city" label="City">
                <Select allowClear placeholder="please select" options={[values.province]}></Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item label=" ">
          <Space size={24}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={() => {
                formRef.current.resetFields();
              }}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
```

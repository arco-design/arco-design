---
order: 7
title:
  zh-CN: 表单控件联动
  en-US: shouldUpdate
---

## zh-CN

可以通过`shouldUpdate` 实现控件间的联动。

## en-US

Dynamically change the field of the form by `shouldUpdate`.

```js
import { useRef, useState, useEffect } from 'react';
import { Form, Input, Message, Radio, Button, Select } from '@arco-design/web-react';

function App() {
  const [form] = Form.useForm();
  return (
    <div>
      <Form
        form={form}
        autoComplete="off"
        style={{ maxWidth: 650 }}
        onValuesChange={(_, vs) => {
          console.log(vs);
        }}
      >
        <Form.Item field="type" label="Type">
          <Radio.Group options={['A', 'B']}></Radio.Group>
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {(values) => {
            return values.type === 'A' ? (
              <Form.Item field="Name A" label="Select A">
                <Input placeholder="Please enter name A" />
              </Form.Item>
            ) : (
              values.type === 'B' && (
                <Form.Item field="B" label="Name B">
                  <Select options={['B1', 'B2', 'B3']} placeholder="Please select name B" />
                </Form.Item>
              )
            );
          }}
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, next) => prev.type !== next.type}>
          {(values) => {
            return values.type ? (
              <Form.Item field="remark" label="Remark">
                <Input.TextArea placeholder={values.type + ' remark'} />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 17, offset: 5 }}>
          <Button
            onClick={() => {
              console.log(form.getFieldsValue());
            }}
          >
            Ok
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
```

---
order: 10
title:
  zh-CN: 自定义表单控件
  en-US: Custom Form
---

## zh-CN

`Form.Item` 会给自己的直接子节点（必须是唯一子节点）传递 `onChange` 和 `value` 属性，自定义控件只有在调用这个`onChange` 之后，自己的值才能被 `Form.Item` 收集到 。

## en-US

`Form.Item` will pass the `onChange` and `value` properties to its direct child nodes. Only after calling this `onChange`, can its own value be collected by `Form.Item`.

```js
import { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Typography } from '@arco-design/web-react';

function CustomInput(props) {
  const value = props.value || {};

  const handleChange = (newValue) => {
    props.onChange && props.onChange(newValue);
  };

  return (
    <Input
      value={value.input}
      onChange={(v) => {
        handleChange({ ...value, input: v });
      }}
      addBefore={
        <Select // select component has defined error style
          error={props.error}
          placeholder="Please select ..."
          style={{ width: 100 }}
          value={value.select}
          options={['aaa', 'bbb']}
          onChange={(v) => {
            handleChange({ ...value, select: v });
          }}
        />
      }
    />
  );
}

function App() {
  const formRef = useRef();
  const [values, setValues] = useState({});
  return (
    <div>
      <Form ref={formRef} style={{ maxWidth: 650 }} autoComplete="off" onValuesChange={(_, v) => setValues(v)}>
        <Form.Item
          rules={[
            {
              required: true,
            },
            {
              validator: (val, cb) => {
                console.log(val);

                if (val.select !== 'bbb') {
                  cb('Please select bbb');
                }

                cb();
              },
            },
          ]}
          label="Custom"
          field="customInput"
        >
          <CustomInput />
        </Form.Item>
      </Form>
      <Typography.Paragraph>
        <p>Form Data:</p>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Typography.Paragraph>
    </div>
  );
}

export default App;
```

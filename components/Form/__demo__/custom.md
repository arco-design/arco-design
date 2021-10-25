---
order: 10
title: 
  zh-CN: 自定义表单控件
  en-US: Custom Form
---

## zh-CN

可以自定义表单控件。当使用自定义表单控件时，如果校验规则未通过，会给自定义组件传入 `error` 属性，需要用户自定义控件错误状态的样式。

## en-US

You can customize FormItem. When using a custom FormItem, if the verification rule fails, the `error` attribute will be passed to the custom component, and the user needs to customize the style of the control error state.

```js
import { useRef, useState, useEffect } from 'react';
import { Form, Input, Select, Typography } from '@arco-design/web-react';

function CustomInput(props) {
  const [stateValue, setValue] = useState(props.value);
  const value = props.value || stateValue || {};

  useEffect(() => {
    if (props.value !== stateValue && props.value === undefined) {
      setValue(props.value);
    }
  }, [props.value])

  const handleChange = (newValue) => {
    if (!('value' in props)) {
      setValue(newValue);
    }
    // onChange is passed in by Form.Item and will update the fields bound to the form when triggered.
    props.onChange && props.onChange(newValue);
  }

  return (
    <Input
      value={value.input}
      onChange={(v) => {
        handleChange({ ...value, input: v, });
      }}
      addBefore={
        <Select
          // select component has defined error style
          error={props.error}
          placeholder="Please select ..."
          style={{width: 100}}
          value={value.select}
          options={['aaa', 'bbb']}
          onChange={(v) => {
            handleChange({ ...value, select: v, });
          }}
        />
      }
    />
  );
}

function Demo() {
  const formRef = useRef();
  const [values, setValues] = useState({});

  return (
    <div>
      <Form ref={formRef} style={{ maxWidth: 650 }} onValuesChange={(_, v) => setValues(v)}>
        <Form.Item
          rules={[
            { required: true },
            {
              validator: (val, cb) => {
                console.log(val);
                if (val.select !== 'bbb') {
                  cb('Please select bbb')
                }
                cb()
              }
            }
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

ReactDOM.render(<Demo />, CONTAINER);
```

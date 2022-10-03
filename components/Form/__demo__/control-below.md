---
order: 3
title:
  zh-CN: 低版本受控模式
  en-US: Control below
skip: true
---

## zh-CN

在`1.15.0` 以下版本让表单控件变为受控组件，需要用到 Form.Control。

**注意：**

受控模式会接管表单控件，会自动给表单控件添加相应的 trigger (默认是 onChange)函数，并且会自动收集表单数据。
也可以进行表单验证。也就是说，你不需要给表单控件添加 onChange 等事件了。
通过给 Form.Control 设置 initialValue 来设置初始值，而不是 defaultValue。

## en-US

In versions below `1.15.0` to make `Form` into controlled component, `Form.Control` is required.

**Notice:**

The controlled mode will take over the form, will automatically add the corresponding trigger (default onChange) function to the Form, and will automatically collect the form data.
You can also perform Form validation. In other words, you don't need to add events such as onChange to Form.
Set the initial value by setting initialValue to Form.Control instead of defaultValue.

```js
import React from 'react';
import { Form, Input, InputNumber, Message } from '@arco-design/web-react';

const FormItem = Form.Item;
const FormControl = Form.Control;

class App extends React.Component {
  onSubmit = () => {
    this.form
      .validate()
      .then((values) => {
        Message.info('提交成功！');
        console.log('Values: ', values);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.errors);
      });
  };
  onValuesChange = (value, allValues) => {
    console.log(value, allValues);
  };

  render() {
    return (
      <Form
        ref={(ref) => (this.form = ref)}
        autoComplete="off"
        style={{ maxWidth: 650 }}
        onValuesChange={this.onValuesChange}
      >
        <FormItem label="姓名" required extra="请输入长度在 1 - 10 的名字，注意不要使用特殊符号。">
          <FormControl
            field="name"
            rules={[
              {
                required: true,
              },
              {
                maxLength: 10,
                message: '最多可以输入十个字!',
              },
            ]}
          >
            <Input placeholder="please enter..." />
          </FormControl>
        </FormItem>
        <FormItem label="数字" required>
          <FormControl field="number" rules={[{ type: 'number', required: true }]}>
            <InputNumber placeholder="请输入数字" />
          </FormControl>
        </FormItem>
      </Form>
    );
  }
}

export default App;
```

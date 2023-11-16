---
order: 4
title:
  zh-CN: 配合表单使用
  en-US: With Form
---

## zh-CN

配合表单使用实现校验

## en-US

Use with forms to implement verification

```js
import { Form, Button, Typography, VerificationCode } from '@arco-design/web-react';
const App = () => {
  return (
    <div className="demo-verify-code-wrapper">
      <Typography.Title heading={5}>Verification Code</Typography.Title>
      <Form wrapperCol={{ span: 24 }}>
        <Form.Item
          field="code"
          rules={[
            {
              validator: (v, cb) => {
                return v !== '123456' ? cb('must be 123456') : cb();
              },
            },
          ]}
          validateTrigger={['onFinish']}
        >
          <VerificationCode size="large" validate={({inputValue}) => /\d/.test(inputValue)} />
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit" style={{marginTop: 20}}>
          Submit
        </Button>
      </Form>
    </div>
  );
};


export default App;
```

```css
.demo-verify-code-wrapper {
  display: flex;
  flex-direction: column;
  width: 364px;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 4px 4px 0px 0px;
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.10);
}
```

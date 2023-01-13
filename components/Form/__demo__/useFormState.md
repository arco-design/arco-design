---
order: 22
title:
  zh-CN: useFormState
  en-US: useFormState
---

## zh-CN

可以通过 `Form.useFormState` 监听表单内部状态的变动。（`2.44.0` 支持）


## en-US

You can use `Form.useFormState` to monitor the changes of status inside the form. (`2.44.0` support)


```js
import { Form, Typography, Input, InputNumber, Space, Button } from '@arco-design/web-react';

function App() {
  const [form] = Form.useForm();
  const ageState = Form.useFormState('age', form) || {};

  console.log(ageState)

  return (
    <div>
      <Form form={form} autoComplete="off">

        <Form.Item label="Age" field="age" rules={[
          {required: true},
          {
            validator: async (value, callback) => {
              return new Promise((resolve) => {
                if (value !== 20) {
                  setTimeout(() => {
                    callback('Age must be 20');
                    resolve();
                  }, 1000);
                } else {
                  resolve();
                }
              });
            },
          },]}>
          <InputNumber placeholder="enter age" />
        </Form.Item>
        <Form.Item label=" ">
          <div>
            表单提交中:
            <Typography.Text code>
              {JSON.stringify(ageState.isSubmitting)}
            </Typography.Text>
          </div>
          <div>
            校验状态:
            <Typography.Text code>
              {ageState.validateStatus}
            </Typography.Text>
          </div>
          <div>
            错误信息:
            <Typography.Text code>
              {JSON.stringify(ageState.errors, null, 2)}
            </Typography.Text>
          </div>
          <div>
            警告信息:
            <Typography.Text code>
              {JSON.stringify(ageState.warnings, null, 2)}
            </Typography.Text>
          </div>
        </Form.Item>

        <Form.Item label=" ">
          <Space>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
```

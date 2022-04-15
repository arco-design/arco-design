---
order: 1
title:
  zh-CN: 异步关闭
  en-US: Async Close
---

## zh-CN

在对话框中使用表单时，如提交表单，点击确定后异步关闭对话框。


## en-US

When using a form in a dialog, such as submitting a form, click OK to close the dialog asynchronously.

```js
import { useState } from 'react';
import { Modal, Button, Form, Input, Select, Message } from '@arco-design/web-react';

const FormItem = Form.Item;

function Demo() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      setConfirmLoading(true);
      setTimeout(() => {
        Message.success('Success !');
        setVisible(false);
        setConfirmLoading(false);
      }, 1500);
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal with async logic
      </Button>
      <Modal
        title="Add User"
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{ style: { flexBasis: 90 } }}
          wrapperCol={{ style: { flexBasis: 'calc(100% - 90px)' } }}
        >
          <FormItem label="Name" field="name" rules={[{ required: true }]}>
            <Input placeholder="" />
          </FormItem>
          <FormItem label="Gender" required field="sex" rules={[{ required: true }]}>
            <Select options={['男', '女']} />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
}

ReactDOM.render(<Demo />, CONTAINER);
```

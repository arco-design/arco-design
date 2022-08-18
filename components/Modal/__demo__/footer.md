---
order: 2
title:
  zh-CN: 自定义页脚
  en-US: Customize Footer
---

## zh-CN

传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 props。如果 `okButtonProps` 、 `cancelButtonProps` 仍然不能满足需要的话，可以直接传入`footer`来自定义页脚内容。

## en-US

Pass in `okButtonProps` and `cancelButtonProps` to customize the props of the OK button and the cancel button respectively. If `okButtonProps` and `cancelButtonProps` still cannot meet your needs, you can directly pass in `footer` to customize the footer content.

```js
import React from 'react';
import { Modal, Button, Space} from '@arco-design/web-react';

function App() {
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  return (
    <Space size="large">
      <Button
        onClick={() => setVisible(true)}
        type="primary"
      >
        Open Modal with customized button props
      </Button>
      <Modal
        title="Modal Title"
        visible={visible}
        okButtonProps={{
          disabled: true,
        }}
        cancelButtonProps={{
          disabled: true,
        }}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button
        onClick={() => {
          setVisible1(true);
        }}
        type="primary"
      >
        Open Modal with customized footer
      </Button>
      <Modal
        title="Modal Title"
        visible={visible1}
        footer={
          <>
            <Button
              onClick={() => {
                setVisible1(false);
              }}
            >
              Return
            </Button>
            <Button
              loading={loading1}
              onClick={() => {
                setLoading1(true);
                setTimeout(() => {
                  setLoading1(false);
                  setVisible1(false);
                }, 1500);
              }}
              type="primary"
            >
              Submit
            </Button>
          </>
        }
        onCancel={() => {
          setVisible1(false);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>

      <Button
        onClick={() => {
          setVisible2(true);
        }}
        type="primary"
      >
        Open Modal without footer
      </Button>
      <Modal
        title="Modal Title"
        visible={visible2}
        footer={null}
        onCancel={() => {
          setVisible2(false);
        }}
      >
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
        <p>Some content...</p>
      </Modal>
    </Space>
  );
}

export default App;
```

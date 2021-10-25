---
order: 6
title: 
  zh-CN: 定制按钮文字
  en-US: Customize Button Text
---

## zh-CN

设置 `okText` 与 `cancelText` 以自定义按钮文字。

## en-US

Set `okText` and `cancelText` to customize the button text.

```js
import { Modal, Button } from '@arco-design/web-react';

function Demo () {
  const [visible, setVisible] = React.useState(false);

  function confirm() {
    Modal.confirm({
      title: 'Confirm deletion',
      content: 'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
      okText: 'Ok',
      cancelText: 'Cancel',
    });
  }

  function openInfo() {
    Modal.info({
      title: 'Info Notification',
      okText: 'got it',
      content: 'This is an info description which directly indicates a neutral informative change or action. (e.g., "We are providing new services for all developers.") '
    });
  }

  return (
      <div>
        <Button onClick={() => setVisible(true)} type="primary" style={{ marginRight: 24 }}>
          Modal
        </Button>
        <Modal
          title="Modal Title"
          visible={visible}
          okText="ok"
          cancelText="Cancel"
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <p>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</p>
        </Modal>

        <Button type="primary" onClick={confirm} style={{ marginRight: 24 }}>Confirm</Button>

        <Button type="primary" onClick={openInfo}>info</Button>
      </div>
  )
}

ReactDOM.render(<Demo />, CONTAINER);
```

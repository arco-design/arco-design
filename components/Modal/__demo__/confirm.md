---
order: 4
title:
  zh-CN: 确认对话框
  en-US: Confirm Modal
---

## zh-CN

使用`Modal.confirm()`，可以快速弹出对话框。

## en-US

Use `Modal.confirm()` to quickly pop up a confirmation modal dialog.

```js
import { Modal, Message, Button } from '@arco-design/web-react';

function confirm() {
  Modal.confirm({
    title: 'Confirm deletion',
    content:
      'Are you sure you want to delete the 3 selected items? Once you press the delete button, the items will be deleted immediately. You can’t undo this action.',
    okButtonProps: {
      status: 'danger',
    },
    onOk: () => {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch((e) => {
        Message.error({
          content: 'Error occurs!',
        });
        throw e;
      });
    },
  });
}

const App = () => {
  return (
    <Button type="primary" onClick={confirm}>
      Confirm
    </Button>
  );
};

export default App;
```

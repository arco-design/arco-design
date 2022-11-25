---
order: 10
title:
  zh-CN: 带有通知对话框
  en-US: Dialog with Alert
---

## zh-CN

对话框中显示 Alert.

## en-US

Show Alert in dialog.

```js
import React from 'react';
import { Modal, Button, Table, Alert } from '@arco-design/web-react';

function App() {
  const [visible, setVisible] = React.useState(false); // table

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Version',
      dataIndex: 'version',
      sorter: (a, b) => {
        const aVersion = a.version.split('.');
        const bVersion = b.version.split('.');

        for (let i = 0; i < aVersion.length; i++) {
          if (aVersion[i] === bVersion[i]) continue;
          return aVersion[i] - bVersion[i];
        }

        return 1;
      },
    },
    {
      title: 'Author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
    },
  ];
  const data = [
    {
      id: '1',
      name: 'EduTools',
      version: '12.18.1',
      author: 'Dickens',
    },
  ];
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal
      </Button>
      <Modal
        title="Manage Plugins"
        visible={visible}
        className="modal-demo-without-content-spacing"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Alert closable type="info" content="This message displays only once." />
        <div style={{ padding: 20 }}>
          <p>
            You can select multiple plugins for the current project so that our app will verify that
            the plugins are installed and enabled.
          </p>
          <p style={{ marginTop: 20, marginBottom: 8, fontWeight: 600 }}>List of plugins</p>
          <Table
            columns={columns}
            data={data}
            pagination={false}
            border={{ headerCell: true, wrapper: true }}
            rowKey="id"
            rowSelection={{ type: 'checkbox', checkAll: true }}
          ></Table>
        </div>
      </Modal>
    </div>
  );
}

export default App;
```

```css
.modal-demo-without-content-spacing .arco-modal-content {
  padding: 0;
}
```

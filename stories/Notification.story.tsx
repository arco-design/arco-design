import React from 'react';
import { Button, Notification } from '@self';
import { IconMessage } from '@self/icon';

function Demo1() {
  let i = 0;
  function topLeft() {
    Notification.addInstance({
      position: 'topLeft',
      content: `Content: ${i++}`,
    });
  }
  function topRight() {
    Notification.addInstance({
      position: 'topRight',
      content: `Content: ${i++}`,
    });
  }
  function bottomLeft() {
    Notification.addInstance({
      position: 'bottomLeft',
      content: `Content: ${i++}`,
    });
  }
  function bottomRight() {
    Notification.addInstance({
      position: 'bottomRight',
      content: `Content: ${i++}`,
    });
  }
  function updateNotification() {
    Notification.info({
      id: 'need_update',
      content: '两秒后更新...',
      duration: 2000,
    });
    setTimeout(() => {
      Notification.info({
        id: 'need_update',
        title: '哈哈',
        icon: <IconMessage style={{ color: '#e05c69' }} />,
        content: '成功更新！！',
        duration: 2000,
      });
    }, 2000);
  }

  return (
    <>
      <div>
        <Button style={{ marginRight: 10 }} onClick={topLeft} type="primary">
          TopLeft
        </Button>
        <Button style={{ marginRight: 10 }} onClick={topRight} type="primary">
          TopRight
        </Button>
        <Button style={{ marginRight: 10 }} onClick={bottomLeft} type="primary">
          BottomLeft
        </Button>
        <Button style={{ marginRight: 10 }} onClick={bottomRight} type="primary">
          BottomRight
        </Button>
      </div>
      <div style={{ marginTop: 30 }}>
        <Button
          style={{ marginRight: 10 }}
          onClick={() =>
            Notification.info({ showIcon: true, title: 'Info', content: '哈哈哈哈啊' })
          }
          type="primary"
        >
          Info
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() =>
            Notification.success({ showIcon: true, title: 'Success', content: '哈哈哈哈啊' })
          }
          type="primary"
          status="success"
        >
          Success
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() =>
            Notification.error({ showIcon: true, title: 'Error', content: '哈哈哈哈啊' })
          }
          type="primary"
          status="danger"
        >
          Error
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() =>
            Notification.warning({ showIcon: true, title: 'Warning', content: '哈哈哈哈啊' })
          }
          type="primary"
          status="warning"
        >
          Wraning
        </Button>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => Notification.normal({ title: 'Normal', content: '哈哈哈哈啊' })}
        >
          Normal
        </Button>
      </div>
      <div style={{ marginTop: 30 }}>
        <Button
          style={{ marginRight: 10 }}
          onClick={() =>
            Notification.info({
              showIcon: true,
              title: '我需要手动关闭',
              content:
                '这是一个需要手动关闭的通知这是一个需要手动关闭的通知这是一个需要手动关闭的通知这是一个需要手动关闭的通知',
              duration: 0,
            })
          }
          type="primary"
        >
          手动关闭
        </Button>
      </div>
      <div style={{ marginTop: 30 }}>
        <Button style={{ marginRight: 10 }} onClick={updateNotification} type="primary">
          两秒后更新通知内容
        </Button>
      </div>
      <div style={{ marginTop: 30 }}>
        <Button
          style={{ marginRight: 10 }}
          onClick={() => Notification.clear()}
          type="primary"
          status="danger"
        >
          清除所有notifications
        </Button>
      </div>
    </>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Notification',
};

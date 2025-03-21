import React from 'react';
import { Message, Button, Notification } from '@self';

export const Demo = () => {
  React.useEffect(() => {
    // setTimeout(() => {
    Message.error(
      'This is an info messageasdasdasdasdasdasdasdasdmessageasdasdasdasdasdasdasdasd!'
    );
    Message.error('This is an info message!');
    Array.from(new Array(2)).forEach(() => {
      Notification.info({
        closable: false,
        title: 'Notification',
        content: 'This is a notification!',
      });
      // });
    });
  }, []);

  return (
    <Button
      onClick={() => {
        Message.error('This is an info message!');
        console.log(
          Notification.info({
            closable: false,
            title: 'Notification',
            content: 'This is a notification!',
          })
        );
      }}
      type="primary"
    >
      Open Message
    </Button>
  );
};

export const TestUseMessage = () => {
  const [message, contextHolder] = Message.useMessage();
  const [btnLoading, setBtnLoading] = React.useState(false);

  const sleep = function () {
    return new Promise((rs) => {
      setTimeout(() => {
        rs(1);
      }, 1000);
    });
  };
  return (
    <div>
      <Button
        loading={btnLoading}
        onClick={async () => {
          setBtnLoading(true);
          await sleep();
          message.success?.('123');
          setBtnLoading(false);
        }}
      >
        test
      </Button>
      <Button
        onClick={async () => {
          setBtnLoading(true);
          message.success?.('123');
          setBtnLoading(false);
        }}
      >
        test2
      </Button>
      {contextHolder}
    </div>
  );
};

export default {
  title: 'Message',
};

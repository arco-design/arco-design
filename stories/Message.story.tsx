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

export default {
  title: 'Message',
};

import React from 'react';
import { Popconfirm, Button, Message } from '@self';

function Demo1() {
  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: 400,
          height: 400,
          marginLeft: 100,
          marginTop: 100,
        }}
      >
        <Popconfirm position="tl" title="上左～～～">
          <Button style={{ position: 'absolute', top: 20, left: 70 }}>上左</Button>
        </Popconfirm>
        <Popconfirm position="top" title="上～～～">
          <Button style={{ position: 'absolute', top: 20, left: 180 }}>上边</Button>
        </Popconfirm>
        <Popconfirm position="tr" title="上右～～～">
          <Button style={{ position: 'absolute', top: 20, left: 290 }}>上右</Button>
        </Popconfirm>
        <Popconfirm position="lt" title="左上～～～">
          <Button style={{ position: 'absolute', top: 60, left: 10 }}>左上</Button>
        </Popconfirm>
        <Popconfirm position="left" title="左～～～">
          <Button style={{ position: 'absolute', top: 120, left: 10 }}>左边</Button>
        </Popconfirm>
        <Popconfirm position="lb" title="左下～～～">
          <Button style={{ position: 'absolute', top: 180, left: 10 }}>左下</Button>
        </Popconfirm>
        <Popconfirm position="rt" title="右上～～～">
          <Button style={{ position: 'absolute', top: 60, left: 350 }}>右上</Button>
        </Popconfirm>
        <Popconfirm position="right" title="右边～～～">
          <Button style={{ position: 'absolute', top: 120, left: 350 }}>右边</Button>
        </Popconfirm>
        <Popconfirm position="rb" title="右下～～～">
          <Button style={{ position: 'absolute', top: 180, left: 350 }}>右下</Button>
        </Popconfirm>
        <Popconfirm position="bl" title="下左～～～">
          <Button style={{ position: 'absolute', top: 226, left: 70 }}>下左</Button>
        </Popconfirm>
        <Popconfirm position="bottom" title="Title">
          <Button style={{ position: 'absolute', top: 226, left: 180 }}>下边</Button>
        </Popconfirm>
        <Popconfirm position="br" title="下右～～～">
          <Button style={{ position: 'absolute', top: 226, left: 290 }}>下右</Button>
        </Popconfirm>
      </div>
      <div style={{ position: 'absolute', top: 500, left: 200 }}>
        <Popconfirm
          title="Title Title Title Title Title Title Title"
          onConfirm={() => {
            Message.info('你点击了确认');
          }}
          onCancel={() => {
            Message.error('你点击了取消');
          }}
        >
          <Button style={{ marginRight: 20 }}>Click</Button>
        </Popconfirm>
        <Popconfirm
          blurToHide={false}
          trigger="click"
          title="Title Title Title Title Title Title Title"
          onConfirm={() => {
            Message.info('确认成功');
          }}
          onCancel={() => {
            Message.error('你点击了取消');
          }}
        >
          <Button style={{ marginRight: 20 }}>Loading</Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Popconfirm',
};

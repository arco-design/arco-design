import React, { useState } from 'react';
import { Spin, Alert, Button } from '@self';

function DemoSpin() {
  const [loading, setLoading] = useState(false);
  const [delay, setDelay] = useState(200);

  return (
    <div>
      <Spin tip="加载中..." loading={loading} delay={delay}>
        <Alert
          style={{ width: 300 }}
          showIcon
          type="info"
          title="Info"
          content={`Spin with delay: ${delay}ms`}
        />
      </Spin>

      <Spin tip="加载中..." loading={loading}>
        <Alert
          style={{ width: 300, marginLeft: 30 }}
          showIcon
          type="info"
          title="Info"
          content="你好，这是一条文本消息。"
        />
      </Spin>

      <div style={{ marginTop: 30 }}>
        <Button style={{ marginRight: 30 }} onClick={() => setLoading(!loading)} type="primary">
          {`Loading: ${loading}`}
        </Button>

        <Button style={{ marginRight: 30 }} onClick={() => setDelay(delay * 2 || 200)}>
          Increase delay
        </Button>

        <Button style={{ marginRight: 30 }} onClick={() => setDelay(~~(delay / 2))}>
          Decrease delay
        </Button>
      </div>
    </div>
  );
}

export const Demo = () => <DemoSpin />;

export default {
  title: 'Spin',
};

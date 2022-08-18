import React, { useState } from 'react';
import { Skeleton, Switch, Avatar } from '@self';

function DemoSkeleton() {
  const [loading, setLoading] = useState<boolean>(true);

  function onChange() {
    setLoading(!loading);
  }

  return (
    <div>
      <Switch onChange={onChange} checked />
      <br />
      <Skeleton
        loading={loading}
        text={{ width: ['90%', '120%', 800, 100], rows: 4, className: 'text' }}
        image={{ className: 'image' }}
        className="ceshi"
      >
        <div style={{ display: 'flex' }}>
          <Avatar size={40} style={{ marginRight: 20 }}>
            Byte
          </Avatar>
          <div>
            <p>这是第一行数据这是第一行数据这是第一行数据</p>
            <p>这是第二行数据这是第二行数据</p>
            <p>这是第三行数据</p>
          </div>
        </div>
      </Skeleton>
    </div>
  );
}

export const Demo = () => <DemoSkeleton />;

export default {
  title: 'Skeleton',
};

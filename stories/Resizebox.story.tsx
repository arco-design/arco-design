/* eslint-disable no-console */
import React, { useState } from 'react';
import { ResizeBox, Tag, Space, Radio } from '@self';

function Demo1() {
  const [direction, setDirection] = useState('horizontal');
  return (
    <Space direction="vertical" size={20}>
      <Radio.Group
        type="button"
        value={direction}
        onChange={setDirection}
        options={['horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse']}
      />
      <ResizeBox.Split
        direction={direction as any}
        style={{
          height: 400,
          width: 400,
          border: '1px solid var(--color-border)',
        }}
        size={'200px'}
        min={0.1}
        max={'250px'}
        onMoving={(e, size) => console.log(size)}
        panes={[
          <Tag key="first" color="arcoblue">
            Fist
          </Tag>,
          <Tag key="second" color="green">
            Second
          </Tag>,
        ]}
      />
    </Space>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Resizebox',
};

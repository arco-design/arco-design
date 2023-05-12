/* eslint-disable no-console */
import React, { useState } from 'react';
import { ResizeBox, Tag, Space, Radio, Typography } from '@self';

function Demo1() {
  const [direction, setDirection] = useState('horizontal');
  const panes = [{ size: 0.1 }, { size: '80px' }, { size: 0.2 }, {}, {}];
  return (
    <ResizeBox.SplitGroup
      panes={panes.map((obj) => {
        return {
          content: <Typography.Text>text </Typography.Text>,
          ...obj,
        };
      })}
    />
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Resizebox',
};

import React from 'react';
import { Space } from '@self';

export const Split = () => (
  <Space split={<span style={{ margin: '0 12px' }}>/</span>}>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </Space>
);

export default {
  title: 'Space',
};

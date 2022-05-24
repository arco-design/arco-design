import React from 'react';
import { Tag, Space } from '@self';

export const Demo = () => (
  <Space>
    <Tag> hhh </Tag>
    <Tag closable> 未处理 </Tag>
    <Tag color="#00f"> 报警 </Tag>
    <Tag color="red"> 报警 </Tag>
    <Tag closable color="red">
      报警
    </Tag>
  </Space>
);

export default {
  title: 'Tag',
};

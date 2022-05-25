import React from 'react';
import { Transfer } from '@self';

const dataSource = new Array(20).fill(null).map((_, index) => ({
  key: `${index + 1}`,
  value: `Option ${index + 1}`,
  disabled: index === 6,
}));

export const Demo = () => (
  <Transfer
    listStyle={{ height: 600 }}
    showSearch
    dataSource={dataSource}
    searchPlaceholder="Please select"
    defaultTargetKeys={['1', '2', '3']}
    defaultSelectedKeys={['4', '6', '7']}
    titleTexts={['To-do list', 'Selected list']}
  />
);

export default {
  title: 'Transfer',
};

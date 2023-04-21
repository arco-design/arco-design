import React from 'react';
import { TreeSelect, Tree, Space } from '@self';

const treeData = [
  {
    key: 'Products',
    title: 'Products',
    children: [
      {
        key: 'manage product',
        title: 'manage product',
        children: [
          {
            key: 'manage product edit',
            title: 'manage product edit',
            disabled: true,
          },
          {
            key: 'manage product view',
            title: 'manage product view',
            disabled: true,
          },
        ],
      },
      {
        key: 'manage global product',
        title: 'manage global product',
        children: [
          {
            key: 'manage global product edit',
            title: 'manage global product edit',
            disabled: false,
          },
          {
            key: 'manage global product view',
            title: 'manage global product view',
            disabled: true,
          },
        ],
      },
      {
        key: 'add product',
        title: 'add product',
        children: [
          {
            key: 'add product edit',
            title: 'add product edit',
          },
          {
            key: 'add product view',
            title: 'add product view',
          },
        ],
      },
    ],
  },
];
export const Demo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div>
        treeselect 开启treeCheckable后，如果叶子都disabled： 1. 无法选择父节点 2.
        勾选祖先节点后，祖先节点呈现半选状态，但无法勾选取消 3. 想同的数据，treeselect 和 tree
        表现不一致
      </div>
      <Space>
        <TreeSelect
          showSearch={false}
          allowClear
          treeCheckable
          style={{ width: '300px' }}
          treeData={treeData}
          maxTagCount={100}
        />

        <Tree
          checkable
          treeData={treeData}
          checkedStrategy="child"
          onCheck={(keys) => {
            console.log(keys);
          }}
        />
      </Space>
    </div>
  );
};
export default {
  title: 'TreeSelect',
};

import React from 'react';
import { cleanup } from '@testing-library/react';
import { render, fireEvent, $ } from '../../../tests/util';
import Tree from '..';

const TreeData = [
  {
    key: 'Trunk 0-0',
    title: '0-0',
    children: [
      {
        key: 'Branch 0-0-2',
        title: '0-0-2',
        children: [
          {
            key: 'Leaf',
            title: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    key: 'Trunk 0-1',
    title: '0-1',
    children: [
      {
        key: 'Branch 0-1-1',
        title: '0-1-1',
        children: [
          {
            key: 'Leaf',
            title: '0-1-1-0',
          },
        ],
      },
    ],
  },
];

describe('Tree case', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
    cleanup();
  });

  it('icons correctly', async () => {
    const wrapper = render(
      <Tree
        treeData={TreeData}
        icons={(nodeprops) => {
          return {
            switcherIcon: nodeprops.expanded ? '-' : '+',
          };
        }}
      />
    );

    const firstNode = wrapper.find(`.arco-tree-node-switcher-icon`).item(0);

    // 默认是展开的
    expect(firstNode.textContent).toBe('-');
    fireEvent.click(firstNode);
    // 收起节点
    expect(firstNode.textContent).toBe('+');
  });

  it('show child correctly', async () => {
    const data = [
      {
        key: 'Trunk 0-0',
        title: '0-0',
        children: [
          {
            key: 'Branch 0-0-2',
            title: '0-0-2',
            disableCheckbox: true,
            children: [
              {
                key: 'Leaf',
                title: '0-0-2-1',
              },
            ],
          },
        ],
      },
    ];

    let currentKeys;
    render(
      <Tree
        onCheck={(keys) => {
          currentKeys = keys;
        }}
        checkable
        treeData={data}
        checkedStrategy="child"
      />
    );

    fireEvent.click($('.arco-checkbox').item(0));

    // 默认是展开的
    expect(currentKeys).toEqual([data[0].key]);

    fireEvent.click($('.arco-checkbox').item(2));

    expect(currentKeys).toEqual([data[0].key, data[0].children[0].children[0].key]);

    // 取消节点选中
    fireEvent.click($('.arco-checkbox').item(2));

    expect(currentKeys).toEqual([data[0].key]);
  });
});

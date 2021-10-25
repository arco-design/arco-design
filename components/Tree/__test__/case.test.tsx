import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
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
  });

  it('icons correctly', async () => {
    const wrapper = mount(
      <Tree
        treeData={TreeData}
        icons={(nodeprops) => {
          return {
            switcherIcon: nodeprops.expanded ? '-' : '+',
          };
        }}
      />
    );

    const firstNode = wrapper.find(`.arco-tree-node-switcher-icon`).first();

    // 默认是展开的
    expect(firstNode.text()).toBe('-');
    await act(() => {
      firstNode.simulate('click');
    });
    // 收起节点
    expect(firstNode.text()).toBe('+');
  });
});

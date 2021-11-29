import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import Tree from '..';

const TreeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    items: [
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        items: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    items: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        items: [
          {
            label: 'Leaf',
            value: '0-1-1-0',
          },
        ],
      },
    ],
  },
];

describe('Tree fieldNames', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('render fieldNames correctly', () => {
    const wrapper = mount(
      <Tree
        treeData={TreeData}
        fieldNames={{
          key: 'value',
          title: 'label',
          children: 'items',
        }}
      />
    );

    expect(wrapper.find('.arco-tree-node')).toHaveLength(6);
    expect(wrapper.find('.arco-tree-node-title-text').at(0).text()).toBe('Trunk 0-0');
  });

  it('fieldNames checkedStrategy=parent  correctly', async () => {
    let value = [];
    const wrapper = mount(
      <Tree
        checkable
        onCheck={(keys) => {
          value = keys;
        }}
        treeData={TreeData}
        checkedStrategy="parent"
        fieldNames={{
          key: 'value',
          title: 'label',
          children: 'items',
        }}
      />
    );

    await act(() => {
      wrapper
        .find('.arco-checkbox > input')
        .at(2)
        .simulate('change', {
          target: {
            checked: true,
          },
        });
    });

    expect(value).toEqual([TreeData[0].value]);
  });
});

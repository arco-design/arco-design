// TODO: 类型定义未完善

import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Tree from '..';
import { IconHeartFill } from '../../../icon';
import { NodeProps } from '../interface';
import componentConfigTest from '../../../tests/componentConfigTest';

componentConfigTest(Tree, 'Tree');

mountTest(Tree);
const TreeNode = Tree.Node;
const prefixCls = '.arco-tree';

const data = [
  {
    key: 'node1',
    title: '拉尼斯特家族',
    children: [
      {
        key: 'node1-1',
        title: '小恶魔',
        children: [
          {
            key: 'node1-1-1',
            title: '小小恶魔',
          },
        ],
      },
    ],
  },
  {
    key: 'node2',
    title: '史塔克家族',
    children: [
      {
        key: 'node2-1',
        title: '二丫',
      },
      {
        key: 'node2-2',
        title: '三傻',
      },
    ],
  },
];

const defaultSelectedKeys = ['node2'];
const defaultExpandedKeys = ['node1'];

// 从treedata 生成 treenode
const generatorTreeNodes = (treeData) => {
  return treeData.map((item) => {
    const { children, key, ...rest } = item;
    return (
      <Tree.Node key={key} {...rest} dataRef={item}>
        {children ? generatorTreeNodes(item.children) : null}
      </Tree.Node>
    );
  });
};

const getTreeNodesLength = (treeData) => {
  let results = treeData.length;
  for (let i = 0; i < treeData.length; i++) {
    const item = treeData[i];
    const { children } = item;
    if (children) {
      results += getTreeNodesLength(children);
    } else {
      continue;
    }
  }
  return results;
};

// const getLeafLength = (treeData) => {
//   const obj = Array.isArray(treeData) ? { children: treeData } : treeData;
//   if (!obj.children || obj.children.length === 0) {
//     return 1;
//   }
//   let leafCount = 0;
//   for (let i = 0; i < obj.children.length; i++) {
//     leafCount += getLeafLength(obj.children[i]);
//   }

//   return leafCount;
// };
describe('Tree', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('tree render basic', () => {
    const wrapper = mount(<Tree>{generatorTreeNodes(data)}</Tree>);
    const summaryNodeLength = getTreeNodesLength(data);
    expect(wrapper.find(`${prefixCls}-node`)).toHaveLength(summaryNodeLength);
  });
  it('tree render treedata', () => {
    const wrapper = mount(<Tree treeData={data} />);
    const wrapper2 = mount(<Tree>{generatorTreeNodes(data)}</Tree>);
    expect(wrapper.html()).toEqual(wrapper2.html());
  });

  it('should be expanded and collapsed', () => {
    const mockExpand = jest.fn();
    const wrapper = mount(
      <Tree defaultExpandedKeys={defaultExpandedKeys} onExpand={mockExpand}>
        {generatorTreeNodes(data)}
      </Tree>
    );
    expect(wrapper.state('expandedKeys')).toEqual(defaultExpandedKeys);
    wrapper
      .find(`${prefixCls}-node-expanded`)
      .first()
      .find(`${prefixCls}-node-switcher-icon`)
      .first()
      .simulate('click');
    expect(wrapper.state('expandedKeys')).toEqual([]);

    // onExpand无法触发的bug
    expect(mockExpand.mock.calls.length).toBe(1);
    wrapper
      .find(`${prefixCls}-node`)
      .last()
      .find(`${prefixCls}-node-switcher-icon`)
      .first()
      .simulate('click');
    expect(wrapper.state('expandedKeys')).toHaveLength(1);
  });
  it('should be expanded and collapsed when expandedKeys in props', () => {
    let keys = [];
    const wrapper = mount(
      <Tree expandedKeys={['node1-1-1']} onExpand={(v) => (keys = v)}>
        {generatorTreeNodes(data)}
      </Tree>
    );
    // 子节点展开，子节点的父节点也需要都展开
    expect(wrapper.state('expandedKeys')).toEqual(['node1-1-1', 'node1', 'node1-1']);
    wrapper.find(`${prefixCls}-node-switcher-icon`).at(1).simulate('click');
    // 父节点关闭，子节点保持展开
    expect(keys).toEqual(['node1-1-1', 'node1']);
    wrapper.setProps({
      expandedKeys: keys,
    });
    wrapper.setProps({
      expandedKeys: ['node2-1'],
    });
    wrapper.update();
    expect(wrapper.state('expandedKeys')).toEqual(['node2-1']);
  });

  it('should be selected correctly', () => {
    const mockSelected = jest.fn();
    const wrapper = mount(
      <Tree defaultSelectedKeys={defaultSelectedKeys} onSelect={mockSelected}>
        {generatorTreeNodes(data)}
      </Tree>
    );
    expect(wrapper.state('selectedKeys')).toEqual(defaultSelectedKeys);
    wrapper
      .find(`${prefixCls}-node`)
      .first()
      .find(`${prefixCls}-node-title`)
      .first()
      .simulate('click');
    expect(mockSelected.mock.calls).toHaveLength(1);

    const selectedKeys = wrapper.state('selectedKeys');
    expect(selectedKeys).toHaveLength(1);
    expect(selectedKeys).toEqual(['node1']);
  });
  it('should be selected correctly when multiple', () => {
    const mockSelected = jest.fn();
    const wrapper = mount(
      <Tree multiple defaultSelectedKeys={defaultSelectedKeys} onSelect={mockSelected}>
        {generatorTreeNodes(data)}
      </Tree>
    );
    expect(wrapper.state('selectedKeys')).toEqual(defaultSelectedKeys);
    wrapper
      .find(`${prefixCls}-node`)
      .first()
      .find(`${prefixCls}-node-title`)
      .first()
      .simulate('click');
    expect(mockSelected.mock.calls).toHaveLength(1);

    const selectedKeys = wrapper.state('selectedKeys');
    expect(selectedKeys).toHaveLength(2);
    expect(selectedKeys).toEqual(['node2', 'node1']);
  });

  it('should checked correctly', () => {
    const defaultCheckedKeys = ['node1'];
    let checkedKeys = [];
    const wrapper = mount(
      <Tree
        checkable
        onCheck={(keys) => {
          checkedKeys = keys;
        }}
        defaultCheckedKeys={defaultCheckedKeys}
      >
        {generatorTreeNodes(data)}
      </Tree>
    );

    expect(wrapper.state('checkedKeys')).toEqual(['node1', 'node1-1', 'node1-1-1']);
    wrapper
      .find(`${prefixCls}-node`)
      .at(3)
      .find(`.arco-checkbox > input`)
      .first()
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    expect(checkedKeys).toEqual(['node1', 'node1-1', 'node1-1-1', 'node2', 'node2-1', 'node2-2']);

    expect(wrapper.state('selectedKeys')).toEqual([]);
  });

  it('should checkStrictly correctly', () => {
    const mockChecked = jest.fn();
    const defaultCheckedKeys = ['node1'];
    const wrapper = mount(
      <Tree checkable checkStrictly onCheck={mockChecked} defaultCheckedKeys={defaultCheckedKeys}>
        {generatorTreeNodes(data)}
      </Tree>
    );

    // 目前通过
    expect(wrapper.state('checkedKeys')).toEqual(['node1']);
    wrapper
      .find(`${prefixCls}-node`)
      .at(3)
      .find(`.arco-checkbox > input`)
      .first()
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    expect(wrapper.state('checkedKeys')).toEqual(['node1', 'node2']);
    expect(mockChecked.mock.calls).toHaveLength(1);
  });

  it('should render empty correctly', () => {
    const wrapper = mount(<Tree>{generatorTreeNodes([])}</Tree>);
    expect(wrapper.find('Tree')).toHaveLength(1);
    expect(wrapper.find(`${prefixCls}-node`)).toHaveLength(0);
  });

  it('should loadMore correctly', () => {
    const loadMore = jest.fn();
    const wrapper = mount(<Tree loadMore={loadMore}>{generatorTreeNodes(data)}</Tree>);
    const iconLength = wrapper.find(`${prefixCls}-node-switcher-icon`).length;
    expect(wrapper.find(`${prefixCls}-node`).length).toEqual(iconLength);
    wrapper
      .find(`${prefixCls}-node`)
      .last()
      .find(`${prefixCls}-node-switcher-icon`)
      .simulate('click');
    expect(loadMore.mock.calls).toHaveLength(1);
  });

  it('selected correctly when disabled', () => {
    const mockSelected = jest.fn();
    const wrapper = mount(
      <Tree onSelect={mockSelected}>
        <TreeNode key="node1" title="拉尼斯特家族" disabled>
          <TreeNode key="node2" title="小恶魔">
            <TreeNode key="node21" title="小恶魔aaa" />
          </TreeNode>
        </TreeNode>
        <TreeNode key="node3" title="史塔克家族">
          <TreeNode key="node4" title="二丫" />
          <TreeNode key="node5" title="三傻" />
        </TreeNode>
      </Tree>
    );

    const disabledItem = wrapper.find(`${prefixCls}-node-disabled`);
    expect(disabledItem).toHaveLength(1);
    disabledItem.find(`${prefixCls}-node-title`).first().simulate('click');
    expect(mockSelected.mock.calls).toHaveLength(0);
  });

  it('self icon render correctly', () => {
    const wrapper = mount(
      <Tree>
        <TreeNode key="node1" title="拉尼斯特家族" icon={<IconHeartFill />} />
        <TreeNode key="node2" title="史塔克家族" />
      </Tree>
    );

    expect(wrapper.find('IconHeartFill')).toHaveLength(1);
    //  expect(wrapper.find(`${prefixCls}-node-switcher-icon`)).toHaveLength(1);
  });

  it('should selectable, disableCheckbox correctly', () => {
    const mockSelected = jest.fn();
    const mockChecked = jest.fn();
    const wrapper = mount(
      <Tree
        checkable
        defaultSelectedKeys={defaultSelectedKeys}
        onSelect={mockSelected}
        onCheck={mockChecked}
        treeData={[
          ...data,
          // TODO: 移除`as`语句
          {
            key: 'disbaled',
            label: 'disablde',
            selectable: false,
            disableCheckbox: true,
          } as NodeProps,
        ]}
      />
    );
    expect(wrapper.state('selectedKeys')).toEqual(defaultSelectedKeys);
    wrapper
      .find(`${prefixCls}-node`)
      .last()
      .find(`${prefixCls}-node-title`)
      .first()
      .simulate('click');
    wrapper
      .find(`${prefixCls}-node`)
      .last()
      .find(`.arco-checkbox > input`)
      .first()
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    expect(mockSelected.mock.calls).toHaveLength(0);
    expect(mockChecked.mock.calls).toHaveLength(0);

    const selectedKeys = wrapper.state('selectedKeys');
    expect(selectedKeys).toHaveLength(1);
    expect(selectedKeys).toEqual(['node2']);
  });

  it('should checkedStrategy correctly', () => {
    let checkedKeys = ['node1'];
    const wrapper = mount(
      <Tree
        checkable
        checkedStrategy={Tree.SHOW_PARENT}
        onCheck={(value) => {
          checkedKeys = value;
        }}
        checkedKeys={checkedKeys}
      >
        {generatorTreeNodes(data)}
      </Tree>
    );

    expect(wrapper.state('checkedKeys')).toEqual(['node1', 'node1-1', 'node1-1-1']);
    const lastChild = wrapper
      .find(`${prefixCls}-node`)
      .at(3)
      .find(`.arco-checkbox > input`)
      .first();

    lastChild.simulate('change', {
      target: {
        checked: true,
      },
    });
    expect(checkedKeys).toEqual(['node1', 'node2']);

    wrapper.setProps({ checkedKeys: ['node1', 'node2'] });

    expect(wrapper.state('checkedKeys')).toEqual([
      'node1',
      'node2',
      'node1-1',
      'node1-1-1',
      'node2-1',
      'node2-2',
    ]);

    wrapper.setProps({ checkedStrategy: Tree.SHOW_CHILD });

    lastChild.simulate('change', { target: { checked: false } });

    expect(checkedKeys).toEqual(['node1-1-1']);

    wrapper.setProps({ checkedKeys });

    expect(wrapper.state('checkedKeys')).toEqual(['node1-1-1', 'node1-1', 'node1']);

    wrapper.setProps({ checkStrictly: true });

    lastChild.simulate('change', { target: { checked: true } });

    wrapper.setProps({ checkedKeys });

    expect(checkedKeys).toEqual(['node1-1-1', 'node2']);

    expect(wrapper.state('checkedKeys')).toEqual(checkedKeys);

    wrapper.update();
    expect(wrapper.find('.arco-checkbox.arco-checkbox-checked')).toHaveLength(2);
  });

  it('should halfchecked correctly', () => {
    const defaultCheckedKeys = ['node1'];
    const wrapper = mount(
      <Tree checkStrictly checkable halfCheckedKeys={defaultCheckedKeys}>
        {generatorTreeNodes(data)}
      </Tree>
    );

    wrapper
      .find(`${prefixCls}-node`)
      .at(1)
      .find(`.arco-checkbox`)
      .hasClass('arco-checkbox-indeterminate');
  });
});

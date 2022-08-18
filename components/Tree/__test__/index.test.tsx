import React from 'react';
import { render, fireEvent, act } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import Tree from '..';
import { IconHeartFill } from '../../../icon';
import componentConfigTest from '../../../tests/componentConfigTest';

componentConfigTest(Tree, 'Tree');

mountTest(Tree);
const TreeNode = Tree.Node;
const prefixCls = '.arco-tree';

const getNodesContent = (nodes) => {
  return [].slice.call(nodes).map((x) => x.querySelector('.arco-tree-node-title-text').textContent);
};

const getCheckedKeys = () => {
  return [].slice
    .call(document.querySelectorAll('.arco-checkbox-checked'))
    .map((x) => x.querySelector('input').getAttribute('value'));
};

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
    const wrapper = render(<Tree>{generatorTreeNodes(data)}</Tree>);
    const summaryNodeLength = getTreeNodesLength(data);
    expect(wrapper.find(`${prefixCls}-node`)).toHaveLength(summaryNodeLength);
  });
  it('tree render treedata', () => {
    const wrapper = render(<Tree treeData={data} />);
    const wrapper2 = render(<Tree>{generatorTreeNodes(data)}</Tree>);
    expect(wrapper.querySelector('.arco-tree')?.innerHTML).toEqual(
      wrapper2.querySelector('.arco-tree')?.innerHTML
    );
  });

  it('should be expanded and collapsed', async () => {
    const mockExpand = jest.fn();
    const wrapper = render(
      <Tree defaultExpandedKeys={defaultExpandedKeys} onExpand={mockExpand}>
        {generatorTreeNodes(data)}
      </Tree>
    );
    expect(wrapper.find('.arco-tree-node').item(0)).toHaveClass('arco-tree-node-expanded');

    // 收起 node1
    fireEvent.click(wrapper.find(`${prefixCls}-node-switcher-icon`).item(0));

    jest.runAllTimers();

    expect(
      wrapper.find('.arco-tree-node').item(0).classList.contains('arco-tree-node-expanded')
    ).toBeFalsy();

    // onExpand无法触发的bug
    expect(mockExpand.mock.calls.length).toBe(1);

    const nodes = wrapper.find(`${prefixCls}-node-switcher-icon`);

    expect(nodes.length).toBe(2);

    // 展开 node2
    fireEvent.click(nodes[1]);

    jest.runAllTimers();

    expect(wrapper.find('.arco-tree-node').item(1)).toHaveClass('arco-tree-node-expanded');
  });

  it('should be expanded and collapsed when expandedKeys in props', async () => {
    let keys: string[] = ['node1-1-1'];
    const wrapper = render(
      <Tree expandedKeys={keys} onExpand={(v) => (keys = v)}>
        {generatorTreeNodes(data)}
      </Tree>
    );

    // 子节点展开，子节点的父节点也需要都展开
    expect(wrapper.querySelectorAll('[aria-expanded=true]')).toHaveLength(3);

    expect(getNodesContent(wrapper.querySelectorAll('[aria-expanded=true]'))).toEqual([
      '拉尼斯特家族',
      '小恶魔',
      '小小恶魔',
    ]);
    fireEvent.click(wrapper.find(`${prefixCls}-node-switcher-icon`).item(1));

    // 父节点关闭，子节点保持展开
    expect(keys).toEqual(['node1-1-1', 'node1']);

    wrapper.rerender(
      <Tree expandedKeys={keys} onExpand={(v) => (keys = v)}>
        {generatorTreeNodes(data)}
      </Tree>
    );

    wrapper.rerender(
      <Tree expandedKeys={['node2-1', 'node2']} onExpand={(v) => (keys = v)}>
        {generatorTreeNodes(data)}
      </Tree>
    );

    expect(wrapper.find('.arco-tree-node-expanded')).toHaveLength(2);
    expect(getNodesContent(wrapper.querySelectorAll('.arco-tree-node-expanded'))).toEqual([
      '史塔克家族',
      '二丫',
    ]);
  });

  it('should be selected correctly', () => {
    const mockSelected = jest.fn();

    const wrapper = render(
      <Tree defaultSelectedKeys={defaultSelectedKeys} onSelect={mockSelected}>
        {generatorTreeNodes(data)}
      </Tree>
    );

    expect(wrapper.find('.arco-tree-node-selected')).toHaveLength(1);

    expect(wrapper.find('.arco-tree-node').item(3)).toHaveClass('arco-tree-node-selected');
    fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(0));
    expect(mockSelected.mock.calls).toHaveLength(1);

    expect(wrapper.find('.arco-tree-node-selected')).toHaveLength(1);
    expect(wrapper.find('.arco-tree-node').item(0)).toHaveClass('arco-tree-node-selected');
  });
  it('should be selected correctly when multiple', () => {
    const mockSelected = jest.fn();
    const wrapper = render(
      <Tree multiple defaultSelectedKeys={defaultSelectedKeys} onSelect={mockSelected}>
        {generatorTreeNodes(data)}
      </Tree>
    );
    expect(wrapper.find('.arco-tree-node-selected')).toHaveLength(1);

    expect(wrapper.find('.arco-tree-node').item(3)).toHaveClass('arco-tree-node-selected');

    fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(0));
    expect(mockSelected.mock.calls).toHaveLength(1);

    expect(wrapper.find('.arco-tree-node-selected')).toHaveLength(2);
    expect(wrapper.find('.arco-tree-node').item(0)).toHaveClass('arco-tree-node-selected');
    expect(wrapper.find('.arco-tree-node').item(3)).toHaveClass('arco-tree-node-selected');
  });

  it('should checked correctly', async () => {
    const defaultCheckedKeys = ['node1'];
    let checkedKeys: string[] = [];
    const wrapper = render(
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

    expect(
      [].slice.call(wrapper.querySelectorAll('input[checked]')).map((x) => x.getAttribute('value'))
    ).toEqual(['node1', 'node1-1', 'node1-1-1']);

    fireEvent.click(
      wrapper.find(`${prefixCls}-node`).item(3).querySelector(`.arco-checkbox`) as any
    );

    expect(checkedKeys).toEqual(['node1', 'node1-1', 'node1-1-1', 'node2', 'node2-1', 'node2-2']);

    expect(getCheckedKeys()).toEqual([
      'node1',
      'node1-1',
      'node1-1-1',
      'node2',
      'node2-1',
      'node2-2',
    ]);
  });

  it('should checkStrictly correctly', () => {
    const mockChecked = jest.fn();
    const defaultCheckedKeys = ['node1'];
    const wrapper = render(
      <Tree checkable checkStrictly onCheck={mockChecked} defaultCheckedKeys={defaultCheckedKeys}>
        {generatorTreeNodes(data)}
      </Tree>
    );

    // 目前通过
    expect(getCheckedKeys()).toEqual(['node1']);

    act(() => {
      fireEvent.click(
        wrapper.find(`${prefixCls}-node`).item(3).querySelector(`.arco-checkbox`) as any
      );
    });

    expect(mockChecked.mock.calls).toHaveLength(1);

    expect(getCheckedKeys()).toEqual(['node1', 'node2']);
  });

  it('should render empty correctly', () => {
    const wrapper = render(<Tree>{generatorTreeNodes([])}</Tree>);
    expect(wrapper.find('.arco-tree')).toHaveLength(1);
    expect(wrapper.find(`${prefixCls}-node`)).toHaveLength(0);
  });

  it('should loadMore correctly', () => {
    const loadMore = jest.fn();
    const wrapper = render(<Tree loadMore={loadMore}>{generatorTreeNodes(data)}</Tree>);
    const iconLength = wrapper.find(`${prefixCls}-node-switcher-icon`).length;
    expect(wrapper.find(`${prefixCls}-node`).length).toEqual(iconLength);
    const nodes = wrapper.find(`${prefixCls}-node-switcher-icon`);
    fireEvent.click(nodes[nodes.length - 1]);
    expect(loadMore.mock.calls).toHaveLength(1);
  });

  it('selected correctly when disabled', () => {
    const mockSelected = jest.fn();
    const wrapper = render(
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
    fireEvent.click(disabledItem.item(0).querySelector(`${prefixCls}-node-title`) as any);
    expect(mockSelected.mock.calls).toHaveLength(0);
  });

  it('self icon render correctly', () => {
    const wrapper = render(
      <Tree>
        <TreeNode key="node1" title="拉尼斯特家族" icon={<IconHeartFill />} />
        <TreeNode key="node2" title="史塔克家族" />
      </Tree>
    );

    expect(wrapper.find('.arco-icon-heart-fill')).toHaveLength(1);
    //  expect(wrapper.find(`${prefixCls}-node-switcher-icon`)).toHaveLength(1);
  });

  it('should selectable, disableCheckbox correctly', () => {
    const mockSelected = jest.fn();
    const mockChecked = jest.fn();
    const wrapper = render(
      <Tree
        checkable
        defaultSelectedKeys={defaultSelectedKeys}
        onSelect={mockSelected}
        onCheck={mockChecked}
        treeData={[
          ...data,
          {
            key: 'disbaled',
            label: 'disablde',
            selectable: false,
            disableCheckbox: true,
          },
        ]}
      />
    );
    expect(wrapper.find('.arco-tree-node-selected')).toHaveLength(1);

    expect(wrapper.find('.arco-tree-node').item(3)).toHaveClass('arco-tree-node-selected');

    const nodes = wrapper.find(`${prefixCls}-node`);

    fireEvent.click(nodes[nodes.length - 1].querySelector(`${prefixCls}-node-title`) as any);
    fireEvent.click(nodes[nodes.length - 1].querySelector(`.arco-checkbox`) as any);

    expect(mockSelected.mock.calls).toHaveLength(0);
    expect(mockChecked.mock.calls).toHaveLength(0);
    expect(wrapper.find('.arco-tree-node-selected')).toHaveLength(1);

    expect(wrapper.find('.arco-tree-node').item(3)).toHaveClass('arco-tree-node-selected');
  });

  it('should checkedStrategy correctly', async () => {
    let checkedKeys = ['node1'];
    const wrapper = render(
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

    const rerender = (props) => {
      wrapper.rerender(
        <Tree
          checkable
          checkedStrategy={Tree.SHOW_PARENT}
          onCheck={(value) => {
            checkedKeys = value;
          }}
          checkedKeys={checkedKeys}
          {...props}
        >
          {generatorTreeNodes(data)}
        </Tree>
      );
    };

    expect(getCheckedKeys()).toEqual(['node1', 'node1-1', 'node1-1-1']);

    fireEvent.click(wrapper.find(`.arco-checkbox`).item(3));
    expect(checkedKeys).toEqual(['node1', 'node2']);

    rerender({ checkedKeys });

    // jest.runAllTimers();

    expect(getCheckedKeys()).toEqual([
      'node1',
      'node1-1',
      'node1-1-1',
      'node2',
      'node2-1',
      'node2-2',
    ]);

    rerender({ checkedStrategy: Tree.SHOW_CHILD });

    // 取消 node2 选中
    fireEvent.click(wrapper.find(`.arco-checkbox`).item(3));

    expect(checkedKeys).toEqual(['node1-1-1']);

    rerender({ checkedKeys });

    expect(getCheckedKeys()).toEqual(['node1', 'node1-1', 'node1-1-1']);

    rerender({ checkStrictly: true });

    // 选中 node2
    fireEvent.click(wrapper.find(`.arco-checkbox`).item(3));
    expect(checkedKeys).toEqual(['node1-1-1', 'node2']);

    rerender({ checkedKeys, checkStrictly: true });

    expect(getCheckedKeys()).toEqual(checkedKeys);

    expect(wrapper.find('.arco-checkbox.arco-checkbox-checked')).toHaveLength(2);
  });

  it('should halfchecked correctly', () => {
    const defaultCheckedKeys = ['node1'];
    const wrapper = render(
      <Tree checkStrictly checkable halfCheckedKeys={defaultCheckedKeys}>
        {generatorTreeNodes(data)}
      </Tree>
    );

    expect(wrapper.find(`${prefixCls}-node`).item(0).querySelector(`.arco-checkbox`)).toHaveClass(
      'arco-checkbox-indeterminate'
    );
  });

  it('should be expanded when click node', () => {
    const mockExpand = jest.fn();
    const mockSelected = jest.fn();
    const wrapper = render(
      <Tree
        defaultExpandedKeys={[]}
        actionOnClick="expand"
        onSelect={mockSelected}
        onExpand={mockExpand}
      >
        {generatorTreeNodes(data)}
      </Tree>
    );

    expect(wrapper.find('.arco-tree-node-title-text').item(0).textContent).toBe('拉尼斯特家族');

    fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(0));
    expect(mockExpand.mock.calls).toHaveLength(1);
    expect(mockSelected.mock.calls).toHaveLength(0);
    expect(wrapper.find('.arco-tree-node-title-text').item(1).textContent).toBe('小恶魔');
  });

  it('should be checked and expand when click node', () => {
    let checkedKeys;
    const wrapper = render(
      <Tree
        defaultExpandedKeys={[]}
        checkable
        onCheck={(keys) => (checkedKeys = keys)}
        actionOnClick={['check', 'expand']}
      >
        {generatorTreeNodes(data)}
      </Tree>
    );

    expect(wrapper.find('.arco-tree-node-title-text').item(0).textContent).toBe('拉尼斯特家族');
    fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(0));
    expect(wrapper.find('.arco-tree-node-title-text').item(1).textContent).toBe('小恶魔');
    expect(wrapper.find('.arco-checkbox-checked')).toHaveLength(2);

    expect(checkedKeys).toEqual(['node1', 'node1-1', 'node1-1-1']);
  });
});

import React, { Component } from 'react';
import { Tree, TreeSelect } from '@self';

const TreeNode = Tree.Node;

const treeData = [
  {
    title: 'Node1',
    value: 'Node1',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: 'Child Node1',
        key: '0-0-1',
        children: [
          {
            title: 'Child Node1-node',
            value: 'Child Node1-node',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'Child Node2',
        value: 'Child Node2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: 'Node2',
    key: '0-1',
  },
];

class DemoTree extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    treeData,
  };

  renderTreeNodes = (data) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} isLeaf={item.isLeaf}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });

  onLoadData = (treeNode, dataRef) =>
    new Promise((resolve) => {
      setTimeout(() => {
        dataRef.children = [
          { title: `Child Node${treeNode.props._key}`, key: `${treeNode.props._key}-0` },
          {
            title: `Child Node${treeNode.props._key}`,
            key: `${treeNode.props._key}-1`,
            isLeaf: true,
          },
        ];
        this.setState({
          treeData: [...this.state.treeData],
        });

        resolve();
      }, 1000);
    });

  handleChange = (value) => {
    console.log(value);
  };

  handleClick = () => {
    const data = [...this.state.treeData];

    data[0].children[0].children = [
      {
        title: '测试',
        key: '测试',
      },
    ];

    this.setState({
      treeData: data,
    });
  };

  onSearch = (node) => {
    console.log(node);
  };

  render() {
    return (
      <div>
        {/* <Tree showSearch loadMore={this.onLoadData}>
          <TreeNode key="node1" title="拉尼斯特家族">
            <TreeNode key="node2" title="小恶魔" />
          </TreeNode>
          <TreeNode key="node3" title="史塔克家族">
            <TreeNode key="node4" title="二丫" />
            <TreeNode key="node5" title="三傻">
              <TreeNode key="node6" title="二丫" />
              <TreeNode key="node7" title="三傻" />
            </TreeNode>
          </TreeNode>
        </Tree> */}

        <TreeSelect
          showSearch
          allowClear
          onChange={this.handleChange}
          triggerElement={<p>1234</p>}
          labelInValue
        >
          <TreeNode key="node1" title="拉尼斯特家族">
            <TreeNode key="node2" title="小恶魔" />
          </TreeNode>
          <TreeNode key="node3" title="史塔克家族">
            <TreeNode key="node4" title="二丫" />
            <TreeNode key="node5" title="三傻">
              <TreeNode key="node6" title="二丫" />
              <TreeNode key="node7" title="三傻" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>

        {/* <TreeSelect treeData={this.state.treeData} showSearch loadMore={this.onLoadData} /> */}
      </div>
    );
  }
}

export const Demo = () => <DemoTree />;

export default {
  title: 'Tree',
};

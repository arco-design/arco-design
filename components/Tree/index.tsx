import React, { Component, DragEvent } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import cs from '../_util/classNames';
import Node from './node';
import NodeList from './node-list';
import { isArray, isEmptyObject, isFunction, isUndefined } from '../_util/is';
import { ConfigContext } from '../ConfigProvider';
import {
  getAllCheckedKeysByCheck,
  getCheckedKeysByInitKeys,
  getTreeDataFromTreeChildren,
} from './util';
import { TreeProps, NodeProps, TreeDataType, NodeInstance, TreeState } from './interface';
import { TreeContext } from './context';
import { pickDataAttributes } from '../_util/pick';

const DefaultFieldNames = {
  key: 'key',
  title: 'title',
  children: 'children',
  selectable: 'selectable',
  disabled: 'disabled',
  disableCheckbox: 'disableCheckbox',
  checkable: 'checkable',
  isLeaf: 'isLeaf',
};

export type key2nodePropsType = {
  [key: string]: TreeDataType;
};

const defaultProps = {
  selectable: true,
  autoExpandParent: true,
  checkedStrategy: 'all' as const,
  actionOnClick: 'select',
  allowDrop: () => true,
  fieldNames: DefaultFieldNames,
  animation: true,
};

const needMergeKeys = [
  'style',
  'className',
  'height',
  'size',
  'blockNode',
  'autoExpandParent',
  'checkedStrategy',
  'fieldNames',
  'icons',
  'virtualListProps',
  'showLine',
  'selectable',
  'allowDrop',
  'actionOnClick',
  'animation',
] as const;

type MergedPropsType = {
  [key in typeof needMergeKeys[number]]?: TreeProps[key];
};

class Tree extends Component<TreeProps, TreeState> {
  static displayName = 'Tree';

  static SHOW_PARENT = 'parent' as const;

  static SHOW_ALL = 'all' as const;

  static SHOW_CHILD = 'child' as const;

  static Node = Node;

  static contextType = ConfigContext;

  context: React.ContextType<typeof ConfigContext>;

  static getDerivedStateFromProps(nextProps: TreeProps, state: TreeState) {
    const newState: TreeState = {};

    if ('selectedKeys' in nextProps && !isEqualWith(nextProps.selectedKeys, state.selectedKeys)) {
      newState.selectedKeys = nextProps.selectedKeys || [];
    }
    if (Object.keys(newState).length) {
      return newState;
    }
    return null;
  }

  key2nodeProps: key2nodePropsType = {};

  dragNode: null | NodeInstance;

  nodeListRef;

  dropPosition: 0 | -1 | 1;

  getMergedProps = (baseProps?): MergedPropsType => {
    const { componentConfig } = this.context;
    const props = baseProps || this.props;
    const treeComponentConfig = componentConfig?.Tree || {};
    const _props = {};

    needMergeKeys.forEach((key) => {
      if (!isUndefined(props[key])) {
        _props[key] = props[key];
      } else if (!isUndefined(treeComponentConfig[key])) {
        _props[key] = treeComponentConfig[key];
      } else {
        _props[key] = defaultProps[key];
      }
    });
    return _props;
  };

  constructor(props, context) {
    super(props, context);

    this.state = {};
    const treeData = this.getTreeData();
    const nodeList = this.getNodeList(treeData, context.getPrefixCls('tree'));
    const { checkedKeys, halfCheckedKeys } = this.getInitCheckedKeys(
      props.checkedKeys || props.defaultCheckedKeys || []
    );

    this.state = {
      selectedKeys: props.selectedKeys || props.defaultSelectedKeys || [],
      checkedKeys,
      halfCheckedKeys,
      expandedKeys: this.getInitExpandedKeys(props.expandedKeys || props.defaultExpandedKeys),
      loadedKeys: [],
      loadingKeys: [],
      currentExpandKeys: [],
      nodeList,
    };
  }

  // index: 第几个dom元素, 如果传入的是字符串，会作为 node 的 key去查找。
  // nodeProps 参数似乎咩有什么用。。。但是不知道外部有没有调用，就当key用吧。。
  scrollIntoView = (_index: number | string, nodeProps?: NodeProps) => {
    let index = _index;
    if (nodeProps) {
      // 作为key
      index = nodeProps._key;
    }

    if (this.nodeListRef) {
      this.nodeListRef.scrollIntoView(index, nodeProps || this.key2nodeProps[index]);
    }
  };

  componentDidUpdate(prevProps) {
    // 类似 componentWillReceiveProps 周期

    const prevMergedProps = this.getMergedProps(prevProps);
    const mergedProps = this.getMergedProps();

    if (prevProps !== this.props || !isEqualWith(prevMergedProps, mergedProps)) {
      const newState: Partial<TreeState> = {};
      if (
        this.needUpdateTreeData(
          { prevMergedProps, ...prevProps },
          { ...mergedProps, ...this.props }
        )
      ) {
        const treeData = this.getTreeData();
        const nodeList = this.getNodeList(treeData);
        newState.treeData = treeData;
        newState.nodeList = nodeList;
      }

      if (
        newState.treeData ||
        ('checkedKeys' in this.props && !isEqualWith(prevProps.checkedKeys, this.props.checkedKeys))
      ) {
        // 说明treeData变了，需要比较下内部checkedKeys
        const currentCheckedKeys =
          'checkedKeys' in this.props ? this.props.checkedKeys : this.state.checkedKeys;
        const { halfCheckedKeys, checkedKeys } = this.getInitCheckedKeys(currentCheckedKeys || []);
        if (!isEqualWith(checkedKeys, this.state.checkedKeys)) {
          newState.checkedKeys = checkedKeys;
        }
        if (!isEqualWith(halfCheckedKeys, this.state.halfCheckedKeys)) {
          newState.halfCheckedKeys = halfCheckedKeys;
        }
      }

      if (
        this.props.checkStrictly &&
        'halfCheckedKeys' in this.props &&
        !isEqualWith(prevProps.halfCheckedKeys, this.props.halfCheckedKeys)
      ) {
        newState.halfCheckedKeys = this.props.halfCheckedKeys;
      }

      if (
        'expandedKeys' in this.props &&
        !isEqualWith(this.props.expandedKeys, prevProps.expandedKeys)
      ) {
        newState.expandedKeys = this.props.expandedKeys;

        // 比较前后expandKeys的改变，去重，得到需要收起/展开的动画
        // 例如 [...[1, 2, 3], ...[1, 3, 4]] 。那么 2 会收起，4会展开。
        // 如果父节点正在执行收起/展开逻辑，子节点不需要出现在 currentExpandKeys 数组。
        newState.currentExpandKeys = !mergedProps.animation
          ? []
          : [...newState.expandedKeys, ...this.state.expandedKeys]
              .reduce((total, next) => {
                const index = total.indexOf(next);
                if (index === -1) {
                  total.push(next);
                } else {
                  total.splice(index, 1);
                }
                return total;
              }, [])
              .filter((key, _, array) => {
                if (this.key2nodeProps[key]) {
                  const pathParentKeys = this.key2nodeProps[key].pathParentKeys;
                  if (pathParentKeys.some((x) => array.indexOf(x) > -1)) {
                    return false;
                  }
                  return this.key2nodeProps[key].children?.length;
                }
              });
      }
      const currentExpandKeys = newState.currentExpandKeys || this.state.currentExpandKeys;
      if (newState.treeData && currentExpandKeys) {
        newState.currentExpandKeys = currentExpandKeys.filter((key) => {
          const item = newState.treeData.find((node) => node.key === key);
          return item && item.children && item.children.length;
        });
      }
      if (Object.keys(newState).length) {
        this.setState(newState);
      }
    }
  }

  getTreeData = () => {
    return 'treeData' in this.props
      ? this.props.treeData
      : getTreeDataFromTreeChildren(this.props.children);
  };

  // 以下外部传入的属性改变时，需要更新nodeList
  needUpdateTreeData = (prevProps, props) => {
    const keys = [
      'fieldNames',
      'selectable',
      'draggable',
      'checkStrictly',
      'showLine',
      'blockNode',
      'checkable',
      'treeData',
      'children',
    ];

    return (
      prevProps.treeData !== props.treeData ||
      prevProps.children !== props.children ||
      keys.some((key) => isEqualWith(prevProps[key], props[key]))
    );
  };

  // 根据 fieldNames 获取节点数据
  getFieldInfo = (data) => {
    const mergedProps = this.getMergedProps();
    const { selectable } = mergedProps;
    // fieldsNames 仅在treeData时生效。
    const fieldNames = {
      ...DefaultFieldNames,
      ...('treeData' in this.props ? mergedProps.fieldNames : {}),
    };
    const result = {
      children: data[fieldNames.children],
      selectable: fieldNames.selectable in data ? data[fieldNames.selectable] : selectable,
      checkable: fieldNames.checkable in data ? data[fieldNames.checkable] : this.props.checkable,
      title: data[fieldNames.title],
      disabled: data[fieldNames.disabled],
      disableCheckbox: data[fieldNames.disableCheckbox],
      isLeaf: data[fieldNames.isLeaf],
      key: data[fieldNames.key],
    };
    if (!(fieldNames.key in data)) {
      delete result.key;
    }
    return result;
  };

  getNodeList = (treedata, prefix?) => {
    this.key2nodeProps = {};
    const prefixCls = prefix || this.context.getPrefixCls('tree');
    const nodeList = [];
    let currentIndex = 0;
    const { showLine, blockNode } = this.getMergedProps();

    const loop = (treeData, father) => {
      const totalLength = treeData.length;

      return treeData.map((data, index) => {
        const {
          children,
          selectable,
          checkable,
          key = `${father?._key || ''}-${index}`,
          ...rest
        } = this.getFieldInfo(data);
        const nodeProps: NodeProps & { children?: NodeProps[] } = {
          // data 中含有dataRef时，优先级较高
          dataRef: data,
          draggable: this.props.draggable,
          selectable,
          checkable,
          showLine,
          blockNode,
          ...data,
          ...rest,
          key,
          children,
          _key: key,
          _index: currentIndex++,
          parentKey: father ? father._key : undefined,
          pathParentKeys: (father && father.pathParentKeys) || [],
          _level: father._level || 0,
          // 保存node在sowLine模式下是否显示缩进线。如果父节点是其所在层级的最后一个节点，那么所有的子节点（包括孙子节点等）在父节点所在层级的缩进格都不显示缩进线。
          _lineless:
            father && father._lineless ? [...(father._lineless || []), father._isTail] : [],
        };

        if (totalLength === index + 1) {
          nodeProps.className = cs(`${prefixCls}-node-is-tail`, nodeProps.className);
        }

        nodeList.push(nodeProps);
        this.key2nodeProps[key] = nodeProps;

        if (children && children.length) {
          this.key2nodeProps[key].children = loop(children, {
            _key: key,
            _level: nodeProps._level + 1,
            _lineless: nodeProps._lineless,
            _isTail: totalLength === index + 1,
            pathParentKeys: [...(father?.pathParentKeys || []), key],
          });
        }
        return nodeProps;
      });
    };

    loop(treedata || [], {});
    return nodeList;
  };

  getInitExpandedKeys = (keys) => {
    if (!this.getMergedProps().autoExpandParent) {
      return keys || [];
    }
    if (!keys) {
      return Object.keys(this.key2nodeProps).filter((key) => {
        const props = this.key2nodeProps[key];
        return props.children && props.children.length;
      });
    }
    const expandedKeys = {};
    keys.forEach((key) => {
      const item = this.key2nodeProps[key];
      if (!item) {
        return;
      }
      expandedKeys[key] = 1;

      if (item.pathParentKeys) {
        item.pathParentKeys.forEach((x) => {
          expandedKeys[x] = 1;
        });
      }
    });

    return Object.keys(expandedKeys);
  };

  getInitCheckedKeys = (keys) => {
    if (!this.props.checkStrictly) {
      const { checkedKeys, indeterminateKeys } = getCheckedKeysByInitKeys(keys, this.key2nodeProps);
      return {
        checkedKeys,
        halfCheckedKeys: indeterminateKeys,
      };
    }

    return {
      checkedKeys: keys,
      halfCheckedKeys: this.props.halfCheckedKeys || [],
    };
  };

  handleSelect = (key: string, e) => {
    const { onSelect } = this.props;

    const extra: any = { e, node: this.getCacheNode([key])[0] };

    if (this.props.multiple) {
      const selectedKeys = [...(this.state.selectedKeys as string[])];
      const index = selectedKeys.indexOf(key);
      if (index > -1) {
        selectedKeys.splice(index, 1);
        extra.selected = false;
      } else {
        extra.selected = true;
        selectedKeys.push(key);
      }
      extra.selectedNodes = this.getCacheNode(selectedKeys);
      if (!('selectedKeys' in this.props)) {
        this.setState({ selectedKeys });
      }
      onSelect && onSelect(selectedKeys, extra);
    } else {
      extra.selected = true;
      extra.selectedNodes = this.getCacheNode([key]);
      if (!('selectedKeys' in this.props)) {
        this.setState({ selectedKeys: [key] });
      }
      onSelect && onSelect([key], extra);
    }
  };

  handleCheck = (checked: boolean, key: string, e) => {
    const { checkedStrategy } = this.getMergedProps();
    const { onCheck, checkStrictly } = this.props;
    const extra = { e, node: this.getCacheNode([key])[0] };

    let checkedKeys = this.state.checkedKeys;
    let halfCheckedKeys = this.state.halfCheckedKeys;
    if (checkStrictly) {
      if (checked) {
        checkedKeys = checkedKeys.concat(key);
      } else {
        checkedKeys = checkedKeys.filter((item) => item !== key);
      }

      const newState: Pick<TreeState, 'checkedKeys' | 'halfCheckedKeys'> = {};
      if (!('checkedKeys' in this.props)) {
        newState.checkedKeys = checkedKeys;
      }
      if (!('halfCheckedKeys' in this.props)) {
        newState.halfCheckedKeys = halfCheckedKeys;
      }
      if (!isEmptyObject(newState)) {
        this.setState({ ...newState });
      }
    } else {
      // 找到所有允许勾选的子节点
      const { checkedKeys: newCheckedKeys, indeterminateKeys } = getAllCheckedKeysByCheck(
        key,
        checked,
        checkedKeys,
        this.key2nodeProps,
        halfCheckedKeys
      );

      checkedKeys = newCheckedKeys;
      halfCheckedKeys = indeterminateKeys;

      if (!('checkedKeys' in this.props)) {
        this.setState({ checkedKeys, halfCheckedKeys });
      } else {
        this.setState({ halfCheckedKeys });
      }
      if (checkedStrategy === Tree.SHOW_PARENT) {
        checkedKeys = checkedKeys.filter((x) => {
          const item = this.key2nodeProps[x];
          if (!item || checkedKeys.indexOf(item.parentKey) === -1) {
            return true;
          }
        });
      } else if (checkedStrategy === Tree.SHOW_CHILD) {
        checkedKeys = checkedKeys.filter((x) => {
          const item = this.key2nodeProps[x];
          if (
            !item ||
            !item.children?.length ||
            item.children?.every((x) => checkedKeys.indexOf(x._key) === -1)
          ) {
            return true;
          }
        });
      }
    }

    onCheck &&
      onCheck(checkedKeys, {
        checkedNodes: this.getCacheNode(checkedKeys),
        checked,
        halfCheckedKeys,
        halfCheckedNodes: this.getCacheNode(halfCheckedKeys),
        ...extra,
      });
  };

  handleLoadMore = (node: NodeProps) => {
    const { loadMore } = this.props;
    if (isFunction(loadMore)) {
      const { loadingKeys = [], loadedKeys } = this.state;
      this.setState(
        {
          loadingKeys: Array.from(new Set([...loadingKeys, node._key])),
          loadedKeys: (loadedKeys as string[]).filter((x) => x !== node._key),
        },
        async () => {
          try {
            await (loadMore as Function)(this.getCacheNode([node._key])[0]);

            this.setState({
              loadedKeys: Array.from(new Set([...this.state.loadedKeys, node._key])),
              loadingKeys: this.state.loadingKeys.filter((x) => x !== node._key),
            });
            this.handleExpand(!node.expanded, node._key);
          } catch (e) {
            console.error('[tree]load data error: ', e);
            this.setState({
              loadingKeys: this.state.loadingKeys.filter((x) => x !== node._key),
            });
          }
        }
      );
    }
  };

  handleNodeDragStart = (e: DragEvent<HTMLSpanElement>, node: NodeProps) => {
    this.dragNode = this.getCacheNode([node._key])[0];
    this.dropPosition = 0;
    const { onDragStart } = this.props;
    onDragStart && onDragStart(e, this.getCacheNode([node._key])[0]);
  };

  handleNodeDragEnd = (e: DragEvent<HTMLSpanElement>, node: NodeProps) => {
    this.dragNode = null;
    this.dropPosition = 0;
    const { onDragEnd } = this.props;
    onDragEnd && onDragEnd(e, this.getCacheNode([node._key])[0]);
  };

  handleNodeDragOver = (e: DragEvent<HTMLSpanElement>, node: NodeProps, dropPosition) => {
    this.dropPosition = dropPosition;
    const { onDragOver } = this.props;
    onDragOver && onDragOver(e, this.getCacheNode([node._key])[0]);
  };

  handleNodeDragLeave = (e: DragEvent<HTMLSpanElement>, node: NodeProps) => {
    // this.dropNode = null;
    this.dropPosition = 0;
    const { onDragLeave } = this.props;
    onDragLeave && onDragLeave(e, this.getCacheNode([node._key])[0]);
  };

  isChildOfNode = (node: NodeProps, target) => {
    let current = this.key2nodeProps[node.parentKey];
    while (current) {
      const { _key, parentKey } = current;
      if (_key === target.props._key) {
        return true;
      }
      if (parentKey === _key) return;
      current = this.key2nodeProps[parentKey];
    }
  };

  isSameNode = (node1: NodeInstance, node2: NodeInstance) => {
    // 对比 node
    if (node1 === undefined || node2 === undefined) return false;
    if (node1 === node2) return true;
    // 对比 node.key
    const key1 = node1.key;
    const key2 = node2.key;
    if (key1 !== undefined || key2 !== undefined) return key1 === key2;
    // 对比 node.props._key
    const _key1 = node1.props._key;
    const _key2 = node2.props._key;
    if (_key1 === undefined && _key2 === undefined) return false;
    return _key1 === _key2;
  };

  handleNodeDrop = (e: DragEvent<HTMLSpanElement>, node: NodeProps, dropPosition: number) => {
    if (this.dragNode) {
      const { allowDrop } = this.getMergedProps();
      const { onDrop } = this.props;
      const nodeInstance = this.getCacheNode([node._key])[0];
      if (
        onDrop &&
        !this.isChildOfNode(node, this.dragNode) &&
        !this.isSameNode(this.dragNode, nodeInstance)
      ) {
        if (
          allowDrop &&
          !allowDrop({ dropNode: nodeInstance, dragNode: this.dragNode, dropPosition })
        ) {
          return;
        }
        onDrop({
          dragNode: this.dragNode,
          dropNode: nodeInstance,
          dropPosition,
          e,
        });
      }
    }
  };

  handleAllowDrop = (node: NodeProps, dropPosition: number) => {
    const { allowDrop } = this.getMergedProps();
    let isAllowDrop = true;
    if (typeof allowDrop === 'function') {
      isAllowDrop = allowDrop({
        dropNode: this.getCacheNode([node._key])[0],
        dragNode: this.dragNode,
        dropPosition,
      });
    }
    return isAllowDrop;
  };

  handleExpand = (expanded: boolean, key: string) => {
    const { currentExpandKeys, expandedKeys = [] } = this.state;
    const { animation } = this.getMergedProps();
    const { onExpand } = this.props;
    if (currentExpandKeys.indexOf(key) > -1) {
      // 如果当前key节点正在展开/收起，不执行操作。
      return;
    }
    let newExpandedKeys = [];
    if (expanded) {
      newExpandedKeys = Array.from(new Set([...expandedKeys, key]));
    } else {
      newExpandedKeys = expandedKeys.filter((k) => k !== key);
    }
    if (!('expandedKeys' in this.props)) {
      this.setState({
        expandedKeys: newExpandedKeys,
        currentExpandKeys: animation ? [...currentExpandKeys, key] : [],
      });
    }
    onExpand &&
      onExpand(newExpandedKeys, {
        expanded,
        node: this.getCacheNode([key])[0] as NodeInstance,
        expandedNodes: this.getCacheNode(newExpandedKeys) as NodeInstance[],
      });
  };

  getCacheNode = (key: string[]): NodeInstance[] => {
    // __ArcoAdapterMode__ ，在大数据下获取选中结点信息时，构建 Node 会导致性能消耗过大，
    // 通过 __ArcoAdapterMode__ 开启构建数据一个类似 node 的数据结构，提升性能，大版本升级时调整所有回调类型的 NodeInstance 的参数
    const { __ArcoAdapterMode__ } = this.props;
    const originData = [];
    [].concat(key).forEach((_key) => {
      const data = this.key2nodeProps[_key];
      if (data) {
        originData.push(data);
      }
    });
    const nodeProps = this.getNodeProps(originData);

    return nodeProps.map((_props) => {
      return __ArcoAdapterMode__ ? (
        {
          props: _props,
          key,
        }
      ) : (
        <Node {..._props} key={_props.key} />
      );
    }) as NodeInstance[];
  };

  // 转换为 set 类型，便于查找。主要是传递给node-list使用
  getDataSet = (dataSet?) => {
    return {
      expandedKeysSet: dataSet?.expandedKeysSet || new Set(this.state?.expandedKeys || []),
      checkedKeysSet: dataSet?.checkedKeysSet || new Set(this.state?.checkedKeys || []),
      selectedKeysSet: dataSet?.selectedKeysSet || new Set(this.state?.selectedKeys || []),
      halfCheckedKeysSet: dataSet?.halfCheckedKeysSet || new Set(this.state?.halfCheckedKeys || []),
    };
  };

  // dataSet:传入构建好的expandedKeysSet,, checkedKeysSet, halfCheckedKeysSet ，性能优化
  getNodeProps = <T extends NodeProps | NodeProps[]>(nodes: T, dataSet?): T => {
    const { autoExpandParent } = this.getMergedProps();
    const { loadMore } = this.props;

    const {
      selectedKeys,
      expandedKeys,
      checkedKeys,
      loadingKeys = [],
      loadedKeys = [],
    } = this.state;

    const { expandedKeysSet, checkedKeysSet, selectedKeysSet, halfCheckedKeysSet } =
      this.getDataSet(dataSet);

    const processNodeProps = (nodeProps) => {
      const hasChildren = nodeProps.children && nodeProps.children.length;
      const otherProps: NodeProps = {
        isLeaf: !hasChildren,
        autoExpandParent: hasChildren ? autoExpandParent : false,
        expanded: expandedKeysSet
          ? expandedKeysSet.has(nodeProps._key)
          : expandedKeys.indexOf(nodeProps._key) > -1,
      };

      if (loadMore) {
        const loaded = loadedKeys.indexOf(nodeProps._key) > -1;
        otherProps.loaded = loaded;
        otherProps.isLeaf = hasChildren ? false : nodeProps.isLeaf;
      }

      return {
        ...nodeProps,
        ...otherProps,
        selected: selectedKeysSet.has(nodeProps._key),
        indeterminated: halfCheckedKeysSet.has(nodeProps._key),
        loading: loadingKeys.indexOf(nodeProps._key) > -1,
        checked: checkedKeysSet.has(nodeProps._key),
        selectedKeys,
        checkedKeys,
        loadingKeys,
        loadedKeys,
        expandedKeys,
        childrenData: nodeProps.children || [],
        children: null,
      };
    };

    return isArray(nodes)
      ? nodes.map((node) => {
          return processNodeProps(node);
        })
      : processNodeProps(nodes);
  };

  handleExpandEnd = (key) => {
    // 获取最新 state 并更新，因为在 react 18 下批处理，可能多个节点并行执行动画时，导致更新 currentExpandKeys 相互覆盖
    this.setState((state) => {
      const { currentExpandKeys } = state;
      if (currentExpandKeys.indexOf(key) > -1) {
        return {
          currentExpandKeys: currentExpandKeys.filter((v) => v !== key),
        };
      }
      return {};
    });
  };

  // 获取tree的state数据，在子组件里使用。
  getTreeState = () => {
    return this.state;
  };

  render() {
    const {
      className,
      showLine,
      size,
      virtualListProps: _virtualListProps,
      height,
      style,
      icons,
      actionOnClick,
      animation,
    } = this.getMergedProps();
    const { loadMore, checkable } = this.props;
    // 兼容旧 APi : height
    const virtualListProps = _virtualListProps
      ? {
          threshold: 100,
          ..._virtualListProps,
        }
      : height
      ? { height, threshold: 100 }
      : {
          threshold: null,
        };
    const { getPrefixCls, rtl } = this.context;

    const prefixCls = getPrefixCls('tree');

    return (
      <TreeContext.Provider
        value={{
          icons,
          animation,
          key2nodeProps: this.key2nodeProps,
          getFieldInfo: this.getFieldInfo,
          getTreeState: this.getTreeState,
          getNodeProps: this.getNodeProps,
          onExpandEnd: animation ? this.handleExpandEnd : () => {},
          onSelect: this.handleSelect,
          onCheck: this.handleCheck,
          onNodeDragStart: this.handleNodeDragStart,
          onNodeDragEnd: this.handleNodeDragEnd,
          onNodeDragLeave: this.handleNodeDragLeave,
          onNodeDragOver: this.handleNodeDragOver,
          onNodeDrop: this.handleNodeDrop,
          onExpand: this.handleExpand,
          renderExtra: this.props.renderExtra,
          renderTitle: this.props.renderTitle,
          loadMore: loadMore && this.handleLoadMore,
          allowDrop: this.handleAllowDrop,
          actionOnClick,
          virtualListProps,
        }}
      >
        <NodeList
          ref={(node) => {
            this.nodeListRef = node;
          }}
          className={cs(
            prefixCls,
            {
              [`${prefixCls}-checkable`]: checkable,
              [`${prefixCls}-show-line`]: showLine,
              [`${prefixCls}-size-${size}`]: size,
              [`${prefixCls}-rtl`]: rtl,
            },
            className
          )}
          style={style}
          filterNode={this.props.filterNode}
          virtualListProps={virtualListProps}
          expandedKeys={this.state.expandedKeys}
          currentExpandKeys={this.state.currentExpandKeys}
          getNodeProps={this.getNodeProps}
          getDataSet={this.getDataSet}
          nodeList={this.state.nodeList}
          onMouseDown={this.props.onMouseDown}
          ariaProps={{
            role: 'tree',
            'aria-multiselectable': this.props.multiple,
            tabIndex: 0,
            ...pickDataAttributes(this.props),
          }}
        />
      </TreeContext.Provider>
    );
  }
}

export default Tree;

export { TreeProps, NodeProps as TreeNodeProps };

import React, {
  useState,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import VirtualList, { VirtualListHandle } from '../_class/VirtualList';
import useUpdate from '../_util/hooks/useUpdate';
import Node from './node';
import scrollIntoViewIfNeed from '../_util/scrollIntoView';

function getKey(option) {
  return option.key || option._key;
}

function NodeList(props, ref) {
  const {
    className,
    style,
    filterNode,
    virtualListProps,
    expandedKeys,
    currentExpandKeys,
    saveCacheNode,
    nodeList,
    getNodeProps,
  } = props;
  const isVirtual = virtualListProps?.threshold !== null;
  const virtualListRef = useRef<VirtualListHandle>();
  const treeWrapperRef = useRef<HTMLDivElement>();
  const expandedKeysSet = useMemo(() => new Set(expandedKeys), [expandedKeys]);
  const visibleKeys: Set<string> = useMemo(() => {
    const newKeys = new Set<string>();
    const currentExpandKeysSet = new Set(currentExpandKeys);
    nodeList.forEach((nodeProps) => {
      const pathParentKeys = nodeProps.pathParentKeys || [];
      // 如果父节点处于正在展开状态，子节点暂时不可见，因为父节点的children会在animaiton中渲染出来。
      // 当动画完成时，父节点children隐藏，此时在这里渲染子节点。 anyway，一切为了动画！！！
      if (
        pathParentKeys.every((key) => !currentExpandKeysSet.has(key) && expandedKeysSet.has(key))
      ) {
        newKeys.add(nodeProps._key);
      }
    });
    return newKeys;
  }, [expandedKeysSet, currentExpandKeys, nodeList]);

  const calcChildrenList = useCallback(() => {
    return nodeList.filter((item) => {
      const pass = !filterNode || (filterNode && filterNode(item));

      if (pass && visibleKeys.has(item.key)) {
        return true;
      }
      // 过滤掉的也缓存一下，避免被收起的节点在onSelect回调中，selectedNodes出现undefined
      saveCacheNode(<Node {...item} {...getNodeProps(item)} key={item.key} />);
      return false;
    });
  }, [nodeList, filterNode, visibleKeys]);

  // 默认值不能为nodeList，防止在设置defaultExpandedKeys时，应该被隐藏的节点初始化的时候展示了。
  const [childrenList, setChildrenList] = useState(() => {
    return calcChildrenList();
  });

  useUpdate(() => {
    setChildrenList(calcChildrenList());
  }, [calcChildrenList]);

  useImperativeHandle(ref, () => {
    return {
      // index: 第几个dom元素, 如果传入的是字符串，会作为 node 的 key去查找。
      // nodeProps: _index 是 key 时，对应的node
      scrollIntoView: (_index, nodeProps) => {
        let index = _index;
        const isKey = typeof _index === 'string';

        if (isKey) {
          let key = _index;
          // 查找离得最近的可见的父节点，进行滚动。
          if (!visibleKeys.has(_index) && nodeProps && nodeProps.pathParentKeys) {
            key =
              [...nodeProps.pathParentKeys].reverse().find((key) => visibleKeys.has(key)) || index;
          }
          // _index attributes and index are not the same due to some hidden items
          index = childrenList.findIndex(({ _key }) => _key === key);
        }

        if (!isVirtual && treeWrapperRef.current) {
          const wrapperDom = treeWrapperRef.current;
          const node = wrapperDom ? wrapperDom.children[index] : null;

          node &&
            scrollIntoViewIfNeed(node as HTMLElement, {
              boundary: wrapperDom.parentElement,
            });
        } else if (virtualListRef.current) {
          virtualListRef.current.scrollTo({ index });
        }
      },
    };
  });

  return isVirtual ? (
    <VirtualList
      className={className}
      style={style}
      ref={virtualListRef}
      data={childrenList}
      isStaticItemHeight={false}
      itemKey={getKey}
      onMouseDown={props.onMouseDown}
      {...props.ariaProps}
      {...virtualListProps}
    >
      {(item) => {
        const node = <Node {...item} {...getNodeProps(item, expandedKeysSet)} key={item.key} />;
        saveCacheNode(node);
        return node;
      }}
    </VirtualList>
  ) : (
    <div
      role="tree"
      tabIndex={0}
      className={className}
      style={style}
      ref={treeWrapperRef}
      {...props.ariaProps}
      onMouseDown={props.onMouseDown}
    >
      {childrenList.map((item) => {
        const node = <Node {...item} {...getNodeProps(item, expandedKeysSet)} key={item.key} />;
        saveCacheNode(node);
        return node;
      })}
    </div>
  );
}

export default forwardRef(NodeList);

/**
 * 该组件用来切换tree 展开收起时的动画
 */

import React, { PropsWithChildren, useMemo, useContext, useEffect } from 'react';

import { CSSTransition } from 'react-transition-group';
import { TreeContext } from './context';
import { NodeProps } from './interface';
import VirtualList from '../_class/VirtualList';
import { ConfigContext } from '../ConfigProvider';
import Node from './node';
import { isNumber } from '../_util/is';

function getKey(option) {
  return option.key || option._key;
}

const TreeAnimation = (props: PropsWithChildren<NodeProps>) => {
  const treeContext = useContext(TreeContext);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tree-node');
  const { expandedKeys, currentExpandKeys } = treeContext.getTreeState();
  const expanded = props.expanded;

  useEffect(() => {
    return () => {
      treeContext.onExpandEnd && treeContext.onExpandEnd(props._key);
    };
  }, []);

  const childrenPropsList = useMemo(() => {
    const result = [];
    const loop = (list) => {
      list.forEach((item) => {
        const data = treeContext.getFieldInfo(item);
        result.push(data);
        if (data.children && data.children.length) {
          loop(data.children);
        }
      });
    };

    loop(props.childrenData || []);
    return result;
  }, [props.childrenData]);

  const filtedData = useMemo(() => {
    const result = [];
    if (childrenPropsList.length) {
      const expandedKeysSet = new Set(expandedKeys || []);
      childrenPropsList.forEach((data) => {
        let isShow;
        const itemProps = {
          ...treeContext.key2nodeProps[data.key],
        };
        if (expanded) {
          // 只有在每一个父节点都是展开状态时，自己才会展示出来
          isShow =
            itemProps.parentKey === props._key ||
            itemProps.pathParentKeys?.every((key) => {
              return expandedKeysSet.has(key);
            });
        } else if (itemProps.pathParentKeys) {
          // 收起时，只有在props._key 对应的位置之后的所有的自己的父节点都是展开状态，才会展示自己
          const index = itemProps.pathParentKeys.indexOf(props._key);

          isShow = itemProps.pathParentKeys.slice(index + 1).every((key) => {
            return expandedKeysSet.has(key);
          });
        }
        if (isShow) {
          result.push({
            ...itemProps,
            ...treeContext.getNodeProps(itemProps, expandedKeysSet),
            key: data.key,
          });
        }
      });
    }
    return result;
  }, [childrenPropsList, props._key, expanded]);

  let realHeight = treeContext.virtualListProps?.height;
  realHeight = isNumber(realHeight) ? realHeight : 0;

  useEffect(() => {
    // node set loadingMore but has no child nodes.
    // Animation will not be triggered and needs to be removed manually
    if (currentExpandKeys.indexOf(props._key) > -1 && filtedData.length === 0) {
      treeContext.onExpandEnd(props._key);
    }
  }, [filtedData, currentExpandKeys]);

  return (
    <CSSTransition
      in={currentExpandKeys.indexOf(props._key) > -1 && filtedData.length > 0}
      unmountOnExit
      classNames="tree-slide-expand"
      timeout={{
        enter: 200,
        exit: 0,
      }}
      onEnter={(e) => {
        const scrollHeight = e.scrollHeight;
        e.style.height = expanded ? 0 : `${Math.min(realHeight || scrollHeight, e.scrollHeight)}px`;
      }}
      onEntering={(e) => {
        const scrollHeight = e.scrollHeight;
        e.style.height = expanded ? `${Math.min(realHeight || scrollHeight, scrollHeight)}px` : 0;
      }}
      onEntered={(e) => {
        e.style.height = props.expanded ? '' : 0;
        treeContext.onExpandEnd(props._key);
      }}
      onExit={(e) => {
        e.style.display = 'none';
      }}
    >
      <VirtualList
        itemKey={getKey}
        className={`${prefixCls}-list`}
        isStaticItemHeight={false}
        {...treeContext.virtualListProps}
        data={filtedData}
        aria-hidden
        style={{ overflow: 'hidden' }}
      >
        {(child) => {
          return <Node {...child} />;
        }}
      </VirtualList>
    </CSSTransition>
  );
};

export default TreeAnimation;

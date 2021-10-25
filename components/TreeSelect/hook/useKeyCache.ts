import { useRef, useContext } from 'react';
import { NodeProps } from '../../Tree/interface';
import { ConfigContext } from '../../ConfigProvider';
import cs from '../../_util/classNames';
import { TreeSelectDataType, DefaultFieldNames } from '../interface';
import useUpdate from '../../_util/hooks/useUpdate';
import useForceUpdate from '../../_util/hooks/useForceUpdate';

export type KeyCacheType = { [key: string]: TreeSelectDataType };

const getKey2NodeProps = (treedata, prefixCls, fieldNames): KeyCacheType => {
  const nodeList = [];
  const key2nodeProps = {};
  let currentIndex = 0;
  const loop = (treeData, father) => {
    const totalLength = treeData.length;

    return treeData.map((data, index) => {
      const children = data[fieldNames.children];
      const key = fieldNames.key in data ? data[fieldNames.key] : `${father?._key || ''}-${index}`;

      const nodeProps: NodeProps & { children?: NodeProps[] } = {
        ...data,
        title: data[fieldNames.title],
        selectable: data[fieldNames.selectable],
        disabled: data[fieldNames.disabled],
        disableCheckbox: data[fieldNames.disableCheckbox],
        checkable: data[fieldNames.checkable],
        isLeaf: data[fieldNames.isLeaf],
        key,
        children,
        _key: key,
        parentKey: father ? father._key : undefined,
        pathParentKeys: (father && father.pathParentKeys) || [],
        _level: father._level || 0,
        _index: currentIndex++,
      };

      if (totalLength === index + 1) {
        nodeProps.className = cs(`${prefixCls}-node-is-tail`, nodeProps.className);
      }

      nodeList.push(nodeProps);
      key2nodeProps[key] = nodeProps;

      if (children && children.length) {
        key2nodeProps[key].children = loop(children, {
          _key: key,
          _level: nodeProps._level + 1,
          pathParentKeys: [...(father?.pathParentKeys || []), key],
        });
      }
      return nodeProps;
    });
  };

  loop(treedata || [], {});
  return key2nodeProps;
};

const useKeyCache = (treeData, fieldNames): KeyCacheType => {
  const { getPrefixCls } = useContext(ConfigContext);
  const _fieldNames = {
    ...DefaultFieldNames,
    ...fieldNames,
  };
  const dispatch = useForceUpdate();
  const prefixCls = getPrefixCls('tree');
  const cache = useRef<KeyCacheType>(getKey2NodeProps(treeData, prefixCls, _fieldNames));

  useUpdate(() => {
    cache.current = getKey2NodeProps(treeData, prefixCls, _fieldNames);
    dispatch();
  }, [treeData]);

  return cache.current;
};

export default useKeyCache;

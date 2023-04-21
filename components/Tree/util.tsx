import React, { ReactNode, ReactChild } from 'react';
import { TreeDataType } from './interface';
import { key2nodePropsType } from '.';

export const getTreeDataFromTreeChildren = (treeChildren: ReactNode) => {
  const loop = (children) => {
    return React.Children.map(children, (child: ReactChild) => {
      if (!React.isValidElement(child)) {
        return;
      }
      const key = child.key;

      return {
        ...child.props,
        key,
        children: loop(child.props.children),
      };
    });
  };
  return loop(treeChildren);
};

export function getChildNodeKeys(
  node: TreeDataType,
  key2nodeProps: key2nodePropsType
): Set<string> {
  const nodes: Set<string> = new Set();
  const loop = (children: TreeDataType[]) => {
    children.map((child) => {
      const key = child.key;
      const item = key2nodeProps[key];
      if (!item || item.disabled || item.disableCheckbox || item.checkable === false) {
        return;
      }
      nodes.add(key);
      loop(item.children || []);
    });
  };
  if (node) {
    loop(node.children || []);
  }
  return nodes;
}

const updateParent = (key, key2nodeProps, allKeys, indeterminateKeysSet) => {
  const pathParentKeys = [...key2nodeProps[key].pathParentKeys];

  // 逐级更新父节点的状态
  pathParentKeys.reverse().some((itemKey) => {
    const parent = key2nodeProps[itemKey];
    if (parent && !parent.disabled && !parent.disableCheckbox && parent.checkable !== false) {
      let total = 0;
      let number = 0;
      parent.children.some(({ key }) => {
        const item = key2nodeProps[key];
        // 不符合可选条件
        if (!item || item.disabled || item.disableCheckbox || item.checkable === false) {
          return false;
        }
        total++;
        if (allKeys.has(key)) {
          number++;
        } else if (indeterminateKeysSet.has(key)) {
          // 只要有一个半选，就不用再算了 ，父节点是半选
          number += 0.5;
          return true;
        }
      });

      if (!number || number === total) {
        indeterminateKeysSet.delete(itemKey);
      } else {
        indeterminateKeysSet.add(itemKey);
      }

      if (number && number === total) {
        allKeys.add(itemKey);
      } else {
        allKeys.delete(itemKey);
      }
    } else {
      // 断开链接
      return true;
    }
  });
};

// also used by tree-select
export function getCheckedKeysByInitKeys(
  checkedKeys: string[],
  key2nodeProps
): {
  checkedKeys: string[];
  indeterminateKeys: string[];
} {
  const checkedKeysSet = new Set<string>(checkedKeys || []);
  const indeterminateKeysSet = new Set<string>();
  const childCheckedKeysSet = new Set<string>();

  checkedKeys.forEach((key) => {
    if (!childCheckedKeysSet.has(key)) {
      const childKeys = getChildNodeKeys(key2nodeProps[key], key2nodeProps);
      // 选中了节点，就找到所有符合条件的子节点的key.自身的选中状态需要根据children判断。
      childKeys.forEach((v) => {
        childCheckedKeysSet.add(v);
      });
    }

    if (
      key2nodeProps[key] &&
      !key2nodeProps[key].pathParentKeys.some((_key) => checkedKeysSet.has(_key))
    ) {
      updateParent(key, key2nodeProps, checkedKeysSet, indeterminateKeysSet);
    }
  });

  return {
    checkedKeys: [...new Set([...checkedKeysSet, ...childCheckedKeysSet])],
    indeterminateKeys: [...indeterminateKeysSet],
  };
}

// also used by tree-select
export function getAllCheckedKeysByCheck(
  key: string,
  checked: boolean,
  checkedKeys: string[],
  key2nodeProps: key2nodePropsType,
  indeterminateKeys: string[]
): {
  checkedKeys: string[];
  indeterminateKeys: string[];
} {
  if (!key2nodeProps[key]) {
    return {
      checkedKeys,
      indeterminateKeys,
    };
  }
  const checkedKeysSet = new Set(checkedKeys);
  const indeterminateKeysSet = new Set(indeterminateKeys);
  const childKeys = getChildNodeKeys(key2nodeProps[key], key2nodeProps);
  const allKeys = checkedKeysSet;

  if (checked) {
    // 选中了节点，就找到所有符合条件的子节点的key.自身的选中状态需要根据children判断。
    allKeys.add(key);
    indeterminateKeysSet.delete(key);
    childKeys.forEach((v) => {
      allKeys.add(v);
    });
  } else {
    indeterminateKeysSet.delete(key);
    // 移除所有符合条件的子节点的key
    allKeys.delete(key);
    childKeys.forEach((v) => {
      allKeys.delete(v);
    });
  }

  // 之后逐级更新父节点的选中状态。
  updateParent(key, key2nodeProps, checkedKeysSet, indeterminateKeysSet);

  return {
    checkedKeys: [...allKeys],
    indeterminateKeys: [...indeterminateKeysSet],
  };
}

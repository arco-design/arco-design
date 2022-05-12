import { isArray } from '../_util/is';

export function getScrollBarHeight(ele: HTMLElement | null) {
  return ele ? ele.offsetHeight - ele.clientHeight : 0;
}

export function getScrollBarWidth(ele: HTMLElement | null) {
  return ele ? ele.offsetWidth - ele.clientWidth : 0;
}

export function isChildrenNotEmpty(record, field: string) {
  return isArray(record[field]) && record[field].length;
}

export function getSelectedKeys(
  record,
  checked,
  checkedRowKeys = [],
  _indeterminateKeys = [],
  getRowKey,
  childrenColumnName,
  checkConnected
) {
  const selectedRowKeys = new Set(checkedRowKeys);
  const indeterminateKeys = new Set(_indeterminateKeys);

  function loop(record) {
    if (checked) {
      selectedRowKeys.add(getRowKey(record));
      indeterminateKeys.delete(getRowKey(record));
    } else {
      selectedRowKeys.delete(getRowKey(record));
    }
    if (isArray(record[childrenColumnName])) {
      record[childrenColumnName].forEach((child) => {
        loop(child);
      });
    }
  }

  if (!checkConnected) {
    if (checked) {
      selectedRowKeys.add(getRowKey(record));
    } else {
      selectedRowKeys.delete(getRowKey(record));
    }
  } else {
    loop(record);

    updateParent(record, selectedRowKeys, indeterminateKeys, getRowKey, childrenColumnName);
  }

  return {
    selectedRowKeys: [...selectedRowKeys],
    indeterminateKeys: [...indeterminateKeys],
  };
}

export function getSelectedKeysByData(
  flattenData,
  checkedKeys = [],
  getRowKey,
  childrenColumnName: string,
  checkConnected: boolean
) {
  if (!checkConnected) {
    return {
      selectedRowKeys: checkedKeys,
      indeterminateKeys: [],
    };
  }
  const selectedRowKeys = new Set(checkedKeys);
  const indeterminateKeys = new Set([]);

  function loop(record) {
    selectedRowKeys.add(getRowKey(record));
    indeterminateKeys.delete(getRowKey(record));

    if (isArray(record[childrenColumnName])) {
      record[childrenColumnName].forEach((child) => {
        loop(child);
      });
    }
  }

  checkedKeys.forEach((key) => {
    const record = flattenData.find((d) => getRowKey(d) === key);

    loop(record);

    updateParent(record, selectedRowKeys, indeterminateKeys, getRowKey, childrenColumnName);
  });

  return {
    selectedRowKeys: [...selectedRowKeys],
    indeterminateKeys: [...indeterminateKeys],
  };
}

function updateParent(
  record,
  selectedKeys: Set<React.Key>,
  indeterminateKeys: Set<React.Key>,
  getRowKey,
  childrenColumnName: string
) {
  if (record.parent) {
    const parentKey = getRowKey(record.parent);
    if (isArray(record.parent[childrenColumnName])) {
      const total = record.parent[childrenColumnName].length;
      let len = 0;
      let flag = false;
      record.parent[childrenColumnName].forEach((c) => {
        if (selectedKeys.has(getRowKey(c))) {
          len += 1;
        }
        if (indeterminateKeys.has(getRowKey(c))) {
          indeterminateKeys.add(parentKey);
          flag = true;
        }
      });
      if (total === len) {
        selectedKeys.add(parentKey);
        indeterminateKeys.delete(parentKey);
      } else if (len > 0 && total > len) {
        selectedKeys.delete(parentKey);
        indeterminateKeys.add(parentKey);
      } else if (len === 0) {
        selectedKeys.delete(parentKey);
        if (!flag) {
          indeterminateKeys.delete(parentKey);
        }
      }
    }

    updateParent(record.parent, selectedKeys, indeterminateKeys, getRowKey, childrenColumnName);
  }
}

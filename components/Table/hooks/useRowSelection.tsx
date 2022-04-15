import { useState, Key } from 'react';
import { isChildrenNotEmpty } from '../utils';
import { isArray } from '../../_util/is';
import { TableProps, GetRowKeyType } from '../interface';

function getSet(arr: Key[]) {
  return [...new Set(arr)];
}

export default function useRowSelection<T>(
  props: TableProps<T>,
  data,
  getRowKey: GetRowKeyType<T>
): {
  selectedRowKeys: Key[];
  onCheckAll: (checked) => void;
  onCheck: (checked, record) => void;
  onCheckRadio: (key, record) => void;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
  allSelectedRowKeys: Key[];
  flattenData: T[];
} {
  const { rowSelection, data: originData } = props;
  const controlledSelectedRowKeys = rowSelection && rowSelection.selectedRowKeys;
  const onSelectAll = rowSelection && rowSelection.onSelectAll;
  const onSelect = rowSelection && rowSelection.onSelect;
  const onChange = rowSelection && rowSelection.onChange;
  const pureKeys = rowSelection && rowSelection.pureKeys; // TODO: remove
  const preserveSelectedRowKeys = rowSelection && rowSelection.preserveSelectedRowKeys;

  // 获取扁平化之后的 data
  function getMetaFromData() {
    const allSelectedRowKeys: any[] = [];
    const flattenData: any[] = [];
    const travel = (children) => {
      if (isArray(children) && children.length) {
        children.forEach((record) => {
          const rowKey = getRowKey(record);
          const checkboxProps =
            rowSelection && typeof rowSelection.checkboxProps === 'function'
              ? rowSelection.checkboxProps(record)
              : {};
          if (!checkboxProps.disabled) {
            allSelectedRowKeys.push(rowKey);
          }
          if (isChildrenNotEmpty(record, props.childrenColumnName)) {
            travel(record[props.childrenColumnName]);
          }
        });
      }
    };
    travel(data);
    const travelOrigin = (children) => {
      if (isArray(children) && children.length) {
        children.forEach((record) => {
          flattenData.push(record);
          if (isChildrenNotEmpty(record, props.childrenColumnName)) {
            travelOrigin(record[props.childrenColumnName]);
          }
        });
      }
    };
    travelOrigin(originData);

    return {
      allSelectedRowKeys,
      flattenData,
    };
  }

  const { allSelectedRowKeys, flattenData } = getMetaFromData();

  let defaultSelectedRowKeys: Key[] = [];

  if (rowSelection && rowSelection.selectedRowKeys) {
    defaultSelectedRowKeys = rowSelection.selectedRowKeys;
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>(getSet(defaultSelectedRowKeys));
  const [selectedRows, setSelectedRows] = useState<T[]>(
    pureKeys ? [] : getRowsFromKeys(selectedRowKeys)
  );

  function getRowsFromKeys(keys: Key[], plus?: boolean): T[] {
    const all: T[] = plus ? flattenData.concat(selectedRows) : flattenData;
    const keyMap: Map<Key, T> = new Map(all.map((v) => [getRowKey(v), v]));
    return keys.map((r) => keyMap.get(r)).filter((a) => a);
  }

  const mergedSelectedRowKeys = getSet(controlledSelectedRowKeys || selectedRowKeys);

  const flattenKeys = new Set<Key>(flattenData.map((d) => getRowKey(d)));

  function deleteUnExistKeys(keys: Key[]) {
    return preserveSelectedRowKeys ? keys : keys.filter((k) => flattenKeys.has(k));
  }

  function onCheckAll(checked) {
    let newSelectedRowKeys: Key[] = [];
    let newSelectedRows: T[] = [];

    if (checked) {
      newSelectedRowKeys = deleteUnExistKeys(
        getSet(mergedSelectedRowKeys.concat(allSelectedRowKeys))
      );
    } else {
      const tempSet = new Set(allSelectedRowKeys);
      newSelectedRowKeys = deleteUnExistKeys(
        mergedSelectedRowKeys.filter((key) => !tempSet.has(key))
      );
    }
    if (!pureKeys) {
      newSelectedRows = getRowsFromKeys(newSelectedRowKeys, true);
    }
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
    onChange && onChange(newSelectedRowKeys, newSelectedRows);
    onSelectAll && onSelectAll(checked, newSelectedRows);
  }

  function onCheck(checked, record) {
    const rowK = getRowKey(record);
    let newSelectedRowKeys: Key[] = [];
    let newSelectedRows: T[] = [];

    if (checked) {
      newSelectedRowKeys = deleteUnExistKeys(mergedSelectedRowKeys.concat(rowK));
      if (!pureKeys) {
        newSelectedRows = getRowsFromKeys(newSelectedRowKeys, true);
      }
    } else {
      newSelectedRowKeys = deleteUnExistKeys(mergedSelectedRowKeys.filter((key) => key !== rowK));
      if (!pureKeys) {
        newSelectedRows = getRowsFromKeys(newSelectedRowKeys, true);
      }
    }
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
    onSelect && onSelect(checked, record, newSelectedRows);
    onChange && onChange(newSelectedRowKeys, newSelectedRows);
  }

  function onCheckRadio(key, record) {
    const newSelectedRows = [flattenData.find((d) => getRowKey(d) === key)];
    setSelectedRowKeys([key]);
    onSelect && onSelect(true, record, newSelectedRows);
    onChange && onChange([key], newSelectedRows);
  }

  return {
    selectedRowKeys: mergedSelectedRowKeys,
    onCheckAll,
    onCheck,
    onCheckRadio,
    setSelectedRowKeys,
    allSelectedRowKeys,
    flattenData,
  };
}

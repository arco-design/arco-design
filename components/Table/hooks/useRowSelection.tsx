import { useState, Key } from 'react';
import {
  isChildrenNotEmpty,
  getSelectedKeys,
  getSelectedKeysByData,
  getOriginData,
} from '../utils';
import { isArray } from '../../_util/is';
import { TableProps, GetRowKeyType } from '../interface';

function getSet(arr: Key[]) {
  return [...new Set(arr)];
}

export default function useRowSelection<T>(
  props: TableProps<T>,
  pageData,
  data,
  getRowKey: GetRowKeyType<T>
): {
  selectedRowKeys: Key[];
  indeterminateKeys: Key[];
  onCheckAll: (checked) => void;
  onCheck: (checked, record) => void;
  onCheckRadio: (key, record) => void;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
  allSelectedRowKeys: Key[];
  flattenData: T[];
} {
  const { rowSelection, childrenColumnName } = props;
  const controlledSelectedRowKeys = rowSelection?.selectedRowKeys;
  const onSelectAll = rowSelection?.onSelectAll;
  const onSelect = rowSelection?.onSelect;
  const onChange = rowSelection?.onChange;
  const pureKeys = rowSelection?.pureKeys; // TODO: remove
  const checkConnected =
    typeof rowSelection?.checkStrictly === 'boolean' ? !rowSelection.checkStrictly : false;
  const preserveSelectedRowKeys = rowSelection?.preserveSelectedRowKeys;

  // 获取扁平化之后的 data
  function getMetaFromData() {
    const allSelectedRowKeys = [];
    const flattenData = [];
    const travel = (children) => {
      if (isArray(children) && children.length) {
        children.forEach((record) => {
          const rowKey = getRowKey(record);
          const checkboxProps =
            rowSelection && typeof rowSelection.checkboxProps === 'function'
              ? rowSelection.checkboxProps(getOriginData(record))
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
    travel(pageData);
    const travelOrigin = (children, parent) => {
      if (isArray(children) && children.length) {
        children.forEach((record) => {
          if (parent && checkConnected) {
            record.__INTERNAL_PARENT = parent;
          }
          flattenData.push(record);
          if (isChildrenNotEmpty(record, props.childrenColumnName)) {
            const _parent = { ...record };
            travelOrigin(record[props.childrenColumnName], _parent);
          }
        });
      }
    };
    travelOrigin(data, undefined);

    return {
      allSelectedRowKeys,
      flattenData,
    };
  }

  const { allSelectedRowKeys, flattenData } = getMetaFromData();

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [indeterminateKeys, setIndeterminateKeys] = useState<Key[]>([]);

  const keys = getSelectedKeysByData(
    flattenData,
    getSet(controlledSelectedRowKeys || selectedRowKeys),
    getRowKey,
    childrenColumnName,
    checkConnected
  );

  const mergedSelectedRowKeys =
    checkConnected && !controlledSelectedRowKeys ? selectedRowKeys : keys.selectedRowKeys;
  const mergedIndeterminateKeys =
    checkConnected && !controlledSelectedRowKeys ? indeterminateKeys : keys.indeterminateKeys;

  const [selectedRows, setSelectedRows] = useState<T[]>(
    pureKeys ? [] : getRowsFromKeys(mergedSelectedRowKeys)
  );

  function getRowsFromKeys(keys: Key[], plus?: boolean): T[] {
    // selectedRows is placed before flattenData: https://github.com/arco-design/arco-design/issues/1294
    const all: T[] = plus ? selectedRows.concat(flattenData) : flattenData;
    const keyMap: Map<Key, T> = new Map(all.map((v) => [getRowKey(v), v]));
    return keys.map((r) => keyMap.get(r)).filter((a) => a);
  }

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

    const originSelectedRows = getOriginData(newSelectedRows);

    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
    setIndeterminateKeys([]);
    onChange && onChange(newSelectedRowKeys, originSelectedRows);
    onSelectAll && onSelectAll(checked, originSelectedRows);
  }

  function onCheck(checked, record) {
    const { selectedRowKeys, indeterminateKeys: _indeterminateKeys } = getSelectedKeys(
      record,
      checked,
      mergedSelectedRowKeys,
      indeterminateKeys,
      getRowKey,
      childrenColumnName,
      checkConnected
    );

    const newSelectedRowKeys = deleteUnExistKeys(selectedRowKeys);
    const newSelectedRows = getRowsFromKeys(newSelectedRowKeys, true);

    const originSelectedRows = getOriginData(newSelectedRows);

    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
    setIndeterminateKeys(_indeterminateKeys);
    onSelect && onSelect(checked, getOriginData(record), originSelectedRows);
    onChange && onChange(newSelectedRowKeys, originSelectedRows);
  }

  function onCheckRadio(key, record) {
    const newSelectedRows = [flattenData.find((d) => getRowKey(d) === key)];
    const originSelectedRows = getOriginData(newSelectedRows);

    setSelectedRowKeys([key]);
    onSelect && onSelect(true, getOriginData(record), originSelectedRows);
    onChange && onChange([key], originSelectedRows);
  }

  return {
    selectedRowKeys: mergedSelectedRowKeys,
    indeterminateKeys: mergedIndeterminateKeys,
    onCheckAll,
    onCheck,
    onCheckRadio,
    setSelectedRowKeys,
    allSelectedRowKeys,
    flattenData,
  };
}

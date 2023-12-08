import { useMemo, useState } from 'react';
import { isArray } from '../../_util/is';
import { getColumnByUniqueKey } from '../utils';
import { ColumnProps, FilterType, InternalColumnProps } from '../interface';

export default function useFilter<T extends unknown>(
  flattenColumns: InternalColumnProps[],
  handleOnChange,
  currentFilters: FilterType<T>
) {
  const [filters, setFilters] = useState<FilterType<T>>(currentFilters);

  const controlledFilter = useMemo(() => {
    // 允许 filteredValue 设置为 undefined 表示不筛选
    const flattenFilteredValueColumns = flattenColumns.filter(
      (column) => 'filteredValue' in column
    );
    const newFilters = {};
    // 受控的筛选，当columns中的筛选发生改变时，更新state
    if (flattenFilteredValueColumns.length) {
      flattenFilteredValueColumns.forEach((column, index) => {
        const innerDataIndex = column.key || column.dataIndex || index;
        if (innerDataIndex !== undefined) {
          newFilters[innerDataIndex] = column.filteredValue;
        }
      });
    }
    return newFilters;
  }, [flattenColumns]);

  const innerFilters = useMemo<FilterType<T>>(() => {
    return Object.keys(controlledFilter).length ? controlledFilter : filters;
  }, [filters, controlledFilter]);

  function getFilteredData<T extends unknown>(data) {
    Object.keys(innerFilters).forEach((field) => {
      if (innerFilters[field] && innerFilters[field].length) {
        const column = getColumnByUniqueKey(flattenColumns, field) as ColumnProps<T>;
        if (column && typeof column.onFilter === 'function') {
          data = data.filter((row) => {
            return innerFilters[field].reduce(
              (pre, cur) => pre || (column.onFilter as Function)(cur, row),
              false
            );
          });
        }
      }
    });

    return data;
  }

  function onHandleFilter(column, filter: string[]) {
    const newFilters = {
      ...innerFilters,
      [column.dataIndex]: filter,
    };
    const mergedFilters = {
      ...newFilters,
      ...controlledFilter,
    };
    if (isArray(filter) && filter.length) {
      setFilters(mergedFilters);
      handleOnChange('filter', {
        filters: newFilters,
      });
    } else if (isArray(filter) && !filter.length) {
      onHandleFilterReset(column);
    }
  }

  function onHandleFilterReset({ dataIndex }) {
    const newFilters = {
      ...innerFilters,
    };
    delete newFilters[dataIndex];
    setFilters(newFilters);
    handleOnChange('filter', {
      filters: newFilters,
    });
  }

  return { innerFilters, onHandleFilter, onHandleFilterReset, getFilteredData };
}

import { useState, useRef, useCallback } from 'react';
import { SorterInfo, SorterFn, SortDirection, InternalColumnProps } from '../interface';
import { getSorterPriority, getSorterFn, getColumnByUniqueKey } from '../utils';
import useUpdate from '../../_util/hooks/useUpdate';
import { isNumber, isArray } from '../../_util/is';

function getDefaultSorters(flattenColumns: InternalColumnProps[]) {
  let defaultSorters: SorterInfo[] = [];
  flattenColumns.forEach((column) => {
    const innerDataIndex = column.key;

    if ('defaultSortOrder' in column || 'sortOrder' in column) {
      const priority = getSorterPriority(column.sorter);
      const direction = 'sortOrder' in column ? column.sortOrder : column.defaultSortOrder;
      const sorter: SorterInfo = {
        field: innerDataIndex,
        direction,
        sorterFn: getSorterFn(column.sorter),
        priority,
      };
      if (!direction) {
        defaultSorters.push(sorter);
      } else if (isNumber(priority)) {
        if (defaultSorters.every((item) => isNumber(item.priority) || !item.direction)) {
          defaultSorters.push(sorter);
        }
      } else if (defaultSorters.every((item) => !item.direction)) {
        defaultSorters.push(sorter);
      } else {
        defaultSorters = [sorter];
      }
    }
  });

  return defaultSorters;
}

function compareFn(activeSorters: SorterInfo[]) {
  const compare = function (fn: SorterFn, direction: SortDirection) {
    return (a, b) => {
      const result = fn(a, b);
      return direction === 'descend' ? -result : result;
    };
  };
  const sorters = [...activeSorters];
  sorters.sort((a, b) => b.priority - a.priority);
  return (a, b) => {
    for (let i = 0, l = sorters.length; i < l; i++) {
      const { sorterFn, direction } = sorters[i];
      if (typeof sorterFn !== 'function') {
        continue;
      }
      const result = compare(sorterFn, direction)(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
}

const getSortedDataImpl = (data, activeSorters: SorterInfo[], childrenColumnName: string) => {
  return data
    .slice()
    .sort(compareFn(activeSorters))
    .map((item) => {
      if (isArray(item[childrenColumnName])) {
        return {
          ...item,
          [childrenColumnName]: getSortedDataImpl(
            item[childrenColumnName],
            activeSorters,
            childrenColumnName
          ),
        };
      }
      return item;
    });
};

export default function useSorter(
  flattenColumns: InternalColumnProps[],
  childrenColumnName: string,
  handleOnChange
) {
  const defaultSorters = getDefaultSorters(flattenColumns);
  const [activeSorters, setActiveSorters] = useState<SorterInfo[]>(defaultSorters);
  const [currentSorter, setCurrentSorter] = useState<SorterInfo>({});
  const prevFlattenColumnsRef = useRef(flattenColumns);

  const getNextActiveSorters = useCallback(
    (sorter: SorterInfo) => {
      const { field, direction } = sorter;
      if (activeSorters.find((item) => item.field === field)) {
        if (!direction) {
          return activeSorters.filter((item) => item.field !== field);
        }
        return activeSorters.map((item) => (item.field === field ? sorter : item));
      }
      // This is theoretically impossible
      if (!direction) {
        return [...activeSorters];
      }
      if (!isNumber(sorter.priority) || activeSorters.find((item) => !isNumber(item.priority))) {
        return [sorter];
      }
      return [...activeSorters, sorter];
    },
    [activeSorters]
  );

  const getSortedData = (data) => {
    if (
      (currentSorter.direction && typeof currentSorter.sorterFn === 'function') ||
      activeSorters.length
    ) {
      return getSortedDataImpl(data, activeSorters, childrenColumnName);
    }
    return data;
  };

  const getControlledSorters = useCallback((columns) => {
    const controlledColumns = columns.filter((column) => 'sortOrder' in column);
    let sorters: SorterInfo[] = [];
    controlledColumns.forEach((column) => {
      const priority = getSorterPriority(column.sorter);
      const direction = column.sortOrder;
      const sorter: SorterInfo = {
        field: column.key,
        direction,
        sorterFn: getSorterFn(column.sorter),
        priority,
      };
      if (!direction) {
        sorters.push(sorter);
      } else if (isNumber(priority)) {
        if (sorters.every((item) => isNumber(item.priority) || !item.direction)) {
          sorters.push(sorter);
        }
      } else if (sorters.every((item) => !item.direction)) {
        sorters.push(sorter);
      } else {
        sorters = [sorter];
      }
    });
    return sorters;
  }, []);

  const updateStateSorters = useCallback(
    (sorter: SorterInfo, nextActiveSorters: SorterInfo[]) => {
      const controlledSorters = getControlledSorters(flattenColumns);
      if (!controlledSorters.length) {
        setActiveSorters(nextActiveSorters);
        setCurrentSorter(sorter);
      }
    },
    [flattenColumns, getControlledSorters, setActiveSorters, setCurrentSorter]
  );

  function onSort(direction: SortDirection, field) {
    const column = getColumnByUniqueKey(flattenColumns, field);
    if (!column) {
      return;
    }
    const sorter: SorterInfo = {
      direction,
      field,
      sorterFn: getSorterFn(column.sorter),
      priority: getSorterPriority(column.sorter),
    };
    const nextActiveSorters = getNextActiveSorters(sorter);
    updateStateSorters(sorter, nextActiveSorters);
    handleOnChange('sort', {
      sorters: [sorter],
    });
  }

  useUpdate(() => {
    const prevFlattenColumns = prevFlattenColumnsRef.current;
    const prevControlledSorters = getControlledSorters(prevFlattenColumns);
    const controlledSorters = getControlledSorters(flattenColumns);
    const prevControlledFields = prevControlledSorters.map((item) => item.field);

    const changedSorters = controlledSorters.filter((item) => {
      const changed = prevControlledSorters.find(
        ({ field, direction }) => item.field === field && item.direction !== direction
      );
      if (changed) {
        return true;
      }
      // 新增的sorter，用于处理开始不受控，之后又受控了的情况
      return !prevControlledFields.includes(item.field);
    });
    if (changedSorters && changedSorters.length) {
      setActiveSorters(controlledSorters);
      setCurrentSorter({});
    }
    // update prevFlattenColumns
    prevFlattenColumnsRef.current = flattenColumns;
  }, [
    flattenColumns,
    getControlledSorters,
    getNextActiveSorters,
    setCurrentSorter,
    setActiveSorters,
  ]);

  return {
    currentSorter,
    activeSorters,
    onSort,
    getSortedData,
  };
}

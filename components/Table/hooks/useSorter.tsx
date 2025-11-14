import { useState, useRef, useCallback } from 'react';
import { SorterInfo } from '../interface';
import { getSorterPriority, getSorterFn } from '../utils';
import useUpdate from '../../_util/hooks/useUpdate';
import { isNumber } from '../../_util/is';

export default function useSorter(flattenColumns, defaultSorters) {
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

  const getControlledSorters = useCallback((columns) => {
    const controlledColumns = columns.filter(
      (column) =>
        'sortOrder' in column &&
        typeof column.sortOrder !== 'undefined' &&
        column.sortOrder !== null
    );
    let sorters: SorterInfo[] = [];
    controlledColumns.forEach((column) => {
      const priority = getSorterPriority(column.sorter);
      const direction = column.sortOrder;
      // Only add sorter if direction is defined (should always be true due to filter above)
      if (direction) {
        const sorter: SorterInfo = {
          field: column.key,
          direction,
          sorterFn: getSorterFn(column.sorter),
          priority,
        };
        if (isNumber(priority)) {
          if (sorters.every((item) => isNumber(item.priority) || !item.direction)) {
            sorters.push(sorter);
          }
        } else if (sorters.every((item) => !item.direction)) {
          sorters.push(sorter);
        } else {
          sorters = [sorter];
        }
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

  useUpdate(() => {
    const prevFlattenColumns = prevFlattenColumnsRef.current;
    const prevControlledSorters = getControlledSorters(prevFlattenColumns);
    const controlledSorters = getControlledSorters(flattenColumns);
    const prevControlledFields = prevControlledSorters.map((item) => item.field);
    const controlledFields = controlledSorters.map((item) => item.field);

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

    // Check if any previously controlled sorters were removed
    const removedSorters = prevControlledSorters.filter(
      (item) => !controlledFields.includes(item.field)
    );

    if ((changedSorters && changedSorters.length) || (removedSorters && removedSorters.length)) {
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
    getNextActiveSorters,
    updateStateSorters,
  };
}

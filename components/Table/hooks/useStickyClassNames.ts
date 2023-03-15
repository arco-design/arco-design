import { useMemo } from 'react';
import { InternalColumnProps } from '../interface';
import cs from '../../_util/classNames';
import { isObject } from '../../_util/is';

// get sticky cell's className
function useStickyClassNames(
  groupColumns: InternalColumnProps[][],
  columns: InternalColumnProps[],
  prefixCls: string
): [string[][], string[]] {
  const colFixed = columns.map((c) => c.fixed);

  function getClassNameFromColumn(column: InternalColumnProps, index: number) {
    return cs({
      [`${prefixCls}-col-fixed-left`]: column.fixed === 'left',
      [`${prefixCls}-col-fixed-right`]: column.fixed === 'right',
      [`${prefixCls}-col-fixed-left-last`]:
        column.fixed === 'left' &&
        (isObject(columns[index + 1]) ? columns[index + 1].fixed !== 'left' : true),
      [`${prefixCls}-col-fixed-right-first`]:
        column.fixed === 'right' &&
        (isObject(columns[index - 1]) ? columns[index - 1].fixed !== 'right' : true),
    });
  }

  const stickyClassNames = useMemo(() => {
    return columns.map((column, index) => getClassNameFromColumn(column, index));
  }, [colFixed.join('-')]);

  const groupStickyClassNames = useMemo(
    () =>
      groupColumns.map((gc) => {
        return gc.map((column, i) => {
          let index = i;
          const columnIndex = column.$$columnIndex;
          if (Array.isArray(columnIndex) && columnIndex.length === 2) {
            index = column.fixed === 'right' ? columnIndex[0] : columnIndex[1];
          } else if (typeof columnIndex === 'number') {
            index = columnIndex;
          }
          return getClassNameFromColumn(column, index);
        });
      }),
    [groupColumns.map((c) => `|${c.map((a) => a.fixed || 'undefined').join('-')}|`).join('_')]
  );

  return [groupStickyClassNames, stickyClassNames];
}

export default useStickyClassNames;

import { useMemo, useCallback } from 'react';
import useComponent from './useComponent';
import { InternalColumnProps, TableProps } from '../interface';
import { INTERNAL_EXPAND_KEY, INTERNAL_SELECTION_KEY } from '../constant';

function getFlattenColumns(columns: InternalColumnProps[], childrenColumnName: string) {
  const rows: InternalColumnProps[] = [];
  function travel(columns) {
    if (columns && columns.length > 0) {
      columns.forEach((column) => {
        if (!column[childrenColumnName]) {
          rows.push({ ...column, key: column.key || column.dataIndex });
        } else {
          travel(column[childrenColumnName]);
        }
      });
    }
  }
  travel(columns);

  return rows;
}

// 获取 columns 需要分成几行，只有表头分组时可能 > 1。
function getAllHeaderRowsCount(columns: InternalColumnProps[], childrenColumnName: string) {
  let length = 0;
  if (columns && columns.length > 0) {
    columns.forEach((column) => {
      const depth = getAllHeaderRowsCount(column[childrenColumnName], childrenColumnName) + 1;
      length = Math.max(depth, length);
    });
  }
  return length;
}

function useColumns<T>(props: TableProps<T>): [InternalColumnProps[][], InternalColumnProps[]] {
  const {
    components,
    rowSelection,
    expandedRowRender,
    expandProps = {},
    columns = [],
    childrenColumnName,
  } = props;

  const rows: InternalColumnProps[] = useMemo(
    () => getFlattenColumns(columns, childrenColumnName),
    [columns, childrenColumnName]
  );

  const isCheckbox =
    (rowSelection && rowSelection.type === 'checkbox') ||
    (rowSelection && !('type' in rowSelection));
  const isRadio = rowSelection && rowSelection.type === 'radio';

  const { width: expandColWidth } = expandProps;

  const shouldRenderExpandCol = !!expandedRowRender;
  const shouldRenderSelectionCol = isCheckbox || isRadio;

  const { getHeaderComponentOperations, getBodyComponentOperations } = useComponent(components);

  const headerOperations = useMemo(
    () =>
      getHeaderComponentOperations({
        selectionNode: shouldRenderSelectionCol ? 'holder_node' : '',
        expandNode: shouldRenderExpandCol ? 'holder_node' : '',
      }),
    [shouldRenderSelectionCol, shouldRenderExpandCol, getHeaderComponentOperations]
  );
  const bodyOperations = useMemo(
    () =>
      getBodyComponentOperations({
        selectionNode: shouldRenderSelectionCol ? 'holder_node' : '',
        expandNode: shouldRenderExpandCol ? 'holder_node' : '',
      }),
    [shouldRenderSelectionCol, shouldRenderExpandCol, getBodyComponentOperations]
  );

  const selectionFixedLeft = rowSelection && rowSelection.fixed;
  const selectionColumnWidth = rowSelection && rowSelection.columnWidth;

  const getInternalColumns = useCallback(
    (rows, operations, index?: number) => {
      const operationFixedProps: { fixed?: 'left' | 'right' } = {};
      const _rows: InternalColumnProps[] = [];
      rows.forEach((r, i) => {
        const _r = { ...r };
        if (!('key' in r)) {
          _r.key = _r.dataIndex || i;
        }
        if (i === 0) {
          _r.$$isFirstColumn = true;

          if (_r.fixed === 'left') {
            operationFixedProps.fixed = _r.fixed;
          }
        } else {
          _r.$$isFirstColumn = false;
        }
        _rows.push(_r);
      });
      const expandColumn = shouldRenderExpandCol && {
        key: INTERNAL_EXPAND_KEY,
        title: INTERNAL_EXPAND_KEY,
        width: expandColWidth,
        $$isOperation: true,
      };
      const selectionColumn = shouldRenderSelectionCol && {
        key: INTERNAL_SELECTION_KEY,
        title: INTERNAL_SELECTION_KEY,
        width: selectionColumnWidth,
        $$isOperation: true,
      };

      if (selectionFixedLeft) {
        operationFixedProps.fixed = 'left';
      }
      if (typeof index !== 'number' || index === 0) {
        [...operations].reverse().forEach((operation) => {
          if (operation.node) {
            if (operation.name === 'expandNode') {
              _rows.unshift({ ...expandColumn, ...operationFixedProps });
            } else if (operation.name === 'selectionNode') {
              _rows.unshift({ ...selectionColumn, ...operationFixedProps });
            } else {
              _rows.unshift({
                ...operation,
                ...operationFixedProps,
                title: operation.name,
                key: operation.name,
                $$isOperation: true,
                width: operation.width || 40,
              });
            }
          }
        });
      }

      return _rows;
    },
    [
      expandColWidth,
      shouldRenderExpandCol,
      shouldRenderSelectionCol,
      selectionColumnWidth,
      selectionFixedLeft,
    ]
  );

  const flattenColumns = useMemo(
    () => getInternalColumns(rows, bodyOperations),
    [rows, getInternalColumns, bodyOperations]
  );

  // 把表头分组的 columns 分成 n 行，并且加上 colSpan 和 rowSpan，没有表头分组的话是 1 行。
  const rowCount = useMemo(
    () => getAllHeaderRowsCount(columns, childrenColumnName),
    [columns, childrenColumnName]
  );

  // 分行之后的rows
  const groupColumns = useMemo(() => {
    if (rowCount === 1) {
      return [getInternalColumns(columns, headerOperations, 0)];
    }
    const rows: InternalColumnProps[][] = [];
    const travel = (columns, current = 0) => {
      rows[current] = rows[current] || [];
      columns.forEach((col) => {
        const column: InternalColumnProps = { ...col };
        if (column[childrenColumnName]) {
          column.colSpan = getFlattenColumns(col[childrenColumnName], childrenColumnName).length;
          column.rowSpan = 1;
          rows[current].push(column);
          travel(column[childrenColumnName], current + 1);
        } else {
          column.colSpan = 1;
          column.rowSpan = rowCount - current;
          rows[current].push(column);
        }
      });
      rows[current] = getInternalColumns(rows[current], headerOperations, current);
    };
    travel(columns);
    return rows;
  }, [columns, childrenColumnName, rowCount, getInternalColumns, headerOperations]);

  return [groupColumns, flattenColumns];
}

export default useColumns;

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
    columns,
    childrenColumnName,
  } = props;

  const baseColumns = useMemo(() => columns || [], [columns]);

  const rows: InternalColumnProps[] = useMemo(
    () => getFlattenColumns(baseColumns, childrenColumnName),
    [baseColumns, childrenColumnName]
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
        if (!('key' in r) || typeof r.key === 'undefined') {
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
        [...operations].reverse().forEach((operation, i) => {
          if (operation.node) {
            const columnIndex = headerOperations.filter((opt) => opt.node).length - i - 1;
            if (operation.name === 'expandNode') {
              _rows.unshift({
                ...expandColumn,
                ...operationFixedProps,
                $$columnIndex: columnIndex,
              });
            } else if (operation.name === 'selectionNode') {
              _rows.unshift({
                ...selectionColumn,
                ...operationFixedProps,
                $$columnIndex: columnIndex,
              });
            } else {
              _rows.unshift({
                ...operation,
                ...operationFixedProps,
                title: operation.name,
                key: operation.name,
                $$isOperation: true,
                width: operation.width || 40,
                $$columnIndex: columnIndex,
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
      headerOperations,
    ]
  );

  const flattenColumns = useMemo(
    () => getInternalColumns(rows, bodyOperations),
    [rows, getInternalColumns, bodyOperations]
  );

  // 把表头分组的 columns 分成 n 行，并且加上 colSpan 和 rowSpan，没有表头分组的话是 1 行。
  const rowCount = useMemo(
    () => getAllHeaderRowsCount(baseColumns, childrenColumnName),
    [baseColumns, childrenColumnName]
  );

  // 分行之后的rows
  const groupColumns = useMemo(() => {
    const prefixIndex = Array.isArray(headerOperations)
      ? headerOperations.filter((opt) => opt.node).length
      : 0;
    if (rowCount === 1) {
      const rows = baseColumns.map((col, index) => ({
        ...col,
        $$columnIndex: index + prefixIndex,
      }));
      return [getInternalColumns(rows, headerOperations, 0)];
    }
    let columnIndex = prefixIndex;
    const rows: InternalColumnProps[][] = [];
    const travel = (baseColumns, current = 0) => {
      rows[current] = rows[current] || [];
      baseColumns.forEach((col) => {
        const column: InternalColumnProps = { ...col };
        if (column[childrenColumnName]) {
          column.colSpan = getFlattenColumns(col[childrenColumnName], childrenColumnName).length;
          column.$$columnIndex = [columnIndex];
          rows[current].push(column);
          travel(column[childrenColumnName], current + 1);
          column.$$columnIndex.push(columnIndex - 1);
        } else {
          column.rowSpan = rowCount - current;
          column.$$columnIndex = columnIndex++;
          rows[current].push(column);
        }
      });
      rows[current] = getInternalColumns(rows[current], headerOperations, current);
    };
    travel(baseColumns);
    return rows;
  }, [baseColumns, childrenColumnName, rowCount, getInternalColumns, headerOperations]);

  return [groupColumns, flattenColumns];
}

export default useColumns;

import React, { useEffect, useRef } from 'react';
import { InternalColumnProps } from './interface';
import { INTERNAL_EXPAND_KEY, INTERNAL_SELECTION_KEY } from './constant';

function fixedWidth(width?: number | string) {
  return typeof width === 'number' || typeof width === 'string'
    ? {
        width,
      }
    : {};
}

type ColGroupType = {
  prefixCls?: string;
  columns?: InternalColumnProps[];
  columnWidths?: number[];
  producer?: boolean;
  onSetColumnWidths?: (widths: number[]) => void;
  expandedRowKeys?: React.Key[];
  data?: any[];
};

function ColGroup(props: ColGroupType) {
  const colgroupRef = useRef<HTMLTableColElement>();
  const { prefixCls, columns, columnWidths, producer, expandedRowKeys, data, onSetColumnWidths } =
    props;

  useEffect(() => {
    if (producer && colgroupRef.current) {
      const cols = Array.from(colgroupRef.current.querySelectorAll('col') || []).filter(
        (col) =>
          !col.classList.contains(`${prefixCls}-expand-icon-col`) &&
          !col.classList.contains(`${prefixCls}-selection-col`)
      );

      const widths = cols.map((col) => {
        const { width } = col.getBoundingClientRect();
        return width;
      });
      onSetColumnWidths(widths);
    }
  }, [producer, onSetColumnWidths, prefixCls, expandedRowKeys, data, columns]);

  let mainColIndex = 0;

  return (
    <colgroup ref={colgroupRef}>
      {columns.map((col, index) => {
        if (col.title === INTERNAL_EXPAND_KEY) {
          return (
            <col
              key={INTERNAL_EXPAND_KEY}
              className={`${prefixCls}-expand-icon-col`}
              style={fixedWidth(col.width)}
            />
          );
        }
        if (col.title === INTERNAL_SELECTION_KEY) {
          return (
            <col
              key={INTERNAL_SELECTION_KEY}
              className={`${prefixCls}-selection-col`}
              style={fixedWidth(col.width)}
            />
          );
        }
        let width: number | string;
        if (col.width) {
          width = col.width;
        } else if (!producer && columnWidths) {
          width = columnWidths[mainColIndex];
        }
        mainColIndex++;
        return <col key={col.key ?? index} style={fixedWidth(width)} />;
      })}
    </colgroup>
  );
}

export default ColGroup;

import React from 'react';
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
};

function ColGroup(props: ColGroupType) {
  const { prefixCls, columns } = props;

  return (
    <colgroup>
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

        return <col key={col.key || index} style={fixedWidth(col.width)} />;
      })}
    </colgroup>
  );
}

export default ColGroup;

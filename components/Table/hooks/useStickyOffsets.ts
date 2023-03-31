import { useMemo } from 'react';
import { InternalColumnProps } from '../interface';
import { px2Number } from '../utils';

// get sticky cell's left and right
function useStickyOffsets(columns: InternalColumnProps[]): number[] {
  const colWidths = columns.map((c) => px2Number(c.width));
  const colFixed = columns.map((c) => c.fixed);

  const stickyOffsets = useMemo(() => {
    return columns.map((column) => {
      let offset = 0;
      if (column.fixed === 'left') {
        columns.some((col) => {
          if (col.fixed === 'left') {
            if (col.key === column.key) {
              return true;
            }
            const colWidth = col.$$isOperation ? px2Number(col.width) || 40 : px2Number(col.width);
            offset += colWidth as number;
            return false;
          }
          return false;
        });
      }

      if (column.fixed === 'right') {
        [...columns].reverse().some((col) => {
          if (col.fixed === 'right') {
            if (col.key === column.key) {
              return true;
            }
            const colWidth = col.$$isOperation ? px2Number(col.width) || 40 : px2Number(col.width);
            offset += colWidth as number;
            return false;
          }
          return false;
        });
      }

      return offset;
    });
  }, [colWidths.join('-'), colFixed.join('-')]);

  return stickyOffsets;
}

export default useStickyOffsets;

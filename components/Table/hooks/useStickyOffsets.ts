import { useMemo } from 'react';
import { InternalColumnProps } from '../interface';

// get sticky cell's left and right
function useStickyOffsets(columns: InternalColumnProps[]): number[] {
  const colWidths = columns.map((c) => c.width);
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
            const colWidth = col.$$isOperation ? col.width || 40 : col.width;
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
            const colWidth = col.$$isOperation ? col.width || 40 : col.width;
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

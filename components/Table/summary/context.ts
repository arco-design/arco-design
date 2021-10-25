import { createContext } from 'react';
import { ColumnProps } from '../interface';

interface SummaryContextProps {
  columns?: ColumnProps[];
  stickyOffsets?: number[];
  stickyClassNames?: string[];
  prefixCls?: string;
}

export const SummaryContext = createContext<SummaryContextProps>({});

import { createContext } from 'react';
import { GridItemData } from './interface';

type RowContextType = {
  gutter?: [number, number];
  div?: boolean;
};

export const RowContext = createContext<RowContextType>({});

type GridContextType = {
  overflow?: boolean;
  collapsed?: boolean;
  displayIndexList?: number[];
  cols?: number;
  colGap?: number;
};

export const GridContext = createContext<GridContextType>({});

type GridDataCollectorType = Readonly<{
  collectItemData?: (index: number, itemData: GridItemData) => void;
  removeItemData?: (index: number) => void;
}>;

export const GridDataCollectorContext = createContext<GridDataCollectorType>({});

import { createContext } from 'react';

type RowContextType = {
  gutter?: [number, number];
  div?: boolean;
};

export const RowContext = createContext<RowContextType>({});

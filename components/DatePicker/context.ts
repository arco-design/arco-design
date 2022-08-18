import { createContext } from 'react';

type PickerContext = {
  utcOffset?: number;
  timezone?: string;
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export default createContext<PickerContext>({});

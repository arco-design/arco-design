import { createContext } from 'react';

type TimezoneContext = {
  utcOffset?: number;
};

export default createContext<TimezoneContext>({});

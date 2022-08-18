import { createContext } from 'react';

type TimezoneContext = {
  utcOffset?: number;
  timezone?: string;
};

export default createContext<TimezoneContext>({});

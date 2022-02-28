import { createContext } from 'react';

type TimezoneContext = {
  timezone?: string;
};

export default createContext<TimezoneContext>({});

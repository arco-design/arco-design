import React from 'react';
import { GlobalContext } from '../../context';

export const HomeGlobalContext = GlobalContext as unknown as React.Context<{
  lang: string;
  theme: string;
  toggleTheme: (theme: string) => void;
}>;

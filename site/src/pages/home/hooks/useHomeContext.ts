import { useContext } from 'react';
import { GlobalContext } from '../../../context';

interface HomeContext {
  theme: string;
  toggle: (theme: string) => void;
  lang: 'zh-CN' | 'en-US';
  locale: { [key: string]: string };
}

function useHomeContext() {
  const context = useContext(GlobalContext) as HomeContext;
  return context;
}

export default useHomeContext;

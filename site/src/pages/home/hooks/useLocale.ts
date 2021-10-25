import useHomeContext from './useHomeContext';

function useLocale() {
  const { locale } = useHomeContext();

  return locale;
}

export default useLocale;

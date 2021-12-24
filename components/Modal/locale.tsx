import defaultLocale from '../locale/default';
import { Locale } from '../locale/interface';
import type { ConfigProviderProps } from '../ConfigProvider';

let modalLocale: Locale = {
  ...defaultLocale,
};

let configProvider = {} as ConfigProviderProps;

export function setModalLocale(locale?: Locale) {
  if (locale) {
    modalLocale = {
      ...modalLocale,
      ...locale,
    };
  } else {
    modalLocale = {
      ...defaultLocale,
    };
  }
}

export function getModalLocale() {
  return modalLocale;
}

export function setConfigProviderProps(configProviderProps: ConfigProviderProps) {
  configProvider = {
    ...configProviderProps,
  };
}

export function getConfigProviderProps() {
  return configProvider;
}

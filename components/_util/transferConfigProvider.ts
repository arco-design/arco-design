import type { ConfigProviderProps } from '../ConfigProvider';

let configProvider = {} as ConfigProviderProps;

export function setConfigProviderProps(configProviderProps: ConfigProviderProps) {
  configProvider = {
    ...configProviderProps,
  };
}

export function getConfigProviderProps() {
  return configProvider;
}

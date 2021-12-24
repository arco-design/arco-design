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

export type ModalConfigType = {
  prefixCls?: string;
  simple?: boolean;
};

let modalConfig: ModalConfigType = {
  simple: true,
};

export const setModalConfig = (config: ModalConfigType) => {
  modalConfig = {
    ...modalConfig,
    ...config,
  };
};

export const getModalConfig = (): ModalConfigType => {
  return modalConfig;
};

export const destroyList: Array<Function> = [];

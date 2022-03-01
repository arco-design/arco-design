import React, { useEffect, createContext } from 'react';
import defaultLocale from '../locale/default';
import { isObject } from '../_util/is';
import { lighten } from './util';
import Message from '../Message';
import Notification from '../Notification';
import Empty from '../Empty';
import { setConfigProviderProps } from '../Modal/config';
import { IconContext } from '../../icon/react-icon/context';
import { ConfigProviderProps } from './interface';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';

const colorList = {
  primaryColor: {
    default: '--arcoblue-6',
    hover: '--arcoblue-5',
    active: '--arcoblue-7',
  },
  successColor: {
    default: '--green-6',
    hover: '--green-5',
    active: '--green-7',
  },
  infoColor: {
    default: '--arcoblue-6',
    hover: '--arcoblue-5',
    active: '--arcoblue-7',
  },
  warningColor: {
    default: '--orangered-6',
    hover: '--orangered-5',
    active: '--orangered-7',
  },
  dangerColor: {
    default: '--red-6',
    hover: '--red-5',
    active: '--red-7',
  },
};

function setTheme(theme: ConfigProviderProps['theme']) {
  if (theme && isObject(theme)) {
    const root = document.body;
    Object.keys(colorList).forEach((color) => {
      if (theme[color]) {
        root.style.setProperty(colorList[color].default, lighten(theme[color], 0));

        if (!theme[`${color}Hover`]) {
          root.style.setProperty(colorList[color].hover, lighten(theme[color], 10));
        }

        if (!theme[`${color}Active`]) {
          root.style.setProperty(colorList[color].active, lighten(theme[color], -10));
        }
      }
    });
  }
}

function renderEmpty(componentName?: string) {
  switch (componentName) {
    default:
      return <Empty />;
  }
}

const defaultProps: ConfigProviderProps = {
  locale: defaultLocale,
  prefixCls: 'arco',
  getPopupContainer: () => document.body,
  size: 'default',
  renderEmpty,
  focusLock: {
    modal: { autoFocus: true },
    drawer: { autoFocus: true },
  },
};

const componentConfig = {};

export const ConfigContext = createContext<ConfigProviderProps>({
  getPrefixCls: (componentName: string, customPrefix?: string) =>
    `${customPrefix || 'arco'}-${componentName}`,
  ...defaultProps,
});

function ConfigProvider(baseProps: ConfigProviderProps) {
  const props = useMergeProps<ConfigProviderProps>(baseProps, defaultProps, componentConfig);
  const { theme, prefixCls, children, locale } = props;

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  useEffect(() => {
    Message.config({ prefixCls });
    Notification.config({ prefixCls });
  }, [prefixCls]);

  function getPrefixCls(componentName: string, customPrefix?: string) {
    return `${customPrefix || prefixCls}-${componentName}`;
  }

  const config: ConfigProviderProps = {
    ...omit(props, ['children']),
    getPrefixCls,
  };

  useEffect(() => {
    setConfigProviderProps({ locale, prefixCls });
  }, [locale, prefixCls]);

  let child = children;

  if (prefixCls && prefixCls !== 'arco') {
    child = <IconContext.Provider value={{ prefixCls }}>{children}</IconContext.Provider>;
  }

  return <ConfigContext.Provider value={config}>{child}</ConfigContext.Provider>;
}

ConfigProvider.ConfigContext = ConfigContext;

ConfigProvider.displayName = 'ConfigProvider';

export default ConfigProvider;

export const ConfigConsumer = ConfigContext.Consumer;

export { ConfigProviderProps };

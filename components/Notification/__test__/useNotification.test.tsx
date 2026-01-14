import React, { createContext } from 'react';
import Notification from '..';
import { ConfigProvider } from '../..';
import { render, $ } from '../../../tests/util';

describe('useNotification Test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('useNotification', async () => {
    const [notification, contextHolder] = Notification.useNotification({});

    const ConfigContext = createContext({});

    const wrapper = render(
      <div>
        <ConfigProvider prefixCls="demo" rtl effectGlobalNotice={false}>
          <ConfigContext.Provider value="PJY">{contextHolder}</ConfigContext.Provider>
        </ConfigProvider>
      </div>
    );

    // prefixCls: demo
    notification.info?.({
      content: <ConfigContext.Consumer>{(name) => name}</ConfigContext.Consumer>,
    });
    expect(wrapper.find('.demo-notification')[0].classList).toContain('demo-notification-rtl');
    expect(wrapper.find('.demo-notification-content')[0].innerHTML).toBe('PJY');

    // prefixCls: arco
    Notification.info?.({
      content: 'YYH',
      duration: 0,
    });
    expect($('.arco-notification')).toHaveLength(1);
    expect($('.arco-notification-content')[0].innerHTML).toBe('YYH');
  });

  it('notification update', async () => {
    const [notification, contextHolder] = Notification.useNotification({ maxCount: 2 });
    const wrapper = render(
      <div>
        <ConfigProvider>{contextHolder}</ConfigProvider>
      </div>
    );

    notification.info?.({
      id: 'demo',
      content: 'PJY',
    });
    expect(wrapper.find('.arco-notification-content')[0].innerHTML).toBe('PJY');
    notification.info?.({
      id: 'demo',
      content: 'YYH',
    });
    expect(wrapper.find('.arco-notification-content')[0].innerHTML).toBe('YYH');
  });

  it('useNotification getcontainer', async () => {
    const [notification, contextHolder] = Notification.useNotification({
      getContainer: () => document.getElementById('root') as HTMLElement,
    });

    const wrapper = render(
      <div>
        {contextHolder}
        <div id="root" />
      </div>
    );

    notification.info?.({
      content: 'hahahah',
    });
    expect(wrapper.find('#root .arco-notification')).toHaveLength(1);
  });

  it('useNotification instance proxy with remove and clear', async () => {
    const [notification, contextHolder] = Notification.useNotification({});

    const wrapper = render(
      <div>
        <ConfigProvider>{contextHolder}</ConfigProvider>
      </div>
    );

    // Test that instance proxy has remove and clear methods
    const instance1 = notification.info?.({
      id: 'notification-1',
      content: 'First notification',
      duration: 0,
    });

    expect(instance1).toBeDefined();
    expect(typeof (instance1 as any)?.remove).toBe('function');
    expect(typeof (instance1 as any)?.clear).toBe('function');

    // Add another notification
    const instance2 = notification.success?.({
      id: 'notification-2',
      content: 'Second notification',
      duration: 0,
    });

    jest.runAllTimers();
    expect(wrapper.find('.arco-notification-content')).toHaveLength(2);

    // Test remove method on instance
    (instance1 as any)?.remove?.('notification-1');
    jest.runAllTimers();
    expect(wrapper.find('.arco-notification-content')).toHaveLength(1);
    expect(wrapper.find('.arco-notification-content')[0].innerHTML).toBe('Second notification');

    // Test clear method on instance
    (instance2 as any)?.clear?.();
    jest.runAllTimers();
    expect(wrapper.find('.arco-notification-content')).toHaveLength(0);
  });

  it('useNotification api remove and clear methods', async () => {
    const [notification, contextHolder] = Notification.useNotification({});

    const wrapper = render(
      <div>
        <ConfigProvider>{contextHolder}</ConfigProvider>
      </div>
    );

    // Test that api has remove and clear methods
    expect(typeof notification.remove).toBe('function');
    expect(typeof notification.clear).toBe('function');

    // Add notifications
    notification.info?.({
      id: 'notification-1',
      content: 'First notification',
      duration: 0,
    });

    notification.success?.({
      id: 'notification-2',
      content: 'Second notification',
      duration: 0,
    });

    jest.runAllTimers();
    expect(wrapper.find('.arco-notification-content')).toHaveLength(2);

    // Test api.remove method
    notification.remove?.('notification-1');
    jest.runAllTimers();
    expect(wrapper.find('.arco-notification-content')).toHaveLength(1);

    // Test api.clear method
    notification.clear?.();
    jest.runAllTimers();
    expect(wrapper.find('.arco-notification-content')).toHaveLength(0);
  });
});

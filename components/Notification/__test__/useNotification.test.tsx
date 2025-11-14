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

  it('useNotification instance.remove', async () => {
    const [notification, contextHolder] = Notification.useNotification({});

    const wrapper = render(
      <div>
        <ConfigProvider>{contextHolder}</ConfigProvider>
      </div>
    );

    // Create first notification to initialize the instance
    notification.info?.({
      id: 'test-id-1',
      content: 'First Content',
      duration: 0,
    });

    // Advance timers to allow instance to be ready
    jest.runAllTimers();

    // Now create second notification and get instance proxy
    const instance = notification.info?.({
      id: 'test-id-2',
      content: 'Second Content',
      duration: 0,
    });

    jest.runAllTimers();

    // Verify both notifications are displayed
    expect(wrapper.find('.arco-notification-content')).toHaveLength(2);

    // Verify instance has remove method
    expect(instance).toBeDefined();
    expect(instance).toHaveProperty('remove');

    // Call remove on the instance proxy using type narrowing
    if (instance && 'remove' in instance && typeof instance.remove === 'function') {
      instance.remove('test-id-2');
    }

    // Wait for opacity animation (200ms)
    jest.advanceTimersByTime(250);

    // Verify second notification is removed, first one remains
    const contents = wrapper.find('.arco-notification-content');
    expect(contents).toHaveLength(1);
    expect(contents[0].innerHTML).toBe('First Content');
  });
});

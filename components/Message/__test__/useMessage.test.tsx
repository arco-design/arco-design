import React, { createContext } from 'react';
import Message from '..';
import { ConfigProvider } from '../..';
import { render, $ } from '../../../tests/util';

describe('useMessage Test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('useMessage', async () => {
    const [message, contextHolder] = Message.useMessage({});

    const ConfigContext = createContext({});

    const wrapper = render(
      <div>
        <ConfigProvider prefixCls="demo" rtl effectGlobalNotice={false}>
          <ConfigContext.Provider value="PJY">{contextHolder}</ConfigContext.Provider>
        </ConfigProvider>
      </div>
    );

    // prefixCls: demo
    const m = message.info?.({
      content: <ConfigContext.Consumer>{(name) => name}</ConfigContext.Consumer>,
    });
    expect(wrapper.find('.demo-message')[0].classList).toContain('demo-message-rtl');
    expect(wrapper.find('.demo-message-content')[0].innerHTML).toBe('PJY');

    // prefixCls: arco
    const n = Message.info({
      content: 'YYH',
      duration: 0,
    });
    expect($('.arco-message')).toHaveLength(1);
    expect($('.arco-message-content')[0].innerHTML).toBe('YYH');

    // close
    m?.();
    n();
    jest.runAllTimers();
    expect(wrapper.find('.demo-message').length).toBe(0);
    expect(wrapper.find('.arco-message').length).toBe(0);
  });

  it('message update', async () => {
    const [message, contextHolder] = Message.useMessage({ maxCount: 2 });
    const wrapper = render(
      <div>
        <ConfigProvider>{contextHolder}</ConfigProvider>
      </div>
    );

    message.info?.({
      id: 'demo',
      content: 'PJY',
    });
    expect(wrapper.find('.arco-message-content')[0].innerHTML).toBe('PJY');

    const m = message.info?.({
      id: 'demo',
      content: 'YYH',
    });
    expect(wrapper.find('.arco-message-content')[0].innerHTML).toBe('YYH');

    m?.();

    jest.runAllTimers();
    expect(wrapper.find('.arco-message').length).toBe(0);
  });
});

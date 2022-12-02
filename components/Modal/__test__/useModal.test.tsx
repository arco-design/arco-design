import React, { createContext } from 'react';
import Modal from '..';
import { $, cleanup, fireEvent, render } from '../../../tests/util';

describe('Modal api test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
  });

  it('useModal', () => {
    const ConfigContext = createContext({});
    let modal;
    const Demo = () => {
      const [_modal, _contextHolder] = Modal.useModal();

      modal = _modal;

      return <ConfigContext.Provider value="PJY">{_contextHolder}</ConfigContext.Provider>;
    };

    render(<Demo />);

    const m = modal.confirm?.({
      title: <span id="modal-title">123</span>,
      content: <ConfigContext.Consumer>{(name) => name}</ConfigContext.Consumer>,
    });

    jest.runAllTimers();

    expect($('.arco-modal').length).toBe(1);
    expect($('.arco-modal-content')[0].innerHTML).toBe('PJY');

    m?.update({ content: 'YYH' });
    expect($('.arco-modal-content')[0].innerHTML).toBe('YYH');
    expect($('#modal-title')[0].innerHTML).toBe('123');

    m?.close();

    jest.runAllTimers();

    expect($('.arco-modal').length).toBe(0);
  });

  it('useModal update when onOk return promise', () => {
    const ConfigContext = createContext({});

    let modal;
    const Demo = () => {
      const [_modal, _contextHolder] = Modal.useModal();

      modal = _modal;

      return <ConfigContext.Provider value="PJY">{_contextHolder}</ConfigContext.Provider>;
    };

    render(<Demo />);

    const m = modal.confirm?.({
      title: 'title',
      content: '123',
      icon: null,
      okButtonProps: { id: 'ok-btn' },
      onOk: () =>
        new Promise((resolve) => {
          m?.update({
            title: 'new title',
          });
          setTimeout(() => {
            resolve(null);
          }, 1000);
        }),
    });

    jest.runAllTimers();

    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>title</span>');

    m?.update({ content: 'yyds' });
    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>title</span>');
    expect($('.arco-modal-content')[0].innerHTML).toBe('yyds');

    fireEvent.click($('#ok-btn')[0] as HTMLElement);

    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>new title</span>');
    expect($('.arco-modal-content')[0].innerHTML).toBe('yyds');

    m.close();
    jest.runAllTimers();

    expect($('.arco-modal').length).toBe(0);
  });

  it('continue update modal', () => {
    const ConfigContext = createContext({});

    let modal;
    const Demo = () => {
      const [_modal, _contextHolder] = Modal.useModal();

      modal = _modal;

      return <ConfigContext.Provider value="PJY">{_contextHolder}</ConfigContext.Provider>;
    };

    render(<Demo />);

    const m = modal.confirm?.({
      title: 'title',
      content: '123',
      icon: 'icon-',
      okButtonProps: { id: 'ok-btn' },
      onOk: () =>
        new Promise((resolve) => {
          m?.update({
            title: 'new title',
          });
          setTimeout(() => {
            resolve(null);
          }, 1000);
        }),
    });

    jest.runAllTimers();

    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>icon-title</span>');

    m?.update({ content: 'yyds', icon: 'icontest-' });

    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>icontest-title</span>');
    expect($('.arco-modal-content')[0].innerHTML).toBe('yyds');

    fireEvent.click($('#ok-btn')[0] as HTMLElement);

    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>icontest-new title</span>');
    expect($('.arco-modal-content')[0].innerHTML).toBe('yyds');

    m?.update({ icon: 'icontest2-' });

    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>icontest2-new title</span>');

    m.close();
    jest.runAllTimers();

    expect($('.arco-modal').length).toBe(0);
  });
});

import React, { createContext } from 'react';
import Modal from '..';
import { $, cleanup, render } from '../../../tests/util';

describe('Modal api test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
  });

  it('useModal', () => {
    const [modal, contextHolder] = Modal.useModal();

    const ConfigContext = createContext({});

    render(<ConfigContext.Provider value="PJY">{contextHolder}</ConfigContext.Provider>);

    const m = modal.confirm?.({
      title: '123',
      content: <ConfigContext.Consumer>{(name) => name}</ConfigContext.Consumer>,
    });

    jest.runAllTimers();

    expect($('.arco-modal').length).toBe(1);
    expect($('.arco-modal-content')[0].innerHTML).toBe('PJY');

    m?.update({ content: 'YYH' });
    expect($('.arco-modal-content')[0].innerHTML).toBe('YYH');

    m?.close();

    jest.runAllTimers();

    expect($('.arco-modal').length).toBe(0);
  });
});

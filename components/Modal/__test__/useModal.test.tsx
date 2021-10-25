import React, { createContext } from 'react';
import { mount } from 'enzyme';
import Modal from '..';
import { $ } from '../../../tests/util';

describe('Modal api test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  it('useModal', () => {
    const [modal, contextHolder] = Modal.useModal();

    const ConfigContext = createContext({});

    mount(<ConfigContext.Provider value="PJY">{contextHolder}</ConfigContext.Provider>);

    const m = modal.confirm({
      title: '123',
      content: <ConfigContext.Consumer>{(name) => name}</ConfigContext.Consumer>,
    });

    jest.runAllTimers();

    expect($('.arco-modal').length).toBe(1);
    expect($('.arco-modal-content')[0].innerHTML).toBe('PJY');

    m.close();

    jest.runAllTimers();

    expect($('.arco-modal').length).toBe(0);
  });
});

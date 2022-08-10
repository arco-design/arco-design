import React from 'react';

import { act } from 'react-test-renderer';
import mountTest from '../../../tests/mountTest';
import Modal from '..';
import { $, cleanup, fireEvent, render } from '../../../tests/util';

mountTest(Modal);

/*
 * 测试modal中各个api
 */

describe('Modal api test', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
    jest.runAllTimers();
  });

  it('afteropen afterClose correctly', () => {
    const openMockFn = jest.fn();
    const closeMockFn = jest.fn();
    const wrapper = render(
      <Modal afterOpen={openMockFn} afterClose={closeMockFn} visible={false}>
        <div>123</div>
      </Modal>
    );

    jest.useFakeTimers();
    wrapper.rerender(
      <Modal afterOpen={openMockFn} afterClose={closeMockFn} visible>
        <div>123</div>
      </Modal>
    );
    jest.runAllTimers();

    expect(openMockFn).toBeCalledTimes(1);
    jest.useFakeTimers();

    wrapper.rerender(
      <Modal afterOpen={openMockFn} afterClose={closeMockFn} visible={false}>
        <div>123</div>
      </Modal>
    );
    jest.runAllTimers();

    expect(closeMockFn).toBeCalledTimes(1);
  });
  it('simple and closable', () => {
    const wrapper = render(<Modal visible />);
    expect($('.arco-modal-close-icon').length).toBe(1);

    wrapper.rerender(<Modal visible simple />);
    expect($('.arco-modal-close-icon').length).toBe(0);

    wrapper.rerender(<Modal visible simple closable />);
    expect($('.arco-modal-close-icon').length).toBe(1);
    wrapper.rerender(<Modal visible simple={false} closable={false} />);
    expect($('.arco-modal-close-icon').length).toBe(0);
  });
  it('click mask', () => {
    let visible = true;

    const wrapper = render(
      <Modal
        visible={visible}
        onCancel={() => {
          visible = false;
        }}
      />
    );

    jest.useFakeTimers();
    act(() => {
      fireEvent.mouseDown(wrapper.find('.arco-modal-wrapper')[0]);
      fireEvent.click(wrapper.find('.arco-modal-wrapper')[0]);
    });

    jest.runAllTimers();

    expect(visible).toBe(false);
  });

  it('modalRender and custom footer', () => {
    const wrapper = render(
      <Modal
        footer={<div>1234</div>}
        modalRender={(node) => {
          return (
            <div>
              {node} <div className="test-content" />
            </div>
          );
        }}
        visible
      >
        <div>123</div>
      </Modal>
    );

    // 作为modal的兄弟节点
    expect(document.querySelectorAll('.arco-modal+.test-content')).toHaveLength(1);

    expect(wrapper.find('.arco-modal-footer')[0].innerHTML).toBe('<div>1234</div>');
  });
});

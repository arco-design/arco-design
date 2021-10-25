import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Modal from '..';
import { $ } from '../../../tests/util';

mountTest(Modal);

/*
 * 测试modal中各个api
 */

describe('Modal api test', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.runAllTimers();
  });

  it('afteropen afterClose correctly', () => {
    const openMockFn = jest.fn();
    const closeMockFn = jest.fn();
    const wrapper = mount(
      <Modal afterOpen={openMockFn} afterClose={closeMockFn} visible={false}>
        <div>123</div>
      </Modal>
    );

    jest.useFakeTimers();
    wrapper.setProps({
      visible: true,
    });
    jest.runAllTimers();

    expect(openMockFn).toBeCalledTimes(1);
    jest.useFakeTimers();

    wrapper.setProps({
      visible: false,
    });
    jest.runAllTimers();

    expect(closeMockFn).toBeCalledTimes(1);
  });
  it('simple and closable', () => {
    const wrapper = mount(<Modal visible />);
    expect($('.arco-modal-close-icon').length).toBe(1);

    wrapper.setProps({ simple: true });
    expect($('.arco-modal-close-icon').length).toBe(0);

    wrapper.setProps({ closable: true });
    expect($('.arco-modal-close-icon').length).toBe(1);
    wrapper.setProps({ closable: false, simple: false });
    expect($('.arco-modal-close-icon').length).toBe(0);
  });
  it('click mask', () => {
    let visible = true;

    const wrapper = mount(
      <Modal
        visible={visible}
        onCancel={() => {
          visible = false;
        }}
      />
    );

    jest.useFakeTimers();
    wrapper
      .find('.arco-modal-wrapper')
      .simulate('mousedown')
      .simulate('click');

    jest.runAllTimers();

    expect(visible).toBe(false);
  });

  it('modalRender and custom footer', () => {
    const wrapper = mount(
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

    expect(
      wrapper
        .find('.arco-modal-footer')
        .childAt(0)
        .html()
    ).toBe('<div>1234</div>');
  });
});

import React, { useState } from 'react';
import { mount } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import Modal from '..';
import Button from '../../Button';
import { $ } from '../../../tests/util';
import { Esc } from '../../_util/keycode';

mountTest(Modal);

function DemoTest() {
  const [visible, setVisible] = useState(false);

  function open() {
    setVisible(true);
  }

  function onOk() {
    setVisible(false);
  }

  function onCancel() {
    setVisible(false);
  }

  return (
    <>
      <Button onClick={open} type="primary">
        Open
      </Button>
      <Modal title="Title" visible={visible} onConfirm={onOk} onCancel={onCancel}>
        Content
      </Modal>
    </>
  );
}

describe('Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.runAllTimers();
  });

  it('renders correctly', () => {
    const component = mount(
      <div>
        <Modal title="Title" visible>
          Content
        </Modal>
        <Modal title="Title" visible mask={false}>
          Content
        </Modal>
      </div>
    );
    expect(component.render()).toMatchSnapshot();
  });

  it('closeIcon correctly', () => {
    const component = mount(
      <div>
        <Modal title="Title" visible closeIcon="xxx">
          Content
        </Modal>
      </div>
    );
    expect(component.find('.arco-modal-close-icon').text()).toBe('xxx');
  });

  it('open modal correctly', () => {
    const wrapper = mount(<DemoTest />);
    expect(wrapper.find('.arco-modal')).toHaveLength(0);
    expect(wrapper.find(Modal).props().visible).toBe(false);
    // modal mask correctly
    expect($('.arco-modal-mask').length).toBe(0);

    wrapper
      .find('button')
      .filterWhere((n) => n.text() === 'Open')
      .simulate('click');

    // expect(wrapper.find(Modal).state().display).toBe('block');
    expect(wrapper.find('.arco-modal')).toHaveLength(1);
    expect(wrapper.find(Modal).props().visible).toBe(true);
    expect($('.arco-modal-mask').length).toBe(1);

    wrapper.find('.arco-modal-close-icon').last().simulate('click');
    expect($('.arco-modal-mask').length).toBe(1);
  });

  it('onConfirm and onCancel correctly', () => {
    const wrapper = mount(<DemoTest />);
    function open() {
      wrapper
        .find('button')
        .filterWhere((n) => n.text() === 'Open')
        .simulate('click');
    }
    open();
    expect($('.arco-modal-wrapper')[0].style.display).toBe('block');
    wrapper
      .find('button')
      .filterWhere((n) => n.text() === '确定')
      .simulate('click');
    jest.runAllTimers();
    expect($('.arco-modal-wrapper')[0].style.display).toBe('none');

    jest.useFakeTimers();
    open();
    expect($('.arco-modal-wrapper')[0].style.display).toBe('block');
    wrapper
      .find('button')
      .filterWhere((n) => n.text() === '取消')
      .simulate('click');
    jest.runAllTimers();
    expect($('.arco-modal-wrapper')[0].style.display).toBe('none');
  });

  it('close Modal with esc keydown event and focusLock is false', () => {
    jest.useFakeTimers();
    const onCancel = jest.fn();
    Modal.confirm({
      title: 'title',
      content: 'content',
      focusLock: false,
      onCancel,
    });
    Modal.error({
      title: 'title',
      content: 'content',
      focusLock: false,
      onCancel,
    });
    jest.runAllTimers();
    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(2);
    TestUtils.Simulate.keyDown(document.querySelectorAll('.arco-modal-wrapper')[0], {
      key: Esc.key,
    });
    jest.runAllTimers();
    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('close Modal with esc keydown event and focusLock and autoFocus is true', () => {
    jest.useFakeTimers();
    const onCancel = jest.fn();
    Modal.confirm({
      title: 'title',
      content: 'content',
      onCancel,
    });
    Modal.error({
      title: 'title',
      content: 'content',
      onCancel,
    });
    jest.runAllTimers();
    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(2);
    TestUtils.Simulate.keyDown(document.querySelectorAll('[data-focus-lock-disabled]')[0], {
      key: Esc.key,
    });
    jest.runAllTimers();
    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('close Modal with escToExit is false', () => {
    jest.useFakeTimers();
    const onCancel = jest.fn();
    Modal.confirm({
      title: 'title',
      escToExit: false,
      content: 'content',
      onCancel,
    });
    jest.runAllTimers();
    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(1);
    TestUtils.Simulate.keyDown(document.querySelectorAll('.arco-modal-wrapper')[0], {
      key: Esc.key,
    });
    jest.runAllTimers();
    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(1);
    expect(onCancel).toHaveBeenCalledTimes(0);
    jest.useRealTimers();
  });
});

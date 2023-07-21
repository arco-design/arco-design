import React, { useState } from 'react';
import mountTest from '../../../tests/mountTest';
import Modal from '..';
import Button from '../../Button';
import { $, render, fireEvent, cleanup } from '../../../tests/util';
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
    cleanup();
    document.body.innerHTML = '';
    jest.runAllTimers();
  });

  it('renders correctly', () => {
    const component = render(
      <div>
        <Modal title="Title" visible>
          Content
        </Modal>
        <Modal title="Title" visible mask={false}>
          Content
        </Modal>
      </div>
    );
    expect(component.container.firstChild).toMatchSnapshot();
  });

  it('closeIcon correctly', () => {
    const component = render(
      <div>
        <Modal title="Title" visible closeIcon="xxx">
          Content
        </Modal>
      </div>
    );
    expect(component.querySelector('.arco-modal-close-icon').textContent).toBe('xxx');
  });

  it('open modal correctly', () => {
    const wrapper = render(<DemoTest />);
    expect(wrapper.find('.arco-modal')).toHaveLength(0);
    // modal mask correctly
    expect($('.arco-modal-mask').length).toBe(0);

    fireEvent.click(wrapper.queryByText('Open') as Element);

    expect(wrapper.find('.arco-modal')).toHaveLength(1);
    expect(wrapper.querySelector('.arco-modal-wrapper')).toHaveStyle('display: block');

    expect($('.arco-modal-mask').length).toBe(1);

    fireEvent.click(wrapper.querySelector('.arco-modal-close-icon'));

    jest.runAllTimers();

    expect(wrapper.querySelector('.arco-modal-wrapper')).toHaveStyle('display: none');
    expect($('.arco-modal-mask').length).toBe(1);
  });

  it('onConfirm and onCancel correctly', () => {
    const wrapper = render(<DemoTest />);
    function open() {
      fireEvent.click(wrapper.queryByText('Open') as Element);
    }
    open();
    expect($('.arco-modal-wrapper')[0].style.display).toBe('block');
    fireEvent.click(wrapper.queryByText('确定') as Element);
    jest.runAllTimers();
    expect($('.arco-modal-wrapper')[0].style.display).toBe('none');

    jest.useFakeTimers();
    open();
    expect($('.arco-modal-wrapper')[0].style.display).toBe('block');
    fireEvent.click(wrapper.queryByText('取消') as Element);

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
    fireEvent.keyDown(document.querySelectorAll('.arco-modal-wrapper')[0], {
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
    fireEvent.keyDown(document.querySelectorAll('[data-focus-lock-disabled]')[0], {
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
    fireEvent.keyDown(document.querySelectorAll('.arco-modal-wrapper')[0], {
      key: Esc.key,
    });
    jest.runAllTimers();
    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(1);
    expect(onCancel).toHaveBeenCalledTimes(0);
    jest.useRealTimers();
  });

  it('clear Modal dom ', () => {
    jest.useFakeTimers();
    const wrapper = render(
      <Modal visible unmountOnExit>
        haha
      </Modal>
    );

    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(1);

    wrapper.rerender(
      <Modal visible={false} unmountOnExit>
        haha
      </Modal>
    );

    jest.runAllTimers();
    expect(document.querySelectorAll(`.arco-modal-wrapper`)).toHaveLength(0);
    jest.useRealTimers();
  });
});

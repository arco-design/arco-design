import mountTest from '../../../tests/mountTest';
import Modal from '..';
import { $, sleep } from '../../../tests/util';

mountTest(Modal);

/*
 * 测试modal中各个api
 */

describe('Modal config test', () => {
  it('title is null', () => {
    jest.useFakeTimers();
    const modal = Modal.info({
      title: null,
      icon: null,
    });

    jest.runAllTimers();

    expect($('.arco-modal-title').length).toBe(0);

    modal.close();
  });
  it('icons', () => {
    let modal;
    jest.useFakeTimers();
    modal = Modal.confirm({
      title: 'confirm',
      unmountOnExit: true,
    });
    jest.runAllTimers();

    expect($('.arco-modal-title .arco-icon-exclamation-circle-fill').length).toBe(1);
    jest.useFakeTimers();
    modal.close();
    modal = Modal.info({
      title: 'info',
      unmountOnExit: true,
    });
    jest.runAllTimers();

    expect($('.arco-modal-title .arco-icon-info-circle-fill').length).toBe(1);

    jest.useFakeTimers();
    modal.close();

    modal = Modal.success({
      title: 'success',
      unmountOnExit: true,
    });
    jest.runAllTimers();
    expect($('.arco-modal-title .arco-icon-check-circle-fill').length).toBe(1);

    jest.useFakeTimers();
    modal.close();
    modal = Modal.warning({
      title: 'error',
      unmountOnExit: true,
    });
    jest.runAllTimers();
    expect($('.arco-modal-title .arco-icon-exclamation-circle-fill').length).toBe(1);

    jest.useFakeTimers();
    modal.close();

    modal = Modal.error({
      title: '123',
      unmountOnExit: true,
    });
    jest.runAllTimers();
    expect($('.arco-modal-title .arco-icon-close-circle-fill').length).toBe(1);
    modal.close();
  });
  it('onOk', () => {
    const okMockFn = jest.fn();
    jest.useFakeTimers();

    const modal = Modal.confirm({
      title: '123',
      onOk: okMockFn,
      unmountOnExit: true,
    });

    jest.runAllTimers();

    // 默认icon
    expect($('.arco-modal-title > span > .arco-icon').length).toBe(1);
    expect($('.arco-modal-footer button').length).toBe(2);

    // 确定按钮
    $('.arco-modal-footer button')[1].click();
    expect(okMockFn).toBeCalledTimes(1);
    modal.close();
  });

  it('oncancel', () => {
    const cancelMockFn = jest.fn();
    jest.useFakeTimers();

    const modal = Modal.info({
      title: '123',
      simple: false,
      unmountOnExit: true,
      onCancel: cancelMockFn,
    });

    jest.runAllTimers();

    // 确定按钮
    $('.arco-modal-close-icon')[0].click();
    expect(cancelMockFn).toBeCalledTimes(1);
    modal.close();
  });

  it('update and close', () => {
    const closeFn = jest.fn();
    jest.useFakeTimers();
    const modal = Modal.info({
      afterClose: closeFn,
      title: 'Info',
      icon: null,
      unmountOnExit: true,
    });

    jest.runAllTimers();

    // 确定按钮
    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>Info</span>');

    modal.update({ title: 'Updated Title' });
    expect($('.arco-modal-title')[0].innerHTML).toBe('<span>Updated Title</span>');

    jest.useFakeTimers();
    modal.close();
    jest.runAllTimers();

    expect(closeFn).toBeCalledTimes(1);

    expect($('.arco-modal').length).toBe(0);
  });

  it('promise', () => {
    jest.useFakeTimers();
    const modal = Modal.info({
      title: '123',
      unmountOnExit: true,
      onOk: () => {
        return Promise.resolve();
      },
    });

    jest.runAllTimers();

    $('.arco-modal-footer button')[0].click();

    expect($('.arco-modal-footer .arco-icon-loading').length).toBe(1);

    modal.close();
  });

  it('promise reject', async () => {
    const catchError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const error = new Error('error');

    jest.useFakeTimers();
    const modal = Modal.info({
      title: '123',
      unmountOnExit: true,
      onOk: () => {
        return new Promise((_, reject) => {
          reject(error);
        });
      },
    });

    jest.runAllTimers();
    jest.useRealTimers();

    $('.arco-modal-footer button')[0].click();

    expect($('.arco-modal-footer .arco-icon-loading').length).toBe(1);
    await sleep(0);

    expect($('.arco-modal-footer .arco-icon-loading').length).toBe(0);
    expect(catchError).toHaveBeenCalledWith(error);
    modal.close();
  });
});

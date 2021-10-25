import mountTest from '../../../tests/mountTest';
import Modal from '..';

mountTest(Modal);

/*
 * 测试config方法
 */

describe('Modal popup test', () => {
  beforeEach(() => {
    Modal.config({
      prefixCls: 'aaa',
      simple: false,
    });
  });

  afterEach(() => {
    Modal.config({
      prefixCls: 'arco',
      simple: true,
    });
  });

  it('render correctly', () => {
    jest.useFakeTimers();
    Modal.info({ title: 123 });
    jest.runAllTimers();

    expect(document.querySelectorAll('.aaa-modal').length).toBe(1);
    expect(document.querySelectorAll('.aaa-modal-simple').length).toBe(0);
  });
});

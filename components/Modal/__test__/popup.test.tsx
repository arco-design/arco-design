import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Modal from '..';
import Select from '../../Select';
import { $ } from '../../../tests/util';

mountTest(Modal);

/*
 * 测试modal中的popup
 */

describe('Modal popup test', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.runAllTimers();
  });

  it('popup correctly', () => {
    const wrapper = mount(
      <div>
        <Modal title="Title" visible>
          <Select options={[1, 2, 3]} />
        </Modal>
      </div>
    );
    jest.useFakeTimers();

    wrapper.find('Select').simulate('click');

    jest.runAllTimers();

    expect($('.arco-select-popup').length).toBe(1);
    expect($('.arco-select-popup')[0].parentNode.style['z-index']).toBe('1050');
    // dom插入在 content下。
    expect($('.arco-modal-content .arco-select-popup').length).toBe(1);
  });

  it('getChildrenPopupContainer correctly', () => {
    const wrapper = mount(
      <Modal
        title="Title"
        visible
        getChildrenPopupContainer={() => {
          // console.log(document.querySelector('.test'));
          return document.querySelector('.test');
        }}
      >
        <div className="test">
          <Select options={[1, 2, 3]} />
        </div>
      </Modal>
    );

    jest.useFakeTimers();

    wrapper.find('Select').simulate('click');
    jest.runAllTimers();

    expect($('.arco-select-popup').length).toBe(1);
    // dom插入在 test 下
    expect($('.test .arco-select-popup').length).toBe(1);
  });
});

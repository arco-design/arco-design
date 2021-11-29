import React, { useState } from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Modal from '..';
import Button from '../../Button';
import { $ } from '../../../tests/util';

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
});

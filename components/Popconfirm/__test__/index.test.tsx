import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Popconfirm from '..';
import { sleep, $ } from '../../../tests/util';

mountTest(Popconfirm);

describe('Popconfirm', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('render correctly', () => {
    const component = mount(
      <Popconfirm title="Are you Ok?">
        <span>Edit</span>
      </Popconfirm>
    );

    const triggerEle = component.find('span');

    expect(component.find('.arco-popconfirm').length).toBe(0);

    triggerEle.simulate('click');

    expect(component.find('.arco-popconfirm').length).toBe(1);
    expect(component.find('.arco-popconfirm-title-text').text()).toBe('Are you Ok?');
  });

  it('onOk and onCancel correctly', async () => {
    const onOk = jest.fn();
    const onCancel = jest.fn();
    const component = mount(
      <Popconfirm title="Are you Ok?" onOk={onOk} onCancel={onCancel}>
        <span>Edit</span>
      </Popconfirm>
    );

    const triggerEle = component.find('span');

    triggerEle.simulate('click');

    expect($('.arco-popconfirm').length).toBe(1);

    // onCancel
    component.find('Button').at(0).simulate('click');

    expect(onCancel).toBeCalled();

    await sleep(400);

    expect($('.arco-popconfirm').length).toBe(0);

    triggerEle.simulate('click');

    expect($('.arco-popconfirm').length).toBe(1);

    // onOk
    component.find('Button').at(1).simulate('click');

    expect(onOk).toBeCalled();

    await sleep(400);

    expect($('.arco-popconfirm').length).toBe(0);
  });

  it('Async close correctly', async () => {
    const onOk = jest.fn();
    const asyncOnOk = async () => {
      await sleep(300);
      onOk();
    };
    const component = mount(
      <Popconfirm title="Are you Ok?" onOk={asyncOnOk}>
        <span>Edit</span>
      </Popconfirm>
    );

    const triggerEle = component.find('span');

    triggerEle.simulate('click');

    component.find('Button').at(1).simulate('click');

    expect($('.arco-popconfirm').length).toBe(1);
    expect(onOk).not.toBeCalled();

    await sleep(700);

    expect($('.arco-popconfirm').length).toBe(0);
    expect(onOk).toBeCalled();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Spin from '..';
import Alert from '../../Alert';

mountTest(Spin);
componentConfigTest(Spin, 'Spin');

describe('Spin', () => {
  beforeEach(() => {
    /*
     * Calling runAllTimers after using lodash's debounce results in an infinite recursion error
     * https://github.com/facebook/jest/issues/3465
     */
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('loading content correctly', () => {
    const wrapper = mount(
      <Spin loading>
        <Alert type="info" content="Content" />
      </Spin>
    );
    expect(wrapper.find('.arco-spin-children').length).toBe(1);
  });

  it('spin with dot loading', () => {
    const wrapper = mount(
      <Spin loading dot>
        <Alert type="info" content="Content" />
      </Spin>
    );
    expect(wrapper.find('.arco-spin-dot-list').length).toBe(1);
  });

  it('loading delay', () => {
    const wrapper = mount(
      <Spin loading delay={500}>
        <Alert type="info" content="Content" />
      </Spin>
    );

    expect(wrapper.find('.arco-spin-loading-layer').length).toBe(0);
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.arco-spin-loading-layer').length).toBe(1);
  });

  it('spin with display:block', () => {
    const wrapper = mount(
      <Spin loading block>
        <Alert type="info" content="Content" />
      </Spin>
    );

    expect(wrapper.find('.arco-spin-block').length).toBe(1);
  });
});

import React from 'react';
import { render } from '../../../tests/util';
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
    const wrapper = render(
      <Spin loading>
        <Alert type="info" content="Content" />
      </Spin>
    );
    expect(wrapper.find('.arco-spin-children').length).toBe(1);
  });

  it('spin with dot loading', () => {
    const wrapper = render(
      <Spin loading dot>
        <Alert type="info" content="Content" />
      </Spin>
    );
    expect(wrapper.find('.arco-spin-dot-list').length).toBe(1);
  });

  it('loading delay', () => {
    const wrapper = render(
      <Spin loading delay={500}>
        <Alert type="info" content="Content" />
      </Spin>
    );

    expect(wrapper.find('.arco-spin-loading-layer').length).toBe(0);
    jest.runAllTimers();
    expect(wrapper.find('.arco-spin-loading-layer').length).toBe(1);
  });

  it('spin with display:block', () => {
    const wrapper = render(
      <Spin loading block>
        <Alert type="info" content="Content" />
      </Spin>
    );

    expect(wrapper.find('.arco-spin-block').length).toBe(1);
  });

  it('render children while it is 0/NaN', () => {
    const wrapper0 = render(<Spin>{0}</Spin>);
    expect(wrapper0.find('div')[0]).toHaveTextContent('0');
  });
});

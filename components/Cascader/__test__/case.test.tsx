import React from 'react';
import Cascader from '../cascader';
import { render } from '../../../tests/util';

const options = [
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'shanghaishi',
        label: '上海市',
      },
    ],
  },
];

describe('Cascader basic test', () => {
  // 生命周期
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    // 运行所有定时器
    jest.runAllTimers();
  });

  it('string[] correctly', () => {
    const wrapper = render(
      <Cascader defaultValue={['shanghai', 'shanghaishi']} options={options} mode="multiple" />
    );

    expect(wrapper.querySelector('.arco-tag-content')?.textContent).toBe('');
  });

  it('string[][] correctly', () => {
    const wrapper = render(
      <Cascader
        defaultValue={[['shanghai', 'shanghaishi'], 'xxx']}
        options={options}
        mode="multiple"
      />
    );

    expect(wrapper.querySelectorAll('.arco-tag-content').item(1)?.textContent).toBe('');
  });
});

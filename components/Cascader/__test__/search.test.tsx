import React from 'react';
import Cascader from '../cascader';
import { fireEvent, render } from '../../../tests/util';

const prefixCls = '.arco-cascader';
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

function mountCascader(component: React.ReactElement) {
  return render(component);
}

describe('Cascader search', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('multiply select correctly', async () => {
    const mockFn = jest.fn();
    const wrapper = mountCascader(
      <Cascader
        placeholder="Please enter ..."
        mode="multiple"
        style={{ width: 300 }}
        options={[]}
        onSearch={mockFn}
        showSearch
      />
    );
    fireEvent.click(wrapper.querySelector('.arco-cascader-view'));
    expect(wrapper.find(`${prefixCls}-list`)).toHaveLength(0);
    fireEvent.change(wrapper.container.querySelector('input') as Element, {
      target: { value: '1' },
    });

    jest.runAllTimers();

    expect(mockFn).toBeCalledTimes(1); // 得到mock函数被触发的次数
    expect(mockFn.mock.calls[0][0]).toEqual('1');

    wrapper.rerender(
      <Cascader
        placeholder="Please enter ..."
        mode="multiple"
        style={{ width: 300 }}
        options={options}
        onSearch={mockFn}
      />
    );
    jest.runAllTimers();
    expect(wrapper.find(`${prefixCls}-list-item`)).toHaveLength(1);
  });
});

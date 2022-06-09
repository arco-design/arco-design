import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import Cascader from '../cascader';
import { CascaderProps } from '../interface';

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

function mountCascader<T>(component: React.ReactElement) {
  return mount<typeof Cascader, React.PropsWithChildren<CascaderProps<T>>>(component);
}

describe('Cascader search', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('multiply select correctly', () => {
    const wrapper = mountCascader(
      <Cascader
        placeholder="Please enter ..."
        mode="multiple"
        style={{ width: 300 }}
        options={[]}
        onSearch={() => {
          wrapper.setProps({
            options,
          } as any);
        }}
      />
    );

    act(() => {
      wrapper.find(prefixCls).simulate('click');
    });

    expect(wrapper.find(`${prefixCls}-list`)).toHaveLength(0);

    act(() => {
      wrapper.find('input').simulate('change', {
        target: 1,
      });
    });

    expect(wrapper.find(`${prefixCls}-list-item`)).toHaveLength(1);
  });
});

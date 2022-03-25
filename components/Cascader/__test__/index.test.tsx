import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Cascader from '../cascader';
import { CascaderProps } from '../interface';

mountTest(Cascader);
componentConfigTest(Cascader, 'Cascader');

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

// 模块

describe('Cascader basic test', () => {
  // 生命周期
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    // 运行所有定时器
    jest.runAllTimers();
  });

  it('popupChange correctly', () => {
    const mockFn = jest.fn();
    const wrapper = mountCascader(<Cascader options={options} onVisibleChange={mockFn} />);
    // 找到class为.arco-cascader dom
    wrapper.find(prefixCls).simulate('click');
    expect(mockFn).toHaveBeenCalledWith(true); // 被调用，传入参数为true
    // 展开第一级
    expect(wrapper.find(`${prefixCls}-list`)).toHaveLength(1);
    wrapper.find(prefixCls).simulate('click');
    // 消失有动画的延时
    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledWith(false); // 传入参数false
  });

  it('select correctly', async () => {
    const mockChange = jest.fn();
    const mockFn = jest.fn();

    const wrapper = mountCascader(
      <Cascader onVisibleChange={mockFn} options={options} onChange={mockChange} />
    );
    // 展开一层
    wrapper.find(prefixCls).simulate('click');
    const list1 = wrapper.find(`${prefixCls}-list`);
    // 展开第二层
    await act(() => {
      list1.find(`${prefixCls}-list-item ${prefixCls}-list-item-label`).simulate('click');
    });
    expect(wrapper.find(`${prefixCls}-list`)).toHaveLength(2);

    const list2 = wrapper.find(`${prefixCls}-list`).last();
    await act(() => {
      list2.find(`${prefixCls}-list-item ${prefixCls}-list-item-label`).simulate('click');
    });
    // onChange事件触发
    expect(mockChange).toBeCalledTimes(1); // 得到mock函数被触发的次数
    expect(mockChange.mock.calls[0][0]).toEqual(['shanghai', 'shanghaishi']);
    expect(mockChange.mock.calls[0][1].map((item) => item.value)).toEqual([
      'shanghai',
      'shanghaishi',
    ]);

    expect(wrapper.find('input').prop('value')).toBe('上海 / 上海市');
    // 消失有动画的延时
    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledWith(false); // 传入参数false
  });

  it('changeOnselect correctly', () => {
    const wrapper = mountCascader(<Cascader options={options} changeOnSelect />);
    // 展开一层
    wrapper.find(prefixCls).simulate('click');
    const list1 = wrapper.find(`${prefixCls}-list`);
    list1.find(`${prefixCls}-list-item ${prefixCls}-list-item-label`).simulate('click');
    expect(wrapper.find('input').prop('value')).toBe('上海');
  });
});

describe('support clear correctly', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  const defaultValue = ['shanghai', 'shanghaishi'];
  const wrapper = mountCascader(
    <Cascader options={options} defaultValue={defaultValue} allowClear />
  );

  // 默认选中值正确
  it('set defaultValue correctly', () => {
    expect(wrapper.find('input').prop('value')).toBe('上海 / 上海市');
    wrapper.find(prefixCls).simulate('click');

    expect(wrapper.find('.arco-cascader-list')).toHaveLength(2);
  });

  // 清除值正确
  it('clear value correctly', () => {
    wrapper.find('IconClose').simulate('click');
    expect(wrapper.find(`${prefixCls}-view`).text()).toBe('');
    wrapper.find(prefixCls).simulate('click');
  });
});

describe('support multiple correctly', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });
  const options = [
    {
      value: 'beijing',
      label: '北京',
      children: [
        {
          value: 'beijingshi',
          label: '北京市',
          children: [
            {
              value: 'chaoyang',
              label: '朝阳区',
              children: [
                {
                  value: 'datunli',
                  label: '大屯里',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: '东城区',
            },
            {
              value: 'xicheng',
              label: '西城区',
            },
            {
              value: 'haidian',
              label: '海淀区',
            },
          ],
        },
      ],
    },
  ];

  it('multiply select correctly', () => {
    let value = [['beijing', 'beijingshi', 'chaoyang', 'datunli']];
    let option;
    const wrapper = mountCascader(
      <Cascader
        placeholder="请选择一个地点"
        style={{ maxWidth: 300 }}
        options={options}
        onChange={(v, o) => {
          value = v as string[][];
          option = o;
        }}
        mode="multiple"
        defaultValue={value}
      />
    );
    wrapper.find(prefixCls).simulate('click');
    expect(wrapper.find(`${prefixCls}-list`)).toHaveLength(4);
    const list = wrapper.find(`${prefixCls}-list`).at(2);
    list
      .find(`${prefixCls}-list-item`)
      .at(0)
      .find('.arco-checkbox > input')
      .simulate('change', {
        target: {
          checked: false,
        },
      });

    jest.runAllTimers();
    expect(value).toEqual([]);
    list
      .find(`${prefixCls}-list-item`)
      .at(1)
      .find('.arco-checkbox > input')
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    list
      .find(`${prefixCls}-list-item`)
      .at(2)
      .find('.arco-checkbox > input')
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    expect(value.length).toEqual(2);
    expect(option.length).toEqual(2);
  });

  it('multiply select checkedStrategy correctly', () => {
    let value = [['beijing', 'beijingshi', 'chaoyang', 'datunli']];
    const wrapper = mountCascader(
      <Cascader
        renderFormat={(values) => values.join('-')}
        placeholder="请选择一个地点"
        style={{ maxWidth: 300 }}
        options={options}
        onChange={(v) => {
          value = v as string[][];
        }}
        checkedStrategy="parent"
        mode="multiple"
        defaultValue={value}
      />
    );
    expect(wrapper.find('.arco-tag > span').at(0).text()).toBe(`北京-北京市-朝阳区`);

    wrapper.find(prefixCls).simulate('click');
    const list = wrapper.find(`${prefixCls}-list`).at(0);
    list
      .find(`${prefixCls}-list-item`)
      .at(0)
      .find('.arco-checkbox > input')
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    jest.runAllTimers();
    expect(value).toEqual([['beijing']]);
  });

  it('support multiply search correctly', () => {
    // const wrapper = mountCascader(<Cascader  options={options} showSearch mode="multiple" />);
    // wrapper.find(prefixCls).simulate('click');
    // wrapper.find(`${prefixCls}-view-search>input`).simulate('change', {
    //   target: {
    //     value: '北京',
    //   },
    // });
    // const store = wrapper.find('Cascader').instance().store;
    // const mockSearch = jest.spyOn(store, 'searchNodeByLabel');
  });

  describe('loadmore', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    const options = [
      {
        value: 'beijing',
        label: '北京',
      },
      {
        value: 'shanghai',
        label: '上海',
      },
    ];
    const mockfn = jest.fn();
    it('loadmore correctly', () => {
      const wrapper = mountCascader(
        <Cascader
          style={{ maxWidth: 300 }}
          options={options}
          loadMore={mockfn}
          showSearch
          mode="multiple"
        />
      );
      wrapper.find(prefixCls).simulate('click');
      const list = wrapper.find(`${prefixCls}-list`).first();
      list.find(`${prefixCls}-list-item ${prefixCls}-list-item-label`).at(0).simulate('click');
      expect(mockfn.mock.calls).toHaveLength(1);
    });

    it('value control', () => {
      // const Demo = function() {
      //   const [value, setValue] = React.useState([]);
      //   return (
      //     <Cascader
      //       placeholder="请选择一个地点"
      //       options={options}
      //       mode="multiple"
      //       value={value}
      //       onChange={setValue}
      //     />
      //   );
      // };
      // const wrapper = mountCascader(<Demo />);
      // const cascader = wrapper.find('Cascader');
      // cascader.find(prefixCls).simulate('click');
      // const list1 = cascader.find(`${prefixCls}-list`);
      // list1.find(`${prefixCls}-list-item ${prefixCls}-list-item-label`).simulate('click');
    });
  });
});

describe('fieldNames Cascader', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });
  const options = [
    {
      id: 'beijing',
      name: '北京',
      child: [
        {
          id: 'beijingshi',
          name: '北京市',
          child: [
            {
              id: 'chaoyang',
              name: '朝阳区',
              child: [
                {
                  id: 'datunli',
                  name: '大屯里',
                },
              ],
            },
            {
              id: 'dongcheng',
              name: '东城区',
            },
            {
              id: 'xicheng',
              name: '西城区',
            },
            {
              id: 'haidian',
              name: '海淀区',
            },
          ],
        },
      ],
    },
  ];

  it('multiply select correctly', () => {
    let value;
    const wrapper = mountCascader(
      <Cascader
        fieldNames={{
          label: 'name',
          value: 'id',
          children: 'child',
        }}
        placeholder="请选择一个地点"
        onChange={(v) => {
          value = v;
        }}
        style={{ maxWidth: 300 }}
        options={options}
        mode="multiple"
        defaultValue={[['beijing', 'beijingshi', 'chaoyang', 'datunli']]}
      />
    );
    expect(wrapper.find('Tag').length).toBe(1);
    wrapper.find(prefixCls).simulate('click');
    expect(wrapper.find(`${prefixCls}-list`)).toHaveLength(4);
    const list = wrapper.find(`${prefixCls}-list`).at(2);
    list
      .find(`${prefixCls}-list-item`)
      .at(0)
      .find('.arco-checkbox > input')
      .simulate('change', {
        target: {
          checked: false,
        },
      });

    expect(value.length).toBe(0);
    list
      .find(`${prefixCls}-list-item`)
      .at(1)
      .find('.arco-checkbox > input')
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    list
      .find(`${prefixCls}-list-item`)
      .at(2)
      .find('.arco-checkbox > input')
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    expect(value.length).toBe(2);
  });

  describe('loadmore', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    const options = [
      {
        id: 'beijing',
        name: '北京',
      },
      {
        id: 'shanghai',
        name: '上海',
      },
    ];
    const mockfn = jest.fn();
    it('loadmore correctly', () => {
      const wrapper = mountCascader(
        <Cascader
          fieldNames={{ label: 'name', isLeaf: 'is-leaf', value: 'id' }}
          style={{ maxWidth: 300 }}
          options={options}
          loadMore={mockfn}
          showSearch
          mode="multiple"
        />
      );
      wrapper.find(prefixCls).simulate('click');
      const list = wrapper.find(`${prefixCls}-list`).first();
      list.find(`${prefixCls}-list-item ${prefixCls}-list-item-label`).at(0).simulate('click');
      expect(mockfn.mock.calls).toHaveLength(1);
    });
  });
});

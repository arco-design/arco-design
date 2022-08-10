import React from 'react';
import { render, fireEvent } from '../../../tests/util';
import TreeSelect from '..';
import { normalizeValueToArray } from '../utils';

const treeData = [
  {
    key: 'node1',
    title: '拉尼斯特家族',
    value: '拉尼斯特家族',
    children: [
      {
        key: 'node1-1',
        title: '小恶魔',
        value: '小恶魔',
      },
    ],
  },
  {
    key: 'node2',
    title: '史塔克家族',
    value: '史塔克家族',
    children: [
      {
        key: 'node2-1',
        title: '二丫',
        value: '二丫',
      },
      {
        key: 'node2-2',
        title: '三傻',
        value: '三傻',
      },
    ],
  },
];

const prefixCls = '.arco-tree';

const clickInput = () => {
  fireEvent.click(document.querySelector('.arco-tree-select-view') as Element);
};

describe('TreeSelect', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('popOver expand and collapse', () => {
    const mockVisibleChange = jest.fn();
    const wrapper = render(
      <TreeSelect
        onVisibleChange={mockVisibleChange}
        treeData={[{ title: <div>123</div>, key: '123' }, ...treeData]}
      />
    );
    clickInput();
    expect(wrapper.find('.arco-tree')).toHaveLength(1);
    expect(mockVisibleChange).toHaveBeenCalledTimes(1);
    clickInput();
    // 消失有动画的延时
    jest.runAllTimers();
    expect(mockVisibleChange).toHaveBeenCalledTimes(2);
    expect(mockVisibleChange.mock.calls[1]).toEqual([false]);
    // todo
    // expect(wrapper.find('Tree')).toHaveLength(0);
  });

  it('select correctly', () => {
    const mockChange = jest.fn();
    const wrapper = render(<TreeSelect onChange={mockChange} treeData={treeData} />);
    clickInput();

    // 第一次点击
    fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(0));
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange.mock.calls[0][0]).toEqual('node1');

    // 第二次点击
    clickInput();
    fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(1));
    expect(mockChange).toHaveBeenCalledTimes(2);
    expect(wrapper.querySelector('.arco-tree-select-view-value')?.textContent).toBe('小恶魔');
    expect(mockChange.mock.calls[1][0]).toEqual('node1-1');
  });

  it('be controlled', () => {
    const wrapper = render(<TreeSelect treeData={treeData} value="node1-1" />);
    expect(wrapper.querySelector('.arco-tree-select-view-value')?.textContent).toBe('小恶魔');
    expect(wrapper.querySelector('input')?.getAttribute('value')).toBe('小恶魔');

    wrapper.rerender(<TreeSelect treeData={treeData} value="node2" />);

    expect(wrapper.querySelector('input')?.getAttribute('value')).toBe('史塔克家族');
  });

  it('options loadMore', () => {
    const mockHandleLoadMore = jest.fn();
    const wrapper = render(<TreeSelect treeData={treeData} loadMore={mockHandleLoadMore} />);

    clickInput();
    const treeNode = wrapper.find(`${prefixCls}-node`);
    expect(wrapper.find(`${prefixCls}-node-switcher-icon`)).toHaveLength(treeNode.length);
    fireEvent.click(
      treeNode[treeNode.length - 1].querySelector(`${prefixCls}-node-switcher-icon`) as any
    );
    expect(mockHandleLoadMore).toHaveBeenCalledTimes(1);
  });

  it('options loadMore function', () => {
    const mockLoad = jest.fn();
    const wrapper = render(<TreeSelect treeData={treeData} loadMore={mockLoad} />);
    clickInput();

    const treeNode = wrapper.find(`${prefixCls}-node`);
    fireEvent.click(
      treeNode[treeNode.length - 1]?.querySelector(`${prefixCls}-node-switcher-icon`) as any
    );
    expect(mockLoad).toHaveBeenCalledTimes(1);
  });

  it('search operation', () => {
    const wrapper = render(<TreeSelect treeData={treeData} showSearch />);
    clickInput();
    expect(wrapper.find(`${prefixCls}-select-view input`)).toHaveLength(1);
    fireEvent.change(wrapper.find('input').item(0), { target: { value: '小' } });
    jest.runAllTimers();
    jest.advanceTimersByTime(200);
    expect(wrapper.find('.arco-tree-node')).toHaveLength(2);
  });

  it('showSearch = retainInputValueWhileSelect ', () => {
    const wrapper = render(
      <TreeSelect
        multiple
        treeData={treeData}
        showSearch={{ retainInputValueWhileSelect: false }}
      />
    );
    clickInput();
    expect(wrapper.find(`${prefixCls}-select-view input`)).toHaveLength(1);

    fireEvent.change(wrapper.find('input').item(0), { target: { value: '小' } });
    jest.runAllTimers();
    jest.advanceTimersByTime(200);
    expect(wrapper.querySelector(`${prefixCls}-select-view input`)?.textContent).toBe('');
  });

  it('define onSearch props', () => {
    const mockSearch = jest.fn();
    const wrapper = render(<TreeSelect treeData={treeData} showSearch onSearch={mockSearch} />);
    clickInput();
    expect(wrapper.find(`${prefixCls}-select-view input`)).toHaveLength(1);

    fireEvent.change(wrapper.find('input').item(0), { target: { value: '小' } });
    jest.runAllTimers();
    jest.advanceTimersByTime(200);
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });
  it('labelInValue props', () => {
    let values = [
      { label: 'ceshi', value: '1111' },
      { label: 'ceshi2', value: '123123123' },
    ];
    const wrapper = render(
      <TreeSelect
        treeData={treeData}
        labelInValue
        multiple
        value={values}
        onChange={(v) => (values = v)}
      />
    );
    const choice = wrapper.find('.arco-tag');
    expect(choice).toHaveLength(2);
    expect(choice.item(0).textContent).toBe('ceshi');
    expect(choice.item(1).textContent).toBe('ceshi2');

    fireEvent.click(choice.item(1).querySelector('svg') as any);

    expect(values).toEqual([{ label: 'ceshi', value: '1111' }]);

    wrapper.rerender(
      <TreeSelect
        treeData={treeData}
        labelInValue
        multiple
        value={values}
        onChange={(v) => (values = v)}
      />
    );

    expect(wrapper.find('.arco-tag')).toHaveLength(2);
    expect(wrapper.find('.arco-tag').item(0).textContent).toBe('ceshi');
  });

  it('allowClear props', () => {
    let value = '';
    const wrapper = render(
      <TreeSelect treeData={treeData} allowClear onChange={(v) => (value = v)} />
    );

    clickInput();

    // 第一次点击
    fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(0));
    expect(value).toBe('node1');

    fireEvent.click(wrapper.find(`.arco-icon-close`).item(0));

    expect(value).toBe(undefined);
  });

  it('disabled tree-select', () => {
    const wrapper = render(<TreeSelect treeData={treeData} value="node1-1" disabled />);
    expect(wrapper.find(`${prefixCls}-select-disabled`)).toHaveLength(1);
    expect(wrapper.find('IconClose')).toHaveLength(0);

    clickInput();
    expect(wrapper.find('Tree')).toHaveLength(0);
  });

  describe('treeCheckable', () => {
    it('checkable correctly', () => {
      let stateValue = ['node1-1'];
      const wrapper = render(
        <TreeSelect
          treeCheckable
          defaultValue={['node1']}
          treeData={treeData}
          allowClear
          onChange={(v) => (stateValue = v)}
        />
      );
      expect(normalizeValueToArray(stateValue)).toEqual(['node1-1']);
      clickInput();

      expect(wrapper.find('.arco-checkbox')).toHaveLength(wrapper.find('.arco-tree-node').length);
      const nodes = wrapper.find(`${prefixCls}-node`);
      fireEvent.click(nodes[nodes.length - 1].querySelector(`${prefixCls}-node-title`) as Element);

      expect(stateValue).toHaveLength(2);

      fireEvent.click(
        wrapper
          .find(`${prefixCls}-node`)
          .item(2)
          .querySelector(`${prefixCls}-node-title`) as Element
      );
      expect(stateValue).toHaveLength(3);
    });

    it('checkable correctly when checkStrictly', () => {
      // let value = ['node1'];
      // const wrapper = render(
      //   <TreeSelect
      //     treeCheckable
      //     treeCheckStrictly
      //     value={value}
      //     onChange={(v) => (value = v)}
      //     treeData={treeData}
      //     allowClear
      //   />
      // );
      // const test = function() {
      //   expect(wrapper.find('.arco-tag')).toHaveLength(1);
      //   clickInput()
      //   const tree = wrapper.find('Tree');
      //   expect(tree.prop('checkable')).toBe(true);
      //   tree
      //     .find(`${prefixCls}-node`)
      //     .last()
      //     .find(`${prefixCls}-node-title`)
      //     .simulate('click');
      //   expect(value).toEqual(['node1', 'node2-2']);
      //   wrapper.setProps({ value: ['node1', 'node2-2'] });
      //   expect(wrapper.find('.arco-tag')).toHaveLength(2);
      // };
      // test();
      // // treeCheckStrictly 优先级高于treeCheckedStrategy
      // wrapper.setProps({
      //   treeCheckedStrategy: TreeSelect.SHOW_PARENT,
      //   value: ['node1'],
      // });
      // test();
    });

    it('checkable correctly when checkStrategy is parent', () => {
      let value = ['node1-1'];
      const wrapper = render(
        <TreeSelect
          treeCheckable
          treeCheckedStrategy={TreeSelect.SHOW_PARENT}
          value={value}
          onChange={(v) => {
            value = v;
          }}
          treeData={treeData}
          allowClear
        />
      );
      expect(wrapper.find('.arco-tag')).toHaveLength(1);
      expect(wrapper.find('.arco-tag').item(0).textContent).toEqual('拉尼斯特家族');

      clickInput();

      const nodes = wrapper.find(`${prefixCls}-node`);

      fireEvent.click(nodes[nodes.length - 1].querySelector(`${prefixCls}-node-title`) as any);
      expect(value).toEqual(['node1', 'node2-2']);

      wrapper.rerender(
        <TreeSelect
          treeCheckable
          treeCheckedStrategy={TreeSelect.SHOW_PARENT}
          value={[...value]}
          onChange={(v) => {
            value = v;
          }}
          treeData={treeData}
          allowClear
        />
      );
      jest.runAllTimers();

      expect(wrapper.find('.arco-tag').item(1).textContent).toBe('三傻');

      fireEvent.click(
        wrapper
          .find(`${prefixCls}-node`)
          .item(3)
          .querySelector(`${prefixCls}-node-title`) as Element
      );

      expect(value).toEqual(['node1', 'node2']);
      wrapper.rerender(
        <TreeSelect
          treeCheckable
          treeCheckedStrategy={TreeSelect.SHOW_PARENT}
          value={value}
          onChange={(v) => {
            value = v;
          }}
          treeData={treeData}
          allowClear
        />
      );

      expect(wrapper.find('.arco-tag')).toHaveLength(2);
      expect(wrapper.find('.arco-tag').item(1).textContent).toBe('史塔克家族');
    });

    // it('checkable correctly when checkStrategy is child', () => {
    //   let value = ['node1'];
    //   const wrapper = render(
    //     <TreeSelect
    //       treeCheckable
    //       treeCheckedStrategy={TreeSelect.SHOW_CHILD}
    //       value={value}
    //       onChange={(v) => (value = v)}
    //       treeData={treeData}
    //       allowClear
    //     />
    //   );
    //   expect(wrapper.find('.arco-tag')).toHaveLength(1);
    //   expect(
    //     wrapper
    //       .find('.arco-tag')
    //       .item(0)
    //       .textContent
    //   ).toBe('小恶魔');

    //   clickInput()
    //   const tree = wrapper.find('Tree');
    //   tree
    //     .find(`${prefixCls}-node`)
    //     .item(2)
    //     .find(`${prefixCls}-node-title`)
    //     .first()
    //     .simulate('click');
    //   expect(value).toEqual(['node1-1', 'node2-1', 'node2-2']);
    //   wrapper.setProps({ value });
    //   expect(wrapper.find('.arco-tag')).toHaveLength(3);
    // });
    // it('checkable correctly when checkStrategy is all', async () => {
    //   let value = ['node1'];
    //   const wrapper = render(
    //     <TreeSelect
    //       treeCheckable
    //       treeCheckedStrategy={TreeSelect.SHOW_ALL}
    //       value={value}
    //       onChange={(v) => (value = v)}
    //       treeData={treeData}
    //       allowClear
    //     />
    //   );
    //   expect(wrapper.find('.arco-tag')).toHaveLength(2);
    //   expect(
    //     wrapper
    //       .find('.arco-tag')
    //       .item(0)
    //       .textContent
    //   ).toBe('拉尼斯特家族');
    //   expect(
    //     wrapper
    //       .find('.arco-tag')
    //       .item(1)
    //       .textContent
    //   ).toBe('小恶魔');
    //   clickInput()

    //   const tree = wrapper.find('Tree');
    //   tree
    //     .find(`${prefixCls}-node`)
    //     .item(2)
    //     .find(`${prefixCls}-node-title`)
    //     .simulate('click');
    //   expect(value).toHaveLength(5);
    //   wrapper.setProps({ value });

    //   await sleep(20);
    //   // TODO: fix this
    //   // expect(wrapper.find('.arco-tag')).toHaveLength(5);
    //   tree
    //     .find(`${prefixCls}-node`)
    //     .last()
    //     .find(`${prefixCls}-node-title`)
    //     .simulate('click');
    //   expect(value).toEqual(['node1-1', 'node2-1', 'node1']);
    //   wrapper.setProps({ value });
    //   await sleep(10);
    //   // TODO: fix this
    //   // expect(wrapper.find('.arco-tag')).toHaveLength(3);
    // });
  });

  it('test disable props', () => {
    const data = [
      {
        key: 'node3',
        title: 'node3',
        children: [
          {
            key: 'node3-1',
            title: 'node3-1',
            children: [...treeData],
          },
          {
            key: 'node3-2',
            title: 'node3-2',
          },
        ],
      },
    ];

    let value: string[] = [];
    const wrapper = render(
      <TreeSelect
        treeCheckable
        value={value}
        onChange={(v) => (value = v)}
        treeData={data}
        allowClear
      />
    );

    const rerender = (props) => {
      wrapper.rerender(
        <TreeSelect
          treeCheckable
          value={value}
          onChange={(v) => (value = v)}
          treeData={data}
          allowClear
          {...props}
        />
      );
    };
    clickInput();

    const testDisableProps = () => {
      rerender({
        treeData: [...data],
        value: [],
      });

      fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(0));
      expect(value).toEqual(['node3-2']);
      rerender({
        treeData: [...data],
        value,
      });

      fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(1));
      expect(value).toEqual(['node3-2']);
      rerender({
        treeData: [...data],
        value,
      });

      fireEvent.click(wrapper.find(`${prefixCls}-node-title`).item(2));
      expect(value).toEqual(['node3-2', 'node1-1']);
    };
    // @ts-ignore
    data[0].children[0].disabled = true;

    testDisableProps();
    // @ts-ignore
    data[0].children[0].disabled = false;
    // @ts-ignore
    data[0].children[0].disableCheckbox = true;
    testDisableProps();
    // @ts-ignore
    data[0].children[0].disableCheckbox = false;
    // @ts-ignore
    data[0].children[0].checkable = false;
    testDisableProps();
    // @ts-ignore
    data[0].children[0].checkable = true;
  });

  it('test remove item', () => {
    const data = [
      {
        key: 'node3',
        title: 'node3',
        disabled: true,
      },
    ];
    let value = ['node2', 'node3'];

    const wrapper = render(
      <TreeSelect
        treeCheckable
        value={value}
        onChange={(v) => (value = v)}
        treeData={[...treeData, ...data]}
        allowClear
      />
    );
    const removeIcon = wrapper.find('.arco-tag .arco-icon-close');

    const tags = wrapper.find('.arco-tag');
    expect(tags).toHaveLength(3);

    expect(tags.item(0).textContent).toBe('node3');
    expect(tags.item(1).textContent).toBe('二丫');
    expect(tags.item(2).textContent).toBe('三傻');

    expect(removeIcon).toHaveLength(2);
    fireEvent.click(removeIcon.item(0));

    expect(value).toEqual(['node3', 'node2-2']);
  });

  it('onSearch ', () => {
    const mockSearch = jest.fn();
    const searchData = (inputValue) => {
      const loop = (data) => {
        const result: any[] = [];
        data.forEach((item: any) => {
          if (item.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
            result.push({ ...item });
          } else if (item.children) {
            const filterData = loop(item.children);

            if (filterData.length) {
              result.push({ ...item, children: filterData });
            }
          }
        });
        return result;
      };

      return loop(treeData);
    };
    let value = [];

    const wrapper = render(
      <TreeSelect
        treeCheckable
        value={value}
        onChange={(v) => {
          value = v;
        }}
        treeData={treeData}
        showSearch
        onSearch={mockSearch}
      />
    );

    const rerender = (props) => {
      wrapper.rerender(
        <TreeSelect
          treeCheckable
          value={value}
          treeData={treeData}
          onChange={(v) => {
            value = v;
          }}
          showSearch
          onSearch={mockSearch}
          {...props}
        />
      );
    };
    clickInput();

    // 小恶魔
    fireEvent.click(wrapper.find('.arco-tree-node-title').item(1));

    rerender({ value });

    expect(wrapper.find('.arco-tag')).toHaveLength(1);

    expect(wrapper.find(`${prefixCls}-select-view input`)).toHaveLength(1);

    fireEvent.change(wrapper.find('input').item(0), { target: { value: '二丫' } });

    rerender({ value, treeData: searchData('二丫') });

    expect(wrapper.find('.arco-tree-node')).toHaveLength(2);
    expect(wrapper.querySelector('.arco-tag')?.textContent).toBe('小恶魔');

    fireEvent.click(wrapper.find('.arco-tree-node-title').item(1));

    rerender({ value, treeData: searchData('二丫') });

    expect(wrapper.find('.arco-tag')).toHaveLength(2);
    expect(wrapper.querySelectorAll('.arco-tag').item(0)?.textContent).toBe('小恶魔');
    expect(wrapper.querySelectorAll('.arco-tag').item(1)?.textContent).toBe('二丫');
  });
});

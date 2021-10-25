import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
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

describe('TreeSelect', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('popOver expand and collapse', () => {
    const mockVisibleChange = jest.fn();
    const wrapper = mount(
      <TreeSelect
        onVisibleChange={mockVisibleChange}
        treeData={[{ title: <div>123</div>, key: '123' }, ...treeData]}
      />
    );
    wrapper.simulate('click');
    expect(wrapper.find('Tree')).toHaveLength(1);
    expect(mockVisibleChange).toHaveBeenCalledTimes(1);
    wrapper.simulate('click');
    // 消失有动画的延时
    jest.runAllTimers();
    expect(mockVisibleChange).toHaveBeenCalledTimes(2);
    expect(mockVisibleChange.mock.calls[1]).toEqual([false]);
    // todo
    // expect(wrapper.find('Tree')).toHaveLength(0);
  });

  it('select correctly', () => {
    const mockChange = jest.fn();
    const wrapper = mount(<TreeSelect onChange={mockChange} treeData={treeData} />);
    wrapper.simulate('click');

    const Tree = wrapper.find('Tree');

    // 第一次点击
    Tree.find(`${prefixCls}-node`)
      .first()
      .find(`${prefixCls}-node-title`)
      .first()
      .simulate('click');
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange.mock.calls[0]).toEqual(['node1']);

    // 第二次点击
    wrapper.simulate('click');
    Tree.find(`${prefixCls}-node`)
      .at(1)
      .find(`${prefixCls}-node-title`)
      .last()
      .simulate('click');
    expect(mockChange).toHaveBeenCalledTimes(2);
    expect(wrapper.find('.arco-tree-select-view-value').text()).toBe('小恶魔');
    expect(mockChange.mock.calls[1]).toEqual(['node1-1']);
  });

  it('be controlled', () => {
    const wrapper = mount(<TreeSelect treeData={treeData} value="node1-1" />);
    expect(wrapper.find('.arco-tree-select-view-value').text()).toBe('小恶魔');
    expect(wrapper.find('input').prop('value')).toBe('小恶魔');

    wrapper.setProps({
      value: 'node2',
    });

    // TODO check here
    // expect(wrapper.find('input').prop('value')).toBe('史塔克家族');
  });

  it('options loadMore', () => {
    // TODO: 此处`loadMore`类型及单测逻辑存在问题，待修正后移除`@ts-ignore`
    // @ts-ignore
    const mockHandleLoadMore = jest.fn();
    const wrapper = mount(<TreeSelect treeData={treeData} loadMore={mockHandleLoadMore} />);

    wrapper.simulate('click');
    const Tree = wrapper.find('Tree');
    const treeNode = Tree.find(`${prefixCls}-node`);
    expect(wrapper.find(`${prefixCls}-node-switcher-icon`)).toHaveLength(treeNode.length);
    treeNode
      .last()
      .find(`${prefixCls}-node-switcher-icon`)
      .first()
      .simulate('click');
    expect(mockHandleLoadMore).toHaveBeenCalledTimes(1);
  });

  it('options loadMore function', () => {
    const mockLoad = jest.fn();
    const wrapper = mount(<TreeSelect treeData={treeData} loadMore={mockLoad} />);
    wrapper.simulate('click');
    const Tree = wrapper.find('Tree');
    const treeNode = Tree.find(`${prefixCls}-node`);
    treeNode
      .last()
      .find(`${prefixCls}-node-switcher-icon`)
      .first()
      .simulate('click');
    expect(mockLoad).toHaveBeenCalledTimes(1);
  });

  it('search operation', () => {
    const wrapper = mount(<TreeSelect treeData={treeData} showSearch />);
    wrapper.simulate('click');
    expect(wrapper.find(`${prefixCls}-select-view`).find('input')).toHaveLength(1);
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '小' } });
    jest.runAllTimers();
    jest.advanceTimersByTime(200);
    // expect(wrapper.find('Node')).toHaveLength(2);
  });

  it('showSearch = retainInputValueWhileSelect ', () => {
    const wrapper = mount(
      <TreeSelect
        multiple
        treeData={treeData}
        showSearch={{ retainInputValueWhileSelect: false }}
      />
    );
    wrapper.simulate('click');
    expect(wrapper.find(`${prefixCls}-select-view`).find('input')).toHaveLength(1);
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '小' } });
    jest.runAllTimers();
    jest.advanceTimersByTime(200);
    expect(
      wrapper
        .find(`${prefixCls}-select-view`)
        .find('input')
        .text()
    ).toBe('');
  });

  it('define onSearch props', () => {
    const mockSearch = jest.fn();
    const wrapper = mount(<TreeSelect treeData={treeData} showSearch onSearch={mockSearch} />);
    wrapper.simulate('click');
    expect(wrapper.find(`${prefixCls}-select-view`).find('input')).toHaveLength(1);
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '小' } });
    jest.runAllTimers();
    jest.advanceTimersByTime(200);
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });
  it('labelInValue props', () => {
    let values = [
      { label: 'ceshi', value: '1111' },
      { label: 'ceshi2', value: '123123123' },
    ];
    const wrapper = mount(
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
    expect(choice.at(0).text()).toBe('ceshi');
    expect(choice.at(1).text()).toBe('ceshi2');

    choice
      .at(1)
      .find('svg')
      .simulate('click');

    expect(values).toEqual([{ label: 'ceshi', value: '1111' }]);

    wrapper.setProps({ value: values });

    expect(wrapper.find('.arco-tag')).toHaveLength(2);
    expect(
      wrapper
        .find('.arco-tag')
        .at(0)
        .text()
    ).toBe('ceshi');
  });

  it('allowClear props', () => {
    let value = '';
    const wrapper = mount(
      <TreeSelect treeData={treeData} allowClear onChange={(v) => (value = v)} />
    );

    wrapper.simulate('click');
    const Tree = wrapper.find('Tree');
    // 第一次点击
    Tree.find(`${prefixCls}-node-title`)
      .first()
      .simulate('click');
    expect(value).toBe('node1');

    wrapper.find('IconClose').simulate('click');

    expect(value).toBe(undefined);
  });

  it('disabled tree-select', () => {
    const wrapper = mount(<TreeSelect treeData={treeData} value="node1-1" disabled />);
    expect(wrapper.find(`${prefixCls}-select-disabled`)).toHaveLength(1);
    expect(wrapper.find('IconClose')).toHaveLength(0);

    wrapper.simulate('click');
    expect(wrapper.find('Tree')).toHaveLength(0);
  });

  describe('treeCheckable', () => {
    it('checkable correctly', () => {
      let stateValue = ['node1-1'];
      const wrapper = mount(
        <TreeSelect
          treeCheckable
          defaultValue={['node1']}
          treeData={treeData}
          allowClear
          onChange={(v) => (stateValue = v)}
        />
      );
      expect(normalizeValueToArray(stateValue)).toEqual(['node1-1']);
      wrapper.simulate('click');

      const tree = wrapper.find('Tree');
      expect(tree.prop('checkable')).toBe(true);

      tree
        .find(`${prefixCls}-node`)
        .last()
        .find(`${prefixCls}-node-title`)
        .first()
        .simulate('click');

      expect(stateValue).toHaveLength(2);

      tree
        .find(`${prefixCls}-node`)
        .at(2)
        .find(`${prefixCls}-node-title`)
        .first()
        .simulate('click');
      expect(stateValue).toHaveLength(3);
    });

    it('checkable correctly when checkStrictly', () => {
      // let value = ['node1'];
      // const wrapper = mount(
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
      //   wrapper.simulate('click');
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
      const wrapper = mount(
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
      expect(
        wrapper
          .find('.arco-tag')
          .at(0)
          .text()
      ).toEqual('拉尼斯特家族');

      wrapper.simulate('click');
      const tree = wrapper.find('Tree');

      act(() => {
        tree
          .find(`${prefixCls}-node`)
          .last()
          .find(`${prefixCls}-node-title`)
          .simulate('click');
      });
      expect(value).toEqual(['node1', 'node2-2']);

      wrapper.setProps({ value: [...value] });

      // TODO: fixme
      // expect(
      //   wrapper
      //     .find('.arco-tag')
      //     .at(1)
      //     .text()
      // ).toBe('三傻');

      act(() => {
        tree
          .find(`${prefixCls}-node`)
          .at(3)
          .find(`${prefixCls}-node-title`)
          .first()
          .simulate('click');
      });
      expect(value).toEqual(['node1', 'node2']);
      wrapper.setProps({ value });

      expect(wrapper.find('.arco-tag')).toHaveLength(2);
      expect(
        wrapper
          .find('.arco-tag')
          .at(1)
          .text()
      ).toBe('史塔克家族');
    });

    // it('checkable correctly when checkStrategy is child', () => {
    //   let value = ['node1'];
    //   const wrapper = mount(
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
    //       .at(0)
    //       .text()
    //   ).toBe('小恶魔');

    //   wrapper.simulate('click');
    //   const tree = wrapper.find('Tree');
    //   tree
    //     .find(`${prefixCls}-node`)
    //     .at(2)
    //     .find(`${prefixCls}-node-title`)
    //     .first()
    //     .simulate('click');
    //   expect(value).toEqual(['node1-1', 'node2-1', 'node2-2']);
    //   wrapper.setProps({ value });
    //   expect(wrapper.find('.arco-tag')).toHaveLength(3);
    // });
    // it('checkable correctly when checkStrategy is all', async () => {
    //   let value = ['node1'];
    //   const wrapper = mount(
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
    //       .at(0)
    //       .text()
    //   ).toBe('拉尼斯特家族');
    //   expect(
    //     wrapper
    //       .find('.arco-tag')
    //       .at(1)
    //       .text()
    //   ).toBe('小恶魔');
    //   wrapper.simulate('click');

    //   const tree = wrapper.find('Tree');
    //   tree
    //     .find(`${prefixCls}-node`)
    //     .at(2)
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
    const wrapper = mount(
      <TreeSelect
        treeCheckable
        value={value}
        onChange={(v) => (value = v)}
        treeData={data}
        allowClear
      />
    );
    wrapper.simulate('click');
    const tree = wrapper.find('Tree');

    const testDisableProps = () => {
      wrapper.setProps({
        treeData: [...data],
        value: [],
      });

      tree
        .find(`${prefixCls}-node-title`)
        .first()
        .simulate('click');
      expect(value).toEqual(['node3-2']);
      wrapper.setProps({ value });

      tree
        .find(`${prefixCls}-node-title`)
        .at(1)
        .simulate('click');
      expect(value).toEqual(['node3-2']);
      wrapper.setProps({ value });

      tree
        .find(`${prefixCls}-node-title`)
        .at(2)
        .simulate('click');
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

    const wrapper = mount(
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

    expect(tags.at(0).text()).toBe('node3');
    expect(tags.at(1).text()).toBe('二丫');
    expect(tags.at(2).text()).toBe('三傻');

    expect(removeIcon).toHaveLength(2);
    removeIcon.at(0).simulate('click');

    // TODO check here
    // expect(value).toEqual(['node3', 'node2-2']);
  });
});

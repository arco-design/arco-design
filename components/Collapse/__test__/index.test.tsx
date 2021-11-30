import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Collapse from '../collapse';
import { IconInfoCircle, IconPlus } from '../../../icon';

mountTest(Collapse);
componentConfigTest(Collapse, 'Collapse');

const CollapseItem = Collapse.Item;

const prefixCls = '.arco-collapse';

const data = [
  {
    header: '琼恩·雪诺',
    content:
      '艾德公爵的私生儿子，与罗柏·史塔克同龄，兄弟关系亲密无间。其母身份不明，艾德公爵拒绝向任何人透露——有人传说那是南方某家族的一位贵族小姐，也有人说是一个寻常的使女。',
  },
  {
    header: '丹尼莉丝·坦格利安',
    content:
      '坦格利安王朝的末代君王伊里斯·坦格利安二世的幼女，银发紫眼，美貌异于常人。丹妮莉丝出生时一场剧烈的风暴袭击了龙石岛，“风暴降生”因此得名。',
  },
  {
    header: '提利昂·兰尼斯特',
    content:
      '泰温公爵和乔安娜夫人的第三个也是最小的孩子。因为是个侏儒，他有时候被戏称为小恶魔和半人。他利用自己的智慧屡次化险为夷，帮助兰尼斯特家族赢得了五王之战，但命运的不公使得他成为了一个弑亲者和通缉犯，踏上了流亡之路。',
  },
];

// eslint-disable-next-line
beforeAll(() => {
  //  https://github.com/yiminghe/css-animation/blob/a5986d73fd7dfce75665337f39b91483d63a4c8c/src/Event.js#L44
  // @ts-ignore
  window.AnimationEvent = window.AnimationEvent || (() => {});
  // @ts-ignore
  window.TransitionEvent = window.TransitionEvent || (() => {});
});

// eslint-disable-next-line
afterAll(() => {
  delete window.AnimationEvent;
  delete window.TransitionEvent;
});

describe('Collapse', () => {
  it('collapse render basic', () => {
    const wrapper = mount(
      <Collapse defaultActiveKey="1">
        {data.map((item, index) => (
          <CollapseItem key={index} header={item.header} name={index.toString()}>
            {item.content}
          </CollapseItem>
        ))}
      </Collapse>
    );

    expect(wrapper.find(`${prefixCls}-item`)).toHaveLength(data.length);
    expect(wrapper.find(`${prefixCls}-item`).at(1).hasClass(`arco-collapse-item-active`)).toBe(
      true
    );
  });

  it('collapse expandIcon', () => {
    const wrapper = mount(
      <Collapse>
        <CollapseItem key="1" header={data[0].header} expandIcon={<IconPlus />} name="2">
          {data[0].content}
        </CollapseItem>
        <CollapseItem header={data[1].header} showExpandIcon={false} name="1">
          {data[1].content}
        </CollapseItem>
      </Collapse>
    );

    expect(wrapper.find(`${prefixCls}-item`)).toHaveLength(2);
    expect(wrapper.find(`${prefixCls}-item`).at(0).find('IconPlus')).toHaveLength(1);
    expect(wrapper.find(`${prefixCls}-item`).at(1).find('IconPlus')).toHaveLength(0);
    expect(wrapper.find(`${prefixCls}-item`).at(1).hasClass('arco-collapse-item-no-icon')).toBe(
      true
    );
  });

  it('could be expand and collapse', () => {
    jest.useFakeTimers();
    const changeCollapse = jest.fn();
    const activeKeys = ['2'];
    const wrapper = mount(
      <Collapse defaultActiveKey={activeKeys} onChange={changeCollapse}>
        {data.map((item, index) => (
          <CollapseItem key={index} header={item.header} name={index.toString()}>
            {item.content}
          </CollapseItem>
        ))}
      </Collapse>
    );

    expect(wrapper.find(`${prefixCls}-item-active`)).toHaveLength(activeKeys.length);
    wrapper
      .find(`${prefixCls}-item-active`)
      .first()
      .find(`${prefixCls}-item-header`)
      .simulate('click');
    expect(wrapper.find(`${prefixCls}-item-active`)).toHaveLength(0);
    expect(changeCollapse.mock.calls).toHaveLength(1);

    for (let i = 0; i < data.length; i++) {
      wrapper.find(`${prefixCls}-item-header`).at(i).simulate('click');
    }

    expect(wrapper.find(`${prefixCls}-item-active`)).toHaveLength(data.length);
  });

  it('render correctly when content empty', () => {
    const wrapper = mount(
      <Collapse>
        {[].map((item, index) => (
          <CollapseItem key={index} header={item.header} name={index.toString()}>
            {item.content}
          </CollapseItem>
        ))}
      </Collapse>
    );
    expect(wrapper.find('Collapse')).toHaveLength(1);
    expect(wrapper.find('CollapseItem')).toHaveLength(0);
  });

  it('render self header correctly', () => {
    const wrapper = mount(
      <Collapse>
        {data.map((item, index) => (
          <CollapseItem
            key={index}
            header={
              <div>
                {item.header} <IconInfoCircle style={{ color: '#939aa3', marginLeft: 4 }} />{' '}
              </div>
            }
            name={index.toString()}
          >
            {item.content}
          </CollapseItem>
        ))}
      </Collapse>
    );
    expect(wrapper.find('IconInfoCircle')).toHaveLength(data.length);
  });

  it('expand and collapse correctly when accordion', () => {
    jest.useFakeTimers();
    let activeKey;
    const wrapper = mount(
      <Collapse
        accordion
        onChange={(_, keys) => {
          activeKey = keys;
        }}
      >
        {data.map((item, index) => (
          <CollapseItem key={index} header={item.header} name={String(index)}>
            {item.content}
          </CollapseItem>
        ))}
      </Collapse>
    );

    for (let i = 0; i < data.length; i++) {
      wrapper.find(`${prefixCls}-item-header`).at(i).simulate('click');
    }

    expect(activeKey).toHaveLength(1);
    expect(activeKey[0]).toEqual(String(data.length - 1));
  });

  it('expand and collapse correctly when set disabled', () => {
    jest.useFakeTimers();
    let activeKey;
    const changeCollapse = (_, keys) => {
      activeKey = keys;
    };
    const disabledIndex = 2;
    const wrapper = mount(
      <Collapse onChange={changeCollapse}>
        {data.map((item, index) => (
          <CollapseItem
            key={index}
            header={item.header}
            name={index.toString()}
            disabled={index === disabledIndex}
          >
            {item.content}
          </CollapseItem>
        ))}
      </Collapse>
    );
    for (let i = 0; i < data.length; i++) {
      wrapper.find(`${prefixCls}-item-header`).at(i).simulate('click');
    }

    expect(activeKey).toHaveLength(data.length - 1);

    expect(
      wrapper
        .find(`${prefixCls}-item-header`)
        .at(disabledIndex)
        .hasClass(`arco-collapse-item-header-disabled`)
    ).toBe(true);
  });

  it('render extra correctly', () => {
    const wrapper = mount(
      <Collapse expandIconPosition="right" expandIcon={<IconPlus />}>
        {data.map((item, index) => (
          <CollapseItem
            key={index}
            header={item.header}
            name={index.toString()}
            extra={<IconInfoCircle />}
          >
            {item.content}
          </CollapseItem>
        ))}
      </Collapse>
    );
    expect(wrapper.find('IconInfoCircle')).toHaveLength(data.length);
    expect(wrapper.find('IconPlus')).toHaveLength(data.length);
    expect(
      wrapper.find('.arco-collapse-item-header').at(0).hasClass('arco-collapse-item-header-right')
    );
  });

  it('render lazyload correctly', () => {
    const wrapper = mount(
      <Collapse lazyload defaultActiveKey={['0']}>
        {data.map((item, index) => (
          <CollapseItem
            key={index}
            header={item.header}
            name={index.toString()}
            extra={<IconInfoCircle />}
          >
            {item.content}
          </CollapseItem>
        ))}
      </Collapse>
    );
    expect(wrapper.find('.arco-collapse-item-content')).toHaveLength(1);
    wrapper.find(`${prefixCls}-item-header`).at(1).simulate('click');
    expect(wrapper.find('.arco-collapse-item-content')).toHaveLength(2);
  });
});

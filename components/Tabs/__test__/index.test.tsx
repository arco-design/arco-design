import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Tabs, { TabsProps } from '..';

mountTest(Tabs);
componentConfigTest(Tabs, 'Tabs');

const TabPane = Tabs.TabPane;

function createDemo(props: React.PropsWithChildren<TabsProps>) {
  return (
    <Tabs {...props}>
      <TabPane destroyOnHide key="1" title="Tab 1">
        <div>Tab 1 Content</div>
      </TabPane>
      <TabPane destroyOnHide key="2" title="Tab 2">
        <div>Tab 2 Content</div>
      </TabPane>
      <TabPane destroyOnHide key="3" title="Tab 3">
        <div>Tab 3 Content</div>
      </TabPane>
    </Tabs>
  );
}

const initTabs = [...new Array(5)].map((_, i) => ({
  title: `标签${i + 1}`,
  key: `key${i + 1}`,
  content: `标签${i + 1}`,
}));

describe('Tabs', () => {
  it('onClickTab listener correctly', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      createDemo({
        onClickTab: mockFn,
      })
    );
    const tabBars = wrapper.find('.arco-tabs-header-title');
    expect(tabBars.at(0).hasClass('arco-tabs-header-title-active')).toBe(true);
    tabBars.at(1).simulate('click');
    expect(
      wrapper.find('.arco-tabs-header-title').at(1).hasClass('arco-tabs-header-title-active')
    ).toBe(true);
    expect(mockFn.mock.calls.length).toBe(1);
  });
  it('onChange listener correctly', () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      createDemo({
        onChange: mockFn,
      })
    );
    const tabBars = wrapper.find('.arco-tabs-header-title');
    expect(tabBars.at(0).hasClass('arco-tabs-header-title-active')).toBe(true);
    tabBars.at(1).simulate('click');
    expect(
      wrapper.find('.arco-tabs-header-title').at(1).hasClass('arco-tabs-header-title-active')
    ).toBe(true);
    expect(mockFn.mock.calls.length).toBe(1);
    tabBars.at(1).simulate('click');
    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('onEditTab ', () => {
    let count = 0;
    let tabs = initTabs;

    const getChildren = () => {
      return tabs.map((x) => (
        <TabPane destroyOnHide key={x.key} title={x.title}>
          <div>{`这里是${x.content}`}</div>
        </TabPane>
      ));
    };

    const wrapper = mount(
      <Tabs
        editable
        type="card-gutter"
        onAddTab={() => {
          tabs.push({ key: String(count++), title: String(count), content: String(count) });
          wrapper.update();
        }}
        onDeleteTab={(key) => {
          tabs = tabs.filter((x) => x.key !== key);
        }}
      >
        {getChildren()}
      </Tabs>
    );
    wrapper.find('.arco-tabs-add-icon').simulate('click');

    expect(tabs.length).toBe(6);
    wrapper.setProps({ children: getChildren() });
    expect(wrapper.prop('children').length).toBe(6);

    wrapper.find('.arco-tabs-close-icon').at(0).simulate('click');
    expect(tabs.length).toBe(5);

    expect(tabs.findIndex((x) => x.key === 'key1')).toBe(-1);
    wrapper.setProps({ children: getChildren() });
    expect(wrapper.prop('children').length).toBe(5);

    wrapper.setProps({
      activeTab: 'key3',
    });

    expect(
      wrapper.find('.arco-tabs-header-title').at(1).hasClass('arco-tabs-header-title-active')
    ).toBe(true);

    wrapper.setProps({
      activeTab: 'key11100',
    });

    expect(
      wrapper.find('.arco-tabs-header-title').at(2).hasClass('arco-tabs-header-title-active')
    ).toBe(false);

    wrapper.setProps({
      activeTab: 'key2',
      onChange: (key) => {
        wrapper.setProps({ activeTab: key });
      },
    });

    expect(wrapper.prop('activeTab')).toBe('key2');

    wrapper.find('.arco-tabs-close-icon').at(0).simulate('click');
    wrapper.setProps({ children: getChildren() });

    expect(wrapper.find('.arco-tabs-content-item').length).toBe(getChildren().length);

    expect(
      wrapper.find('.arco-tabs-header-title').at(0).hasClass('arco-tabs-header-title-active')
    ).toBe(false);
  });
});

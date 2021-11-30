import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Tabs, { TabsProps } from '..';

mountTest(Tabs);

const TabPane = Tabs.TabPane;

function createDemo(props: TabsProps) {
  return (
    <Tabs {...props}>
      <TabPane key="1" title="Tab 1">
        <div className="content">Tab 1 Content</div>
      </TabPane>
      <TabPane key="2" title="Tab 2">
        <div className="content">Tab 2 Content</div>
      </TabPane>
      <TabPane key="3" title="Tab 3">
        <div className="content">Tab 3 Content</div>
      </TabPane>
    </Tabs>
  );
}

describe('Tabs lazyload', () => {
  it('lazyload', () => {
    const wrapper = mount(
      createDemo({
        lazyload: true,
      })
    );

    expect(wrapper.find('.content')).toHaveLength(1);
    const tabBars = wrapper.find('.arco-tabs-header-title');

    tabBars.at(2).simulate('click');
    expect(
      wrapper.find('.arco-tabs-header-title').at(2).hasClass('arco-tabs-header-title-active')
    ).toBe(true);
    expect(wrapper.find('.content')).toHaveLength(2);
  });

  it('destroyOnHide', () => {
    const wrapper = mount(
      createDemo({
        destroyOnHide: true,
      })
    );
    expect(wrapper.find('.content')).toHaveLength(1);
    const tabBars = wrapper.find('.arco-tabs-header-title');

    tabBars.at(2).simulate('click');
    expect(
      wrapper.find('.arco-tabs-header-title').at(2).hasClass('arco-tabs-header-title-active')
    ).toBe(true);
    expect(wrapper.find('.content')).toHaveLength(1);

    wrapper.setProps({ activeTab: '' });
    expect(wrapper.find('.content')).toHaveLength(0);
  });
});

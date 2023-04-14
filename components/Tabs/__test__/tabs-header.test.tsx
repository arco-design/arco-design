import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Tabs, { TabsProps } from '..';
import IconEdit from '../../../icon/react-icon/IconEdit';

mountTest(Tabs);
componentConfigTest(Tabs, 'Tabs');

const TabPane = Tabs.TabPane;

let getCount = 0;

// @ts-ignore
const _getHTMLOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth'
).get;

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

describe('Tabs Header Scroll', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get() {
        // width 递减，mock 选项卡头部滚动出现。
        return 1000 - 10 * ++getCount;
      },
    });
  });

  afterAll(() => {
    getCount = 0;
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get: _getHTMLOffsetHeight,
    });
  });

  it('Tabs Header replace dropdown icon', () => {
    const dropdownStr = 'Dropdown';
    const wrapper = render(
      createDemo({
        overflow: 'dropdown',
        icons: { dropdown: dropdownStr },
      })
    );
    expect(
      wrapper
        .find('.arco-tabs-header-scroll')[0]
        .className.includes('arco-tabs-header-overflow-dropdown')
    ).toBe(true);

    expect(wrapper.find('.arco-tabs-dropdown-icon')[0].innerHTML).toEqual(dropdownStr);
  });

  it('Tabs Header replace scroll icon', () => {
    const wrapper = render(
      createDemo({
        icons: { prev: <IconEdit /> },
      })
    );
    expect(
      wrapper
        .find('.arco-tabs-header-scroll')[0]
        .className.includes('arco-tabs-header-overflow-scroll')
    ).toBe(true);

    expect(wrapper.find('.arco-tabs-left-icon>.arco-icon-edit')).toHaveLength(1);
    expect(wrapper.find('.arco-tabs-right-icon>.arco-icon-right')).toHaveLength(1);
  });

  it('Tabs Header without scrollIcon', () => {
    const wrapper = render(
      createDemo({
        icons: { prev: null, next: null },
      })
    );
    expect(
      wrapper
        .find('.arco-tabs-header-scroll')[0]
        .className.includes('arco-tabs-header-overflow-scroll')
    ).toBe(true);

    expect(wrapper.find('.arco-tabs-left-icon')).toHaveLength(0);
    expect(wrapper.find('.arco-tabs-right-icon')).toHaveLength(0);
  });
});

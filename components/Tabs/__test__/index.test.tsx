import React from 'react';
import { act } from 'react-test-renderer';
import { render, fireEvent } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Tabs, { TabsProps } from '..';
import { ConfigProvider } from '../..';

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
    const wrapper = render(
      createDemo({
        onClickTab: mockFn,
      })
    );
    const tabBars = wrapper.find('.arco-tabs-header-title');
    expect(tabBars[0].classList.contains('arco-tabs-header-title-active')).toBe(true);
    act(() => {
      fireEvent.click(tabBars[1]);
    });
    expect(
      wrapper.find('.arco-tabs-header-title')[1].classList.contains('arco-tabs-header-title-active')
    ).toBe(true);
    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('onChange listener correctly', () => {
    const mockFn = jest.fn();
    const wrapper = render(
      createDemo({
        onChange: mockFn,
      })
    );
    const tabBars = wrapper.find('.arco-tabs-header-title');
    expect(tabBars[0].classList.contains('arco-tabs-header-title-active')).toBe(true);

    act(() => {
      fireEvent.click(tabBars[1]);
    });
    expect(
      wrapper.find('.arco-tabs-header-title')[1].classList.contains('arco-tabs-header-title-active')
    ).toBe(true);
    expect(mockFn.mock.calls.length).toBe(1);

    act(() => {
      fireEvent.click(tabBars[1]);
    });
    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('should show panel in right direction', () => {
    const mockFn = jest.fn();
    const wrapper = render(
      <ConfigProvider rtl>
        {createDemo({
          onChange: mockFn,
        })}
      </ConfigProvider>
    );
    const tabBars = wrapper.find('.arco-tabs-content-inner');
    expect(tabBars[0].style?.marginRight).not.toBe('');
    expect(tabBars[0].style?.marginLeft).toBe('');
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

    const updateComp = (props = {}, children) => {
      return (
        <Tabs
          editable
          type="card-gutter"
          onAddTab={() => {
            tabs.push({ key: String(count++), title: String(count), content: String(count) });
          }}
          onDeleteTab={(key) => {
            tabs = tabs.filter((x) => x.key !== key);
          }}
          {...props}
        >
          {children}
        </Tabs>
      );
    };
    const wrapper = render(
      <Tabs
        editable
        type="card-gutter"
        onAddTab={() => {
          tabs.push({ key: String(count++), title: String(count), content: String(count) });
        }}
        onDeleteTab={(key) => {
          tabs = tabs.filter((x) => x.key !== key);
        }}
      >
        {getChildren()}
      </Tabs>
    );
    act(() => {
      fireEvent.click(wrapper.find('.arco-tabs-add-icon')[0]);
    });

    expect(tabs.length).toBe(6);
    wrapper.rerender(updateComp({}, getChildren()));

    expect(wrapper.find('.arco-tabs-header-title').length).toBe(6);
    expect(wrapper.find('.arco-tabs-content-item').length).toBe(6);

    fireEvent.click(wrapper.find('.arco-tabs-close-icon')[0]);
    expect(tabs.length).toBe(5);

    expect(tabs.findIndex((x) => x.key === 'key1')).toBe(-1);

    act(() => {
      wrapper.rerender(updateComp({}, getChildren()));
    });

    expect(wrapper.find('.arco-tabs-header-title').length).toBe(5);
    expect(wrapper.find('.arco-tabs-content-item').length).toBe(5);

    act(() => {
      wrapper.rerender(updateComp({ activeTab: 'key3' }, getChildren()));
    });

    expect(
      wrapper.find('.arco-tabs-header-title')[1].classList.contains('arco-tabs-header-title-active')
    ).toBe(true);

    act(() => {
      wrapper.rerender(updateComp({ activeTab: 'key11100' }, getChildren()));
    });

    expect(
      wrapper.find('.arco-tabs-header-title')[2].classList.contains('arco-tabs-header-title-active')
    ).toBe(false);

    act(() => {
      wrapper.rerender(
        updateComp(
          {
            activeTab: 'key2',
            onChange: (key) => {
              wrapper.rerender(updateComp({ activeTab: key }, getChildren()));
            },
          },
          getChildren()
        )
      );
    });
    expect(wrapper.find('.arco-tabs-header-title-active')[0]).toHaveTextContent('标签2');
    act(() => {
      fireEvent.click(wrapper.find('.arco-tabs-close-icon')[0]);
      wrapper.rerender(updateComp({}, getChildren()));
    });

    expect(wrapper.find('.arco-tabs-content-item').length).toBe(getChildren().length);

    expect(
      wrapper.find('.arco-tabs-header-title')[0].classList.contains('arco-tabs-header-title-active')
    ).toBe(false);
  });
});

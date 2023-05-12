import React, { useRef } from 'react';
import { render, fireEvent } from '../../../tests/util';
import { requestAnimationFrameMock } from '../../../tests/mockRAF';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import { ListHandle, ListProps } from '../interface';
import List from '..';

mountTest(List);
componentConfigTest(List, 'List');
componentConfigTest(List.Item, 'List.Item');

const data = [
  {
    title: 'byte Title',
    content: 'content 1',
  },
  {
    title: 'byte Title 2',
    content: 'content 2',
  },
  {
    title: 'byte Title 3',
    content: 'content 3',
  },
];

function getDataSourceAndRender(count = 100): Pick<ListProps, 'dataSource' | 'render'> {
  return {
    dataSource: new Array(count)
      .fill(null)
      .map((_, index) => ({ title: `Title ${index}`, content: `Content ${index}` })),
    render: ({ title, content }, index) => {
      return (
        <List.Item key={index} title={title}>
          {content}
        </List.Item>
      );
    },
  };
}

describe('List', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    requestAnimationFrameMock.resetQueue();
  });
  afterEach(() => {
    jest.runAllTimers();
  });
  afterAll(() => {
    requestAnimationFrameMock.reset();
  });

  it('render item correctly', () => {
    const wrapper = render(
      <List
        dataSource={data}
        header="Header"
        footer="Footer"
        render={(item, index) => <List.Item key={index}>{item.title}</List.Item>}
      />
    );
    expect(wrapper.find('.arco-list-item')).toHaveLength(3);
  });

  it('renders empty list', () => {
    const wrapper = render(
      <List dataSource={[]} render={(_, index) => <List.Item key={index} />} />
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });

  it('renders empty loading', () => {
    const loading = true;
    const wrapper = render(
      <List loading={loading} dataSource={[]} render={(_, index) => <List.Item key={index} />} />
    );
    expect(wrapper.find('.arco-list-item')).toHaveLength(0);
    expect(wrapper.find('.arco-spin .arco-spin')).toHaveLength(1);
  });

  it('render pagination correctly', () => {
    const handlePaginationChange = jest.fn();
    const wrapper = render(
      <List
        dataSource={data}
        pagination={{
          pageSize: 1,
          onChange: handlePaginationChange,
        }}
        render={(item, index) => <List.Item key={index}>{item.title}</List.Item>}
      />
    );
    const paginationItems = wrapper.find('.arco-pagination-item');
    const nextIcon = paginationItems.item(paginationItems.length - 1);
    fireEvent.click(nextIcon);
    expect(handlePaginationChange).toBeCalledWith(2, 1);
  });

  it('render List with meta', () => {
    const wrapper = render(
      <List
        dataSource={data}
        render={(item, index) => {
          return (
            <List.Item key={index} extra="Extra" actions={['Action1', 'Action2']}>
              <List.Item.Meta avatar="Ava" title={item.title} description={item.content} />
            </List.Item>
          );
        }}
      />
    );
    expect(wrapper.find('.arco-list-item-meta-avatar')).toHaveLength(3);
    expect(wrapper.find('.arco-list-item-action').item(0).querySelectorAll('li')).toHaveLength(2);
  });

  it('render List with grid', () => {
    const itemCount = 12;
    const gridSpan = 8;
    const { dataSource, render: renderF } = getDataSourceAndRender(itemCount);

    const wrapper = render(
      <List render={renderF} dataSource={dataSource} grid={{ span: gridSpan }} />
    );

    expect(wrapper.find('.arco-list-content .arco-row').length).toBe(
      Math.ceil(itemCount / Math.floor(24 / gridSpan))
    );
  });

  it('List onReachBottom', () => {
    const onReachBottom = jest.fn();
    const { dataSource, render: renderF } = getDataSourceAndRender();
    const wrapper = render(
      <List render={renderF} dataSource={dataSource} onReachBottom={onReachBottom} />
    );

    fireEvent.scroll(wrapper.find('.arco-list')[0], { target: { scrollY: 100 } });

    jest.runAllTimers();

    expect(onReachBottom).toBeCalled();
  });

  it('List scroll', () => {
    const onListScroll = jest.fn();
    const { dataSource, render: renderF } = getDataSourceAndRender();
    const wrapper = render(
      <List render={renderF} dataSource={dataSource} onListScroll={onListScroll} />
    );

    fireEvent.scroll(wrapper.find('.arco-list')[0], { target: { scrollY: 100 } });

    jest.runAllTimers();

    expect(onListScroll).toBeCalled();
  });

  it('render List which is virtual', () => {
    const itemCount = 100;

    function VirtualListDemo() {
      const refList = useRef<ListHandle>(null);
      const { dataSource, render } = getDataSourceAndRender(itemCount);
      return (
        <div>
          <div
            className="scroll-to"
            onClick={() => {
              refList.current?.scrollIntoView(itemCount - 1);
            }}
          >
            Scroll To End
          </div>
          <List
            listRef={refList}
            render={render}
            dataSource={dataSource}
            virtualListProps={{ height: 300 }}
          />
        </div>
      );
    }

    const wrapper = render(<VirtualListDemo />);
    expect(wrapper.find('.arco-list-item').length).toBeLessThan(itemCount);
  });

  it(`List pagination property works`, () => {
    const dataSource = new Array(100).fill(null).map((_, index) => index);
    const wrapper = render(
      <List
        render={(item) => <List.Item key={item}>{item}</List.Item>}
        dataSource={dataSource}
        pagination={{
          defaultPageSize: 30,
          defaultCurrent: 3,
          sizeCanChange: true,
        }}
      />
    );
    expect(wrapper.find('.arco-pagination .arco-select')).toHaveLength(1);
    expect(wrapper.find('.arco-list-item-content').item(0).innerHTML).toBe('60');
  });

  it('List render callback has correct parameter:index', () => {
    const itemCount = 10;
    const wrapper = render(
      <List
        grid={{ span: 8 }}
        dataSource={new Array(itemCount).fill(null)}
        bordered={false}
        render={(_, index) => <List.Item>{index + 1}</List.Item>}
      />
    );

    expect(wrapper.find('.arco-list-item-content').item(itemCount - 1)).toHaveTextContent(
      `${itemCount}`
    );
  });
});

import React, { useRef, useState } from 'react';
import { fireEvent } from '@testing-library/dom';

import VirtualList from '../index';
import { requestAnimationFrameMock } from '../../../../tests/mockRAF';
import { act, render, sleep } from '../../../../tests/util';

function getData(size: number) {
  return new Array(size).fill(null).map((_, index) => ({ content: `Content ${index}` }));
}

function getKeyedData(size: number) {
  return new Array(size).fill(null).map((_, index) => ({
    key: `item-${index}`,
    content: `Content ${index}`,
  }));
}

function mockElementSize() {
  const descriptors = {
    clientHeight: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight'),
    scrollHeight: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight'),
    offsetHeight: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight'),
  };

  Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
    configurable: true,
    get() {
      return this.classList?.contains('virtual-list') ? 200 : 20;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      if (this.classList?.contains('virtual-list')) {
        return parseInt((this.firstElementChild as HTMLElement)?.style.height, 10) || 0;
      }
      return 20;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return this.classList?.contains('list-item') ? 20 : 0;
    },
  });

  return () => {
    (Object.keys(descriptors) as Array<keyof typeof descriptors>).forEach((prop) => {
      if (descriptors[prop]) {
        Object.defineProperty(HTMLElement.prototype, prop, descriptors[prop]);
      } else {
        delete (HTMLElement.prototype as any)[prop];
      }
    });
  };
}

describe('VirtualList', () => {
  beforeEach(() => {
    requestAnimationFrameMock.resetQueue();
  });

  afterAll(() => {
    requestAnimationFrameMock.reset();
  });

  it('virtual auto toggle', async () => {
    function Demo() {
      const refList = useRef(null);
      const [data, setData] = useState(getData(60));
      return (
        <div>
          <button
            className="add-items"
            onClick={() => {
              setData(getData(data.length + 50));
            }}
          />
          <button
            className="remove-items"
            onClick={() => {
              setData(data.slice(0, -50));
            }}
          />
          <button className="scroll-to-top" onClick={() => refList.current?.scrollTo(0)} />
          <button
            className="scroll-to-item-50"
            onClick={() => refList.current?.scrollTo({ index: 49 })}
          />
          <button
            className="scroll-to-last-item"
            onClick={() => refList.current?.scrollTo({ index: data.length - 1 })}
          />
          <VirtualList ref={refList} isStaticItemHeight={false} threshold={100} data={data}>
            {({ content }) => <div className="list-item">{content}</div>}
          </VirtualList>
        </div>
      );
    }
    const wrapper = render(<Demo />);
    expect(wrapper.find('.list-item').length).toBe(60);

    // scroll when not virtual
    fireEvent.click(wrapper.querySelector('.scroll-to-last-item'));
    requestAnimationFrameMock.triggerAllAnimationFrames();

    // scroll to px
    fireEvent.click(wrapper.querySelector('.scroll-to-top'));
    requestAnimationFrameMock.triggerAllAnimationFrames();

    // switch to virtual when items are added
    fireEvent.click(wrapper.querySelector('.add-items'));
    expect(wrapper.find('.list-item').length).toBe(8);

    // scroll to last item when list is virtual
    fireEvent.click(wrapper.querySelector('.scroll-to-last-item'));
    await sleep(100);
    requestAnimationFrameMock.triggerAllAnimationFrames();
    expect(wrapper.find('.list-item').length).toBe(8);
    expect(wrapper.querySelector('.list-item')).toHaveTextContent('Content 102');

    // scroll to 50th item when list is virtual
    fireEvent.click(wrapper.querySelector('.scroll-to-item-50'));
    await sleep(100);
    requestAnimationFrameMock.triggerAllAnimationFrames();
    expect(wrapper.querySelector('.list-item')).toHaveTextContent('Content 42');

    // switch to real list when items are removed
    fireEvent.click(wrapper.querySelector('.remove-items'));
    expect(wrapper.find('.list-item').length).toBe(60);
  });

  it('onScroll is called', () => {
    const className = 'virtual-list';
    const onScroll = jest.fn();
    const wrapper = render(
      <VirtualList
        style={{ maxHeight: 200 }}
        measureLongestItem
        data={getData(200)}
        onScroll={onScroll}
        threshold={null}
        className={className}
      >
        {({ content }) => <div className="list-item">{content}</div>}
      </VirtualList>
    );

    fireEvent.scroll(wrapper.querySelector(`.${className}`));
    expect(onScroll).toBeCalled();
  });

  it('keeps the visible keyed item stable when items are inserted before viewport', async () => {
    const restoreElementSize = mockElementSize();

    function Demo() {
      const refList = useRef<any>(null);
      const [data, setData] = useState(getKeyedData(200));
      return (
        <div>
          <button
            className="scroll-to-item"
            onClick={() => {
              refList.current?.scrollTo({ index: 84, options: { block: 'start' } });
            }}
          />
          <button
            className="insert-items"
            onClick={() => {
              setData([
                ...data.slice(0, 20),
                { key: 'insert-1', content: 'Insert 1' },
                { key: 'insert-2', content: 'Insert 2' },
                ...data.slice(20),
              ]);
            }}
          />
          <VirtualList
            ref={refList}
            className="virtual-list"
            data={data}
            height={200}
            itemHeight={20}
            itemKey="key"
            isStaticItemHeight={false}
            threshold={0}
          >
            {({ content }) => <div className="list-item">{content}</div>}
          </VirtualList>
        </div>
      );
    }

    try {
      const wrapper = render(<Demo />);
      const list = wrapper.container.querySelector('.virtual-list') as HTMLElement;

      await act(async () => {
        await sleep(0);
      });

      act(() => {
        fireEvent.click(wrapper.container.querySelector('.scroll-to-item'));
        requestAnimationFrameMock.triggerAllAnimationFrames();
      });
      await act(async () => {
        await sleep(100);
      });

      expect(wrapper.container.querySelector('.list-item')).toHaveTextContent('Content 83');
      const prevScrollTop = list.scrollTop;

      act(() => {
        fireEvent.click(wrapper.container.querySelector('.insert-items'));
      });
      await act(async () => {
        await sleep(0);
      });

      expect(list.scrollTop).toBeGreaterThan(prevScrollTop);
      expect(wrapper.container.querySelector('.list-item')).toHaveTextContent('Content 83');
    } finally {
      restoreElementSize();
    }
  });

  it('does not adjust scrollTop when items are inserted inside viewport', async () => {
    const restoreElementSize = mockElementSize();

    function Demo() {
      const refList = useRef<any>(null);
      const [data, setData] = useState(getKeyedData(200));
      return (
        <div>
          <button
            className="scroll-to-item"
            onClick={() => {
              refList.current?.scrollTo({ index: 84, options: { block: 'start' } });
            }}
          />
          <button
            className="insert-items"
            onClick={() => {
              setData([
                ...data.slice(0, 85),
                { key: 'insert-1', content: 'Insert 1' },
                { key: 'insert-2', content: 'Insert 2' },
                ...data.slice(85),
              ]);
            }}
          />
          <VirtualList
            ref={refList}
            className="virtual-list"
            data={data}
            height={200}
            itemHeight={20}
            itemKey="key"
            isStaticItemHeight={false}
            threshold={0}
          >
            {({ content }) => <div className="list-item">{content}</div>}
          </VirtualList>
        </div>
      );
    }

    try {
      const wrapper = render(<Demo />);
      const list = wrapper.container.querySelector('.virtual-list') as HTMLElement;

      await act(async () => {
        await sleep(0);
      });

      act(() => {
        fireEvent.click(wrapper.container.querySelector('.scroll-to-item'));
        requestAnimationFrameMock.triggerAllAnimationFrames();
      });
      await act(async () => {
        await sleep(100);
      });

      expect(wrapper.container.querySelector('.list-item')).toHaveTextContent('Content 83');
      const prevScrollTop = list.scrollTop;

      act(() => {
        fireEvent.click(wrapper.container.querySelector('.insert-items'));
      });
      await act(async () => {
        await sleep(0);
      });

      expect(list.scrollTop).toBe(prevScrollTop);
      expect(wrapper.container.querySelector('.list-item')).toHaveTextContent('Content 83');
    } finally {
      restoreElementSize();
    }
  });
});

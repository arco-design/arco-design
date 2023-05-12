import React, { useRef, useState } from 'react';
import { fireEvent } from '@testing-library/dom';

import VirtualList from '../index';
import { requestAnimationFrameMock } from '../../../../tests/mockRAF';
import { render, sleep } from '../../../../tests/util';

function getData(size: number) {
  return new Array(size).fill(null).map((_, index) => ({ content: `Content ${index}` }));
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
});

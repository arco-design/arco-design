import React, { useRef, useState } from 'react';
import { mount } from 'enzyme';

import { act } from 'react-dom/test-utils';
import { requestAnimationFrameMock } from '../../../../tests/mockRAF';
import VirtualList from '../index';

function getData(size: number) {
  return new Array(size).fill(null).map((_, index) => ({ content: `Content ${index}` }));
}

describe('VirtualList', () => {
  beforeEach(() => {
    requestAnimationFrameMock.reset();
  });

  it('virtual auto toggle', () => {
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
    const wrapper = mount(<Demo />);
    expect(wrapper.find('.list-item').length).toBe(60);

    // scroll when not virtual
    act(() => {
      wrapper.find('.scroll-to-last-item').simulate('click');
      requestAnimationFrameMock.triggerAllAnimationFrames();
    });

    // scroll to px
    act(() => {
      wrapper.find('.scroll-to-top').simulate('click');
      requestAnimationFrameMock.triggerAllAnimationFrames();
    });

    // switch to virtual when items are added
    act(() => {
      wrapper.find('.add-items').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('.list-item').length).toBe(8);

    // scroll to last item when list is virtual
    act(() => {
      wrapper.find('.scroll-to-last-item').simulate('click');
      requestAnimationFrameMock.triggerAllAnimationFrames();
    });
    wrapper.update();
    expect(wrapper.find('.list-item').at(0).text()).toBe('Content 102');

    // scroll to 50th item when list is virtual
    act(() => {
      wrapper.find('.scroll-to-item-50').simulate('click');
      requestAnimationFrameMock.triggerAllAnimationFrames();
    });
    wrapper.update();
    expect(wrapper.find('.list-item').at(0).text()).toBe('Content 42');

    // switch to real list when items are removed
    act(() => {
      wrapper.find('.remove-items').simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('.list-item').length).toBe(60);
  });

  it('onScroll is called', () => {
    const onScroll = jest.fn();
    const wrapper = mount(
      <VirtualList
        style={{ maxHeight: 200 }}
        measureLongestItem
        data={getData(200)}
        onScroll={onScroll}
        threshold={null}
      >
        {({ content }) => <div className="list-item">{content}</div>}
      </VirtualList>
    );

    act(() => {
      wrapper.simulate('scroll');
    });
    expect(onScroll).toBeCalled();
  });
});

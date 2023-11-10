import React from 'react';
import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import ResizeBox from '..';
import Typography from '../../Typography';
import Layout from '../../Layout';
import { fireEvent, render } from '../../../tests/util';
import { mockMouseEvent } from '../../../tests/fakeMouseEvent';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

mountTest(ResizeBox);
componentConfigTest(ResizeBox, 'ResizeBox');

describe('ResizeBox', () => {
  const wrapperRef = {
    clientWidth: 100,
    clientHeight: 100,
    offsetWidth: 400,
    offsetHeight: 400,
  };

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', { value: wrapperRef.clientWidth });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      value: wrapperRef.clientHeight,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { value: wrapperRef.offsetWidth });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      value: wrapperRef.offsetHeight,
    });
  });

  afterEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      value: HTMLElement.prototype.clientWidth,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      value: HTMLElement.prototype.clientHeight,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      value: HTMLElement.prototype.offsetWidth,
    });
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      value: HTMLElement.prototype.offsetHeight,
    });
  });

  it('render without props correctly', () => {
    const wrapper = render(<ResizeBox />);
    expect(wrapper.find('.arco-resizebox')).toHaveLength(1);

    expect(wrapper.find('.arco-resizebox-trigger')[0].classList).toContain(
      'arco-resizebox-direction-right'
    );
  });

  it('handle right change correctly', () => {
    const mockMoving = jest.fn();
    const mockMovingStart = jest.fn();
    const mockMovingEnd = jest.fn();
    const wrapper = render(
      <ResizeBox
        onMoving={mockMoving}
        onMovingEnd={mockMovingEnd}
        onMovingStart={mockMovingStart}
        style={{ width: 100, height: 100 }}
      >
        demo
      </ResizeBox>
    );

    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    act(() => {
      fireEvent(
        wrapper.find('.arco-resizebox-trigger')[0],
        mockMouseEvent('mousedown', { pageX: 100, pageY: 100 })
      );
    });
    expect(mockMovingStart).toHaveBeenCalled();

    act(() => {
      map.mousemove({
        pageX: 200,
        pageY: 0,
      });
    });
    expect(mockMoving).toHaveBeenCalledTimes(1);
    expect(mockMoving.mock.calls[0][1]).toEqual({ width: 200, height: 100 });
    expect(wrapper.find('.arco-resizebox')[0].style.width).toEqual('200px');
    expect(wrapper.find('.arco-resizebox')[0].style.height).toEqual('100px');

    act(() => {
      map.mouseup();
      expect(mockMovingEnd).toHaveBeenCalledTimes(1);
    });

    expect(document.body.style.cursor).toBe('');
  });

  it('handle bottom change correctly', () => {
    const wrapper = render(
      <ResizeBox directions={['bottom']} style={{ width: 100, height: 100 }} />
    );

    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    act(() => {
      fireEvent(
        wrapper.find('.arco-resizebox-trigger')[0],
        mockMouseEvent('mousedown', { pageX: 100, pageY: 100 })
      );
      map.mousemove({
        pageX: 100,
        pageY: 300,
      });
    });

    expect(wrapper.find('.arco-resizebox')[0].style.width).toEqual('100px');
    expect(wrapper.find('.arco-resizebox')[0].style.height).toEqual('300px');
  });

  it('render basic split correctly', () => {
    const wrapper = render(
      <ResizeBox.Split
        style={{ height: 400, width: 400 }}
        panes={[
          <Typography.Paragraph key="1">Right</Typography.Paragraph>,
          <Typography.Paragraph key="2">Left</Typography.Paragraph>,
        ]}
      />
    );

    expect(wrapper.find('.arco-resizebox-split-pane')).toHaveLength(2);
    expect(wrapper.find('.arco-resizebox-trigger')).toHaveLength(1);
    expect(wrapper.find('.arco-resizebox-trigger')[0].classList).toContain(
      'arco-resizebox-trigger-vertical'
    );
  });

  it('handle mouse event correctly', () => {
    const mockMoving = jest.fn();
    const mockMovingStart = jest.fn();
    const mockMovingEnd = jest.fn();

    const wrapper = render(
      <ResizeBox.Split
        style={{ height: 400, width: 400 }}
        onMoving={mockMoving}
        onMovingStart={mockMovingStart}
        onMovingEnd={mockMovingEnd}
        panes={[
          <Typography.Paragraph key="1">Right</Typography.Paragraph>,
          <Typography.Paragraph key="2">Left</Typography.Paragraph>,
        ]}
      />
    );

    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    act(() => {
      fireEvent(
        wrapper.find('.arco-resizebox-trigger')[0],
        mockMouseEvent('mousedown', { pageX: 200, pageY: 100 })
      );
    });

    expect(mockMovingStart).toHaveBeenCalled();

    act(() => {
      map.mousemove({
        pageX: 300,
        pageY: 100,
      });
    });
    expect(mockMoving).toHaveBeenCalledTimes(1);
    expect(mockMoving.mock.calls[0][1]).toEqual(300 / 400);

    act(() => {
      map.mouseup();
      expect(mockMovingEnd).toHaveBeenCalledTimes(1);
    });
  });

  it('handle mouse event correctly in number&string mode', () => {
    const mockMoving = jest.fn();
    const wrapper = render(
      <ResizeBox.Split
        style={{ height: 400, width: 400 }}
        onMoving={mockMoving}
        size="200px"
        min={0.1}
        max="250px"
        panes={[
          <Typography.Paragraph key="1">Right</Typography.Paragraph>,
          <Typography.Paragraph key="2">Left</Typography.Paragraph>,
        ]}
      />
    );

    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });
    // -------------- First Moving ------------------
    //  [min: 0.1; total: 400] movingPosition: from 200 to 20;
    act(() => {
      fireEvent(
        wrapper.find('.arco-resizebox-trigger')[0],
        mockMouseEvent('mousedown', { pageX: 200, pageY: 100 })
      );
    });
    act(() => {
      map.mousemove({
        pageX: 20,
        pageY: 100,
      });
    });
    expect(mockMoving).toHaveBeenCalledTimes(1);
    // minSize: 40px;
    expect(mockMoving.mock.calls[0][1]).toEqual(`40px`);
    // -------------- Second Moving ------------------
    // [max: 250px] movingPosition: from 20 to 300;
    act(() => {
      fireEvent(
        wrapper.find('.arco-resizebox-trigger')[0],
        mockMouseEvent('mousedown', { pageX: 40, pageY: 100 })
      );
    });
    act(() => {
      map.mousemove({
        pageX: 300,
        pageY: 100,
      });
    });
    expect(mockMoving).toHaveBeenCalledTimes(2);
    // maxSize: 250px;
    expect(mockMoving.mock.calls[1][1]).toEqual(`250px`);
    // -------------- Third Moving -----------------
    act(() => {
      fireEvent(
        wrapper.find('.arco-resizebox-trigger')[0],
        mockMouseEvent('mousedown', { pageX: 250, pageY: 100 })
      );
    });
    act(() => {
      map.mousemove({
        pageX: 120,
        pageY: 100,
      });
    });
    expect(mockMoving.mock.calls[2][1]).toEqual(`120px`);
  });

  it('use in Layout correctly', () => {
    const wrapper = render(
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider resizeDirections={['right']} style={{ minWidth: 150, maxWidth: 500, height: 200 }}>
            Sider
          </Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
    expect(wrapper.find('.arco-resizebox')[0].classList).toContain('arco-layout-sider');
  });

  it('trigger onPaneResize when pane resized', () => {
    const mockPaneResize = jest.fn();

    const wrapper = render(
      <ResizeBox.Split
        style={{ height: 200, width: 500 }}
        panes={[
          <Typography.Paragraph key="1">Right</Typography.Paragraph>,
          <Typography.Paragraph key="2">Left</Typography.Paragraph>,
        ]}
        onPaneResize={mockPaneResize}
      />
    );

    expect(mockPaneResize).toHaveBeenCalledTimes(1);

    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    act(() => {
      fireEvent(
        wrapper.find('.arco-resizebox-trigger')[0],
        mockMouseEvent('mousedown', { pageX: 100, pageY: 300 })
      );
      map.mousemove({
        pageX: 200,
        pageY: 300,
      });
    });

    expect(mockPaneResize).toHaveBeenCalledTimes(2);
  });

  it('render direction reverse correctly', () => {
    const mockMoving = jest.fn();
    const mockMovingStart = jest.fn();
    const mockMovingEnd = jest.fn();

    const wrapper = render(
      <ResizeBox.Split
        style={{ height: 400, width: 400 }}
        direction="horizontal-reverse"
        onMoving={mockMoving}
        onMovingStart={mockMovingStart}
        onMovingEnd={mockMovingEnd}
        panes={[
          <Typography.Paragraph key="1">Right</Typography.Paragraph>,
          <Typography.Paragraph key="2">Left</Typography.Paragraph>,
        ]}
      />
    );

    expect(wrapper.find('.arco-resizebox-split-pane .arco-typography')[0].innerHTML).toEqual(
      'Left'
    );
    expect(wrapper.find('.arco-resizebox-split-pane .arco-typography')[1].innerHTML).toEqual(
      'Right'
    );

    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    act(() => {
      fireEvent(
        wrapper.find('.arco-resizebox-trigger')[0],
        mockMouseEvent('mousedown', { pageX: 200, pageY: 100 })
      );
    });
    expect(mockMovingStart).toHaveBeenCalled();

    act(() => {
      map.mousemove({
        pageX: 250,
        pageY: 100,
      });
    });
    expect(mockMoving).toHaveBeenCalledTimes(1);
    expect(mockMoving.mock.calls[0][1]).toEqual((200 - (250 - 200)) / 400);

    act(() => {
      map.mouseup();
      expect(mockMovingEnd).toHaveBeenCalledTimes(1);
    });
  });
});

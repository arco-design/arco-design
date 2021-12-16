import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import ResizeBox from '..';
import Typography from '../../Typography';
import Layout from '../../Layout';

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
    const wrapper = mount(<ResizeBox />);
    expect(wrapper.find('.arco-resizebox')).toHaveLength(1);

    expect(
      wrapper.find('.arco-resizebox-trigger').hasClass('arco-resizebox-direction-right')
    ).toBeTruthy();

    act(() => {
      wrapper.setProps({
        directions: ['bottom'],
      });
      wrapper.update();
    });
    expect(wrapper.find('.arco-resizebox')).toHaveLength(1);
    expect(
      wrapper.find('.arco-resizebox-trigger').hasClass('arco-resizebox-direction-bottom')
    ).toBeTruthy();
  });

  it('handle right change correctly', () => {
    const mockMoving = jest.fn();
    const mockMovingStart = jest.fn();
    const mockMovingEnd = jest.fn();
    const wrapper = mount(
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
      wrapper.find('ResizeTrigger').simulate('mousedown', { pageX: 100, pageY: 100 });
      wrapper.update();
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

    act(() => {
      wrapper.update();
    });
    expect(wrapper.find('.arco-resizebox').prop('style')).toEqual({ width: 200, height: 100 });

    act(() => {
      map.mouseup();
      expect(mockMovingEnd).toHaveBeenCalledTimes(1);
    });
  });

  it('handle bottom change correctly', () => {
    const wrapper = mount(
      <ResizeBox directions={['bottom']} style={{ width: 100, height: 100 }} />
    );

    const map: any = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    act(() => {
      wrapper.find('ResizeTrigger').simulate('mousedown', { pageX: 100, pageY: 100 });
      map.mousemove({
        pageX: 100,
        pageY: 300,
      });
    });

    act(() => {
      wrapper.update();
    });
    expect(wrapper.find('.arco-resizebox').prop('style')).toEqual({ width: 100, height: 300 });
  });

  it('render basic split correctly', () => {
    const wrapper = mount(
      <ResizeBox.Split
        style={{ height: 400, width: 400 }}
        panes={[
          <Typography.Paragraph key="1">Right</Typography.Paragraph>,
          <Typography.Paragraph key="2">Left</Typography.Paragraph>,
        ]}
      />
    );

    expect(wrapper.find('.arco-resizebox-split-pane')).toHaveLength(2);
    expect(wrapper.find('ResizeTrigger')).toHaveLength(1);
    expect(
      wrapper.find('.arco-resizebox-trigger').hasClass('arco-resizebox-trigger-vertical')
    ).toBeTruthy();
  });

  it('handle mouse event correctly', () => {
    const mockMoving = jest.fn();
    const mockMovingStart = jest.fn();
    const mockMovingEnd = jest.fn();

    const wrapper = mount(
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
      wrapper.find('ResizeTrigger').simulate('mousedown', { pageX: 200, pageY: 100 });
      wrapper.update();
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
      wrapper.update();
    });

    act(() => {
      map.mouseup();
      expect(mockMovingEnd).toHaveBeenCalledTimes(1);
    });
  });

  it('use in Layout correctly', () => {
    const wrapper = mount(
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
    expect(wrapper.find('.arco-resizebox').hasClass('arco-layout-sider')).toBeTruthy();
  });

  it('trigger onPaneResize when pane resized', () => {
    const mockPaneResize = jest.fn();

    const wrapper = mount(
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
      wrapper.find('ResizeTrigger').simulate('mousedown', { pageX: 100, pageY: 300 });
      map.mousemove({
        pageX: 200,
        pageY: 300,
      });
    });

    expect(mockPaneResize).toHaveBeenCalledTimes(2);
  });
});

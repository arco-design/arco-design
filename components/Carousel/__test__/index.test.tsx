import React from 'react';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Carousel from '..';
import { CarouselHandle } from '../interface';
import { sleep } from '../../../tests/util';

jest.mock('resize-observer-polyfill', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((cb) => {
    // 直接触发，不用onResize
    cb();

    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
  }),
}));

mountTest(Carousel);
componentConfigTest(Carousel, 'Carousel');

const prefixCls = '.arco-carousel';

const wrapperStyle: React.CSSProperties = {
  width: '600px',
  height: '300px',
};

const itemStyle1: React.CSSProperties = {
  backgroundColor: '#3370FF',
  color: '#ffffff',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  fontSize: '25px',
  padding: '100px',
};

const itemStyle2: React.CSSProperties = {
  backgroundColor: '#ADCEFF',
  color: '#ffffff',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  fontSize: '25px',
  padding: '100px',
};

const isActiveIndex = (wrapper, index) => {
  jest.advanceTimersByTime(50);
  wrapper.update();
  const items = wrapper.find('.arco-carousel-indicator-item');
  return items.at(index).hasClass('arco-carousel-indicator-item-active');
};

describe('Carousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render only child correctly', () => {
    const wrapper = render(
      <Carousel style={wrapperStyle}>
        <div style={itemStyle1} />
      </Carousel>
    );
    const slider = wrapper.find(`${prefixCls}-slider`);
    expect(slider.children).toHaveLength(1);
  });

  it('should init currentIndex correctly', () => {
    const currentIndex = 3;
    const wrapper = mount(
      <Carousel style={wrapperStyle} currentIndex={currentIndex}>
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
        <div style={itemStyle2} />
      </Carousel>
    );
    expect(isActiveIndex(wrapper, 3)).toBe(true);
  });

  it('should autoPlay correctly', () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle} autoPlay>
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
        <div style={itemStyle2} />
      </Carousel>
    );
    jest.advanceTimersByTime(3000);
    expect(isActiveIndex(wrapper, 1)).toBe(true);
  });

  it('miniRender works correctly', () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle} miniRender>
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
      </Carousel>
    );
    expect(wrapper.find('.arco-carousel-slide > div')).toHaveLength(3);
  });

  it('should move correctly', () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle}>
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
      </Carousel>
    );

    wrapper.find('.arco-carousel-arrow-right').at(0).simulate('click');
    expect(isActiveIndex(wrapper, 1)).toBe(true);

    // 等待向右的动画结束，否则下次点击会被忽略
    jest.advanceTimersByTime(1000);

    wrapper.find('.arco-carousel-arrow-left').at(0).simulate('click');
    expect(isActiveIndex(wrapper, 0)).toBe(true);
  });

  it('should selectIndex correctly', () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle}>
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
      </Carousel>
    );
    wrapper.find('.arco-carousel-indicator-item').at(2).simulate('click');
    expect(isActiveIndex(wrapper, 2)).toBe(true);
  });

  it('should addInterval, clearInterval correctly', () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle} autoPlay>
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
        <div style={itemStyle2} />
      </Carousel>
    );

    wrapper.simulate('mouseenter');
    jest.advanceTimersByTime(4000);
    expect(isActiveIndex(wrapper, 0)).toBe(true);
    wrapper.simulate('mouseleave');
    jest.advanceTimersByTime(4000);
    expect(isActiveIndex(wrapper, 1)).toBe(true);
  });

  it('should be vertical', () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle} direction="vertical" indicatorPosition="right">
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
      </Carousel>
    );
    expect(wrapper.find(`${prefixCls}-vertical`)).toHaveLength(1);
  });

  it('should be dots', () => {
    const wrapper = mount(
      <Carousel
        style={wrapperStyle}
        direction="vertical"
        indicatorType="dot"
        indicatorPosition="right"
        showArrow="hover"
      >
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
      </Carousel>
    );
    expect(wrapper.find('.arco-carousel-indicator-dot')).toHaveLength(1);
    expect(wrapper.find('.arco-carousel-indicator-right')).toHaveLength(1);
    expect(wrapper.find('.arco-carousel-arrow').hasClass('arco-carousel-arrow-hover')).toBe(true);
  });

  it('should self timingfunc correctly', () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle} moveSpeed={800} timingFunc="ease-out">
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
      </Carousel>
    );

    const slider = wrapper.find(`${prefixCls}-slide`);
    const style = slider.childAt(0).prop('style');
    expect(style.transitionTimingFunction).toEqual('ease-out');
    expect(style.transitionDuration).toEqual('800ms');
  });

  it('support the ref trigger change scene', async () => {
    jest.useRealTimers();
    const carousel = React.createRef<CarouselHandle>();
    const onChange = jest.fn();
    const wrapper = mount(
      <Carousel
        style={wrapperStyle}
        autoPlay={{ interval: 1000 }}
        carousel={carousel}
        onChange={onChange}
      >
        <div style={itemStyle1} />
        <div style={itemStyle2} />
        <div style={itemStyle1} />
        <div style={itemStyle2} />
      </Carousel>
    );

    const { dom, goto } = carousel.current;
    expect(dom.className.includes('arco-carousel ')).toBeTruthy();
    expect(typeof goto).toBe('function');
    await act(async () => {
      goto({ index: 2, resetAutoPlayInterval: true });
      wrapper.update();
    });

    expect(isActiveIndex(wrapper, 2)).toBe(true);
    expect(onChange.mock.calls).toHaveLength(1);
    expect(onChange.mock.calls[0]).toEqual([2, 0, false]);

    await act(async () => {
      await sleep(1000);
      wrapper.update();
    });

    expect(onChange.mock.calls[1]).toEqual([3, 2, false]);

    await act(async () => {
      goto({ index: 1, isManual: true, isNegative: true });
      wrapper.update();
    });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(isActiveIndex(wrapper, 1)).toBe(true);
  });

  it('support child props scene', () => {
    const handleClick = jest.fn();
    const wrapper = mount(
      <Carousel style={wrapperStyle}>
        <li style={itemStyle1} />
        <li style={itemStyle2} className="carousel-child" />
        <li style={itemStyle1} onClick={handleClick} />
        <li style={itemStyle2} />
      </Carousel>
    );

    act(() => {
      wrapper.find('li').at(2).simulate('click');

      wrapper.update();
    });
    expect(handleClick).toHaveBeenCalled();
    expect(isActiveIndex(wrapper, 2)).toBeTruthy();

    expect(wrapper.find('li').at(1).hasClass('carousel-child')).toBeTruthy();
  });

  it('support card animation scene', async () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle} animation="card">
        <div style={{ width: '60%' }}>
          <div style={itemStyle1} />
        </div>
        <div style={{ width: '60%' }}>
          <div style={itemStyle2} />
        </div>
        <div style={{ width: '60%' }}>
          <div style={itemStyle1} />
        </div>
      </Carousel>
    );
    const cardWrapper = wrapper.find(`${prefixCls}-card`);
    expect(cardWrapper).toHaveLength(1);

    expect(cardWrapper.prop('style').perspective).not.toBeUndefined();
  });

  it('support slider indicatorType correctly', () => {
    const wrapper = mount(
      <Carousel style={wrapperStyle} autoPlay indicatorType="slider">
        {new Array(4).fill('1').map((_, i) => (
          <div key={i} style={itemStyle1} />
        ))}
      </Carousel>
    );

    expect(wrapper.find('.arco-carousel-indicator-slider')).toHaveLength(1);
    act(() => {
      jest.advanceTimersByTime(3000);
      wrapper.update();
    });
    const activeIndicator = wrapper
      .find('.arco-carousel-indicator-slider')
      .find('.arco-carousel-indicator-item');
    expect(activeIndicator.prop('style')).toEqual({
      width: `${100 / 4}%`,
      left: `${100 / 4}%`,
    });
  });

  it('customize icon in arrows', () => {
    const wrapper = render(
      <Carousel style={wrapperStyle} icons={{ prev: null, next: '>' }}>
        <li style={itemStyle1} />
        <li style={itemStyle2} />
      </Carousel>
    );
    expect(wrapper.find(`${prefixCls}-arrow-left`).text()).toBe('');
    expect(wrapper.find(`${prefixCls}-arrow-right`).text()).toBe('>');
  });
});

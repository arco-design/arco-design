import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import Typography from '..';
import { sleep } from '../../../tests/util';

const { Paragraph } = Typography;

jest.mock('resize-observer-polyfill', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((cb) => {
    try {
      // in jest, dom has no size, so cb will not trigger on observer is created, just mock;
      typeof cb === 'function' && cb([{ contentRect: { width: 100 } }]);
    } catch (e) {}

    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
  }),
}));

// 1行20个字符。
const LINE_STR_COUNT = 20;
const MEASURE_LINE_HEIGHT_TEXT = 'hxj';

// @ts-ignore
const _getHTMLOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight'
).get;

describe('JS Ellipsis Scene', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() {
        const html = this.innerHTML;
        if (html === MEASURE_LINE_HEIGHT_TEXT) {
          return 16;
        }
        const text = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(text.length / LINE_STR_COUNT);
        return lines * 16;
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: _getHTMLOffsetHeight,
    });
  });

  const originWindowCss = window.CSS || {};
  beforeEach(() => {
    window.CSS = {
      ...window.CSS,
      supports: () => true,
    };
  });

  afterEach(() => {
    // @ts-ignore
    window.CSS = originWindowCss;
  });

  const mockText = 'A design is a plan or specification for the construction';
  it('support basic ellipsis', async () => {
    const onEllipsis = jest.fn();
    const wrapper = mount(<Paragraph ellipsis={{ onEllipsis }}>{mockText}</Paragraph>);

    await sleep(200);
    wrapper.update();
    const showText1 = wrapper.text();
    expect(showText1.length).toEqual(LINE_STR_COUNT);
    expect(mockText.startsWith(showText1.replace('...', ''))).toBeTruthy();
    expect(onEllipsis).toHaveBeenCalledWith(true);

    wrapper.setProps({
      ellipsis: {
        rows: 2,
      },
    });
    await sleep(200);
    wrapper.update();

    const showText2 = wrapper.text();
    expect(showText2.length).toEqual(LINE_STR_COUNT * 2);
  });

  it('support expand when ellipsis', async () => {
    const onExpand = jest.fn();
    const wrapper = mount(
      <Paragraph ellipsis={{ onExpand, expandNodes: ['Less', 'More'], expandable: true }}>
        {mockText}
      </Paragraph>
    );

    await sleep(200);
    wrapper.update();
    expect(wrapper.find('.arco-typography-operation-expand').text()).toEqual('More');
    act(() => {
      wrapper.find('.arco-typography-operation-expand').simulate('click');
    });

    const showText = wrapper.text();
    expect(showText).toEqual(`${mockText}Less`);
    expect(onExpand.mock.calls[0][0]).toBe(true);

    onExpand.mockReset();
    act(() => {
      wrapper.find('.arco-typography-operation-expand').simulate('click');
    });

    expect(wrapper.text().length < mockText.length).toEqual(true);
    expect(onExpand.mock.calls[0][0]).toBe(false);

    act(() => {
      wrapper.setProps({ ellipsis: { expandable: false } });
    });
    expect(wrapper.find('.arco-typography-operation-expand')).toHaveLength(0);
  });

  it('support suffix when ellipsis', async () => {
    const suffix = '--Arco Design';
    const wrapper = mount(
      <Paragraph
        ellipsis={{
          suffix,
          showTooltip: {
            type: 'tooltip',
            props: {
              content: mockText,
            },
          },
        }}
      >
        {mockText}
      </Paragraph>
    );

    await sleep(200);
    wrapper.update();

    const showText = wrapper.text();
    expect(showText.endsWith(suffix)).toBeTruthy();
    expect(wrapper.find('Tooltip')).toHaveLength(1);
  });

  it('ellipsis correctly when children is controlled', async () => {
    const wrapper = mount(<Paragraph ellipsis={{ rows: 2 }}>{mockText}</Paragraph>);
    await sleep(200);
    wrapper.update();
    expect(wrapper.text().length).toEqual(LINE_STR_COUNT * 2);

    const resetText = `new children`;

    act(() => {
      wrapper.setProps({
        children: resetText + mockText,
      });
      wrapper.update();
    });

    await sleep(200);

    expect(wrapper.text().length).toEqual(LINE_STR_COUNT * 2);
    expect(wrapper.text().startsWith(resetText)).toBe(true);
  });

  it('ellipsis controlled scene', async () => {
    const wrapper = mount(<Paragraph ellipsis={{ rows: 2, expanded: true }}>{mockText}</Paragraph>);
    await sleep(200);
    wrapper.update();
    expect(wrapper.text().length).toEqual(mockText.length);

    act(() => {
      wrapper.setProps({ ellipsis: { rows: 2, expanded: false } });
      wrapper.update();
    });
    await sleep(200);
    expect(wrapper.text().length).toEqual(LINE_STR_COUNT * 2);
  });

  it('support defaultEllipsis scene', async () => {
    const wrapper = mount(
      <Paragraph ellipsis={{ rows: 2, defaultExpanded: false }}>{mockText}</Paragraph>
    );
    await sleep(200);
    wrapper.update();
    expect(wrapper.text().length).toEqual(LINE_STR_COUNT * 2);

    act(() => {
      wrapper.setProps({ ellipsis: { rows: 2, expanded: true, defaultExpanded: false } });
      wrapper.update();
    });
    await sleep(200);
    expect(wrapper.text().length).toEqual(mockText.length);
  });

  it('render expanding operation correctly', async () => {
    const wrapper = mount(<Paragraph ellipsis={{ expandable: true }}>{mockText}</Paragraph>);
    await sleep(200);
    wrapper.update();
    expect(wrapper.text().length).toEqual(LINE_STR_COUNT * 1);
    expect(wrapper.find('.arco-typography-operation-expand').text()).toEqual('展开');

    act(() => {
      wrapper.setProps({ children: mockText.slice(0, LINE_STR_COUNT - 5) });
      wrapper.update();
    });

    await sleep(200);
    wrapper.update();

    expect(wrapper.text().length).toEqual(LINE_STR_COUNT - 5);
    expect(wrapper.find('.arco-typography-operation-expand')).toHaveLength(0);
  });
});

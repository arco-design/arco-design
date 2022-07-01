import React from 'react';
import { act } from 'react-test-renderer';
import Typography from '..';
import { sleep, render, fireEvent } from '../../../tests/util';

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
    const wrapper = render(<Paragraph ellipsis={{ onEllipsis }}>{mockText}</Paragraph>);
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT - 3)}...`
    );
    expect(onEllipsis).toHaveBeenCalledWith(true);

    act(() => {
      wrapper.rerender(<Paragraph ellipsis={{ rows: 2 }}>{mockText}</Paragraph>);
    });
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT * 2 - 3)}...`
    );
  });

  it('support expand when ellipsis', async () => {
    const onExpand = jest.fn();
    const wrapper = render(
      <Paragraph ellipsis={{ onExpand, expandNodes: ['Less', 'More'], expandable: true }}>
        {mockText}
      </Paragraph>
    );
    expect(wrapper.find('.arco-typography-operation-expand')[0]).toHaveTextContent('More');
    act(() => {
      fireEvent.click(wrapper.find('.arco-typography-operation-expand')[0]);
    });

    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(`${mockText}Less`);
    expect(onExpand.mock.calls[0][0]).toBe(true);
    onExpand.mockReset();
    act(() => {
      fireEvent.click(wrapper.find('.arco-typography-operation-expand')[0]);
    });
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT - 3 - 4)}...More`
    );
    expect(onExpand.mock.calls[0][0]).toBe(false);

    act(() => {
      wrapper.rerender(<Paragraph ellipsis={{ expandable: false }}>{mockText}</Paragraph>);
    });
    expect(wrapper.find('.arco-typography-operation-expand')).toHaveLength(0);
  });

  it('support suffix when ellipsis', async () => {
    const suffix = '--Arco Design';
    const wrapper = render(
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
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT - suffix.length - 3)}...${suffix}`
    );

    act(() => {
      fireEvent.mouseEnter(wrapper.find('span')[0]);
    });
    jest.runAllTimers();
    await sleep(200);
    expect(wrapper.find('.arco-tooltip-open')).toHaveLength(1);
  });

  it('ellipsis correctly when children is controlled', async () => {
    const wrapper = render(<Paragraph ellipsis={{ rows: 2 }}>{mockText}</Paragraph>);
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT * 2 - 3)}...`
    );

    const resetText = `new children`;
    act(() => {
      wrapper.rerender(<Paragraph ellipsis={{ rows: 2 }}>{resetText + mockText}</Paragraph>);
    });

    await sleep(200);

    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${(resetText + mockText).slice(0, LINE_STR_COUNT * 2 - 3)}...`
    );
  });

  it('ellipsis controlled scene', async () => {
    const wrapper = render(
      <Paragraph ellipsis={{ rows: 2, expanded: true }}>{mockText}</Paragraph>
    );
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(mockText);

    act(() => {
      wrapper.rerender(<Paragraph ellipsis={{ rows: 2, expanded: false }}>{mockText}</Paragraph>);
    });
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT * 2 - 3)}...`
    );
  });

  it('support defaultEllipsis scene', async () => {
    const wrapper = render(
      <Paragraph ellipsis={{ rows: 2, defaultExpanded: false }}>{mockText}</Paragraph>
    );
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT * 2 - 3)}...`
    );

    act(() => {
      wrapper.rerender(
        <Paragraph ellipsis={{ rows: 2, expanded: true, defaultExpanded: false }}>
          {mockText}
        </Paragraph>
      );
    });
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(mockText);
  });

  it('render expanding operation correctly', async () => {
    const wrapper = render(<Paragraph ellipsis={{ expandable: true }}>{mockText}</Paragraph>);
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT - 5)}...展开`
    );
    expect(wrapper.find('.arco-typography-operation-expand')[0]).toHaveTextContent('展开');

    act(() => {
      wrapper.rerender(
        <Paragraph ellipsis={{ expandable: true }}>
          {mockText.slice(0, LINE_STR_COUNT - 5)}
        </Paragraph>
      );
    });

    await sleep(200);

    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      mockText.slice(0, LINE_STR_COUNT - 5)
    );
    expect(wrapper.find('.arco-typography-operation-expand')).toHaveLength(0);
  });
});

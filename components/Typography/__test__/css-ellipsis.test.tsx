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

describe('Css Ellipsis Scene', () => {
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
    const wrapper = render(
      <Paragraph ellipsis={{ onEllipsis, cssEllipsis: true }}>{mockText}</Paragraph>
    );

    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(1);
    const ellipsisStyle1 = wrapper.find('.arco-typography-simple-ellipsis > span')[0].style;
    expect(ellipsisStyle1?.textOverflow).toEqual('ellipsis');
    // @ts-ignore
    expect(ellipsisStyle1?.WebkitLineClamp).toBeFalsy();
    expect(onEllipsis).toHaveBeenCalledWith(true);
    wrapper.rerender(
      <Paragraph
        ellipsis={{
          rows: 2,
          cssEllipsis: true,
        }}
      >
        {mockText}
      </Paragraph>
    );
    const ellipsisStyle2 = wrapper.find('.arco-typography-simple-ellipsis > span')[0].style;
    // @ts-ignore
    expect(ellipsisStyle2?.WebkitLineClamp).toEqual('2');
  });

  it('support expand when ellipsis', async () => {
    const onExpand = jest.fn();
    const wrapper = render(
      <Paragraph
        ellipsis={{ onExpand, expandNodes: ['Less', 'More'], expandable: true, cssEllipsis: true }}
      >
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
    expect(onExpand.mock.calls[0][0]).toBe(false);

    act(() => {
      wrapper.rerender(<Paragraph ellipsis={{ expandable: false, cssEllipsis: true }} />);
    });
    expect(wrapper.find('.arco-typography-expand')).toHaveLength(0);
  });

  it('support tooltip when ellipsis', async () => {
    const wrapper = render(
      <Paragraph
        ellipsis={{
          cssEllipsis: true,
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
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(mockText);
    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(1);
    act(() => {
      // @ts-ignore
      fireEvent.mouseEnter(wrapper.find('.arco-typography')[0].closest('span'));
    });
    jest.runAllTimers();
    await sleep(200);
    expect(wrapper.find('.arco-tooltip-open')).toHaveLength(1);
  });

  it('ellipsis correctly when children is controlled', async () => {
    const wrapper = render(
      <Paragraph ellipsis={{ rows: 2, cssEllipsis: true }}>{mockText}</Paragraph>
    );
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(mockText);

    const resetText = `new children`;

    act(() => {
      wrapper.rerender(
        <Paragraph ellipsis={{ rows: 2, cssEllipsis: true }}>{resetText + mockText}</Paragraph>
      );
    });
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(resetText + mockText);
  });

  it('ellipsis controlled scene', async () => {
    const wrapper = render(
      <Paragraph ellipsis={{ rows: 2, expanded: true, cssEllipsis: false }}>{mockText}</Paragraph>
    );
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(mockText);

    act(() => {
      wrapper.rerender(
        <Paragraph ellipsis={{ rows: 2, expanded: false, cssEllipsis: false }}>
          {mockText}
        </Paragraph>
      );
    });
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(
      `${mockText.slice(0, LINE_STR_COUNT * 2 - 3)}...`
    );

    act(() => {
      wrapper.rerender(
        <Paragraph ellipsis={{ rows: 2, expanded: false, cssEllipsis: true }}>{mockText}</Paragraph>
      );
    });
    await sleep(200);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(mockText);
    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(1);
    expect(
      // @ts-ignore
      wrapper.find('.arco-typography-simple-ellipsis > span')[0].style?.WebkitLineClamp
    ).toEqual('2');
  });

  it('support defaultEllipsis scene', async () => {
    const wrapper = render(
      <Paragraph ellipsis={{ rows: 2, defaultExpanded: false, cssEllipsis: true }}>
        {mockText}
      </Paragraph>
    );
    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(1);

    act(() => {
      wrapper.rerender(
        <Paragraph
          ellipsis={{ rows: 2, expanded: true, defaultExpanded: false, cssEllipsis: true }}
        >
          {mockText}
        </Paragraph>
      );
    });
    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(0);
  });

  it('render expanding operation correctly', async () => {
    const wrapper = render(
      <Paragraph ellipsis={{ expandable: true, cssEllipsis: true }}>{mockText}</Paragraph>
    );
    await sleep(200);
    expect(wrapper.find('.arco-typography-operation-expand')[0]).toHaveTextContent('展开');

    act(() => {
      wrapper.rerender(
        <Paragraph ellipsis={{ cssEllipsis: true }}>
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

  it('support ellipsis in code mode', () => {
    const wrapper = render(
      <Paragraph ellipsis={{ rows: 2, expandable: true, cssEllipsis: true }} code mark>
        {mockText}
      </Paragraph>
    );
    expect(wrapper.find('code')).toHaveLength(1);
    expect(wrapper.find('mark')).toHaveLength(1);
    expect(wrapper.find('.arco-typography')[0]).toHaveTextContent(`${mockText}展开`);
    expect(wrapper.find('code')[0].classList.contains('arco-typography-simple-ellipsis')).toEqual(
      true
    );
  });
});

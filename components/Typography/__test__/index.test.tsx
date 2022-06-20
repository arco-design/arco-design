import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import Typography from '..';
import IconCopy from '../../../icon/react-icon/IconCopy';
import { sleep } from '../../../tests/util';
import copy from '../../_util/clipboard';

const { Title, Text, Paragraph } = Typography;

jest.mock('../../_util/clipboard', () => {
  const originalModule = jest.requireActual('../../_util/clipboard');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
  };
});

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

describe('Typography', () => {
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

  it('basic bold', () => {
    const wrapper = mount(<Text bold mark code underline delete />);
    expect(wrapper.find('.arco-typography')).toHaveLength(1);
    expect(wrapper.find('b')).toHaveLength(1);
    expect(wrapper.find('mark')).toHaveLength(1);
    expect(wrapper.find('code')).toHaveLength(1);
    expect(wrapper.find('u')).toHaveLength(1);
    expect(wrapper.find('del')).toHaveLength(1);
  });

  it('basic title Render', () => {
    const wrapper = mount(<Title heading={1}>Basic Title</Title>);
    expect(wrapper.find('h1')).toHaveLength(1);

    act(() => {
      wrapper.setProps({ heading: 3 });
      wrapper.update();
    });

    expect(wrapper.find('h3')).toHaveLength(1);
  });

  it('specal Paragraph render', () => {
    const wrapper = mount(
      <Paragraph className="paragraph-test" spacing="close">
        Paragraph with customize className
      </Paragraph>
    );

    expect(wrapper.find('Base').hasClass('paragraph-test')).toBeTruthy();
    expect(wrapper.find('Base').hasClass('arco-typography-spacing-close')).toBeTruthy();
  });

  it('support copyable', async () => {
    const onCopy = jest.fn();
    const wrapper = mount(<Text copyable={{ onCopy, icon: <IconCopy /> }}>copyable test</Text>);
    expect(wrapper.find('IconCopy')).toHaveLength(1);

    act(() => {
      wrapper.find('.arco-typography-operation-copy').simulate('click');
      wrapper.update();
    });

    expect(copy).toHaveBeenCalled();
    expect(onCopy).toHaveBeenCalled();

    await act(async () => {
      sleep(3000);
    });

    expect(wrapper.find('IconCopy')).toHaveLength(0);
    expect(wrapper.find('IconCheckCircleFill')).toHaveLength(1);
  });

  it('support editable correctly', () => {
    const beforeText = 'editable text';
    const afterText = 'after-edited text';

    const onStart = jest.fn();
    const onEnd = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
      <Paragraph editable={{ onChange, onStart, onEnd }}>{beforeText}</Paragraph>
    );
    act(() => {
      wrapper.find('.arco-typography-operation-edit').simulate('click');
      wrapper.update();
    });

    expect(onStart).toHaveBeenCalledTimes(1);
    expect(wrapper.find('TextArea')).toHaveLength(1);

    act(() => {
      wrapper.find('TextArea').simulate('change', {
        target: {
          value: afterText,
        },
      });
      wrapper.update();
    });

    expect(onChange.mock.calls[0][0]).toEqual(afterText);
    act(() => {
      wrapper.find('TextArea').simulate('blur');
      wrapper.setProps({
        children: afterText,
      });
    });
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toEqual(afterText);
  });

  const mockText = 'A design is a plan or specification for the construction';
  it('support basic ellipsis', async () => {
    const onEllipsis = jest.fn();
    const wrapper = mount(<Paragraph ellipsis={{ onEllipsis }}>{mockText}</Paragraph>);

    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(1);
    const ellipsisStyle1 = wrapper.find('.arco-typography-simple-ellipsis > span').props().style;
    expect(ellipsisStyle1?.textOverflow).toEqual('ellipsis');
    expect(ellipsisStyle1?.WebkitLineClamp).toBeFalsy();
    expect(onEllipsis).toHaveBeenCalledWith(true);
    wrapper.setProps({
      ellipsis: {
        rows: 2,
      },
    });
    const ellipsisStyle2 = wrapper.find('.arco-typography-simple-ellipsis > span').props().style;
    expect(ellipsisStyle2?.WebkitLineClamp).toEqual('2');
  });

  it('support expand when ellipsis', async () => {
    const onExpand = jest.fn();
    const wrapper = mount(
      <Paragraph ellipsis={{ onExpand, expandNodes: ['Less', 'More'], expandable: true }}>
        {mockText}
      </Paragraph>
    );

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
    expect(onExpand.mock.calls[0][0]).toBe(false);

    act(() => {
      wrapper.setProps({ ellipsis: { expandable: false } });
    });
    expect(wrapper.find('.arco-typography-operation-expand')).toHaveLength(0);
  });

  it('support tooltip when ellipsis', async () => {
    const wrapper = mount(
      <Paragraph
        ellipsis={{
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
    const showText = wrapper.text();
    expect(showText).toEqual(mockText);
    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(1);
    expect(wrapper.find('Tooltip')).toHaveLength(1);
  });

  it('ellipsis correctly when children is controlled', async () => {
    const wrapper = mount(<Paragraph ellipsis={{ rows: 2 }}>{mockText}</Paragraph>);
    expect(wrapper.text()).toEqual(mockText);

    const resetText = `new children`;

    act(() => {
      wrapper.setProps({
        children: resetText + mockText,
      });
      wrapper.update();
    });

    expect(wrapper.text()).toEqual(resetText + mockText);
  });

  it('ellipsis controlled scene', async () => {
    const wrapper = mount(
      <Paragraph ellipsis={{ rows: 2, expanded: true, cssEllipsis: false }}>{mockText}</Paragraph>
    );
    await sleep(200);
    wrapper.update();
    expect(wrapper.text().length).toEqual(mockText.length);

    act(() => {
      wrapper.setProps({ ellipsis: { rows: 2, expanded: false, cssEllipsis: false } });
      wrapper.update();
    });
    await sleep(200);
    expect(wrapper.text().length).toEqual(LINE_STR_COUNT * 2);

    act(() => {
      wrapper.setProps({
        ellipsis: { rows: 2, expanded: false, cssEllipsis: true },
      });
      wrapper.update();
    });
    expect(wrapper.text().length).toEqual(mockText.length);
    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(1);
    expect(
      wrapper.find('.arco-typography-simple-ellipsis > span').props().style?.WebkitLineClamp
    ).toEqual('2');
  });

  it('support defaultEllipsis scene', async () => {
    const wrapper = mount(
      <Paragraph ellipsis={{ rows: 2, defaultExpanded: false }}>{mockText}</Paragraph>
    );
    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(1);

    act(() => {
      wrapper.setProps({ ellipsis: { rows: 2, expanded: true, defaultExpanded: false } });
      wrapper.update();
    });
    expect(wrapper.find('.arco-typography-simple-ellipsis')).toHaveLength(0);
  });

  it('render expanding operation correctly', async () => {
    const wrapper = mount(<Paragraph ellipsis={{ expandable: true }}>{mockText}</Paragraph>);
    await sleep(200);
    wrapper.update();
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

  it('support ellipsis in code mode', () => {
    const wrapper = mount(
      <Paragraph ellipsis={{ rows: 2, expandable: true }} code mark>
        {mockText}
      </Paragraph>
    );
    expect(wrapper.find('code')).toHaveLength(1);
    expect(wrapper.find('mark')).toHaveLength(1);
    expect(wrapper.text().length).toEqual(mockText.length + 2);
    expect(wrapper.find('code').hasClass('arco-typography-simple-ellipsis')).toEqual(true);
  });
});

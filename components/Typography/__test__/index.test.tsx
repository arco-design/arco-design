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
      typeof cb === 'function' && cb();
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

const _getComputedStyle = window.getComputedStyle;
const _getHtmlOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight'
).get;
describe('Typography', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() {
        const html = this.innerHTML;
        const text = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(text.length / LINE_STR_COUNT);
        return lines * 16;
      },
    });

    window.getComputedStyle = (ele) => {
      const style = _getComputedStyle(ele);
      style.lineHeight = '16px';
      return style;
    };
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: _getHtmlOffsetHeight,
    });
    window.getComputedStyle = _getComputedStyle;
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
      wrapper.setProps({ children: afterText });
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
    });

    expect(wrapper.text()).toEqual(afterText);
    expect(onEnd).toHaveBeenCalledTimes(1);
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

  it('support simple ellipsis when just set rows toBe 1', async () => {
    const wrapper = mount(<Paragraph ellipsis>{mockText}</Paragraph>);
    await sleep(200);
    wrapper.update();
    expect(wrapper.find('.arco-typography').hasClass('arco-typography-simple-ellipsis')).toBe(true);
  });
});

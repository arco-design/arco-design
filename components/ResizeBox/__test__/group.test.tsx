import React, { ReactNode } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import ResizeBox from '..';
import Typography from '../../Typography';
import { IconPlus } from '../../../icon';
import Button from '../../Button';

const wrapperRef = {
  offsetWidth: 800,
  offsetHeight: 600,
};

const triggerContentRect = {
  width: 6,
  height: 8,
};

const triggerPrefixCls = 'arco-resizebox-trigger';

const groupPrefixCls = 'arco-resizebox-split-group';

jest.mock('resize-observer-polyfill', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((cb) => {
    try {
      typeof cb === 'function' && cb([{ contentRect: triggerContentRect }]);
    } catch (e) {}

    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
  }),
}));

beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { value: wrapperRef.offsetWidth });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    value: wrapperRef.offsetHeight,
  });
});

afterEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    value: HTMLElement.prototype.offsetWidth,
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    value: HTMLElement.prototype.offsetHeight,
  });
});

describe('ResizeBox Split Group', () => {
  it('render one panes correctly', () => {
    const wrapper = mount(
      <ResizeBox.SplitGroup
        panes={[
          {
            content: <Typography.Text>text1</Typography.Text>,
          },
        ]}
      />
    );
    expect(wrapper.find('Text')).toHaveLength(1);
    const pane = wrapper.find(`.${groupPrefixCls}-pane`);
    expect(pane.prop('style')).toEqual({ flexBasis: `calc(${wrapperRef.offsetWidth}px - 0px)` });
  });

  it('render direction vertical correctly', () => {
    const panes = [{ size: 0.2 }, {}];
    const wrapper = mount(
      <ResizeBox.SplitGroup
        direction="vertical"
        panes={panes.map((obj) => {
          return {
            content: <Typography.Text>text </Typography.Text>,
            ...obj,
          };
        })}
      />
    );

    expect(wrapper.find('Text')).toHaveLength(2);
    expect(wrapper.find(`.${triggerPrefixCls}`)).toHaveLength(1);
    const pane1 = wrapper.find(`.${groupPrefixCls}-pane`).at(0);
    const pane2 = wrapper.find(`.${groupPrefixCls}-pane`).at(1);
    expect(pane1.prop('style')).toEqual({
      flexBasis: `calc(${wrapperRef.offsetHeight * 0.2}px - ${triggerContentRect.height / 2}px)`,
    });
    expect(pane2.prop('style')).toEqual({
      flexBasis: `calc(${wrapperRef.offsetHeight * 0.8}px - ${triggerContentRect.height / 2}px)`,
    });
  });

  it('handle collapsed correctly', () => {
    const panes = new Array(4).fill('');
    const prevFn = jest.fn();
    const nextFn = jest.fn();
    const mockMoving = jest.fn();
    const wrapper = mount(
      <ResizeBox.SplitGroup
        panes={panes.map((_, index) => {
          return {
            content: <Typography.Text>text {index}</Typography.Text>,
            collapsible: {
              prev: {
                onClick: prevFn,
              },
              next: {
                onClick: nextFn,
              },
            },
          };
        })}
        onMoving={mockMoving}
      />
    );

    const basicOffset = wrapperRef.offsetWidth / panes.length;

    expect(wrapper.find('Text')).toHaveLength(panes.length);
    act(() => {
      wrapper
        .find(`.${triggerPrefixCls}`)
        .at(0)
        .find(`.${triggerPrefixCls}-next`)
        .simulate('click');
    });

    const params = nextFn.mock.calls[0];
    expect(params.slice(1)).toEqual([0, 'next', true]);

    const movingParams = mockMoving.mock.calls[0];
    expect(movingParams[1]).toEqual([
      `${basicOffset * 2}px`,
      '0px',
      `${basicOffset}px`,
      `${basicOffset}px`,
    ]);
    expect(movingParams[2]).toEqual(0);

    act(() => {
      wrapper.find(`.${triggerPrefixCls}`).at(0).update();
    });
    expect(
      wrapper.find(`.${triggerPrefixCls}`).at(0).find(`.${triggerPrefixCls}-icon-empty`)
    ).toHaveLength(1);
  });

  it('set pane min correctly when collapsiable', () => {
    const min = 0.1;
    const panes = [{ collapsible: true }, { min, collapsible: true }, {}, {}];
    const mockMoving = jest.fn();
    const wrapper = mount(
      <ResizeBox.SplitGroup
        direction="vertical"
        panes={panes.map((obj) => {
          return {
            content: <Typography.Text>text </Typography.Text>,
            ...obj,
          };
        })}
        onMoving={mockMoving}
      />
    );

    const basicOffset = wrapperRef.offsetHeight / panes.length;
    const minOffset = wrapperRef.offsetHeight * min;
    act(() => {
      wrapper
        .find(`.${triggerPrefixCls}`)
        .at(1)
        .find(`.${triggerPrefixCls}-prev`)
        .simulate('click');
    });

    expect(mockMoving).toHaveBeenCalledTimes(1);
    const movingParams = mockMoving.mock.calls[0];

    expect(movingParams[1]).toEqual([
      `${basicOffset}px`,
      `${minOffset}px`,
      `${basicOffset * 2 - minOffset}px`,
      `${basicOffset}px`,
    ]);
    expect(movingParams[2]).toEqual(1);
  });

  it('set size correctly', () => {
    const panes = [{ size: 0.1 }, { size: '80px' }, { size: 0.2 }, {}, {}];
    const wrapper = mount(
      <ResizeBox.SplitGroup
        panes={panes.map((obj) => {
          return {
            content: <Typography.Text>text </Typography.Text>,
            ...obj,
          };
        })}
      />
    );
    const panesEl = wrapper.find(`.${groupPrefixCls}-pane`);
    const offsetWidth = wrapperRef.offsetWidth;
    const triggerWidth = triggerContentRect.width;

    const averageWidth = (offsetWidth - offsetWidth * 0.3 - 80) / 2;

    expect(panesEl.at(0).prop('style')).toEqual({
      flexBasis: `calc(${offsetWidth * 0.1}px - 0px)`,
    });

    expect(panesEl.at(1).prop('style')).toEqual({
      flexBasis: `calc(80px - 0px)`,
    });

    expect(panesEl.at(2).prop('style')).toEqual({
      flexBasis: `calc(${offsetWidth * 0.2}px - 0px)`,
    });

    expect(panesEl.at(3).prop('style')).toEqual({
      flexBasis: `calc(${averageWidth}px - ${triggerWidth / 2}px)`,
    });

    expect(panesEl.at(4).prop('style')).toEqual({
      flexBasis: `calc(${averageWidth}px - ${triggerWidth / 2}px)`,
    });
  });

  it('render customer icon and trigger correctly', () => {
    const panes = [
      {
        collapsible: {
          prev: {
            icon: (<IconPlus />) as ReactNode,
          },
        },
        trigger: (prev: ReactNode, resize: ReactNode, next: ReactNode): ReactNode => (
          <Button>
            {prev}
            {resize}
            {next}
          </Button>
        ),
      },
      {},
    ];

    const wrapper = mount(
      <ResizeBox.SplitGroup
        panes={panes.map((obj) => {
          return {
            content: <Typography.Text>text </Typography.Text>,
            ...obj,
          };
        })}
      />
    );

    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('Button').find('IconPlus')).toHaveLength(1);
  });
});

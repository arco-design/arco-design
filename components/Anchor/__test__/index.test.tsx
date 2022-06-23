import React from 'react';
import { act } from 'react-test-renderer';
import mountTest from '../../../tests/mountTest';
import Anchor, { AnchorProps } from '..';
import { isString } from '../../_util/is';
import { findNode } from '../utils';
import * as utilModal from '../utils';
import componentConfigTest from '../../../tests/componentConfigTest';
import { render, sleep, fireEvent, cleanup } from '../../../tests/util';

const { Link } = Anchor;

mountTest(Anchor);
componentConfigTest(Anchor, 'Anchor');

jest.mock('compute-scroll-into-view', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => {
    return [
      {
        el: window,
        top: 100,
        left: 0,
      },
    ];
  }),
}));

interface TestAnchorState {
  currentLink: string;
}

type TestAnchorProps = AnchorProps;

class TestAnchor extends React.Component<TestAnchorProps, TestAnchorState> {
  state: {
    currentLink: '';
  };

  scrollEventHandler() {}

  getContainer() {
    return (
      (isString(this.props.scrollContainer)
        ? findNode(document, this.props.scrollContainer)
        : this.props.scrollContainer) || window
    );
  }

  render() {
    return (
      <Anchor
        {...this.props}
        onChange={(val, last) => {
          this.setState({
            ...this.state,
            currentLink: val,
          });
          this.props.onChange && this.props.onChange(val, last);
        }}
      >
        {this.props.children}
      </Anchor>
    );
  }
}

function mountTestAnchor(component: React.ReactElement) {
  return render(component);
}

function mountAnchor(component: React.ReactElement) {
  return render(component);
}

function AnchorContainer(props: { num?: number }) {
  const { num = 20 } = props;
  return (
    <div id="scrollContainer">
      {[...new Array(num)].map((_, i) => (
        <div id={`anchor${i}`} key={i}>
          <p id={`anchor${i}-start`}>{i}</p>
          {[...new Array(10)].map((_, _key) => (
            <p key={_key}>{i}</p>
          ))}
          <p id={`anchor${i}-end`}>{i}</p>
        </div>
      ))}
    </div>
  );
}

let container: HTMLDivElement | null = document.createElement('div');
let mockFindNode: jest.SpyInstance;

beforeAll(() => {
  container && document.body.appendChild(container);
});

afterEach(() => {
  if (mockFindNode && mockFindNode.mockReset) {
    mockFindNode.mockReset();
  }
});

afterAll(() => {
  container && document.body.removeChild(container);
  container = null;
  cleanup();
  jest.clearAllMocks();
});

describe('Anchor', () => {
  it('Anchor to the link correctly', async () => {
    const handleClick = jest.fn();
    const handleSelect = jest.fn();
    const wrapper = mountTestAnchor(
      <TestAnchor onChange={handleClick} onSelect={handleSelect}>
        <Link href="#b" title="demo B" />
      </TestAnchor>
    );
    fireEvent.click(wrapper.find('a[href="#b"]')[0]);
    await sleep(500);

    expect(wrapper.querySelector('a[href="#b"]').parentNode).toHaveClass('arco-anchor-link-active');
    expect(handleClick.mock.calls.length).toBe(1);
    expect(handleSelect.mock.calls.length).toBe(1);
  });

  it('Anchor not fixed', () => {
    const wrapper = mountAnchor(
      <Anchor affix={false}>
        <Link href="#a" title="demo A" />
      </Anchor>
    );
    expect(wrapper.container.firstElementChild).toHaveClass('arco-anchor');
  });

  it('should run correctly when set scrollContainer', async () => {
    const handleClick = jest.fn();
    const wrapper = render(
      <div>
        <div
          id="scroll"
          style={{
            height: 150,
            width: 50,
            overflow: 'auto',
            border: '1px solid',
          }}
        >
          <div>
            {[...new Array(20)].map((_, i) => (
              <div id={`anchor${i}`} key={i}>
                {/* <a href={`#anchor${i}`}>{i}</a> */}
                {i}
              </div>
            ))}
          </div>
        </div>
        <Anchor
          onChange={handleClick}
          scrollContainer={document.getElementById('scroll') as HTMLElement}
        >
          {[...new Array(20)].map((_, i) => (
            <Link href={`#anchor${i}`} title={i} key={i} />
          ))}
        </Anchor>
      </div>
    );
    act(() => {
      fireEvent.click(wrapper.container.querySelector("a[href='#anchor19']") as Element);
    });
    await sleep(500);
    expect(handleClick.mock.calls.length).toBe(1);
  });

  it('should remove listener when unmount', async () => {
    const add = jest.spyOn(window, 'addEventListener');
    const wrapper = mountAnchor(
      <Anchor>
        <Link href="#a" title="demo a" />
      </Anchor>
    );
    expect(add).toHaveBeenCalled();
    const remove = jest.spyOn(window, 'removeEventListener');
    wrapper.unmount();
    expect(remove).toHaveBeenCalled();
  });

  it('should unregister link when unmount children', async () => {
    const wrapper = mountTestAnchor(
      <TestAnchor>
        <Link href="#a" title="a" />
        <Link href="#b" title="b" />
      </TestAnchor>
    );
    expect(wrapper.find('.arco-anchor-link')).toHaveLength(2);
    wrapper.rerender(<TestAnchor />);
    expect(wrapper.find('.arco-anchor-link')).toHaveLength(0);
  });

  // it('can refresh links when the hash not render in Anchor.Link', () => {
  //   const customerHashId = 'custom';
  //   const wrapper = mount(
  //     <div>
  //       <Anchor>
  //         <Link href="#a" title="a" />
  //         <Link href="#b" title="b" />
  //       </Anchor>
  //     </div>
  //   );

  //   container.id = customerHashId;
  //   mockFindNode = jest.spyOn(utilModal, 'findNode').mockImplementation(() => {
  //     return container;
  //   });
  //   const currentCount = mockFindNode.mock.calls.length;

  //   const AnchorInstance = wrapper.find('Anchor').instance() as Anchor;
  //   AnchorInstance.handleAnchorChange(`#${customerHashId}`);
  //   expect(mockFindNode).toHaveBeenCalledTimes(currentCount + 1);
  //   expect(AnchorInstance.links[`#${customerHashId}`]).not.toBeUndefined();

  //   container.id = undefined;
  // });

  // it('support the scrollContainer scene', async () => {
  //   const wrapper = mount(
  //     <div>
  //       <AnchorContainer />
  //       <Anchor boundary="center" scrollContainer={document.getElementById('scrollContainer')}>
  //         {[...new Array(20)].map((_, i) => (
  //           <Link key={i} href={`#anchor${i}`} title={i} />
  //         ))}
  //       </Anchor>
  //     </div>
  //   );
  //   const AnchorElment: ReactWrapper<HTMLAttributes, Anchor> = wrapper.find('Anchor');

  //   const scrollContainer = (AnchorElment.instance() as Anchor).getContainerElement();

  //   expect((scrollContainer as HTMLElement).id === 'scrollContainer');
  // });

  it('scrollContainer can be changed', () => {
    const containerMock = jest.spyOn(utilModal, 'getContainer');

    const wrapper = mountTestAnchor(
      <TestAnchor scrollContainer={document.getElementById('scrollContainer') as HTMLElement}>
        <Link href="#a" title="demo A" />
        <Link href="#b" title="demo B" />
      </TestAnchor>
    );

    wrapper.rerender(
      <TestAnchor scrollContainer={document.body}>
        <Link href="#a" title="demo A" />
        <Link href="#b" title="demo B" />
      </TestAnchor>
    );

    // 去除原来监听1次。
    // 监听新的scrollContainer1次。
    // 透传到affix=>useCallback 再调用getContainer
    expect(containerMock).toHaveBeenCalledTimes(4);
  });

  it('should call utils function correctly', () => {
    const anchorId = 'anchor4';
    const mockSlide = jest.spyOn(utilModal, 'slide');
    mockFindNode = jest.spyOn(utilModal, 'findNode').mockImplementation(() => {
      return container;
    });
    const wrapper = render(
      <div>
        <AnchorContainer />
        <Anchor>
          {[...new Array(20)].map((_, i) => (
            <Link key={i} href={`#anchor${i}`} title={i} />
          ))}
        </Anchor>
      </div>
    );

    const currentCount = mockFindNode.mock.calls.length;
    expect(currentCount > 0 && currentCount <= 20).toBeTruthy();

    act(() => {
      fireEvent.click(wrapper.find(`a[href='#${anchorId}']`)[0]);
    });

    expect(mockFindNode).toHaveBeenCalledTimes(currentCount + 1);
    expect(mockFindNode.mock.calls[currentCount][1]).toBe(`#${anchorId}`);
    // expect(mockSlide).toHaveBeenCalledTimes(1);

    // mockSlide第一次调用的第二个参数，即top。mock结果是100
    expect(mockSlide.mock.calls[0][1]).toEqual(100);
  });
});

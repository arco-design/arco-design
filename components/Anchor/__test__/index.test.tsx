import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import mountTest from '../../../tests/mountTest';
import Anchor, { AnchorProps } from '..';
import { isString } from '../../_util/is';
import { findNode } from '../utils';
import * as utilModal from '../utils';
import componentConfigTest from '../../../tests/componentConfigTest';

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
  return mount<TestAnchor, React.PropsWithChildren<TestAnchorProps>, TestAnchorState>(component);
}

function mountAnchor(component: React.ReactElement) {
  return mount<typeof Anchor, React.PropsWithChildren<AnchorProps>>(component);
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

let container = document.createElement('div');
let mockFindNode: jest.SpyInstance;

beforeAll(() => {
  document.body.appendChild(container);
});

afterEach(() => {
  if (mockFindNode && mockFindNode.mockReset) {
    mockFindNode.mockReset();
  }
});

afterAll(() => {
  document.body.removeChild(container);
  container = undefined;
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
    wrapper.find('a[href="#b"]').simulate('click');
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(wrapper.state().currentLink).toBe('#b');
    expect(handleClick.mock.calls.length).toBe(1);
    expect(handleSelect.mock.calls.length).toBe(1);
    expect(wrapper.props);
  });

  it('Anchor correctly when scroll', async () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
    mount(<div id="a">demo A</div>, { attachTo: root });
    const wrapper = mountTestAnchor(
      <TestAnchor>
        <Link href="#a" title="demo A" />
      </TestAnchor>
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(wrapper.state().currentLink).toBe('#a');
    expect(wrapper.find('Affix').exists()).toBeTruthy();
  });

  it('Anchor not fixed', () => {
    const wrapper = mountAnchor(
      <Anchor affix={false}>
        <Link href="#a" title="demo A" />
      </Anchor>
    );
    expect(wrapper.find('Affix').exists()).toBeFalsy();
  });

  it('should run correctly when set scrollContainer', async () => {
    const handleClick = jest.fn();
    const wrapper = mount(
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
                <a href={`#anchor${i}`}>{i}</a>
              </div>
            ))}
          </div>
        </div>
        <Anchor onChange={handleClick} scrollContainer={document.getElementById('scroll')}>
          {[...new Array(20)].map((_, i) => (
            <Link href={`#anchor${i}`} title={i} key={i} />
          ))}
        </Anchor>
      </div>
    );
    wrapper
      .find('Anchor')
      .find("a[href='#anchor4']")
      .simulate('click');
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(handleClick.mock.calls.length).toBe(1);
  });

  it('should remove listener when unmount', async () => {
    const wrapper = mountAnchor(
      <Anchor>
        <Link href="#a" title="demo a" />
      </Anchor>
    );
    const add = jest.spyOn(window, 'addEventListener');
    wrapper.mount();
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
    wrapper.setProps({ children: null });
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
      <TestAnchor scrollContainer={document.getElementById('scrollContainer')}>
        <Link href="#a" title="demo A" />
        <Link href="#b" title="demo B" />
      </TestAnchor>
    );

    act(() => {
      wrapper.setProps({
        scrollContainer: document.body,
      });
    });

    // 去除原来监听1次。
    // 监听新的scrollContainer1次。
    expect(containerMock).toHaveBeenCalledTimes(2);
  });

  it('should call utils function correctly', () => {
    const anchorId = 'anchor4';
    const mockSlide = jest.spyOn(utilModal, 'slide');
    mockFindNode = jest.spyOn(utilModal, 'findNode').mockImplementation(() => {
      return container;
    });
    const wrapper = mount(
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
      wrapper
        .find('Anchor')
        .find(`a[href='#${anchorId}']`)
        .simulate('click');
    });

    expect(mockFindNode).toHaveBeenCalledTimes(currentCount + 1);
    expect(mockFindNode.mock.calls[currentCount][1]).toBe(`#${anchorId}`);
    expect(mockSlide).toHaveBeenCalledTimes(1);

    // mockSlide第一次调用的第二个参数，即top。mock结果是100
    expect(mockSlide.mock.calls[0][1]).toEqual(100);
  });
});

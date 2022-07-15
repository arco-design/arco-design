import React from 'react';
import { act } from 'react-test-renderer';
import mountTest from '../../../tests/mountTest';
import Drawer from '..';
import Button from '../../Button';
import { render, fireEvent } from '../../../tests/util';

mountTest(Drawer);

interface DemoTestState {
  visible: boolean;
}

class DemoTest extends React.Component<{}, DemoTestState> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  open = () => {
    this.setState({
      visible: true,
    });
  };

  onConfirm = () => {
    this.setState({
      visible: false,
    });
  };

  onCancel = () => {
    this.setState({
      visible: false,
    });
  };

  afterOpen = jest.fn(() => {});

  afterClose = jest.fn(() => {});

  render() {
    const { visible } = this.state;
    return (
      <>
        <Button onClick={this.open} type="primary" className="open-btn">
          Open
        </Button>
        <Drawer
          title="Title"
          visible={visible}
          placement="bottom"
          onOk={this.onConfirm}
          onCancel={this.onCancel}
          afterOpen={this.afterOpen}
          afterClose={this.afterClose}
        >
          内容
        </Drawer>
      </>
    );
  }
}

const openDrawer = (wrapper) => {
  fireEvent.click(wrapper.find('.open-btn')[0]);
};

describe('Drawer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.runAllTimers();
  });

  it('open drawer correctly', () => {
    const wrapper = render(<DemoTest />);
    expect(wrapper.find('.arco-drawer')).toHaveLength(0);
    // drawer mask correctly
    expect(wrapper.find('.arco-drawer-mask').length).toBe(0);

    act(() => {
      openDrawer(wrapper);
      jest.runAllTimers();
    });

    expect(wrapper.find('.arco-drawer')).toHaveLength(1);
    expect(wrapper.find('.arco-drawer-mask').length).toBe(1);
    wrapper.unmount();
  });

  it('onConfirm and onCancel correctly', () => {
    const wrapper = render(<DemoTest />);

    act(() => {
      openDrawer(wrapper);
      jest.runAllTimers();
    });

    expect(wrapper.find('.arco-drawer-wrapper')[0].style.display).toBe('block');
    expect(wrapper.find('.arco-drawer-footer > .arco-btn-primary')[0]).toHaveTextContent('确定');
    act(() => {
      fireEvent.click(wrapper.find('.arco-drawer-footer>.arco-btn-primary')[0]);
      jest.runAllTimers();
    });
    expect(
      wrapper.find('.arco-drawer-wrapper')[0].classList.contains('arco-drawer-wrapper-hide')
    ).toBe(true);

    act(() => {
      openDrawer(wrapper);
      jest.runAllTimers();
    });
    expect(wrapper.find('.arco-drawer-wrapper')[0].style.display).toBe('block');
    expect(wrapper.find('.arco-drawer-footer > .arco-btn-secondary')[0]).toHaveTextContent('取消');

    act(() => {
      fireEvent.click(wrapper.find('.arco-drawer-footer > .arco-btn-secondary')[0]);
      jest.runAllTimers();
    });

    expect(
      wrapper.find('.arco-drawer-wrapper')[0].classList.contains('arco-drawer-wrapper-hide')
    ).toBe(true);
    openDrawer(wrapper);
    expect(wrapper.find('.arco-drawer-wrapper')[0].style.display).toBe('block');
    expect(wrapper.find('.arco-drawer-mask')).toHaveLength(1);
    act(() => {
      fireEvent.click(document?.querySelector('.arco-drawer-mask') as Element);
      jest.runAllTimers();
    });
    expect(
      wrapper.find('.arco-drawer-wrapper')[0].classList.contains('arco-drawer-wrapper-hide')
    ).toBe(true);
    wrapper.unmount();
  });
});

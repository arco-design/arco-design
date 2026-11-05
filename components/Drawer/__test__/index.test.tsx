import React from 'react';
import mountTest from '../../../tests/mountTest';
import Drawer, { DrawerProps } from '..';
import Button from '../../Button';
import Form from '../../Form';
import Input from '../../Input';
import { render, fireEvent, act, cleanup } from '../../../tests/util';
import { Esc } from '../../_util/keycode';

mountTest(Drawer);

interface DemoTestState {
  visible: boolean;
}

class DemoTest extends React.Component<DrawerProps, DemoTestState> {
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
          {...this.props}
        >
          <p id="test-content">内容</p>
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
    cleanup();
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it.each([
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ])(
    'completes repeated transitions with mountOnEnter=%s and unmountOnExit=%s',
    (mountOnEnter, unmountOnExit) => {
      const afterOpen = jest.fn();
      const afterClose = jest.fn();
      const wrapper = render(
        <DemoTest
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
          afterOpen={afterOpen}
          afterClose={afterClose}
        />
      );

      expect(wrapper.find('.arco-drawer-wrapper')).toHaveLength(mountOnEnter ? 0 : 1);

      for (let cycle = 1; cycle <= 3; cycle++) {
        openDrawer(wrapper);
        act(() => {
          jest.runAllTimers();
        });
        expect(afterOpen).toHaveBeenCalledTimes(cycle);

        fireEvent.click(wrapper.find('.arco-drawer-close-icon')[0]);
        // Keep the wrapper mounted until the closing transition finishes.
        expect(wrapper.find('.arco-drawer-wrapper')).toHaveLength(1);
        expect(afterClose).toHaveBeenCalledTimes(cycle - 1);

        act(() => {
          jest.runAllTimers();
        });
        expect(afterClose).toHaveBeenCalledTimes(cycle);
        expect(wrapper.find('.arco-drawer-wrapper')).toHaveLength(unmountOnExit ? 0 : 1);
      }

      wrapper.unmount();
    }
  );

  it('resets the preserved form in afterClose after every cancellation', () => {
    function FormDrawer() {
      const [visible, setVisible] = React.useState(false);
      const [form] = Form.useForm();

      return (
        <>
          <Button className="open-btn" onClick={() => setVisible(true)}>
            Open
          </Button>
          <Drawer
            visible={visible}
            unmountOnExit
            onCancel={() => setVisible(false)}
            afterClose={() => form.resetFields()}
          >
            <Form form={form}>
              <Form.Item field="name">
                <Input placeholder="Name" />
              </Form.Item>
            </Form>
          </Drawer>
        </>
      );
    }

    const wrapper = render(<FormDrawer />);

    for (let cycle = 1; cycle <= 3; cycle++) {
      openDrawer(wrapper);
      act(() => {
        jest.runAllTimers();
      });
      const input = wrapper.getByPlaceholderText('Name');
      expect(input).toHaveValue('');
      fireEvent.change(input, { target: { value: `cancelled-${cycle}` } });
      fireEvent.click(wrapper.find('.arco-drawer-footer > .arco-btn-secondary')[0]);
      act(() => {
        jest.runAllTimers();
      });
    }

    wrapper.unmount();
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

    act(() => {
      fireEvent.click(wrapper.find('.arco-drawer-close-icon').item(0));

      jest.runAllTimers();
    });

    expect(
      wrapper.find('.arco-drawer-wrapper')[0].classList.contains('arco-drawer-wrapper-hide')
    ).toBe(true);
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

  it('closable=false', () => {
    const wrapper = render(<DemoTest closable={false} />);
    expect(wrapper.find('.arco-drawer')).toHaveLength(0);
    // drawer mask correctly
    expect(wrapper.find('.arco-drawer-mask').length).toBe(0);

    act(() => {
      openDrawer(wrapper);
      jest.runAllTimers();
    });

    expect(wrapper.find('.arco-drawer')).toHaveLength(1);
    expect(wrapper.find('.arco-drawer-close-icon').length).toBe(0);
    wrapper.unmount();
  });

  it('closeicon=xxx', () => {
    const wrapper = render(<DemoTest closeIcon="xxx" />);
    expect(wrapper.find('.arco-drawer')).toHaveLength(0);
    // drawer mask correctly
    expect(wrapper.find('.arco-drawer-mask').length).toBe(0);

    act(() => {
      openDrawer(wrapper);
      jest.runAllTimers();
    });

    expect(wrapper.find('.arco-drawer')).toHaveLength(1);
    expect(wrapper.find('.arco-drawer-close-icon').length).toBe(1);
    expect(wrapper.find('.arco-drawer-close-icon').item(0).textContent).toBe('xxx');

    act(() => {
      fireEvent.click(wrapper.find('.arco-drawer-close-icon').item(0));

      jest.runAllTimers();
    });

    expect(
      wrapper.find('.arco-drawer-wrapper')[0].classList.contains('arco-drawer-wrapper-hide')
    ).toBe(true);

    wrapper.unmount();
  });

  it('esc', () => {
    const wrapper = render(<DemoTest />);
    expect(wrapper.find('.arco-drawer')).toHaveLength(0);
    // drawer mask correctly
    expect(wrapper.find('.arco-drawer-mask').length).toBe(0);

    act(() => {
      openDrawer(wrapper);
      jest.runAllTimers();
    });

    expect(wrapper.find('.arco-drawer')).toHaveLength(1);

    act(() => {
      fireEvent.keyDown(document.querySelector('#test-content') as HTMLElement, {
        keyCode: Esc.code,
      });

      jest.runAllTimers();
    });

    expect(
      wrapper.find('.arco-drawer-wrapper')[0].classList.contains('arco-drawer-wrapper-hide')
    ).toBe(true);

    wrapper.unmount();
  });
});

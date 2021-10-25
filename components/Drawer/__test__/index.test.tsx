import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Drawer from '..';
import Button from '../../Button';
import { $ } from '../../../tests/util';

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
        <Button onClick={this.open} type="primary">
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

function mountDemoTest(component: React.ReactElement) {
  return mount<DemoTest, React.PropsWithChildren<{}>, DemoTestState>(component);
}

const openDrawer = (wrapper) => {
  wrapper
    .find('button')
    .filterWhere((n) => n.text() === 'Open')
    .simulate('click');
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
    const wrapper = mountDemoTest(<DemoTest />);
    expect(wrapper.find('.arco-drawer')).toHaveLength(0);
    expect(wrapper.find(Drawer).props().visible).toBe(false);
    // drawer mask correctly
    expect(wrapper.find('.arco-drawer-mask').length).toBe(0);

    openDrawer(wrapper);

    expect(wrapper.find('.arco-drawer')).toHaveLength(1);
    expect(wrapper.find(Drawer).props().visible).toBe(true);
    expect(wrapper.find('.arco-drawer-mask').length).toBe(1);
  });

  it('onConfirm and onCancel correctly', () => {
    const wrapper = mountDemoTest(<DemoTest />);

    openDrawer(wrapper);
    expect($('.arco-drawer-wrapper')[0].style.display).toBe('block');
    wrapper
      .find('button')
      .filterWhere((n) => n.text() === '确定')
      .simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.arco-drawer-wrapper').hasClass('arco-drawer-wrapper-hide')).toBe(true);

    openDrawer(wrapper);
    expect($('.arco-drawer-wrapper')[0].style.display).toBe('block');
    wrapper
      .find('button')
      .filterWhere((n) => n.text() === '取消')
      .simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.arco-drawer-wrapper').hasClass('arco-drawer-wrapper-hide')).toBe(true);

    openDrawer(wrapper);
    expect($('.arco-drawer-wrapper')[0].style.display).toBe('block');
    wrapper.find('.arco-drawer-mask').simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('.arco-drawer-wrapper').hasClass('arco-drawer-wrapper-hide')).toBe(true);
  });
});

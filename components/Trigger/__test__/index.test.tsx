import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-test-renderer';
import Trigger from '..';
import mountTest from '../../../tests/mountTest';

// import { sleep } from '../../../tests/util';

mountTest(Trigger);

describe('Trigger', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('default popupVisible', () => {
    const wrapper = mount(
      <Trigger
        popupVisible
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>click</a>
      </Trigger>
    );

    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('trigger click', async () => {
    const wrapper = mount(
      <Trigger
        trigger="click"
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>click</a>
      </Trigger>
    );

    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('#test')).toHaveLength(0);
    await act(() => {
      wrapper.find('a').simulate('click');
    });
    expect(wrapper.find('#test')).toHaveLength(1);

    await act(() => {
      wrapper.find('a').simulate('click');
    });

    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('#test')).toHaveLength(0);
  });
  it('trigger focus', async () => {
    const wrapper = mount(
      <Trigger
        trigger="focus"
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <input />
      </Trigger>
    );

    expect(wrapper.find('#test')).toHaveLength(0);
    await act(() => {
      wrapper.find('input').simulate('focus');
    });
    expect(wrapper.find('#test')).toHaveLength(1);

    await act(() => {
      wrapper.find('input').simulate('blur');
    });

    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('#test')).toHaveLength(0);
  });

  it('trigger hover', async () => {
    const wrapper = mount(
      <Trigger
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>hover</a>
      </Trigger>
    );

    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('#test')).toHaveLength(0);
    await act(() => {
      wrapper.find('a').simulate('mouseenter');
    });
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('#test')).toHaveLength(1);

    await act(() => {
      wrapper.find('a').simulate('mouseleave');
    });

    await act(() => {
      wrapper.find('#test').simulate('mouseenter');
    });

    wrapper.update();
    expect(wrapper.find('#test')).toHaveLength(1);

    await act(() => {
      wrapper.find('#test').simulate('mouseleave');
    });

    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('#test')).toHaveLength(0);
  });

  it('trigger hover & mouseLeaveToClose=false', async () => {
    const wrapper = mount(
      <Trigger
        trigger="hover"
        mouseLeaveToClose={false}
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>hover</a>
      </Trigger>
    );

    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('#test')).toHaveLength(0);
    await act(() => {
      wrapper.find('a').simulate('mouseenter');
    });
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('#test')).toHaveLength(1);

    await act(() => {
      wrapper.find('a').simulate('mouseleave');
    });

    await act(() => {
      wrapper.find('#test').simulate('mouseenter');
    });

    wrapper.update();
    expect(wrapper.find('#test')).toHaveLength(1);

    await act(() => {
      wrapper.find('#test').simulate('mouseleave');
    });

    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('trigger contextMenu', async () => {
    const wrapper = mount(
      <Trigger
        trigger="contextMenu"
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>click</a>
      </Trigger>
    );

    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('#test')).toHaveLength(0);
    await act(() => {
      wrapper.find('a').simulate('contextmenu');
    });
    expect(wrapper.find('#test')).toHaveLength(1);
  });
});

describe('nest', () => {
  it('disabled', async () => {
    const wrapper = mount(
      <Trigger
        trigger="click"
        popup={() => {
          return <div id="test1">123123</div>;
        }}
      >
        <Trigger
          trigger="click"
          disabled
          popup={() => {
            return <div id="test2">123123</div>;
          }}
        >
          <a>click</a>
        </Trigger>
      </Trigger>
    );

    await act(() => {
      wrapper.find('a').simulate('click');
    });
    expect(wrapper.find('#test1')).toHaveLength(1);
    expect(wrapper.find('#test2')).toHaveLength(0);
  });
});

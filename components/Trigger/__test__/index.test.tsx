import React from 'react';
import { act } from 'react-test-renderer';
import Trigger from '..';
import mountTest from '../../../tests/mountTest';
import { render, cleanup, fireEvent, sleep } from '../../../tests/util';

mountTest(Trigger);

describe('Trigger', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    cleanup();
  });

  it('trigger click', async () => {
    const wrapper = render(
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
    act(() => {
      fireEvent.click(wrapper.querySelector('a') as HTMLElement);
    });

    expect(wrapper.find('#test')).toHaveLength(1);

    act(() => {
      fireEvent.click(wrapper.querySelector('a') as HTMLElement);
    });

    jest.runAllTimers();

    expect(wrapper.find('#test')).toHaveLength(0);
  });
  it('trigger focus', async () => {
    const wrapper = render(
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
    act(() => {
      fireEvent.focus(wrapper.querySelector('input') as HTMLElement);
    });
    expect(wrapper.find('#test')).toHaveLength(1);

    act(() => {
      fireEvent.blur(wrapper.querySelector('input') as HTMLElement);
    });

    jest.runAllTimers();

    expect(wrapper.find('#test')).toHaveLength(0);
  });

  it('trigger hover', async () => {
    const wrapper = render(
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
    act(() => {
      fireEvent.mouseEnter(wrapper.querySelector('a') as HTMLElement);
    });
    jest.runAllTimers();
    expect(wrapper.find('#test')).toHaveLength(1);

    act(() => {
      fireEvent.mouseLeave(wrapper.querySelector('a') as HTMLElement);
    });

    act(() => {
      fireEvent.mouseEnter(wrapper.querySelector('#test') as HTMLElement);
    });

    expect(wrapper.find('#test')).toHaveLength(1);

    act(() => {
      fireEvent.mouseLeave(wrapper.querySelector('#test') as HTMLElement);
    });

    jest.runAllTimers();
    expect(wrapper.find('#test')).toHaveLength(0);
  });

  it('trigger hover & clickToClose=true', async () => {
    const wrapper = render(
      <Trigger
        clickToClose
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>hover</a>
      </Trigger>
    );

    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('#test')).toHaveLength(0);
    act(() => {
      fireEvent.mouseEnter(wrapper.querySelector('a') as HTMLElement);
    });
    jest.runAllTimers();
    expect(wrapper.find('#test')).toHaveLength(1);

    act(() => {
      fireEvent.click(wrapper.querySelector('a') as HTMLElement);
    });

    jest.runAllTimers();
    expect(wrapper.find('#test')).toHaveLength(0);
  });

  it('trigger hover & clickToClose=false', async () => {
    const wrapper = render(
      <Trigger
        clickToClose={false}
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>hover</a>
      </Trigger>
    );

    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('#test')).toHaveLength(0);
    act(() => {
      fireEvent.mouseEnter(wrapper.querySelector('a') as HTMLElement);
    });
    jest.runAllTimers();
    expect(wrapper.find('#test')).toHaveLength(1);

    act(() => {
      fireEvent.click(wrapper.querySelector('a') as HTMLElement);
    });

    jest.runAllTimers();
    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('trigger hover & mouseLeaveToClose=false', async () => {
    const wrapper = render(
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
    act(() => {
      fireEvent.mouseEnter(wrapper.querySelector('a') as HTMLElement);
    });
    jest.runAllTimers();
    expect(wrapper.find('#test')).toHaveLength(1);

    act(() => {
      fireEvent.mouseLeave(wrapper.querySelector('a') as HTMLElement);
    });

    act(() => {
      fireEvent.mouseEnter(wrapper.querySelector('#test') as HTMLElement);
    });

    expect(wrapper.find('#test')).toHaveLength(1);

    act(() => {
      fireEvent.mouseLeave(wrapper.querySelector('#test') as HTMLElement);
    });

    jest.runAllTimers();
    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('trigger contextMenu', async () => {
    const wrapper = render(
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
    act(() => {
      fireEvent.contextMenu(wrapper.querySelector('a') as HTMLElement);
    });
    expect(wrapper.find('#test')).toHaveLength(1);
  });
});

describe('nest', () => {
  it('disabled', async () => {
    const wrapper = render(
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

    act(() => {
      fireEvent.click(wrapper.querySelector('a') as HTMLElement);
    });
    expect(wrapper.find('#test1')).toHaveLength(1);
    expect(wrapper.find('#test2')).toHaveLength(0);
  });
});

describe('default popupVisible', () => {
  it('default popupVisible', async () => {
    jest.useRealTimers();
    const wrapper = render(
      <Trigger
        popupVisible
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>click</a>
      </Trigger>
    );

    await sleep(10);
    expect(wrapper.find('#test')).toHaveLength(1);
  });
});

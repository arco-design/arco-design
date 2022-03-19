import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-test-renderer';
import Trigger from '..';
import mountTest from '../../../tests/mountTest';

mountTest(Trigger);

describe('Trigger case', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('unmountOnExit=false', async () => {
    const wrapper = mount(
      <Trigger
        unmountOnExit={false}
        trigger="click"
        popup={() => {
          return <div id="test">123123</div>;
        }}
      >
        <a>click</a>
      </Trigger>
    );

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

    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('children is 0', async () => {
    const a = 0;
    const wrapper = mount(
      <div id="test">
        <Trigger
          unmountOnExit={false}
          trigger="click"
          popup={() => {
            return <div id="test">123123</div>;
          }}
        >
          {a}
        </Trigger>
      </div>
    );

    expect(wrapper.find('#test').text()).toEqual('0');
  });

  it('ref should be div', async () => {
    let divRef;
    const wrapper = mount(
      <div id="test">
        <Trigger
          trigger="click"
          popup={() => {
            return (
              <div id="test" ref={(node) => (divRef = node)}>
                123123
              </div>
            );
          }}
        >
          <a>123123</a>
        </Trigger>
      </div>
    );

    await act(() => {
      wrapper.find('a').simulate('click');
    });

    expect(divRef.outerHTML).toBe('<div id="test">123123</div>');
  });

  it('popup should display when nested trigger is disabled', async () => {
    const wrapper = mount(
      <div id="test">
        <Trigger
          trigger="click"
          popup={() => {
            return <div id="popup1"> 123123 </div>;
          }}
        >
          <Trigger
            disabled
            popup={() => {
              return <div id="popup2"> 123123 </div>;
            }}
          >
            <a>123123</a>
          </Trigger>
        </Trigger>
      </div>
    );

    await act(() => {
      wrapper.find('a').simulate('click');
    });

    expect(wrapper.find('#popup1')).toHaveLength(1);
    expect(wrapper.find('#popup2')).toHaveLength(0);
  });

  it('popup should display when nested trigger is hide', async () => {
    const wrapper = mount(
      <div id="test">
        <Trigger
          trigger="click"
          popup={() => {
            return <div id="popup1"> 123123 </div>;
          }}
        >
          <Trigger
            trigger="click"
            popup={() => {
              return <div id="popup2"> 123123 </div>;
            }}
          >
            <a>123123</a>
          </Trigger>
        </Trigger>
      </div>
    );

    await act(() => {
      wrapper.find('a').simulate('click');
    });

    expect(wrapper.find('#popup1')).toHaveLength(1);
    expect(wrapper.find('#popup2')).toHaveLength(1);
    await act(() => {
      wrapper.find('#popup2').simulate('click');
    });
    expect(wrapper.find('#popup1')).toHaveLength(1);
    expect(wrapper.find('#popup2')).toHaveLength(1);
  });

  it('children is disabled button, pass-through classname', async () => {
    const c = 'my-custom-button-class';
    const wrapper = mount(
      <div id="test">
        <Trigger
          unmountOnExit={false}
          trigger="click"
          popup={() => {
            return <div id="popup1"> 123123 </div>;
          }}
        >
          <button id="btn" className={c} disabled>
            Test
          </button>
        </Trigger>
      </div>
    );

    expect(wrapper.find('#btn').hasClass(c)).toBeTruthy();
  });
});

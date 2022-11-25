import React from 'react';
import { act } from 'react-test-renderer';
import Trigger from '..';
import mountTest from '../../../tests/mountTest';
import { fireEvent, render } from '../../../tests/util';

mountTest(Trigger);

describe('Trigger case', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('unmountOnExit=false', async () => {
    const wrapper = render(
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
      fireEvent.click(wrapper.find('a')[0]);
    });
    expect(wrapper.find('#test')).toHaveLength(1);

    await act(() => {
      fireEvent.click(wrapper.find('a')[0]);
    });

    jest.runAllTimers();

    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('containerScrollToClose', async () => {
    const wrapper = render(
      <div style={{ height: '150vh' }}>
        <Trigger
          containerScrollToClose
          trigger="click"
          popup={() => {
            return <div id="test">123123</div>;
          }}
        >
          <button>click</button>
        </Trigger>
      </div>
    );

    await act(() => {
      fireEvent.click(wrapper.querySelector('button') as Element);
    });
    expect(wrapper.find('#test')).toHaveLength(1);

    await act(() => {
      fireEvent.scroll(document.body);
    });

    expect(wrapper.find('#test')).toHaveLength(1);
  });

  it('children is 0', async () => {
    const a = 0;
    const wrapper = render(
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

    expect(wrapper.find('#test')[0].textContent).toEqual('0');
  });

  it('ref should be div', async () => {
    let divRef;
    const wrapper = render(
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
      fireEvent.click(wrapper.find('a')[0]);
    });

    expect(divRef.outerHTML).toBe('<div id="test">123123</div>');
  });

  it('popup should display when nested trigger is disabled', async () => {
    const wrapper = render(
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
      fireEvent.click(wrapper.find('a')[0]);
    });

    expect(wrapper.find('#popup1')).toHaveLength(1);
    expect(wrapper.find('#popup2')).toHaveLength(0);
  });

  it('popup should display when nested trigger is hide', async () => {
    const wrapper = render(
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
      fireEvent.click(wrapper.find('a')[0]);
    });

    expect(wrapper.find('#popup1')).toHaveLength(1);
    expect(wrapper.find('#popup2')).toHaveLength(1);
    await act(() => {
      fireEvent.click(wrapper.find('#popup2')[0]);
    });
    expect(wrapper.find('#popup1')).toHaveLength(1);
    expect(wrapper.find('#popup2')).toHaveLength(1);
  });
});

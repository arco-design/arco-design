import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Affix from '..';
import Button from '../../Button';
import { sleep } from '../../../tests/util';

mountTest(Affix);
componentConfigTest(Affix, 'Affix');

const events: Partial<Record<keyof HTMLElementEventMap, (ev: Partial<Event>) => void>> = {};

interface TestProps {
  offsetBottom?: number;
  offsetTop?: number;
  onChange?: () => void;
}

class Test extends React.Component<TestProps> {
  private container: HTMLDivElement;

  componentDidMount() {
    this.container.addEventListener = jest
      .fn()
      .mockImplementation((event: keyof HTMLElementEventMap, cb: (ev: Partial<Event>) => void) => {
        events[event] = cb;
      });
  }

  getTarget = () => this.container;

  render() {
    return (
      <div
        ref={(node) => {
          this.container = node;
        }}
        className="container"
      >
        <Affix className="affix" target={this.getTarget} {...this.props}>
          <Button type="primary">Affix Top</Button>
        </Affix>
      </div>
    );
  }
}

function mountTestComp(component: React.ReactElement) {
  return mount<Test, React.PropsWithChildren<TestProps>>(component);
}

describe('Affix', () => {
  it('should trigger onChange when fixed changed', async () => {
    const onChange = jest.fn();

    const componentWrapper = mountTestComp(<Test offsetTop={0} onChange={onChange} />);

    const containerElement = componentWrapper.find('.container').first().getDOMNode();
    const wrapperElement = componentWrapper.find('.affix').first().getDOMNode();

    let wrapperRect = {
      top: 0,
      bottom: 0,
    };
    const movePlaceholder = async (top: number) => {
      wrapperRect = {
        top,
        bottom: top,
      } as DOMRect;

      if (events.scroll == null) {
        throw new Error('scroll should be set');
      }
      events.scroll({
        type: 'scroll',
      });
      await sleep(100);
    };

    jest.spyOn(containerElement, 'getBoundingClientRect').mockImplementation(() => {
      return {
        top: 0,
        bottom: 0,
      } as DOMRect;
    });
    jest.spyOn(wrapperElement, 'getBoundingClientRect').mockImplementation(() => {
      return wrapperRect as DOMRect;
    });

    await sleep(100);

    await movePlaceholder(-100);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);

    await movePlaceholder(-200);
    expect(onChange).toBeCalledTimes(1);
  });

  it('It should not be error when children is invalid', () => {
    const originError = console.error;
    const originWarn = console.warn;

    console.error = jest.fn();
    console.warn = jest.fn();
    mount(
      <Affix offsetBottom={120}>
        {null}
        {null}
      </Affix>
    );

    expect(console.error).toHaveBeenCalledTimes(0);
    expect(console.warn).toHaveBeenCalledTimes(1);

    console.error = originError;
    console.warn = originWarn;
  });
});

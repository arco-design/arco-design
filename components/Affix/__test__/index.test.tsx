import React from 'react';
import { sleep, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Affix from '..';
import Button from '../../Button';

mountTest(Affix);
componentConfigTest(Affix, 'Affix');

const events: Partial<Record<keyof HTMLElementEventMap, (ev: Partial<Event>) => void>> = {};

interface TestProps {
  offsetBottom?: number;
  offsetTop?: number;
  onChange?: () => void;
}

class Test extends React.Component<TestProps> {
  private container: HTMLDivElement | null;

  componentDidMount() {
    this.container &&
      (this.container.addEventListener = jest
        .fn()
        .mockImplementation(
          (event: keyof HTMLElementEventMap, cb: (ev: Partial<Event>) => void) => {
            events[event] = cb;
          }
        ));
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

describe('Affix', () => {
  it('should trigger onChange when fixed changed', async () => {
    const onChange = jest.fn();

    const componentWrapper = render(<Test offsetTop={0} onChange={onChange} />);

    const containerElement = componentWrapper.querySelector('.container');
    const wrapperElement = componentWrapper.querySelector('.affix');

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

    jest.spyOn(containerElement as HTMLElement, 'getBoundingClientRect').mockImplementation(() => {
      return {
        top: 0,
        bottom: 0,
      } as DOMRect;
    });
    jest.spyOn(wrapperElement as HTMLElement, 'getBoundingClientRect').mockImplementation(() => {
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
    render(
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

import React from 'react';
import { act } from 'react-test-renderer';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Slider from '..';
import { SliderProps } from '../interface';
import { fireEvent, render } from '../../../tests/util';

mountTest(Slider);
componentConfigTest(Slider, 'Slider');

interface TestState {
  value: number;
}

class Test extends React.Component<{}, TestState> {
  state = {
    value: 20,
  };

  onChange = (value: number) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Slider
        value={value}
        onChange={this.onChange as SliderProps['onChange']}
        min={20}
        max={100}
      />
    );
  }
}

describe('Slider ', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('render correctly', (done) => {
    const component = render(<Test />);
    expect(component.find('.arco-slider').length).toBe(1);
    expect(component.find('.arco-slider-road').length).toBe(1);
    expect(component.find('.arco-slider-button').length).toBe(1);
    act(() => {
      fireEvent.mouseEnter(component.find('.arco-slider-button')[0]);
      setTimeout(() => {
        expect(component.find('.arco-tooltip-content-inner')[0].innerHTML).toEqual('20');
        done();
      }, 200);
    });
  });

  it('render range slider correctly', () => {
    const component = render(<Slider range defaultValue={[10, 20]} />);
    expect(component.find('.arco-slider-button').length).toBe(2);
    const style = component.find('.arco-slider-bar')[0].style;
    expect(style?.left).toBe('10%');
    expect(style?.right).toBe('80%');
  });

  it('marks slider', () => {
    const component = render(
      <Slider
        marks={{
          0: '0',
          0.5: '0.5',
          30: '30',
          60: '60',
          100: '100',
          ['a' as any]: 'a',
        }}
      />
    );
    expect(component.find('.arco-slider')[0].classList).toContain('arco-slider-with-marks');
    expect(component.find('.arco-slider-dot').length).toBe(5);
    expect(component.find('.arco-slider-marks-text').length).toBe(5);
    expect(component.find('.arco-slider-marks-text')[1]?.innerHTML).toBe('0.5');

    act(() => {
      fireEvent.mouseDown(component.find('.arco-slider-dot')[2]);
    });
    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual('30%');

    act(() => {
      fireEvent.mouseDown(component.find('.arco-slider-marks-text')[4]);
    });
    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual('100%');
  });

  it('should select mark when onlyMarkValue is true', () => {
    const component = render(
      <Slider
        defaultValue={12}
        onlyMarkValue
        marks={{
          0: '0',
          10: '10',
          30: '30',
          60: '60',
          100: '100',
        }}
      />
    );

    expect(component.find('.arco-slider-button')[0].style.left).toEqual('10%');
  });

  it('step slider', () => {
    const component = render(
      <Slider
        marks={{
          0: '0',
          10: '10',
          30: '30',
          60: '60',
          100: '100',
        }}
        step={3}
      />
    );

    act(() => {
      fireEvent.mouseDown(component.find('.arco-slider-dot')[1]);
    });
    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual('9%');
  });

  it('disabled slider', () => {
    const component = render(
      <Slider
        marks={{
          0: '0',
          10: '10',
          30: '30',
          60: '60',
          100: '100',
        }}
        step={3}
        disabled
      />
    );
    act(() => {
      fireEvent.mouseDown(component.find('.arco-slider-dot')[1]);
    });
    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual('0%');
  });

  it('input slider', () => {
    const component = render(<Slider showInput defaultValue={20} />);
    expect(component.find('.arco-slider-input').length).toBe(1);
    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual('20%');

    act(() => {
      fireEvent.change(component.find('input')[0], { target: { value: '30' } });
    });
    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual('30%');
  });

  it('render ticks correctly', () => {
    const component = render(<Slider defaultValue={20} min={0} max={10} step={1} showTicks />);
    expect(component.find('.arco-slider-tick').length).toBe(9);
  });

  it('should auto reverse when begin is greater than end', () => {
    const component = render(<Slider range value={[60, 20]} min={0} max={100} />);
    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual('60%');
  });

  it('should show tooltip when hovering slider button', (done) => {
    const component = render(<Test />);

    act(() => {
      fireEvent.mouseEnter(component.find('.arco-slider-button')[0]);
    });

    setTimeout(() => {
      expect(document.querySelectorAll('.arco-tooltip').length).toBe(1);

      act(() => {
        fireEvent.mouseLeave(component.find('.arco-slider-button')[0]);
      });

      setTimeout(() => {
        expect(document.querySelectorAll('.arco-tooltip').length).toBe(0);
        done();
      }, 400);
    }, 200);
  });

  it('should button onMoving/onMoveEnd/onMoveBegin event been called', (done) => {
    const map: {
      [key: string]: any;
    } = {};
    window.addEventListener = jest.fn((event: string, cb: any) => {
      map[event] = cb;
    });
    const component = render(<Slider defaultValue={20} />);

    act(() => {
      fireEvent.mouseDown(component.find('.arco-slider-button')[0]);
    });
    expect(component.find('.arco-slider-button')[0].classList).toContain(
      'arco-slider-button-active'
    );

    map.mousemove({ clientX: 0 });
    expect(component.find('.arco-slider-button')[0].style.left).toEqual('0%');

    map.mouseup();

    act(() => {
      fireEvent.mouseLeave(component.find('.arco-slider-button')[0]);
    });

    setTimeout(() => {
      expect(component.find('.arco-slider-button')[0].classList).not.toContain(
        'arco-slider-button-active'
      );
      done();
    }, 0);
  });

  it('should render reverse correctly', () => {
    const component = render(<Slider defaultValue={20} reverse />);
    const barStyle = component.find('.arco-slider-bar')[0].style;
    const buttonStyle = component.find('.arco-slider-button')[0].style;
    expect(barStyle.left).toBe('80%');
    expect(barStyle.right).toBe('0%');
    expect(buttonStyle.right).toBe('20%');
  });

  it('support intervalConfig correctly', () => {
    const component = render(
      <Slider
        marks={{ '0': '0KM', '10': '10KM', '20': '20KM', '30': '30KM' }}
        min={0}
        max={30}
        getIntervalConfig={([begin, end]) => {
          const range = `${begin}~${end}`;
          switch (range) {
            case '0~10':
              return { width: '50%' };
            default: {
              return { step: 3 };
            }
          }
        }}
      />
    );

    act(() => {
      fireEvent.mouseDown(component.find('.arco-slider-dot')[1]);
    });

    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual('50%');

    act(() => {
      fireEvent.mouseDown(component.find('.arco-slider-dot')[2]);
    });

    expect(component.find('.arco-slider-button:last-child')[0].style.left).toEqual(
      `${0.9 * 25 + 50}%`
    );
  });

  it('render interval width correctly when set intervalConfig', () => {
    const component = render(
      <Slider
        marks={{ '0': '0KM', '10': '10KM', '20': '20KM', '30': '30KM' }}
        min={0}
        max={30}
        getIntervalConfig={() => {
          // 3 intervals, totally 90%, need to adjust
          return { width: 0.3 };
        }}
      />
    );
    const dots = component.find('.arco-slider-dot-wrapper');
    expect(dots[1].style.left).toEqual(`30%`);
    expect(dots[2].style.left).toEqual(`60%`);
    expect(dots[3].style.left).toEqual(`100%`);
  });

  it('should render correctly when showInput is Object', () => {
    const mockChange = jest.fn();
    const mockBlur = jest.fn();
    const component = render(
      <Slider
        showInput={{ onChange: mockChange, onBlur: mockBlur, size: 'mini' }}
        defaultValue={20}
      />
    );

    expect(component.find('.arco-input-number-size-mini')).toBeTruthy();
    const inputElem = component.find('.arco-input')[0];
    expect(inputElem?.getAttribute('value')).toEqual('20');

    act(() => {
      fireEvent.change(inputElem, { target: { value: '50' } });
    });
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(component.find('.arco-input')[0]?.getAttribute('value')).toEqual('50');

    act(() => {
      fireEvent.blur(inputElem);
    });
    expect(mockBlur).toHaveBeenCalledTimes(1);
  });

  it('should render correctly when showInput is Object and in range scene', () => {
    const mockChange = jest.fn();
    const component = render(
      <Slider showInput={{ onChange: mockChange }} range defaultValue={[20, 30]} />
    );
    const beginInput = component.find('.arco-input')[0];
    const endInput = component.find('.arco-input')[1];

    act(() => {
      fireEvent.change(beginInput, { target: { value: '10' } });
      fireEvent.change(endInput, { target: { value: '20' } });
    });
    expect(+mockChange.mock.calls[0][0]).toEqual(10);
    expect(+mockChange.mock.calls[1][0]).toEqual(20);
  });

  it('should render correctly when showInput is Empty Array or Empty Object', () => {
    const component1 = render(<Slider showInput={[]} defaultValue={20} />);
    const component2 = render(<Slider showInput={{}} defaultValue={20} />);

    expect(component1.find('.arco-input')[0]?.getAttribute('value')).toEqual('20');
    expect(component2.find('.arco-input')[0]?.getAttribute('value')).toEqual('20');
  });
});

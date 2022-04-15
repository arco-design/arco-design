import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Slider from '..';
import { SliderProps } from '../interface';

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

class TestRange extends React.Component<{}, { value: number[] }> {
  state = {
    value: [20, 100],
  };

  onChange = (value: number[]) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Slider
        range
        value={value}
        onChange={this.onChange as SliderProps['onChange']}
        min={0}
        max={100}
      />
    );
  }
}

function mountTestComp(component: React.ReactElement) {
  return mount<Test, React.PropsWithChildren<{}>, TestState>(component);
}

function mountSlider(component: React.ReactElement) {
  return mount(component);
}

describe('Slider ', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('render correctly', (done) => {
    const component = mountTestComp(<Test />);
    expect(component.state('value')).toBe(20);
    expect(component.find('.arco-slider').length).toBe(1);
    expect(component.find('.arco-slider-road').length).toBe(1);
    expect(component.find('.arco-slider-button').length).toBe(1);
    component.setState({ value: 30 });
    expect(component.state('value')).toBe(30);
    component.find('.arco-slider-button').simulate('mouseenter');
    setTimeout(() => {
      expect(document.querySelector('.arco-tooltip-content').innerHTML).toEqual(
        '<div class="arco-tooltip-content-inner">30</div>'
      );
      done();
    }, 200);
  });

  it('render range slider correctly', () => {
    const component = mountSlider(<Slider range defaultValue={[10, 20]} />);
    expect(component.find('.arco-slider-button').length).toBe(2);
    const style = component.find('.arco-slider-bar').at(0).props().style;
    expect(style.left).toBe('10%');
    expect(style.right).toBe('80%');
  });

  it('marks slider', () => {
    const component = mountSlider(
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
    expect(component.find('.arco-slider').hasClass('arco-slider-with-marks')).toBe(true);
    expect(component.find('.arco-slider-dot').length).toBe(5);
    expect(component.find('.arco-slider-marks-text').length).toBe(5);
    expect(component.find('.arco-slider-marks-text').at(1).text()).toBe('0.5');

    component.find('.arco-slider-dot').at(2).simulate('mousedown');
    expect(
      component.find('.arco-slider-button').last().getDOMNode().getAttribute('style')
    ).toContain('left: 30%');

    component.find('.arco-slider-marks-text').at(4).simulate('mousedown');
    expect(
      component.find('.arco-slider-button').last().getDOMNode().getAttribute('style')
    ).toContain('left: 100%');
  });

  it('should select mark when onlyMarkValue is true', () => {
    const component = mountSlider(
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

    expect(
      component.find('.arco-slider-button').at(0).getDOMNode().getAttribute('style')
    ).toContain('left: 10%');
  });

  it('step slider', () => {
    const component = mountSlider(
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
    component.find('.arco-slider-dot').at(1).simulate('mousedown');
    expect(
      component.find('.arco-slider-button').last().getDOMNode().getAttribute('style')
    ).toContain('left: 9%');
  });

  it('disabled slider', () => {
    const component = mountSlider(
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
    component.find('.arco-slider-dot').at(1).simulate('mousedown');
    expect(
      component.find('.arco-slider-button').last().getDOMNode().getAttribute('style')
    ).toContain('left: 0%');
  });

  it('input slider', () => {
    const component = mountSlider(<Slider showInput defaultValue={20} />);
    expect(component.find('.arco-slider-input').length).toBe(1);
    expect(component.find('input').at(0).props().value).toBe('20');

    component.find('input').simulate('change', { target: { value: '30' } });
    expect(
      component.find('.arco-slider-button').last().getDOMNode().getAttribute('style')
    ).toContain('left: 30%');
  });

  it('render ticks correctly', () => {
    const component = mountSlider(<Slider defaultValue={20} min={0} max={10} step={1} showTicks />);
    expect(component.find('.arco-slider-tick').length).toBe(9);
  });

  it('should keep right order when start lager then end', () => {
    const component = mountSlider(<TestRange />);
    component.setState({ value: [60, 20] });
    expect(
      component.find('.arco-slider-button').at(0).getDOMNode().getAttribute('style')
    ).toContain('left: 20%');
  });

  it('should show tooltip when hovering slider button', (done) => {
    const component = mountTestComp(<Test />);

    component.find('.arco-slider-button').at(0).simulate('mouseEnter');

    setTimeout(() => {
      expect(document.querySelectorAll('.arco-tooltip').length).toBe(1);

      component.find('.arco-slider-button').at(0).simulate('mouseLeave');

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
    const component = mountSlider(<Slider defaultValue={20} />);

    component.find('.arco-slider-button').at(0).simulate('mouseDown');
    expect(component.find('.arco-slider-button').at(0).hasClass('arco-slider-button-active')).toBe(
      true
    );

    map.mousemove({ clientX: 0 });

    expect(
      component.find('.arco-slider-button').at(0).getDOMNode().getAttribute('style')
    ).toContain('left: 0%');

    map.mouseup();
    component.find('.arco-slider-button').at(0).simulate('mouseLeave');
    setTimeout(() => {
      expect(
        component.find('.arco-slider-button').at(0).hasClass('arco-slider-button-active')
      ).toBe(false);
      done();
    }, 0);
  });

  it('should render reverse correctly', () => {
    const component = mountSlider(<Slider defaultValue={20} reverse />);
    const barStyle = component.find('.arco-slider-bar').at(0).props().style;
    const buttonStyle = component.find('.arco-slider-button').at(0).props().style;
    expect(barStyle.left).toBe('80%');
    expect(barStyle.right).toBe('0%');
    expect(buttonStyle.right).toBe('20%');
  });

  it('support intervalConfig correctly', () => {
    const component = mountSlider(
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
    component.find('.arco-slider-dot').at(1).simulate('mousedown');
    expect(
      component.find('.arco-slider-button').last().getDOMNode().getAttribute('style')
    ).toContain('left: 50%');

    component.find('.arco-slider-dot').at(2).simulate('mousedown');
    expect(
      component.find('.arco-slider-button').last().getDOMNode().getAttribute('style')
    ).toContain(`left: ${0.9 * 25 + 50}%`);
  });

  it('render interval width correctly when set intervalConfig', () => {
    const component = mountSlider(
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
    expect(dots.at(1).getDOMNode().getAttribute('style')).toContain(`left: 30%`);
    expect(dots.at(2).getDOMNode().getAttribute('style')).toContain(`left: 60%`);
    expect(dots.at(3).getDOMNode().getAttribute('style')).toContain(`left: 100%`);
  });

  it('should render correctly when showInput is Object', () => {
    const mockChange = jest.fn();
    const mockBlur = jest.fn();
    const component = mountSlider(
      <Slider
        showInput={{ onChange: mockChange, onBlur: mockBlur, size: 'mini' }}
        defaultValue={20}
      />
    );

    expect(component.find('.arco-input-number-size-mini')).toBeTruthy();
    const inputElem = component.find('.arco-input');
    expect(inputElem.prop('value')).toEqual('20');
    inputElem.simulate('change', { target: { value: '50' } });
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(+component.find('.arco-input').prop('value')).toEqual(50);
    inputElem.simulate('blur');
    expect(mockBlur).toHaveBeenCalledTimes(1);
  });

  it('should render correctly when showInput is Object and in range scene', () => {
    const mockChange = jest.fn();
    const component = mountSlider(
      <Slider showInput={{ onChange: mockChange }} range defaultValue={[20, 30]} />
    );
    const beginInput = component.find('.arco-input').at(0);
    const endInput = component.find('.arco-input').at(1);
    beginInput.simulate('change', { target: { value: '10' } });
    endInput.simulate('change', { target: { value: '20' } });
    expect(+mockChange.mock.calls[0][0]).toEqual(10);
    expect(+mockChange.mock.calls[1][0]).toEqual(20);
  });

  it('should render correctly when showInput is Empty Array or Empty Object', () => {
    const component1 = mountSlider(<Slider showInput={[]} defaultValue={20} />);
    const component2 = mountSlider(<Slider showInput={{}} defaultValue={20} />);

    expect(+component1.find('.arco-input').prop('value')).toEqual(20);
    expect(+component2.find('.arco-input').prop('value')).toEqual(20);
  });
});

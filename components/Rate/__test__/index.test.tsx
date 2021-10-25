import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Rate from '..';

mountTest(Rate);
componentConfigTest(Rate, 'Rate');

function checkRateValue(component: ReactWrapper, value: number): boolean {
  if (!value) {
    return !component
      .find('.arco-rate-character')
      .at(0)
      .hasClass(/arco-rate-character-[half|full]/);
  }

  const isHalf = !!(value % 1);
  const index = isHalf ? ~~value : value - 1;

  return component
    .find('.arco-rate-character')
    .at(index)
    .hasClass(`arco-rate-character-${isHalf ? 'half' : 'full'}`);
}

describe('Rate', () => {
  it('Click Rate not allow half', () => {
    const component = mount(<Rate />);
    expect(checkRateValue(component, 0)).toBe(true);
    component
      .find('.arco-rate-character-left')
      .at(3)
      .simulate('click');
    expect(checkRateValue(component, 4)).toBe(true);
  });

  it('Click Rate allow half', () => {
    const component = mount(<Rate grading allowHalf />);

    component
      .find('.arco-rate-character')
      .at(3)
      .find('.arco-rate-character-left')
      .simulate('click');
    expect(checkRateValue(component, 3.5)).toBe(true);

    component
      .find('.arco-rate-character')
      .at(3)
      .find('.arco-rate-character-right')
      .simulate('click');
    expect(checkRateValue(component, 4)).toBe(true);
  });

  it('control mode correctly', () => {
    const component = mount(<Rate grading value={3} />);
    expect(checkRateValue(component, 3)).toBe(true);
    component.setProps({ value: 4 });
    expect(checkRateValue(component, 4)).toBe(true);
  });

  it('Mouseover and reset index correctly', () => {
    const component = mount(<Rate allowHalf />);
    expect(checkRateValue(component, 0)).toBe(true);
    component
      .find('.arco-rate-character')
      .at(3)
      .find('.arco-rate-character-left')
      .simulate('mouseenter');
    expect(checkRateValue(component, 3.5)).toBe(true);
    component
      .find('.arco-rate-character')
      .at(3)
      .find('.arco-rate-character-right')
      .simulate('mouseenter');
    expect(checkRateValue(component, 4)).toBe(true);
    component.simulate('mouseleave');
    expect(checkRateValue(component, 0)).toBe(true);
  });

  it('onChange & onHoverChange is called', () => {
    const onChange = jest.fn((value) => value);
    const onHoverChange = jest.fn((value) => value);
    const component = mount(<Rate onChange={onChange} onHoverChange={onHoverChange} />);
    const character = component
      .find('.arco-rate-character')
      .at(3)
      .find('.arco-rate-character-left');
    character.simulate('mouseenter');
    expect(onHoverChange.mock.results[0].value).toBe(4);
    character.simulate('click');
    expect(onChange.mock.results[0].value).toBe(4);
  });

  it('tooltips', () => {
    mount(<Rate readonly tooltips={['one', 'two', 'three']} />);
  });
});

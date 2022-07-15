import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Rate from '..';

mountTest(Rate);
componentConfigTest(Rate, 'Rate');

function checkRateValue(component, value: number): boolean {
  if (!value) {
    return !component
      .find('.arco-rate-character')
      .item(0)
      .classList.contains(/arco-rate-character-[half|full]/);
  }

  const isHalf = !!(value % 1);
  const index = isHalf ? ~~value : value - 1;

  return component
    .find('.arco-rate-character')
    .item(index)
    .classList.contains(`arco-rate-character-${isHalf ? 'half' : 'full'}`);
}

describe('Rate', () => {
  it('Click Rate not allow half', () => {
    const component = render(<Rate />);
    expect(checkRateValue(component, 0)).toBe(true);
    fireEvent.click(component.find('.arco-rate-character-left').item(3));
    expect(checkRateValue(component, 4)).toBe(true);
  });

  it('Click Rate allow half', () => {
    const component = render(<Rate grading allowHalf />);

    fireEvent.click(
      component.find('.arco-rate-character').item(3).querySelector('.arco-rate-character-left')!
    );
    expect(checkRateValue(component, 3.5)).toBe(true);

    fireEvent.click(
      component.find('.arco-rate-character').item(3).querySelector('.arco-rate-character-right')!
    );
    expect(checkRateValue(component, 4)).toBe(true);
  });

  it('control mode correctly', () => {
    const component = render(<Rate grading value={3} />);
    expect(checkRateValue(component, 3)).toBe(true);
    component.rerender(<Rate grading value={4} />);
    expect(checkRateValue(component, 4)).toBe(true);
  });

  it('Mouseover and reset index correctly', () => {
    const component = render(<Rate allowHalf />);
    expect(checkRateValue(component, 0)).toBe(true);
    fireEvent.mouseEnter(
      component.find('.arco-rate-character').item(3).querySelector('.arco-rate-character-left')!
    );
    expect(checkRateValue(component, 3.5)).toBe(true);
    fireEvent.mouseEnter(
      component.find('.arco-rate-character').item(3).querySelector('.arco-rate-character-right')!
    );
    expect(checkRateValue(component, 4)).toBe(true);
    fireEvent.mouseLeave(component.container.firstElementChild!);
    expect(checkRateValue(component, 0)).toBe(true);
  });

  it('onChange & onHoverChange is called', () => {
    const onChange = jest.fn((value) => value);
    const onHoverChange = jest.fn((value) => value);
    const component = render(<Rate onChange={onChange} onHoverChange={onHoverChange} />);
    const character = component
      .find('.arco-rate-character')
      .item(3)
      .querySelector('.arco-rate-character-left');
    fireEvent.mouseEnter(character!);
    expect(onHoverChange.mock.results[0].value).toBe(4);
    fireEvent.click(character!);
    expect(onChange.mock.results[0].value).toBe(4);
  });

  it('tooltips', () => {
    render(<Rate readonly tooltips={['one', 'two', 'three']} />);
  });
});

import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import DatePicker from '..';
import { getDateCell, getInput } from './utils';
import '../../../tests/mockDate';

const { RangePicker } = DatePicker;

describe('RangePicker hover', () => {
  it('mode = date', () => {
    const component = render(<RangePicker />);
    fireEvent.click(getInput(component, 0));

    expect(
      component.find('.arco-picker')[0].classList.contains('arco-picker-focused')
    ).toBeTruthy();

    // 2020-04-06
    fireEvent.click(getDateCell(component, 0, 7).querySelector('.arco-picker-date')!);

    expect(getDateCell(component, 0, 7).className).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-selected arco-picker-cell-range-start'
    );

    // 2020-04-08
    fireEvent.mouseEnter(getDateCell(component, 0, 9));

    expect(getDateCell(component, 0, 7).className).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-selected arco-picker-cell-range-start arco-picker-cell-in-range'
    );
    expect(getDateCell(component, 0, 9).className).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-range-end arco-picker-cell-in-range'
    );
    expect(component.find('.arco-picker-cell-in-range')).toHaveLength(3);

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-06');
    expect(getInput(component, 1).getAttribute('value')).toBe('2020-04-08');
    expect(
      getInput(component, 1).parentElement?.classList.contains('arco-picker-input-placeholder')
    ).toBeTruthy();

    fireEvent.click(getDateCell(component, 0, 9).querySelector('.arco-picker-date')!);

    expect(getInput(component, 0).getAttribute('value')).toBe('2020-04-06');
    expect(getInput(component, 1).getAttribute('value')).toBe('2020-04-08');

    expect(component.find('.arco-picker')[0].classList.contains('arco-picker-focused')).toBeFalsy();

    // reopen
    fireEvent.click(getInput(component, 1));

    // 2020-04-10
    fireEvent.mouseEnter(getDateCell(component, 0, 11));

    expect(getDateCell(component, 0, 7).className).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-selected arco-picker-cell-range-start arco-picker-cell-in-range arco-picker-cell-hover-range-start arco-picker-cell-hover-in-range'
    );
    expect(getDateCell(component, 0, 9).className).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-selected arco-picker-cell-range-end arco-picker-cell-in-range arco-picker-cell-hover-in-range arco-picker-cell-range-edge-in-hover-range'
    );
    expect(getDateCell(component, 0, 11).className).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-today arco-picker-cell-hover-range-end arco-picker-cell-hover-in-range'
    );
    expect(component.find('.arco-picker-cell-hover-in-range')).toHaveLength(5);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const { RangePicker } = DatePicker;

mountTest(RangePicker);

describe('RangePicker (date)', () => {
  it('date + week', () => {
    function testPicker(week?: boolean) {
      const component = mount(<RangePicker mode={week ? 'week' : 'date'} />);

      const startInput = component.find('input').at(0);

      startInput.simulate('click');

      expect(component.find('.arco-picker-cell-today').text()).toBe('10');

      function checkHeaderLabel(labels: string[]) {
        expect(component.find('.arco-picker-header-value').at(0).text()).toBe(labels[0]);
        expect(component.find('.arco-picker-header-value').at(1).text()).toBe(labels[1]);
      }

      checkHeaderLabel(['2020-04', '2020-05']);

      // go prev month
      component.find('IconLeft').simulate('click');

      checkHeaderLabel(['2020-03', '2020-04']);

      // go prev year
      component.find('IconDoubleLeft').simulate('click');

      checkHeaderLabel(['2019-03', '2019-04']);

      // go next month
      component.find('IconRight').simulate('click');

      checkHeaderLabel(['2019-04', '2019-05']);

      // go next year
      component.find('IconDoubleRight').simulate('click');

      checkHeaderLabel(['2020-04', '2020-05']);
    }

    testPicker();
    testPicker(true);
  });

  it('month', () => {
    const component = mount(<RangePicker mode="month" />);

    const startInput = component.find('input').at(0);

    startInput.simulate('click');

    expect(component.find('.arco-picker-cell-today').text()).toBe('四月');

    function checkHeaderLabel(labels: string[]) {
      expect(component.find('.arco-picker-header-value').at(0).text()).toBe(labels[0]);
      expect(component.find('.arco-picker-header-value').at(1).text()).toBe(labels[1]);
    }

    checkHeaderLabel(['2020', '2021']);

    expect(component.find('IconLeft')).toHaveLength(0);
    expect(component.find('IconRight')).toHaveLength(0);
    expect(component.find('IconDoubleLeft')).toHaveLength(1);
    expect(component.find('IconDoubleRight')).toHaveLength(1);

    // go prev year
    component.find('IconDoubleLeft').simulate('click');

    checkHeaderLabel(['2019', '2020']);

    // go next year
    component.find('IconDoubleRight').simulate('click');

    checkHeaderLabel(['2020', '2021']);
  });

  it('year', () => {
    const component = mount(<RangePicker mode="year" />);

    const startInput = component.find('input').at(0);

    startInput.simulate('click');

    expect(component.find('.arco-picker-cell-today').text()).toBe('2020');

    function checkHeaderLabel(labels: string[]) {
      expect(component.find('.arco-picker-header-value').at(0).text()).toBe(labels[0]);
      expect(component.find('.arco-picker-header-value').at(1).text()).toBe(labels[1]);
    }

    checkHeaderLabel(['2020 - 2030', '2030 - 2040']);

    expect(component.find('IconLeft')).toHaveLength(0);
    expect(component.find('IconRight')).toHaveLength(0);
    expect(component.find('IconDoubleLeft')).toHaveLength(1);
    expect(component.find('IconDoubleRight')).toHaveLength(1);

    // go prev year
    component.find('IconDoubleLeft').simulate('click');

    checkHeaderLabel(['2010 - 2020', '2020 - 2030']);

    // go next year
    component.find('IconDoubleRight').simulate('click');

    checkHeaderLabel(['2020 - 2030', '2030 - 2040']);
  });

  it('quarter', () => {
    const component = mount(<RangePicker mode="quarter" />);

    const startInput = component.find('input').at(0);

    startInput.simulate('click');

    expect(component.find('.arco-picker-cell-today').text()).toBe('Q2');

    function checkHeaderLabel(labels: string[]) {
      expect(component.find('.arco-picker-header-value').at(0).text()).toBe(labels[0]);
      expect(component.find('.arco-picker-header-value').at(1).text()).toBe(labels[1]);
    }

    checkHeaderLabel(['2020', '2021']);

    expect(component.find('IconLeft')).toHaveLength(0);
    expect(component.find('IconRight')).toHaveLength(0);
    expect(component.find('IconDoubleLeft')).toHaveLength(1);
    expect(component.find('IconDoubleRight')).toHaveLength(1);

    // go prev year
    component.find('IconDoubleLeft').simulate('click');

    checkHeaderLabel(['2019', '2020']);

    // go next year
    component.find('IconDoubleRight').simulate('click');

    checkHeaderLabel(['2020', '2021']);
  });
});

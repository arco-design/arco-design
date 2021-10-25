import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Result from '..';
import { ResultStatus } from '../interface';

mountTest(Result);
componentConfigTest(Result, 'Result');

describe('Result', () => {
  it('render status correctly', () => {
    const status = ['success', 'error', 'info', 'warning', '404', '403', '500'];

    status.forEach((x) => {
      const wrapper = mount(<Result status={x as ResultStatus} />);
      expect(wrapper.find('.arco-result').hasClass(`arco-result-is-${x}`)).toBe(true);
      expect(wrapper.find(`.arco-result-icon-${x}`)).toHaveLength(1);
    });
  });

  it('render custom icon correctly', () => {
    const wrapper = mount(<Result icon={<span>custom icon</span>} />);
    expect(
      wrapper
        .find(`.arco-result-icon-info`)
        .children()
        .html()
    ).toEqual('<span>custom icon</span>');
  });
});

import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import enUS from '../../locale/en-US';
import zhCN from '../../locale/zh-CN';
import mountTest from '../../../tests/mountTest';
import DatePicker from '../../DatePicker';

mountTest(ConfigProvider);

describe('ConfigProvider locale', () => {
  it('enUs placeholder correctly', () => {
    const component = mount(
      <ConfigProvider locale={enUS}>
        <DatePicker />
      </ConfigProvider>
    );

    expect(component.find('input').props().placeholder).toBe(enUS.DatePicker.placeholder.date);
  });

  it('zhCN placeholder correctly', () => {
    const component = mount(
      <ConfigProvider locale={zhCN}>
        <DatePicker />
      </ConfigProvider>
    );

    expect(component.find('input').props().placeholder).toBe(zhCN.DatePicker.placeholder.date);
  });
});

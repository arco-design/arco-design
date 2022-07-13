import React from 'react';
import { render } from '../../../tests/util';
import ConfigProvider from '..';
import enUS from '../../locale/en-US';
import zhCN from '../../locale/zh-CN';
import mountTest from '../../../tests/mountTest';
import DatePicker from '../../DatePicker';

mountTest(ConfigProvider);

describe('ConfigProvider locale', () => {
  it('enUs placeholder correctly', () => {
    const component = render(
      <ConfigProvider locale={enUS}>
        <DatePicker />
      </ConfigProvider>
    );

    expect(component.find('.arco-picker-start-time')[0].getAttribute('placeholder')).toBe(
      enUS.DatePicker.placeholder.date
    );
  });

  it('zhCN placeholder correctly', () => {
    const component = render(
      <ConfigProvider locale={zhCN}>
        <DatePicker />
      </ConfigProvider>
    );

    expect(component.find('.arco-picker-start-time')[0].getAttribute('placeholder')).toBe(
      zhCN.DatePicker.placeholder.date
    );
  });
});

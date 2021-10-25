import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import dayjs from 'dayjs';
import Statistic from '..';
import mountTest from '../../../tests/mountTest';
import { sleep } from '../../../tests/util';

const Countdown = Statistic.Countdown;

mountTest(Countdown);

const now = dayjs();
const countdownTime = now
  .add(1, 'day')
  .add(1, 'hour')
  .add(1, 'minute')
  .add(10, 'second')
  .add(500, 'millisecond');

describe('Statistic.Countdown', () => {
  it('format', () => {
    const formats = [
      ['HH:mm:ss', '25:01:10'],
      ['HH:mm:ss:SSS', '25:01:10:500'],
      ['DD HH:mm:ss:SSS', '01 01:01:10:500'],
    ];

    formats.forEach(([format, value]) => {
      const component = mount(
        <Countdown start={false} now={now} value={countdownTime} format={format} />
      );

      expect(component.find('.arco-statistic-value').text()).toBe(value);
    });
  });

  it('onFinish', async () => {
    const onFinish = jest.fn();
    const component = mount(
      <Countdown
        start={false}
        now={now}
        value={now.add(1, 'second')}
        format="HH:mm:ss"
        onFinish={onFinish}
      />
    );

    expect(component.find('.arco-statistic-value').text()).toBe('00:00:01');

    await act(async () => {
      component.setProps({ start: true });
      await sleep(1200);
    });

    expect(component.find('.arco-statistic-value').text()).toBe('00:00:00');
    expect(onFinish).toBeCalled();
  });
});

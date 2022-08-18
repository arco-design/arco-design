import React from 'react';
import dayjs from 'dayjs';
import { render, cleanup } from '../../../tests/util';
import Statistic from '..';
import mountTest from '../../../tests/mountTest';

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
      const component = render(
        <Countdown start={false} now={now} value={countdownTime} format={format} />
      );

      expect(component.find('.arco-statistic-value')[0].innerHTML).toBe(value);
      cleanup();
    });
  });

  it('onFinish', () => {
    jest.useFakeTimers();
    const onFinish = jest.fn();
    const component = render(
      <Countdown
        start={false}
        now={now}
        value={now.add(1, 'second')}
        format="HH:mm:ss"
        onFinish={onFinish}
      />
    );

    expect(component.find('.arco-statistic-value')[0].innerHTML).toBe('00:00:01');

    component.rerender(
      <Countdown
        start
        now={now}
        value={now.add(1, 'second')}
        format="HH:mm:ss"
        onFinish={onFinish}
      />
    );
    jest.runAllTimers();

    expect(component.find('.arco-statistic-value')[0].innerHTML).toBe('00:00:00');
    expect(onFinish).toBeCalled();
  });

  it('renderFormat correctly', () => {
    function formatTest(format, value, diff) {
      const mockRender = jest.fn().mockImplementation((a, b) => `${a}-${b}`);
      const component = render(
        <Countdown
          start={false}
          now={now}
          value={countdownTime}
          format={format}
          renderFormat={mockRender}
        />
      );

      expect(mockRender.mock.calls.length).toBe(1);
      expect(component.find('.arco-statistic-value')[0].innerHTML).toEqual(`${diff}-${value}`);
      cleanup();
    }

    const formats = [
      ['HH:mm:ss', '25:01:10', dayjs(countdownTime).diff(now)],
      ['HH:mm:ss:SSS', '25:01:10:500', dayjs(countdownTime).diff(now)],
      ['DD HH:mm:ss:SSS', '01 01:01:10:500', dayjs(countdownTime).diff(now)],
    ];

    formats.forEach(([format, value, diff]) => formatTest(format, value, diff));
  });
});

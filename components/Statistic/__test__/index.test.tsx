import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Statistic from '..';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import { sleep } from '../../../tests/util';

mountTest(Statistic);
componentConfigTest(Statistic, 'Statistic');

describe('Statistic', () => {
  it('groupSeparator', () => {
    const component = mount(<Statistic groupSeparator value={100000} />);

    expect(component.find('.arco-statistic-value > .arco-statistic-value-int').text()).toBe(
      '100,000'
    );

    act(() => {
      component.setProps({ value: 200000 });
    });

    expect(component.find('.arco-statistic-value > .arco-statistic-value-int').text()).toBe(
      '200,000'
    );
  });

  it('prefix / suffix', () => {
    const component = mount(<Statistic title="Title" value={50} prefix="Prefix" suffix="%" />);

    expect(component.find('.arco-statistic-value > .arco-statistic-value-int').text()).toBe(
      'Prefix50'
    );
    expect(component.find('.arco-statistic-value > .arco-statistic-value-decimal').text()).toBe(
      '%'
    );
  });

  it('precision', () => {
    const component = mount(
      <Statistic title="Title" value={1000000} groupSeparator precision={2} suffix="$" />
    );

    expect(component.find('.arco-statistic-value > .arco-statistic-value-int').text()).toBe(
      '1,000,000'
    );
    expect(component.find('.arco-statistic-value > .arco-statistic-value-decimal').text()).toBe(
      '.00$'
    );
  });

  it('date', () => {
    const component = mount(<Statistic value={1554869813383} format="YYYY/MM/DD HH:mm:ss" />);

    expect(component.find('.arco-statistic-value > .arco-statistic-value-int').text()).toBe(
      '2019/04/10 12:16:53'
    );
  });

  it('countUp', async () => {
    const component = mount(<Statistic title="Title" value={100} countDuration={300} countUp />);

    await act(async () => {
      await sleep(100);
    });

    expect(
      Number(component.find('.arco-statistic-value > .arco-statistic-value-int').text())
    ).toBeGreaterThan(0);
    expect(
      Number(component.find('.arco-statistic-value > .arco-statistic-value-int').text())
    ).toBeLessThan(100);

    await act(async () => {
      await sleep(300);
    });

    expect(
      Number(component.find('.arco-statistic-value > .arco-statistic-value-int').text())
    ).toEqual(100);

    await act(async () => {
      component.setProps({ value: 200 });
      await sleep(100);
    });

    expect(
      Number(component.find('.arco-statistic-value > .arco-statistic-value-int').text())
    ).toBeGreaterThan(100);
    expect(
      Number(component.find('.arco-statistic-value > .arco-statistic-value-int').text())
    ).toBeLessThan(200);

    await act(async () => {
      await sleep(300);
    });

    expect(
      Number(component.find('.arco-statistic-value > .arco-statistic-value-int').text())
    ).toEqual(200);
  });

  it('loading', async () => {
    class LoadingStatistic extends React.Component<{}, { loading: boolean }> {
      state = {
        loading: true,
      };

      render() {
        return <Statistic title="Title" loading={this.state.loading} value={200} />;
      }
    }
    const component = mount(<LoadingStatistic />);

    await act(async () => {
      await sleep(100);
    });

    expect(component.find('.arco-statistic-value > .arco-statistic-value-int').length).toBe(0);
    expect(Number(component.find('.arco-skeleton').length)).toBe(1);

    // update loading
    await act(async () => {
      component.setState({ loading: false });
      await sleep(300);
    });

    expect(
      Number(component.find('.arco-statistic-value > .arco-statistic-value-int').text())
    ).toEqual(200);
    expect(Number(component.find('.arco-skeleton').length)).toBe(0);
  });
});

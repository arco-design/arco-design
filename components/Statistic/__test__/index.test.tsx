import React from 'react';
import { render } from '../../../tests/util';
import Statistic from '..';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';

mountTest(Statistic);
componentConfigTest(Statistic, 'Statistic');

describe('Statistic', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('groupSeparator', () => {
    const component = render(<Statistic groupSeparator value={100000} />);

    expect(
      component.find<HTMLSpanElement>('.arco-statistic-value > .arco-statistic-value-int')[0]
        .textContent
    ).toBe('100,000');

    component.rerender(<Statistic groupSeparator value={200000} />);

    expect(
      component.find<HTMLSpanElement>('.arco-statistic-value > .arco-statistic-value-int')[0]
        .textContent
    ).toBe('200,000');
  });

  it('prefix / suffix', () => {
    const component = render(<Statistic title="Title" value={50} prefix="Prefix" suffix="%" />);

    expect(
      component.find<HTMLSpanElement>('.arco-statistic-value > .arco-statistic-value-int')[0]
        .textContent
    ).toBe('Prefix50');
    expect(
      component.find<HTMLSpanElement>('.arco-statistic-value > .arco-statistic-value-decimal')[0]
        .textContent
    ).toBe('%');
  });

  it('precision', () => {
    const component = render(
      <Statistic title="Title" value={1000000} groupSeparator precision={2} suffix="$" />
    );

    expect(
      component.find('.arco-statistic-value > .arco-statistic-value-int')[0].innerHTML
    ).toContain('1,000,000');
    expect(
      component.find<HTMLSpanElement>('.arco-statistic-value > .arco-statistic-value-decimal')[0]
        .textContent
    ).toBe('.00$');
  });

  it('date', () => {
    const component = render(<Statistic value={1554869813383} format="YYYY/MM/DD HH:mm:ss" />);

    expect(
      component.find<HTMLSpanElement>('.arco-statistic-value > .arco-statistic-value-int')[0]
        .textContent
    ).toBe('2019/04/10 12:16:53');
  });

  it('loading', async () => {
    class LoadingStatistic extends React.Component<{ loading: boolean }, {}> {
      render() {
        return <Statistic title="Title" loading={this.props.loading} value={200} />;
      }
    }
    const component = render(<LoadingStatistic loading />);

    jest.runAllTimers();

    expect(component.find('.arco-statistic-value > .arco-statistic-value-int ').length).toBe(0);
    expect(Number(component.find('.arco-skeleton').length)).toBe(1);

    // update loading
    component.rerender(<LoadingStatistic loading={false} />);
    jest.runAllTimers();
    expect(
      Number(
        component.find<HTMLSpanElement>('.arco-statistic-value > .arco-statistic-value-int')[0]
          .textContent
      )
    ).toEqual(200);
    expect(Number(component.find('.arco-skeleton').length)).toBe(0);
  });

  it('renderFormat support number value', () => {
    const value = 1554869813383;
    const formattedValue = '2019/04/10 12:16:53';
    const mockRender = jest
      .fn()
      .mockImplementation((_value, _formattedValue) => `${_value}-${_formattedValue}`);
    const component = render(
      <Statistic value={value} format="YYYY/MM/DD HH:mm:ss" renderFormat={mockRender} />
    );

    expect(mockRender.mock.calls[0]).toEqual([value, formattedValue]);
    expect(component.find('.arco-statistic-value')[0].textContent).toEqual(
      `${value}-${formattedValue}`
    );
  });

  it('renderFormat support number value', () => {
    const value = '哈哈哈';
    const mockRender = jest
      .fn()
      .mockImplementation((_value, _formattedValue) => `${_value}-${_formattedValue}`);
    const component = render(
      <Statistic value={value} format="YYYY/MM/DD HH:mm:ss" renderFormat={mockRender} />
    );

    expect(mockRender.mock.calls[0]).toEqual([value, value]);
    expect(component.find('.arco-statistic-value')[0].textContent).toEqual(`${value}-${value}`);
  });
});

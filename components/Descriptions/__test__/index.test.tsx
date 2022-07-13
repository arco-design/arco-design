import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Descriptions from '..';
import ResponsiveObserve from '../../_util/responsiveObserve';

mountTest(Descriptions);
componentConfigTest(Descriptions, 'Descriptions');

const data = [
  {
    label: 'Name',
    value: 'Socrates',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
];

describe('Descriptions', () => {
  it('render without props correctly', () => {
    const wrapper = render(<Descriptions />);
    expect(wrapper).toBeTruthy();
  });

  it('render td col correctly', () => {
    const wrapper = render(<Descriptions data={data} column={1} />);
    expect(wrapper.find('tr')).toHaveLength(data.length);
  });

  it('unsubscribe ResponsiveObserve correctly', () => {
    const observeMount = jest.spyOn(ResponsiveObserve, 'subscribe');
    const observeUnMount = jest.spyOn(ResponsiveObserve, 'unsubscribe');
    const wrapper = render(<Descriptions data={data} column={{ xs: 3 }} />);

    expect(observeMount).toHaveBeenCalled();

    wrapper.unmount();

    expect(observeUnMount).toHaveBeenCalled();
  });

  it('render different layout correctly', () => {
    const wrapper = render(<Descriptions data={data} layout="vertical" />);
    const row1 = wrapper.find('tr').item(0);
    const row2 = wrapper.find('tr').item(1);
    expect(row1.querySelectorAll('.arco-descriptions-item-label')).toHaveLength(3);
    expect(row1.querySelectorAll('.arco-descriptions-item-value')).toHaveLength(0);

    expect(row2.querySelectorAll('.arco-descriptions-item-label')).toHaveLength(0);
    expect(row2.querySelectorAll('.arco-descriptions-item-value')).toHaveLength(3);
  });

  it('render correctly when set span in data item', () => {
    const itemSpan = 3;
    const itemColumn = 10;
    const dataWithSpan = data.map((item) => ({ ...item, span: itemSpan }));
    const wrapper = render(
      <Descriptions data={dataWithSpan} column={itemColumn} layout="inline-horizontal" />
    );
    const columns = Math.ceil(itemColumn / itemSpan);
    const row = Math.ceil(dataWithSpan.length / columns);

    expect(wrapper.find('tr')).toHaveLength(row);
    expect(wrapper.find('tr').item(0).children).toHaveLength(columns);
  });
});

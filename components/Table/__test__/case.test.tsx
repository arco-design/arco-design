import React from 'react';
import { render } from '../../../tests/util';
import Table from '..';

describe('Table special case test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('data item is array', () => {
    // case: https://github.com/arco-design/arco-design/issues/1258
    const columns = [
      {
        dataIndex: '[0]',
        title: 'title',
      },
    ];
    const arrayData = [['1'], ['2']];
    const component = render(
      <Table<string[]> rowKey={(record) => record[0]} columns={columns} data={arrayData} />
    );

    expect(component.find('tr')).toHaveLength(3);
    expect(component.find('td')[0].textContent).toBe('1');
  });
});

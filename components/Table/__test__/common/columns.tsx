import React from 'react';
import Button from '../../../Button';
import Tag from '../../../Tag';
import { IconSearch } from '../../../../icon';
import { ColumnProps } from '../../interface';
import { TestData, MultipleSorterTestData } from './data';
import { NOOP } from '../../../_util/constant';

export const columns: ColumnProps<TestData>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Sex',
    dataIndex: 'sex',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

export const columnsSorter: ColumnProps<TestData>[] = (function () {
  return columns.map((d) => {
    if (d.title === 'Age') {
      return {
        ...d,
        defaultSortOrder: 'ascend' as const,
        sorter: (a, b) => a.age - b.age,
      };
    }
    return d;
  });
})();

export const columnsFilter: ColumnProps<TestData>[] = (function () {
  return columns.map((d) => {
    if (d.title === 'Sex') {
      return {
        ...d,
        defaultFilters: ['male'],
        filters: [
          {
            text: 'Male',
            value: 'male',
          },
          {
            text: 'Female',
            value: 'female',
          },
        ],
        onFilter: (value, row) => row.sex === value,
      };
    }
    return d;
  });
})();

export const columnsFilterCustom: ColumnProps<TestData>[] = (function () {
  return columns.map((d) => {
    if (d.title === 'Sex') {
      return {
        ...d,
        filterIcon: <IconSearch />,
        filterDropdown: ({ setFilterKeys, confirm }) => {
          return (
            <div className="arco-table-custom-filter">
              <Button
                onClick={() => {
                  setFilterKeys(['male'], NOOP);
                }}
              >
                set value
              </Button>
              <Button
                onClick={() => {
                  confirm();
                }}
              >
                ok
              </Button>
            </div>
          );
        },
        onFilter: (value, row) => row.sex === value,
      };
    }
    return d;
  });
})();

export const columnsCustomRender: ColumnProps<TestData>[] = (function () {
  return columns.map((d) => {
    if (d.title === 'Sex') {
      return {
        ...d,
        render: (col) => {
          return <Tag>{col}</Tag>;
        },
      };
    }
    return d;
  });
})();

export const columnsFixedColumns: ColumnProps<TestData>[] = (function () {
  return columns.map((d) => {
    if (d.title === 'Name') {
      return {
        ...d,
        fixed: 'left' as const,
        width: 100,
      };
    }
    if (d.title === 'Email') {
      return {
        ...d,
        fixed: 'right' as const,
        width: 120,
      };
    }
    return d;
  });
})();

export const columnsCustomStyle: ColumnProps<TestData>[] = (function () {
  return columns.map((d) => {
    if (d.title === 'Name') {
      return {
        ...d,
        className: 'red',
        headerCellStyle: {
          backgroundColor: 'rgb(0, 0, 0)',
          color: 'rgb(255, 255, 255)',
        },
        bodyCellStyle: {
          color: 'rgb(255, 255, 255)',
        },
      };
    }
    if (d.title === 'Address') {
      return {
        ...d,
        cellStyle: {
          color: 'rgb(1, 1, 1)',
        },
      };
    }
    return d;
  });
})();

export const columnsGroupColumns: ColumnProps<TestData>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Sex',
        dataIndex: 'sex',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
    ],
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

export const multipleSorterColumns: ColumnProps<MultipleSorterTestData>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Score A',
    dataIndex: 'scoreA',
    defaultSortOrder: 'descend',
    sorter: {
      compare: (a, b) => a.scoreA - b.scoreA,
      multiple: 3,
    },
  },
  {
    title: 'Score B',
    dataIndex: 'scoreB',
    defaultSortOrder: 'ascend',
    sorter: {
      compare: (a, b) => a.scoreB - b.scoreB,
      multiple: 2,
    },
  },
  {
    title: 'Score C',
    dataIndex: 'scoreC',
    defaultSortOrder: 'descend',
    sorter: {
      compare: (a, b) => a.scoreC - b.scoreC,
      multiple: 1,
    },
  },
];

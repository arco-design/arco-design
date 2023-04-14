---
order: 22
title:
  zh-CN: 拖拽锚点排序
  en-US: Drag Anchor
---

## zh-CN

可以配合 `react-sortable-hoc@2.0.0` 可以实现拖拽锚点排序。

## en-US

It can be used with `react-sortable-hoc@2.0.0` to drag the anchor to sort table.

```js
import { useState } from 'react';
import { Table } from '@arco-design/web-react';
import { IconDragDotVertical } from '@arco-design/web-react/icon';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const arrayMoveMutate = (array, from, to) => {
  const startIndex = to < 0 ? array.length + to : to;

  if (startIndex >= 0 && startIndex < array.length) {
    const item = array.splice(from, 1)[0];
    array.splice(startIndex, 0, item);
  }
};

const arrayMove = (array, from, to) => {
  array = [...array];
  arrayMoveMutate(array, from, to);
  return array;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const initialData = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];
const DragHandle = SortableHandle(() => (
  <IconDragDotVertical
    style={{
      cursor: 'move',
      color: '#555',
    }}
  />
));
const SortableWrapper = SortableContainer((props) => {
  return <tbody {...props} />;
});
const SortableItem = SortableElement((props) => {
  return <tr {...props} />;
});

function App() {
  const [data, setData] = useState(initialData);

  function onSortEnd({ oldIndex, newIndex }) {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data), oldIndex, newIndex).filter((el) => !!el);
      console.log('New Data: ', newData);
      setData(newData);
    }
  }

  const DraggableContainer = (props) => (
    <SortableWrapper
      useDragHandle
      onSortEnd={onSortEnd}
      helperContainer={() => document.querySelector('.arco-drag-table-container-2 table tbody')}
      updateBeforeSortStart={({ node }) => {
        const tds = node.querySelectorAll('td');
        tds.forEach((td) => {
          td.style.width = td.clientWidth + 'px';
        });
      }}
      {...props}
    />
  );

  const DraggableRow = (props) => {
    const { record, index, ...rest } = props;
    return <SortableItem index={index} {...rest} />;
  };

  const components = {
    header: {
      operations: ({ selectionNode, expandNode }) => [
        {
          node: <th />,
          width: 40,
        },
        {
          name: 'expandNode',
          node: expandNode,
        },
        {
          name: 'selectionNode',
          node: selectionNode,
        },
      ],
    },
    body: {
      operations: ({ selectionNode, expandNode }) => [
        {
          node: (
            <td>
              <div className="arco-table-cell">
                <DragHandle />
              </div>
            </td>
          ),
          width: 40,
        },
        {
          name: 'expandNode',
          node: expandNode,
        },
        {
          name: 'selectionNode',
          node: selectionNode,
        },
      ],
      tbody: DraggableContainer,
      row: DraggableRow,
    },
  };
  return (
    <Table
      className="arco-drag-table-container-2"
      components={components}
      columns={columns}
      data={data}
      rowSelection={{
        type: 'checkbox',
      }}
    />
  );
}

export default App;
```

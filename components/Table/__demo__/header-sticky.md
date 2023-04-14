---
order: 19
title:
  zh-CN: 表头吸顶
  en-US: Header Sticky
---

## zh-CN

配合 `react-sticky@6.0.3` 可以实现表头吸顶的效果。

## en-US

Cooperate with `react-sticky@6.0.3` to achieve the effect of header sticky.

```js
import { Table } from '@arco-design/web-react';
import { StickyContainer, Sticky } from 'react-sticky';
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
const data = [
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

function Wrapper(props) {
  return (
    <Sticky topOffset={-60}>
      {({ style, isSticky }) => (
        <div
          style={{
            ...style,
            top: isSticky ? 60 : 0,
            zIndex: 3,
            overflow: 'auto',
          }}
        >
          {props.children}
        </div>
      )}
    </Sticky>
  );
}

const components = {
  header: {
    wrapper: Wrapper,
  },
};

function App() {
  return (
    <StickyContainer>
      <Table
        components={components}
        scroll={{
          y: true,
        }}
        border={{
          wrapper: true,
          cell: true,
        }}
        columns={columns}
        data={data}
      />
    </StickyContainer>
  );
}

export default App;
```

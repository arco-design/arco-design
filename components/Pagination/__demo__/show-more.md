---
order: 7
title:
  zh-CN: 受控的数据总数
  en-US: Count under control
---

## zh-CN

通过改变 `total` 的值，解决无法计算页码总数的情景。

## en-US

By changing the value of `total`, solve the situation where the total number of pages cannot be calculated.

```js
import React from 'react';
import { Pagination } from '@arco-design/web-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      showMore: true,
      total: 20,
    };
  }

  handeChange = (pageNum) => {
    if (pageNum > 20) {
      this.setState({
        showMore: false,
        current: pageNum,
      });
      return;
    }

    this.setState({
      total: Math.max((pageNum + 1) * 10, this.state.total),
      showMore: true,
      current: pageNum,
    });
  };

  render() {
    return (
      <Pagination
        current={this.state.current}
        total={this.state.total}
        onChange={this.handeChange}
        showMore={this.state.showMore}
      />
    );
  }
}

export default App;
```

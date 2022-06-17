---
order: 7
title:
  zh-CN: 滚动加载列表
  en-US: Scroll Loading
---

## zh-CN

可设置 `onReachBottom` 来动态滚动加载列表。当 `onReachBottom` 无法满足需求，可通过 `onListScroll` 来自定义列表滚动监听函数，此时默认的滚动监听函数将失效。

## en-US

You can set `onReachBottom` to dynamically loading data when the list is scrolling. If `onReachBottom` cannot meet the requirements, you can customize the list scrolling monitor function through `onListScroll`, at this time the default monitor function will be invalid.

```js
import { useState, useEffect } from 'react';
import { List, Avatar, Spin } from '@arco-design/web-react';

function App() {
  const [mockData, setMockData] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(<Spin loading={true} />);

  const fetchData = (currentPage) => {
    if (currentPage > 10) {
      setScrollLoading('No more data');
    } else {
      fetch('https://randomuser.me/api/?results=10')
        .then((res) => res.json())
        .then((data) => {
          setMockData((mockData) => mockData.concat(...data.results));
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);
  return (
    <List
      style={{ width: 600, maxHeight: 320 }}
      scrollLoading={scrollLoading}
      onReachBottom={(currentPage) => fetchData(currentPage)}
      dataSource={mockData}
      render={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={
              <Avatar shape="square">
                <img alt="avatar" src={item.picture.thumbnail} />
              </Avatar>
            }
            title={`${item.name.first} ${item.name.last}`}
            description={item.email}
          />
        </List.Item>
      )}
    />
  );
}

export default App;
```

---
order: 5
title:
  zh-CN: 远程搜索
  en-US: Search Users
---

## zh-CN

指定 `showSearch`，并且结合 `filterOption` 和 `onSearch`，可以使用远程搜索功能。

## en-US

Through the combination of `showSearch`, `filterOption` and `onSearch`, you can search user from origin and select them.

```js
import { useState, useRef, useCallback } from 'react';
import { Select, Spin, Avatar } from '@arco-design/web-react';
import debounce from 'lodash/debounce';

function Demo() {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);

  const refFetchId = useRef(null);

  const debouncedFetchUser = useCallback(
    debounce((inputValue) => {
      refFetchId.current = Date.now();
      const fetchId = refFetchId.current;

      setFetching(true);
      setOptions([]);

      fetch('https://randomuser.me/api/?results=5')
        .then((response) => response.json())
        .then((body) => {
          if (refFetchId.current === fetchId) {
            const options = body.results.map((user) => ({
              label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size={24} style={{ marginLeft: 6, marginRight: 12 }}>
                    <img alt="avatar" src={user.picture.thumbnail} />
                  </Avatar>
                  {`${user.name.first} ${user.name.last}`}
                </div>
              ),
              value: user.email,
            }));

            setFetching(false);
            setOptions(options);
          }
        });
    }, 500),
    []
  );

  return (
    <Select
      style={{ width: 345 }}
      showSearch
      mode="multiple"
      options={options}
      placeholder="Search by name"
      filterOption={false}
      renderFormat={(option) => {
        return option.children.props.children[1];
      }}
      notFoundContent={
        fetching ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spin style={{ margin: 12 }} />
          </div>
        ) : null
      }
      onSearch={debouncedFetchUser}
    />
  );
}

ReactDOM.render(<Demo />, CONTAINER);
```

---
order: 11
title:
  zh-CN: 滚动加载选项
  en-US: Load Data While Scrolling
---

## zh-CN

当动态加载时，可通过`onPopupScroll`来监听滚动事件

## en-US

When loading dynamically, you can monitor scroll events through `onPopupScroll`.

```js
import { useRef, useCallback, useState } from 'react';
import { Select, Spin, Avatar } from '@arco-design/web-react';
import debounce from 'lodash/debounce';

function App() {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const refFetchId = useRef(null);
  const refCanTriggerLoadMore = useRef(true);
  const debouncedFetchUser = useCallback(
    debounce((inputValue) => {
      refFetchId.current = Date.now();
      const fetchId = refFetchId.current;
      setFetching(true);
      setOptions([]);
      fetch('https://randomuser.me/api/?results=10')
        .then((response) => response.json())
        .then((body) => {
          if (refFetchId.current === fetchId) {
            const newOptions = body.results.map((user) => ({
              label: (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    size={24}
                    style={{
                      marginLeft: 6,
                      marginRight: 12,
                    }}
                  >
                    <img alt="avatar" src={user.picture.thumbnail} />
                  </Avatar>
                  {`${user.name.first} ${user.name.last}`}
                </div>
              ),
              value: user.email,
            }));
            setFetching(false);
            setOptions(newOptions);
          }
        });
    }, 500),
    [options]
  );

  const popupScrollHandler = (element) => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    const scrollBottom = scrollHeight - (scrollTop + clientHeight);

    if (scrollBottom < 10) {
      if (!fetching && refCanTriggerLoadMore.current) {
        debouncedFetchUser();
        refCanTriggerLoadMore.current = false;
      }
    } else {
      refCanTriggerLoadMore.current = true;
    }
  };

  return (
    <Select
      style={{ width: 345 }}
      mode="multiple"
      options={options}
      placeholder="Search by name"
      filterOption={false}
      renderFormat={(option) => {
        return option.children.props.children[1];
      }}
      notFoundContent={
        fetching ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spin style={{ margin: 12 }} />
          </div>
        ) : null
      }
      onSearch={debouncedFetchUser}
      onPopupScroll={popupScrollHandler}
    />
  );
}

export default App;
```

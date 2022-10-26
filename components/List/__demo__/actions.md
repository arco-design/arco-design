---
order: 3
title:
  zh-CN: 增加操作项
  en-US: With Actions
---

## zh-CN

通过 `actions` 来为列表添加操作项。

## en-US

Use `actions` to add operation items to the list.

```js
import { useState } from 'react';
import { List, Avatar } from '@arco-design/web-react';
import { IconEdit, IconDelete, IconDown, IconLoading } from '@arco-design/web-react/icon';

function App() {
  const dataSource = new Array(4).fill({
    title: 'Beijing Bytedance Technology Co., Ltd.',
    description: 'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
  });
  const [loading, setLoading] = useState(false);

  const render = (actions, item, index) => (
    <List.Item key={index} actions={actions}>
      <List.Item.Meta
        avatar={<Avatar shape="square">A</Avatar>}
        title={item.title}
        description={item.description}
      />
    </List.Item>
  );

  const footer = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      onClick={() => setLoading(!loading)}
      onKeyDown={e => {
        const keyCode = e.keyCode || e.which;
        if (keyCode === 13) { // enter
          setLoading(!loading)
        }
      }}
    >
      {loading ? (
        <span style={{ color: 'var(--color-text-3)' }}>
          <IconLoading style={{ marginRight: 8, color: 'rgb(var(--arcoblue-6))' }} />
          loading...
        </span>
      ) : (
        <span className="list-demo-actions-button" tabIndex={0} >
          More
          <IconDown style={{ marginLeft: 8 }} />
        </span>
      )}
    </div>
  );
  return (
    <>
      <List
        className="list-demo-actions"
        style={{ width: 700, marginBottom: 48 }}
        dataSource={dataSource}
        render={render.bind(null, [
          <span className="list-demo-actions-icon">
            <IconEdit />
          </span>,
          <span className="list-demo-actions-icon">
            <IconDelete />
          </span>,
        ])}
        footer={footer}
      />
      <List
        className="list-demo-actions"
        style={{ width: 700 }}
        dataSource={dataSource}
        render={render.bind(null, [
          <span className="list-demo-actions-button">Edit</span>,
          <span className="list-demo-actions-button">Delete</span>,
        ])}
      />
    </>
  );
}

export default App;
```

```css
.list-demo-actions-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}

.list-demo-actions-icon:hover {
  background-color: var(--color-fill-3);
}

.list-demo-actions-button[tabindex]:focus-visible {
  box-shadow: 0 0 0 2px var(--color-primary-light-3);
}

.list-demo-actions-button {
  position: relative;
  padding: 0 4px;
  border-radius: 2px;
  color: rgb(var(--arcoblue-6));
  cursor: pointer;
  transition: all 0.1s;
}

.list-demo-actions-button:hover {
  background-color: var(--color-fill-3);
}

.list-demo-actions .arco-list-item-action li:not(:last-child) .list-demo-actions-button::after {
  content: '';
  position: absolute;
  top: 3px;
  right: -10px;
  width: 1px;
  height: 12px;
  background-color: var(--color-fill-3);
}
```

---
order: 9
title: 
  zh-CN: 带页签的卡片
  en-US: With tab
---

## zh-CN

举例来说，可以在卡片组件里面使用 `Tabs` 标签页组件。

## en-US

`Tabs` component can be used in card.

```js
import { Card, Tabs, Link } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;

const App = () => {
  return (
    <Card
      title="Card with Tab"
      extra={<Link>More</Link>}
      style={{
        width: '100%',
      }}
    >
      <Tabs
        style={{
          maxWidth: 350,
          margin: -15,
        }}
      >
        {new Array(4).fill(null).map((_, index) => {
          return (
            <TabPane destroyOnHide key={index} title={`Tab ${index}`}>
              <div
                style={{
                  margin: '0px 16px 16px 16px',
                }}
              >
                {`Content ${index}`}
                <br />
                {`Content ${index}`}
                <br />
                {`Content ${index}`}
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};

export default App;
```

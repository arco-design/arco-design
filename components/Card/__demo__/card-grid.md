---
order: 7
title: 
  zh-CN: 网络型内嵌卡片
  en-US: Card grid
---

## zh-CN

通过 `Card.Grid` 来使用卡片内容区隔模式。

## en-US

Use `Card.Grid` to enable the card content segmentation mode.

```js
import { Card, Link } from '@arco-design/web-react';
const { Grid } = Card;

const App = () => {
  return (
    <Card bordered={false} style={{ width: '100%' }}>
      {new Array(7).fill(null).map((_, index) => {
        const hoverable = index % 2 === 0;
        return (
          <Grid
            key={index}
            hoverable={hoverable}
            style={{
              width: '25%',
            }}
          >
            <Card
              className="card-demo-in-grid"
              style={{ width: '100%' }}
              title="Arco Card"
              extra={<Link>More</Link>}
              bordered={false}
            >
              {new Array(2).fill(null).map((_, index) => (
                <p style={{ margin: 0 }} key={index}>
                  {hoverable ? 'Card allow to hover' : 'Card content'}
                </p>
              ))}
            </Card>
          </Grid>
        );
      })}
    </Card>
  );
};

export default App;
```

```css
.card-demo-in-grid .arco-card-header {
  border: none;
}
```

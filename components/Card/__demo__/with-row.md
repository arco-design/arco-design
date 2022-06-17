---
order: 5
title: 
  zh-CN: 栅格卡片
  en-US: With row
---

## zh-CN

在系统概览页面常常和栅格进行配合。

## en-US

Often used together with `Grid` on the overview page of systems.

```js
import { Card, Grid, Link } from '@arco-design/web-react';
const { Row, Col } = Grid;
const extra = <Link>More</Link>;

const App = () => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: 40,
        backgroundColor: 'var(--color-fill-2)',
      }}
    >
      <Row
        gutter={20}
        style={{ marginBottom: 20 }}
      >
        <Col span={8}>
          <Card
            title="Arco Card"
            extra={extra}
            bordered={false}
            style={{
              width: '100%',
            }}
          >
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Arco Card"
            extra={extra}
            bordered={false}
            style={{ width: '100%' }}
          >
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Arco Card"
            extra={extra}
            bordered={false}
            style={{ width: '100%' }}
          >
            Card content
          </Card>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={16}>
          <Card
            title="Arco Card"
            extra={extra}
            bordered={false}
            style={{ width: '100%' }}
          >
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Arco Card"
            extra={extra}
            bordered={false}
            style={{ width: '100%' }}
          >
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default App;
```

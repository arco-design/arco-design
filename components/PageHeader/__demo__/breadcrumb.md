---
order: 1
title:
  zh-CN: 带有面包屑
  en-US: Breadcrumb
---

## zh-CN

基础页头，适合使用在需要简单描述的场景。默认是没有底色的。

## en-US

Basic page header, suitable for use in scenarios that require a simple description. The default is no background color.

```js
import { PageHeader, Radio } from '@arco-design/web-react';

const App = () => {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <PageHeader
        style={{ background: 'var(--color-bg-2)' }}
        title="ArcoDesign"
        subTitle="This is a description"
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'Home',
            },
            {
              path: '/channel',
              breadcrumbName: 'Channel',
            },
            {
              path: '/news',
              breadcrumbName: 'News',
            },
          ],
        }}
        extra={
          <div>
            <Radio.Group mode="fill" type="button" defaultValue="small">
              <Radio value="large">Large</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="small">Small</Radio>
            </Radio.Group>
          </div>
        }
      />
    </div>
  );
};

export default App;
```

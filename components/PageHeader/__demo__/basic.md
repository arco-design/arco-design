---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

基础页头，适合使用在需要简单描述的场景。默认是没有底色的。

## en-US

Basic page header, suitable for use in scenarios that require a simple description. The default is no background color.

```js
import { PageHeader, Message, Radio } from '@arco-design/web-react';

const App = () => {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <PageHeader
        style={{ background: 'var(--color-bg-2)' }}
        title="ArcoDesign"
        subTitle="This is a description"
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

---
order: 1
title:
  zh-CN: 前缀/前置标签/后置标签
  en-US: Prefix/addBefore/addAfter
---

## zh-CN

前缀 / 前置标签 / 后置标签

## en-US

Prefix / addBefore / addAfter

```js
import { InputTag, Grid } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <div>
      <Grid cols={2} colGap={12} rowGap={12} style={{maxWidth: 600}}>
        <Grid.GridItem>
          <InputTag
            prefix="¥"
            allowClear
          />
        </Grid.GridItem>
        <Grid.GridItem>
          <InputTag
            addBefore={<IconUser/>}
            allowClear
          />
        </Grid.GridItem>

        <Grid.GridItem>
          <InputTag
            prefix="¥"
            addBefore={<IconUser/>}
            allowClear
          />
        </Grid.GridItem>

        <Grid.GridItem>
          <InputTag
            addBefore={'www.'}
            addAfter={'.com'}
            allowClear
          />
        </Grid.GridItem>


      </Grid>
    </div>
  );
};

export default App;
```

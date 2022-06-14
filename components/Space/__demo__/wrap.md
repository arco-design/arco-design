---
order: 4
title: 
  zh-CN: 环绕间距
  en-US: Wrap
---

## zh-CN

环绕类型的间距，四周都有间距，一般用于换行的场景。

## en-US

Surround type spacing, there are spacing on all sides, generally used in the scene of line wrapping.

```js
import { Space, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <Space wrap size={[12, 18]}>
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Button type="primary">Item3</Button>
      <Button type="primary">Item4</Button>
      <Button type="primary">Item5</Button>
      <Button type="primary">Item6</Button>
      <Button type="primary">Item7</Button>
      <Button type="primary">Item8</Button>
      <Button type="primary">Item9</Button>
      <Button type="primary">Item10</Button>
      <Button type="primary">Item11</Button>
      <Button type="primary">Item12</Button>
      <Button type="primary">Item13</Button>
      <Button type="primary">Item14</Button>
      <Button type="primary">Item15</Button>
      <Button type="primary">Item16</Button>
      <Button type="primary">Item17</Button>
      <Button type="primary">Item18</Button>
      <Button type="primary">Item19</Button>
      <Button type="primary">Item20</Button>
    </Space>
  );
};

export default App;
```

---
order: 4
title:
  zh-CN: 自定义面板样式
  en-US: Custom Panel Style
---

## zh-CN

通过指定 `style` 实现自定义的面板样式。

## en-US

Use `style` to customize style of panel.

```js
import { Collapse, Divider } from '@arco-design/web-react';
const CollapseItem = Collapse.Item;
const customStyle = {
  borderRadius: 2,
  marginBottom: 24,
  border: 'none',
  overflow: 'hidden',
};

const App = () => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1', '2']}
      style={{ maxWidth: 1180 }}
    >
      <CollapseItem style={customStyle} header="Beijing Toutiao Technology Co., Ltd." name="1">
        Beijing Toutiao Technology Co., Ltd.
        <Divider style={{ margin: '8px 0' }}/>
        Beijing Toutiao Technology Co., Ltd.
        <Divider style={{ margin: '8px 0' }}/>
        Beijing Toutiao Technology Co., Ltd.
      </CollapseItem>

      <CollapseItem style={customStyle} header="Introduce" name="2">
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
        the world. Toutiao started out as a news recommendation engine and gradually evolved into a
        platform delivering content in various formats, such as texts, images, question-and-answer
        posts, microblogs, and videos.
      </CollapseItem>

      <CollapseItem style={customStyle} header="The Underlying AI Technology" name="3">
        In 2016, ByteDance's AI Lab and Peking University co-developed Xiaomingbot (张小明), an
        artificial intelligence bot that writes news articles. The bot published 450 articles during
        the 15-day 2016 Summer Olympics in Rio de Janeiro. In general, Xiaomingbot published stories
        approximately two seconds after the event ended.
      </CollapseItem>
    </Collapse>
  );
};

export default App;
```

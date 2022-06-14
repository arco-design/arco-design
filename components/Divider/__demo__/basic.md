---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

对不同章节的文本段落进行分割，默认为水平分割线，可在中间加入文字。

## en-US

Can be used to separate paragraphs of different chapters. The default is a horizontal dividing line. Text can be added within divider.

```js
import { Divider, Typography } from '@arco-design/web-react';
import { IconFileImage, IconUser, IconPen } from '@arco-design/web-react/icon';
const { Paragraph, Title } = Typography;

const App = () => {
  return (
    <>
      <div className="divider-demo">
        <Paragraph>
          A design is a plan or specification for the construction of an object.
        </Paragraph>
        <Divider />
        <Paragraph>
          A design is a plan or specification for the construction of an object.
        </Paragraph>
        <Divider
          style={{
            borderBottomStyle: 'dashed',
          }}
        />
        <Paragraph>
          A design is a plan or specification for the construction of an object.
        </Paragraph>
        <Divider
          style={{
            borderBottomWidth: 2,
            borderBottomStyle: 'dotted',
          }}
        />
        <Paragraph>
          A design is a plan or specification for the construction of an object.
        </Paragraph>
      </div>
      <div
        className="divider-demo"
        style={{ marginTop: 48 }}
      >
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconFileImage />
          </span>
          <div className="content">
            <Title heading={6}>Image</Title>May 4, 2010
          </div>
        </div>
        <Divider className="half-divider" />
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconUser />
          </span>
          <div className="content">
            <Title heading={6}>Avatar</Title>May 4, 2010
          </div>
        </div>
        <Divider className="half-divider" />
        <div className="divider-demo-flex-content">
          <span className="avatar">
            <IconPen />
          </span>
          <div className="content">
            <Title heading={6}>Icon</Title>May 4, 2010
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
```

```css
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}

.divider-demo-flex-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider-demo .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border-radius: 50%;
  font-size: 16px;
  background-color: var(--color-fill-3);
  color: var(--color-text-2);
}

.divider-demo .content {
  flex: 1;
  font-size: 12px;
  line-height: 20px;
  color: var(--color-text-2);
}

.divider-demo .title {
  margin-bottom: 2px;
  font-size: 16px;
  line-height: 24px;
  color: #1d2129;
}

.divider-demo .half-divider {
  left: 55px;
  min-width: auto;
  width: calc(100% - 55px);
  margin: 16px 0;
}
```

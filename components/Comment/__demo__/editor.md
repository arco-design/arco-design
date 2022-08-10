---
order: 4
title:
  zh-CN: 回复框
  en-US: Reply editor
---

## zh-CN

实现一个评论回复框。

##  en-US

Display as a reply editor.

```js
import { Comment, Avatar, Button, Input } from '@arco-design/web-react';
import { IconMessage } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Comment
      align="right"
      actions={
        <span className="custom-comment-action">
          <IconMessage /> Reply
        </span>
      }
      author="Balzac"
      avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
      content={
        <div>
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process.
        </div>
      }
      datetime="1 hour"
    >
      <Comment
        align="right"
        actions={[
          <Button key="0" type="secondary">
            Cancel
          </Button>,
          <Button key="1" type="primary">
            Reply
          </Button>,
        ]}
        avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp"
        content={
          <div>
            <Input.TextArea placeholder="Here is you content." />
          </div>
        }
      ></Comment>
    </Comment>
  );
};

export default App;
```

```css:silent
.custom-comment-action {
  padding: 0 4px;
  line-height: 24px;
  border-radius: 2px;
  background: transparent;
  transition: all 0.1s ease;
  color: var(--color-text-1);
  cursor: pointer;
  display: inline-block;
}

.custom-comment-action:hover {
  background: var(--color-fill-3);
}
```

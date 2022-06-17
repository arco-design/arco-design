---
order: 2
title:
  zh-CN: 嵌套评论
  en-US: Nested comments
---

## zh-CN

Comments 组件可以嵌套。

##  en-US

Comments can be nested.

```js
import { Comment, Avatar } from '@arco-design/web-react';
import { IconHeart, IconMessage, IconStar } from '@arco-design/web-react/icon';

const App = () => {
  const actions = (
    <span className="custom-comment-action">
      <IconMessage /> Reply
    </span>
  );
  return (
    <Comment
      actions={actions}
      author={'Socrates'}
      avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp"
      content={<div>Comment body content.</div>}
      datetime="1 hour"
    >
      <Comment
        actions={actions}
        author="Balzac"
        avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
        content={<div>Comment body content.</div>}
        datetime="1 hour"
      >
        <Comment
          actions={actions}
          author="Austen"
          avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
          content={<div> Reply content </div>}
          datetime="1 hour"
        />
        <Comment
          actions={actions}
          author="Plato"
          avatar="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          content={<div> Reply content </div>}
          datetime="1 hour"
        />
      </Comment>
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

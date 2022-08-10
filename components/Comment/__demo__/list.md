---
order: 3
title:
  zh-CN: 配合List使用
  en-US: Usage with List
---

## zh-CN

配合 List 组件展现评论列表。

## en-US

Display the comments list with List component.

```js
import React from 'react';
import { Comment, List } from '@arco-design/web-react';
import {
  IconHeart,
  IconMessage,
  IconHeartFill,
  IconStarFill,
  IconStar,
} from '@arco-design/web-react/icon';

const App = () => {
  const [likes, setLikes] = React.useState([]);
  const [stars, setStars] = React.useState([]);
  const data = [
    {
      id: 1,
      author: 'Socrates',
      like: 13,
      star: 3,
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
      content: 'Comment body content.',
      datetime: '1 hour',
    },
    {
      id: 2,
      author: 'Balzac',
      like: 12,
      star: 1,
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
      content: 'Comment body content.',
      datetime: '2 hour',
    },
  ];
  return (
    <List bordered={false} header={<span>2 comments</span>}>
      {data.map((item, index) => {
        const like = likes.indexOf(item.id) > -1;
        const star = stars.indexOf(item.id) > -1;
        return (
          <List.Item key={item.id}>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
              actions={[
                <span
                  className="custom-comment-action"
                  key="heart"
                  onClick={() =>
                    setLikes(like ? likes.filter((x) => x !== item.id) : [...likes, item.id])
                  }
                >
                  {like ? (
                    <IconHeartFill style={{ color: '#f53f3f' }}/>
                  ) : (
                    <IconHeart />
                  )}
                  {item.like + (like ? 1 : 0)}
                </span>,
                <span
                  className="custom-comment-action"
                  key="star"
                  onClick={() =>
                    setStars(star ? stars.filter((x) => x !== item.id) : [...stars, item.id])
                  }
                >
                  {star ? (
                    <IconStarFill style={{ color: '#ffb400' }}/>
                  ) : (
                    <IconStar />
                  )}
                  {item.star + (star ? 1 : 0)}
                </span>,
                <span className="custom-comment-action" key="reply">
                  <IconMessage /> Reply
                </span>,
              ]}
            />
          </List.Item>
        );
      })}
    </List>
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

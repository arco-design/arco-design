---
order: 2
title:
  zh-CN: 头像组
  en-US: Group
---

## zh-CN

使用 `Avatar.Group` 可以使用头像组功能，可通过 `size` 指定头像的大小。

## en-US

Use `Avatar.Group` to group a list of avatars. `size` can be used to specify the size of each avatar.

```js
import { Avatar } from '@arco-design/web-react';
const AvatarGroup = Avatar.Group;

const App = () => {
  return (
    <div>
      <AvatarGroup
        size={32}
        style={{ margin: 10 }}
      >
        <Avatar style={{ backgroundColor: '#7BC616' }}>
          A
        </Avatar>
        <Avatar style={{ backgroundColor: '#14C9C9' }}>
          B
        </Avatar>
        <Avatar style={{ backgroundColor: '#168CFF' }}>
          C
        </Avatar>
        <Avatar style={{ backgroundColor: '#FF7D00' }}>
          Arco
        </Avatar>
        <Avatar style={{ backgroundColor: '#FFC72E' }}>
          Design
        </Avatar>
      </AvatarGroup>
      <br />
      <AvatarGroup
        size={24}
        style={{ margin: 10 }}>
        <Avatar style={{ backgroundColor: '#7BC616' }}>
          A
        </Avatar>
        <Avatar style={{ backgroundColor: '#14C9C9' }}>
          B
        </Avatar>
        <Avatar style={{ backgroundColor: '#168CFF' }}>
          C
        </Avatar>
        <Avatar style={{ backgroundColor: '#FF7D00' }}>
          Arco
        </Avatar>
        <Avatar style={{ backgroundColor: '#FFC72E' }}>
          Design
        </Avatar>
      </AvatarGroup>
    </div>
  );
};

export default App;
```

---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

贪吃蛇游戏组件的基础用法。使用方向键控制蛇的移动，空格键暂停/继续游戏。

## en-US

Basic usage of the `Snake` game component. Use arrow keys to control the snake and Space to pause/resume.

```js
import { Snake } from '@arco-design/web-react';

const App = () => {
  return (
    <Snake
      width={20}
      height={20}
      cellSize={20}
      speed={200}
      onScoreChange={(score) => console.log('Score:', score)}
      onGameOver={(score) => console.log('Game over! Score:', score)}
    />
  );
};

export default App;
```

`````
组件 / 其他

# 贪吃蛇 Snake

一个经典的贪吃蛇小游戏组件，支持键盘方向键控制和暂停功能。
`````

%%Content%%

## API

### Snake

|参数名|描述|类型|默认值|
|---|---|---|---|
|width|棋盘列数|number |`20`|
|height|棋盘行数|number |`20`|
|cellSize|每个格子的像素大小|number |`20`|
|speed|蛇移动的速度（毫秒/帧）|number |`200`|
|onGameOver|游戏结束时的回调|(score: number) => void |`-`|
|onScoreChange|分数变化时的回调|(score: number) => void |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

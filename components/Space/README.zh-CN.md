`````
组件 / 布局

# 间距 Space

设置组件之间的间距。
`````

%%Content%%

## API

### Space

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|wrap|环绕类型的间距，用于折行的场景。|boolean |`-`|-|
|align|对齐方式|'start' \| 'end' \| 'center' \| 'baseline' |`-`|-|
|direction|间距方向|'vertical' \| 'horizontal' |`horizontal`|-|
|split|设置分隔符|ReactNode |`-`|2.22.0|
|className|节点类名|string \| string[] |`-`|-|
|size|尺寸。( `2.15.0` 开始支持数组形式 )|[SpaceSize](#spacesize) \| [SpaceSize](#spacesize)[] |`small`|-|
|style|节点样式|CSSProperties |`-`|-|

### SpaceSize

```js
export type SpaceSize = "mini" | "small" | "medium" | "large" | number;
```

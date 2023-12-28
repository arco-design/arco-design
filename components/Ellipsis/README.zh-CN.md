`````
组件 / 通用

# 省略 Ellipsis

当文字内容超出容器后自动显示省略号
`````

%%Content%%

## API

### Ellipsis

|参数名|描述|类型|默认值|
|---|---|---|---|
|action|是否显示操控按钮|boolean |`-`|
|tooltip|配置省略弹出框|boolean |`-`|
|rows|显示省略的行数|number |`1`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|actionRender|自定义渲染操控按钮|(expanded: boolean) => ReactNode |`-`|

`````
组件 / 数据展示

# 徽标数 Badge

一般出现在图标或文字的右上角。提供及时、重要的信息提示。
`````

%%Content%%

## API

### Badge

|参数名|描述|类型|默认值|
|---|---|---|---|
|dot|显示为小红点|boolean |`-`|
|maxCount|徽标最大显示数值，如果 count 超过这个数值会显示为 `${maxCount}+`|number |`99`|
|text|自定义提示内容|string |`-`|
|color|内置的一些颜色|\| 'red'\| 'orangered'\| 'orange'\| 'gold'\| 'lime'\| 'green'\| 'cyan'\| 'arcoblue'\| 'purple'\| 'pinkpurple'\| 'magenta'\| 'gray'\| string |`-`|
|status|徽标的状态类型|'default' \| 'processing' \| 'success' \| 'warning' \| 'error' |`-`|
|count|徽标显示的数字|number \| ReactNode |`0`|
|className|节点类名|string \| string[] |`-`|
|dotClassName|徽标的类名|string \| string[] |`-`|
|dotStyle|徽标的样式|CSSProperties |`-`|
|offset|设置徽标位置的偏移|[number, number] |`-`|
|style|节点样式|CSSProperties |`-`|

## 常见问题

1. 如何在 `dot=true` 时设置不显示小红点？
  可以设置`count=0`。`count > 0` 的时候才会展示徽标。

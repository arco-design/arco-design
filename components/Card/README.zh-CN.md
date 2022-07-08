`````
组件 / 数据展示

# 卡片 Card

将信息分类后分标题、详情等区域聚合展现，一般作为简洁介绍或者信息的大盘和入口。
`````

%%Content%%

## API

### Card

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|CSSProperties |`-`|
|className|节点类名|string \| string[] |`-`|
|bordered|是否有边框|boolean |`true`|
|loading|是否为加载中|boolean |`-`|
|hoverable|是否可悬浮|boolean |`-`|
|size|卡片尺寸|'default' \| 'small' |`default`|
|title|卡片标题|string \| ReactNode |`-`|
|extra|卡片右上角的操作区域|string \| ReactNode |`-`|
|cover|卡片封面|ReactNode |`-`|
|actions|卡片底部的操作组|ReactNode[] |`-`|
|headerStyle|自定义标题区域样式|CSSProperties |`-`|
|bodyStyle|内容区域自定义样式|CSSProperties |`-`|

### Card.Meta

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|CSSProperties |`-`|
|className|节点类名|string \| string[] |`-`|
|avatar|头像|ReactNode |`-`|
|title|标题|string \| ReactNode |`-`|
|description|描述|string \| ReactNode |`-`|

### Card.Grid

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|CSSProperties |`-`|
|className|节点类名|string \| string[] |`-`|
|hoverable|是否可以悬浮|boolean |`-`|

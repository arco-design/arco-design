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
|bordered|是否有边框|boolean |`true`|
|hoverable|是否可悬浮|boolean |`-`|
|loading|是否为加载中|boolean |`-`|
|size|卡片尺寸|'default' \| 'small' |`default`|
|cover|卡片封面|ReactNode |`-`|
|extra|卡片右上角的操作区域|string \| ReactNode |`-`|
|title|卡片标题|string \| ReactNode |`-`|
|actions|卡片底部的操作组|ReactNode[] |`-`|
|bodyStyle|内容区域自定义样式|CSSProperties |`-`|
|className|节点类名|string \| string[] |`-`|
|headerStyle|自定义标题区域样式|CSSProperties |`-`|
|style|节点样式|CSSProperties |`-`|

### Card.Meta

|参数名|描述|类型|默认值|
|---|---|---|---|
|avatar|头像|ReactNode |`-`|
|description|描述|string \| ReactNode |`-`|
|title|标题|string \| ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Card.Grid

|参数名|描述|类型|默认值|
|---|---|---|---|
|hoverable|是否可以悬浮|boolean |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

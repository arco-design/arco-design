`````
组件 / 其他

# 锚点 Anchor

通过锚点可快速找到信息内容在当前页面的位置。
`````

%%Content%%

## API

### Anchor

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|affix|是否固定。当设置为 `true`时，锚点组件将会嵌套在[固钉](/react/components/affix) 组件内|boolean |`true`|-|
|animation|是否平滑滚动|boolean |`true`|-|
|hash|是否改变 hash，设置为 `false` 点击锚点不会改变页面 hash。|boolean |`true`|-|
|lineless|没有左侧轴线的样式。|boolean |`-`|-|
|offsetBottom|距离窗口底部达到指定偏移量后触发。 `Affix` 固钉组件的 `offsetBottom` 属性|number |`-`|-|
|offsetTop|距离窗口顶部达到指定偏移量后触发。即 `Affix` 固钉组件的 `offsetTop` 属性|number |`-`|-|
|targetOffset|容器中基准线的位置相对容器顶部的偏移量，在没有设置的时候，取值为滚动容器高度的一半。当锚点到达或离开基准线的时候会更新锚点的状态。|number |`-`|2.22.0|
|boundary|滚动边界值，设置该值为数字后，将会在距离滚动容器 boundary 距离时停止滚动。设置为 end, start, center，目标元素将会对应滚动到底部，顶部，中间位置。|number \| 'end' \| 'start' \| 'center' \| 'nearest' |`start`|-|
|direction|方向|'vertical' \| 'horizontal' |`vertical`|2.51.0|
|affixStyle|通过该属性可以设置 `Affix` 组件的样式|CSSProperties |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|scrollContainer|滚动容器。传入选择器或者dom元素。|string \| HTMLElement \| Window |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|onChange|滚动时锚点改变或点击锚点时触发|(newLink: string, oldLink: string) => void |`-`|-|
|onSelect|点击锚点时候触发|(newLink: string, oldLink: string) => void |`-`|-|

### Anchor.Link

|参数名|描述|类型|默认值|
|---|---|---|---|
|href|锚点链接|string |`#`|
|title|文本内容。可以是字符串或者自定义节点。|string \| ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

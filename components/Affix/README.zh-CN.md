`````
组件 / 其他

# 固钉 Affix

将页面元素钉在可视范围。当内容区域比较长，需要滚动页面时，固钉可以将内容固定在屏幕上。常用于侧边菜单和按钮组合。
`````

%%Content%%

## API

### Affix

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|offsetBottom|距离窗口底部达到指定偏移量后触发|number |`-`|-|
|offsetTop|距离窗口顶部达到指定偏移量后触发|number |`0`|-|
|affixClassName|给 `fixed` 的元素设置 className。|string \| string[] |`-`|2.8.0|
|affixStyle|给 `fixed` 的元素设置 style，注意不要设置 `position` `top` `width` `height`， 因为这几个属性是在元素 fixed 时候用于定位的。|CSSProperties |`-`|2.8.0|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|onChange|固定状态发生改变时触发|(affixed: boolean) => void |`-`|-|
|target|滚动容器|() => HTMLElement \| null \| Window |`() => window`|-|
|targetContainer|`target` 的外层滚动元素。`Affix` 将会监听该元素的滚动事件，并实时更新固钉的位置。主要是为了解决 `target` 属性指定为非 `window` 元素时，如果外层元素滚动，可能会导致固钉跑出容器问题。|() => HTMLElement \| null \| Window |`-`|-|

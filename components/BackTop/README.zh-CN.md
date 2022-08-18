`````
组件 / 其他

# 返回顶部 BackTop

可一键返回顶部的按钮。
`````

%%Content%%

## API

### BackTop

|参数名|描述|类型|默认值|
|---|---|---|---|
|duration|滚动到顶部的时间。|number |`400`|
|visibleHeight|当滚动到这个高度时，显示返回顶部按钮。|number |`400`|
|easing|滚动到顶部的缓动方式类型, 所有类型：[easing](https://github.com/PengJiyuan/b-tween)。|string |`quartOut`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onClick|点击返回顶部时的回调函数。|() => void |`-`|
|target|设置需要监听其滚动事件的元素，值为一个返回对应 `DOM` 元素的函数。|() => HTMLElement \| Window |`() => window`|

`````
组件 / 反馈

# 加载中 Spin

用于页面和区块的加载中状态 - 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
`````

%%Content%%

## API
### Spin

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|loading|是否为加载状态|`boolean`|`-`|-|
|size|加载动画的尺寸|`number`|`-`|-|
|icon|自定义图标，会自动旋转。|`ReactNode`|`-`|-|
|element|自定义元素，非图标，不附带旋转效果。可用于设置为 gif 图片等。|`ReactNode`|`-`|-|
|tip|加载的文案|`string \| ReactNode`|`-`|-|
|delay|延迟显示加载的时间 (ms)|`number`|`-`|-|
|dot|是否使用点类型的动画|`boolean`|`-`|-|
|block|是否为块级元素|`boolean`|`-`|2.29.0|

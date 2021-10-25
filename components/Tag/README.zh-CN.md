`````
组件 / 数据展示

# 标签 Tag

用于信息的选择、筛选、分类。用户通过标签进行信息反馈和交互操作。
`````

%%Content%%

## API

### Tag

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|color|设置标签背景颜色|`string`|`-`|
|size|标签尺寸|`'small' \| 'default' \| 'medium' \| 'large'`|`default`|
|visible|设置标签显示隐藏|`boolean`|`-`|
|closable|是否可关闭标签|`boolean`|`-`|
|checkable|是否支持选中|`boolean`|`-`|
|defaultChecked|是否默认选中|`boolean`|`-`|
|checked|是否选中（受控模式）|`boolean`|`-`|
|icon|设置图标|`ReactNode`|`-`|
|closeIcon|自定义关闭图标|`ReactNode`|`-`|
|onClose|关闭标签回调函数|`(e) => Promise<any> \| void`|`-`|
|onCheck|选中的回调|`(checked: boolean) => void`|`-`|

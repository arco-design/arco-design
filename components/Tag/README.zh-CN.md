`````
组件 / 数据展示

# 标签 Tag

用于信息的选择、筛选、分类。用户通过标签进行信息反馈和交互操作。
`````

%%Content%%

## API

### Tag

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|checkable|是否支持选中|boolean |`-`|-|
|checked|是否选中（受控模式）|boolean |`-`|-|
|closable|是否可关闭标签|boolean |`-`|-|
|defaultChecked|是否默认选中|boolean |`-`|-|
|visible|设置标签显示隐藏|boolean |`-`|-|
|color|设置标签背景颜色|string |`-`|-|
|size|标签尺寸|'small' \| 'default' \| 'medium' \| 'large' |`default`|-|
|closeIcon|自定义关闭图标|ReactNode |`-`|-|
|icon|设置图标|ReactNode |`-`|-|
|bordered|是否显示边框|Boolean |`-`|2.26.0|
|className|节点类名|string \| string[] |`-`|-|
|onClose|关闭标签回调函数|(e) =&gt; Promise&lt;any&gt; \| void |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|onCheck|选中的回调|(checked: boolean) => void |`-`|-|

`````
组件 / 导航

# 页头 PageHeader

页头位于页容器中，页容器顶部，起到了内容概览和引导页级操作的作用。包括由面包屑、标题等内容

`````

%%Content%%

## API

### PageHeader

|参数名|描述|类型|默认值|
|---|---|---|---|
|extra|展示额外内容|ReactNode |`-`|
|footer|底部内容|ReactNode |`-`|
|subTitle|次级标题|ReactNode |`-`|
|title|主标题|ReactNode |`-`|
|backIcon|返回图标，设置为 `false` 时会隐藏图标|ReactNode \| boolean |`-`|
|breadcrumb|面包屑，接受面包屑的所有属性, [BreadcrumbProps](/react/components/breadcrumb)|[BreadcrumbProps](breadcrumb#breadcrumb) |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onBack|点击返回图标的回调|(e: MouseEvent) => void |`-`|

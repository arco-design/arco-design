`````
组件 / 导航

# 分页 Pagination

采用分页控制单页内的信息数量，也可进行页面跳转。
`````

%%Content%%

## 属性/Props

### Pagination

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|pageItemStyle|分页按钮样式|`CSSProperties`|`-`|-|
|activePageItemStyle|被选中的分页按钮样式|`CSSProperties`|`-`|-|
|current|当前页|`number`|`-`|-|
|pageSize|每页数据条数|`number`|`-`|-|
|total|数据总数|`number`|`-`|-|
|defaultCurrent|当前页默认值|`number`|`-`|-|
|defaultPageSize|默认每页数据条数|`number`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|-|
|hideOnSinglePage|是否在只有一页的情况下隐藏|`boolean`|`-`|2.6.0|
|itemRender|定制分页按钮的结构|`(page: number,type: 'page' \| 'more' \| 'prev' \| 'next',originElement: ReactNode) => ReactNode`|`-`|-|
|size|分页器尺寸|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|showTotal|是否显示数据总数|`boolean \| ((total: number, range: number[]) => ReactNode)`|`-`|-|
|sizeCanChange|是否可以改变每页条数|`boolean`|`true`|-|
|sizeOptions|每页可以显示数据条数|`number[]`|`-`|-|
|onChange|变化时的回调|`(pageNumber: number, pageSize: number) => void`|`-`|-|
|onPageSizeChange|pageSize 变化时的回调|`(size: number, current: number) => void`|`-`|-|
|pageSizeChangeResetCurrent|`pageSize` 改变的时候重置当前页码为 `1`|`boolean`|`-`|-|
|simple|是否应用精简分页模式|`boolean`|`-`|-|
|showJumper|是否显示快速跳转到某页|`boolean`|`-`|-|
|showMore|是否显示更多页码提示（当尚无法计算数据总数时可以使用）|`boolean`|`-`|-|
|selectProps|用于配置弹出框的属性|`Partial<SelectProps>`|`-`|-|
|icons|设置分页器的图标|`{prev?: ReactNode;next?: ReactNode;more?: ReactNode;}`|`-`|-|

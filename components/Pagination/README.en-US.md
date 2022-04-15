`````
Component / Navigation

# Pagination

Use pagination to control the amount of information in a single page.
`````

%%Content%%

## API

### Pagination

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|pageItemStyle|Pagination button style|`CSSProperties`|`-`|-|
|activePageItemStyle|The style of the selected page button|`CSSProperties`|`-`|-|
|current|Current page|`number`|`-`|-|
|pageSize|Number of data items per page|`number`|`-`|-|
|total|Total number of data|`number`|`-`|-|
|defaultCurrent|To set default current page|`number`|`-`|-|
|defaultPageSize|To set default number of data per page|`number`|`-`|-|
|disabled|Whether to disable|`boolean`|`-`|-|
|hideOnSinglePage|Whether to hide when there is only one page|`boolean`|`-`|2.6.0|
|itemRender|Customized pagination button structure|`(page: number,type: 'page' \| 'more' \| 'prev' \| 'next',originElement: ReactNode) => ReactNode`|`-`|-|
|size|pager size|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|showTotal|Whether to display the total number of data|`boolean \| ((total: number, range: number[]) => ReactNode)`|`-`|-|
|sizeCanChange|Is it possible to change page size|`boolean`|`true`|-|
|sizeOptions|The number of data items that can be displayed per page|`number[]`|`-`|-|
|bufferSize|the number of pages between the `current` page and `...`|`number`|`2`|2.32.0|
|onChange|Callback when page changes|`(pageNumber: number, pageSize: number) => void`|`-`|-|
|onPageSizeChange|Callback when pageSize changes|`(size: number, current: number) => void`|`-`|-|
|pageSizeChangeResetCurrent|When pageSize changes, resets the current page number to `1`|`boolean`|`true`|-|
|simple|Whether to use simplified pagination mode|`boolean`|`-`|-|
|showJumper|Whether to display quick jump|`boolean`|`-`|-|
|showMore|Whether to show more page number tips (can be used when the total number of data cannot be calculated yet)|`boolean`|`-`|-|
|selectProps|Props of the `Select`|`Partial<SelectProps>`|`-`|-|
|icons|Set icon of the pager|`{prev?: ReactNode;next?: ReactNode;more?: ReactNode;}`|`-`|-|

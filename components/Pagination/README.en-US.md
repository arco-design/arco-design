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
|disabled|Whether to disable|boolean |`-`|-|
|hideOnSinglePage|Whether to hide when there is only one page|boolean |`-`|2.6.0|
|pageSizeChangeResetCurrent|When pageSize changes, resets the current page number to `1`|boolean |`true`|-|
|showJumper|Whether to display quick jump. Defaults to true in `simple` mode|boolean |`-`|-|
|showMore|Whether to show more page number tips (can be used when the total number of data cannot be calculated yet)|boolean |`-`|-|
|simple|Whether to use simplified pagination mode|boolean |`-`|-|
|sizeCanChange|Is it possible to change page size|boolean |`-`|-|
|bufferSize|the number of pages between the `current` page and `...`|number |`2`|2.32.0|
|current|Current page|number |`-`|-|
|defaultCurrent|To set default current page|number |`-`|-|
|defaultPageSize|To set default number of data per page|number |`-`|-|
|pageSize|Number of data items per page|number |`-`|-|
|total|Total number of data|number |`-`|-|
|itemRender|Customized pagination button structure|(page: number,type: 'page' \| 'more' \| 'prev' \| 'next',originElement: ReactNode) => ReactNode |`-`|-|
|size|pager size|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|activePageItemStyle|The style of the selected page button|CSSProperties |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|icons|Set icon of the pager|{prev?: ReactNode;next?: ReactNode;more?: ReactNode;} |`-`|-|
|pageItemStyle|Pagination button style|CSSProperties |`-`|-|
|selectProps|Props of the `Select`|Partial&lt;[SelectProps](select#select)&gt; |`-`|-|
|sizeOptions|The number of data items that can be displayed per page|number[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|onChange|Callback when page changes|(pageNumber: number, pageSize: number) => void |`-`|-|
|onPageSizeChange|Callback when pageSize changes|(size: number, current: number) => void |`-`|-|
|showTotal|Whether to display the total number of data|boolean \| ((total: number, range: number[]) => ReactNode) |`-`|-|

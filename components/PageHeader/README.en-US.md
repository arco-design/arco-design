`````
Component / Navigation

# PageHeader

A header with common actions and design elements built in.
`````

%%Content%%

## API

### PageHeader

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|
|title|The title element|`ReactNode`|`-`|
|subTitle|The subtitle element|`ReactNode`|`-`|
|breadcrumb|The props of [Breadcrumb](/react/components/breadcrumb) component|`BreadcrumbProps`|`-`|
|backIcon|Customize back icon, if false The back icon will not be displayed|`ReactNode \| boolean`|`-`|
|extra|Customize the extra content. The extra element will be rendered to the end of the title line|`ReactNode`|`-`|
|footer|The footer element|`ReactNode`|`-`|
|onBack|Callback when click the back icon|`(e: MouseEvent) => void`|`-`|

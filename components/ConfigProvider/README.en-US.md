`````
Component / Other

# ConfigProvider

Configure in the outermost layer of the application to set global params.
`````

%%Content%%

## API

### ConfigProvider

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|autoInsertSpaceInButton|When there are two Chinese characters in the button, a space is automatically added between two Chinese characters.|`boolean`|`-`|2.3.0|
|componentConfig|Default parameters for global configuration of all components|`ComponentConfig`|`-`|2.23.0|
|locale|Language package setting|`Locale`|`-`|-|
|theme|Theme Configuration|`ThemeConfig`|`-`|-|
|size|Configure the default size of the component, which will only take effect for components that support the `size` property.|`'mini' \| 'small' \| 'default' \| 'large'`|`default`|-|
|prefixCls|Global ClassName prefix|`string`|`arco`|-|
|getPopupContainer|The parent node of the global popup.|`(node: HTMLElement) => Element`|`() => document.body`|-|
|loadingElement|Global loading icon.|`ReactNode`|`-`|-|
|tablePagination|Table Global pagination configuration.|`PaginationProps`|`-`|2.6.0|
|renderEmpty|Empty component in component.|`(componentName?: string) => ReactNode`|`-`|2.10.0|
|focusLock|global `focusLock`, affects component `Modal` `Drawer`.|`{modal?: boolean \| { autoFocus?: boolean };drawer?: boolean \| { autoFocus?: boolean };}`|`{ modal: { autoFocus: true }, drawer: { autoFocus: true }}`|2.13.0|

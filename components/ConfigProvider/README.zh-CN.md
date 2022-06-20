`````
组件 / 其他

# 全局配置 ConfigProvider

在应用的最外层进行配置，一次设置，全局生效。一般用于设置国际化语言等功能。
`````

%%Content%%

## API

### ConfigProvider

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|autoInsertSpaceInButton|当按钮中是两个汉字时，自动在两个汉字中添加一个空格。|`boolean`|`-`|2.3.0|
|componentConfig|用于全局配置所有组件的默认参数|`ComponentConfig`|`-`|2.23.0|
|locale|设置语言包|`Locale`|`-`|-|
|theme|主题配置|`ThemeConfig`|`-`|-|
|size|配置组件的默认尺寸，只会对支持`size`属性的组件生效。|`'mini' \| 'small' \| 'default' \| 'large'`|`default`|-|
|prefixCls|全局组件类名前缀|`string`|`arco`|-|
|getPopupContainer|全局弹出框挂载的父级节点。|`(node: HTMLElement) => Element`|`() => document.body`|-|
|loadingElement|全局的加载中图标，作用于所有组件。|`ReactNode`|`-`|-|
|tablePagination|Table 全局的分页配置。|`PaginationProps`|`-`|2.6.0|
|renderEmpty|全局配置组件内的空组件。|`(componentName?: string) => ReactNode`|`-`|2.10.0|
|focusLock|全局配置弹出框的 `focusLock`，作用于 `Modal` `Drawer` 组件。|`{modal?: boolean \| { autoFocus?: boolean };drawer?: boolean \| { autoFocus?: boolean };}`|`{ modal: { autoFocus: true }, drawer: { autoFocus: true }}`|2.13.0|
|rtl|视图的表现形式是从右开始向左结束。|`boolean`|`-`|2.36.0|

`````
组件 / 数据输入

# 自动补全 AutoComplete

输入框或自定义输入控件的自动补全功能。
`````

%%Content%%

## API

### AutoComplete

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|-|
|children|自定义输入框/数据源|`React.ReactNode`|`-`|-|
|allowClear|是否允许一键清除|`boolean`|`-`|-|
|data|自动完成的数据源|`(string \| { value: string; name: string; [key: string]: any } \| React.ReactNode)[]`|`-`|-|
|placeholder|输入框提示|`string`|`-`|-|
|defaultValue|自动补全组件的默认值|`string`|`-`|-|
|value|自动补全组件的值（受控模式）|`string`|`-`|-|
|error|报错状态|`boolean`|`-`|-|
|strict|`strict: true` 的时候大小写敏感|`boolean`|`-`|-|
|loading|是否处于加载状态。|`boolean`|`-`|2.10.0|
|triggerElement|自定义触发元素|`ReactElement \| (({ value }) => ReactElement)`|`<Input />`|`() => ReactElement` in 2.31.0|
|onSearch|搜索补全时的回调|`(value: string) => void`|`-`|-|
|onSelect|点击补全项时的回调|`(value: string, option: OptionInfo) => void`|`-`|-|
|onChange|输入或者点击补全项，value 改变时的回调（仅在点击补全项时存在第二个参数）|`(value: string, option?: OptionInfo) => void`|`-`|-|
|onPressEnter|按下回车键的回调|`(event, activeOption?: OptionInfo) => void`|`-`|`activeOption` in 2.25.1|
|onFocus|聚焦时的回调|`(event) => void`|`-`|-|
|onBlur|失去焦点的回调|`(event) => void`|`-`|-|
|virtualListProps|传递虚拟滚动属性。|`AvailableVirtualListProps`|`-`|2.2.0|
|inputProps|传递 Input 组件的属性。|`Partial<InputProps>`|`-`|2.10.0|
|filterOption|是否根据输入的值筛选数据。如果传入函数的话，接收 `inputValue` 和 `option` 两个参数，当option符合筛选条件时，返回 `true`，反之返回 `false`。|`boolean \| ((inputValue: string, option: ReactElement) => boolean)`|`true`|-|
|dropdownRender|自定义弹出内容。|`(menu: ReactNode) => ReactNode`|`-`|-|
|triggerProps|可以接受所有 `Trigger` 的 `Props`|`Partial<TriggerProps>`|`-`|-|
|getPopupContainer|弹出框挂载的父节点。|`(node: HTMLElement) => Element`|`-`|-|
|defaultActiveFirstOption|是否默认高亮第一个选项|`boolean`|`true`|-|

### AutoComplete.Option

同 `Select.Option`, 参考 [Select 文档](/react/components/select) 。

### AutoComplete.OptGroup

同 `Select.OptGroup`, 参考 [Select 文档](/react/components/select) 。

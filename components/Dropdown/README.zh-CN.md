`````
组件 / 导航

# 下拉菜单 Dropdown

页面上的命令过多时，可将备选命令收纳到向下展开的浮层容器中。
`````

%%Content%%

## API

### Dropdown

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|defaultPopupVisible|控制下拉框是否默认打开|boolean |`-`|-|
|disabled|是否禁用弹出|boolean |`-`|2.16.0|
|popupVisible|控制下拉框是否打开（受控模式）|boolean |`-`|-|
|unmountOnExit|隐藏后是否销毁 DOM 结构|boolean |`true`|-|
|position|下拉框的弹出位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`bl`|-|
|trigger|触发下拉框弹出的方式|[TriggerProps](trigger#trigger)['trigger'] |`hover`|-|
|droplist|下拉框的内容|ReactNode |`-`|-|
|triggerProps|弹出框下可接受所有 `Trigger` 组件的 `Props`|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|getPopupContainer|弹出框挂在的父级节点|(node: HTMLElement) => Element |`-`|-|
|onVisibleChange|弹出框打开/关闭时会触发|(visible: boolean) => void |`-`|-|

### Dropdown.Button

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|defaultPopupVisible|控制下拉框是否默认打开|boolean |`-`|-|
|disabled|是否禁用弹出|boolean |`-`|2.16.0|
|popupVisible|控制下拉框是否打开（受控模式）|boolean |`-`|-|
|unmountOnExit|隐藏后是否销毁 DOM 结构|boolean |`true`|-|
|position|下拉框的弹出位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`br`|-|
|size|等同于 `Button` 的 size|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|trigger|触发下拉框弹出的方式|[TriggerProps](trigger#trigger)['trigger'] |`hover`|-|
|type|等同于 `Button` 的 type|'default' \| 'primary' \| 'secondary' \| 'dashed' \| 'outline' \| 'text' |`default`|-|
|droplist|下拉框的内容|ReactNode |`-`|-|
|icon|右侧显示内容，可以是 icon 或者任意 dom 元素|ReactNode |`<IconMore />`|-|
|buttonProps|接收 button 按钮的所有 Props，应用于左侧按钮|ButtonProps |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|弹出框下可接受所有 `Trigger` 组件的 `Props`|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|buttonsRender|自定义两个按钮的渲染|(buttons: ReactNode[]) => ReactNode[] |`-`|-|
|getPopupContainer|弹出框挂在的父级节点|(node: HTMLElement) => Element |`-`|-|
|onClick|左侧按钮的点击事件|(e: Event) => void |`-`|-|
|onVisibleChange|弹出框打开/关闭时会触发|(visible: boolean) => void |`-`|-|

`````
Component / Navigation

# Dropdown

When there are too many commands, the alternative commands can be stored in the floating container that expands downward.
`````

%%Content%%

## API

### Dropdown

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|droplist|Content of dropdown list|`ReactNode`|`-`|-|
|position|Position of dropdown list|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`bl`|-|
|trigger|Types of events that cause the popup to show|`TriggerProps['trigger']`|`hover`|-|
|disabled|Whether to disable popup|`boolean`|`-`|2.16.0|
|unmountOnExit|Whether to umount the node on hiding|`boolean`|`true`|-|
|defaultPopupVisible|Whether the dropdown list is visible by default|`boolean`|`-`|-|
|popupVisible|Whether the dropdown list is visible (Controlled)|`boolean`|`-`|-|
|triggerProps|Pass all `Trigger` component properties|`Partial<TriggerProps>`|`-`|-|
|onVisibleChange|Callback when visibility changes|`(visible: boolean) => void`|`-`|-|
|getPopupContainer|To set the container of the dropdown menu|`(node: HTMLElement) => Element`|`-`|-|

### Dropdown.Button

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|disabled|Whether the dropdown menu is disabled|`boolean`|`-`|2.6.0|
|size|Same as `size` of ButtonProps|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|type|Same as `type` of ButtonProps|`'default' \| 'primary' \| 'secondary' \| 'dashed' \| 'outline' \| 'text'`|`default`|-|
|buttonProps|Pass Button's properties to the button on the left|`ButtonProps`|`-`|-|
|droplist|Content of the dropdown list|`ReactNode`|`-`|-|
|position|Position of the dropdown list|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`br`|-|
|trigger|Types of events that cause the popup to show|`TriggerProps['trigger']`|`hover`|-|
|icon|Custom icon on the right|`ReactNode`|`<IconMore />`|-|
|unmountOnExit|Whether to umount the node on hiding|`boolean`|`true`|-|
|buttonsRender|Custom buttons inside Dropdown.Button|`(buttons: ReactNode[]) => ReactNode[]`|`-`|-|
|onClick|Callback when button on the left is clicked|`(e: Event) => void`|`-`|-|
|onVisibleChange|Callback when visibility changes|`(visible: boolean) => void`|`-`|-|

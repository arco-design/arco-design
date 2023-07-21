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
|defaultPopupVisible|Whether the dropdown list is visible by default|boolean |`-`|-|
|disabled|Whether to disable popup|boolean |`-`|2.16.0|
|popupVisible|Whether the dropdown list is visible (Controlled)|boolean |`-`|-|
|unmountOnExit|Whether to umount the node on hiding|boolean |`true`|-|
|position|Position of dropdown list|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`bl`|-|
|trigger|Types of events that cause the popup to show|[TriggerProps](trigger#trigger)['trigger'] |`hover`|-|
|droplist|Content of dropdown list|ReactNode |`-`|-|
|triggerProps|Pass all `Trigger` component properties|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|getPopupContainer|To set the container of the dropdown menu|(node: HTMLElement) => Element |`-`|-|
|onVisibleChange|Callback when visibility changes|(visible: boolean) => void |`-`|-|

### Dropdown.Button

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|defaultPopupVisible|Whether the dropdown list is visible by default|boolean |`-`|-|
|disabled|Whether to disable popup|boolean |`-`|2.16.0|
|popupVisible|Whether the dropdown list is visible (Controlled)|boolean |`-`|-|
|unmountOnExit|Whether to umount the node on hiding|boolean |`true`|-|
|position|Position of the dropdown list|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`br`|-|
|size|Same as `size` of ButtonProps|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|trigger|Types of events that cause the popup to show|[TriggerProps](trigger#trigger)['trigger'] |`hover`|-|
|type|Same as `type` of ButtonProps|'default' \| 'primary' \| 'secondary' \| 'dashed' \| 'outline' \| 'text' |`default`|-|
|droplist|Content of dropdown list|ReactNode |`-`|-|
|icon|Custom icon on the right|ReactNode |`<IconMore />`|-|
|buttonProps|Pass Button's properties to the button on the left|ButtonProps |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|triggerProps|Pass all `Trigger` component properties|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|buttonsRender|Custom buttons inside Dropdown.Button|(buttons: ReactNode[]) => ReactNode[] |`-`|-|
|getPopupContainer|To set the container of the dropdown menu|(node: HTMLElement) => Element |`-`|-|
|onClick|Callback when button on the left is clicked|(e: Event) => void |`-`|-|
|onVisibleChange|Callback when visibility changes|(visible: boolean) => void |`-`|-|

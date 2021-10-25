`````
Component / Data Display

# Avatar

Used as an avatar, it can be displayed in the form of pictures, icons or characters.
`````

%%Content%%

## API

### Avatar

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|shape|The shape of the avatar. Two shapes are available: `circle` and `square`|`'circle' \| 'square'`|`circle`|
|size|The size of the avatar in `px`|`number`|`-`|
|autoFixFontSize|Whether to automatically adjust the font size according to the size of the avatar.|`boolean`|`true`|
|triggerIcon|Clickable avatar interaction icon.|`ReactNode`|`-`|
|triggerIconStyle|Interactive icon style|`CSSProperties`|`-`|
|triggerType|Clickable avatar interaction type.|`'mask' \| 'button'`|`button`|
|onClick|Callback when avatar is clicked|`(e) => void`|`-`|

### Avatar.Group

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|shape|The shape of the avatar, (priority is higher than the Avatar component itself)|`'circle' \| 'square'`|`circle`|-|
|size|The size of the avatar in `px`, (the priority is higher than the Avatar component itself)|`number`|`-`|-|
|autoFixFontSize|Whether to automatically adjust the font size according to the size of the avatar (the priority is higher than the Avatar component itself)|`boolean`|`autoFixFontSize`|-|
|zIndexAscend|Whether `z-index` of the avatars in group are in ascending order. The default is in descending order.|`boolean`|`-`|2.3.0|
|maxCount|The maximum number of avatars displayed in the avatar group. The rest of avatars will be displayed as a `+x`.|`number`|`-`|2.4.0|
|maxStyle|Style for `+x`.|`CSSProperties`|`-`|2.4.0|
|maxPopoverTriggerProps|`TriggerProps` for popover around `+x`.|`TriggerProps`|`-`|2.4.0|

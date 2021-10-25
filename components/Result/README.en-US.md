`````
Component / Feedback

# Result

Used to feed back the results of a series of operational tasks.
`````

%%Content%%

## API

### Result

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|
|title|The title|`ReactNode`|`-`|
|subTitle|The subTitle|`ReactNode`|`-`|
|status|The result status, if `null` the icon and the background color will not be displayed. [example](/react/en-US/components/result#custom-icon)|`'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500' \| null`|`info`|
|icon|Customize the icon|`ReactNode`|`-`|
|extra|The operating area|`ReactNode`|`-`|

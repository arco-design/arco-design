`````
Component / Data Entry

# InputTag

An input box which will display your input as tags.
`````

%%Content%%

## API

### InputTag

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|className|Additional css class|`string \| string[]`|`-`|-|
|style|Additional style|`CSSProperties`|`-`|-|
|size|Different sizes|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|placeholder|Placeholder of input element|`string`|`-`|-|
|error|Error style|`boolean`|`-`|-|
|disabled|Whether the input is disabled|`boolean`|`-`|-|
|autoFocus|Whether the input is focused by default|`boolean`|`-`|-|
|readOnly|Whether the input is read only|`boolean`|`-`|-|
|allowClear|Whether to allow clear input value|`boolean`|`-`|-|
|animation|Whether to add animation for internal label changes|`boolean`|`true`|2.15.0|
|saveOnBlur|Whether to automatically store the text entering when blur InputTag|`boolean`|`-`|2.25.0|
|defaultValue|To set default value|`T[]`|`-`|-|
|value|To set value|`T[]`|`-`|-|
|inputValue|To set input value|`string`|`-`|-|
|labelInValue|If true, the incoming and callback values will be `{label: '', value: '')` format|`boolean`|`-`|-|
|dragToSort|Weather it is possible to sort tags by drag|`boolean`|`-`|2.27.0|
|suffix|The suffix for the InputTag|`React.ReactNode`|`-`|-|
|icon|Custom icons|`{ removeIcon?: ReactNode; clearIcon?: ReactNode }`|`-`|-|
|validate|Function to check user's input, which is triggered when `Enter` is pressed|`(inputValue: string, values: T[]) => boolean \| Promise<boolean>`|`(inputValue, values) => inputValue && values.every((item) => item !== inputValue)`|-|
|renderTag|Custom tag rendering, `props` is the current tag attribute, `index` is the order of the current tag, `values` is the value of all tags|`(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: ObjectValueType[]) => React.ReactNode`|`-`|index、values added in 2.15.0|
|onRemove|Callback when a tag is removed|`(value: T, index: number, event) => void`|`-`|-|
|onChange|Callback when value changes|`(value: T[], reason: ValueChangeReason) => void`|`-`|`reason` in 2.27.0|
|onBlur|Callback when input is blurred|`(e) => void`|`-`|-|
|onFocus|Callback when input is focused|`(e) => void`|`-`|-|
|onPressEnter|Callback when `Enter` key is pressed|`(e) => void`|`-`|-|
|onInputChange|Callback when the value of input changes|`(inputValue: string, event?) => void`|`-`|-|
|onKeyDown|Callback when the keyboard is pressed|`(e) => void`|`-`|-|
|onPaste|Callback when you paste text in input box|`(e) => void`|`-`|-|
|onClear|Callback when clear button is clicked|`() => void`|`-`|2.20.0|
|onClick|Callback when the component is clicked|`(e) => void`|`-`|-|

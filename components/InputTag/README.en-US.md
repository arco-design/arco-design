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
|allowClear|Whether to allow clear input value|boolean |`-`|-|
|animation|Whether to add animation for internal label changes|boolean |`true`|2.15.0|
|autoFocus|Whether the input is focused by default|boolean |`-`|-|
|disabled|Whether the input is disabled|boolean |`-`|-|
|dragToSort|Weather it is possible to sort tags by drag|boolean |`-`|2.27.0|
|error|Error style|boolean |`-`|-|
|labelInValue|If true, the incoming and callback values will be `{label: '', value: '')` format|boolean |`-`|-|
|readOnly|Whether the input is read only|boolean |`-`|-|
|saveOnBlur|Whether to automatically store the text entering when blur InputTag|boolean |`-`|2.25.0|
|inputValue|To set input value|string |`-`|-|
|placeholder|Placeholder of input element|string |`-`|-|
|size|Different sizes|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|suffix|The suffix for the InputTag|ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultValue|To set default value|T[] |`-`|-|
|icon|Custom icons|{ removeIcon?: ReactNode; clearIcon?: ReactNode } |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|tokenSeparators|Separator used to tokenize|string[] |`-`|2.44.0|
|validate|Function to check user's input, which is triggered when `Enter` is pressed|(inputValue: string, values: T[]) =&gt; boolean \| Promise&lt;boolean&gt; \| T \| Promise&lt;T&gt; |`(inputValue, values) => inputValue && values.every((item) => item !== inputValue)`|return type T and `Promise<T>` in 2.37.0|
|value|To set value|T[] |`-`|-|
|onBlur|Callback when input is blurred|(e) => void |`-`|-|
|onChange|Callback when value changes|(value: T[], reason: [ValueChangeReason](#valuechangereason)) => void |`-`|`reason` in 2.27.0|
|onClear|Callback when clear button is clicked|() => void |`-`|2.20.0|
|onClick|Callback when the component is clicked|(e) => void |`-`|-|
|onFocus|Callback when input is focused|(e) => void |`-`|-|
|onInputChange|Callback when the value of input changes|(inputValue: string, event?) => void |`-`|-|
|onKeyDown|Callback when the keyboard is pressed|(e) => void |`-`|-|
|onPaste|Callback when you paste text in input box|(e) => void |`-`|-|
|onPressEnter|Callback when `Enter` key is pressed|(e) => void |`-`|-|
|onRemove|Callback when a tag is removed|(value: T, index: number, event) => void |`-`|-|
|renderTag|Custom tag rendering, `props` is the current tag attribute, `index` is the order of the current tag, `values` is the value of all tags|(props: {value: any;label: ReactNode;closable: boolean;onClose: (event) => void;},index: number,values: [ObjectValueType](#objectvaluetype)[]) => ReactNode |`-`|index、values added in 2.15.0|

### ObjectValueType

```js
export type ObjectValueType = {
  value?: any;
  label?: ReactNode;
  closable?: boolean;
};
```

### ValueChangeReason

```js
export type ValueChangeReason = "add" | "remove" | "clear" | "sort";
```

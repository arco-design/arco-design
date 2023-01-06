`````
Component / Data Entry

# Checkbox

In a set of data, the user can select one or more items through the Checkbox.
`````

%%Content%%

## API

### Checkbox

`T = string | number`

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|checked|Whether the checkbox is checked|boolean |`-`|-|
|defaultChecked|To set default checked|boolean |`-`|-|
|disabled|Whether to disable|boolean |`-`|-|
|error|Whether to show in error style|boolean |`-`|-|
|indeterminate|The indeterminate state of checkbox|boolean |`-`|-|
|icon|Custom IconCheck|ReactNode |`-`|2.43.0|
|className|Additional css class|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|value|To set checkbox value|T |`-`|-|
|onChange|Callback when the state changes|(checked: boolean, e: Event) => void |`-`|-|

### Checkbox.Group

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|disabled|Whether to disable all checkboxes in the group|boolean |`-`|
|direction|Arrangement direction|'horizontal' \| 'vertical' |`horizontal`|
|className|Additional css class|string \| string[] |`-`|
|defaultValue|Initial selected value|T[] |`-`|
|options|Specifies options|(T \| { label: ReactNode; value: T; disabled?: boolean; icon?: ReactNode })[] |`-`|
|style|Additional style|CSSProperties |`-`|
|value|To set value|T[] |`-`|
|onChange|Callback when the state changes|(value: T[], e: Event) => void |`-`|

### `Checkbox.useCheckbox`

```js
/** T = string | number */
const result: ResultType = Checkbox.useCheckbox<T>(values: T[], defaultSelected?: T[]);
```

**ResultType**

|Property|Description|Type|
|---|:---:|:---:|
| selected | Currently selected items | `T[]` |
| setSelected | Only select the incoming options | `(value: T[]) => void;` |
| setValueSelected | Set the checked state of the Checkbox, the second param is the state to be set. | `(value: T \| T[], selected?: boolean) => void;` |
| selectAll | Selected all checkboxes | `() => void;` |
| unSelectAll | Unselected all checkboxes | `() => void;` |
| isSelected | Whether the option is selected | `(value: T) => boolean;` |
| toggle | Toggle checked state. When no params, the checked state of all options will be switched | `(value?: T \| T[]) => void;` |
| isAllSelected | Whether all options are selected | `() => boolean;` |
| isPartialSelected | Whether only some options are selected | `() => boolean;` |


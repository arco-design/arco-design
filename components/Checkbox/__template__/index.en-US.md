---
file: interface
---

`````
Component / Data Entry

# Checkbox

In a set of data, the user can select one or more items through the Checkbox.
`````

%%Content%%

## API

%%Props%%

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


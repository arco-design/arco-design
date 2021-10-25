---
file: interface
---

`````
组件 / 数据输入

# 复选框 Checkbox

在一组数据中，用户可通过复选框选择一个或多个数据。
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

|参数名|描述|类型|
|---|:---:|:---:|
| selected | 当前选中项 | `T[]` |
| setSelected | 只选中传入参数的选项 | `(value: T[]) => void;` |
| setValueSelected | 设置选项的选中状态，第二个参数为要设置的选中状态。 | `(value: T \| T[], selected?: boolean) => void;` |
| selectAll | 选中全部 | `() => void;` |
| unSelectAll | 取消全部选中 | `() => void;` |
| isSelected | 是否选项被选中 | `(value: T) => boolean;` |
| toggle | 切换选项选中状态。不传参数时，会切换所有选项的选中状态 | `(value?: T \| T[]) => void;` |
| isAllSelected | 是否全部选项被选中 | `() => boolean;` |
| isPartialSelected | 是否只有部分选项选中 | `() => boolean;` |

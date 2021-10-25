---
file: interface
---

`````
组件 / 数据输入

# 级联选择 Cascader

指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔。
`````

%%Content%%

## 属性/Props

%%Props%%


## 方法

| 参数名 |     描述     |    类型    | 默认值 |
| ------ | :----------: | :--------: | -----: |
| focus  |   焦点事件。   | `Function` |    `-` |
| blur   | 失去焦点事件。 | `Function` |    `-` |

**示例**

```js
<Cascader ref={(ref) => (this.select = ref)} />;

this.select.focus();
this.select.blur();
```

### `OptionProps`

```
interface OptionProps {
  value?: string;
  label?: string;
  disabled?: boolean;
  children?: OptionProps[];
  isLeaf?: boolean;
}
```

### `FieldNamesType`

```
type FieldNamesType = {
  /** 指定 label 在选项中对应的字段  */
  label?: string;
  /** 指定 value 在选项中对应的字段  */
  value?: string;
  /** 指定 children 在选项中对应的字段  */
  children?: string;
  /** 指定 disabled 在选项中对应的字段  */
  disabled?: string;
  /** 指定 isLeaf 在选项中对应的字段  */
  isLeaf?: string;
}
```

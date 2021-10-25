---
file: interface
---

`````
Component / Data Entry

# Cascader

Display options in a multi-level cascading dropdown component.
`````

%%Content%%

## API

%%Props%%

## Methods

| Name |     Description     |    Type    | Default Value |
| ------ | :----------: | :--------: | -----: |
| focus  |   Get focus   | `Function` |    `-` |
| blur   | Remove focus | `Function` |    `-` |

**Demo**

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
  /** Custom field name for  label   */
  label?: string;
  /** Custom field name for value  */
  value?: string;
  /** Custom field name for children  */
  children?: string;
  /** Custom field name for disabled  */
  disabled?: string;
  /** Custom field name for isLeaf  */
  isLeaf?: string;
}
```

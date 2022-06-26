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

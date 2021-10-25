---
file: interface
---

`````
Component / Data Entry

# Input

The basic form components have been expanded on the basis of native controls and can be used in combination.
`````

%%Content%%

## API

%%Props%%

## Method

|Property|Description|Type|Default|
| ------ | :----------: | :--------: | -----: |
| focus  |   Get focus   | `Function` |    `-` |
| blur   | Remove focus | `Function` |    `-` |

**Demo**

```js
<Input ref={(ref) => (this.input = ref)} />;

this.input.focus();
this.input.blur();
```

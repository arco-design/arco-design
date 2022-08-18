`````
component / Layout

# Space

Set the spacing between components.
`````

%%Content%%

## API

### Space

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|wrap|Whether to wrap line automatic|boolean |`-`|-|
|align|Alignment of items|'start' \| 'end' \| 'center' \| 'baseline' |`-`|-|
|direction|The space direction|'vertical' \| 'horizontal' |`horizontal`|-|
|split|Set separator|ReactNode |`-`|2.22.0|
|className|Additional css class|string \| string[] |`-`|-|
|size|The space size. ( Array format add in `2.15.0` )|[SpaceSize](#spacesize) \| [SpaceSize](#spacesize)[] |`small`|-|
|style|Additional style|CSSProperties |`-`|-|

### SpaceSize

```js
export type SpaceSize = "mini" | "small" | "medium" | "large" | number;
```

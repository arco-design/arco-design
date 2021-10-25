`````
Component / Data Display

# Card

Card is generally used as a container for concise introduction or information.
`````

%%Content%%

## API

### Card

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|bordered|Whether to render the border|`boolean`|`true`|
|loading|Whether on loading state|`boolean`|`-`|
|hoverable|Whether the card can be hovered|`boolean`|`-`|
|size|Size of the card|`'default' \| 'small'`|`default`|
|title|Title of the card|`string \| ReactNode`|`-`|
|extra|Content to render in the top-right corner of the card|`string \| ReactNode`|`-`|
|cover|Cover of card|`ReactNode`|`-`|
|actions|The action list which shows at the bottom of the card|`ReactNode[]`|`-`|
|headerStyle|The additional css style to apply to card head|`CSSProperties`|`-`|
|bodyStyle|The additional css style to apply to card content|`CSSProperties`|`-`|

### Card.Meta

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|avatar|Avatar of the card|`ReactNode`|`-`|
|title|Title of the card|`string \| ReactNode`|`-`|
|description|Description of the card|`string \| ReactNode`|`-`|

### Card.Grid

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|hoverable|Whether can be hovered|`boolean`|`-`|

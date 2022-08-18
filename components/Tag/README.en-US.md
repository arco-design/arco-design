`````
Component / Data Display

# Tag

Used for information selection, screening and classification. Users use tags for information feedback and interactive operations.
`````

%%Content%%

## API

### Tag

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|checkable|Whether the Tag is checkable|boolean |`-`|-|
|checked|Used for setting the currently selected value(Controlled Component)|boolean |`-`|-|
|closable|Whether the Tag is closable|boolean |`-`|-|
|defaultChecked|Initial checked state|boolean |`-`|-|
|visible|Whether the Tag is visible|boolean |`-`|-|
|color|The background color of Tag|string |`-`|-|
|size|The size of Tag|'small' \| 'default' \| 'medium' \| 'large' |`default`|-|
|closeIcon|Custom Close Icon|ReactNode |`-`|-|
|icon|Set icon|ReactNode |`-`|-|
|bordered|Whether the tag is bordered|Boolean |`-`|2.26.0|
|className|Additional css class|string \| string[] |`-`|-|
|onClose|Callback when the tag closed|(e) =&gt; Promise&lt;any&gt; \| void |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|onCheck|Callback when checked the tag|(checked: boolean) => void |`-`|-|

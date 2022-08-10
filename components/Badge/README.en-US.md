`````
Component / Data Display

# Badge

Badge normally appears in the upper right corner of the icon or text to prompt important information.
`````

%%Content%%

## API

### Badge

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|dot|Whether to display a red dot instead of `count`|boolean |`-`|
|maxCount|Max count to show. If count is larger than this value, it will be displayed as `${maxCount}+`|number |`99`|
|text|Set the display text of the status dot|string |`-`|
|color|Customize dot color|\| 'red'\| 'orangered'\| 'orange'\| 'gold'\| 'lime'\| 'green'\| 'cyan'\| 'arcoblue'\| 'purple'\| 'pinkpurple'\| 'magenta'\| 'gray'\| string |`-`|
|status|Set badge as a status dot|'default' \| 'processing' \| 'success' \| 'warning' \| 'error' |`-`|
|count|Number to show in badge|number \| ReactNode |`0`|
|className|Additional css class|string \| string[] |`-`|
|dotClassName|Customize Badge dot className|string \| string[] |`-`|
|dotStyle|Customize Badge dot style|CSSProperties |`-`|
|offset|Set offset of the badge dot|[number, number] |`-`|
|style|Additional style|CSSProperties |`-`|

## Questions

1. How to hide the red dot when `dot=true`?
   You can set `count=0`. The logo will be displayed only when `count> 0`.

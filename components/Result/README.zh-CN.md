`````
组件 / 反馈

# 结果 Result

用于反馈一系列操作任务的处理结果，当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。
`````

%%Content%%

## API

### Result

|参数名|描述|类型|默认值|
|---|---|---|---|
|status|不同状态，传入 null 时，需要通过 `icon` 属性设置图标，并且默认没有背景色以及图标颜色|'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500' \| null |`info`|
|extra|额外内容|ReactNode |`-`|
|icon|自定义图标|ReactNode |`-`|
|subTitle|子标题文字|ReactNode |`-`|
|title|标题文字|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

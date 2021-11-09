`````
组件 / 反馈

# 进度条 Progress

给予用户当前系统执行中任务运行状态的反馈，多用于运行一段时间的场景，有效减轻用户在等待中产生的焦虑感。
`````

%%Content%%

## API

### Progress

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|type|进度条类型|`'line' \| 'circle'`|`line`|-|
|steps|显示步骤进度条|`number`|`-`|2.10.0|
|animation|动画效果，仅在 `type=line` 时可用|`boolean`|`-`|-|
|status|进度条状态|`'success' \| 'error' \| 'normal' \| 'warning'`|`-`|2.16.0|
|color|进度条颜色，优先级高于 `status`。传入对象时，会显示渐变色进度条。|`string \| { [key: string]: string }`|`-`|2.10.0|
|trailColor|剩余进度条颜色。|`string`|`-`|-|
|showText|是否展示文本|`boolean`|`true`|-|
|formatText|进度条文本函数|`(percent: number) => ReactNode`|`-`|-|
|percent|百分比|`number` **(必填)**|`0`|-|
|strokeWidth|进度条线的宽度|`number`|`-`|-|
|width|进度条的宽度。`circle` 类型的进度条仅支持数字类型的`width`|`string \| number`|`-`|-|
|size|不同尺寸的进度条|`'small' \| 'default' \| 'mini' \| 'large'`|`default`|-|
|buffer|加载中的进度条是否显示缓冲区。仅对 `type=line` 且加载中的进度条有效。|`boolean`|`-`|-|
|bufferColor|缓冲区的颜色|`string \| object`|`-`|-|

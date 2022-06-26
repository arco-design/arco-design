`````
组件 / 导航

# 步骤条 Steps

明示任务流程和当前完成程度，引导用户按照步骤完成任务。
`````

%%Content%%

## API

### Steps

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|CSSProperties |`-`|
|className|节点类名|string \| string[] |`-`|
|type|节点样式类型|'default' \| 'arrow' \| 'dot' \| 'navigation' |`default`|
|size|步骤条的尺寸|'default' \| 'small' |`default`|
|direction|显示方向|'vertical' \| 'horizontal' |`horizontal`|
|labelPlacement|标签描述文字放置的位置，默认 `horizontal` 水平放在图标右侧，可选 `vertical` 放在图标下方|'horizontal' \| 'vertical' |`horizontal`|
|current|当前步数|number |`1`|
|status|当前步数的节点状态|'wait' \| 'process' \| 'finish' \| 'error' |`-`|
|customDot|自定义步骤条节点 ，不支持箭头模式|(IconDot: React.ReactNode, stepConfig: [CustomDotRecord](#customdotrecord)) => React.ReactNode |`-`|
|onChange|点击步骤切换的回调，设置这个属性后，步骤条可点击切换。|(current: number, id: any) => void |`-`|
|lineless|无连接线模式|boolean |`-`|

### Steps.Step

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|CSSProperties |`-`|2.11.0|
|className|节点类名|string \| string[] |`-`|2.11.0|
|id|指定节点的 ID，将在 onChange 回调中作为参数。|any |`-`|-|
|title|节点标题|string \| ReactNode |`-`|-|
|description|节点描述|string \| ReactNode |`-`|-|
|status|节点状态|'wait' \| 'process' \| 'finish' \| 'error' |`-`|-|
|disabled|当前步骤点击被禁用|boolean |`-`|-|

### CustomDotRecord

```js
export type CustomDotRecord = {
  index: number;
  status: string;
  title: ReactNode;
  description: ReactNode;
};
```

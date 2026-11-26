---
order: 9
title:
  zh-CN: 到视口指定距离时调整定位
  en-US: Adjust positioning when a specified distance from the viewport
---

## zh-CN

默认弹出层位置会根据视口边界进行定位及微调，`boundaryDistance` 参数可以设置到视口边界一定距离时即进行定位调整。仅在 autoFitPosition=true 且 alignPoint=false 生效。

默认根据 `position` 传入对应的 `boundaryDistance`。如 `position="right"` 时，可以设置 `right` 及 `top` 或 `bottom`。

开启 `isUseAllBoundaryDistances` 后，可以使用 `boundaryDistance={{ top: 12, right: 12, bottom: 12, left: 12 }}` 为四边各预留 12px。新规则仅作用于显式设置为有限非负数的边，并在 `popupAlign` 偏移之后做最终限位。同一轴的两侧约束无法同时满足时，保留弹出层尺寸并优先满足左侧或上侧。显式设置的 `style.left` 或 `style.top` 优先。

## en-US

The default pop-up layer position will be positioned and fine-tuned according to the viewport boundary. The `boundaryDistance` parameter can be set to adjust the positioning when it is a certain distance from the viewport boundary. Only takes effect when autoFitPosition=true and alignPoint=false.

Enable `isUseAllBoundaryDistances` and set `boundaryDistance={{ top: 12, right: 12, bottom: 12, left: 12 }}` to reserve 12px on each side. The new limits apply after `popupAlign` offsets and only on sides explicitly set to a finite non-negative number. If both limits on one axis cannot be satisfied, the popup keeps its size and prioritizes the left or top limit. An explicit `style.left` or `style.top` takes precedence.

```js
import { Trigger, Button, Input, Skeleton, Typography } from '@arco-design/web-react';

function Popup() {
  return <Skeleton className="demo-trigger-popup" style={{ width: 600 }} />;
}

function App() {
  return (
    <div>
      <Typography>
        滚动当前 demo 到视口顶部距离大于 200px 的位置，点击 button ，弹出层将会在 button 上方出现。隐藏弹出层后再向上滚动页面，直到 button 距离视口小于 200px 的位置，再次点击 button。 弹出层将会出现在 button 下方。
      </Typography>
      <Trigger trigger="click" position="top" popup={() => <Popup />} boundaryDistance={{top: 200}}>
        <Button type="primary" style={{ marginTop: 80 }}>
          Button (boundaryDistance: `top: 200`)
        </Button>
      </Trigger>
    </div>
  );
}

export default App;
```

```css:silent
.demo-trigger-popup {
  padding: 10px;
  width: 300px;
  text-align: center;
  background-color: var(--color-bg-popup);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
```

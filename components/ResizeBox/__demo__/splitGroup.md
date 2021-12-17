---
order: 6
title:
  zh-CN: 多个面板分割
  en-US: Panel Split Group
---

## zh-CN

可以通过 `SplitGroup` 进行多个面板分割，同时还支持快速收缩及手动收缩

## en-US

Multiple panels can be split through `SplitGroup`, and it also supports quick collapse and manual drag;

```js
import { useState } from 'react'
import { ResizeBox, Typography } from '@arco-design/web-react';
import { IconDoubleLeft, IconDoubleRight } from '@arco-design/web-react/icon';
const { Paragraph, Text } = Typography;

const panes = [
  { size: 0.2, collapsible: { prev: true } },
  { size: 0.4, min: '50px' },
  {
    resizable: false,
    collapsible: {
      prev: {
        // 自定义伸缩杆向前快速收缩触发器
        icon: <IconDoubleLeft />,
        onClick: (_, collapsed, status, activeIndex) => {
          console.log('快速收缩：', collapsed, status, activeIndex);
        },
      },
      next: {
        icon: <IconDoubleRight />,
        onClick: (_, collapsed, status, activeIndex) => {
          console.log('快速收缩：', collapsed, status, activeIndex);
        },
      },
    },
    // 自定义伸缩杆
    trigger: (prev, resize, next) => {
      return (
        <div className="resizebox-split-group-demo-trigger">
          {prev}
          {resize}
          {next}
        </div>
      );
    },
  },
  {}
];

const verticalPanes = [{ collapsible: true }, { min:0.1, collapsible: { next: true } }, {}];

const HorizontalSplitGroup = () => {
  const [offsets, setOffsets] = useState([]);
  return (
    <ResizeBox.SplitGroup
      onMoving={(_, sizes) => setOffsets(sizes)}
      className="resizebox-split-group-demo-horizontal"
      panes={panes.map((obj, index) => ({
        content: (
          <div className="resizebox-split-group-demo-content">
            <Paragraph>
              <Paragraph>
                <Text mark>pane {index}</Text>
                <br />
                <Text code>min：{obj.min || 0}</Text>
                <br />
                <Text code>size： {obj.size || 'not set'}</Text>
                <br />
                <Text code>offset：{offsets[index] || 'initial'}</Text>
              </Paragraph>
            </Paragraph>
          </div>
        ),
        ...obj,
      }))}
    />
  );
};

const VerticalSplitGroup = () => {
  return (
    <ResizeBox.SplitGroup
      className="resizebox-split-group-demo-vertical"
      direction="vertical"
      panes={verticalPanes.map((obj, index) => ({
        content: (
          <div className="resizebox-split-group-demo-content">
            <Text mark>pane {index}</Text>
          </div>
        ),
        ...obj,
      }))}
    />
  );
};

function Demo() {
  return (
    <ResizeBox.SplitGroup
      direction="vertical"
      className="resizebox-split-group-demo"
      panes={[{ content: <HorizontalSplitGroup /> ,size: 0.4 }, { content: <VerticalSplitGroup /> }]}
    />
  );
}

ReactDOM.render(<Demo />, CONTAINER);
```

```css
.resizebox-split-group-demo {
  border: 1px solid var(--color-neutral-4);
  height: 400px;
}

.resizebox-split-group-demo-content {
  text-align: center;
  padding: 20px 0;
  min-width: 130px;
  overflow-x: auto;
}

.resizebox-split-group-demo-trigger {
  background-color: rgba(var(--arcoblue-6), 0.9);
  height: 100%;
  width: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.resizebox-split-group-demo-trigger .arco-resizebox-trigger-icon {
  color: #ffffff;
}

.resizebox-split-group-demo-horizontal {
  height: 100%;
}

.resizebox-split-group-demo-vertical {
  height: 237px;
}
```

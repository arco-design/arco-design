---
order: 2
title:
  zh-CN: 额外操作
  en-US: Extra operations
---

## zh-CN

额外操作通过 `actions` 设置，默认情况下水平排列，如果您的操作按钮比较多，我们也提供了 `simple` 模式将按钮收入一个下拉框中，但是需要注意的是在 `simple` 模式下，描述将不显示。

## en-US

The extra operations are set by `actions` and arranged horizontally by default. If you have more operation buttons, we also provide the `simple` mode to put the buttons in a drop-down box. Note that in the `simple` mode, the description will be unable to display.

```js
import React from 'react';
import { Image, Tooltip, Space} from '@arco-design/web-react';
import { IconEye, IconDownload, IconInfoCircle } from '@arco-design/web-react/icon';

function DemoImage(props) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Image
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      title="A user’s avatar"
      description="Present by Arco Design"
      actions={[
        <button
          key="1"
          className="image-demo-action-item"
          onClick={(e) => {
            setVisible(true);
          }}
        >
          <IconEye />
        </button>,
        <button
          key="2"
          className="image-demo-action-item"
          onClick={(e) => {
            console.log('download');
          }}
        >
          <IconDownload />
        </button>,
        <Tooltip key="3" content="A user’s avatar">
          <button className="image-demo-action-item">
            <IconInfoCircle />
          </button>
        </Tooltip>,
      ]}
      previewProps={{
        visible,
        onVisibleChange: (e) => {
          setVisible(false);
        },
      }}
      {...props}
    />
  );
}

function App() {
  return (
    <div>
      <Space size={20} align="start">
        <DemoImage width={300} alt="lamp1" />
        <DemoImage
          width={200}
          simple={true}
          alt="lamp2"
          style={{
            verticalAlign: 'top',
          }}
        />
      </Space>
      <Space
        size={20}
        align="start"
        style={{
          marginTop: 67,
        }}
      >
        <DemoImage width={300} footerPosition="outer" alt="lamp3" />
        <DemoImage
          width={200}
          simple={true}
          footerPosition="outer"
          alt="lamp4"
          style={{
            verticalAlign: 'top',
          }}
        />
      </Space>
    </div>
  );
}

export default App;
```

```css
.image-demo-action-item {
  height: 22px;
  width: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: unset;
  background: unset;
  color: inherit;
  cursor: pointer;
  border-radius: 50%;
}

.image-demo-action-item:focus-visible {
  box-shadow: 0 0 0 2px var(--color-primary-light-3);
}

.image-demo-props table:nth-of-type(2) thead th:last-child,
.image-demo-props table:nth-of-type(3) thead th:last-child {
  width: 20%;
}
```

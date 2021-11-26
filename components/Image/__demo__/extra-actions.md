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
import { Image, Tooltip } from '@arco-design/web-react';
import { IconEye, IconDownload, IconInfoCircle } from '@arco-design/web-react/icon';

function DemoImage(props) {
  const [visible, setVisible] = React.useState(false);

  return <Image
    src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
    title='A user’s avatar'
    description='Present by Arco Design'
    actions={[
      <span key="1" className="image-demo-action-item" onClick={(e) => { setVisible(true); }} style={{ padding: "" }}><IconEye /></span>,
      <span key="2" className="image-demo-action-item" onClick={(e) => { console.log('download'); }}><IconDownload /></span>,
      <Tooltip key="3" content="A user’s avatar">
        <span className="image-demo-action-item"><IconInfoCircle /></span>
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
}

function Demo() {

  return <div>
    <div>
      <DemoImage
        width={300}/>
      <DemoImage
        width={200}
        simple={true}
        style={{ marginLeft: 67, verticalAlign: 'top' }}
      />
    </div>
    <div style={{ marginTop: 67 }}>
      <DemoImage
        width={300}
        footerPosition="outer"
      />
      <DemoImage
        width={200}
        simple={true}
        footerPosition="outer"
        style={{ marginLeft: 67, verticalAlign: 'top' }}
      />
    </div>
  </div>
}

ReactDOM.render(
  <Demo/>,
  CONTAINER
);
```

```css
.image-demo-action-item {
  padding: 5px 4px;
  display: inline-block;
}

.image-demo-props table:nth-of-type(2) thead th:last-child,
.image-demo-props table:nth-of-type(3) thead th:last-child {
  width: 20%;
}
```

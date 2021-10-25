---
order: 9
title:
  zh-CN: 自定义上传节点
  en-US: Customize children
---

## zh-CN

可以传入自定义内容作为文件上传的触发节点。

## en-US

Customize the node that triggers the upload operation.

```js
import { Upload } from '@arco-design/web-react';
import { IconLink } from '@arco-design/web-react/icon';


ReactDOM.render(
  <div className="upload-demo-trigger">
    <Upload
      action="/"
      onChange={(fileList, file) => {
        console.log(fileList, file);
      }}
    >
      <div className="trigger">
        <div>
          Drag the file here or <span style={{ color: '#3370FF' }}> Click to upload</span>
        </div>
      </div>
    </Upload>
</div>, CONTAINER);
```

```css
.upload-demo-trigger .trigger {
  background-color: var(--color-fill-2);
  color: var(--color-text-1);
  border: 1px dashed var(--color-fill-4);
  height: 158px;
  width: 380px;
  border-radius: 2;
  line-height: 158px;
  text-align: center;
}
```

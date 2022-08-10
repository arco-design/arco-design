---
order: 10
title:
  zh-CN: 自定义图标
  en-US: custom icon
---

## zh-CN

`showUploadList` 字段可以设置图标。

## en-US

`showUploadList` can be an object to customize `previewIcon`, `removeIcon`, `fileIcon`, `reuploadIcon`, `cancelIcon`, `startIcon`, `errorIcon` and `fileName`.

```js
import React from 'react';
import { Upload, Radio, Typography, Message } from '@arco-design/web-react';
import {
  IconFileAudio,
  IconClose,
  IconFaceFrownFill,
  IconUpload,
  IconEye,
} from '@arco-design/web-react/icon';

function App() {
  const [listType, setListtype] = React.useState('text');
  return (
    <div>
      <Typography.Text>Type:</Typography.Text> &emsp;
      <Radio.Group
        name="listType"
        value={listType}
        onChange={setListtype}
        style={{ marginLeft: 20, marginBottom: 20 }}
        options={['text', 'picture-list', 'picture-card']}
      ></Radio.Group>
      <div>
        <Upload
          showUploadList={{
            // Please dont remove this comment
            reuploadIcon: <IconUpload />,
            cancelIcon: <IconClose />,
            fileIcon: <IconFileAudio />,
            removeIcon: <IconClose />,
            previewIcon: null,
            errorIcon: <IconFaceFrownFill />,
            fileName: (file) => {
              return (
                <a
                  onClick={() => {
                    Message.info('click ' + file.name);
                  }}
                >
                  {file.name}
                </a>
              );
            },
          }}
          progressProps={{
            formatText: (percent) => `${percent}%`,
          }}
          multiple
          defaultFileList={[
            {
              uid: '-2',
              name: 'light.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
            },
            {
              uid: '-1',
              name: 'ice.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
            },
          ]}
          listType={listType}
          action="/"
        />
      </div>
    </div>
  );
}

export default App;
```

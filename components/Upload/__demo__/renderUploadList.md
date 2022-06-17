---
order: 11
title:
  zh-CN: 自定义文件上传列表展示
  en-US: Customize upload list
---

## zh-CN
传入 `renderUploadList` 可以自定义展示文件上传列表。第一个参数是当前上传列表，第二个参数是上传列表相关的属性。详细可参考 `<UploadListProps>`

## en-US

Customize the display of uploaded files

```js
import { Upload, Card, Modal } from '@arco-design/web-react';
import { IconEye, IconDelete } from '@arco-design/web-react/icon';

function App() {
  const renderUploadList = (filesList, props) => (
    <div style={{ display: 'flex', marginTop: 20, }} >
      {filesList.map((file) => {
        const url = file.url || URL.createObjectURL(file.originFile);
        return (
          <Card
            key={file.uid}
            hoverable
            style={{
              width: 140,
              marginRight: 10,
            }}
            bodyStyle={{ padding: '4px 8px', }}
            cover={
              <img
                src={url}
                style={{ width: '100%', }}
              />
            }
            actions={[
              <div
                onClick={() => {
                  Modal.info({
                    title: '预览',
                    content: <img src={file.url} width="100%" />,
                  });
                }}
              >
                <IconEye style={{ fontSize: 12, }} />
              </div>,
              <div>
                <IconDelete
                  style={{ fontSize: 12, }}
                  onClick={() => {
                    props.onRemove(file);
                  }}
                />
              </div>,
            ]}
          >
            <Card.Meta description={file.name.split('.')[0]} />
          </Card>
        );
      })}
    </div>
  );

  return (
    <div>
      <Upload
        action="/"
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
        renderUploadList={renderUploadList}
      />
    </div>
  );
}

export default App;
```

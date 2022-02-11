import React from 'react';
import { Upload, Modal } from '@self';

export default function Demo() {
  return (
    <Upload
      multiple
      action="/"
      tip="请上传 2M 以内的 png 或 jpg 图片"
      // drag
      // listType="picture-card"
      defaultFileList={[
        {
          uid: '-2',
          name: '20200717-103937.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          uid: '-1',
          name: 'hahhahahahaha.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
        },
      ]}
      onPreview={(file) => {
        Modal.info({
          title: '预览',
          content: (
            <div style={{ textAlign: 'center' }}>
              <img
                style={{ maxWidth: '100%' }}
                src={file.url || URL.createObjectURL(file.originFile)}
              />
            </div>
          ),
        });
      }}
    />
  );
}

import React, { useState } from 'react';
import { Image, Space, Button } from '@self';

function Demo1() {
  const newSrc =
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp';
  const [srcList, setSrcList] = useState([
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
  ]);

  const replaceSrc = () => {
    setSrcList([srcList[0], newSrc, srcList[2]]);
  };

  return (
    <div>
      <Space direction="vertical">
        <Image.PreviewGroup infinite scales={[50, 150]}>
          <Image
            src={newSrc}
            width={230}
            preview
            previewProps={{
              imgAttributes: {
                onLoad: (e) => {
                  console.log(e, 'loaded!!');
                },
              },
              className: 'img-demo-preview',
            }}
          />
          <div>
            <Space>
              {srcList.map((src) => (
                <Image key={src} src={src} width={200} />
              ))}
            </Space>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Space>
              {[...srcList].reverse().map((src) => (
                <Image key={src} src={src} width={180} />
              ))}
            </Space>
          </div>
          <Image src={srcList[1]} width={220} />
        </Image.PreviewGroup>
        <Button type="primary" onClick={replaceSrc}>
          Replace
        </Button>
      </Space>
    </div>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Image',
};

import React from 'react';
import { Image, Button, Space } from '@self';

const wrapperStyle = {
  padding: 20,
  width: '100%',
  height: 300,
  backgroundColor: 'var(--color-fill-2)',
  overflow: 'auto',
  alignItems: 'center',
};

function Demo1() {
  const srcList = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
  ];

  const imageSize = { width: 560, height: 200 };
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <Space direction="vertical" size={30} style={wrapperStyle}>
        {srcList.map((src, key) => (
          <Image
            key={key}
            {...imageSize}
            src={src}
            alt="lamp"
            // lazyload={{ threshold: 0.8 }}
            // loader={<Skeleton image={{ style: imageSize }} text={false} animation />}
          />
        ))}
      </Space>
      <div>
        <Button type="primary" onClick={() => setVisible(true)}>
          Click me to preview multiple image
        </Button>
        <Image.PreviewGroup srcList={srcList} visible={visible} onVisibleChange={setVisible} />
      </div>
    </div>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Image',
};

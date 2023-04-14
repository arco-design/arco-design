import React from 'react';
import { Image, Skeleton, Space } from '@self';

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
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-tourism.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-finance.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-medical.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-automotive.png~tplv-uwbnlip3yd-png.png',
  ];

  const imageSize = { width: 560, height: 200 };

  return (
    <Space direction="vertical" size={30} style={wrapperStyle}>
      {srcList.map((src, key) => (
        <Image
          key={key}
          {...imageSize}
          src={src}
          alt="lamp"
          lazyload={{ threshold: 0.8 }}
          // loader={<Skeleton image={{ style: imageSize }} text={false} animation />}
        />
      ))}
    </Space>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Image',
};

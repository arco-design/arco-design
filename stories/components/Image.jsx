import React, { useState } from 'react';
import { Image, Space, ConfigProvider } from '@self';

function Demo() {
  const srcList = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
  ];

  return (
    <ConfigProvider prefixCls="demo">
      <div>
        <Space direction="vertical">
          <Image.PreviewGroup infinite={true}>
            <Space>
              {srcList.map((src, index) => (
                <Image key={index} src={src} width={200} />
              ))}
            </Space>
          </Image.PreviewGroup>
        </Space>
      </div>
    </ConfigProvider>
  );
}

export default Demo;

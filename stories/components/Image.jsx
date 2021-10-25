import React, { useState } from 'react';
import { Image, Space, Button } from '@self';

const srcList1 = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae45672685c4be6a297acc7848eab56~tplv-uwbnlip3yd-image.image',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a5eb077f42834139ad7ac17563056664~tplv-uwbnlip3yd-image.image',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5c030fe27c0e467a9a7d62c36ae4805b~tplv-uwbnlip3yd-image.image',
];

const srcList2 = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b8659bfc202d44c49aad938b95884e7a~tplv-uwbnlip3yd-image.image',
];

function Demo() {
  const [visible, setVisible] = useState(false);
  const [srcListFlag, setSrcListFlag] = useState('srcList1');
  const srcList = srcListFlag === 'srcList1' ? srcList1 : srcList2;

  function onChange(index) {
    console.log(index);
  }

  function changeSrcList() {
    setSrcListFlag(srcListFlag === 'srcList1' ? 'srcList2' : 'srcList1');
  }

  function showGroupPreview() {
    setVisible(true);
  }

  return (
    <div>
      <Image.PreviewGroup infinite onChange={onChange}>
        <Space>
          {srcList1.map((src) => (
            <Image src={src} width={200} />
          ))}
        </Space>
      </Image.PreviewGroup>

      <div style={{ height: 50 }} />
      <Button onClick={changeSrcList}>change srcList</Button>
      <div style={{ height: 24 }} />
      <Button onClick={showGroupPreview}>showGroupPreview</Button>
      <Image.PreviewGroup
        srcList={srcList}
        infinite
        visible={visible}
        onVisibleChange={setVisible}
      />
    </div>
  );
}

export default Demo;

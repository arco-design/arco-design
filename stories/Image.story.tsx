import React, { useState } from 'react';
import { Image, Button, Space } from '@self';

function ImageWrapper({ actions }) {
  console.log(actions);
  return (
    <Image
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      previewProps={{
        actions: actions || [],
      }}
    />
  );
}
ImageWrapper.displayName = 'Image';

function Demo1() {
  const [actions, setActions] = useState([]);
  return (
    <a>
      <span
        onClick={() => {
          setActions([
            {
              key: 'download',
              content: (
                <span
                  onClick={() => {
                    setActions([
                      {
                        key: 'info',
                        content: 'info',
                        name: 'Info',
                      },
                    ]);
                  }}
                >
                  download
                </span>
              ),
              name: 'Download',
            },
            {
              key: 'info',
              content: 'info',
              name: 'Info',
            },
          ]);
        }}
      >
        asdd
      </span>
      <Image.PreviewGroup>
        <ImageWrapper actions={actions} />
      </Image.PreviewGroup>
    </a>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Image',
};

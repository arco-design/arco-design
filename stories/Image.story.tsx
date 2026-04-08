import React, { useState } from 'react';
import { Image } from '@self';

function ImageWrapper({ previewProps = {} }) {
  const { wheelZoomable, actions = [] } = previewProps || {};
  return (
    <Image
      width={200}
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      previewProps={{
        actions: actions || [],
        wheelZoomable,
      }}
    />
  );
}
ImageWrapper.displayName = 'Image';

function Demo1() {
  const [actions, setActions] = useState([]);
  return (
    <div>
      <h2>Loop rendering in Image component</h2>
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
          <u>click here to add actions</u>
        </span>{' '}
      </a>
      <br />
      <Image.PreviewGroup>
        <ImageWrapper previewProps={{ actions }} />
      </Image.PreviewGroup>
    </div>
  );
}

function DemoWheelSwitch() {
  return (
    <div>
      <h2>WheelZoom Switch</h2>
      <div>
        <p>(default) enable wheelZoom @Image</p>
        <ImageWrapper />
      </div>
      <div>
        <p>(defaul) enable wheelZoom @ImagePreview</p>
        <Image.PreviewGroup>
          <ImageWrapper />
          <ImageWrapper />
        </Image.PreviewGroup>
      </div>
      <div>
        <p>turn off wheelZoom @Image</p>
        <ImageWrapper
          previewProps={{
            wheelZoomable: false,
          }}
        />
      </div>
      <div>
        <p>turn off wheelZoom @ImagePreview</p>
        <Image.PreviewGroup wheelZoomable={false}>
          <ImageWrapper />
          <ImageWrapper />
        </Image.PreviewGroup>
      </div>
    </div>
  );
}

export const Demo = () => (
  <>
    <Demo1 />
    <DemoWheelSwitch />
  </>
);

export default {
  title: 'Image',
};

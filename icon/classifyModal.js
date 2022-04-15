import React, { useState } from 'react';
import { Upload, Modal, Progress, Empty, Typography, Spin } from '@arco-design/web-react';
import Axios from 'axios';
import * as icons from '@arco-design/web-react/icon/index.es.js';
import { teaLog } from '@arco-design/arco-site-utils';
import { EventMap } from '../site/src/pages/home/utils/eventMap';

const locale = {
  'zh-CN': {
    matchIconResult: '为您匹配到如下图标（点击图标可复制用法）：',
    titleIcon: '图标',
    titleMatchScore: '匹配度',
    tipMatching: '匹配中...',
    tipNoResult: '无匹配项',
  },
  'en-US': {
    matchIconResult: 'The following icons are matched for you (Click Icon for Usage) :',
    titleIcon: 'Icon',
    titleMatchScore: 'Matching Score',
    tipMatching: 'Matching ...',
    tipNoResult: 'No Result',
  },
};

function getImageBase64(imageSrc) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      const $canvas = document.createElement('canvas');
      $canvas.width = width;
      $canvas.height = height;
      const canvasContext = $canvas.getContext('2d');
      canvasContext.drawImage(image, 0, 0, width, height);
      const dataUrl = $canvas.toDataURL();
      resolve(dataUrl);
    };
    image.src = imageSrc;
  });
}

export function IconClassifyModal(props) {
  const visible = props.visible;
  const onVisibleChange = props.onVisibleChange;
  const lang = props.lang;
  const title = props.title;
  const [image, setImage] = useState();
  const [matchIconList, setMatchIconList] = useState([]);
  const [loading, setLoading] = useState(false);

  const t = locale[lang];

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => {
        onVisibleChange(false);
      }}
      footer={null}
    >
      <Upload
        drag
        accept="image/*"
        showUploadList={false}
        fileList={image ? [image] : []}
        onChange={(_, file) => {
          setImage({
            ...file,
            url: URL.createObjectURL(file.originFile),
          });
        }}
        customRequest={(option) => {
          const url = URL.createObjectURL(option.file);
          teaLog(EventMap.searchIconByImg, { type: 'search' });
          setLoading(true);
          getImageBase64(url)
            .then((imageBase64) => {
              return Axios.post('/api/icon/classify', {
                imageBase64,
              })
                .then((res) => {
                  setMatchIconList(res.data || []);
                })
                .catch(() => {
                  setMatchIconList([]);
                });
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
      {image && image.url ? (
        <>
          <div
            style={{
              margin: '8px 0',
              padding: '4px 0',
              border: '1px solid var(--color-neutral-3)',
              lineHeight: 1,
            }}
          >
            <img src={image.url} height={60} />
          </div>
          <Spin loading={loading} style={{ display: 'block' }}>
            {matchIconList.length ? (
              <div>
                <Typography.Text type="secondary" style={{ marginBottom: 8 }}>
                  {t.matchIconResult}
                </Typography.Text>
                <table width="100%">
                  <thead>
                    <th width="60px">{t.titleIcon}</th>
                    <th>{t.titleMatchScore}</th>
                  </thead>
                  <tbody>
                    {matchIconList.map((icon, index) => {
                      const Tag = icons[icon.name];
                      const score = icon.score || 0;
                      return (
                        <tr key={index}>
                          <td>
                            <div
                              className="icon-cell"
                              aria-label={icon.name}
                              style={{
                                fontSize: 24,
                                padding: '8px 0',
                                cursor: 'pointer',
                                lineHeight: 1,
                              }}
                            >
                              <Tag />
                            </div>
                          </td>
                          <td>
                            <Progress percent={(score * 100).toFixed(2)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <Empty description={loading ? t.tipMatching : t.tipNoResult} />
            )}
          </Spin>
        </>
      ) : null}
    </Modal>
  );
}

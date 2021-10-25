import React, { useEffect, useState } from 'react';
import { Typography, Button, Slider, Select, Space } from '@arco-design/web-react';
import {
  IconUndo,
  IconNav,
  IconNotificationClose,
  IconNotification,
  IconPen,
  IconPhone,
  IconPrinter,
  IconPublic,
  IconPushpin,
  IconQrcode,
  IconRobotAdd,
  IconIdcard,
  IconImageClose,
  IconImage,
  IconInteraction,
  IconLayout,
  IconLock,
  IconLoop,
  IconMan,
  IconMenu,
  IconMindMapping,
  IconFire,
  IconFolderAdd,
  IconFolderDelete,
  IconFolder,
  IconGift,
  IconApps,
  IconMobile,
  IconRobot,
  IconSafe,
  IconMosaic,
  IconFileAudio,
  IconFileImage,
  IconFilePdf,
  IconFileVideo,
  IconFile,
  IconBook,
  IconBug,
  IconShake,
  IconTag,
  IconTags,
  IconUser,
  IconEmpty,
  IconEar,
  IconExperiment,
  IconVideoCamera,
  IconWoman,
  IconCopyright,
} from '@arco-design/web-react/icon';
import styles from './index.module.less';
import useLocale from '../../hooks/useLocale';

const icons = {
  IconNav,
  IconNotificationClose,
  IconNotification,
  IconPen,
  IconPhone,
  IconPrinter,
  IconPublic,
  IconPushpin,
  IconQrcode,
  IconRobotAdd,
  IconIdcard,
  IconImageClose,
  IconImage,
  IconInteraction,
  IconLayout,
  IconLock,
  IconLoop,
  IconMan,
  IconMenu,
  IconMindMapping,
  IconFire,
  IconFolderAdd,
  IconFolderDelete,
  IconFolder,
  IconGift,
  IconApps,
  IconMobile,
  IconRobot,
  IconSafe,
  IconMosaic,
  IconFileAudio,
  IconFileImage,
  IconFilePdf,
  IconFileVideo,
  IconFile,
  IconBook,
  IconBug,
  IconShake,
  IconTag,
  IconTags,
  IconUser,
  IconEmpty,
  IconEar,
  IconExperiment,
  IconVideoCamera,
  IconWoman,
  IconCopyright,
};

const fontSizes = [12, 14, 16, 24, 36, 48];
const lineJoins = ['arcs', 'bevel', 'miter', 'miter-clip', 'round'];
const lineCaps = ['butt', 'round', 'square'];

export default function Icons() {
  const locale = useLocale();
  const [fontSize, setFontSize] = useState(48);
  const [lineJoin, setLineJoin] = useState('miter');
  const [lineCap, setLineCap] = useState('butt');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    window.setTimeout(() => setOpacity(1));
  }, []);

  const handleReset = () => {
    setFontSize(48);
    setLineJoin('miter');
    setLineCap('butt');
    setStrokeWidth(3);
  };

  return (
    <div className={styles['icons-body']} style={{ opacity }}>
      <div className={styles['icons-form']}>
        <Space direction="vertical" size="large">
          <Space direction="vertical">
            <Typography.Text type="secondary">{locale['content.icons.label.size']}</Typography.Text>
            <Select options={fontSizes} value={fontSize} onChange={(value) => setFontSize(value)} />
          </Space>
          <Space direction="vertical">
            <Typography.Text type="secondary">
              {locale['content.icons.label.lineJoins']}
            </Typography.Text>
            <Select options={lineJoins} value={lineJoin} onChange={(value) => setLineJoin(value)} />
          </Space>
          <Space direction="vertical">
            <Typography.Text type="secondary">
              {locale['content.icons.label.lineCaps']}
            </Typography.Text>
            <Select options={lineCaps} value={lineCap} onChange={(value) => setLineCap(value)} />
          </Space>
          <Space direction="vertical">
            <Typography.Text type="secondary">
              {locale['content.icons.label.strokeWidth']}
            </Typography.Text>
            <Slider
              min={1}
              max={5}
              showTicks
              value={strokeWidth}
              onChange={(value: number) => setStrokeWidth(value)}
            />
          </Space>
        </Space>
        <div className={styles['form-bottom']}>
          <Button type="text" size="small" onClick={handleReset} style={{ marginLeft: -16 }}>
            <IconUndo />
            {locale['content.icons.reset']}
          </Button>
        </div>
      </div>
      <div className={styles['icons-display']}>
        <ul className={styles['icons-list']}>
          {Object.keys(icons).map((key, index) => {
            const Icon = icons[key];
            return (
              <li className={styles['icons-item']} key={index}>
                <Icon
                  stroke-linecap={lineCap}
                  stroke-linejoin={lineJoin}
                  style={{ fontSize, strokeWidth }}
                />
              </li>
            );
          })}
          {Object.keys(icons).map((key, index) => {
            const Icon = icons[key];
            return (
              <li className={styles['icons-item']} key={`copy-${index}`}>
                <Icon
                  stroke-linecap={lineCap}
                  stroke-linejoin={lineJoin}
                  style={{ fontSize, strokeWidth }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

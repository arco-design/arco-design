import React from 'react';
import { ColorPicker, ConfigProvider } from '@self';

export default {
  title: 'ColorPicker',
};

export const Demo = () => (
  <div style={{ marginTop: 150 }}>
    {/* 使用 ConfigProvider 的组件默认配置。这里取值 mini */}
    <ConfigProvider componentConfig={{ ColorPicker: { size: 'mini' } }}>
      <ColorPicker />
    </ConfigProvider>
    <br />
    {/* 使用 ConfigProvider 的 size 配置。这里取值 small */}
    <ConfigProvider size="small">
      <ColorPicker />
    </ConfigProvider>
    <br />
    {/* ConfigPrivider 的组件默认值优先于ConfigPrivider 的 size。这里取值 default */}
    <ConfigProvider componentConfig={{ ColorPicker: { size: 'default' } }} size="small">
      <ColorPicker />
    </ConfigProvider>
    <br />
    {/* 组件的优先级最高，这里取值 large */}
    <ConfigProvider componentConfig={{ ColorPicker: { size: 'default' } }} size="small">
      <ColorPicker size="large" />
    </ConfigProvider>
    <br />
    <ColorPicker size={'mini'} />
    <br />
    <ColorPicker size={'small'} />
    <br />
    <ColorPicker size={'default'} showPreset showHistory />
    <br />
    <ColorPicker size={'large'} />
    <br />
    <ColorPicker size={'large'} disabledAlpha />
  </div>
);

// 用在组件文档里，展示所有 Icon
import React, { useState } from 'react';
import {
  Radio,
  Input,
  Affix,
  Space,
  Slider,
  Select,
  InputNumber,
  Button,
  Modal,
  Tooltip,
  Typography,
} from '@arco-design/web-react';
import * as icons from '@arco-design/web-react/icon/index.es.js';
import { teaLog } from '@arco-materials/site-utils';
import { IconClassifyModal } from './classifyModal';

const RadioGroup = Radio.Group;
const { Paragraph } = Typography;
const IconCamera = icons.IconCamera;

const svgData = JSON.parse('{{ svgData | safe }}');
const newIcons = JSON.parse('{{ newIcons | safe }}');

const lineCaps = ['butt', 'round', 'square'];
const lineJoins = ['arcs', 'bevel', 'miter', 'miter-clip', 'round'];

const locale = {
  'zh-CN': {
    title: '图标配置',
    line: '线性图标',
    fill: '面性图标',
    color: '多色图标',
    search: '搜索图标，点击可复制图标用法',
    'stroke-width': '线宽：',
    size: '图标大小：',
    lineJoin: '拐角：',
    lineCap: '端点：',
    desc1: '全局配置（将以下的类添加到 css 中）:',
    desc2: (
      <span>
        单个组件的话可以直接将以上样式写到 <code>IconXXX</code> 的 <code>style</code> 中
      </span>
    ),
    'show-config': '显示配置',
    add: '添加',
    iconClassifyModalTitle: '上传图片搜索图标',
  },
  'en-US': {
    title: 'Icon Configuration',
    line: 'Stroke',
    fill: 'Fill',
    color: 'Color',
    search: 'Search icon, click to copy usage',
    'stroke-width': 'Stroke Width:',
    size: 'Size:',
    lineJoin: 'Line Join:',
    lineCap: 'Line Cap:',
    desc1: 'Global configuration (add the following class to css):',
    desc2: (
      <span>
        For a single component, you can directly write the above style to the <code>style</code>
        of <code>IconXXX</code>
      </span>
    ),
    'show-config': 'Show Config',
    add: 'Add',
    iconClassifyModalTitle: 'Upload an image to search for icons',
  },
};

export default function ({ lang = 'zh-CN' }) {
  const [type, setType] = useState('outline');
  const [filter, setFilter] = useState('');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [lineCap, setLineCap] = useState('butt');
  const [lineJoin, setLineJoin] = useState('miter');
  const [fontSize, setFontSize] = useState(32);
  const sliderStyle = { width: 120, marginRight: 20 };
  const inputNumberStyle = { width: 60 };
  const getWidthStyle = (width) => ({ width });
  const iconStyle = { fontSize };
  const spaceStyle = { justifyContent: 'space-between', whiteSpace: 'nowrap' };
  const iconCameraStyle = { marginLeft: 8 };
  const [iconClassifyModalVisible, setIconClassifyModalVisible] = useState(false);

  const maps = JSON.parse('{{ maps | safe }}')[lang];

  const t = locale[lang];

  return (
    <div>
      <div className="iconlist-bar">
        <RadioGroup
          size="large"
          type="button"
          mode="fill"
          name="type"
          defaultValue="outline"
          onChange={setType}
        >
          <Radio value="outline">{t.line}</Radio>
          <Radio value="fill">{t.fill}</Radio>
          <Radio value="color">{t.color}</Radio>
        </RadioGroup>
        <Input.Search size="large" onChange={setFilter} placeholder={t.search} />
        <Tooltip content={t.iconClassifyModalTitle}>
          <Button
            size="large"
            icon={<IconCamera />}
            style={iconCameraStyle}
            onClick={() => {
              teaLog('search_icon_by_img', { type: 'open' });
              setIconClassifyModalVisible(true);
            }}
          />
          <IconClassifyModal
            title={t.iconClassifyModalTitle}
            lang={lang}
            visible={iconClassifyModalVisible}
            onVisibleChange={setIconClassifyModalVisible}
          />
        </Tooltip>
      </div>
      <Affix offsetTop={60} className="iconlist-affix">
        <Space className="iconlist-operations" style={spaceStyle}>
          <Space>
            {t['stroke-width']}
            <Slider
              defaultValue={4}
              style={sliderStyle}
              showTicks
              min={1}
              max={5}
              onChange={(value) => setStrokeWidth(value)}
            />
            {t.size}
            <InputNumber
              min={14}
              max={80}
              value={fontSize}
              onChange={(value) => setFontSize(value)}
              style={inputNumberStyle}
            />
            {t.lineJoin}
            <Select
              options={lineJoins}
              value={lineJoin}
              onChange={(value) => setLineJoin(value)}
              style={getWidthStyle(100)}
            />
            {t.lineCap}
            <Select
              options={lineCaps}
              value={lineCap}
              onChange={(value) => setLineCap(value)}
              style={getWidthStyle(84)}
            />
          </Space>
          <Button
            type="primary"
            onClick={() =>
              Modal.success({
                title: t.title,
                content: (
                  <div>
                    <Paragraph>{t.desc1} </Paragraph>
                    <Paragraph code>{`.arco-icon {
                      font-size: ${fontSize};
                      ${lineCap !== 'butt' ? `stroke-linecap: ${lineCap};` : ''}
                      ${lineJoin !== 'miter' ? `stroke-linejoin: ${lineJoin};` : ''}
                      ${strokeWidth !== 4 ? `stroke-width: ${strokeWidth};` : ''}
                    }`}</Paragraph>
                    <Paragraph>{t.desc2}</Paragraph>
                  </div>
                ),
              })
            }
          >
            {t['show-config']}
          </Button>
        </Space>
      </Affix>
      {Object.keys(svgData).map((key) => {
        const filteredData =
          filter && svgData[key][type]
            ? svgData[key][type].filter((s) => {
                return s.componentName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
              })
            : svgData[key][type];
        let className = 'iconlist-wrapper';
        if (key === 'out-of-date') {
          className += ' out-of-date';
        }
        return filteredData && filteredData.length ? (
          <div className={className} key={key}>
            <div className="iconlist-title" id={maps[key]}>
              {maps[key]}
            </div>
            <ul className="iconlist">
              {filteredData.map((n) => {
                const Tag = icons[n.componentName];
                const newIcon = newIcons.find((_n) => _n.name === n.componentName);
                return (
                  <li key={n.componentName} className="icon-cell" aria-label={n.componentName}>
                    <div className="icon-show">
                      <Tag
                        strokeWidth={strokeWidth}
                        strokeLinecap={lineCap}
                        strokeLinejoin={lineJoin}
                        style={iconStyle}
                      />
                    </div>
                    <p className="name">{n.componentName}</p>
                    {newIcon ? (
                      <span className="version">
                        {newIcon.version} {t.add}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null;
      })}
    </div>
  );
}

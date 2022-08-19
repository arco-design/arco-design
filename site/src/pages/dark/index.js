import React from 'react';
import { Divider } from '@arco-design/web-react';
import lazyLoad from '../../utils/lazyload';
import './style.less';

const locale = {
  'zh-CN': {
    variable: '变量名',
    description: '描述',
    colorString: '色值',
    bg1: '整体背景',
    bg2: '一级容器背景',
    bg3: '二级容器背景',
    bg4: '三级容器背景',
    bg5: '下拉弹出框、Tooltip 背景颜色',
    title: '标题',
    paragraph: '语句',
    secondary: '次要信息',
    disabled: '禁用状态文字',
    bg: '背景',
    text: '文字',
  },
  'en-US': {
    variable: 'Variable',
    description: 'Description',
    colorString: 'Color',
    bg1: 'Overall background',
    bg2: 'First level container background',
    bg3: 'Secondary container background',
    bg4: 'Three-level container background',
    bg5: 'Dropdown, Tooltip background color',
    title: 'Title',
    paragraph: 'Paragraph',
    secondary: 'Secondary',
    disabled: 'Disabled',
    bg: 'Background',
    text: 'Text',
  },
};

function DarkPage({ lang = 'zh-CN' }) {
  const MdHeader = lazyLoad(() => import(`./md/header.${lang}.md`));
  const t = locale[lang];

  function Table({ data, style }) {
    return (
      <table style={style}>
        <thead>
          <tr>
            <th>{t.variable}</th>
            <th>{t.variable}</th>
            <th>{t.colorString}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  const prefixCls = 'page-dark';

  function Color({ light, dark }) {
    return (
      <div className={`${prefixCls}-color`}>
        light: <div className={`${prefixCls}-color-value`} style={{ background: light }} />
        <span style={{ marginRight: 10 }}>{light}</span>
        <Divider type="vertical" />
        dark: <div className={`${prefixCls}-color-value`} style={{ background: dark }} /> {dark}
      </div>
    );
  }

  const dataBg = [
    {
      name: '--color-bg-1',
      description: t.bg1,
      value: <Color light="#fff" dark="#17171A" />,
    },
    {
      name: '--color-bg-2',
      description: t.bg2,
      value: <Color light="#fff" dark="#232324" />,
    },
    {
      name: '--color-bg-3',
      description: t.bg3,
      value: <Color light="#fff" dark="#2a2a2b" />,
    },
    {
      name: '--color-bg-4',
      description: t.bg4,
      value: <Color light="#fff" dark="#313132" />,
    },
    {
      name: '--color-bg-5',
      description: t.bg5,
      value: <Color light="#fff" dark="#373739" />,
    },
  ];

  const dataText = [
    {
      name: '--color-text-1',
      description: t.title,
      value: <Color light="#1d2129" dark="rgba(255, 255, 255, 0.9)" />,
    },
    {
      name: '--color-text-2',
      description: t.paragraph,
      value: <Color light="#4e5969" dark="rgba(255, 255, 255, 0.7)" />,
    },
    {
      name: '--color-text-3',
      description: t.secondary,
      value: <Color light="#86909c" dark="rgba(255, 255, 255, 0.5)" />,
    },
    {
      name: '--color-text-4',
      description: t.disabled,
      value: <Color light="#c9cdd4" dark="rgba(255, 255, 255, 0.3)" />,
    },
  ];

  return (
    <div className={prefixCls}>
      <MdHeader />
      <div className="markdown-body">
        <h3>{t.bg}</h3>
        <Table data={dataBg} />
        <h3>{t.text}</h3>
        <Table data={dataText} style={{ marginBottom: 20 }} />
      </div>
    </div>
  );
}

export default DarkPage;

import React, { ReactNode } from 'react';
import BytedEffectsBlack from '../assets/showcase/byted-effects-black.svg';
import BytedEffects from '../assets/showcase/byted-effects.svg';
import FeiLianBlack from '../assets/showcase/feilian-black.svg';
import FeiLian from '../assets/showcase/feilian.svg';
import StarryBlack from '../assets/showcase/starry-black.svg';
import Starry from '../assets/showcase/starry.svg';
import TouTiaoBlack from '../assets/showcase/toutiao-black.svg';
import TouTiao from '../assets/showcase/toutiao.svg';
import VolcLiveBlack from '../assets/showcase/volc-live-black.svg';
import VolcLive from '../assets/showcase/volc-live.svg';
import VolcTranslateBlack from '../assets/showcase/volc-tanslate-black.svg';
import VolcTranslate from '../assets/showcase/volc-translate.svg';
import VolcTransliveBlack from '../assets/showcase/volc-translive-black.svg';
import VolcTranslive from '../assets/showcase/volc-translive.svg';
import VolcEngine from '../assets/showcase/volc-engine.svg';
import VolcEngineBlack from '../assets/showcase/volc-engine-black.svg';
import DesignLab from '../assets/showcase/logo_DesignLab.svg';
import useTheme from './useTheme';

const imageList = {
  byted_effects:
    'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/showcase-byted-effects~tplv-uwbnlip3yd-png.png',
  starry: 'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/showcase-starry~tplv-uwbnlip3yd-png.png',
  volc_engine:
    'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/showcase-volc-engine.png~tplv-uwbnlip3yd-png.png',
  volc_translate:
    'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/show-case-volc-translate.png~tplv-uwbnlip3yd-png.png',
  toutiao:
    'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/showcase-toutiao~tplv-uwbnlip3yd-png.png',
  feilian:
    'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/showcase-feilian.png~tplv-uwbnlip3yd-png.png',
  volc_live:
    'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/showcase-volc-live~tplv-uwbnlip3yd-png.png',
  volc_translive:
    'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/showcase-volc-translive.png~tplv-uwbnlip3yd-png.png',
};

export interface ShowCaseCardProps {
  title: string;
  logo: ReactNode;
  content: ReactNode;
  image: string;
  data?: {
    label: string;
    text: string;
  }[];
  link?: {
    name: string;
    logo: ReactNode;
    href: string;
  }[];
  homePage?: boolean;
}

export default function useShowcaseData() {
  const { realTheme } = useTheme();
  const isDark = realTheme === 'dark';
  const data: ShowCaseCardProps[] = [
    {
      title: '火山引擎',
      logo: isDark ? <VolcEngineBlack /> : <VolcEngine />,
      content: (
        <div>
          通过<mark>arco风格配置平台</mark>和<mark>IconBox图标平台</mark>
          ，智能生成适合多种业务需求的个性化主题包，助力火山引擎提升各产品线体验一致性，使其更好的为企业提供系统化全链路解决方案服务。
        </div>
      ),
      image: imageList.volc_engine,
      data: [
        {
          label: '控制台产品接入',
          text: '100 +',
        },
      ],
      link: [
        {
          name: 'DesignLab',
          logo: <DesignLab />,
          href: '/themes',
        },
      ],
      homePage: true,
    },
    {
      title: '头条号',
      logo: isDark ? <TouTiaoBlack /> : <TouTiao />,
      content: (
        <div>
          使用<mark>arco灵活丰富的组件资源</mark>
          ，今日头条快速搭建自媒体平台头条号，为创作者提供创作发布、数据分析、收益分析等多场景实用功能。
        </div>
      ),
      image: imageList.toutiao,
      homePage: true,
    },
    {
      title: '飞连',
      logo: isDark ? <FeiLianBlack /> : <FeiLian />,
      content: (
        <div>
          基于<mark>arco年轻化的色彩</mark>和<mark>组件设计</mark>
          ，帮助飞连减弱严肃安全办公产品的冰冷感，拉近产品与用户之间的距离，在实现办公网络与终端持续安全的同时给用户提供更加轻盈的使用体验。
        </div>
      ),
      data: [
        {
          label: '飞连整体体验评分',
          text: '8.93/10',
        },
      ],
      image: imageList.feilian,
      homePage: true,
    },
    {
      title: '火山翻译',
      logo: isDark ? <VolcTranslateBlack /> : <VolcTranslate />,
      content: (
        <div>
          使用<mark>arco自有的图标及品牌资源</mark>
          ，火山翻译在短时间内完成了官网落地页的设计工作，多样的视觉内容帮助聚焦用户关注，引流平台提供的多语言翻译服务。
        </div>
      ),
      image: imageList.volc_translate,
      homePage: true,
    },
    {
      title: 'VolcLive',
      logo: isDark ? <VolcLiveBlack /> : <VolcLive />,
      content: (
        <div>
          基于arco<mark>多样的页面布局</mark>及<mark>样式设置能力</mark>
          ，企业直播为用户提供0开发自定义直播间搭建功能，为营销卖货、教育培训和招聘宣讲等提供多端多场景的直播服务。
        </div>
      ),
      image: imageList.volc_live,
      homePage: true,
    },
    {
      title: 'BytedEffects',
      logo: isDark ? <BytedEffectsBlack /> : <BytedEffects />,
      content: (
        <div>
          使用<mark>arco mobile的定制组件与开发框架</mark>
          ，BytedEffects开发了对智能图像创作能力进行展示的移动端应用，方便为客户提供沉浸式的功能预演和能力试用。
        </div>
      ),
      data: [
        {
          label: '演示客户',
          text: '700+',
        },
      ],
      image: imageList.byted_effects,
    },
    {
      title: 'Starry',
      logo: isDark ? <StarryBlack /> : <Starry />,
      content: (
        <div>
          基于<mark>arco组件的强交互能力</mark>
          ，帮助星夜智能建站平台实现更加灵活智能的建站能力，在活动搭建、中后台搭建、垂直搭建等多种场景中提效。
        </div>
      ),
      image: imageList.starry,
    },
    {
      title: '火山同传',
      logo: isDark ? <VolcTransliveBlack /> : <VolcTranslive />,
      content: (
        <div>
          基于<mark>arco轻量化的开发框架</mark>
          ，火山同传实现AI实时同声传译客户端软件的快速上线，面向线上直播、线下大会等场景提供的一站式智能同传解决方案。
        </div>
      ),
      image: imageList.volc_translive,
      data: [
        {
          label: '大会/直播',
          text: '29 场',
        },
        {
          label: '累计曝光超',
          text: '200 W+',
        },
      ],
    },
  ];

  return data;
}

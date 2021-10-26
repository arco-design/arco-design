import React from 'react';
import LogoDesignLab from '../../assets/logo_DesignLab.svg';
import VolcEngineLogo from '../../assets/showcase/logo_volc_engine.svg';
import VolcEngineLogoDark from '../../assets/showcase/logo_volc_engine_dark.svg';
import ToutiaoLogo from '../../assets/showcase/logo_toutiao.svg';
import ToutiaoLogoDark from '../../assets/showcase/logo_toutiao_dark.svg';
import VolcEngineFeilianLogo from '../../assets/showcase/logo_volc_engine_feilian.svg';
import VolcEngineFeilianLogoDark from '../../assets/showcase/logo_volc_engine_feilian_dark.svg';
import VolcEngineTranslateLogo from '../../assets/showcase/logo_volc_engine_translate.svg';
import VolcEngineTranslateLogoDark from '../../assets/showcase/logo_volc_engine_translate_dark.svg';
import VolcLiveLogo from '../../assets/showcase/logo_volc_live.svg';
import VolcLiveLogoDark from '../../assets/showcase/logo_volc_live_dark.svg';
import volcEngineImg from '../../assets/showcase/volc_engine.png';
import volcEngineTranslateImg from '../../assets/showcase/volc_engine_translate.png';
import volcEngineFeilianImg from '../../assets/showcase/volc_engine_feilian.png';
import volcLiveImg from '../../assets/showcase/volc_live.png';
import toutiaoImg from '../../assets/showcase/tou_tiao.png';
import { ShowCaseCardProps } from './components/Card';
import { linkDesignLab } from '../../constant/links';
import useTheme from '../../hooks/useTheme';

export default function useShowcaseData() {
  const { realTheme } = useTheme();
  const isDark = realTheme === 'dark';
  const data: ShowCaseCardProps[] = [
    {
      logo: isDark ? <VolcEngineLogoDark /> : <VolcEngineLogo />,
      content: (
        <div>
          通过<mark>arco风格配置平台</mark>和<mark>IconBox图标平台</mark>
          ，智能生成适合多种业务需求的个性化主题包，助力火山引擎提升各产品线体验一致性，使其更好的为企业提供系统化全链路解决方案服务。
        </div>
      ),
      image: volcEngineImg,
      data: {
        label: '控制台产品接入',
        text: '100 w+',
      },
      link: {
        name: 'DesignLab',
        logo: <LogoDesignLab />,
        href: linkDesignLab,
      },
    },
    {
      logo: isDark ? <ToutiaoLogoDark /> : <ToutiaoLogo />,
      content: (
        <div>
          使用<mark>arco灵活丰富的组件资源</mark>
          ，今日头条快速搭建自媒体平台头条号，为创作者提供创作发布、数据分析、收益分析等多场景实用功能。
        </div>
      ),
      data: {
        label: '服务用户数',
        text: '180 w+',
      },
      image: toutiaoImg,
    },
    {
      logo: isDark ? <VolcEngineFeilianLogoDark /> : <VolcEngineFeilianLogo />,
      content: (
        <div>
          基于<mark>arco年轻化的色彩</mark>和<mark>组件设计</mark>
          ，帮助飞连减弱严肃安全办公产品的冰冷感，拉近产品与用户之间的距离，在实现办公网络与终端持续安全的同时给用户提供更加轻盈的使用体验。
        </div>
      ),
      data: {
        label: '飞连整体体验评分',
        text: '8.93/10',
      },
      image: volcEngineFeilianImg,
    },
    {
      logo: isDark ? <VolcEngineTranslateLogoDark /> : <VolcEngineTranslateLogo />,
      content: (
        <div>
          使用<mark>arco自有的图标及品牌资源</mark>
          ，火山翻译在短时间内完成了官网落地页的设计工作，多样的视觉内容帮助聚焦用户关注，引流平台提供的多语言翻译服务。
        </div>
      ),
      image: volcEngineTranslateImg,
    },
    {
      logo: isDark ? <VolcLiveLogoDark /> : <VolcLiveLogo />,
      content: (
        <div>
          基于arco<mark>多样的页面布局</mark>及<mark>样式设置能力</mark>
          ，企业直播为用户提供0开发自定义直播间搭建功能，为营销卖货、教育培训和招聘宣讲等提供多端多场景的直播服务。
        </div>
      ),
      image: volcLiveImg,
    },
  ];

  return data;
}

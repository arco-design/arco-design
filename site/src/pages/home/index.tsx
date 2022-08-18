import React from 'react';
import Footer from '@arco-materials/site-footer';
import Banner from './sections/Banner';
import QuickStart from './sections/QuickStart';
import Ecosystem from './sections/Ecosystem';
import Teams from './sections/Teams';
import './style/index.less'; // 全局样式
import useHomeContext from './hooks/useHomeContext';
import SectionResource from './sections/Resource';
import ShowCase from './sections/ShowCase';
import cs from './utils/classNames';

export default function App() {
  const { lang } = useHomeContext();

  return (
    <div
      id="home"
      className={cs({
        'home-arco-lang': lang === 'en-US',
      })}
    >
      <Banner />
      <SectionResource />
      <Ecosystem />
      <ShowCase />
      <Teams />
      <QuickStart />
      <Footer lang={lang} larkGroup />
    </div>
  );
}

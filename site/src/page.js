import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { BackTop, Button } from '@arco-design/web-react';
import { IconUp, IconLeft } from '@arco-design/web-react/icon';
import Footer from '@arco-materials/site-footer';
import { useHistory } from 'react-router-dom';
import getRoutes from './routes';
import WidgetMenu from './widget/Menu';
import WidgetBody from './widget/Body';
import DocAnchor from './widget/Anchor';
import ThemeBox from './widget/ThemeBox';
import { GlobalContext, GlobalNoticeContext } from './context';

const noAnchorPaths = [
  '/react',
  '/react/en-US',
  '/react/docs/overview',
  '/react/en-US/docs/overview',
  '/react/docs/changelog',
  '/react/en-US/docs/changelog',
];

function Components() {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [anchorCollapse, setAnchorCollapse] = useState(window.innerWidth <= 1440);

  const noAnchor = noAnchorPaths.indexOf(location.pathname) > -1;

  const history = useHistory();

  const { lang, locale } = useContext(GlobalContext);
  const routes = useMemo(() => getRoutes(lang, locale), [lang, locale]);
  const { noticeHeight } = useContext(GlobalNoticeContext);

  const onResize = useCallback(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1200 && !anchorCollapse) {
      setAnchorCollapse(true);
    }
    if (windowWidth > 1440 && anchorCollapse) {
      setAnchorCollapse(false);
    }
  }, [anchorCollapse]);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize, history]);

  return (
    <div id="page">
      <div className="arco-page">
        <WidgetMenu menuCollapse={menuCollapse} routes={routes} lang={lang} />
        {menuCollapse && <div className="ac-menu-holder" />}
        <Button
          className={`ac-menu-collapse-btn ${menuCollapse ? 'ac-menu-collapse-btn-close' : ''}`}
          icon={<IconLeft />}
          shape="circle"
          size="mini"
          onClick={() => {
            setMenuCollapse(!menuCollapse);
          }}
          aria-label="menu collapse button"
        />
        <div className="content-wrapper" style={{ marginTop: `${noticeHeight}px` }}>
          <WidgetBody lang={lang} routes={routes} />
          <Footer style={{ marginTop: 100 }} lang={lang} larkGroup />
        </div>
        {!noAnchor && (
          <div
            className={`ac-anchor-layout-holder ${
              anchorCollapse ? 'ac-anchor-layout-holder-close' : ''
            }`}
          >
            <DocAnchor lang={lang} />
          </div>
        )}
        {!noAnchor && (
          <Button
            className={`ac-anchor-collapse-btn ${
              anchorCollapse ? 'ac-anchor-collapse-btn-close' : ''
            }`}
            icon={<IconLeft />}
            shape="circle"
            size="large"
            onClick={() => {
              setAnchorCollapse(!anchorCollapse);
            }}
            aria-label="anchor collapse button"
          />
        )}
      </div>
      <ThemeBox lang={lang} />
      <BackTop style={{ right: 70, bottom: 80 }}>
        <Button shape="circle" size="large" className="ac-backtop-btn">
          <IconUp />
        </Button>
      </BackTop>
    </div>
  );
}

export default Components;

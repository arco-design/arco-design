import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@arco-materials/site-navbar-new';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import App from './App';
import ScrollToTop from './widget/scrollTop';
import { GlobalContext, GlobalNoticeContext } from './context';
import tea from './utils/tea';
import locale from './locale/zh';
import './style/index.less';
import { isProduction } from './utils/env';
import { registerServiceWorker } from './serviceWorkerRegistration';

const requestDomain = isProduction ? `//${location.hostname}` : '//localhost:3000';

export function Index() {
  const arcoDirection = localStorage.getItem('arco-direction');
  const [user, setUser] = useState();
  const [noticeHeight, setNoticeHeight] = useState(0);
  const [rtl, setRtl] = useState(arcoDirection === 'rtl');

  async function getUser() {
    try {
      const { data } = await axios.get(`${requestDomain}/common/api/auth/userInfo`, {
        withCredentials: true,
      });
      setUser(data.result);
    } catch (err) {}
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    localStorage.setItem('arco-direction', rtl ? 'rtl' : 'ltr');
    const rootElement = document.querySelector('html');
    if (rtl) {
      rootElement.setAttribute('class', 'rtl');
    } else {
      rootElement.setAttribute('class', '');
    }
  }, [rtl]);

  return (
    <BrowserRouter>
      <Navbar.NavbarThemeProvider>
        <GlobalContext.Provider value={{ lang: 'zh-CN', locale, user, rtl, toggleRtl: setRtl }}>
          <ScrollToTop />
          <ConfigProvider locale={zhCN} rtl={rtl}>
            <GlobalNoticeContext.Provider
              value={{
                noticeHeight,
                setNoticeHeight,
              }}
            >
              <App />
            </GlobalNoticeContext.Provider>
          </ConfigProvider>
        </GlobalContext.Provider>
      </Navbar.NavbarThemeProvider>
    </BrowserRouter>
  );
}

// register service worker on prod
if (isProduction) {
  registerServiceWorker({
    content: '检测到文档内容有更新，是否刷新页面加载最新版本？',
    okText: '确认',
    cancelText: '取消',
  });
}

// Don't render itself if flag is set under which case it will be rendered by its host app
if (typeof process === 'undefined' || process?.env?.RENDER_BY_HOST !== 'true') {
  ReactDOM.render(<Index />, document.getElementById('root'));
}

tea({ name: 'site_components_zh' });

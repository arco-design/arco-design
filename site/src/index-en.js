import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@arco-materials/site-navbar';
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import App from './App';
import ScrollToTop from './widget/scrollTop';
import { GlobalContext, GlobalNoticeContext } from './context';
import locale from './locale/en';
import tea from './utils/tea';
import './style/index.less';
import { registerServiceWorker } from './serviceWorkerRegistration';

import { isProduction } from './utils/env';

const requestDomain = isProduction ? `//${location.hostname}/` : '//localhost:3000';

function Index() {
  const [user, setUser] = useState();
  const [noticeHeight, setNoticeHeight] = useState(0);

  async function getUser() {
    try {
      const { data } = await axios.get(`${requestDomain}/api/auth/userInfo`, {
        withCredentials: true,
      });
      setUser(data.result);
    } catch (err) {}
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar.NavbarThemeProvider>
        <GlobalContext.Provider value={{ lang: 'en-US', locale, user }}>
          <ScrollToTop />
          <ConfigProvider locale={enUS}>
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
    content: 'A new version is available, refresh page to get the latest version？',
    okText: 'Ok',
    cancelText: 'Cancel',
  });
}
ReactDOM.render(<Index />, document.getElementById('root'));

tea({ name: 'site_components_en' });

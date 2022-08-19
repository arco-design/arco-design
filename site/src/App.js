import React, { useContext, useEffect, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Switch as ArcoSwitch } from '@arco-design/web-react';
import Navbar from '@arco-materials/site-navbar';
import {
  PageDurationTracker,
  teaLog,
  ModuleDurationTracker,
  Module,
} from '@arco-materials/site-utils';
import AOS from 'aos';
import Home from './pages/home';
import Customer from './pages/customer';
import page from './page';
import { GlobalContext, GlobalNoticeContext } from './context';
import navbarProps from './utils/navbarProps';
import { goPath, i18nRedirect } from './utils/i18n';
import UserNavbarBorderStyle from './hooks/useNavbarBorderStyle';
import { EventMap } from './pages/home/utils/eventMap';

export default function App() {
  const { lang, user, rtl, toggleRtl } = useContext(GlobalContext);
  const { setNoticeHeight } = useContext(GlobalNoticeContext);
  const history = useHistory();
  const isHome = history.location.pathname === '/';
  const pathRef = useRef(history.location.pathname);
  const navbarBorderStyle = UserNavbarBorderStyle();

  const TrackerRef = useRef();

  const moduleTrackerRef = useRef();

  history.listen((location) => {
    if (location.pathname !== pathRef.current) {
      if (TrackerRef.current) {
        TrackerRef.current.handleReport();
      }
      pathRef.current = location.pathname;
    }
  });

  useEffect(() => {
    i18nRedirect(lang);
  }, [lang]);

  const addTrackerModule = () => {
    if (moduleTrackerRef.current) {
      document.querySelectorAll('[data-tracker-name]').forEach((value) => {
        const name = value.getAttribute('data-tracker-name');
        const module = new Module(value);
        moduleTrackerRef.current.addModule(name, module);
      });
    }
  };

  useEffect(() => {
    TrackerRef.current = new PageDurationTracker((params) => {
      teaLog(EventMap.pageView, { ...params, url_path: pathRef.current });
    });
    TrackerRef.current.init();
    moduleTrackerRef.current = new ModuleDurationTracker((params) => {
      teaLog(EventMap.moduleShow, params);
    });
    addTrackerModule();
    AOS.init({
      once: true,
      easing: 'ease-in-out-custom',
      duration: 700,
    });

    return () => {
      if (TrackerRef.current) {
        TrackerRef.current.handleReport();
        TrackerRef.current = null;
      }

      if (moduleTrackerRef.current) {
        moduleTrackerRef.current.handleReport();
        moduleTrackerRef.current = null;
      }
    };
  }, []);

  return (
    <div id="app">
      <Navbar
        lang={lang}
        onChangeLanguage={(lang) => goPath(lang, true)}
        history={history}
        isHome={isHome}
        style={isHome ? navbarBorderStyle : {}}
        user={user}
        onChangeRtl={(value) => toggleRtl(value === 'rtl')}
        rtl={rtl}
        hideRtl={false}
        {...navbarProps}
      />
      <Navbar.GlobalNotice onHeightChange={setNoticeHeight} lang={lang} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/en-US" exact component={Home} />
        <Route path="/showcase/en-US" component={Customer} />
        <Route path="/showcase" component={Customer} />
        <Route path="*" component={page} />
      </Switch>
    </div>
  );
}

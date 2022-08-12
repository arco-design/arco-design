import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getPath } from '../../utils/i18n';
import NotFound from '../../pages/404';

class Body extends React.PureComponent {
  static propTypes = {
    routes: PropTypes.array,
    lang: PropTypes.string,
  };

  static defaultProps = {
    routes: {},
    lang: 'zh-CN',
  };

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    const { routes, lang } = this.props;
    return (
      <div className="ac-content">
        <Switch>
          {Object.keys(routes).map((group) => {
            const _group = routes[group];
            if (_group.children) {
              const children = Object.keys(_group.children);
              return children.map((child) => {
                const _child = _group.children[child];
                if (_child.items) {
                  return _child.items.map((item) => {
                    const M = item.component;
                    const path = getPath(_group.module, item.path, lang);
                    return <Route key={path} path={path} render={() => <M lang={lang} />} />;
                  });
                }

                const M = _child.component;
                const path = getPath(_group.module, _child.path, lang);
                return <Route key={path} path={path} render={() => <M lang={lang} />} />;
              });
            }
          })}
          <Redirect exact from="/react" to="/react/docs/start" />
          {/* <Redirect from="/docs" to="/docs/spec/introduce" />
          <Redirect from="/docs/spec" to="/docs/spec/introduce" /> */}
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Body;

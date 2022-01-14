import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Menu, Badge } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
import NProgress from 'nprogress';
import { GlobalNoticeContext } from '../../context';
import MenuHeader from '../MenuHeader';
import { getPath } from '../../utils/i18n';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

NProgress.configure({ minimum: 0.4, showSpinner: false });

function getFlattenRoutes(routes) {
  let flattenRoutes = [];
  Object.keys(routes).forEach((routeKey) => {
    const level1 = routes[routeKey];
    Object.keys(level1.children).forEach((level2Key) => {
      const level2 = level1.children[level2Key];
      if (level2.items) {
        flattenRoutes = flattenRoutes.concat(
          level2.items.map((l2) => {
            l2.parentKey = level1.key;
            l2.module = level1.module;
            return l2;
          })
        );
      } else {
        level2.parentKey = level1.key;
        level2.module = level1.module;
        flattenRoutes = flattenRoutes.concat(level2);
      }
    });
  });
  return flattenRoutes;
}

function ACMenu(props) {
  const { routes, style, menuCollapse, lang } = props;
  const { noticeHeight } = useContext(GlobalNoticeContext);
  const flattenRoutes = getFlattenRoutes(routes);
  const pathname = location.pathname;
  const defaultSelectedKeys = [pathname];
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);

  const defaultOpenKeys = useMemo(() => {
    const route = flattenRoutes.find((r) => {
      return getPath(r.module, r.path, lang) === selectedKeys[0];
    });
    return route ? [route.parentKey] : [];
  }, []);

  const history = useHistory();

  useEffect(() => {
    history.listen(({ pathname }) => {
      setSelectedKeys([pathname]);
    });
  }, []);

  function onClickMenuItem(path) {
    const pathArr = path.split('/');
    const prefixArr = lang === 'zh-CN' ? pathArr.slice(0, 2) : pathArr.slice(0, 3);
    const currentRoute = flattenRoutes.find((r) => `${prefixArr.join('/')}/${r.path}` === path);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      NProgress.done();
      setSelectedKeys([path]);
      history.push(path);
    });
  }

  function onClickPrevent(e) {
    if (e.ctrlKey || e.metaKey) {
      e.stopPropagation();
    } else {
      e.preventDefault();
    }
  }

  const width = menuCollapse ? 0 : 260;

  return (
    <div
      className="ac-menu-wrapper"
      style={{ ...style, width, minWidth: width, maxWidth: width, opacity: width === 0 ? 0 : 1 }}
    >
      <div
        id="menu"
        className="ac-menu"
        style={{ left: menuCollapse ? -261 : -1, paddingTop: `${noticeHeight}px` }}
      >
        <MenuHeader />
        <div id="menu-inner" className="ac-menu-inner">
          <Menu
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={selectedKeys}
            autoScrollIntoView
            style={{ width: 260 }}
            onClickMenuItem={onClickMenuItem}
          >
            {routes.map((group) => {
              if (group.children) {
                return (
                  <SubMenu key={group.key} title={group.name} className="title-1">
                    {group.children.map((child) => {
                      if (child.items) {
                        return (
                          <MenuItemGroup key={child.key} title={child.name}>
                            {child.items.map((item) =>
                              !item.hide ? (
                                <MenuItem key={getPath(group.module, item.path, lang)}>
                                  <a
                                    href={getPath(group.module, item.path, lang)}
                                    onClick={onClickPrevent}
                                  >
                                    {item.new ? (
                                      <Badge style={{ display: 'inline' }} count={1} dot>
                                        <span>{item.name}</span>
                                      </Badge>
                                    ) : (
                                      item.name
                                    )}
                                  </a>
                                </MenuItem>
                              ) : null
                            )}
                          </MenuItemGroup>
                        );
                      }
                      return (
                        !child.hide && (
                          <MenuItem key={getPath(group.module, child.path, lang)}>
                            <a
                              href={getPath(group.module, child.path, lang)}
                              onClick={onClickPrevent}
                            >
                              {child.new ? (
                                <Badge style={{ display: 'inline' }} count={1} dot>
                                  <span>{child.name}</span>
                                </Badge>
                              ) : (
                                child.name
                              )}
                            </a>
                          </MenuItem>
                        )
                      );
                    })}
                  </SubMenu>
                );
              }
              return (
                <MenuItem key={getPath(group.module, child.path, lang)}>
                  <a href={getPath(group.module, child.path, lang)} onClick={onClickPrevent}>
                    {group.new ? (
                      <Badge style={{ display: 'inline' }} count={1} dot>
                        <span>{group.name}</span>
                      </Badge>
                    ) : (
                      group.name
                    )}
                  </a>
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default ACMenu;

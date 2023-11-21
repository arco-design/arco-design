import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Menu, Grid, Tag } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
import NProgress from 'nprogress';
import cs from 'classnames';
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
    setSelectedKeys([pathname]);
  }, [pathname]);

  function onClickMenuItem(path) {
    const pathArr = path.split('/');
    const prefixArr = lang === 'zh-CN' ? pathArr.slice(0, 2) : pathArr.slice(0, 3);
    const currentRoute = flattenRoutes.find((r) => `${prefixArr.join('/')}/${r.path}` === path);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      NProgress.done();
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

  return (
    <div
      className={cs('ac-menu-wrapper', {
        'ac-menu-wrapper-collapsed': menuCollapse,
      })}
      style={style}
    >
      <div id="menu" className="ac-menu" style={{ paddingTop: `${noticeHeight}px` }}>
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
                return group.hide ? null : (
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
                                    // Menuitem and Link will repeat TAB
                                    tabIndex={-1}
                                    onClick={onClickPrevent}
                                    className="menu-link"
                                  >
                                    <span>{item.name}</span>

                                    {item.new && (
                                      <Tag color="green" size="small" style={{ marginLeft: 12 }}>
                                        new
                                      </Tag>
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
                              tabIndex={-1}
                              className="menu-link"
                            >
                              <span>{child.name}</span>

                              {child.new && (
                                <Tag color="green" size="small" style={{ marginLeft: 12 }}>
                                  new
                                </Tag>
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
                  <a
                    href={getPath(group.module, child.path, lang)}
                    onClick={onClickPrevent}
                    tabIndex={-1}
                    className="menu-link"
                  >
                    <span>{group.name}</span>

                    {group.new && (
                      <Tag color="green" size="small" style={{ marginLeft: 12 }}>
                        new
                      </Tag>
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

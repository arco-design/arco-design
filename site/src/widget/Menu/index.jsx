import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Menu, Tag } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
import NProgress from 'nprogress';
import cs from 'classnames';
import { GlobalNoticeContext } from '../../context';
import MenuHeader from '../MenuHeader';
import { getPath } from '../../utils/i18n';
import { getFlattenRoutes } from '../../routes';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;

NProgress.configure({ minimum: 0.4, showSpinner: false });

function ACMenu(props) {
  const { routes, style, menuCollapse, lang } = props;
  const { noticeHeight } = useContext(GlobalNoticeContext);
  const flattenRoutes = getFlattenRoutes(routes);
  const pathname = location.pathname;
  const defaultSelectedKeys = [pathname];
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);

  const defaultOpenKeys = useMemo(() => {
    console.log(flattenRoutes);
    const route = flattenRoutes.find((r) => {
      return getPath(r.module, r.path, lang) === selectedKeys[0];
    });
    return route ? [route.parentKey, ...route.path.split('/')] : [];
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

  const renderMenuItems = (routes, parentGroup) => {
    const renderMenuItem = (item, parent) => {
      return (
        <MenuItem key={getPath(parent.module, item.path, lang)}>
          <a
            href={getPath(parent.module, item.path, lang)}
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
      );
    };

    return routes.map((group) => {
      if (group.children) {
        return group.hide ? null : (
          <SubMenu key={group.key} title={group.name} className="title-1">
            {group.children.map((child) => {
              if (child.items) {
                return (
                  <MenuItemGroup key={child.key} title={child.name}>
                    {child.items.map((item) => (!item.hide ? renderMenuItem(item, group) : null))}
                  </MenuItemGroup>
                );
              }
              return !child.hide && child.children
                ? renderMenuItems([child], child)
                : renderMenuItem(child, group);
            })}
          </SubMenu>
        );
      }
      return renderMenuItem(group, parentGroup);
    });
  };

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
            {renderMenuItems(routes)}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default ACMenu;

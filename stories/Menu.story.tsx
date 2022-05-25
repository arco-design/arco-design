/* eslint-disable no-console */
import React, { useState } from 'react';
import { Menu, Button } from '@self';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function VerticalDemo() {
  const [data, setData] = useState(new Array(2).fill(new Array(3).fill(null)));
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const addItems = () => {
    setData(data.concat([new Array(2).fill(new Array(2).fill(new Array(2).fill(null)))]));
  };

  const renderMenu = (item = data, subMenuKeyPrefix = 'submenu', itemKeyPrefix = 'menu_item') => {
    if (Array.isArray(item)) {
      return (
        <SubMenu
          key={`${subMenuKeyPrefix}`}
          title={`${subMenuKeyPrefix}`}
          popup={(level) => level > 2}
        >
          {item.map((innerItem, index) => {
            return renderMenu(
              innerItem,
              `${subMenuKeyPrefix}_${index}`,
              `${itemKeyPrefix}_${index}`
            );
          })}
        </SubMenu>
      );
    }

    return <MenuItem key={`${itemKeyPrefix}`}>{`${itemKeyPrefix}`}</MenuItem>;
  };

  return (
    <>
      <Button onClick={addItems}>Add Items</Button>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</Button>
      <div style={{ height: 400, margin: '20px 0' }}>
        <Menu
          style={{ width: 220, height: '100%' }}
          theme={theme}
          autoOpen
          autoScrollIntoView
          hasCollapseButton
          defaultSelectedKeys={['menu_item_3_1']}
          onClickMenuItem={(...args) => {
            console.log('...menuitem', args);
          }}
          onClickSubMenu={(...args) => {
            console.log('...submenu', args);
          }}
          onCollapseChange={(v) => console.log(v)}
        >
          {renderMenu()}
        </Menu>
      </div>
    </>
  );
}

function HorizontalDemo() {
  const [data, setData] = useState(new Array(10).fill(null));
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const addItems = () => {
    setData(data.concat(new Array(1).fill(null)));
  };
  return (
    <>
      <Button onClick={addItems}>Add Items</Button>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</Button>
      <Menu mode="horizontal" theme={theme}>
        {data.map((_, index) => (
          <MenuItem key={`${index}`}>Menu Item {index}</MenuItem>
        ))}
      </Menu>
    </>
  );
}

export const Vertical = () => <VerticalDemo />;

export const Horizontal = () => <HorizontalDemo />;

export default {
  title: 'Menu',
};

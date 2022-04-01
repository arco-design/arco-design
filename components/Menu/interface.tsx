import React, { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import { TriggerProps } from '../Trigger';
import { TooltipProps } from '../Tooltip';

/**
 * @title Menu
 */
export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children?: ReactNode;
  style?: CSSProperties;
  prefixCls?: string;
  className?: string | string[];
  isMenu?: boolean;
  inDropdown?: boolean;

  /**
   * @zh 菜单风格
   * @en Theme of Menu
   * @defaultValue light
   */
  theme?: 'light' | 'dark';
  /**
   * @zh 菜单类型，目前支持垂直（vertical）、水平菜单（horizontal）、弹出（pop）
   * @en Mode of Menu
   * @defaultValue vertical
   */
  mode?: 'vertical' | 'horizontal' | 'pop' | 'popButton';
  /**
   * @zh 层级之间的缩进量
   * @en Indentation between levels
   */
  levelIndent?: number;
  /**
   * @zh 用于定制图标
   * @en Customize icons
   */
  icons?: {
    horizontalArrowDown?: ReactNode | null;
    popArrowRight?: ReactNode | null;
    collapseDefault?: ReactNode | null;
    collapseActive?: ReactNode | null;
  };
  /**
   * @zh 默认展开所有多级菜单
   * @en Whether to expand all multi-level menus by default
   */
  autoOpen?: boolean;
  /**
   * @zh 是否水平折叠收起菜单
   * @en Whether to collapse the menu horizontally
   */
  collapse?: boolean;
  /**
   * @zh 开启手风琴效果
   * @en Whether to render as Accordion
   */
  accordion?: boolean;
  /**
   * @zh 菜单选项是否可选
   * @en Whether is the menu item selectable
   * @defaultValue true
   */
  selectable?: boolean;
  /**
   * @zh 水平菜单是否自动溢出省略
   * @en Whether the horizontal menu automatically collapses when it overflows
   * @defaultValue true
   * @version 2.24.0
   */
  ellipsis?: boolean;
  /**
   * @zh 是否自动滚动选中项目到可见区域
   * @en Whether to automatically scroll the selected item to the visible area
   */
  autoScrollIntoView?: boolean;
  /**
   * @zh 是否内置折叠按钮
   * @en Whether built-in folding button
   */
  hasCollapseButton?: boolean;

  /**
   * @zh 初始选中的菜单项 key 数组
   * @en The initially selected menu item's key array
   */
  defaultSelectedKeys?: string[];
  /**
   * @zh 初始展开的子菜单 key 数组
   * @en The initially opened menu item's key array
   */
  defaultOpenKeys?: string[];
  /**
   * @zh 选中的菜单项 key 数组（受控模式）
   * @en Selected menu item's key array
   */
  selectedKeys?: string[];
  /**
   * @zh 展开的子菜单 key 数组（受控模式）
   * @en Opened menu item's key array
   */
  openKeys?: string[];
  /**
   * @zh 点击菜单项的回调
   * @en Click menu item callback
   * @version `event` in 2.15.0, `keyPath` in 2.19.0
   */
  // Do NOT change 'any' to 'void'. Allow to customize the behavior by the return value of `onClickMenuItem` in Dropdown
  onClickMenuItem?: (key: string, event, keyPath: string[]) => any;
  /**
   * @zh 点击子菜单标题的回调
   * @en Callback when click sub menu
   * @version `keyPath` in 2.19.0
   */
  onClickSubMenu?: (key: string, openKeys: string[], keyPath: string[]) => void;
  /**
   * @zh 折叠状态改变时的回调
   * @en Callback when menu collapse status changed
   */
  onCollapseChange?: (collapse: boolean) => void;

  /**
   * @zh
   * 滚动到可见区域的配置项，接收所有[scroll-into-view-if-needed](https://github.com/stipsan/scroll-into-view-if-needed)的参数
   * @en
   * Scroll to the configuration item in the visible area and receive all the parameters of
   * [scroll-into-view-if-needed](https://github.com/stipsan/scroll-into-view-if-needed)
   */
  scrollConfig?: { [key: string]: any };
  /**
   * @zh 弹出模式下可接受所有 `Trigger` 的 `Props`
   * @en Pass all `Trigger` component properties
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 弹出模式下可接受所有 `ToolTip` 的 `Props`
   * @en Pass all `Tooltip` component properties
   */
  tooltipProps?: Partial<TooltipProps>;
}

/**
 * @title Menu.SubMenu
 */
export interface MenuSubMenuProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  level?: number;
  // props key
  _key?: string;
  /**
   * @zh 子菜单的标题
   * @en Title of the subMenu
   */
  title?: string | ReactNode;
  /**
   * @zh 唯一标志
   * @en Unique ID of the subMenu
   */
  key: string;
  /**
   * @zh 是否将多级菜单头也作为一个菜单项，支持点击选中等状态。
   * @en Whether to use the subMenu header as a menu item which can be selected
   */
  selectable?: boolean;
  /**
   * @zh 是否强制使用弹出模式，`level` 表示当前子菜单的层级
   * @en Whether to force the use of popup mode, parameter `level` indicates the level of current subMenu.
   * @version 2.8.0
   */
  popup?: boolean | ((level: number) => boolean);
  /**
   * @zh 弹出模式下可接受所有 `Trigger` 的 `Props`
   * @en Pass all `Trigger` component properties
   * @version 2.19.0
   */
  triggerProps?: Partial<TriggerProps>;
}

/**
 * @title Menu.ItemGroup
 */
export interface MenuItemGroupProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  level?: number;
  // props key
  _key?: string;
  /**
   * @zh 菜单组的标题
   * @en Title of the menu item group
   */
  title?: string | ReactNode;
}

/**
 * @title Menu.Item
 */
export interface MenuItemProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  level?: number;
  // props key
  _key?: string;
  onClick?: (e) => void;
  /**
   * @zh 唯一标志
   * @en Unique ID of the menu item
   */
  key: string;
  /**
   * @zh 菜单项禁止选中
   * @en Whether the item is disabled
   */
  disabled?: boolean;
  /**
   * @zh 配置最外层标签，可以是 html 标签或是组件
   * @en Configure the outermost label, which can be an html label or a component
   * @defaultValue div
   * @version 2.16.0
   */
  wrapper?: string | React.FC<any> | React.ComponentClass<any>;
}

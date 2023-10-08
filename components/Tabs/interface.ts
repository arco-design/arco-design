import { CSSProperties, ReactNode, ReactElement } from 'react';
import TabHeader from './tab-header/index';

/**
 * @title Tabs
 */
export interface TabsProps {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
  /**
   * @zh 默认选中的标签选项卡，如不指定默认选择第一个
   * @en The Tab selected by default. If not specified, the first one is selected
   */
  defaultActiveTab?: string;
  /**
   * @zh 当前选中的 tab 的 key
   * @en The key of the currently selected tab
   */
  activeTab?: string;
  /**
   * @zh 是否开启过渡效果
   * @en Whether to turn on the transition animation
   */
  animation?: boolean | { tabPane?: boolean; inkBar?: boolean };
  /**
   * @zh 选项卡位置
   * @en Position of tabs
   * @defaultValue top
   */
  tabPosition?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * @zh 标签选项卡的方向是水平还是竖直，分别对应 `horizontal `和 `vertical`。** 注意： 已废弃，使用 tabPosition 替代。**
   * @en The Direction of tabs. ** Warn: Please use `tabPosition` instead.**
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @zh 有四个尺寸供选择，分别为`mini`, `small`, `default`, `large`
   * @en Size of tabs
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 标签选项卡的类型
   * @en Type of tabs
   * @defaultValue line
   */
  type?: 'line' | 'card' | 'card-gutter' | 'text' | 'rounded' | 'capsule';
  /**
   * @zh 定制下划线尺寸
   * @en custom the size of underline
   * @version 2.54.0
   */
  inkBarSize?: { width?: CSSProperties['width']; height?: CSSProperties['height'] };
  /**
   * @zh 选项卡头部是否存在水平边距。仅对 `type`等于 `line`、`text`类型的选项卡生效
   * @en Whether there is a horizontal margin on the tab. It only effect when `type` is `line` or `text`
   * @defaultValue true
   * @version 2.6.0
   */
  headerPadding?: boolean;
  /**
   * @zh 标签页较多时候，选择滚动/下拉菜单形式展示 tab
   * @en When there are too many tabs, select scroll or drop-down to display tabs
   * @defaultValue scroll
   */
  overflow?: 'scroll' | 'dropdown';
  /**
   * @zh 是否允许增减标签。只在 `type` 为 `card` 或 `card-gutter` 时候生效。
   * @en Whether to allow adding or subtracting tabs. It only effect when `type` is `card` or `card-gutter`.
   */
  editable?: boolean;
  /**
   * @zh 是否显示新增按钮（仅在`editable`为`true`时生效）
   * @en Whether to show the new button(Only effect when `editable` is `true`)
   * @defaultValue true
   */
  showAddButton?: boolean;
  /**
   * @zh 标签页头部 编辑/滚动/下拉 图标配置。对于不想展示的图标可以将其设置为`null`
   * @en Tab header edit/scroll/dropdown icon configuration. You can set it to `null` for icons you don't want to display
   * @version 2.15.0, `prev`,`next`,`dropdown` in `2.47.0`
   */
  icons?: {
    add?: ReactNode;
    delete?: ReactNode;
    prev?: ReactNode;
    next?: ReactNode;
    dropdown?: ReactNode;
  };
  /**
   * @zh 是否在标签增减后，自动进行滚动调整(`editable`为`true`时生效）
   * @en Whether to automatically scroll to the selected label after the label is dynamically increased or decreased (only effective when `editable` is `true`)
   * @defaultValue { add: true, delete: true }
   * @version 2.25.0
   */
  scrollAfterEdit?: {
    delete?: boolean;
    add?: boolean;
  };
  /**
   * @zh 显示在标签页右侧的附加
   * @en Additional on the right side of the tab
   */
  extra?: ReactNode;
  /**
   * @zh 是否销毁隐藏标签页的节点, `TabPane` 的该属性优先级高于 `Tabs`。
   * @en Whether to destroy the DOM structure in the TabPane when the tab is hidden. This attribute of `TabPane` has higher priority than `Tabs`.
   */
  destroyOnHide?: boolean;
  /**
   * @zh 设置为 `true` 时，将不会在组件挂载的时候渲染被隐藏的标签页。
   * @en When set to `true`, hidden tabs will not be rendered when the component is mounted.
   * @defaultValue true
   */
  lazyload?: boolean;
  /**
   * @zh 高度撑满容器，只在水平模式下生效。（默认的高度是又撑起的。）
   * @en Height to fill the container, Only effective in horizontal mode.
   */
  justify?: boolean;
  /**
   * @zh 自定义删除按钮
   * @en Custom delete button
   * @version 2.16.0
   */
  deleteButton?: ReactNode;
  /**
   * @zh 自定义新增按钮
   * @en Custom add button
   * @version 2.16.0
   */
  addButton?: ReactNode;
  /**
   * @zh 被选中 tab 的滚动位置，默认 auto 即会将 activeTab 滚动到可见区域，但不会特意做位置调整
   * @en The scroll position of the selected tab, the default auto will scroll the activeTab to the visible area, but will not adjust the position intentionally
   * @version 2.25.0
   * @defaultValue auto
   */
  scrollPosition?: 'start' | 'end' | 'center' | 'auto' | number;
  /**
   * @zh `activeTab` 改变的回调
   * @en Callback when `activeTab` changed
   */
  onChange?: (key: string) => void;
  /**
   * @zh 点击选项卡的回调
   * @en Callback when click Tab
   */
  onClickTab?: (key: string) => void;
  /**
   * @zh 点击新增 tab 按钮的回调
   * @en Callback when click Add Button
   */
  onAddTab?: () => void;
  /**
   * @zh 点击删除按钮的回调
   * @en Callback when click Delete Button
   */
  onDeleteTab?: (key: string) => void;
  /**
   * @zh 自定义选项卡头部
   * @en Custom Tab Header
   */
  renderTabHeader?: (tabProps: TabsProps, DefaultTabHeader: typeof TabHeader) => ReactElement;
  /**
   * @zh 自定义单个选项卡头部
   * @en Customize tab header
   */
  renderTabTitle?: (
    tabTitle: ReactNode,
    info: {
      key: string | number;
      isActive: boolean;
      disabled: boolean;
      editable: boolean;
    }
  ) => ReactNode;
}

/**
 * @title Tabs.TabPane
 */
export interface TabPaneProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 选项卡的标题显示
   * @en The title of Tab
   */
  title: string | ReactNode;
  /**
   * @zh
   * 选项卡隐藏的时候是否销毁标签页内的DOM结构，优先级高于 `Tabs` 的 `destroyOnHide` 属性
   * @en
   * Whether to destroy the DOM structure in the TabPane when the tab is hidden.
   * This option has priority over the `destroyOnHide` property of `Tabs`
   */
  destroyOnHide?: boolean;
  /**
   * @zh 是否禁用
   * @en Whether the TabPane is disabled
   */
  disabled?: boolean;
  /**
   * @zh 动态增减标签页时是否允许关闭当前标签页
   * @en Whether to allow the tab to be closed when `editable="true"`
   */
  closable?: boolean;
  isActive?: boolean;
  lazyload?: boolean;
  children?: ReactNode;
}

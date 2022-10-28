import { CSSProperties, ReactNode } from 'react';

/**
 * @title Collapse
 */
export interface CollapseProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 当前面板选中值
   * @en Key of the active panel
   */
  activeKey?: string | string[];
  /**
   * @zh 默认展开的面板
   * @en Key of the default active panel
   */
  defaultActiveKey?: string | string[];
  /**
   * @zh 是否是手风琴模式
   * @en Whether to render as Accordion
   */
  accordion?: boolean;
  /**
   * @zh 自定义展开图标
   * @en Custom collapse icon
   */
  expandIcon?: ReactNode;
  /**
   * @zh 展开图标的位置
   * @en Position of collapse icon
   * @defaultValue left
   */
  expandIconPosition?: 'left' | 'right';
  /**
   * @zh 无边框样式
   * @en Whether to render border
   * @defaultValue true
   */
  bordered?: boolean;
  /**
   * @zh 设置为 `true` 时，挂载时不会渲染被隐藏的面板。
   * @en If true, invisible panels will not be rendered on mount
   * @defaultValue true
   */
  lazyload?: boolean;
  /**
   * @zh 是否销毁被折叠的面板
   * @en If true, panels will be unmounted on collapsing
   */
  destroyOnHide?: boolean;
  /**
   * @zh 可触发折叠操作的区域
   * @en The area that can trigger the collapse operation
   * @version 2.41.0
   */
  triggerRegion?: 'header' | 'icon';
  /**
   * @zh 展开面板改变时触发
   * @en Callback when the active panel changes
   */
  onChange?: (key: string, keys: string[], e) => void;
}

/**
 * @title Collapse.Item
 */
export interface CollapseItemProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 内容区域的附加样式。
   * @en Additional styles of the content area.
   * @version 2.15.0
   */
  contentStyle?: CSSProperties;
  /**
   * @zh 折叠面板头部内容，允许自定义
   * @en Header content
   */
  header?: ReactNode;
  /**
   * @zh 对应 activeKey，当前面板组件的的唯一标识
   * @en Unique identifier key of the current panel item
   */
  name: string;
  /**
   * @zh 是否禁用
   * @en If true, the panel is not collapsible
   */
  disabled?: boolean;
  /**
   * @zh 自定义展开图标
   * @en Custom expand icon
   */
  expandIcon?: ReactNode;
  /**
   * @zh 是否展示展开按钮
   * @en Whether to show expand icon
   * @defaultValue true
   */
  showExpandIcon?: boolean;
  /**
   * @zh 额外节点
   * @en The extra element in the corner
   */
  extra?: ReactNode;
  /**
   * @zh 面板被折叠时是否销毁节点，优先级高于 `Collapse` 的 `destroyOnHide`
   * @en If true, item will be unmounted on collapsing. (Higher priority than `Collapse.destroyOnHide`)
   */
  destroyOnHide?: boolean;
}

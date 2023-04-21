import { CSSProperties, ReactNode, HTMLAttributes } from 'react';

/**
 * @title Tag
 */
export interface TagProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'ref'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 设置标签背景颜色
   * @en The background color of Tag
   */
  color?: string;
  /**
   * @zh 是否显示边框
   * @en Whether the tag is bordered
   * @version 2.26.0
   */
  bordered?: Boolean;
  /**
   * @zh 标签尺寸
   * @en The size of Tag
   * @defaultValue default
   */
  size?: 'small' | 'default' | 'medium' | 'large';
  /**
   * @zh 设置标签显示隐藏
   * @en Whether the Tag is visible
   */
  visible?: boolean;
  /**
   * @zh 是否可关闭标签
   * @en Whether the Tag is closable
   */
  closable?: boolean;
  /**
   * @zh 是否支持选中
   * @en Whether the Tag is checkable
   */
  checkable?: boolean;
  /**
   * @zh 是否默认选中
   * @en Initial checked state
   */
  defaultChecked?: boolean;
  /**
   * @zh 是否选中（受控模式）
   * @en Used for setting the currently selected value(Controlled Component)
   */
  checked?: boolean;
  /**
   * @zh 设置图标
   * @en Set icon
   */
  icon?: ReactNode;
  /**
   * @zh 自定义关闭图标
   * @en Custom Close Icon
   */
  closeIcon?: ReactNode;
  /**
   * @zh 关闭标签回调函数
   * @en Callback when the tag closed
   */
  onClose?: (e) => Promise<any> | void;
  /**
   * @zh 选中的回调
   * @en Callback when checked the tag
   */
  onCheck?: (checked: boolean) => void;
  fill?: boolean; // 防止 1.0 用法报错，无实际作用
  __closeIconProps?: HTMLAttributes<any>;
}

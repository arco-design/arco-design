import { CSSProperties, ReactNode } from 'react';

/**
 * @title Typography
 */
export interface TypographyProps {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
}

export interface OperationsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className'> {
  /**
   * @zh 开启复制功能
   * @en Whether to be copyable
   * @version `onCopy` params `e` in `2.31.0`
   */
  copyable?:
    | boolean
    | {
        text?: string;
        onCopy?: (text: string, e) => void;
        icon?: ReactNode;
        tooltips?: [ReactNode, ReactNode];
      };
  /**
   * @zh 开启可编辑功能
   * @en If editable. Can control edit state when is object
   * @version `onStart` params `e` in `2.31.0`
   */
  editable?:
    | boolean
    | {
        editing?: boolean;
        onStart?: (text, e) => void;
        onChange?: (text) => void;
        onEnd?: (text) => void;
      };
  /**
   * @zh 自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)
   * @en Auto overflow omitted, see [EllipsisConfig](#ellipsisconfig)
   */
  ellipsis?: boolean | EllipsisConfig;
  isEllipsis?: boolean;
  expanding?: boolean;
  onClickExpand?: (e) => void;
  setEditing?: (editing: boolean) => void;
  forceShowExpand?: boolean;
  currentContext: Record<string, any>;
}

export interface CommonProps extends Omit<OperationsProps, 'currentContext'> {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
  /**
   * @zh 文本类型
   * @en Text type
   */
  type?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  /**
   * @zh 粗体
   * @en Bold style
   */
  bold?: boolean;
  /**
   * @zh 禁用状态
   * @en Disabled style
   */
  disabled?: boolean;
  /**
   * @zh 标记样式
   * @en Mark style
   */
  mark?: boolean | { color: string };
  /**
   * @zh 下划线样式
   * @en Underline style
   */
  underline?: boolean;
  /**
   * @zh 删除线样式
   * @en Strikethrough style
   */
  delete?: boolean;
  /**
   * @zh 代码块样式
   * @en Code block style
   */
  code?: boolean;
}

/**
 * @title Typography.Title
 */
export interface TypographyTitleProps extends CommonProps {
  /**
   * @zh 标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6`
   * @en Heading level, equivalent to `h1` `h2` `h3` `h4` `h5` `h6`
   * @defaultValue 1
   */
  heading?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * @title Typography.Paragraph
 */
export interface TypographyParagraphProps extends CommonProps {
  /**
   * @zh 长引用
   * @en Blockquote style
   */
  blockquote?: boolean;
  /**
   * @zh
   * 段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 `close` 紧密的行高。
   * @en
   * The line height of the paragraph. The default line height is recommended for long text (more than 5 lines),
   * and the close line height of `close` is recommended for short text (less than or equal to 3 lines).
   * @defaultValue default
   */
  spacing?: 'default' | 'close';
}

export interface EditContentProps {
  prefixCls?: string;
  children?: ReactNode;
  setEditing?: (editing: boolean) => void;
  editableConfig?: {
    editing?: boolean;
    onStart?: (text, e) => void;
    onChange?: (text) => void;
    onEnd?: (text) => void;
  };
}

/**
 * @title Typography.Text
 */
export type TypographyTextProps = CommonProps;

/**
 * @title EllipsisConfig
 */
export type EllipsisConfig = {
  /**
   * @zh 自动溢出省略（只支持字符串），在大量使用情况下建议开启提高性能。
   * @en Automatic overflow omission (only strings are supported). In the case of simple single-line, css will be used by default to handle ellipsis to avoid complicated calculations.
   * @version `2.36.0` 将默认值改为 `false` 并支持多行CSS省略。
   */
  cssEllipsis?: boolean;
  /**
   * @zh 显示省略的行数
   * @en The number of omitted rows
   * @defaultValue 1
   */
  rows?: number;
  /**
   * @zh 显示展开/折叠按钮
   * @en Whether to support expand
   */
  expandable?: boolean;
  /**
   * @zh 省略号
   * @en ellipsis string
   * @defaultValue ...
   */
  ellipsisStr?: string;
  /**
   * @zh 后缀
   * @en Suffix
   */
  suffix?: string;
  /**
   * @zh 配置 折叠 / 展开 的元素
   * @en Configure expand elements
   */
  expandNodes?: ReactNode[];
  /**
   * @zh 在省略发生改变的时候触发，通常是窗口resize情况会触发。
   * @en Callback when the ellipsis state changes, usually triggered by window resize。
   */
  onEllipsis?: (isEllipsis: boolean) => void;
  /**
   * @zh 在折叠/展开状态发生改变的时候触发，通常是点击折叠/展开按钮触发。
   * @en Callback when the expand state changes, usually triggered by clicking the button
   * @version e in `2.27.0`
   */
  onExpand?: (isExpand: boolean, e) => void;
  /**
   * @zh 配置省略时的弹出框
   * @en Show Tooltip when configure ellipsis
   */
  showTooltip?: boolean | { type?: 'tooltip' | 'popover'; props?: Record<string, any> };
  /**
   * @zh 是否展开
   * @en whether to expand
   * @version `2.33.0`
   */
  expanded?: boolean;
  /**
   * @zh 默认展开
   * @en Default expanded state
   * @version `2.33.0`
   */
  defaultExpanded?: boolean;
  // https://github.com/arco-design/arco-design/issues/1185
  // https://github.com/facebook/react/issues/17256
  // React.Fragment will cause the page to crash in special scenarios
  wrapper?: string | React.FC<any> | React.ComponentClass<any>;
};

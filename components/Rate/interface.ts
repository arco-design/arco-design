import { CSSProperties, ReactNode } from 'react';

/**
 * @title Rate
 */
export interface RateProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 默认值
   * @en To set default value
   */
  defaultValue?: number;
  /**
   * @zh 自定义字符
   * @en The custom character of rate
   * @defaultValue <IconStarFill />
   */
  character?: ReactNode | ((index: number) => ReactNode);
  /**
   * @zh 星的总数
   * @en Star count
   * @defaultValue 5
   */
  count?: number;
  /**
   * @zh 星的个数，受控值
   * @en To set value
   */
  value?: number;
  /**
   * @zh 自定义每一项的提示信息
   * @en Customize tooltip by each character
   */
  tooltips?: string[];
  /**
   * @zh 是否允许半选
   * @en Whether to allow half selection
   */
  allowHalf?: boolean;
  /**
   * @zh 是否允许清除
   * @en Whether to allow clear when click again
   */
  allowClear?: boolean;
  /**
   * @zh 是否只读，不能选择
   * @en Whether is readonly
   */
  readonly?: boolean;
  /**
   * @zh 是否禁用
   * @en Whether is disabled
   */
  disabled?: boolean;
  /**
   * @zh 笑脸分级
   * @en Whether to show score with smiley icon
   */
  grading?: boolean;
  /**
   * @zh 选择时的回调
   * @en Callback when score is changed
   */
  onChange?: (value: number) => void;
  /**
   * @zh 鼠标经过时数值变化的回调
   * @en Callback when the score user hovered is changed
   */
  onHoverChange?: (value: number) => void;
}

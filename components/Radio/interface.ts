import { CSSProperties, ChangeEvent, ReactNode, HTMLAttributes } from 'react';

/**
 * @title Radio
 */
export interface RadioProps<T = any>
  extends Omit<HTMLAttributes<HTMLLabelElement>, 'children' | 'className' | 'onChange'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否禁用
   * @en Whether the radio is disabled
   */
  disabled?: boolean;
  /**
   * @zh 控件的 `value`
   * @en The value of radio
   */
  value?: T;
  /**
   * @zh 是否选中（受控模式）
   * @en Whether the radio is checked (Controlled)
   */
  checked?: boolean;
  /**
   * @zh 初始是否选中
   * @en Whether the radio is initially selected
   */
  defaultChecked?: boolean;
  /**
   * @zh 值变化的回调
   * @en Callback when radio status change
   */
  onChange?: (checked: boolean, event: ChangeEvent) => void;
  children?: ReactNode | ((value: { checked: boolean }) => ReactNode);
}

/**
 * @title Radio.Group
 */
export interface RadioGroupProps {
  style?: CSSProperties;
  className?: string | string[];
  disabled?: boolean;
  /**
   * @zh `Radio` 的 name
   * @en `Radio`'s name attr
   */
  name?: string;
  /**
   * @zh 单选的类型，是单选还是按钮
   * @en type of `Radio`
   * @defaultValue radio
   */
  type?: 'radio' | 'button';
  /**
   * @zh 方向
   * @en Arrangement direction
   * @defaultValue horizontal
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * @zh 按钮类型的单选框尺寸（只在按钮类型下生效）
   * @en The size of radio button style(Only effective under `button` type)
   */
  size?: 'small' | 'default' | 'large' | 'mini';
  mode?: 'outline' | 'fill';
  /**
   * @zh 点击单选的回调
   * @en Callback when radio status change
   */
  onChange?: (value: any, event: ChangeEvent) => void;
  /**
   * @zh 默认选中的值
   * @en To set default value
   */
  defaultValue?: any;
  /**
   * @zh 选中的值（受控模式）
   * @en To set value
   */
  value?: any;
  /**
   * @zh 以数组配置的形式来设置单选组
   * @en Set children options
   */
  options?: (string | number | { label: ReactNode; value: any; disabled?: boolean })[];
}

export interface RadioGroupContextProps {
  type: 'radio' | 'button';
  value?: any;
  disabled?: boolean;
  group?: boolean;
  name?: RadioGroupProps['name'];
  onChangeValue?: (value: any, event: ChangeEvent) => void;
}

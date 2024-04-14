import { ClipboardEvent, MouseEvent, KeyboardEvent } from 'react';

/**
 * @title VerificationCodeOptions
 *
 */
export interface VerificationCodeOptions {
  /**
   * @zh 长度
   * @en length
   */
  length?: number;
  /**
   * @zh 默认值
   * @en The initial input content
   */
  defaultValue?: string;
  /**
   * @zh value
   * @en value
   */
  value?: string;
  /**
   * @zh onChange
   * @en onChange
   */
  onChange?: (value: string) => void;
  /**
   * @zh onFinish
   * @en onFinish
   */
  onFinish?: (value: string) => void;
  /**
   * @zh input list
   * @en input list
   */
  getInputRefList?: () => (HTMLInputElement | HTMLTextAreaElement)[];
}

/**
 * @title VerificationCodeReturnType
 *
 */
export type VerificationCodeReturnType = {
  /**
   * @zh filledValue
   */
  filledValue: VerificationCodeOptions['value'][];
  value: VerificationCodeOptions['value'];
  /**
   * @zh 更新内部 value
   */
  setValue: (v: VerificationCodeOptions['value']) => void;
  /**
   * @zh 获取 input 属性，附加到 input
   */
  getInputProps: (index: number) => {
    key: string | number;
    value: string;
    onClick: (e: MouseEvent) => void;
    onKeyDown: (e: KeyboardEvent) => void;
    onChange: (v: string) => void;
    onPaste: (e: ClipboardEvent) => void;
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// TS泛型默认值需要，忽略显式`any`定义

import { ReactNode, CSSProperties, HTMLAttributes, FormHTMLAttributes } from 'react';
import { Options as ScrollIntoViewOptions } from 'scroll-into-view-if-needed';
import { ColProps } from '../Grid/col';
import Store from './store';

export type IndexedObject = { [key: string]: any };
export type KeyType = string | number | symbol;
export type ComponentType = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export type FieldError<FieldValue = any> = {
  value?: FieldValue;
  message?: ReactNode;
  type?: string;
  requiredError?: boolean;
};

export type ValidateFieldsErrors<FieldValue = any, FieldKey extends KeyType = string> =
  | Record<FieldKey, FieldValue>
  | undefined
  | null;

/**
 * @title Form
 */
export interface FormProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> extends Omit<FormHTMLAttributes<any>, 'className' | 'onChange' | 'onSubmit'> {
  style?: CSSProperties;
  className?: string | string[];
  prefixCls?: string;
  /**
   * @zh form
   * @en form
   */
  form?: FormInstance<FormData, FieldValue, FieldKey>;
  /**
   * @zh 设置后，会作为表单控件 `id`的前缀。
   * @en prefix of `id` attr
   */
  id?: string;
  /**
   * @zh 表单的布局，有三种布局，水平、垂直、多列。
   * @en The layout of Form
   * @defaultValue horizontal
   */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /**
   * @zh 不同尺寸。
   * @en size of form
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh
   * `<label>`标签布局，同[<Grid.Col>](/react/components/grid)组件接收的参数相同，
   * 可以配置`span`和`offset`值，会覆盖全局的`labelCol`设置
   * @en
   * Global `<label>` label layout. Same as the props received by the `<Grid.Col>`,
   * the values of `span` and `offset` can be configured,
   * which will be overwritten by the `labelCol` set by `Form.Item`
   * @defaultValue { span: 5, offset: 0 }
   */
  labelCol?: ColProps;
  /**
   * @zh
   * 控件布局，同`labelCol`的设置方法一致，会覆盖全局的`wrapperCol`设置，[ColProps](/react/components/grid)
   * @en
   * The global control layout, which is the same as the setting method of `labelCol`,
   * will be overwritten by the `wrapperCol` set by `Form.Item`
   * @defaultValue { span: 19, offset: 0 }
   */
  wrapperCol?: ColProps;
  /**
   * @zh 是否在 required 的时候显示加重的红色星号，设置 position 可选择将星号置于 label 前/后
   * @en Whether show red symbol when item is required，Set position props, you can choose to place the symbol before/after the label
   * @defaultValue true
   * @version `position` in 2.24.0
   */
  requiredSymbol?: boolean | { position: 'start' | 'end' };
  /**
   * @zh 标签的文本对齐方式
   * @en Text alignment of `label`
   * @defaultValue right
   */
  labelAlign?: 'left' | 'right';
  /**
   * @zh 设置表单初始值
   * @en Default value of form data
   */
  initialValues?: Partial<FormData>;
  /**
   * @zh 任意表单项值改变时候触发。第一个参数是被改变表单项的值，第二个参数是所有的表单项值
   * @en Callback when any form item value changes.The first is the changed value, and the second is the value of all items
   */
  onValuesChange?: (value: Partial<FormData>, values: Partial<FormData>) => void;
  /**
   * @zh 表单项值改变时候触发。和 onValuesChange 不同的是只会在用户操作表单项时触发
   * @en Callback when the form item value changes. Unlike `onValuesChange`, it will only be called when the user manipulates the form item
   */
  onChange?: (value: Partial<FormData>, values: Partial<FormData>) => void;
  /**
   * @zh 配置最外层标签，可以是 html 标签或是组件
   * @en Custom outer tag. Can be html tags or React components
   * @defaultValue form
   */
  wrapper?: ComponentType;
  /**
   * @zh 配置 `wrapper` 之后，可以传一些参数到 wrapper 上。
   * @en If set `wrapper`, You can pass some parameters to the wrapper.
   */
  wrapperProps?: IndexedObject;
  /**
   * @zh 统一配置表单控件是否可用
   * @en Whether All Form item is disabled
   */
  disabled?: boolean;
  /**
   * @zh 是否显示标签后的一个冒号，优先级小于 `Form.Item` 中 `colon` 的优先级。
   * @en Whether show colon after `label`. Priority is lower than `colon` in `Form.Item`.
   */
  colon?: boolean;
  /**
   * @zh 验证失败后滚动到第一个错误字段。(`ScrollIntoViewOptions` 类型在 `2.19.0` 开始支持)
   * @en Whether scroll to first error item after validation fails. (`ScrollIntoViewOptions` is supported at `2.19.0`)
   */
  scrollToFirstError?: boolean | ScrollIntoViewOptions;
  /**
   * @zh 数据验证成功后回调事件
   * @en Callback when submit data
   */
  onSubmit?: (values: FormData) => void;
  /**
   * @zh 数据验证失败后回调事件
   * @en Callback when validate fail
   * @version 2.21.0
   */
  onSubmitFailed?: (errors: { [key: string]: FieldError }) => void;
}

export interface RulesProps<FieldValue = any> {
  validateTrigger?: string | string[];
  // 校验失败时候以 `error` 或 `warning` 形式展示错误信息。当设置为 `warning` 时不会阻塞表单提交
  validateLevel?: 'error' | 'warning';
  required?: boolean;
  type?: string;
  length?: number;
  // Array
  maxLength?: number;
  minLength?: number;
  includes?: boolean;
  deepEqual?: any;
  empty?: boolean;
  // Number
  min?: number;
  max?: number;
  equal?: number;
  positive?: boolean;
  negative?: boolean;
  // Object
  hasKeys?: string[];
  // String
  match?: RegExp;
  uppercase?: boolean;
  lowercase?: boolean;
  // Boolean
  true?: boolean;
  false?: boolean;
  // custom
  validator?: (value: FieldValue | undefined, callback: (error?: string) => void) => void;
  message?: ReactNode;
}

/**
 * @title Form.Item
 */
export interface FormItemProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> extends Omit<HTMLAttributes<any>, 'className'> {
  style?: CSSProperties;
  className?: string | string[];
  prefixCls?: string;
  store?: FormInstance<FormData, FieldValue, FieldKey>;
  /**
   * @zh 设置控件初始值.(初始值，请不要使用受控组件的defaultValue了)
   * @en Default value
   */
  initialValue?: FieldValue;
  /**
   * @zh 受控组件的唯一标示
   * @en Unique identification of controlled components
   */
  field?: FieldKey;
  /**
   * @zh 标签的文本
   * @en Label text
   */
  label?: ReactNode;
  /**
   * @zh
   * `<label>`标签布局，同[<Grid.Col>](/react/components/grid)组件接收的参数相同，可以配置`span`和`offset`值，会覆盖全局的`labelCol`设置
   * @en
   * The layout of `<label>`, the same as the props received by the `<Grid.Col>`.
   * The values of `span` and `offset` can be configured, which will override the global `labelCol` setting
   */
  labelCol?: ColProps;
  /**
   * @zh 控件布局，同`labelCol`的设置方法一致，会覆盖全局的`wrapperCol`设置，[ColProps](/react/components/grid)
   * @en The control layout, which is the same as the setting method of `labelCol`, which will override the global `wrapperCol` setting
   */
  wrapperCol?: ColProps;
  /**
   * @zh 是否显示标签后的一个冒号
   * @en Whether to add a colon after label
   */
  colon?: boolean;
  /**
   * @zh 是否禁用，优先级高于 `Form` 的 `disabled` 属性
   * @en Whether the FormItem is disabled. Priority is higher than the `disabled` prop of `Form`
   */
  disabled?: boolean;
  /**
   * @zh 受控模式下的验证规则，[RulesProps](#rules)
   * @en Validation rules in controlled component, [RulesProps](#rules)
   */
  rules?: RulesProps<FieldValue>[];
  /**
   * @zh 接管子节点，搜集子节点值的时机。
   * @en When to take over and collecting the child nodes.
   * @defaultValue onChange
   */
  trigger?: string;
  /**
   * @zh 子节点被接管的值的属性名，默认是 `value`,比如 `<Checkbox>` 为 `checked`。
   * @en The attribute name of the child node being taken over, default is `value`, ex, `<Checkbox>` is `checked`.
   * @defaultValue value
   */
  triggerPropName?: string;
  /**
   * @zh 指定在子节点触发`onChange`事件时如何处理值。（如果自定义了`trigger`属性，那么这里的参数就是对应的事件回调函数的参数类型）
   * @en Specify how to handle the value when the child node triggers the `onChange` event. (If the `trigger` attribute is customized, then the parameter here is the parameter type of the corresponding event callback function)
   * @version 2.23.0
   */
  getValueFromEvent?: (...args) => FieldValue;
  /**
   * @zh
   * 触发验证的时机。取值和跟包裹的控件有关系，控件支持的触发事件，都可以作为值。
   * 例如`Input`支持的 `onFocus`、 `onBlur`、 `onChange` 都可以作为 `validateTrigger` 的值。传递为 `[]` 时，
   * 仅会在调用表单 `validate` 方法时执行校验规则。
   * @en
   * When to trigger verification. The value is related to the wrapped item, and all events supported.
   * For example, `onFocus`, `onBlur`, and `onChange` supported by `Input` can be used as the value of `validateTrigger`.
   * When passed as `[]`, the validation rules will only be executed when the form `validate` method is called
   * @defaultValue onChange
   */
  validateTrigger?: string | string[];
  /**
   * @zh
   * 不渲染任何外部标签/样式，只进行字段绑定。**注意**: 设置该属性为true时，该字段若未通过校验，
   * 错误信息将不会显示出来。可以传入对象，并设置 showErrorTip（ `2.5.0` 开始支持） 为true，错误信息将会展示在上层 formItem 节点下。
   * @en
   * No external tags/styles are rendered, only binding field. **Notice**: When set to true, if the field verification failed,
   * the error message will not be displayed. You can pass in an object and set showErrorTip to true(Support at `2.5.0`),
   * The error message will be displayed under the upper formItem node
   */
  noStyle?: boolean | { showErrorTip: boolean };
  /**
   * @zh
   * 是否必选，会在 `label` 标签前显示加重红色符号，如果这里不设置，会从 rules 中寻找是否是 required
   * @en
   * Whether The FormItem is Required, Will display an red symbol in front of the `label` label.
   * If it is not set here, it will look for `required` from the rules
   */
  required?: boolean;
  /**
   * @zh 额外的提示内容。
   * @en Additional hint content.
   */
  extra?: ReactNode;
  /**
   * @zh 校验状态
   * @en Validate status
   */
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  /**
   * @zh 是否显示校验图标，配置 validateStatus 使用。
   * @en Whether to show the verification icon, configure `validateStatus` to use.
   */
  hasFeedback?: boolean;
  /**
   * @zh 自定义校验文案
   * @en Custom help text
   */
  help?: ReactNode;
  /**
   * @zh 将控件的 `value` 进行一定的转换再保存到form中。
   * @en Convert the `value` to the FormItem
   */
  normalize?: (
    value: FieldValue | undefined,
    prevValue: FieldValue | undefined,
    allValues: Partial<FormData>
  ) => any;
  /**
   * @zh 将Form内保存的当前控件对应的值进行一定的转换，再传递给控件。
   * @en Convert the `value` of the FormItem to children;
   * @version 2.23.0
   */
  formatter?: (value: FieldValue | undefined) => any;
  /**
   * @zh 是否在其他控件值改变时候重新渲染当前区域。设置为true时候，表单的任意改变都会重新渲染该区域。
   * @en Whether to re-render when other FormItem value change. When set to true, any changes to the Form will re-render.
   */
  shouldUpdate?:
    | boolean
    | ((
        prevValues: Partial<FormData>,
        currentValues: Partial<FormData>,
        info: {
          isFormList?: boolean;
          field?: FieldKey | FieldKey[];
          isInner?: boolean;
        }
      ) => boolean);
  /**
   * @zh 标签的文本对齐方式，优先级高于 `Form`
   * @en Text alignment of `label`
   * @defaultValue right
   */
  labelAlign?: 'left' | 'right';
  layout?: 'horizontal' | 'vertical' | 'inline';
  requiredSymbol?: boolean | { position: 'start' | 'end' };
  isFormList?: boolean;
}

export interface FormControlProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> {
  /** 受控组件的唯一标示。 */
  field?: FieldKey;
  initialValue?: FieldValue;
  getValueFromEvent?: FormItemProps['getValueFromEvent'];
  rules?: RulesProps<FieldValue>[];
  /** 接管子节点，搜集子节点的时机 */
  trigger?: string;
  /** 子节点被接管的值的属性名，默认是`value`,比如`<Checkbox>`为`checked` */
  triggerPropName?: string;
  /** 触发验证的时机 */
  validateTrigger?: string | string[];
  /** 转换默认的 `value` 给控件。 */
  normalize?: (
    value: FieldValue | undefined,
    prevValue: FieldValue | undefined,
    allValues: Partial<FormData>
  ) => any;
  formatter?: FormItemProps['formatter'];
  onValuesChange?: (value: Partial<FormData>, values: Partial<FormData>) => void;
  noStyle?: boolean;
  shouldUpdate?: FormItemProps['shouldUpdate'];
  disabled?: boolean;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  help?: ReactNode;
  isFormList?: boolean;
  hasFeedback?: boolean;
}

/**
 * @title Form.List
 */
export interface FormListProps<
  SubFieldValue = any,
  SubFieldKey extends KeyType = string,
  FieldKey extends KeyType = string
> {
  /**
   * @zh 字段名
   * @en Field name
   */
  field: FieldKey;
  /**
   * @zh 初始值
   * @en Default value
   * @version 2.22.0
   */
  initialValue?: SubFieldValue[];
  /**
   * @zh 函数类型的 children
   * @en Function type children
   */
  children?: (
    fields: { key: number; field: SubFieldKey }[],
    operation: {
      add: (defaultValue?: SubFieldValue, index?: number) => void;
      remove: (index: number) => void;
      move: (fromIndex: number, toIndex: number) => void;
    }
  ) => React.ReactNode;
}

export type FormContextProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> = Pick<
  FormProps<FormData, FieldValue, FieldKey>,
  | 'prefixCls'
  | 'labelCol'
  | 'wrapperCol'
  | 'requiredSymbol'
  | 'labelAlign'
  | 'disabled'
  | 'colon'
  | 'layout'
> & {
  getFormElementId?: (field: FieldKey) => string;
  store?: FormInstance<FormData, FieldValue, FieldKey>;
};

export type FormItemContextProps<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> = FormContextProps<FormData, FieldValue, FieldKey> & {
  updateFormItem?: (
    field: string,
    params: { errors?: FieldError<FieldValue>; warnings?: ReactNode[] }
  ) => void;
};

export type FormInstance<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> = Pick<
  Store<FormData, FieldValue, FieldKey>,
  | 'getFieldsValue'
  | 'getFieldValue'
  | 'getFieldError'
  | 'getFieldsError'
  | 'getTouchedFields'
  | 'getFields'
  | 'setFieldValue'
  | 'setFieldsValue'
  | 'setFields'
  | 'resetFields'
  | 'submit'
  | 'validate'
> & {
  scrollToField: (field: FieldKey, options?: ScrollIntoViewOptions) => void;
  getInnerMethods: (inner?: boolean) => InnerMethodsReturnType<FormData, FieldValue, FieldKey>;
};

export type InnerMethodsReturnType<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> = Pick<
  Store<FormData, FieldValue, FieldKey>,
  | 'registerField'
  | 'innerSetInitialValues'
  | 'innerSetInitialValue'
  | 'innerSetCallbacks'
  | 'innerSetFieldValue'
  | 'innerGetStore'
>;

export interface FormValidateFn<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> {
  /**
   * 验证所有表单的值，并且返回报错和表单数据
   */
  (): Promise<FormData>;

  /**
   * 验证所有表单的值，并且返回报错和表单数据
   * @param fields 需要校验的表单字段
   */
  (fields: FieldKey[]): Promise<Partial<FormData>>;

  /**
   * 验证所有表单的值，并且返回报错和表单数据
   * @param callback 校验完成后的回调函数
   */
  (
    callback: (errors?: ValidateFieldsErrors<FieldValue, FieldKey>, values?: FormData) => void
  ): void;

  /**
   * 验证所有表单的值，并且返回报错和表单数据
   * @param fields 需要校验的表单字段
   * @param callback 校验完成后的回调函数
   */
  (
    fields: FieldKey[],
    callback: (
      errors?: ValidateFieldsErrors<FieldValue, FieldKey>,
      values?: Partial<FormData>
    ) => void
  ): void;
}

export const VALIDATE_STATUS = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  validating: 'validating',
};

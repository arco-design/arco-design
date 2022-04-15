`````
组件 / 数据输入

# 表单 Form

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。
`````

%%Content%%

## API

### Form

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|form|form|`FormInstance<FormData, FieldValue, FieldKey>`|`-`|-|
|id|设置后，会作为表单控件 `id`的前缀。|`string`|`-`|-|
|layout|表单的布局，有三种布局，水平、垂直、多列。|`'horizontal' \| 'vertical' \| 'inline'`|`horizontal`|-|
|size|不同尺寸。|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|labelCol|`<label>`标签布局，同[<Grid.Col>](/react/components/grid)组件接收的参数相同，可以配置`span`和`offset`值，会覆盖全局的`labelCol`设置|`ColProps`|`{ span: 5, offset: 0 }`|-|
|wrapperCol|控件布局，同`labelCol`的设置方法一致，会覆盖全局的`wrapperCol`设置，[ColProps](/react/components/grid)|`ColProps`|`{ span: 19, offset: 0 }`|-|
|requiredSymbol|是否在 required 的时候显示加重的红色星号，设置 position 可选择将星号置于 label 前/后|`boolean \| { position: 'start' \| 'end' }`|`true`|`position` in 2.24.0|
|labelAlign|标签的文本对齐方式|`'left' \| 'right'`|`right`|-|
|initialValues|设置表单初始值|`Partial<FormData>`|`-`|-|
|validateTrigger|触发验证的时机。|`string \| string[]`|`onChange`|2.28.0|
|onValuesChange|任意表单项值改变时候触发。第一个参数是被改变表单项的值，第二个参数是所有的表单项值|`(value: Partial<FormData>, values: Partial<FormData>) => void`|`-`|-|
|onChange|表单项值改变时候触发。和 onValuesChange 不同的是只会在用户操作表单项时触发|`(value: Partial<FormData>, values: Partial<FormData>) => void`|`-`|-|
|wrapper|配置最外层标签，可以是 html 标签或是组件|`ComponentType`|`form`|-|
|wrapperProps|配置 `wrapper` 之后，可以传一些参数到 wrapper 上。|`IndexedObject`|`-`|-|
|disabled|统一配置表单控件是否可用|`boolean`|`-`|-|
|colon|是否显示标签后的一个冒号，优先级小于 `Form.Item` 中 `colon` 的优先级。|`boolean`|`-`|-|
|scrollToFirstError|验证失败后滚动到第一个错误字段。(`ScrollIntoViewOptions` 类型在 `2.19.0` 开始支持)|`boolean \| ScrollIntoViewOptions`|`-`|-|
|validateMessages|校验提示信息模板 [demo](/react/components/form#表单校验信息模板)|`Partial<{[key in keyof ValidateMessagesTemplateType]: ValidateMessagesTemplateType[key] extends string? ValidateMessagesTemplateType[key]: Record<keyof ValidateMessagesTemplateType[key], (data, { label }) => any \| string>;}>`|`-`|2.32.0|
|onSubmit|数据验证成功后回调事件|`(values: FormData) => void`|`-`|-|
|onSubmitFailed|数据验证失败后回调事件|`(errors: { [key: string]: FieldError }) => void`|`-`|2.21.0|

### Form.Item

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|initialValue|设置控件初始值.(初始值，请不要使用受控组件的defaultValue了)|`FieldValue`|`-`|-|
|field|受控组件的唯一标示|`FieldKey`|`-`|-|
|label|标签的文本|`ReactNode`|`-`|-|
|labelCol|`<label>`标签布局，同[<Grid.Col>](/react/components/grid)组件接收的参数相同，可以配置`span`和`offset`值，会覆盖全局的`labelCol`设置|`ColProps`|`-`|-|
|wrapperCol|控件布局，同`labelCol`的设置方法一致，会覆盖全局的`wrapperCol`设置，[ColProps](/react/components/grid)|`ColProps`|`-`|-|
|colon|是否显示标签后的一个冒号|`boolean`|`-`|-|
|disabled|是否禁用，优先级高于 `Form` 的 `disabled` 属性|`boolean`|`-`|-|
|rules|受控模式下的验证规则，[RulesProps](#rules)|`RulesProps<FieldValue>[]`|`-`|-|
|trigger|接管子节点，搜集子节点值的时机。|`string`|`onChange`|-|
|triggerPropName|子节点被接管的值的属性名，默认是 `value`,比如 `<Checkbox>` 为 `checked`。|`string`|`value`|-|
|getValueFromEvent|指定在子节点触发`onChange`事件时如何处理值。（如果自定义了`trigger`属性，那么这里的参数就是对应的事件回调函数的参数类型）|`(...args) => FieldValue`|`-`|2.23.0|
|validateTrigger|触发验证的时机。取值和跟包裹的控件有关系，控件支持的触发事件，都可以作为值。例如`Input`支持的 `onFocus`、 `onBlur`、 `onChange` 都可以作为 `validateTrigger` 的值。传递为 `[]` 时，仅会在调用表单 `validate` 方法时执行校验规则。|`string \| string[]`|`onChange`|-|
|noStyle|不渲染任何外部标签/样式，只进行字段绑定。**注意**: 设置该属性为true时，该字段若未通过校验，错误信息将不会显示出来。可以传入对象，并设置 showErrorTip（ `2.5.0` 开始支持） 为true，错误信息将会展示在上层 formItem 节点下。|`boolean \| { showErrorTip: boolean }`|`-`|-|
|required|是否必选，会在 `label` 标签前显示加重红色符号，如果这里不设置，会从 rules 中寻找是否是 required|`boolean`|`-`|-|
|hidden|隐藏表单项. 表单字段值仍然会被获取|`boolean`|`-`|2.29.0|
|extra|额外的提示内容。|`ReactNode`|`-`|-|
|validateStatus|校验状态|`'success' \| 'warning' \| 'error' \| 'validating'`|`-`|-|
|hasFeedback|是否显示校验图标，配置 validateStatus 使用。|`boolean`|`-`|-|
|help|自定义校验文案|`ReactNode`|`-`|-|
|normalize|将控件的 `value` 进行一定的转换再保存到form中。|`(value: FieldValue \| undefined,prevValue: FieldValue \| undefined,allValues: Partial<FormData>) => any`|`-`|-|
|formatter|将Form内保存的当前控件对应的值进行一定的转换，再传递给控件。|`(value: FieldValue \| undefined) => any`|`-`|2.23.0|
|shouldUpdate|是否在其他控件值改变时候重新渲染当前区域。设置为true时候，表单的任意改变都会重新渲染该区域。|`\| boolean\| ((prevValues: Partial<FormData>,currentValues: Partial<FormData>,info: {isFormList?: boolean;field?: FieldKey \| FieldKey[];isInner?: boolean;}) => boolean)`|`-`|-|
|labelAlign|标签的文本对齐方式，优先级高于 `Form`|`'left' \| 'right'`|`right`|-|
|requiredSymbol|是否在 required 的时候显示加重的红色星号，设置 position 可选择将星号置于 label 前/后|`boolean \| { position: 'start' \| 'end' }`|`true`|`position` in 2.24.0|

### Form.List

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|field|字段名|`FieldKey` **(必填)**|`-`|-|
|initialValue|初始值|`SubFieldValue[]`|`-`|2.22.0|
|children|函数类型的 children|`(fields: { key: number; field: SubFieldKey }[],operation: {add: (defaultValue?: SubFieldValue, index?: number) => void;remove: (index: number) => void;move: (fromIndex: number, toIndex: number) => void;}) => React.ReactNode`|`-`|-|

### Form.Provider(`2.30.0`)

|参数名|描述|类型|默认值|
|---|---|---|---|
|onFormValuesChange|包裹的任意 `Form` 组件的值改变时，该方法会被调用|`(id: string \| undefined,changedValues,{forms,}: {forms: {[key: string]: FormInstance;};}) => void`|`-`|
|onFormSubmit|包裹的任意 `Form` 组件触发提交时，该方法会被调用|`(id: string \| undefined,values,{forms,}: {forms: {[key: string]: FormInstance;};}) => void`|`-`|

### Rules

底层使用 [b-validate](https://github.com/PengJiyuan/b-validate)。

```js
export interface RulesProps {
  // 触发校验的时机
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
  validator?: (value, callback: (error?: ReactNode) => void) => void;
  message?: string;
}
```

### this.form

通过`ref`可以拿到`this.form`，`this.form`包含了表单的验证、设值等常用操作。

```js
<Form ref={(ref) => (this.form = ref)}>
  <FormItem>...</FormItem>
</Form>
```

| 方法           |                                      描述                                      |                                                            类型 |版本|
| -------------- | :----------------------------------------------------------------------------: | --------------------------------------------------------------: | ---:|
| validate | 校验并获取表单输入域的值与 Errors，如果不设置 fields 的话，会验证所有的 fields。支持 callback 和 promise 两种使用方法。 | `Function(fields?: string[], callback(errors, values) => void)` |
| setFieldValue  |设置一个表单控件的值|`Function(field: string, value)` |
| setFields  |设置一组表单控件的值和报错。|`Function({ [field]: string: { value: any, error: FieldError } })` |
| setFieldsValue  |设置多个表单控件的值|`Function({[field]: string, value})` |
| getFieldValue  |获取一个表单控件的值|`Function(field: string)` |
| getFields  |获取全部表单项的值，包括被创建后销毁的表单项|`Function` |
| getFieldsValue |获取一组表单控件的值，如果不设置 fields 的话，会获取所有的 fields|`Function(fields: string[])` |
| getFieldError  |获取一个表单控件的错误状态|`Function(field: string)` |
| getFieldsError |获取一组表单控件的错误状态，如果不设置 fields 的话，会获取所有的控件的错误状态。|`Function(fields?: string[])` |
| scrollToField |滚动到指定表单字段位置。[ScrollIntoViewOptions](https://github.com/stipsan/scroll-into-view-if-needed/blob/master/src/index.ts#L16)|`Function(field: string, options?: ScrollIntoViewOptions)`
| getTouchedFields |获取被操作过的字段|`() => string[]` |
| resetFields|重置表单控件的值变为初始值|`Function(field?: string[])` |
| clearFields|清除表单控件的值|`Function(field?: string[])` |`2.29.0`

### `validate` 用法

```js
this.form.validate((errors, values) => {
  console.log(errors, values);
});
// 或者
this.form.validate().then((values) => {
  console.log(values);
}).catch((error) => {
  console.log(error.name);
  console.log(error.message);
  console.log(error.errors);
});
// 或者 (注意要在 async 方法中使用)
try {
  const values = await this.form.validate();
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error.errors);
}
```

### `setFields` 用法

```js
this.form.setFields({
  name: {
    value: 'pjy',
    error: {
      message: 'Yes, I know!'
    }
  }
});
```

## 常见问题
### 如何设置表单控件的默认值？（为什么给控件例如 Input ，直接设置defaultValue 不生效）

在被FormItem包裹，并且Form.Item设置了field属性的控件上，不要再设置defaultValue和value 属性。 可以在Form.Item 上通过initialValue或Form的initialValues属性来设置默认值。

### 为什么无法调用 `Modal` 里嵌套的 `Form` 的方法？

例如以下使用方式：

```js
// ...
const [form] = Form.useForm();
useEffect(() => {
  form.setFieldsValue({})
}, [])
return <div>
  <Modal visible={visible}>
    <Form form={form}>
      {/** ... */}
    </Form>
  </Modal>
</div>
```
这是因为在调用 form 的方法时，`Modal` 还未挂载，`Form` 还未创建。 可以设置 Modal 的 `mountOnEnter=false` 。

### Form.Control

非常非常极其不建议直接使用`Form.Control`. 在`1.15.0`及以上版本，组件库对 `Form.Item` 进行了较多功能扩展，简化了受控表单的写法，不再推荐直接使用`Form.Control` 组件（当然`1.x`兼容了此写法）。但升级到`2.0`后，`Form.Control`作为`Form`的一个内部组件，为了功能升级或bugfix，可能会进行一些改动，较少考虑到外部直接使用的`场景`，所以非常建议使用`Form.Item`代替`Form.Control`。

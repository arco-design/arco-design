`````
Component / Data Entry

# Form

A form with data collection, verification and submission functions, including checkboxes, radio buttons, input boxes, drop-down selection boxes and other elements.
`````

%%Content%%

## API

### Form

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|disabled|Whether All Form item is disabled|boolean |`-`|-|
|id|prefix of `id` attr|string |`-`|-|
|labelAlign|Text alignment of `label`|'left' \| 'right' |`right`|-|
|layout|The layout of Form|'horizontal' \| 'vertical' \| 'inline' |`horizontal`|-|
|requiredSymbol|Whether show red symbol when item is required，Set position props, you can choose to place the symbol before/after the label|boolean \| { position: 'start' \| 'end' } |`true`|`position` in 2.24.0|
|size|size of form|'mini' \| 'small' \| 'default' \| 'large' |`-`|-|
|colon|Whether show colon after `label`. Priority is lower than `colon` in `Form.Item`.(`ReactNode` in `v2.41.0`)|boolean \| ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|form|form|[FormInstance](#forminstance)&lt;FormData, FieldValue, FieldKey&gt; |`-`|-|
|initialValues|Default value of form data|Partial&lt;FormData&gt; |`-`|-|
|labelCol|Global `<label>` label layout. Same as the props received by the `<Grid.Col>`,the values of `span` and `offset` can be configured,which will be overwritten by the `labelCol` set by `Form.Item`|[ColProps](grid#col) |`{ span: 5, offset: 0 }`|-|
|onChange|Callback when the form item value changes. Unlike `onValuesChange`, it will only be called when the user manipulates the form item|(value: Partial&lt;FormData&gt;, values: Partial&lt;FormData&gt;) =&gt; void |`-`|-|
|onValuesChange|Callback when any form item value changes.The first is the changed value, and the second is the value of all items|(value: Partial&lt;FormData&gt;, values: Partial&lt;FormData&gt;) =&gt; void |`-`|-|
|scrollToFirstError|Whether scroll to first error item after validation fails. (`ScrollIntoViewOptions` is supported at `2.19.0`)|boolean \| ScrollIntoViewOptions |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|validateMessages|validation prompt template [demo](/react/en-US/components/form#validate%20messages)|Partial&lt;{[key in keyof ValidateMessagesTemplateType]: ValidateMessagesTemplateType[key] extends string? ValidateMessagesTemplateType[key] \| ((data, { label }) =&gt; any): Partial&lt;Record&lt;keyof ValidateMessagesTemplateType[key], string \| ((data, { label }) =&gt; any)&gt;&gt;;}&gt; |`-`|2.32.0|
|validateTrigger|When to trigger verification.|string \| string[] |`onChange`|2.28.0|
|wrapper|Custom outer tag. Can be html tags or React components|[ComponentType](#componenttype) |`form`|-|
|wrapperCol|The global control layout, which is the same as the setting method of `labelCol`,will be overwritten by the `wrapperCol` set by `Form.Item`|[ColProps](grid#col) |`{ span: 19, offset: 0 }`|-|
|wrapperProps|If set `wrapper`, You can pass some parameters to the wrapper.|[IndexedObject](#indexedobject) |`-`|-|
|onSubmit|Callback when submit data|(values: FormData) => void |`-`|-|
|onSubmitFailed|Callback when validate fail|(errors: { [key: string]: [FieldError](#fielderror) }) => void |`-`|2.21.0|

### Form.Item

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|disabled|Whether the FormItem is disabled. Priority is higher than the `disabled` prop of `Form`|boolean |`-`|-|
|hasFeedback|Whether to show the verification icon, configure `validateStatus` to use.|boolean |`-`|-|
|hidden|hide the form item|boolean |`-`|2.29.0|
|required|Whether The FormItem is Required, Will display an red symbol in front of the `label` label.If it is not set here, it will look for `required` from the rules|boolean |`-`|-|
|trigger|When to take over and collecting the child nodes.|string |`onChange`|-|
|triggerPropName|The attribute name of the child node being taken over, default is `value`, ex, `<Checkbox>` is `checked`.|string |`value`|-|
|labelAlign|Text alignment of `label`|'left' \| 'right' |`right`|-|
|requiredSymbol|Whether show red symbol when item is required，Set position props, you can choose to place the symbol before/after the label|boolean \| { position: 'start' \| 'end' } |`true`|`position` in 2.24.0|
|validateStatus|Validate status|'success' \| 'warning' \| 'error' \| 'validating' |`-`|-|
|colon|Whether show colon after `label`. Priority is lower than `colon` in `Form.Item`.(`ReactNode` in `v2.41.0`)|boolean \| ReactNode |`-`|-|
|extra|Additional hint content.|ReactNode |`-`|-|
|help|Custom help text|ReactNode |`-`|-|
|label|Label text|ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|dependencies|the dependency fields. When the value of the dependent field changes, trigger its own validation.If you want to dynamically render a form control/form area, use shouldUpdate|string[] |`-`|2.40.0|
|field|Unique identification of controlled components|FieldKey |`-`|-|
|initialValue|Default value|FieldValue |`-`|-|
|labelCol|The layout of `<label>`, the same as the props received by the `<Grid.Col>`.The values of `span` and `offset` can be configured, which will override the global `labelCol` setting|[ColProps](grid#col) |`-`|-|
|normalize|Convert the `value` to the FormItem|(value: FieldValue \| undefined,prevValue: FieldValue \| undefined,allValues: Partial&lt;FormData&gt;) =&gt; any |`-`|-|
|noStyle|No external tags/styles are rendered, only binding field. **Notice**: When set to true, if the field verification failed,the error message will not be displayed. You can pass in an object and set showErrorTip to true(Support at `2.5.0`),The error message will be displayed under the upper formItem node|boolean \| { showErrorTip: boolean } |`-`|-|
|rules|Validation rules in controlled component, [RulesProps](#rules)|RulesProps&lt;FieldValue&gt;[] |`-`|-|
|shouldUpdate|Whether to re-render when other FormItem value change. When set to true, any changes to the Form will re-render.|\| boolean\| ((prevValues: Partial&lt;FormData&gt;,currentValues: Partial&lt;FormData&gt;,info: {isFormList?: boolean;field?: FieldKey \| FieldKey[];isInner?: boolean;}) =&gt; boolean) |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|tooltip|Tooltip text|ReactNode \| ([TooltipProps](tooltip#tooltip) & { icon?: ReactElement }) |`-`|2.43.0|
|validateTrigger|When to trigger verification. The value is related to the wrapped item, and all events supported.For example, `onFocus`, `onBlur`, and `onChange` supported by `Input` can be used as the value of `validateTrigger`.When passed as `[]`, the validation rules will only be executed when the form `validate` method is called|string \| string[] |`onChange`|-|
|wrapperCol|The control layout, which is the same as the setting method of `labelCol`, which will override the global `wrapperCol` setting|[ColProps](grid#col) |`-`|-|
|formatter|Convert the `value` of the FormItem to children;|(value: FieldValue \| undefined) => any |`-`|2.23.0|
|getValueFromEvent|Specify how to handle the value when the child node triggers the `onChange` event. (If the `trigger` attribute is customized, then the parameter here is the parameter type of the corresponding event callback function)|(...args) => FieldValue |`-`|2.23.0|

### Form.List

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|noStyle|FormItemProps['noStyle'].Defaults to `false` when `rules` exists (requires rendering validation information), otherwise defaults to `true`|[FormItemProps](form#formitem)['noStyle'] |`-`|2.46.0|
|field|Field name|FieldKey  **(Required)**|`-`|-|
|initialValue|Default value|SubFieldValue[] |`-`|2.22.0|
|rules|Validation rules in controlled component, [RulesProps](#rules)|RulesProps&lt;SubFieldValue[]&gt;[] |`-`|2.46.0|
|children|Function type children|(fields: { key: number; field: SubFieldKey }[],operation: {add: (defaultValue?: SubFieldValue, index?: number) => void;remove: (index: number) => void;move: (fromIndex: number, toIndex: number) => void;}) => React.ReactNode |`-`|-|

### Form.Provider(`2.30.0`)

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|onFormSubmit|This method will be called when any wrapped `Form` component triggers a submit|(id: string \| undefined,values,{forms,}: {forms: {[key: string]: [FormInstance](#forminstance);};}) => void |`-`|
|onFormValuesChange|This method is called when the value of any wrapped `Form` component changes|(id: string \| undefined,changedValues,{forms,}: {forms: {[key: string]: [FormInstance](#forminstance);};}) => void |`-`|

### FormInstance

```js
export type FormInstance<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> = Pick<
  Store<FormData, FieldValue, FieldKey>,
  | "getFieldsValue"
  | "getFieldValue"
  | "getFieldError"
  | "getFieldsError"
  | "getTouchedFields"
  | "getFields"
  | "setFieldValue"
  | "setFieldsValue"
  | "setFields"
  | "resetFields"
  | "clearFields"
  | "submit"
  | "validate"
  | "getFieldsState"
> & {
  scrollToField: (field: FieldKey, options?: ScrollIntoViewOptions) => void;
  // arco 内部使用，业务万不可调用
  getInnerMethods: (
    inner?: boolean
  ) => InnerMethodsReturnType<FormData, FieldValue, FieldKey>;
};
```

### InnerMethodsReturnType

```js
export type InnerMethodsReturnType<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> = Pick<
  Store<FormData, FieldValue, FieldKey>,
  | "registerField"
  | "registerStateWatcher"
  | "registerFormWatcher"
  | "registerWatcher"
  | "innerSetInitialValues"
  | "innerSetInitialValue"
  | "innerSetCallbacks"
  | "innerSetFieldValue"
  | "innerGetStore"
  | "innerGetStoreStatus"
  | "innerCollectFormState"
  | "innerGetFieldValue"
>;
```

### ComponentType

```js
export type ComponentType =
  | keyof JSX.IntrinsicElements
  | React.ComponentType<any>;
```

### IndexedObject

```js
export type IndexedObject = {
  [key: string]: any;
};
```

### FieldError

```js
export type FieldError<FieldValue = any> = {
  value?: FieldValue;
  message?: ReactNode;
  type?: string;
  requiredError?: boolean;
};
```

### Rules

Low-level use [b-validate](https://github.com/PengJiyuan/b-validate).

```js
export interface RulesProps {
  // when to validate
  validateTrigger?: string | string[];
  // When the verification fails, the error message will be displayed in the form of `error` or `warning`. Will not block form submission when set to `warning`
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

You can get `this.form` through `ref`, and `this.form` contains common operations such as form validation and setting.

```js
<Form ref={(ref) => (this.form = ref)}>
  <FormItem>...</FormItem>
</Form>
```

|Property|Description|Type|Default|Version|
| --- | ---- | ---- | ----- | --- |
| validate | Verified and Get the Form values and Errors, If fields are not set, all fields will be verified. Support callback and promise | `Function(fields?: string[], callback(errors, values) => void)` |
| submit  |submit the form|`Function` |
| setFieldValue  |Set the value of a form field|`Function(field: string, value)` |
| setFields  |Set the value of a group of form fields and errors.|`Function({ [field]: string: { value: any, error: FieldError } })` |
| setFieldsValue  |Set the value of multiple form fields|`Function({[field]: string, value})` |
| getFieldValue  |Get the field value of a form field.**Please do not use the return value directly as a dependency of useEffect, the return value will be deeply cloned and the reference address will change**|`Function(field: string)` |
| getFields  |Gets the values of all form items, including those that were created and then destroyed.**Please do not use the return value directly as a dependency of useEffect, the return value will be deeply cloned and the reference address will change**|`Function` |
| getFieldsValue |Get the field value of a group of form fields. If you don't set fields, you will get the field value of all fields.**Please do not use the return value directly as a dependency of useEffect, the return value will be deeply cloned and the reference address will change**|`Function(fields: string[])` |
| getFieldError  |Get the error status of a form field|`Function(field: string)` |
| getFieldsError |Get the error status of a group of form fields. If you don't set fields, you will get the error status of all fields.|`Function(fields?: string[])` |
| scrollToField |Scroll to the specified form field position. [ScrollIntoViewOptions](https://github.com/stipsan/scroll-into-view-if-needed/blob/master/src/index.ts#L16)|`Function(field: string, options?: ScrollIntoViewOptions)`
| getTouchedFields |Get the touched field|`() => string[]` |
| resetFields|Reset the value of the Form to the initial value|`Function(field?: string[])` |
| clearFields|Clear the value of the Form.Item and validate status|`Function(field?: string[])` | `2.29.0`

### `validate` Usage

```js
this.form.validate((errors, values) => {
  console.log(errors, values);
});
// Or
this.form.validate().then((values) => {
  console.log(values);
}).catch((error) => {
  console.log(error.name);
  console.log(error.message);
  console.log(error.errors);
});
// Or (Note to use in the async method)
try {
  const values = await this.form.validate();
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error.errors);
}
```

### `setFields` Usage

```js
this.form.setFields({
  name: {
    value: 'pjy',
    error: {
      message: 'Yes, I know!'
    },
    warning: 'warning...'
  }
});
```

## Common Problems
### How to set the default value of Form?(Why doesn't setting defaultValue directly to Input control take effect)

Do not set the defaultValue and value attributes on the control wrapped by the Form.Item with the field attribute set. You can set the default value on the Form.Item through the initialValue or the initialValues property of the Form.

### Why can't call the method of `Form` nested in `Modal`?

For example, the following usage:

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
This is because when the form method is called, `Modal` has not yet been mounted and `Form` has not been created yet. You can set the `mountOnEnter=false` of Modal.

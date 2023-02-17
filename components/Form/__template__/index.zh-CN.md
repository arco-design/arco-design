---
file: interface
---

`````
组件 / 数据输入

# 表单 Form

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。
`````

%%Content%%

## API

%%Props%%

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
| submit  |提交表单|`Function` |
| setFieldValue  |设置一个表单控件的值|`Function(field: string, value)` |
| setFields  |设置一组表单控件的值和报错。|`Function({ [field]: string: { value: any, error: FieldError } })` |
| setFieldsValue  |设置多个表单控件的值|`Function({[field]: string, value})` |
| getFieldValue  |获取一个表单控件的值。**请不要把返回值直接作为 useEffect 的依赖，其返回值会被深克隆，引用地址会发生改变**|`Function(field: string)` |
| getFields  |获取全部表单项的值，包括被创建后销毁的表单项。**请不要把返回值直接作为 useEffect 的依赖，其返回值会被深克隆，引用地址会发生改变**|`Function` |
| getFieldsValue |获取一组表单控件的值，如果不设置 fields 的话，会获取所有的 fields。**请不要把返回值直接作为 useEffect 的依赖，其返回值会被深克隆，引用地址会发生改变**|`Function(fields: string[])` |
| getFieldError  |获取一个表单控件的错误状态|`Function(field: string)` |
| getFieldsError |获取一组表单控件的错误状态，如果不设置 fields 的话，会获取所有的控件的错误状态。|`Function(fields?: string[])` |
| scrollToField |滚动到指定表单字段位置。[ScrollIntoViewOptions](https://github.com/stipsan/scroll-into-view-if-needed/blob/master/src/index.ts#L16)|`Function(field: string, options?: ScrollIntoViewOptions)`
| getTouchedFields |获取被操作过的字段|`() => string[]` |
| resetFields|重置表单控件的值变为初始值|`Function(field?: string[])` |
| clearFields|清除表单控件的值以及校验状态。等同于 `form.setFields({ [field]: { value: undefined; error: null, warning: null } })`|`Function(field?: string[])` |`2.29.0`

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
    },
    warning: 'warning...'
  }
});
```

## 常见问题

### `Switch` 、 `Checkbox` 的选中状态不受 `Form.Item` 的控制？

在 `FormItem` 上设置 `triggerPropName` 为 `checked`。
其他表单控件受控属性不是 `value` 时，可类似方式处理。
如 `<Form.Item field="upload" triggerPropName="fileList"><Upload/></Form.Item>`


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

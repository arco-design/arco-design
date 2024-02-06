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

### 如何设置表单控件的默认值？（为什么给控件例如 Input ，直接设置 defaultValue 不生效）
在被 `FormItem`包裹，并且 `Form.Item` 设置了 `field` 属性的控件上，不要再设置 `defaultValue`和 `value` 属性。 可以在 `Form.Item` 上通过 `initialValue` 来设置默认值。
###  `Modal` 里嵌套的 `Form` 时，无法调用 `Form` 的方法。
`Modal` 默认在打开时挂载，所以页面加载完成时 `Modal` 还未挂载，`Form` 还未创建。
 可以设置 `Modal` 的 **`mountOnEnter=false`** 。
### 传了 `initialValue` 但不生效。
`initialValue` 解释为**初始值**，只会在表单挂载时生效，如果表单数据是异步加载的请用 `setFieldValue` / `setFieldsValue` / `setFields` 更新表单值。
### Form.Item 未收集到所包裹表单控件的值 / 未触发校验？

* Form.Item 设置了 field 属性
* Form.Item 直接包裹在表单控件外，并且表单控件是 FormItem 的**唯一子节点**
* Form.Item 的默认 triggerPropName 是 value，表示会给子控件注入 value 属性。如果表单控件的受控属性是 `checked`(如 switch, checkbox, radio)， `fileList` （如 Upload）或者其他，那么需要根据实际情况设置下 `Form.Item` 的 triggerPropName={表单控件的受控属性}
* 类似 triggerPropName，默认 `FormItem` 监听子组件的 `onChange` 回调来收集控件值以及触发校验逻辑。如果子组件的回调不是 `onChange` ，记得设置下 `FormItem` 的 `trigger={表单控件的事件回调}`
* Form.Item 所包裹的控件是挂载状态（即未被销毁）

### 某个表单元素填了值但已经被销毁，我如何获取这个值？
**`getFields`**方法会获取所有在 `Form` 中注册过的字段的值，包括被创建后销毁的表单项。
### 校验节流 或 异步校验？
在 `rules` 中自定义 `validator` 方法，并返回一个 `Promise` 即可实现表单的异步校验。
节流如果用 `lodash.debounce` 不生效，建议使用 `debounce.promise` ，它返回的是一个 `promise`。
[官网示例](https://arco.design/react/components/form#%E8%A1%A8%E5%8D%95%E5%BC%82%E6%AD%A5%E6%A0%A1%E9%AA%8C)
### Form 中对 Checkbox/Switch/Upload 设置值不生效
在 `Checkbox/Switch` 对应的 `Form.Item` 上设置 `triggerPropName=checked`
在 `Upload` 对应的 `Form.Item` 上设置 `triggerPropName=fileList`
其他组件类似
###  Form 内 Input 出现浅蓝色背景色（Chrome 浏览器）？
蓝色背景色是 Chrome 浏览器的自动填充样式，关闭 form 的自动填充即可。
### 如何关闭自动填充？
`Form ` 组件的原生属性，设置 `autoComplete=off` 即可。
### 点击 label 会触发对应表单控件的行为改变？如：switch 切换，checkbox 选中， input 聚焦
> https://www.runoob.com/tags/tag-label.html
> **标签定义及使用说明**
> label 标签为 input 元素定义标注（标记）。
> label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。
> label 标签的 for 属性应当与相关元素的 id 属性相同。
如果实在不想要这个效果，给表单控件随便设置个 id 属性，不要和 label 的 for 属性一致即可。如 `<Switch id="aaaaa" />`
### 对错误信息的展示进行高级定制
https://codepen.io/yinkaihui/pen/GRwRQao?editors=1011

### DatePicker.WeekPicker 传值解析不了
> DatePicker.QuarterPicker 同理
给 `Form.Item` 加上 `getValueFromEvent={(v, dv) => dv}`。

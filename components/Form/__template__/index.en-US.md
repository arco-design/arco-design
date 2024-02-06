---
file: interface
---

`````
Component / Data Entry

# Form

A form with data collection, verification and submission functions, including checkboxes, radio buttons, input boxes, drop-down selection boxes and other elements.
`````

%%Content%%

## API

%%Props%%

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
### Form.Item did not collect the value of the wrapped form control / did not trigger verification?

* Form.Item sets the field attribute
* Form.Item is directly wrapped outside the form control, and the form control is the **only child node** of FormItem
* The default triggerPropName of Form.Item is value, which means that the value attribute will be injected into the child control. If the controlled property of the form control is `checked` (such as switch, checkbox, radio), `fileList` (such as Upload) or others, then you need to set the triggerPropName={ of the form control in `Form.Item` according to the actual situation. control attribute}
* Similar to triggerPropName, by default `FormItem` listens to the `onChange` callback of child components to collect control values and trigger validation logic. If the callback of the subcomponent is not `onChange`, remember to set `trigger={form control event callback}` of `FormItem`
* The control wrapped by Form.Item is in a mounted state (that is, it has not been destroyed)

### A form element has a value filled in but has been destroyed. How do I get this value?
The **`getFields`** method will obtain the values ​​of all fields registered in `Form`, including form items that are created and destroyed.
### Verification throttling or asynchronous verification?
Customize the `validator` method in `rules` and return a `Promise` to implement asynchronous verification of the form.
If throttling with `lodash.debounce` does not take effect, it is recommended to use `debounce.promise`, which returns a `promise`.
[Official website example](https://arco.design/react/components/form#%E8%A1%A8%E5%8D%95%E5%BC%82%E6%AD%A5%E6%A0%A1% E9%AA%8C)
### The Checkbox/Switch/Upload settings in Form do not take effect.
Set `triggerPropName=checked` on the `Form.Item` corresponding to `Checkbox/Switch`
Set `triggerPropName=fileList` on the `Form.Item` corresponding to `Upload`
Other components are similar
### Does the Input in the Form appear with a light blue background color (Chrome browser)?
The blue background color is the automatic filling style of the Chrome browser. Just turn off the automatic filling of the form.
### How to turn off autofill?
The native property of `Form` component, just set `autoComplete=off`.
### Will clicking the label trigger a change in the behavior of the corresponding form control? For example: switch, checkbox selected, input focused
> https://www.runoob.com/tags/tag-label.html
> **Label definition and usage instructions**
> The label tag defines the label (marker) for the input element.
> The label element does not present any special effects to the user. However, it improves usability for mouse users. This control is triggered if you click on the text inside the label element. That is to say, when the user selects the label, the browser will automatically turn the focus to the form control related to the label.
> label The for attribute of the label should be the same as the id attribute of the related element.
If you really don't want this effect, just set an id attribute to the form control, and don't match it with the for attribute of the label. Such as `<Switch id="aaaaa" />`
### Advanced customization of error message display
https://codepen.io/yinkaihui/pen/GRwRQao?editors=1011

### DatePicker.WeekPicker value cannot be parsed
> Same as DatePicker.QuarterPicker
Add `getValueFromEvent={(v, dv) => dv}` to `Form.Item`.

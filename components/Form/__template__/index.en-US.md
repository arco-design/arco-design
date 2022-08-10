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

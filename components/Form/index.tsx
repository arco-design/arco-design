import Form from './form';
import { FormInstance, FormProps, FormItemProps } from './interface';

import FormItem from './form-item';
import FormControl from './control';
import FormList from './form-list';
import useForm from './useForm';

export { FormInstance, FormProps, FormItemProps };

type RefForm = typeof Form;

export interface FormComponent extends RefForm {
  Item: typeof FormItem;
  List: typeof FormList;
  Control: typeof FormControl;
  useForm: typeof useForm;
}

const FormComp: FormComponent = Form as FormComponent;

FormComp.Item = FormItem;

FormComp.List = FormList;

FormComp.Control = FormControl;

FormComp.useForm = useForm;

export default FormComp;

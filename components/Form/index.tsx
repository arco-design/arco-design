import Form from './form';
import { FormInstance, FormProps, FormItemProps, FormProviderProps } from './interface';

import FormItem from './form-item';
import FormControl from './control';
import FormList from './form-list';
import FormProvider from './form-provider';
import useForm from './useForm';

export { FormInstance, FormProps, FormItemProps, FormProviderProps };

type RefForm = typeof Form;

export interface FormComponent extends RefForm {
  Item: typeof FormItem;
  List: typeof FormList;
  Control: typeof FormControl;
  Provider: typeof FormProvider;
  useForm: typeof useForm;
}

const FormComp: FormComponent = Form as FormComponent;

FormComp.Provider = FormProvider;
FormComp.Item = FormItem;

FormComp.List = FormList;

FormComp.Control = FormControl;

FormComp.useForm = useForm;

export default FormComp;

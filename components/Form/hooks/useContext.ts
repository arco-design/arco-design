import { useContext } from 'react';
import { FormInstance } from '../interface';
import { FormContext } from '../context';

const useFormContext = (): { form: FormInstance; disabled: boolean } => {
  const formCtx = useContext(FormContext);

  return {
    form: formCtx.store,
    disabled: formCtx.disabled,
  };
};

export default useFormContext;

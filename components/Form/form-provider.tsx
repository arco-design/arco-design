import React, {
  useCallback,
  forwardRef,
  PropsWithChildren,
  useRef,
  ForwardRefExoticComponent,
} from 'react';
import { FormInstance } from '.';
import { FormProviderContext } from './context';
import { FormProviderProps } from './interface';

const FormProviderComponent = (props: PropsWithChildren<FormProviderProps>, _) => {
  const formsRef = useRef<{ [key: string]: FormInstance }>({});
  const register = useCallback((name: string, form: FormInstance) => {
    if (name) {
      formsRef.current[name] = form;
    }
    return () => {
      delete formsRef.current[name];
    };
  }, []);

  const onFormSubmit = useCallback(
    (name, changedValues) => {
      props.onFormSubmit &&
        props.onFormSubmit(name, changedValues, {
          forms: formsRef.current,
        });
    },
    [props.onFormSubmit]
  );

  const onFormValuesChange = useCallback(
    (name, values) => {
      props.onFormValuesChange &&
        props.onFormValuesChange(name, values, {
          forms: formsRef.current,
        });
    },
    [props.onFormValuesChange]
  );

  return (
    <FormProviderContext.Provider
      value={{
        onFormValuesChange,
        onFormSubmit,
        register,
      }}
    >
      {props.children}
    </FormProviderContext.Provider>
  );
};

const FormProvider = forwardRef(FormProviderComponent);

FormProvider.displayName = 'FormProvider';

export default FormProvider as ForwardRefExoticComponent<PropsWithChildren<FormProviderProps>>;

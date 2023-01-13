import { useContext, useEffect, useState, useCallback } from 'react';
import { FormInstance } from '../interface';
import { FormContext } from '../context';
import warn from '../../_util/warning';

const useFormContext = (): { form: FormInstance; disabled: boolean; isSubmitting: boolean } => {
  const formCtx = useContext(FormContext);
  const formInstance = formCtx.store;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setSubmitting = useCallback(() => {
    const state = formInstance?.getFieldsState();
    const newValue = state[Object.keys(state)[0]]?.isSubmitting;
    setIsSubmitting(newValue);
  }, []);

  useEffect(() => {
    if (!formInstance) {
      warn(true, 'formInstance is not available');
      return;
    }
    const { registerStateWatcher } = formInstance?.getInnerMethods(true);

    const update = () => setSubmitting();
    update();

    const cancelWatch = registerStateWatcher && registerStateWatcher(update);

    return () => {
      cancelWatch && cancelWatch();
    };
  }, []);

  return {
    form: formInstance,
    disabled: formCtx.disabled,
    isSubmitting,
  };
};

export default useFormContext;

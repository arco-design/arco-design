import { useCallback, useContext, useEffect, useRef } from 'react';
import { FormInstance, SubmitStatus, KeyType } from '../interface';
import { FormContext, FormContextType } from '../context';
import warn from '../../_util/warning';
import useForceUpdate from '../../_util/hooks/useForceUpdate';

/**
 * useFormContext 只会返回一些 Form 全局的状态，避免返回某个表单项的状态
 */
const useFormContext = <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
>(): {
  form: FormInstance<FormData, FieldValue, FieldKey>;
  disabled: boolean;
  isSubmitting: boolean;
} => {
  const formCtx = useContext(FormContext as FormContextType<FormData, FieldValue, FieldKey>);
  const formInstance = formCtx.store;
  const isSubmittingRef = useRef(false);

  const forceUpdate = useForceUpdate();

  const setSubmitting = useCallback(() => {
    const { submitStatus } = formInstance?.getInnerMethods(true)?.innerGetStoreStatus?.() || {};
    const newIsSubmitting = submitStatus === SubmitStatus.submitting;

    if (newIsSubmitting !== isSubmittingRef.current) {
      isSubmittingRef.current = newIsSubmitting;
      forceUpdate();
    }
  }, []);

  useEffect(() => {
    if (!formInstance) {
      warn(true, 'formInstance is not available');
      return;
    }

    const { registerFormWatcher } = formInstance?.getInnerMethods(true);

    const update = () => setSubmitting();
    update();

    const cancelWatch = registerFormWatcher && registerFormWatcher(update);

    return () => {
      cancelWatch?.();
    };
  }, []);

  return {
    form: formInstance,
    disabled: formCtx.disabled,
    isSubmitting: isSubmittingRef.current,
  };
};

export default useFormContext;

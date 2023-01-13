import isEqualWith from 'lodash/isEqualWith';
import { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { FormInstance, FieldState, KeyType } from '../interface';
import { FormContext } from '../context';
import warn from '../../_util/warning';

const useFormState = <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
>(
  field: FieldKey,
  form?: FormInstance
): FieldState<FieldValue> | undefined => {
  const formCtx = useContext(FormContext);

  const formInstance = form || formCtx.store;

  //  if field change, get the real value from fieldRef.current
  const fieldRef = useRef(field);
  fieldRef.current = field;

  const getFieldStateFromStore = useCallback(() => {
    const field = fieldRef.current;
    const formState = formInstance.getFieldsState([field]);

    return formState?.[field];
  }, []);

  const [formState, setFormState] = useState(getFieldStateFromStore);

  const formStateRef = useRef(formState);

  useEffect(() => {
    if (!formInstance) {
      warn(true, 'formInstance is not available');
      return;
    }
    const { registerStateWatcher } = formInstance?.getInnerMethods(true);

    const updateState = () => {
      const newValue = getFieldStateFromStore();

      if (!isEqualWith(formStateRef.current, newValue)) {
        setFormState(newValue);
        formStateRef.current = newValue;
      }
    };

    updateState();

    const cancelWatch = registerStateWatcher && registerStateWatcher(updateState);

    return () => {
      cancelWatch && cancelWatch();
    };
  }, []);

  return formState;
};

export default useFormState;

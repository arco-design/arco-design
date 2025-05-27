import { useState, useContext, useEffect, useRef } from 'react';
import get from 'lodash/get';
import { isString } from '../../_util/is';
import { FormInstance, KeyType } from '../interface';
import { FormContext } from '../context';
import warn from '../../_util/warning';

const useWatch = <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData,
  Field extends FieldKey | FieldKey[] = FieldKey | FieldKey[]
>(
  field: Field,
  form?: FormInstance<FormData, FieldValue, FieldKey>
): Field extends Array<any> ? Partial<FormData> : FormData[Extract<Field, keyof FormData>] => {
  const formCtx = useContext(FormContext);

  const formInstance =
    form || (formCtx.store as FormInstance<FormData, FieldValue, FieldKey> | undefined);

  const [value, setValue] = useState(() => {
    const fieldValues = formInstance?.getFieldsValue([].concat(field));
    if (isString(field)) {
      return get(fieldValues, field);
    }
    return fieldValues;
  });

  //  if field change, get the real value from fieldRef.current
  const fieldRef = useRef(field);
  fieldRef.current = field;

  const valueRef = useRef(JSON.stringify(value));

  useEffect(() => {
    if (!formInstance) {
      warn(true, 'formInstance is not available');
      return;
    }
    const { registerWatcher } = formInstance?.getInnerMethods(true);

    const updateValue = () => {
      const field = fieldRef.current;
      const formValues = formInstance.getFieldsValue([].concat(field));
      let newValue = formValues;
      if (isString(field)) {
        newValue = get(formValues, field);
      }
      const newValueString = JSON.stringify(newValue);

      if (valueRef.current !== newValueString) {
        setValue(newValue);
        valueRef.current = newValueString;
      }
    };

    updateValue();

    const cancelWatch = registerWatcher && registerWatcher(updateValue);

    return () => {
      cancelWatch?.();
    };
  }, []);

  return value;
};

export default useWatch;

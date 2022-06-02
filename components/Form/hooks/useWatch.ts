import { useState, useContext, useEffect, useRef } from 'react';
import get from 'lodash/get';
import { FormInstance } from '../interface';
import { FormContext } from '../context';
import warn from '../../_util/warning';

const useWatch = (field: string, form?: FormInstance) => {
  const formCtx = useContext(FormContext);

  const formInstance = form || formCtx.store;

  const [value, setValue] = useState(formInstance?.getFieldValue(field));
  const valueRef = useRef(JSON.stringify(value));

  useEffect(() => {
    if (!formInstance) {
      warn(true, 'formInstance is not available');
      return;
    }
    const { registerWatcher } = formInstance?.getInnerMethods(true);

    const updateValue = () => {
      const newValue = get(formInstance.getFieldsValue(), field);
      const newValueString = JSON.stringify(newValue);

      if (valueRef.current !== newValueString) {
        setValue(newValue);
        valueRef.current = newValueString;
      }
    };

    updateValue();

    const cancelWatch = registerWatcher && registerWatcher(updateValue);

    return () => {
      cancelWatch && cancelWatch();
    };
  }, []);

  return value;
};

export default useWatch;

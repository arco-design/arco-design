import { useState, useContext, useEffect } from 'react';
import get from 'lodash/get';
import { FormInstance } from '../interface';
import { FormContext } from '../context';
import warn from '../../_util/warning';

const useWatch = (field: string, form?: FormInstance) => {
  const formCtx = useContext(FormContext);

  const formInstance = form || formCtx.store;

  const [value, setValue] = useState(formInstance?.getFieldValue(field));

  useEffect(() => {
    if (!formInstance) {
      warn(true, 'formInstance is not available');
      return;
    }
    const { registerWatcher } = formInstance?.getInnerMethods(true);

    const updateValue = () => {
      setValue((value) => {
        const newValue = get(formInstance.getFieldsValue(), field);
        if (JSON.stringify(value) !== JSON.stringify(newValue)) {
          return newValue;
        }
        return value;
      });
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

import React, { useState, useImperativeHandle, forwardRef, ReactElement, useContext } from 'react';
import { ConfigContext, ConfigProviderProps } from '../ConfigProvider';

export type HolderRef = {
  addInstance?: (ins: ReactElement) => void;
  removeInstance?: (ins: ReactElement) => void;
  getContextConfig?: () => ConfigProviderProps;
};

const ContextHolderElement = forwardRef<HolderRef>((_props, ref) => {
  const configContext = useContext(ConfigContext);
  const [instances, setInstances] = useState([]);

  function addInstance(ins) {
    setInstances((originInstances) => [...originInstances, ins]);
  }

  function removeInstance(ins) {
    setInstances((originInstances) => originInstances.filter((originIns) => ins !== originIns));
  }

  function getContextConfig() {
    return configContext;
  }

  useImperativeHandle(ref, () => ({
    addInstance,
    removeInstance,
    getContextConfig,
  }));

  return (
    <>
      {React.Children.map(instances, (child, index) => React.cloneElement(child, { key: index }))}
    </>
  );
});

export default ContextHolderElement;

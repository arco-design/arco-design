import React, { useState, useImperativeHandle, forwardRef, ReactElement } from 'react';

export type HolderRef = {
  addInstance?: (ins: ReactElement) => void;
  removeInstance?: (ins: ReactElement) => void;
};

const ContextHolderElement = forwardRef<HolderRef>((_props, ref) => {
  const [instances, setInstances] = useState([]);

  function addInstance(ins) {
    setInstances((originInstances) => [...originInstances, ins]);
  }

  function removeInstance(ins) {
    setInstances((originInstances) => originInstances.filter((originIns) => ins !== originIns));
  }

  useImperativeHandle(ref, () => ({
    addInstance,
    removeInstance,
  }));

  return <>{instances}</>;
});

export default ContextHolderElement;

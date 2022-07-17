import React, { useEffect, useRef, useState } from 'react';
import { isUndefined } from '../../_util/is';

export default function useMergeInputValue<T>(
  defaultStateValue?: T,
  inputValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const hasInputValue = !isUndefined(inputValue);
  const [stateValue, setStateValue] = useState<T>(hasInputValue ? inputValue : defaultStateValue);
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    // inputValue start with non-undefined, this means user remove the inputValue prop
    if (inputValue === undefined) {
      setStateValue(defaultStateValue);
    }
  }, [inputValue, defaultStateValue]);
  const mergedValue = hasInputValue ? inputValue : stateValue;
  //  Prevent triggering setStateValue while having inputValue given
  return [mergedValue, hasInputValue ? () => {} : setStateValue];
}

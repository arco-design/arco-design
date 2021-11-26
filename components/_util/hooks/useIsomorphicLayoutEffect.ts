import { useEffect, useLayoutEffect } from 'react';
import { isServerRendering } from '../dom';

// Because useLayoutEffect in the ssr environment will report a warning
// So when you need to use useLayoutEffect, use useIsomorphicLayoutEffect instead, it will use useEffect in the ssr environment to avoid this problem
const useIsomorphicLayoutEffect = isServerRendering ? useEffect : useLayoutEffect;

export default useIsomorphicLayoutEffect;

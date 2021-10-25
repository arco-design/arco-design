import { useEffect, useLayoutEffect } from 'react';
import { isServerRendering } from '../dom';

// 因为在 ssr 环境下使用 useLayoutEffect 会报一个 warning
// 所以需要使用 useLayoutEffect 的时候用 useIsomorphicLayoutEffect 替代，它会在 ssr 环境下使用 useEffect 来规避这个问题
const useIsomorphicLayoutEffect = isServerRendering ? useEffect : useLayoutEffect;

export default useIsomorphicLayoutEffect;

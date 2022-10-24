import { useState, useEffect } from 'react';

const globalInstanceIdMap = {};

/**
 * Provide unique component name while using this hook
 * In react 18, React.useId is a better way to choose
 * Related issue: https://github.com/arco-design/arco-design/issues/958
 */
export default function useId(prefix: string): string | undefined {
  const [id, setId] = useState<number>();

  // Update ID in next render to avoid SSR [prop dit not match] error
  useEffect(() => {
    globalInstanceIdMap[prefix] = prefix in globalInstanceIdMap ? globalInstanceIdMap[prefix] : 0;
    setId(globalInstanceIdMap[prefix]);
    globalInstanceIdMap[prefix] += 1;
  }, []);

  return typeof id === 'number' ? `${prefix}${id}` : undefined;
}

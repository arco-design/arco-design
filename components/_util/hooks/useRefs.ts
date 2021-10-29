// 保存一个ref列表
import { useRef } from 'react';

export default function useRefs<T>(
  defaultValue: T[] = []
): [T[], (node: T, index?: number) => void] {
  const listRef = useRef<T[]>(defaultValue);

  const setListRef = (element: T, index?: number) => {
    if (index !== undefined) {
      listRef.current[index] = element;
    } else {
      listRef.current.push(element);
    }
  };

  return [listRef.current, setListRef];
}

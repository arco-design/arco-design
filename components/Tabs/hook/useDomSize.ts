import { useRef, useState, MutableRefObject, useEffect } from 'react';

export type ReturnType = {
  height: number;
  width: number;
  domRect?: DOMRect;
};

export default function DomSize<T extends HTMLElement>(): [
  MutableRefObject<T>,
  ReturnType,
  React.Dispatch<React.SetStateAction<ReturnType>>
] {
  const domRef = useRef<T>();
  const [size, setSize] = useState<ReturnType>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (domRef.current) {
      setSize({
        height: domRef.current.offsetHeight,
        width: domRef.current.offsetWidth,
        domRect: domRef.current.getBoundingClientRect(),
      });
    }
  }, []);

  return [domRef, size, setSize];
}

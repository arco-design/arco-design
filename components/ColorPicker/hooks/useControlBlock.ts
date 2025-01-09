import { useRef, useState } from 'react';

interface MultiValueItem {
  value: [number, number];
  key: string;
}

interface ControlBlockParams {
  value: [number, number] | MultiValueItem[];
  multiple?: boolean;
  onActive?: (key: string) => void;
  onAdd?: (value: [number, number]) => void;
  onChange: (value: [number, number], key?: string) => void;
}

export const useControlBlock = ({
  value,
  multiple = false,
  onActive,
  onAdd,
  onChange,
}: ControlBlockParams) => {
  const [active, setActive] = useState(false);
  const blockRef = useRef<HTMLDivElement>();
  const handlerRef = useRef<HTMLDivElement>();

  const getPercentNumber = (value: number, max: number) => {
    if (value < 0) {
      return 0;
    }
    if (value > max) {
      return 1;
    }
    return value / max;
  };

  const getNewPosition = (ev: MouseEvent): [number, number] => {
    const { clientX, clientY } = ev;
    const rect = blockRef.current.getBoundingClientRect();
    return [
      getPercentNumber(clientX - rect.x, rect.width),
      getPercentNumber(clientY - rect.y, rect.height),
    ];
  };

  const setCurrentPosition = (ev: MouseEvent) => {
    const newValue = getNewPosition(ev);
    if (multiple || (!multiple && (newValue[0] !== value[0] || newValue[1] !== value[1]))) {
      onChange?.(newValue);
    }
  };

  const removeListener = () => {
    setActive(false);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', removeListener);
    window.removeEventListener('contextmenu', removeListener);
  };

  const onMouseDown = (ev: MouseEvent) => {
    ev.preventDefault();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', removeListener);
    window.addEventListener('contextmenu', removeListener);
    setActive(true);
    if (multiple) {
      if (ev.target === blockRef.current) {
        onAdd(getNewPosition(ev));
      } else if (typeof (ev.target as HTMLDivElement)?.dataset?.key !== 'undefined') {
        const key = (ev.target as HTMLDivElement).dataset.key!;
        onActive(key);
      }
      return;
    }
    setCurrentPosition(ev);
  };

  function onMouseMove(ev: MouseEvent) {
    ev.preventDefault();
    if (ev.buttons > 0) {
      setCurrentPosition(ev);
    } else {
      removeListener();
    }
  }

  return {
    active,
    blockRef,
    handlerRef,
    onMouseDown,
  };
};

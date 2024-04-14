import { useRef, useState } from 'react';

interface ControlBlockParams {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const useControlBlock = ({ value, onChange }: ControlBlockParams) => {
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

  const setCurrentPosition = (ev: MouseEvent) => {
    const { clientX, clientY } = ev;
    const rect = blockRef.current.getBoundingClientRect();
    const newValue: [number, number] = [
      getPercentNumber(clientX - rect.x, rect.width),
      getPercentNumber(clientY - rect.y, rect.height),
    ];
    if (newValue[0] !== value[0] || newValue[1] !== value[1]) {
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
    setActive(true);
    setCurrentPosition(ev);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', removeListener);
    window.addEventListener('contextmenu', removeListener);
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

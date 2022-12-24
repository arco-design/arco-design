import { useRef } from 'react';
import { isNumber } from '../_util/is';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';

export default function useSelectionRange({
  inputElement,
  inputValue,
}: {
  inputElement: HTMLInputElement;
  inputValue: string;
}) {
  // Selection position from the tail (e.g. 1234|56, this value will be 2)
  const refSelectionPosition = useRef<number>(null);

  useIsomorphicLayoutEffect(() => {
    try {
      const position = refSelectionPosition.current;
      if (inputElement && inputValue && isNumber(position)) {
        const start = Math.max(0, inputValue.length - position);
        inputElement.setSelectionRange(start, start);
      }
    } catch (err) {
      console.warn('Failed to reset input selection range position', err);
    }
  }, [inputValue]);

  return (event: any) => {
    const { selectionEnd: end, value } = event.target as HTMLInputElement;
    if (isNumber(end)) {
      refSelectionPosition.current = value.length - end;
    }
  };
}

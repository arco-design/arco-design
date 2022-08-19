import { useEffect } from 'react';

export default function usePickerFocused(
  mousedownFn: (e: MouseEvent) => void,
  popupVisible: boolean,
  setFocused
) {
  useEffect(() => {
    if (popupVisible) {
      setFocused && setFocused(popupVisible);
    }
    window.addEventListener('mousedown', mousedownFn);
    return () => {
      window.removeEventListener('mousedown', mousedownFn);
    };
  }, [popupVisible]);
}

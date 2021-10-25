import { useEffect, useState } from 'react';
import responsiveObserve from './responsiveObserve';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    responsiveObserve.subscribe((screens) => {
      if (screens.md) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, []);

  return isMobile;
}

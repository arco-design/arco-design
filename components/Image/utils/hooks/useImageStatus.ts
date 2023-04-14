import { useState } from 'react';

type ImageStatusType = 'beforeLoad' | 'loading' | 'error' | 'loaded' | 'lazyload';

export default function useImageStatus(defaultValue: ImageStatusType) {
  const [status, setStatus] = useState<ImageStatusType>(defaultValue);
  const isBeforeLoad = status === 'beforeLoad';
  const isLoading = status === 'loading';
  const isError = status === 'error';
  const isLoaded = status === 'loaded';
  const isLazyLoad = status === 'lazyload';
  return {
    status,
    isBeforeLoad,
    isLoading,
    isError,
    isLoaded,
    isLazyLoad,
    setStatus,
  };
}

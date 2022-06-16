import { useEffect, useState } from 'react';

export enum IMG_LOAD_STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const defaultState: {
  src: undefined | string;
  status: IMG_LOAD_STATUS;
} = { src: undefined, status: IMG_LOAD_STATUS.LOADING };

export default function useImage(url: string, crossOrigin?: string) {
  const [image, setImage] = useState<typeof defaultState>(defaultState);
  const [imageRul, setImageRul] = useState<string>('');

  useEffect(() => {
    setImageRul(url);
  }, [url]);

  useEffect(() => {
    if (!imageRul) return;
    const img = document.createElement('img');
    const onLoad = () => setImage({ src: img.src, status: IMG_LOAD_STATUS.SUCCESS });
    const onError = () => setImage({ src: undefined, status: IMG_LOAD_STATUS.FAILED });

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.src = imageRul;

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
      setImage(defaultState);
    };
  }, [imageRul, crossOrigin]);

  return {
    ...image,
    setImageRul,
  };
}

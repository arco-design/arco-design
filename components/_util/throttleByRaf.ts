import { raf, caf } from './raf';

export default function (cb: (...args: any[]) => void) {
  let timer: null | number = null;

  const throttle = function (...args: any[]) {
    timer && caf(timer);
    timer = raf(() => {
      cb(...args);
      timer = null;
    });
  };

  throttle.cancel = () => {
    caf(timer);
    timer = null;
  };

  return throttle;
}

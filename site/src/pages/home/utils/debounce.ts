export function debounce(fn: () => void, delay: number, immediate?: boolean) {
  let timer = null;
  return function (...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) {
        fn.apply(context, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}

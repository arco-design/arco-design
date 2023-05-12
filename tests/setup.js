const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// import '@testing-library/jest-dom';

jest.mock('lodash/debounce', () =>
  jest.fn(function (fn, time) {
    let timeoutId;
    function cancel() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
    function wrapper(...args) {
      cancel();
      timeoutId = setTimeout(() => {
        timeoutId = null;
        fn(...args);
      }, time);
    }
    wrapper.cancel = cancel;
    return wrapper;
  })
);

Enzyme.configure({ adapter: new Adapter() });

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // window.requestAnimationFrame = (cb) => {
  //   let handle = setTimeout(() => {
  //     handle = null;
  //     cb();
  //   }, 0);

  //   return handle;
  // };

  // window.cancelAnimationFrame = (handle) => {
  //   return handle && clearTimeout(handle);
  // };
}

export const on = (function () {
  return function (
    element: any,
    event: string,
    handler: EventListener | EventListenerObject | Function,
    capture?: boolean
  ) {
    element.addEventListener(event, handler, capture || false);
  };
})();

export const off = (function () {
  return function (
    element: any,
    event: string,
    handler: EventListener | EventListenerObject | Function,
    capture?: boolean
  ) {
    element.removeEventListener(event, handler, capture || false);
  };
})();

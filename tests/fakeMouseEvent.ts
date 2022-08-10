// https://github.com/testing-library/react-testing-library/issues/268
interface MouseEventWithOffsets extends MouseEventInit {
  pageX?: number;
  pageY?: number;
  offsetX?: number;
  offsetY?: number;
  x?: number;
  y?: number;
}

export function mockMouseEvent(type: string, values: MouseEventWithOffsets = {}) {
  values = {
    bubbles: true,
    cancelable: true,
    ...values,
  };

  const { pageX, pageY, offsetX, offsetY, x, y, ...mouseValues } = values;

  const mouseEvent = new MouseEvent(type, mouseValues);
  Object.assign(mouseEvent, {
    offsetX: offsetX || 0,
    offsetY: offsetY || 0,
    pageX: pageX || 0,
    pageY: pageY || 0,
    x: x || 0,
    y: y || 0,
  });
  return mouseEvent;
}

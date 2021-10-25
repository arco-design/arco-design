export default function getFixTranslate(
  wrapperRect: DOMRect,
  imgRect: DOMRect,
  translateX: number,
  translateY: number,
  scale: number
): [number, number] {
  let fixTranslateX = translateX;
  let fixTranslateY = translateY;
  if (translateX) {
    // No translateX if width of img is smaller than width of wrapper
    if (wrapperRect.width > imgRect.width) {
      fixTranslateX = 0;
    } else {
      // Width of image is greater than width of wrapper
      if (imgRect.left > wrapperRect.left) {
        // Reduce translateX to make image move to left if left side of image is within wrapper
        fixTranslateX -= Math.abs(wrapperRect.left - imgRect.left) / scale;
      }
      if (imgRect.right < wrapperRect.right) {
        // Enlarge translateX to make image move to right if right side of image is within wrapper
        fixTranslateX += Math.abs(wrapperRect.right - imgRect.right) / scale;
      }
    }
  }
  if (translateY) {
    // No translateY if height of img is smaller than height of wrapper
    if (wrapperRect.height > imgRect.height) {
      fixTranslateY = 0;
    } else {
      // Height of image is greater than height of wrapper
      if (imgRect.top > wrapperRect.top) {
        // Reduce translateY to make image move to top if top side of image is within wrapper
        fixTranslateY -= Math.abs(wrapperRect.top - imgRect.top) / scale;
      }
      if (imgRect.bottom < wrapperRect.bottom) {
        // Enlarge translateY to make image move to bottom if bottom side of image is within wrapper
        fixTranslateY += Math.abs(wrapperRect.bottom - imgRect.bottom) / scale;
      }
    }
  }
  return [fixTranslateX, fixTranslateY];
}

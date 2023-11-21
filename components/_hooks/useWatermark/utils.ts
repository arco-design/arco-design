// canvas渲染图片会导致图片失焦模糊，
// 需要对图片进行缩放保证可读性

// polyfill 提供了这个方法用来获取设备的 pixel ratio
export function getPixelRatio(context: any) {
  if (!context) return 1;

  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
}

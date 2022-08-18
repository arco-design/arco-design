import { isArray } from '../../_util/is';

export const defaultScales = [
  25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500,
];

type ZoomType = 'zoomIn' | 'zoomOut';

class PreviewScales {
  private scaleAttr: any;

  constructor(scales: number[]) {
    this.updateScale(scales);
  }

  get scales() {
    return this.scaleAttr;
  }

  get minScale() {
    return this.scaleAttr[0];
  }

  get maxScale() {
    return this.scaleAttr[this.scaleAttr.length - 1];
  }

  updateScale(scales: number[]) {
    let validScales = defaultScales;

    if (isArray(scales) && scales.filter((num) => num > 0).length) {
      validScales = scales.filter((num) => num > 0);
    }

    validScales = validScales.map((num) => +(num / 100).toFixed(2));

    // 如果缩放比例中不含1， 则需要手动添加在最合适的位置
    if (!validScales.includes(1)) {
      const closestIndex = this.findClosestIndex(1, validScales);
      const closeSale = validScales[closestIndex];
      const addIndex = closeSale < 1 ? closestIndex + 1 : closestIndex;
      validScales.splice(addIndex, 0, 1);
    }

    this.scaleAttr = validScales;
  }

  private findClosestIndex(scale, scales = this.scaleAttr): number {
    if (!scales.length) return;
    if (scales.length === 1) return 0;

    let closestIndex = scales.length - 1;
    for (let i = 0; i < scales.length; i++) {
      const current = scales[i];
      if (scale === current) {
        closestIndex = i;
        break;
      }
      if (scale < current) {
        const pre = scales[i - 1];
        closestIndex =
          pre === undefined || Math.abs(pre - scale) <= Math.abs(current - scale) ? i - 1 : i;
        break;
      }
    }
    return closestIndex;
  }

  getNextScale(cur: number, type: ZoomType = 'zoomIn'): number {
    let index = this.scaleAttr.indexOf(cur);
    if (index === -1) {
      index = this.findClosestIndex(cur);
    }
    if (type === 'zoomIn') {
      return index === this.scaleAttr.length - 1 ? cur : this.scaleAttr[index + 1];
    }
    return index === 0 ? cur : this.scaleAttr[index - 1];
  }
}

export default PreviewScales;

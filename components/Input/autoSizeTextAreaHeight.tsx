// auto set textarea height
import { isObject, isNumber } from '../_util/is';

const mirrorTextAreaStyle = `
  position: absolute;
  min-height: 0 !important;
  max-height: none;
  height:0;
  visibility: hidden;
  z-index: -100;
  top: 0;
  right: 0;
`;

const mirrorTextAreaSizing = [
  'border-width',
  'box-sizing',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'text-indent',
  'text-rendering',
  'text-transform',
  'width',
];

let mirrorTextArea: HTMLTextAreaElement;

function setMirrorTextArea(originTextArea: HTMLTextAreaElement): {
  paddingSize: number;
  boxSizing: string;
  borderSize: number;
} {
  if (!mirrorTextArea) {
    mirrorTextArea = document.createElement('textarea');
    document.body.appendChild(mirrorTextArea);
  }
  const originStyle = window.getComputedStyle(originTextArea);
  const originSizingStyle = `
    ${mirrorTextAreaSizing.map((attr) => `${attr}:${originStyle.getPropertyValue(attr)}`).join(';')}
  `;
  mirrorTextArea.setAttribute('style', `${mirrorTextAreaStyle}${originSizingStyle}`);
  const paddingSize =
    parseFloat(originStyle.getPropertyValue('padding-top')) +
    parseFloat(originStyle.getPropertyValue('padding-bottom'));
  const boxSizing = originStyle.getPropertyValue('box-sizing');
  const borderSize =
    parseFloat(originStyle.getPropertyValue('border-top-width')) +
    parseFloat(originStyle.getPropertyValue('border-bottom-width'));
  return {
    paddingSize,
    boxSizing,
    borderSize,
  };
}

function autoSizeTextAreaHeight(
  autoSize?: boolean | { minRows?: number; maxRows?: number },
  node?: HTMLTextAreaElement
) {
  const getRows = () => {
    let minRows;
    let maxRows;
    if (isObject(autoSize)) {
      minRows = (autoSize as any).minRows;
      maxRows = (autoSize as any).maxRows;
    }
    return {
      minRows,
      maxRows,
    };
  };
  if (autoSize) {
    const { minRows, maxRows } = getRows();
    const originTextNode = node as HTMLTextAreaElement;
    const { paddingSize, boxSizing, borderSize } = setMirrorTextArea(originTextNode);
    mirrorTextArea.value = originTextNode.value || originTextNode.placeholder || '';
    let mirrorTextAreaHeight = mirrorTextArea.scrollHeight + borderSize;
    let minHeight;
    let maxHeight;
    let overflowY;
    if (minRows || maxRows) {
      mirrorTextArea.value = '';
      const singleRowHeight = mirrorTextArea.scrollHeight - paddingSize;
      if (isNumber(minRows)) {
        minHeight = singleRowHeight * minRows;
        if (boxSizing === 'border-box') {
          minHeight += paddingSize;
          minHeight += borderSize;
        }
        mirrorTextAreaHeight = Math.max(mirrorTextAreaHeight, minHeight);
      }
      if (isNumber(maxRows)) {
        maxHeight = singleRowHeight * maxRows;
        if (boxSizing === 'border-box') {
          maxHeight += paddingSize;
          maxHeight += borderSize;
        }
        overflowY = mirrorTextAreaHeight > maxHeight ? 'auto' : '';
        maxHeight = Math.min(mirrorTextAreaHeight, maxHeight);
      }
    }
    const textAreaStyle: any = {};
    textAreaStyle.height = mirrorTextAreaHeight;
    if (minHeight) {
      textAreaStyle.minHeight = minHeight;
    }
    if (maxHeight) {
      textAreaStyle.maxHeight = maxHeight;
    }
    if (overflowY) {
      textAreaStyle.overflowY = overflowY;
    }
    return textAreaStyle;
  }
}

export default autoSizeTextAreaHeight;

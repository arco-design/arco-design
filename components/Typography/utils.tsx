import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { isNumber } from '../_util/is';
import mergedToString from '../_util/mergedToString';

interface ExtraStyle {
  [key: string]: string;
}
function styleToString(style: CSSStyleDeclaration, extraStyle: ExtraStyle) {
  const styleNames: string[] = Array.prototype.slice.apply(style);
  const styleString = styleNames
    .map((name) => `${name}: ${style.getPropertyValue(name)};`)
    .join('');
  const extraStyleString = Object.entries(extraStyle)
    .map(([key, value]) => `${key}: ${value};`)
    .join('');
  return styleString + extraStyleString;
}
function pxToNumber(value: string | null): number {
  if (!value) return 0;

  const match = value.match(/^\d*(\.\d*)?/);

  return match ? Number(match[0]) : 0;
}

let mirrorElement: HTMLElement;

export function measure(
  originElement: HTMLElement,
  ellipsisConfig,
  operations,
  children,
  simple?: boolean
) {
  const rows = ellipsisConfig.rows || 1;
  const ellipsisStr = ellipsisConfig.ellipsisStr !== undefined ? ellipsisConfig.ellipsisStr : '...';
  const suffix = ellipsisConfig.suffix !== undefined ? ellipsisConfig.suffix : '';

  if (mirrorElement && originElement.tagName !== mirrorElement.tagName) {
    document.body.removeChild(mirrorElement);
    mirrorElement = undefined;
  }
  if (!mirrorElement) {
    mirrorElement = document.createElement(originElement.tagName);
    document.body.appendChild(mirrorElement);
  }
  const originStyle = window.getComputedStyle(originElement);
  const extraStyle: ExtraStyle = {
    height: 'auto',
    'min-height': 'auto',
    'max-height': 'auto',
    left: '0',
    top: '-99999999px',
    // top:'100px',
    position: 'fixed',
    'z-index': '-200',
    'text-overflow': 'clip',
    overflow: 'auto',
  };
  if (!isNumber(originStyle.width)) {
    const rect = originElement.getBoundingClientRect();
    extraStyle.width = `${rect.width}px`;
  }
  const styleString = styleToString(originStyle, extraStyle);
  mirrorElement.setAttribute('style', styleString);
  mirrorElement.setAttribute('aria-hidden', 'true');
  render(<span>{operations}</span>, mirrorElement);

  const operationsChildNodes = Array.prototype.slice.apply(
    mirrorElement.childNodes[0].cloneNode(true).childNodes
  );

  const fullText = mergedToString(React.Children.toArray(children));
  unmountComponentAtNode(mirrorElement);
  mirrorElement.innerHTML = '';

  const ellipsisTextNode = document.createTextNode(`${ellipsisStr}${suffix}`);
  mirrorElement.appendChild(ellipsisTextNode);
  operationsChildNodes.forEach((childNode) => {
    mirrorElement.appendChild(childNode);
  });

  const textNode = document.createTextNode(fullText);
  mirrorElement.insertBefore(textNode, mirrorElement.firstChild);

  const lineHeight = pxToNumber(originStyle.lineHeight);
  const maxHeight = Math.round(
    lineHeight * rows + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom)
  );

  function emptyMirrorElem() {
    mirrorElement.setAttribute('style', 'display: none');
    mirrorElement.innerHTML = '';
  }

  function inRange() {
    return mirrorElement.scrollHeight <= maxHeight;
  }

  if (inRange()) {
    unmountComponentAtNode(mirrorElement);
    emptyMirrorElem();
    return { text: fullText, ellipsis: false };
  }

  if (simple) {
    emptyMirrorElem();
    return { ellipsis: true, text: fullText };
  }

  function measureText(textNode: Text, startLoc = 0, endLoc = fullText.length, lastSuccessLoc = 0) {
    const midLoc = Math.floor((startLoc + endLoc) / 2);
    const currentText = fullText.slice(0, midLoc);
    textNode.textContent = currentText;

    if (startLoc >= endLoc - 1) {
      for (let step = endLoc; step >= startLoc; step -= 1) {
        const currentStepText = fullText.slice(0, step);
        textNode.textContent = currentStepText;

        if (inRange() || !currentStepText) {
          return;
        }
      }
    }

    if (inRange()) {
      return measureText(textNode, midLoc, endLoc, midLoc);
    }
    return measureText(textNode, startLoc, midLoc, lastSuccessLoc);
  }

  measureText(textNode);
  const ellipsisText = textNode.textContent;

  emptyMirrorElem();
  return {
    text: ellipsisText,
    ellipsis: true,
  };
}

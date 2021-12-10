import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import mergedToString from '../_util/mergedToString';

function styleToString(style: CSSStyleDeclaration, extraStyle: { [key: string]: string } = {}) {
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

  if (!mirrorElement) {
    mirrorElement = document.createElement(originElement.tagName);
    document.body.appendChild(mirrorElement);
  }
  const originStyle = window.getComputedStyle(originElement);

  const extraStyle = {
    height: 'auto',
    'min-height': 'auto',
    'max-height': 'auto',
    left: '0',
    top: '-99999999px',
    // top:'100px',
    position: 'fixed',
    'z-index': '-200',
    'white-space': 'normal',
    'text-overflow': 'clip',
    overflow: 'auto',
  };
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

  function clearMirrorStyle() {
    mirrorElement.setAttribute('style', 'display: none');
  }

  function inRange() {
    return mirrorElement.offsetHeight <= maxHeight;
  }

  if (inRange()) {
    unmountComponentAtNode(mirrorElement);
    clearMirrorStyle();
    return { text: fullText, ellipsis: false };
  }

  if (simple) {
    clearMirrorStyle();
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

  clearMirrorStyle();
  return {
    text: textNode.textContent,
    ellipsis: true,
  };
}

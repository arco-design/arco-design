import { Dayjs } from 'dayjs';
import { isValidElement } from 'react';
import ReactDOM from 'react-dom';
import { isForwardRef } from 'react-is';

const opt = Object.prototype.toString;

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]';
}

export function isObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]';
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]';
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

export function isRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]';
}

export function isFile(obj: any): obj is File {
  return opt.call(obj) === '[object File]';
}

export function isBlob(obj: any): obj is Blob {
  return opt.call(obj) === '[object Blob]';
}

function isHex(color) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
}

function isRgb(color) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color);
}

function isRgba(color) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color);
}
export function isColor(color: any): boolean {
  return isHex(color) || isRgb(color) || isRgba(color);
}
export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function isNull(obj: any): obj is null {
  return obj === null;
}

export function isNullOrUndefined(obj: any): boolean {
  return obj === null || obj === undefined;
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function';
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isEmptyReactNode(content: any, trim?: boolean): boolean {
  if (content === null || content === undefined || content === false) {
    return true;
  }
  if (typeof content === 'string' && (trim ? content.trim() === '' : content === '')) {
    return true;
  }
  return false;
}

export function isExist(obj: any): boolean {
  return obj || obj === 0;
}

export function isWindow(el: any): el is Window {
  return el === window;
}

export function isDayjs(time): time is Dayjs {
  // dayjs.isDayjs 在实际应用场景，比如多个版本的 dayjs 会失效
  return (
    isObject(time) &&
    (('$y' in time &&
      '$M' in time &&
      '$D' in time &&
      '$d' in time &&
      '$H' in time &&
      '$m' in time &&
      '$s' in time) ||
      time._isAMomentObject) // 兼容 moment 的验证
  );
}

export function isBoolean(value: any): value is Boolean {
  return typeof value === 'boolean';
}

export const isReactComponent = (element: any): boolean => {
  return element && isValidElement(element) && typeof element.type === 'function';
};

export const isClassComponent = (element: any): boolean => {
  return isReactComponent(element) && !!element.type.prototype?.isReactComponent;
};

// element 是合成的 dom 元素或者字符串，数字等
export const isDOMElement = (element: any): boolean => {
  return isValidElement(element) && typeof element.type === 'string';
};

export const isReact18 = Number(ReactDOM.version?.split('.')[0]) > 17;
export const isReact19 = Number(ReactDOM.version?.split('.')[0]) > 18;

// 基本copy:  https://github.com/facebook/react/blob/main/packages/react-is/src/ReactIs.js
// 改动了点逻辑
const isForwardRefReact = (object) => {
  if (!isReact19) {
    return isForwardRef(object);
  }
  // react 19 兜底走以下逻辑
  const REACT_ELEMENT_TYPE = Symbol.for('react.element');
  // react 19 改名了
  const NEW_REACT_ELEMENT_TYPE = Symbol.for('react.transitional.element');
  const REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');

  if (typeof object === 'object' && object !== null) {
    const $$typeof = object.$$typeof;

    if ($$typeof === REACT_ELEMENT_TYPE || $$typeof === NEW_REACT_ELEMENT_TYPE) {
      const type = object.type;
      const $$typeofType = type && type.$$typeof;
      return $$typeofType === REACT_FORWARD_REF_TYPE;
    }
  }
  return false;
};
// 传入的元素是否可以设置 ref 饮用
export const supportRef = (element: any): boolean => {
  if (isDOMElement(element)) {
    return true;
  }

  if (isForwardRefReact(element)) {
    return true;
  }

  if (isReactComponent(element)) {
    return isClassComponent(element); // 函数组件且没有被 forwardRef，无法设置 ref
  }

  return false;
};

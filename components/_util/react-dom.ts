import { Component, ReactElement, ReactInstance } from 'react';
import ReactDOM from 'react-dom';
import { isObject, isFunction, isReact18 } from './is';
import warning from './warning';

type CreateRootFnType = (container: Element | DocumentFragment) => {
  render: (container: ReactElement) => void;
  unmount: () => void;
  _unmount: () => void;
};

const __SECRET_INTERNALS__ = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';

const CopyReactDOM = ReactDOM as typeof ReactDOM & {
  createRoot: CreateRootFnType;
  // https://github.com/facebook/react/blob/4ff5f5719b348d9d8db14aaa49a48532defb4ab7/packages/react-dom/src/client/ReactDOM.js#L181
  [__SECRET_INTERNALS__]: {
    usingClientEntryPoint?: boolean;
  };
};

const updateUsingClientEntryPoint = (skipWarning?: boolean) => {
  // https://github.com/facebook/react/blob/17806594cc28284fe195f918e8d77de3516848ec/packages/react-dom/npm/client.js#L10
  // Avoid console warning
  if (isObject(CopyReactDOM[__SECRET_INTERNALS__])) {
    CopyReactDOM[__SECRET_INTERNALS__].usingClientEntryPoint = skipWarning;
  }
};

let createRoot: CreateRootFnType;

try {
  createRoot = CopyReactDOM.createRoot;
} catch (_) {
  //
}

let copyRender: (
  app: ReactElement,
  container: Element | DocumentFragment
) => {
  render: (container: ReactElement) => void;
  _unmount: () => void;
};

const setCopyRender = () => {
  if (isReact18 && createRoot) {
    copyRender = (app: ReactElement, container: Element | DocumentFragment) => {
      updateUsingClientEntryPoint(true);
      const root = createRoot(container);
      updateUsingClientEntryPoint(false);

      root.render(app);

      root._unmount = function () {
        setTimeout(() => {
          root?.unmount?.();
        });
      };
      return root;
    };
  } else {
    copyRender = function (app: ReactElement, container: Element | DocumentFragment) {
      CopyReactDOM.render(app, container);

      return {
        render: (app: ReactElement) => {
          CopyReactDOM.render(app, container);
        },
        _unmount() {
          CopyReactDOM.unmountComponentAtNode(container);
        },
      };
    };
  }
};

let warnedInstancesWeakSet: WeakSet<Function> | undefined;
function hasInstanceWarned(instance: ReactInstance) {
  const ctor = instance.constructor;
  if (typeof ctor !== 'function') return false;
  if (!warnedInstancesWeakSet && typeof WeakSet === 'function') {
    warnedInstancesWeakSet = new WeakSet();
  }
  const hasWarned = !!warnedInstancesWeakSet?.has(ctor);
  warnedInstancesWeakSet?.add(ctor);
  return hasWarned;
}

/**
 *
 * @param element
 * @param instance: 兜底 findDOMNode 查找，一般都是 this
 * @returns
 */
export const findDOMNode = (element: any, instance?: ReactInstance) => {
  // 类组件，非 forwardRef(function component) 都拿不到真实dom
  if (element && element instanceof Element) {
    return element;
  }

  if (element && element.current && element.current instanceof Element) {
    return element.current;
  }

  // react 19 findDOMNode已经被废弃，调用直接报错，所以优先读取 getRootDOMNode 方法
  if (element && isFunction(element.getRootDOMNode)) {
    return element.getRootDOMNode();
  }

  if (element instanceof Component) {
    if (ReactDOM.findDOMNode) {
      return ReactDOM.findDOMNode(element);
    }
  }

  // 一般 useImperativeHandle 的元素拿到的 ref 不是 dom 元素且不存在 getRootDOMNode ，会走到这里。
  if (instance) {
    warning(
      isReact18 && !hasInstanceWarned(instance),
      'Element does not define the `getRootDOMNode` method causing a call to React.findDOMNode. but findDOMNode is deprecated in StrictMode. Please check the code logic',
      { element, instance }
    );
    if (ReactDOM.findDOMNode) {
      return ReactDOM.findDOMNode(instance);
    }
  }

  return null;
};

// 回调children的原始 ref ，适配函数 ref or ref.current 场景
export const callbackOriginRef = (children: any, node) => {
  if (children && children.ref) {
    if (isFunction(children.ref)) {
      children?.ref(node);
    }
    if ('current' in children.ref) {
      children.ref.current = node;
    }
  }
};

// 这个主要是给 polyfill 调用下。 因为 react 19 的 index.js 不会再导出 createRoot，必须从 react-dom/client 导入 createRoot
export const setCreateRoot = (_createRoot) => {
  createRoot = _createRoot;
  setCopyRender();
};

setCopyRender();

export const render = (node, el) => {
  return copyRender(node, el);
};

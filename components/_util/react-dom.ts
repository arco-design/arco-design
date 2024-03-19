import { Component, ReactElement, ReactInstance } from 'react';
import ReactDOM from 'react-dom';
import { isObject, isFunction } from './is';
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

let copyRender: (
  app: ReactElement,
  container: Element | DocumentFragment
) => {
  render: (container: ReactElement) => void;
  _unmount: () => void;
};

const isReact18 = Number(CopyReactDOM.version?.split('.')[0]) > 17;

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

  if (element instanceof Component) {
    return ReactDOM.findDOMNode(element);
  }

  if (element && isFunction(element.getRootDOMNode)) {
    return element.getRootDOMNode();
  }

  // 一般 useImperativeHandle 的元素拿到的 ref 不是 dom 元素且不存在 getRootDOMNode ，会走到这里。
  if (instance) {
    warning(
      true,
      'Element does not define the `getRootDOMNode` method causing a call to React.findDOMNode. but findDOMNode is deprecated in StrictMode. Please check the code logic',
      { element, instance }
    );
    return ReactDOM.findDOMNode(instance);
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

export const render = copyRender;

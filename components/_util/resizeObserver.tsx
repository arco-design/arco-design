import React, { ReactElement, cloneElement, isValidElement } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import lodashThrottle from 'lodash/throttle';
import { callbackOriginRef, findDOMNode } from '../_util/react-dom';
import { supportRef, isReact19, isDOMElement, isForwardRefComponent } from './is';

export interface ResizeProps {
  throttle?: boolean;
  onResize?: (entry: ResizeObserverEntry[]) => void;
  children?: React.ReactNode;
  getTargetDOMNode?: () => any;
  delayOnResizeByRaf?: boolean;
}

class ResizeObserverComponent extends React.Component<ResizeProps> {
  resizeObserver: ResizeObserver;

  rootDOMRef: any;

  resizeFrameId: number;

  latestEntry: ResizeObserverEntry[];

  getRootElement = () => {
    const { getTargetDOMNode } = this.props;
    return findDOMNode(getTargetDOMNode?.() || this.rootDOMRef, this);
  };

  getRootDOMNode = () => {
    return this.getRootElement();
  };

  componentDidMount() {
    if (!React.isValidElement(this.props.children)) {
      console.warn('The children of ResizeObserver is invalid.');
    } else {
      this.createResizeObserver();
    }
  }

  componentDidUpdate() {
    if (!this.resizeObserver && this.getRootElement()) {
      this.createResizeObserver();
    }
  }

  componentWillUnmount = () => {
    if (this.resizeFrameId) {
      cancelAnimationFrame(this.resizeFrameId);
      this.resizeFrameId = null;
    }
    if (this.resizeObserver) {
      this.destroyResizeObserver();
    }
  };

  createResizeObserver = () => {
    const { throttle = true, delayOnResizeByRaf = false } = this.props;
    const onResize = (entry) => {
      this.props.onResize?.(entry);
    };

    const resizeHandler = throttle ? lodashThrottle(onResize) : onResize;

    let firstExec = true; // 首次监听时，立即执行一次 onResize，之前行为保持一致，避免布局类组件出现闪动的情况
    this.resizeObserver = new ResizeObserver((entry) => {
      if (firstExec) {
        firstExec = false;
        onResize(entry);
      }

      if (delayOnResizeByRaf) {
        this.latestEntry = entry;
        if (!this.resizeFrameId) {
          this.resizeFrameId = requestAnimationFrame(() => {
            this.resizeFrameId = null;
            resizeHandler(this.latestEntry);
          });
        }
        return;
      }

      resizeHandler(entry);
    });
    const targetNode = this.getRootElement();
    targetNode && this.resizeObserver.observe(targetNode as Element);
  };

  destroyResizeObserver = () => {
    this.resizeObserver && this.resizeObserver.disconnect();
    this.resizeObserver = null;
    this.latestEntry = null;
  };

  render() {
    const { children } = this.props;

    if (!this.props.getTargetDOMNode && isValidElement(children)) {
      // react 19 移除了 ReactDOM.findDOMNode，类组件、未使用 forwardRef 的函数组件
      // 无法通过 ref 拿到真实 dom 节点，包裹一层 span 以保证能被 ResizeObserver 观测。
      if (isReact19 && !isDOMElement(children) && !isForwardRefComponent(children)) {
        return (
          <span
            ref={(node) => {
              this.rootDOMRef = node;
            }}
          >
            {children}
          </span>
        );
      }

      if (supportRef(children)) {
        return cloneElement(children as ReactElement, {
          ref: (node) => {
            this.rootDOMRef = node;

            callbackOriginRef(children, node);
          },
        });
      }
    }
    this.rootDOMRef = null;
    return this.props.children;
  }
}

export default ResizeObserverComponent;

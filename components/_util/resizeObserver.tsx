import React, { ReactElement, cloneElement, isValidElement } from 'react';
import ResizeObserverPolyfill from 'resize-observer-polyfill';
import lodashThrottle from 'lodash/throttle';
import { callbackOriginRef, findDOMNode } from '../_util/react-dom';
import { supportRef } from './is';

export interface ResizeProps {
  throttle?: boolean;
  onResize?: (entry: ResizeObserverEntry[]) => void;
  children?: React.ReactNode;
  getTargetDOMNode?: () => any;
}

class ResizeObserverComponent extends React.Component<ResizeProps> {
  resizeObserver: ResizeObserver;

  rootDOMRef: any;

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
    if (this.resizeObserver) {
      this.destroyResizeObserver();
    }
  };

  createResizeObserver = () => {
    const { throttle = true } = this.props;
    const onResize = (entry) => {
      this.props.onResize?.(entry);
    };

    const resizeHandler = throttle ? lodashThrottle(onResize) : onResize;

    let firstExec = true; // 首次监听时，立即执行一次 onResize，之前行为保持一致，避免布局类组件出现闪动的情况
    const ResizeObserver =
      typeof window !== 'undefined' && window.ResizeObserver
        ? window.ResizeObserver
        : ResizeObserverPolyfill;
    this.resizeObserver = new ResizeObserver((entry) => {
      if (firstExec) {
        firstExec = false;
        onResize(entry);
      }
      resizeHandler(entry);
    });
    const targetNode = this.getRootElement();
    targetNode && this.resizeObserver.observe(targetNode as Element);
  };

  destroyResizeObserver = () => {
    this.resizeObserver && this.resizeObserver.disconnect();
    this.resizeObserver = null;
  };

  render() {
    const { children } = this.props;

    if (supportRef(children) && isValidElement(children) && !this.props.getTargetDOMNode) {
      return cloneElement(children as ReactElement, {
        ref: (node) => {
          this.rootDOMRef = node;

          callbackOriginRef(children, node);
        },
      });
    }
    this.rootDOMRef = null;
    return this.props.children;
  }
}

export default ResizeObserverComponent;

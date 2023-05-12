import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import lodashThrottle from 'lodash/throttle';
import { findDOMNode } from 'react-dom';

export interface ResizeProps {
  throttle?: boolean;
  onResize?: (entry: ResizeObserverEntry[]) => void;
  children?: React.ReactNode;
}

class ResizeObserverComponent extends React.Component<ResizeProps> {
  resizeObserver: any;

  componentDidMount() {
    if (!React.isValidElement(this.props.children)) {
      console.warn('The children of ResizeObserver is invalid.');
    } else {
      this.createResizeObserver();
    }
  }

  componentDidUpdate() {
    if (!this.resizeObserver && findDOMNode(this)) {
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
    this.resizeObserver = new ResizeObserver((entry) => {
      if (firstExec) {
        firstExec = false;
        onResize(entry);
      }
      resizeHandler(entry);
    });
    this.resizeObserver.observe(findDOMNode(this) as Element);
  };

  destroyResizeObserver = () => {
    this.resizeObserver && this.resizeObserver.disconnect();
    this.resizeObserver = null;
  };

  render() {
    return this.props.children;
  }
}

export default ResizeObserverComponent;

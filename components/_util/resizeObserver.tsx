import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash/debounce';

export interface ResizeProps {
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
    this.resizeObserver = new ResizeObserver(
      debounce((entry) => {
        const { onResize } = this.props;
        onResize && onResize(entry);
      }, 16)
    );
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

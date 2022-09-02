import PropTypes from 'prop-types';
import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { findDOMNode } from 'react-dom';

export interface ResizeProps {
  onResize?: (entry: ResizeObserverEntry[]) => void;
}

class ResizeObserverComponent extends React.Component<ResizeProps> {
  static propTypes = {
    onResize: PropTypes.func,
  };

  resizeObserver: any;

  componentDidMount() {
    this.createResizeObserver();
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
    const { onResize } = this.props;
    this.resizeObserver = new ResizeObserver((entry) => {
      onResize && onResize(entry);
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

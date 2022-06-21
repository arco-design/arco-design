import React, { Component, ReactNode } from 'react';
import Portal from './Portal';

export interface PortalWrapperProps {
  /** Portal 挂载的容器 */
  getContainer?: () => Element;
  childrenComponent?: Element;
  forceRender?: boolean;
  visible?: boolean;
  children?: ReactNode;
}

class PortalWrapper extends Component<PortalWrapperProps> {
  static displayName = 'Portal';

  static defaultProps = {
    getContainer: () => document.body,
  };

  instance;

  componentWillUnmount() {
    this.instance = null;
  }

  render() {
    const { forceRender, visible } = this.props;
    return forceRender || visible || this.instance ? (
      <Portal ref={(ref) => (this.instance = ref)} {...this.props} />
    ) : null;
  }
}

export default PortalWrapper;

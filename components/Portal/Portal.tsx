import { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  /** Portal 挂载的容器 */
  getContainer?: () => Element;
  children?: ReactNode;
}

class Portal extends Component<PortalProps> {
  container: Element | null | void = null;

  timer;

  // constructor(props) {
  //   super(props);

  //   const { getContainer } = this.props;
  //   this.container = getContainer?.()
  // }

  componentDidMount() {
    this.createContainer();

    this.timer = setTimeout(() => {
      // getContainer 返回ref时，子组件首先执行 componentDidMount,此时ref还未赋值
      if (!this.container) {
        this.createContainer();
      }
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  createContainer() {
    const { getContainer } = this.props;
    this.container = getContainer?.();
    this.forceUpdate();
  }

  render() {
    const { children } = this.props;
    if (this.container) {
      return ReactDOM.createPortal(children, this.container);
    }
    return null;
  }
}

export default Portal;

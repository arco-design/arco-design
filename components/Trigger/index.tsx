import React, { PureComponent, ReactElement, PropsWithChildren, CSSProperties } from 'react';
import { findDOMNode } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import ResizeObserverPolyfill from 'resize-observer-polyfill';
import { on, off, contains } from '../_util/dom';
import { isFunction } from '../_util/is';
import { Esc } from '../_util/keycode';
import Portal from './portal';
import ResizeObserver from '../_util/resizeObserver';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import getStyle from './getPopupStyle';
import throttleByRaf from '../_util/throttleByRaf';
import { TriggerProps, MouseLocationType } from './interface';
import { raf, caf } from '../_util/raf';
import mergeProps from '../_util/mergeProps';

export { TriggerProps };

function getDOMPos(dom: HTMLElement) {
  if (!dom) {
    return {};
  }
  const { width, height, left, right } = dom.getBoundingClientRect();
  return {
    width,
    height,
    left,
    right,
  };
}
export interface TriggerState {
  popupVisible: boolean;
  popupStyle: object;
}

export const EventsByTriggerNeed = [
  'onClick',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onFocus',
  'onBlur',
  'onContextMenu',
  'onKeyDown',
];

export type EventsByTriggerNeedType =
  | 'onClick'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onFocus'
  | 'onBlur'
  | 'onContextMenu'
  | 'onKeyDown';

function splitChildrenStyle(
  obj: CSSProperties,
  keys: string[]
): { picked: CSSProperties; omitted: CSSProperties } {
  const picked: CSSProperties = {};
  const omitted: CSSProperties = { ...obj };
  keys.forEach((key: string) => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
}

const defaultProps = {
  blurToHide: true,
  clickToClose: true,
  classNames: 'fadeIn',
  trigger: 'hover' as const,
  position: 'bottom' as const,
  duration: 200,
  unmountOnExit: true,
  popupAlign: {},
  popupHoverStay: true,
  clickOutsideToClose: true,
  escToClose: false,
  mouseLeaveToClose: true,
  getDocument: () => window.document as any,
  autoFixPosition: true,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  autoFitPosition: true,
};

class Trigger extends PureComponent<TriggerProps, TriggerState> {
  static displayName = 'Trigger';

  static contextType = ConfigContext;

  context: React.ContextType<typeof ConfigContext>;

  static getDerivedStateFromProps(nextProps, state) {
    if ('popupVisible' in nextProps && nextProps.popupVisible !== state.popupVisible) {
      return {
        popupVisible: nextProps.popupVisible,
      };
    }
    return null;
  }

  popupContainer;

  triggerRef: HTMLSpanElement | null;

  delayTimer: any = null;

  updatePositionTimer: any = null;

  // popup 真正出现的位置
  realPosition: string;

  // arrow 箭头的位置
  arrowStyle: CSSProperties;

  // is popup open?
  popupOpen = false;

  // if mousedown to hide popup, ignore onFocus
  mousedownToHide = false;

  mouseDownTimeout: any;

  hasPopupMouseDown = false;

  // handle click outside document
  handleClickOutside: boolean;

  // 是否监听了window 的resize
  handleWindowResize: boolean;

  unmount = false;

  // 保存鼠标的位置
  mouseLocation: MouseLocationType = {
    clientX: 0,
    clientY: 0,
  };

  // 保存当前的mount container dom元素
  observerContainer = null;

  // container 触发 resize时执行
  resizeObserver = new ResizeObserverPolyfill(() => {
    this.handleContainerResize();
  });

  childrenDom = null;

  // 保存children节点的尺寸。 主要用于在弹出层动画前和动画完成后比较尺寸是否有变化。
  childrenDomSize: ReturnType<typeof getDOMPos> = {};

  getMergedProps = (baseProps?): PropsWithChildren<TriggerProps> => {
    const { componentConfig } = this.context;
    const props = mergeProps<PropsWithChildren<TriggerProps>>(
      baseProps || this.props,
      defaultProps,
      componentConfig?.Trigger
    );
    return props;
  };

  constructor(props, context) {
    super(props, context);

    const mergedProps = this.getMergedProps(props);

    const popupVisible =
      'popupVisible' in mergedProps ? mergedProps.popupVisible : mergedProps.defaultPopupVisible;
    this.popupOpen = !!popupVisible;

    this.state = {
      popupVisible: !!popupVisible,
      popupStyle: {},
    };
  }

  getRootElement = (): HTMLElement => {
    return findDOMNode(this) as HTMLElement;
  };

  isDidMount = false;

  componentDidMount() {
    this.componentDidUpdate(this.getMergedProps());
    this.isDidMount = true;

    this.childrenDom = findDOMNode(this);
    this.childrenDomSize = getDOMPos(this.childrenDom);
  }

  componentDidUpdate(_prevProps) {
    const prevProps = this.getMergedProps(_prevProps);
    const currentProps = this.getMergedProps();
    if (!prevProps.popupVisible && currentProps.popupVisible) {
      this.update();
    }
    const { popupVisible } = this.state;
    this.popupOpen = popupVisible;
    const { getDocument } = currentProps;
    if (!popupVisible) {
      this.offClickOutside();
      this.offContainerResize();
      this.offWindowResize();
      return;
    }

    const rect = getDOMPos(this.childrenDom);
    // children节点的尺寸改变，主要是处理children 存在scale等动画属性，或者移动位置的时候，popup 的位置有问题
    if (JSON.stringify(rect) !== JSON.stringify(this.childrenDomSize)) {
      this.updatePopupPosition();
      this.childrenDomSize = rect;
    }
    // popupVisible为true
    this.onContainerResize();
    if (!this.handleWindowResize) {
      on(window, 'resize', this.handleContainerResize);
      this.handleWindowResize = true;
    }

    if (!this.handleClickOutside) {
      const root = isFunction(getDocument) && (getDocument as Function)();
      if (root) {
        // clickOutside 必须监听mousedown。
        // 1. 如果事件目标元素在click后被移除，document.onclick被触发时已经没有该元素，会错误触发clickOutside逻辑，隐藏popup。
        // 2. 点击label标签，会触发对应input元素的点击事件，导致触发clickOutside，隐藏popup。
        on(root, 'mousedown', this.onClickOutside);
        this.handleClickOutside = true;
      }
    }
  }

  componentWillUnmount() {
    this.unmount = true;
    this.offClickOutside();
    this.clearTimer();
    this.offWindowResize();
    this.offContainerResize();
    caf(this.rafId);
  }

  offWindowResize = () => {
    this.handleWindowResize = false;
    off(window, 'resize', this.handleContainerResize);
  };

  offContainerResize = () => {
    if (this.resizeObserver && this.observerContainer) {
      this.resizeObserver.unobserve(this.observerContainer);
      this.observerContainer = null;
    }
  };

  onContainerResize = () => {
    // containerParent 相当于是通过getPopupContainer传入的节点
    // 因为 this.popupContainer 会被挂载到getPopupContainer返回的节点上
    const containerParent = this.popupContainer?.parentNode;
    if (this.resizeObserver && this.observerContainer !== containerParent) {
      // 说明containerParent变了，取消之前的监听，监听新的container
      this.offContainerResize();
      containerParent && this.resizeObserver.observe(containerParent);
      this.observerContainer = containerParent;
    }
  };

  // getPopupContainer 改变时候触发
  handleContainerResize = throttleByRaf(() => {
    this.updatePopupPosition();
  });

  isClickTrigger = () => {
    const { trigger } = this.getMergedProps();
    return [].concat(trigger).indexOf('click') > -1;
  };

  isFocusTrigger = () => {
    const { trigger } = this.getMergedProps();
    return [].concat(trigger).indexOf('focus') > -1;
  };

  isHoverTrigger = () => {
    const { trigger } = this.getMergedProps();
    return [].concat(trigger).indexOf('hover') > -1;
  };

  isContextMenuTrigger = () => {
    const { trigger } = this.getMergedProps();
    return [].concat(trigger).indexOf('contextMenu') > -1;
  };

  // 是否在鼠标移出触发节点和popup的时候隐藏弹出层
  isMouseLeaveToClose = () => {
    return this.isHoverTrigger() && this.getMergedProps().mouseLeaveToClose;
  };

  // 是否在悬浮到popup的时候隐藏弹出层
  isPopupHoverHide = () => {
    return this.isHoverTrigger() && !this.getMergedProps().popupHoverStay;
  };

  isClickToHide = () => {
    return (
      (this.isClickTrigger() || this.isContextMenuTrigger()) && this.getMergedProps().clickToClose
    );
  };

  isBlurToHide = () => {
    return this.isFocusTrigger() && this.getMergedProps().blurToHide;
  };

  clearTimer = () => {
    if (this.updatePositionTimer) {
      if (this.updatePositionTimer.cancel) {
        this.updatePositionTimer.cancel();
      } else {
        clearTimeout(this.updatePositionTimer);
        this.updatePositionTimer = null;
      }
    }
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
    if (this.mouseDownTimeout) {
      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = null;
    }
  };

  offClickOutside = () => {
    if (this.handleClickOutside) {
      const { getDocument } = this.getMergedProps();
      const root = isFunction(getDocument) && (getDocument as Function)();

      off(root, 'mousedown', this.onClickOutside);
      this.handleClickOutside = false;
    }
  };

  getTransformOrigin = (position) => {
    const content = findDOMNode(this.triggerRef) as HTMLElement;
    if (!content) return {};

    const { showArrow, classNames } = this.getMergedProps();
    let top = (showArrow && this.arrowStyle?.top) || 0;
    let left = (showArrow && this.arrowStyle?.left) || 0;
    top = top ? `${top}px` : '';
    left = left ? `${left}px` : '';

    const transformOrigin = {
      top: `${left || '50%'} 100% 0`,
      tl: `${left || '15px'} 100% 0`,
      tr: `${left || `${content.clientWidth - 15}px`} 100% 0`,
      bottom: `${left || '50%'} 0 0`,
      bl: `${left || '15px'} 0 0`,
      br: `${left || `${content.clientWidth - 15}px`} 0 0`,
      left: `100% ${top || '50%'} 0`,
      lt: `100% ${top || '15px'} 0`,
      lb: `100% ${top || `${content.clientHeight - 15}px`} 0`,
      right: `0 ${top || '50%'} 0`,
      rt: `0 ${top || '15px'} 0`,
      rb: `0 ${top || `${content.clientHeight - 15}px`} 0`,
    };

    // tooltip popover popconfirm
    if (classNames && classNames.indexOf('zoom') > -1) {
      return {
        transformOrigin: transformOrigin[position],
      };
    }
    if (classNames === 'slideDynamicOrigin') {
      let origin = '0% 0%';
      if (['top', 'tl', 'tr'].indexOf(position) > -1) {
        origin = '100% 100%';
      }
      return {
        transformOrigin: origin,
      };
    }
    return {};
  };

  // 下拉框存在初始translateY/translateX，需要根据真实的弹出位置确定
  getTransformTranslate = () => {
    if (this.getMergedProps().classNames !== 'slideDynamicOrigin') {
      return '';
    }
    switch (this.realPosition) {
      case 'bottom':
      case 'bl':
      case 'br':
        return 'scaleY(0.9) translateY(-4px)';
      case 'top':
      case 'tl':
      case 'tr':
        return 'scaleY(0.9) translateY(4px)';
      default:
        return '';
    }
  };

  getPopupStyle = (): any => {
    if (this.unmount || !this.popupContainer) {
      return;
    }
    const mountContainer = this.popupContainer as Element;
    const content = findDOMNode(this.triggerRef) as HTMLElement;
    const child: HTMLElement = findDOMNode(this) as HTMLElement;
    const { style, arrowStyle, realPosition } = getStyle(
      this.getMergedProps(),
      content,
      child,
      mountContainer,
      this.mouseLocation
    );
    this.realPosition = realPosition || (this.getMergedProps().position as string);
    this.arrowStyle = arrowStyle || {};

    return {
      ...style,
      ...this.getTransformOrigin(this.realPosition),
    };
  };

  showPopup = (callback: () => void = () => {}) => {
    const popupStyle = this.getPopupStyle();

    this.setState(
      {
        popupStyle,
      },
      callback
    );
  };

  update = throttleByRaf((callback) => {
    if (this.unmount || !this.state.popupVisible) {
      return;
    }
    const popupStyle = this.getPopupStyle();

    this.setState(
      {
        popupStyle,
      },
      () => {
        callback && callback();
      }
    );
  });

  updatePopupPosition = (delay = 0, callback?: () => void) => {
    const currentVisible = this.state.popupVisible;
    if (!currentVisible) {
      return;
    }
    if (delay < 4) {
      this.updatePositionTimer = this.update(callback);
      return;
    }
    this.updatePositionTimer = setTimeout(() => {
      const popupStyle = this.getPopupStyle();

      this.setState(
        {
          popupStyle,
        },
        () => {
          callback && callback();
        }
      );
    }, delay);
  };

  setPopupVisible = (visible: boolean, delay = 0, callback?: () => void) => {
    const mergedProps = this.getMergedProps();
    const { onVisibleChange } = mergedProps;
    const currentVisible = this.state.popupVisible;

    if (visible !== currentVisible) {
      this.delayToDo(delay, () => {
        onVisibleChange && onVisibleChange(visible);
        if (!('popupVisible' in mergedProps)) {
          if (visible) {
            this.setState(
              {
                popupVisible: true,
              },
              () => {
                this.showPopup(callback);
              }
            );
          } else {
            this.setState(
              {
                popupVisible: false,
              },
              () => {
                callback && callback();
              }
            );
          }
        } else {
          callback && callback();
        }
      });
    } else {
      callback && callback();
    }
  };

  delayToDo = (delay: number, callback: () => void) => {
    if (delay) {
      this.clearDelayTimer();
      this.delayTimer = setTimeout(() => {
        callback();
        this.clearDelayTimer();
      }, delay);
    } else {
      callback();
    }
  };

  clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  // 点击非popup内部，非children内部的节点，触发clickoutside 逻辑
  onClickOutside = (e) => {
    const { onClickOutside, clickOutsideToClose } = this.getMergedProps();
    const triggerNode = findDOMNode(this.triggerRef);
    const childrenDom = findDOMNode(this);

    if (
      !contains(triggerNode, e.target) &&
      !contains(childrenDom, e.target) &&
      !this.hasPopupMouseDown
    ) {
      onClickOutside && onClickOutside();
      if (clickOutsideToClose) {
        // 以下判断条件避免onVisibleChange触发两次
        // blurToHide 为true时不需要执行，因为onBlur里会执行setPopupVisible
        // hover 触发方式，不执行以下逻辑。因为mouseLeave里会执行setPopupVisible
        if (!this.isBlurToHide() && !this.isHoverTrigger()) {
          this.setPopupVisible(false);
        }
      }
    }
  };

  onKeyDown = (e) => {
    const keyCode = e.keyCode || e.which;
    this.triggerPropsEvent('onKeyDown', e);
    if (keyCode === Esc.code) {
      this.onPressEsc(e);
    }
  };

  onPressEsc = (e) => {
    const { escToClose } = this.getMergedProps();
    if (escToClose && e && e.key === Esc.key && this.state.popupVisible) {
      this.setPopupVisible(false);
    }
  };

  onMouseEnter = (e) => {
    const { mouseEnterDelay } = this.getMergedProps();
    this.triggerPropsEvent('onMouseEnter', e);
    this.clearDelayTimer();
    this.setPopupVisible(true, mouseEnterDelay || 0);
  };

  onMouseMove = (e) => {
    this.triggerPropsEvent('onMouseMove', e);
    this.setMouseLocation(e);
    if (this.state.popupVisible) {
      this.update();
    }
  };

  onMouseLeave = (e) => {
    const { mouseLeaveDelay } = this.getMergedProps();
    this.clearDelayTimer();
    this.triggerPropsEvent('onMouseLeave', e);

    if (this.isMouseLeaveToClose()) {
      if (this.state.popupVisible) {
        this.setPopupVisible(false, mouseLeaveDelay || 0);
      }
    }
  };

  onPopupMouseEnter = () => {
    this.clearDelayTimer();
  };

  onPopupMouseLeave = (e) => {
    this.onMouseLeave(e);
  };

  setMouseLocation = (e) => {
    if (this.getMergedProps().alignPoint) {
      this.mouseLocation = {
        clientX: e.clientX,
        clientY: e.clientY,
      };
    }
  };

  onContextMenu = (e) => {
    e.preventDefault();
    this.triggerPropsEvent('onContextMenu', e);
    this.setMouseLocation(e);

    if (!this.state.popupVisible) {
      this.setPopupVisible(true, 0);
    } else {
      // 更新位置
      this.getMergedProps().alignPoint && this.update();
    }
  };

  hideContextMenu = (e) => {
    const { popupVisible } = this.state;
    if (popupVisible) {
      this.mousedownToHide = true;
    }
    this.triggerPropsEvent('onClick', e);

    if (this.isClickToHide() && popupVisible) {
      this.setPopupVisible(!popupVisible, 0);
    }
  };

  onClick = (e) => {
    const { popupVisible } = this.state;
    if (popupVisible) {
      this.mousedownToHide = true;
    }
    this.triggerPropsEvent('onClick', e);
    this.setMouseLocation(e);

    if (!this.isClickToHide() && popupVisible) {
      return;
    }

    this.setPopupVisible(!popupVisible, 0);
  };

  onFocus = (e) => {
    const { focusDelay } = this.getMergedProps();
    const onFocus = () => {
      this.triggerPropsEvent('onFocus', e);
    };

    this.clearDelayTimer();
    if (!this.mousedownToHide) {
      if (this.state.popupVisible) {
        onFocus && onFocus();
      } else {
        this.setPopupVisible(true, focusDelay || 0, onFocus);
      }
    }
    this.mousedownToHide = false;
  };

  onBlur = (e) => {
    this.setPopupVisible(false, 200, () => this.triggerPropsEvent('onBlur', e));
  };

  onResize = () => {
    if (this.getMergedProps().autoFixPosition && this.state.popupVisible) {
      this.updatePopupPosition();
    }
  };

  onPopupMouseDown = () => {
    this.hasPopupMouseDown = true;

    clearTimeout(this.mouseDownTimeout);
    this.mouseDownTimeout = setTimeout(() => {
      this.hasPopupMouseDown = false;
    }, 0);
  };

  // 当 children 中的元素 disabled 时，不能正确触发 hover 等事件，所以当监测到对应
  // 组件有 disabled 时，给元素加一层 span，处理事件，模拟样式
  getChild = () => {
    const { children } = this.getMergedProps();

    const element = children as ReactElement;
    const elementType = (element && typeof element !== 'string' && element.type) as any;
    let child = children;

    if (['string', 'number'].indexOf(typeof children) > -1 || React.Children.count(children) > 1) {
      child = <span>{children}</span>;
    } else if (
      element &&
      elementType &&
      (elementType.__BYTE_BUTTON === true ||
        elementType.__BYTE_CHECKBOX === true ||
        elementType.__BYTE_SWITCH === true ||
        elementType.__BYTE_RADIO === true ||
        elementType === 'button') &&
      element.props.disabled
    ) {
      // 从样式中提取出会影响布局的到上层 span 样式中。
      const { picked, omitted } = splitChildrenStyle(element.props.style, [
        'position',
        'left',
        'right',
        'top',
        'bottom',
        'float',
        'display',
        'zIndex',
      ]);
      child = (
        <span
          className={element.props.className}
          style={{ display: 'inline-block', ...picked, cursor: 'not-allowed' }}
        >
          {React.cloneElement(element, {
            style: {
              ...omitted,
              pointerEvents: 'none',
            },
            className: undefined,
          })}
        </span>
      );
    }

    // 防止为空报错
    return child || <span />;
  };

  rafId: number;

  // 创建的dom节点插入getPopupContainer。
  appendToContainer = (node: HTMLDivElement) => {
    caf(this.rafId);
    if (this.isDidMount) {
      const { getPopupContainer: getGlobalPopupContainer } = this.context;
      const { getPopupContainer } = this.getMergedProps();
      const gpc = getPopupContainer || getGlobalPopupContainer;

      const rootElement = this.getRootElement();
      const parent = gpc(rootElement);
      if (parent) {
        parent.appendChild(node);
        return;
      }
    }
    this.rafId = raf(() => {
      this.appendToContainer(node);
    });
  };

  getContainer = () => {
    const popupContainer = document.createElement('div');

    popupContainer.style.width = '100%';
    popupContainer.style.position = 'absolute';
    popupContainer.style.top = '0';
    popupContainer.style.left = '0';

    this.popupContainer = popupContainer;
    this.appendToContainer(popupContainer);

    return popupContainer;
  };

  // 1. 触发直接附加到 Trigger 上的事件，大多是Trigger直接嵌套Trigger的情况
  // 2. 触发children上直接被附加的事件
  triggerPropsEvent = (eventName: EventsByTriggerNeedType, e) => {
    const child: any = this.getChild();
    const childHandler = child && child.props && child.props[eventName];

    const props = this.getMergedProps();

    if (isFunction(childHandler)) {
      childHandler(e);
    }
    if (isFunction(props[eventName])) {
      props[eventName](e);
    }
  };

  // 触发 children/ trigger 组件上被附加的事件
  triggerOriginEvent = (eventName: EventsByTriggerNeedType) => {
    const child: any = this.getChild();

    const childHandler = child && child.props && child.props[eventName];
    const propsHandler = this.getMergedProps()[eventName];

    if (isFunction(propsHandler) && isFunction(childHandler)) {
      return (e) => {
        childHandler(e);
        propsHandler(e);
      };
    }
    return childHandler || propsHandler;
  };

  render() {
    const {
      children,
      style,
      className,
      arrowProps,
      disabled,
      popup,
      classNames,
      duration,
      unmountOnExit,
      alignPoint,
      autoAlignPopupWidth,
      position,
      childrenPrefix,
      showArrow,
      popupStyle: dropdownPopupStyle,
    } = this.getMergedProps();
    const isExistChildren = children || children === 0;
    const { getPrefixCls, zIndex } = this.context;
    const { popupVisible, popupStyle } = this.state;

    if (!popup) {
      return null;
    }

    const mergeProps: any = {};
    const popupEventProps: any = {
      onMouseDown: this.onPopupMouseDown,
    };

    if (this.isHoverTrigger() && !disabled) {
      mergeProps.onMouseEnter = this.onMouseEnter;
      mergeProps.onMouseLeave = this.onMouseLeave;

      if (alignPoint) {
        mergeProps.onMouseMove = this.onMouseMove;
      }
      if (!this.isPopupHoverHide()) {
        popupEventProps.onMouseEnter = this.onPopupMouseEnter;
        popupEventProps.onMouseLeave = this.onPopupMouseLeave;
      }
    } else {
      mergeProps.onMouseEnter = this.triggerOriginEvent('onMouseEnter');
      mergeProps.onMouseLeave = this.triggerOriginEvent('onMouseLeave');
    }

    if (this.isContextMenuTrigger() && !disabled) {
      mergeProps.onContextMenu = this.onContextMenu;
      mergeProps.onClick = this.hideContextMenu;
    } else {
      mergeProps.onContextMenu = this.triggerOriginEvent('onContextMenu');
    }
    if (this.isClickTrigger() && !disabled) {
      mergeProps.onClick = this.onClick;
    } else {
      mergeProps.onClick = mergeProps.onClick || this.triggerOriginEvent('onClick');
    }
    if (this.isFocusTrigger() && !disabled) {
      mergeProps.onFocus = this.onFocus;
      if (this.isBlurToHide()) {
        mergeProps.onBlur = this.onBlur;
      }
    } else {
      mergeProps.onFocus = this.triggerOriginEvent('onFocus');
      mergeProps.onBlur = this.triggerOriginEvent('onBlur');
    }

    if (!disabled) {
      mergeProps.onKeyDown = this.onKeyDown;
    } else {
      mergeProps.onKeyDown = this.triggerOriginEvent('onKeyDown');
    }

    const child: any = this.getChild();
    const popupChildren: any = React.Children.only(popup());

    if (child.props.className) {
      mergeProps.className = child.props.className;
    }
    if (childrenPrefix && popupVisible) {
      mergeProps.className = mergeProps.className
        ? `${mergeProps.className} ${childrenPrefix}-open`
        : `${childrenPrefix}-open`;
    }
    // 只有在focus触发时，设置tabIndex，点击tab键，能触发focus事件，展示弹出框
    if (this.isFocusTrigger()) {
      mergeProps.tabIndex = disabled ? -1 : 0;
    }

    const prefixCls = getPrefixCls('trigger');

    const popupClassName = cs(
      prefixCls,
      childrenPrefix,
      `${prefixCls}-position-${position}`,
      className
    );

    const childrenComponent = isExistChildren && (
      <ResizeObserver onResize={this.onResize}>
        {React.cloneElement(child, {
          ...mergeProps,
        })}
      </ResizeObserver>
    );

    const portalContent = (
      <CSSTransition
        in={!!popupVisible}
        timeout={duration}
        classNames={classNames}
        unmountOnExit={unmountOnExit}
        appear
        mountOnEnter
        onEnter={(e) => {
          e.style.display = 'initial';
          e.style.pointerEvents = 'none';
          if (classNames === 'slideDynamicOrigin') {
            // 下拉菜单
            e.style.transform = this.getTransformTranslate();
          }
        }}
        onEntering={(e) => {
          if (classNames === 'slideDynamicOrigin') {
            // 下拉菜单
            e.style.transform = '';
          }
        }}
        onEntered={(e) => {
          e.style.pointerEvents = 'auto';
          this.forceUpdate();
        }}
        onExit={(e) => {
          // 避免消失动画时对元素的快速点击触发意外的操作
          e.style.pointerEvents = 'none';
        }}
        onExited={(e) => {
          e.style.display = 'none';
          // 这里立即设置为null是为了在setState popupStyle引起重新渲染时，能触发 Portal的卸载事件。移除父节点。
          // 否则只有在下个循环中 triggerRef 才会变为null，需要重新forceUpdate，才能触发Portal的unmount。
          if (unmountOnExit) {
            this.triggerRef = null;
          }
          this.setState({ popupStyle: {} });
        }}
      >
        <ResizeObserver onResize={this.onResize}>
          <span
            ref={(node) => (this.triggerRef = node)}
            trigger-placement={this.realPosition}
            style={
              {
                width:
                  autoAlignPopupWidth && style?.width === undefined
                    ? this.childrenDomSize?.width
                    : '',
                ...popupStyle,
                position: 'absolute',
                zIndex: zIndex || '',
                ...style,
                // display
              } as CSSProperties
            }
            {...popupEventProps}
            className={popupClassName}
          >
            <popupChildren.type
              ref={popupChildren.ref}
              {...popupChildren.props}
              style={{ ...popupChildren.props.style, ...dropdownPopupStyle }}
            />
            {(showArrow || arrowProps) && (
              <div
                className={cs(`${prefixCls}-arrow-container`, {
                  [`${childrenPrefix}-arrow-container`]: childrenPrefix,
                })}
              >
                <div
                  {...arrowProps}
                  className={cs(
                    `${prefixCls}-arrow`,
                    {
                      [`${childrenPrefix}-arrow`]: childrenPrefix,
                    },
                    arrowProps?.className
                  )}
                  style={{ ...this.arrowStyle, ...arrowProps?.style }}
                />
              </div>
            )}
          </span>
        </ResizeObserver>
      </CSSTransition>
    );

    // 如果 triggerRef 不存在，说明弹出层内容被销毁，可以隐藏portal。
    const portal =
      popupVisible || this.triggerRef ? (
        <Portal getContainer={this.getContainer}>{portalContent}</Portal>
      ) : null;

    return isExistChildren ? (
      <React.Fragment>
        {childrenComponent}
        {portal}
      </React.Fragment>
    ) : (
      portal
    );
  }
}

export default Trigger;

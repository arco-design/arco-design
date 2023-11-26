import React, {
  useContext,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useImperativeHandle,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import FocusLock from 'react-focus-lock';
import { findDOMNode } from 'react-dom';
import IconClose from '../../icon/react-icon/IconClose';
import cs from '../_util/classNames';
import Button from '../Button';
import Portal from '../Portal';
import ConfigProvider, { ConfigContext } from '../ConfigProvider';
import IconHover from '../_class/icon-hover';
import { isObject } from '../_util/is';
import useOverflowHidden from '../_util/hooks/useOverflowHidden';
import { DrawerProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import omit from '../_util/omit';
import { Esc } from '../_util/keycode';
import { isServerRendering, contains } from '../_util/dom';

const defaultProps: DrawerProps = {
  placement: 'right',
  width: 250,
  height: 250,
  escToExit: true,
  mask: true,
  closable: true,
  maskClosable: true,
  mountOnEnter: true,
  getPopupContainer: () => document.body,
};

function Drawer(baseProps: DrawerProps, ref) {
  const context = useContext(ConfigContext);
  const { locale, getPrefixCls, componentConfig, rtl } = context;
  const props = useMergeProps<DrawerProps>(baseProps, defaultProps, componentConfig?.Drawer);
  const {
    style,
    className,
    children,
    wrapClassName,
    maskStyle,
    headerStyle,
    bodyStyle,
    title,
    footer,
    okText,
    cancelText,
    width,
    height,
    placement,
    mask,
    visible,
    closable,
    maskClosable,
    confirmLoading,
    mountOnEnter,
    unmountOnExit,
    afterOpen,
    afterClose,
    getPopupContainer,
    escToExit,
    getChildrenPopupContainer: propGetChildrenPopupContainer,
    focusLock,
    autoFocus,
    okButtonProps,
    cancelButtonProps,
    zIndex,
    closeIcon,
    ...rest
  } = props;

  const drawerWrapperRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const [shouldReComputeFixed, setShouldReComputeFixed] = useState(false);
  const [popupZIndex, setPopupZIndex] = useState<number>();
  const prefixCls = getPrefixCls('drawer');
  // Record whether is exiting, to prevent `onCancel` being unnecessarily triggered when mask is clicked during the period.
  const [inExit, setInExit] = useState(false);
  // Record whether it's opened to avoid element shaking during animation caused by focus lock.
  const [isOpened, setIsOpened] = useState(false);

  const getContainer = useCallback((): HTMLElement => {
    const container = getPopupContainer?.();
    return (findDOMNode(container) || document.body) as HTMLElement;
  }, [getPopupContainer]);

  const isFixed = useMemo(() => {
    return !isServerRendering && getContainer() === document.body;
  }, [shouldReComputeFixed, getContainer]);

  // visible || inExit: 完全退出后在重置 overflow
  useOverflowHidden(getContainer, { hidden: (visible || inExit) && mask });

  useImperativeHandle(ref, () => drawerWrapperRef.current);

  useEffect(() => {
    // 初始就是展示，且设置了 getPopupContainer 时，组件挂载后重新执行下 isFixed 的计算逻辑，避免 getPopupContainer 返回的节点还未挂载，导致 isFixed 为true，样式表现错误的问题。
    if (visible && props.getPopupContainer) {
      // Recompute `isFixed` to avoid style error resulting from truthy `isFixed` value due to the custom container dom is not mounted yet.
      setShouldReComputeFixed(true);
    }
  }, []);

  useEffect(() => {
    if (autoFocus && visible) {
      // https://github.com/arco-design/arco-design/pull/1439
      if (contains(document.body, drawerWrapperRef.current)) {
        drawerWrapperRef.current?.focus();
      }
    }
  }, [visible, autoFocus]);

  const initPopupZIndex = () => {
    if (visible && popupZIndex === undefined) {
      if (drawerWrapperRef.current) {
        // Set zIndex for nested drawer components based on zIndex of wrapper
        const zIndex = +window.getComputedStyle(drawerWrapperRef.current, null)?.zIndex;
        if (!isNaN(zIndex)) {
          setPopupZIndex(zIndex + 1);
        }
      }
    }
  };

  const element = (
    <div
      className={`${prefixCls}-scroll`}
      // tabIndex => https://github.com/arco-design/arco-design/issues/2121
      // use -1 => https://github.com/arco-design/arco-design/issues/2404
      tabIndex={-1}
    >
      {title !== null && (
        <div className={`${prefixCls}-header`} style={headerStyle}>
          <div className={`${prefixCls}-header-title`}>{title}</div>
        </div>
      )}
      {closable &&
        (closeIcon !== undefined ? (
          <span onClick={props.onCancel} className={`${prefixCls}-close-icon`}>
            {closeIcon}
          </span>
        ) : (
          <IconHover onClick={props.onCancel} className={`${prefixCls}-close-icon`}>
            <IconClose />
          </IconHover>
        ))}

      <div
        ref={(node) => {
          contentWrapperRef.current = node;
          initPopupZIndex();
        }}
        style={bodyStyle}
        className={cs(`${prefixCls}-content`, {
          [`${prefixCls}-content-nofooter`]: footer === null,
          [`${prefixCls}-content-noheader`]: title === null,
        })}
      >
        <ConfigProvider
          {...context}
          zIndex={popupZIndex || 1050}
          getPopupContainer={(node) => {
            return typeof propGetChildrenPopupContainer === 'function'
              ? propGetChildrenPopupContainer(node)
              : contentWrapperRef.current;
          }}
        >
          {children}
        </ConfigProvider>
      </div>

      {footer !== null &&
        (footer ? (
          <div className={`${prefixCls}-footer`}>{footer}</div>
        ) : (
          <div className={`${prefixCls}-footer`}>
            <Button onClick={props.onCancel} {...cancelButtonProps}>
              {cancelText || locale.Drawer.cancelText}
            </Button>
            <Button type="primary" loading={confirmLoading} onClick={props.onOk} {...okButtonProps}>
              {okText || locale.Drawer.okText}
            </Button>
          </div>
        ))}
    </div>
  );

  const globalFocusLockConfig = context.focusLock.drawer;
  const globalFocusLock = !!globalFocusLockConfig;
  const globalAutoFocus = isObject(globalFocusLockConfig) && globalFocusLockConfig.autoFocus;
  const innerFocusLock = focusLock !== undefined ? focusLock : globalFocusLock;
  const innerAutoFocus = autoFocus !== undefined ? autoFocus : globalAutoFocus;

  // Only enable FocusLock when drawer is fully opened, to avoid element shaking.
  const dom = innerFocusLock ? (
    <FocusLock as="span" disabled={!isOpened} crossFrame={false} autoFocus={innerAutoFocus}>
      {element}
    </FocusLock>
  ) : (
    element
  );

  return (
    <Portal forceRender={!mountOnEnter} visible={visible} getContainer={getPopupContainer}>
      <div
        {...omit(rest, ['onCancel', 'onOk'])}
        ref={drawerWrapperRef}
        onKeyDown={(e) => {
          const keyCode = e.keyCode || e.which;
          if (keyCode === Esc.code) {
            if (escToExit && visible) {
              props.onCancel?.(e as any);
            }
          }
        }}
        className={cs(
          `${prefixCls}-wrapper`,
          {
            [`${prefixCls}-no-mask`]: !mask,
            [`${prefixCls}-wrapper-hide`]: !visible,
          },
          wrapClassName
        )}
        style={
          isFixed
            ? { position: 'fixed', zIndex }
            : { zIndex: zIndex || 'inherit', position: 'absolute' }
        }
      >
        {mask ? (
          <CSSTransition
            in={visible}
            appear
            timeout={300}
            classNames="fadeInStandard"
            mountOnEnter={mountOnEnter}
            unmountOnExit={unmountOnExit}
          >
            <div
              className={`${prefixCls}-mask`}
              style={maskStyle}
              onClick={(e) => {
                if (!inExit && maskClosable) {
                  props.onCancel && props.onCancel(e);
                }
              }}
            />
          </CSSTransition>
        ) : null}

        <CSSTransition
          in={visible}
          appear
          timeout={300}
          classNames={
            {
              top: 'slideTop',
              bottom: 'slideBottom',
              left: 'slideLeft',
              right: 'slideRight',
            }[placement]
          }
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
          onEnter={(e) => {
            e.parentNode.style.display = 'block';
            setInExit(false);
          }}
          onEntered={() => {
            setIsOpened(true);
            afterOpen?.();
          }}
          onExit={() => {
            setIsOpened(false);
            setInExit(true);
          }}
          onExited={(e) => {
            setInExit(false);
            e.parentNode.style.display = ''; // don't set display='none'
            afterClose?.();
          }}
        >
          <div
            className={cs(prefixCls, className, { [`${prefixCls}-rtl`]: rtl })}
            style={Object.assign(
              placement === 'left' || placement === 'right' ? { width } : { height },
              { [placement]: 0 },
              style
            )}
          >
            <div className={`${prefixCls}-inner`}>
              <ConfigProvider {...context} zIndex={popupZIndex || 1050}>
                {dom}
              </ConfigProvider>
            </div>
          </div>
        </CSSTransition>
      </div>
    </Portal>
  );
}

const DrawerComponent = React.forwardRef<unknown, DrawerProps>(Drawer);

DrawerComponent.displayName = 'Drawer';

export default DrawerComponent;

export { DrawerProps };

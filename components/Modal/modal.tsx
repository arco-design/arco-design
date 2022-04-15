import { findDOMNode } from 'react-dom';
import React, {
  useState,
  PropsWithChildren,
  forwardRef,
  ForwardRefExoticComponent,
  useContext,
  useRef,
  useEffect,
  useCallback,
  ReactElement,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import FocusLock from 'react-focus-lock';
import IconClose from '../../icon/react-icon/IconClose';
import cs from '../_util/classNames';
import { isServerRendering } from '../_util/dom';
import { Esc } from '../_util/keycode';
import Button from '../Button';
import Portal from '../Portal';
import confirm, { ConfirmProps } from './confirm';
import ConfigProvider, { ConfigContext } from '../ConfigProvider';
import IconHover from '../_class/icon-hover';
import { setModalConfig, ModalConfigType, destroyList } from './config';
import { isFunction, isObject } from '../_util/is';
import omit from '../_util/omit';
import useOverflowHidden from '../_util/hooks/useOverflowHidden';
import useModal from './useModal';
import { ModalProps, ModalReturnProps } from './interface';
import useMergeValue from '../_util/hooks/useMergeValue';
import useMergeProps from '../_util/hooks/useMergeProps';

type CursorPositionType = { left: number; top: number } | null;
let cursorPosition: CursorPositionType | null = null;
let globalDialogIndex = 0;

if (!isServerRendering) {
  document.documentElement.addEventListener(
    'click',
    (e: MouseEvent) => {
      cursorPosition = {
        left: e.clientX,
        top: e.clientY,
      };
      // 受控模式下，用户不一定马上打开弹窗，这期间可能出现其他 UI 操作，那这个位置就不可用了。
      setTimeout(() => {
        cursorPosition = null;
      }, 100);
    },
    true
  );
}

const defaultProps: ModalProps = {
  mask: true,
  maskClosable: true,
  mountOnEnter: true,
  escToExit: true,
  getPopupContainer: () => document.body,
  alignCenter: true,
};

function Modal(baseProps: PropsWithChildren<ModalProps>, ref) {
  const context = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<ModalProps>>(
    baseProps,
    defaultProps,
    context.componentConfig?.Modal
  );
  const {
    className,
    style,
    visible,
    simple,
    title,
    children,
    cancelText,
    okText,
    okButtonProps,
    cancelButtonProps,
    getPopupContainer = () => document.body,
    footer,
    afterClose,
    confirmLoading,
    mountOnEnter,
    unmountOnExit,
    afterOpen,
    hideCancel,
    autoFocus,
    focusLock,
    maskClosable,
    mask,
    alignCenter,
    getChildrenPopupContainer,
    wrapClassName,
    escToExit,
    modalRender,
    maskStyle,
    wrapStyle,
    closeIcon,
    ...rest
  } = props;

  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const contentWrapper = useRef<HTMLDivElement>(null);
  const [wrapperVisible, setWrapperVisible] = useState(visible);
  const [popupZIndex, setPopupZIndex] = useState<number>();
  const cursorPositionRef = useRef<CursorPositionType>(null);
  const haveOriginTransformOrigin = useRef<boolean>(false);
  const maskClickRef = useRef(false);

  const dialogIndex = useRef<number>();

  if (!dialogIndex.current) {
    dialogIndex.current = globalDialogIndex++;
  }

  const [loading, setLoading] = useMergeValue(false, {
    defaultValue: false,
    value: confirmLoading,
  });

  const prefixCls = context.getPrefixCls('modal', props.prefixCls);
  const { locale } = context;

  // 简洁模式下默认不显示关闭按钮
  const defaultClosable = !simple;
  const closable = 'closable' in props ? props.closable : defaultClosable;

  const getContainer = useCallback(() => {
    return findDOMNode(getPopupContainer()) as HTMLElement;
  }, [getPopupContainer]);

  useOverflowHidden(getContainer, { hidden: visible && mask });

  const onCancel = () => {
    props.onCancel && props.onCancel();
  };

  const onEscExit = (event: React.KeyboardEvent) => {
    if (escToExit && visible && event.key === Esc.key) {
      event.stopPropagation();
      onCancel();
    }
  };

  const inExit = useRef(false);
  const onClickMask = (e) => {
    if (!maskClickRef.current) return;
    maskClickRef.current = false;
    if (!inExit.current && maskClosable && mask && e.target === e.currentTarget) {
      setTimeout(() => {
        onCancel();
      }, 100);
    }
  };

  const onConfirmModal = (e: MouseEvent) => {
    const { onConfirm, onOk } = props;
    const _onConfirm = onOk || onConfirm;

    let ret;
    if (_onConfirm) {
      ret = _onConfirm(e);
    }
    if (ret && ret.then) {
      setLoading(true);
      ret.then(
        () => {
          setLoading(false);
        },
        (e: Error) => {
          setLoading(false);
          console.error(e);
        }
      );
    }
  };

  useEffect(() => {
    let timer = null;
    if (escToExit) {
      timer = setTimeout(() => {
        modalWrapperRef.current?.focus();
      });
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [visible, escToExit]);

  useEffect(() => {
    if (visible && popupZIndex === undefined) {
      if (modalWrapperRef.current) {
        // 根据wrapper的zindex，设置内部所有弹出型组件的zindex。
        const zIndex = +window.getComputedStyle(modalWrapperRef.current, null)?.zIndex;
        if (!isNaN(zIndex)) {
          setPopupZIndex(zIndex + 1);
        }
      }
    }
  }, [visible, popupZIndex]);

  const renderFooter = () => {
    if (footer === null) return;

    const cancelButtonNode = (
      <Button onClick={onCancel} {...cancelButtonProps}>
        {cancelText || locale.Modal.cancelText}
      </Button>
    );
    const okButtonNode = (
      <Button loading={loading} onClick={onConfirmModal} type="primary" {...okButtonProps}>
        {okText || locale.Modal.okText}
      </Button>
    );
    let footerContent = footer || (
      <>
        {!hideCancel && cancelButtonNode}
        {okButtonNode}
      </>
    );
    if (isFunction(footer)) {
      footerContent = footer(cancelButtonNode, okButtonNode);
    }

    return <div className={`${prefixCls}-footer`}>{footerContent}</div>;
  };

  const globalFocusLockConfig = context.focusLock.modal;
  const globalFocusLock = !!globalFocusLockConfig;
  const globalAutoFocus = isObject(globalFocusLockConfig) && globalFocusLockConfig.autoFocus;
  const innerFocusLock = focusLock !== undefined ? focusLock : globalFocusLock;
  const innerAutoFocus = autoFocus !== undefined ? autoFocus : globalAutoFocus;

  const element = (
    <ConfigProvider
      {...context}
      prefixCls={props.prefixCls || context.prefixCls}
      locale={locale}
      zIndex={popupZIndex || 1050}
      getPopupContainer={(node) => {
        return typeof getChildrenPopupContainer === 'function'
          ? getChildrenPopupContainer(node)
          : contentWrapper.current;
      }}
    >
      {title && (
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`} id={`arco-dialog-${dialogIndex.current}`}>
            {title}
          </div>
        </div>
      )}
      <div ref={contentWrapper} className={`${prefixCls}-content`}>
        {children}
      </div>
      {renderFooter()}

      {closable &&
        (closeIcon !== undefined ? (
          <span onClick={onCancel} className={`${prefixCls}-close-icon`}>
            {closeIcon}
          </span>
        ) : (
          <IconHover
            tabIndex={-1}
            onClick={onCancel}
            className={`${prefixCls}-close-icon`}
            role="button"
            aria-label="Close"
          >
            <IconClose />
          </IconHover>
        ))}
    </ConfigProvider>
  );

  const ariaProps = title ? { 'aria-labelledby': `arco-dialog-${dialogIndex.current}` } : {};

  const modalDom = (
    <div
      role="dialog"
      {...ariaProps}
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-simple`]: simple,
        },
        className
      )}
      style={style}
    >
      {innerFocusLock ? (
        <FocusLock
          disabled={!visible}
          autoFocus={innerAutoFocus}
          lockProps={{
            tabIndex: -1,
            onKeyDown: onEscExit,
          }}
        >
          {element}
        </FocusLock>
      ) : (
        element
      )}
    </div>
  );

  const setTransformOrigin = (e: HTMLDivElement) => {
    if (haveOriginTransformOrigin.current) return;

    let transformOrigin = '';
    if (cursorPositionRef.current) {
      const eRect = e.getBoundingClientRect();
      const { left, top } = cursorPositionRef.current;
      transformOrigin = `${left - eRect.left}px ${top - eRect.top}px`;
    }
    e.style.transformOrigin = transformOrigin;
  };

  return (
    <Portal visible={visible} forceRender={!mountOnEnter} getContainer={getPopupContainer}>
      <div ref={ref}>
        {mask ? (
          <CSSTransition
            in={visible}
            timeout={400}
            appear
            mountOnEnter={mountOnEnter}
            classNames="fadeModal"
            unmountOnExit={unmountOnExit}
            onEnter={(e) => {
              e.style.display = 'block';
            }}
            onExited={(e) => {
              e.style.display = 'none';
            }}
          >
            <div aria-hidden className={`${prefixCls}-mask`} style={maskStyle} />
          </CSSTransition>
        ) : null}
        <div
          {...omit(rest, [
            'content',
            'icon',
            'showIcon',
            'isNotice',
            'noticeType',
            'onCancel',
            'onOk',
            'onConfirm',
            'closable',
            'prefixCls',
          ])}
          tabIndex={!innerFocusLock || !innerAutoFocus ? -1 : null}
          ref={modalWrapperRef}
          className={cs(
            `${prefixCls}-wrapper`,
            {
              [`${prefixCls}-wrapper-no-mask`]: !mask,
              [`${prefixCls}-wrapper-align-center`]: alignCenter,
            },
            wrapClassName
          )}
          style={{
            ...(wrapStyle || {}),
            // 必须 visible=false，立即设置display:none，否则modal加载react-monaco-editor的时候，编辑器显示异常
            display: visible || wrapperVisible ? 'block' : 'none',
            overflow: !visible && wrapperVisible ? 'hidden' : '',
          }}
          // 如果 autoFocus 是 false 需要在 modal 外层绑定 onKeyDown, 因为此时 FocusLock 绑定的 onKeyDown 不起作用
          onKeyDown={!innerFocusLock || !innerAutoFocus ? onEscExit : null}
          onMouseDown={(e) => {
            maskClickRef.current = e.target === e.currentTarget;
          }}
          onClick={onClickMask}
        >
          <CSSTransition
            in={visible}
            timeout={400}
            appear
            classNames="zoomModal"
            unmountOnExit={unmountOnExit}
            mountOnEnter={mountOnEnter}
            onEnter={(e: HTMLDivElement) => {
              setWrapperVisible(true);
              cursorPositionRef.current = cursorPosition;
              haveOriginTransformOrigin.current = !!e.style.transformOrigin;
              setTransformOrigin(e);
            }}
            onEntered={(e: HTMLDivElement) => {
              setTransformOrigin(e);
              cursorPositionRef.current = null;
              afterOpen && afterOpen();
            }}
            onExit={() => {
              inExit.current = true;
            }}
            onExited={(e) => {
              setWrapperVisible(false);
              setTransformOrigin(e);
              afterClose && afterClose();
              inExit.current = false;
            }}
          >
            {React.cloneElement(
              (isFunction(modalRender) ? modalRender(modalDom) : modalDom) as ReactElement,
              {
                onMouseDown: () => {
                  maskClickRef.current = false;
                },
                onMouseUp: () => {
                  maskClickRef.current = false;
                },
              }
            )}
          </CSSTransition>
        </div>
      </div>
    </Portal>
  );
}

export interface ModalComponent extends ForwardRefExoticComponent<PropsWithChildren<ModalProps>> {
  confirm: (props: ConfirmProps) => ModalReturnProps;
  info: (props: ConfirmProps) => ModalReturnProps;
  success: (props: ConfirmProps) => ModalReturnProps;
  warning: (props: ConfirmProps) => ModalReturnProps;
  error: (props: ConfirmProps) => ModalReturnProps;
  config: (config: ModalConfigType) => void;
  destroyAll: () => void;
  useModal: typeof useModal;
}
const ExportedModalComponent: ModalComponent = forwardRef(Modal) as ModalComponent;

ExportedModalComponent.displayName = 'Modal';
ExportedModalComponent.config = setModalConfig;

ExportedModalComponent.confirm = (props: ConfirmProps): ModalReturnProps => {
  return confirm(props);
};

ExportedModalComponent.useModal = useModal;

['info', 'success', 'warning', 'error'].forEach((type) => {
  ExportedModalComponent[type] = (props: ConfirmProps) => {
    return confirm({
      ...props,
      isNotice: true,
      noticeType: type,
    });
  };
});

ExportedModalComponent.destroyAll = () => {
  while (destroyList.length) {
    const close = destroyList.pop();
    if (close) {
      close();
    }
  }
};

export default ExportedModalComponent;

export { ModalProps, ModalReturnProps };

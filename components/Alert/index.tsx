import React, { useState, useContext, ReactNode, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import IconInfoCircleFill from '../../icon/react-icon/IconInfoCircleFill';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import IconClose from '../../icon/react-icon/IconClose';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { AlertProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultProps: AlertProps = {
  showIcon: true,
  type: 'info',
};

function Alert(baseProps: AlertProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<AlertProps>(baseProps, defaultProps, componentConfig?.Alert);
  const {
    style,
    className,
    action,
    type = 'info',
    title,
    content,
    icon,
    showIcon,
    closable,
    closeable,
    afterClose,
    onClose,
    closeElement,
    banner,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('alert');
  const [visible, setVisible] = useState<boolean>(true);

  function renderIcon(type: string | void): ReactNode | null {
    if (icon) {
      return icon;
    }
    switch (type) {
      case 'info':
        return <IconInfoCircleFill />;
      case 'success':
        return <IconCheckCircleFill />;
      case 'warning':
        return <IconExclamationCircleFill />;
      case 'error':
        return <IconCloseCircleFill />;
      default:
        return null;
    }
  }

  function onHandleClose(e) {
    setVisible(false);
    onClose?.(e);
  }

  const classNames = cs(
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-with-title`]: title,
      [`${prefixCls}-banner`]: banner,
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );
  const _closable = 'closeable' in props ? closeable : closable;

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="zoomInTop"
      unmountOnExit
      onExited={() => {
        afterClose?.();
      }}
    >
      <div ref={ref} style={style} className={classNames} role="alert" {...rest}>
        {showIcon && <div className={`${prefixCls}-icon-wrapper`}>{renderIcon(type)}</div>}
        <div className={`${prefixCls}-content-wrapper`}>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          {content && <div className={`${prefixCls}-content`}>{content}</div>}
        </div>
        {action && <div className={`${prefixCls}-action`}>{action}</div>}
        {_closable && (
          <button type="button" onClick={onHandleClose} className={`${prefixCls}-close-btn`}>
            {closeElement || <IconClose />}
          </button>
        )}
      </div>
    </CSSTransition>
  );
}

const AlertComponent = forwardRef<unknown, AlertProps>(Alert);

AlertComponent.displayName = 'Alert';

export default AlertComponent;

export { AlertProps };

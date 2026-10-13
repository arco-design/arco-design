import React, { useContext, forwardRef, ReactNode } from 'react';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import IconInfoCircleFill from '../../icon/react-icon/IconInfoCircleFill';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { LogProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultProps: LogProps = {
  showIcon: true,
  showTimestamp: false,
  type: 'default',
};

function Log(baseProps: LogProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<LogProps>(baseProps, defaultProps, componentConfig?.Log);
  const {
    style,
    className,
    type = 'default',
    content,
    icon,
    showIcon,
    showTimestamp,
    timestamp,
    children,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('log');

  function renderIcon(type: string): ReactNode | null {
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

  function formatTimestamp(timestamp?: string | number | Date): string {
    if (!timestamp) {
      return new Date().toLocaleTimeString();
    }
    if (timestamp instanceof Date) {
      return timestamp.toLocaleTimeString();
    }
    if (typeof timestamp === 'number') {
      return new Date(timestamp).toLocaleTimeString();
    }
    return timestamp;
  }

  const classNames = cs(
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );

  return (
    <div ref={ref} style={style} className={classNames} role="log" {...rest}>
      {showIcon && type !== 'default' && (
        <div className={`${prefixCls}-icon-wrapper`}>{renderIcon(type)}</div>
      )}
      <div className={`${prefixCls}-content-wrapper`}>
        {showTimestamp && (
          <span className={`${prefixCls}-timestamp`}>{formatTimestamp(timestamp)}</span>
        )}
        <div className={`${prefixCls}-content`}>{content || children}</div>
      </div>
    </div>
  );
}

const LogComponent = forwardRef<unknown, LogProps>(Log);

LogComponent.displayName = 'Log';

export default LogComponent;

export { LogProps };

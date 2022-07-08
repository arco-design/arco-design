import React, { forwardRef, useContext, PropsWithChildren } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import IconCheck from '../../icon/react-icon/IconCheck';
import IconExclamation from '../../icon/react-icon/IconExclamation';
import IconInfo from '../../icon/react-icon/IconInfo';
import IconClose from '../../icon/react-icon/IconClose';
import Image404 from './404';
import Image403 from './403';
import Image500 from './500';
import { ResultProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultIcons = {
  success: <IconCheck />,
  info: <IconInfo />,
  warning: <IconExclamation />,
  error: <IconClose />,
  '404': <Image404 />,
  '403': <Image403 />,
  '500': <Image500 />,
};

const defaultProps: ResultProps = {
  status: 'info',
};

function Result(baseProps: PropsWithChildren<ResultProps>, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<ResultProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Result
  );
  const {
    className,
    style,
    status,
    title,
    subTitle,
    extra,
    children,
    icon: propsIcon,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('result');

  const icon = 'icon' in props ? propsIcon : defaultIcons[status];

  return (
    <div
      ref={ref}
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-is-${status}`]: status,
          [`${prefixCls}-rtl`]: rtl,
        },
        className
      )}
      style={style}
      {...rest}
    >
      {icon && (
        <div className={`${prefixCls}-icon`}>
          <span
            className={cs(`${prefixCls}-icon-tip`, {
              [`${prefixCls}-icon-${status}`]: status,
              [`${prefixCls}-icon-custom`]: status === null,
            })}
          >
            {icon}
          </span>
        </div>
      )}
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      {subTitle && <div className={`${prefixCls}-subtitle`}>{subTitle}</div>}
      {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
      {children && <div className={`${prefixCls}-content`}>{children}</div>}
    </div>
  );
}

const ResultRef = forwardRef<unknown, PropsWithChildren<ResultProps>>(Result);

ResultRef.displayName = 'Result';

export default ResultRef;

export { ResultProps };

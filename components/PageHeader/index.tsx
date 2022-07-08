import React, { useContext, PropsWithChildren, useState, useRef } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import Breadcrumb from '../Breadcrumb';
import IconHover from '../_class/icon-hover';
import ResizeObserver from '../_util/resizeObserver';
import { PageHeaderProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

function PageHeader(baseProps: PropsWithChildren<PageHeaderProps>) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<PageHeaderProps>>(
    baseProps,
    {},
    componentConfig?.PageHeader
  );
  const { title, subTitle, extra, children, backIcon, footer, breadcrumb } = props;

  const [pageWrap, setPageWrap] = useState(false);
  const pageRef = useRef<HTMLDivElement>();

  const prefixCls = getPrefixCls('page-header');

  return (
    <ResizeObserver
      onResize={() => {
        if (pageRef.current) {
          setPageWrap(pageRef.current.offsetWidth < 768);
        }
      }}
    >
      <div
        ref={pageRef}
        className={cs(
          `${prefixCls}`,
          {
            [`${prefixCls}-with-breadcrumb`]: breadcrumb,
            [`${prefixCls}-with-content`]: children,
            [`${prefixCls}-with-footer`]: footer,
            [`${prefixCls}-wrap`]: pageWrap,
            [`${prefixCls}-rtl`]: rtl,
          },
          props.className
        )}
        style={props.style}
      >
        <div className={`${prefixCls}-head-wrapper`}>
          {breadcrumb && <Breadcrumb {...breadcrumb} />}

          <div className={`${prefixCls}-head`}>
            <div
              className={cs(`${prefixCls}-head-main`, {
                [`${prefixCls}-head-main-with-back`]: backIcon,
              })}
            >
              {backIcon && (
                <IconHover
                  prefix={prefixCls}
                  className={`${prefixCls}-back`}
                  onClick={props.onBack}
                >
                  <span className={`${prefixCls}-back-icon`}>
                    {backIcon === true ? rtl ? <IconRight /> : <IconLeft /> : backIcon}
                  </span>
                </IconHover>
              )}
              {title && <div className={`${prefixCls}-title`}>{title}</div>}
              {subTitle && (
                <>
                  <div className={`${prefixCls}-divider`} />
                  <div className={`${prefixCls}-sub-title`}>{subTitle}</div>
                </>
              )}
            </div>
            {extra && <div className={`${prefixCls}-head-extra`}>{extra}</div>}
          </div>
        </div>
        {children && <div className={`${prefixCls}-content`}>{children}</div>}
        {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
      </div>
    </ResizeObserver>
  );
}

PageHeader.displayName = 'PageHeader';

export default PageHeader;

export { PageHeaderProps };

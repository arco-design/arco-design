import React, { forwardRef, PropsWithChildren, useContext } from 'react';
import Tooltip from '../Tooltip';
import { ConfigContext } from '../ConfigProvider';
import { PopoverProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import cs from '../_util/classNames';
import { isFunction, isEmptyReactNode } from '../_util/is';

const defaultProps: PopoverProps = {
  position: 'top',
  trigger: 'hover',
  unmountOnExit: true,
};

function Popover(baseProps: PropsWithChildren<PopoverProps>, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<PopoverProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Popover
  );
  const {
    style,
    className,
    children,
    position,
    getPopupContainer,
    trigger,
    defaultPopupVisible,
    popupVisible,
    triggerProps,
    unmountOnExit,
    onVisibleChange,
    content,
    title,
    ...rest
  } = props;
  const prefixCls = getPrefixCls('popover');

  const usedTitle = isFunction(title) ? title() : title;
  const usedContent = isFunction(content) ? content() : content;

  const renderContent =
    isEmptyReactNode(usedTitle, true) && isEmptyReactNode(usedContent, true) ? null : (
      <div className={cs(`${prefixCls}-inner`, { [`${prefixCls}-inner-rtl`]: rtl })}>
        {usedTitle ? <div className={`${prefixCls}-title`}>{usedTitle}</div> : null}
        <div className={`${prefixCls}-inner-content`}>{usedContent}</div>
      </div>
    );

  return (
    <Tooltip
      {...rest}
      ref={ref}
      style={{
        maxWidth: 350,
        ...style,
      }}
      className={className}
      prefixCls={prefixCls}
      getPopupContainer={getPopupContainer}
      position={position}
      trigger={trigger}
      content={renderContent}
      popupHoverStay
      unmountOnExit={unmountOnExit}
      triggerProps={triggerProps}
      defaultPopupVisible={defaultPopupVisible}
      onVisibleChange={onVisibleChange || (triggerProps ? triggerProps.onVisibleChange : undefined)}
      childrenPrefix={prefixCls}
      {...('popupVisible' in props ? { popupVisible } : {})}
    >
      {typeof children === 'string' ? <span>{children}</span> : children}
    </Tooltip>
  );
}
const PopoverComponent = forwardRef<unknown, PropsWithChildren<PopoverProps>>(Popover);

PopoverComponent.displayName = 'Popover';

export default PopoverComponent;

export { PopoverProps };

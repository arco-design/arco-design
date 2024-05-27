import React, {
  forwardRef,
  useContext,
  useRef,
  PropsWithChildren,
  useImperativeHandle,
} from 'react';
import cs from '../_util/classNames';
import Trigger, { EventsByTriggerNeed } from '../Trigger';
import { ConfigContext } from '../ConfigProvider';
import pick, { pickDataAttributes } from '../_util/pick';
import { TooltipProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isFunction, isEmptyReactNode } from '../_util/is';

export type TooltipHandle = {
  updatePopupPosition: () => void;
};

const defaultProps: TooltipProps = {
  position: 'top',
  trigger: 'hover',
  escToClose: false,
  unmountOnExit: true,
  blurToHide: true,
  popupHoverStay: true,
};

const triggerDuration = {
  enter: 300,
  exit: 100,
};

const triggerPopupAlign = {
  left: 12,
  right: 12,
  top: 12,
  bottom: 12,
};

function Tooltip(baseProps: PropsWithChildren<TooltipProps>, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<TooltipProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Tooltip
  );
  const {
    style,
    className,
    children,
    trigger,
    escToClose,
    defaultPopupVisible,
    position,
    unmountOnExit,
    popupVisible,
    prefixCls: tooltipPrefixCls,
    blurToHide,
    popupHoverStay,
    disabled,
    onVisibleChange,
    triggerProps,
    childrenPrefix,
    getPopupContainer,
    content,
    mini,
    color,
    ...rest
  } = props;

  const refTrigger = useRef<Trigger>();

  const updatePopupPosition = (delay = 0, callback?: () => void) => {
    refTrigger.current && refTrigger.current.updatePopupPosition(delay, callback);
  };

  useImperativeHandle<any, TooltipHandle>(
    ref,
    () => ({
      updatePopupPosition,
      getRootDOMNode: () => {
        return refTrigger.current?.getRootDOMNode?.();
      },
    }),
    []
  );

  const prefixCls = tooltipPrefixCls || getPrefixCls('tooltip');
  const otherProps: any = {
    ...pick(rest, EventsByTriggerNeed),
    ...pickDataAttributes(rest),
    ...triggerProps,
    className: cs(className, triggerProps?.className),
  };

  const renderedContent = isFunction(content) ? content() : content;

  if ('popupVisible' in props) {
    otherProps.popupVisible = popupVisible;
  } else if (isEmptyReactNode(renderedContent, true)) {
    // hide if empty content
    otherProps.popupVisible = false;
  }

  if (otherProps.showArrow !== false || otherProps.arrowProps) {
    otherProps.arrowProps = otherProps.arrowProps || {};
    if (color) {
      otherProps.arrowProps.style = {
        backgroundColor: color,
        ...otherProps.arrowProps.style,
      };
    }
  }

  return (
    <Trigger
      style={{
        maxWidth: 350,
        ...style,
      }}
      ref={refTrigger}
      classNames="zoomInFadeOut"
      duration={triggerDuration}
      popup={() => {
        return (
          <div
            style={{ backgroundColor: color }}
            className={cs(`${prefixCls}-content`, `${prefixCls}-content-${position}`, {
              [`${prefixCls}-mini`]: mini,
            })}
            role="tooltip"
          >
            <div className={`${prefixCls}-content-inner`}>{renderedContent}</div>
          </div>
        );
      }}
      position={position}
      disabled={disabled}
      trigger={trigger}
      escToClose={escToClose}
      showArrow
      popupAlign={triggerPopupAlign}
      mouseEnterDelay={200}
      mouseLeaveDelay={200}
      unmountOnExit={unmountOnExit}
      popupHoverStay={popupHoverStay}
      blurToHide={blurToHide}
      childrenPrefix={childrenPrefix || prefixCls}
      getPopupContainer={getPopupContainer}
      onVisibleChange={onVisibleChange}
      defaultPopupVisible={defaultPopupVisible}
      {...otherProps}
    >
      {children}
    </Trigger>
  );
}

const TooltipComponent = forwardRef<TooltipHandle, PropsWithChildren<TooltipProps>>(Tooltip);

TooltipComponent.displayName = 'Tooltip';

export default TooltipComponent;

export { TooltipProps };

import React, { ReactElement, useContext, useMemo, useRef } from 'react';
import Trigger, { EventsByTriggerNeed } from '../Trigger';
import Button from './button';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import useMergeValue from '../_util/hooks/useMergeValue';
import omit from '../_util/omit';
import pick from '../_util/pick';
import { DropdownProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

// Generate DOM id for instance
let globalDropdownIndex = 0;

const defaultProps: DropdownProps = {
  position: 'bl',
  trigger: 'hover',
  unmountOnExit: true,
};

function Dropdown(baseProps: DropdownProps, _) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<DropdownProps>(baseProps, defaultProps, componentConfig?.Button);
  const {
    trigger,
    droplist,
    children,
    position,
    disabled,
    unmountOnExit,
    triggerProps,
    getPopupContainer,
    onVisibleChange,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('dropdown');
  const popupContent = React.Children.only(droplist || <span />) as React.ReactElement;

  const triggerRef = useRef(null);
  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value: props.popupVisible,
  });

  // Unique ID of this instance
  const instancePopupID = useMemo<string>(() => {
    if (popupContent.props?.id) {
      return popupContent.props.id;
    }

    const id = `${prefixCls}-popup-${globalDropdownIndex}`;
    globalDropdownIndex++;
    return id;
  }, []);

  const changePopupVisible = (visible: boolean) => {
    setPopupVisible(visible);
    onVisibleChange && onVisibleChange(visible);
    triggerProps && triggerProps.onVisibleChange && triggerProps.onVisibleChange(visible);
  };

  const handleVisibleChange = (visible: boolean) => {
    if (visible !== popupVisible) {
      changePopupVisible(visible);
    }
  };

  const renderPopup = () => {
    return popupContent && popupContent.props.isMenu
      ? React.cloneElement(popupContent as ReactElement, {
          id: instancePopupID,
          prefixCls: `${prefixCls}-menu`,
          inDropdown: true,
          selectable: false,
          onClickMenuItem: (key, event) => {
            let returnValueOfOnClickMenuItem = null;

            // Trigger onClickMenuItem first
            if (popupContent.props.onClickMenuItem) {
              returnValueOfOnClickMenuItem = popupContent.props.onClickMenuItem(key, event);
            }

            // Set focus to avoid onblur
            const child = triggerRef.current && triggerRef.current.getRootElement();
            child && child.focus && child.focus();

            // Trigger onVisibleChange. Outer component can determine whether to change the state based on the current visibility value.
            if (returnValueOfOnClickMenuItem instanceof Promise) {
              returnValueOfOnClickMenuItem.finally(() => changePopupVisible(false));
            } else if (returnValueOfOnClickMenuItem !== false) {
              changePopupVisible(false);
            }
          },
        })
      : popupContent;
  };

  return (
    <Trigger
      ref={(ref) => (triggerRef.current = ref)}
      classNames="slideDynamicOrigin"
      childrenPrefix={prefixCls}
      trigger={trigger}
      popup={renderPopup}
      mouseEnterDelay={400}
      mouseLeaveDelay={400}
      disabled={disabled}
      unmountOnExit={unmountOnExit}
      position={position}
      popupVisible={popupVisible}
      popupAlign={{
        left: 4,
        right: 4,
        top: 4,
        bottom: 4,
      }}
      getPopupContainer={getPopupContainer}
      alignPoint={trigger === 'contextMenu'}
      {...pick(rest, EventsByTriggerNeed)}
      {...omit(triggerProps, ['onVisibleChange'])}
      onVisibleChange={handleVisibleChange}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            disabled,
            className: cs(
              {
                [`${prefixCls}-popup-visible`]: popupVisible,
              },
              children.props.className
            ),
            role: 'combobox',
            'aria-haspopup': true,
            'aria-controls': instancePopupID,
            'aria-expanded': popupVisible,
          })
        : children}
    </Trigger>
  );
}

const ForwardRefDropdown: React.ForwardRefExoticComponent<
  DropdownProps & React.RefAttributes<unknown>
> = React.forwardRef<unknown, DropdownProps>(Dropdown);

const DropdownComponent = ForwardRefDropdown as typeof ForwardRefDropdown & {
  Button: typeof Button;
};

DropdownComponent.displayName = 'Dropdown';

DropdownComponent.Button = Button;

export default DropdownComponent;

export { DropdownProps };

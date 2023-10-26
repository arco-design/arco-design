import React, { ReactElement, useContext, useRef } from 'react';
import get from 'lodash/get';
import Trigger, { EventsByTriggerNeed } from '../Trigger';
import Button from './button';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import useMergeValue from '../_util/hooks/useMergeValue';
import omit from '../_util/omit';
import pick, { pickDataAttributes } from '../_util/pick';
import { DropdownProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultProps: DropdownProps = {
  position: 'bl',
  trigger: 'hover',
  unmountOnExit: true,
};

const trigerPopupAlign = {
  left: 4,
  right: 4,
  top: 4,
  bottom: 4,
};

function Dropdown(baseProps: DropdownProps, _) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
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

  const triggerRef = useRef(null);
  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value: props.popupVisible,
  });

  const getPopupContent = () => {
    return React.Children.only(droplist || <span />) as React.ReactElement;
  };

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
    const content = getPopupContent();

    // props.isMenu: Compatible Menu.defaultProps.isMenu = true
    if (get(content, 'type.__ARCO_MENU__') || get(content, 'props.isMenu')) {
      let isEmpty = true;
      for (const child of React.Children.toArray(content.props.children)) {
        if (child !== null && child !== undefined) {
          isEmpty = false;
          break;
        }
      }

      return React.cloneElement(content as ReactElement, {
        prefixCls: cs(`${prefixCls}-menu`, {
          [`${prefixCls}-menu-hidden`]: isEmpty,
        }),
        inDropdown: true,
        selectable: false,
        onClickMenuItem: (...args) => {
          let returnValueOfOnClickMenuItem = null;

          // Trigger onClickMenuItem first
          const content = getPopupContent();
          if (content.props.onClickMenuItem) {
            returnValueOfOnClickMenuItem = content.props.onClickMenuItem(...args);
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
      });
    }

    return content;
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
      popupAlign={trigerPopupAlign}
      getPopupContainer={getPopupContainer}
      alignPoint={trigger === 'contextMenu'}
      {...pick(rest, EventsByTriggerNeed)}
      {...pickDataAttributes(rest)}
      {...omit(triggerProps, ['onVisibleChange'])}
      onVisibleChange={handleVisibleChange}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            ...(typeof disabled === 'boolean' ? { disabled } : {}),
            className: cs(
              {
                [`${prefixCls}-popup-visible`]: popupVisible,
                [`${[prefixCls]}-rtl`]: rtl,
              },
              children.props.className
            ),
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

import React, { ReactNode, ReactElement, forwardRef, useContext } from 'react';
import ArcoButton from '../Button';
import Dropdown from './index';
import IconMore from '../../icon/react-icon/IconMore';
import { DropdownButtonProps } from './interface';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';

const defaultProps: DropdownButtonProps = {
  position: 'br',
  trigger: 'hover',
  type: 'default',
  icon: <IconMore />,
  unmountOnExit: true,
};

function Button(baseProps: DropdownButtonProps, ref) {
  const { componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<DropdownButtonProps>(
    baseProps,
    defaultProps,
    componentConfig?.['Dropdown.Button']
  );
  const {
    className,
    style,
    children,
    disabled,
    droplist,
    position = 'br',
    trigger = 'hover',
    type = 'default',
    size,
    icon = <IconMore />,
    unmountOnExit = true,
    onClick,
    onVisibleChange,
    buttonProps,
    buttonsRender,
  } = props;

  let leftButton: ReactNode = (
    <ArcoButton disabled={disabled} type={type} size={size} onClick={onClick} {...buttonProps}>
      {children}
    </ArcoButton>
  );
  let rightButton: ReactNode = (
    <ArcoButton disabled={disabled} type={type} size={size} icon={icon} />
  );

  if (buttonsRender) {
    [leftButton, rightButton] = buttonsRender([leftButton, rightButton]);
  }

  const disableTrigger =
    disabled ||
    !rightButton ||
    ((rightButton as ReactElement).props && (rightButton as ReactElement).props.loading);

  return (
    <ArcoButton.Group className={className} style={style} ref={ref} {...pickDataAttributes(props)}>
      {leftButton}
      <Dropdown
        disabled={disabled}
        droplist={droplist}
        position={position}
        trigger={trigger}
        unmountOnExit={unmountOnExit}
        onVisibleChange={onVisibleChange}
        triggerProps={{
          disabled: disableTrigger,
        }}
      >
        {rightButton}
      </Dropdown>
    </ArcoButton.Group>
  );
}

const ButtonComponent = forwardRef(Button);

ButtonComponent.displayName = 'DropdownButton';

export default ButtonComponent;

export { DropdownButtonProps };

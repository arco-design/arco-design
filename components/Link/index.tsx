import React, { forwardRef, useContext, PropsWithChildren } from 'react';
import IconLink from '../../icon/react-icon/IconLink';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { LinkProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import useKeyboardEvent from '../_util/hooks/useKeyboardEvent';

const defaultProps: LinkProps = {
  hoverable: true,
};

function Link(baseProps: PropsWithChildren<LinkProps>, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<LinkProps>(baseProps, defaultProps, componentConfig?.Link);
  const { className, style, children, icon, status, disabled, hoverable, ...rest } = props;
  const getKeyboardEvents = useKeyboardEvent({ onKeyDown: props.onKeyDown });

  const prefixCls = getPrefixCls('link');

  const TagWrapper = 'href' in props ? 'a' : 'span';

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      props.onClick && props.onClick(e);
    }
  };

  return (
    <TagWrapper
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-is-${status}`]: status,
          [`${prefixCls}-with-icon`]: icon,
          [`${prefixCls}-hoverless`]: !hoverable,
          [`${prefixCls}-rtl`]: rtl,
        },
        className
      )}
      ref={ref}
      tabIndex={disabled ? -1 : undefined}
      {...rest}
      style={style}
      onClick={handleClick}
      {...getKeyboardEvents({
        onPressEnter: handleClick,
      })}
    >
      {icon ? (
        <span className={`${prefixCls}-icon`}>{icon === true ? <IconLink /> : icon}</span>
      ) : null}
      {children}
    </TagWrapper>
  );
}

const LinkRef = forwardRef(Link);

LinkRef.displayName = 'Link';

export default LinkRef;

export { LinkProps };

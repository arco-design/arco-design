import React, { useState, useContext, useEffect, useRef, ReactNode, forwardRef } from 'react';
import IconLoading from '../../icon/react-icon/IconLoading';
import Group from './group';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { ButtonProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const regexTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;

function processChildren(children?: ReactNode) {
  const childrenList = [];
  let isPrevChildPure = false;
  React.Children.forEach(children, (child) => {
    const isCurrentChildPure = typeof child === 'string' || typeof child === 'number';
    if (isCurrentChildPure && isPrevChildPure) {
      const lastIndex = childrenList.length - 1;
      const lastChild = childrenList[lastIndex];
      childrenList[lastIndex] = `${lastChild}${child}`;
    } else {
      childrenList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  });
  return React.Children.map(childrenList, (child) =>
    typeof child === 'string' ? <span>{child}</span> : child
  );
}

const defaultProps: ButtonProps = {
  htmlType: 'button',
  type: 'default',
  shape: 'square',
};

function Button(baseProps: ButtonProps, ref) {
  const {
    getPrefixCls,
    size: ctxSize,
    autoInsertSpaceInButton,
    componentConfig,
    rtl,
  } = useContext(ConfigContext);
  const props = useMergeProps<ButtonProps>(baseProps, defaultProps, componentConfig?.Button);
  const {
    style,
    className,
    children,
    htmlType,
    type,
    status,
    size,
    shape,
    href,
    anchorProps,
    disabled,
    loading,
    loadingFixedWidth,
    icon,
    iconOnly,
    onClick,
    long,
    ...rest
  } = props;

  const iconNode = loading ? <IconLoading /> : icon;

  const [isTwoCNChar, setIsTwoCNChar] = useState(false);
  const innerButtonRef = useRef();
  const buttonRef = ref || innerButtonRef;

  useEffect(() => {
    if (autoInsertSpaceInButton && buttonRef && buttonRef.current) {
      const textContent = buttonRef.current.textContent;
      if (regexTwoCNChar.test(textContent)) {
        if (!isTwoCNChar) {
          setIsTwoCNChar(true);
        }
      } else if (isTwoCNChar) {
        setIsTwoCNChar(false);
      }
    }
  }, [buttonRef.current, autoInsertSpaceInButton]);

  const prefixCls = getPrefixCls('btn');
  const _type = type === 'default' ? 'secondary' : type;
  const classNames = cs(
    prefixCls,
    `${prefixCls}-${_type}`,
    `${prefixCls}-size-${size || ctxSize}`,
    `${prefixCls}-shape-${shape}`,
    {
      [`${prefixCls}-long`]: long,
      [`${prefixCls}-status-${status}`]: status,
      [`${prefixCls}-loading-fixed-width`]: loadingFixedWidth,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-link`]: href,
      [`${prefixCls}-icon-only`]: iconOnly || (!children && children !== 0 && iconNode),
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-two-chinese-chars`]: isTwoCNChar,
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );

  const handleClick: React.MouseEventHandler<HTMLElement> = (event: any): void => {
    if (loading || disabled) {
      typeof event?.preventDefault === 'function' && event.preventDefault();
      return;
    }
    onClick && onClick(event);
  };

  const InnerContent = (
    <>
      {iconNode}
      {processChildren(children)}
    </>
  );

  if (href) {
    const _anchorProps = { ...anchorProps };
    if (disabled) {
      delete _anchorProps.href;
    } else {
      _anchorProps.href = href;
    }
    return (
      <a
        ref={buttonRef}
        {...rest}
        {..._anchorProps}
        style={style}
        className={classNames}
        onClick={handleClick}
      >
        {InnerContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      {...rest}
      style={style}
      className={classNames}
      type={htmlType}
      disabled={disabled}
      onClick={handleClick}
    >
      {InnerContent}
    </button>
  );
}

const ForwardRefButton = forwardRef<unknown, ButtonProps>(Button);

const ButtonComponent = ForwardRefButton as typeof ForwardRefButton & {
  __BYTE_BUTTON: boolean;
  Group: typeof Group;
};

ButtonComponent.__BYTE_BUTTON = true;

ButtonComponent.Group = Group;

ButtonComponent.displayName = 'Button';

export default ButtonComponent;

export { ButtonProps };

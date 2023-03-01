import React, {
  useImperativeHandle,
  useRef,
  useEffect,
  useContext,
  CSSProperties,
  PropsWithChildren,
  forwardRef,
} from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import AvatarContext from './context';
import { AvatarProps } from './interface';
import { isNumber } from '../_util/is';

const defaultProps: AvatarProps = {
  shape: 'circle',
  autoFixFontSize: true,
  triggerType: 'button',
};

const Avatar = forwardRef<HTMLElement, PropsWithChildren<AvatarProps>>(
  (props: PropsWithChildren<AvatarProps>, ref) => {
    const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);

    const prefixCls = getPrefixCls('avatar');
    const contextProps = useContext(AvatarContext);
    const mergedProps = { ...defaultProps, ...componentConfig?.Avatar, ...contextProps, ...props };

    const {
      className,
      shape,
      size,
      children,
      autoFixFontSize,
      triggerIcon,
      triggerIconStyle,
      triggerType,
      onClick,
      ...rest
    } = mergedProps;
    const style = { ...contextProps.style, ...props.style };

    const textRef = useRef(null);
    const avatarRef = useRef(null);

    useEffect(() => {
      if (autoFixFontSize) {
        autoFixFontSizeHandler();
      }
    }, [size, children]);

    useImperativeHandle(ref, () => avatarRef.current);

    // auto adjust font size
    function autoFixFontSizeHandler() {
      if (textRef.current) {
        const textWidth = textRef.current.clientWidth;
        const size = props.size || avatarRef.current.offsetWidth;
        const scale = size / (textWidth + 8);

        if (size && scale < 1) {
          textRef.current.style.transform = `scale(${scale}) translateX(-50%)`;
        }
      }
    }

    const classNames = cs(
      prefixCls,
      `${prefixCls}-${shape}`,
      {
        [`${prefixCls}-with-trigger-icon`]: triggerIcon,
        [`${prefixCls}-rtl`]: rtl,
      },
      className
    );
    const childrenList = React.Children.toArray(children);
    const isImage =
      childrenList.length === 1 &&
      React.isValidElement(childrenList[0]) &&
      (childrenList[0].type === 'img' || childrenList[0].type === 'picture');

    const _triggerIconStyle: CSSProperties = triggerIconStyle || {};
    if (
      triggerType === 'button' &&
      (!triggerIconStyle || (triggerIconStyle && !triggerIconStyle.color)) &&
      style &&
      style.backgroundColor
    ) {
      _triggerIconStyle.color = style.backgroundColor;
    }

    return (
      <div
        ref={avatarRef}
        onClick={onClick}
        {...rest}
        style={{
          width: size,
          height: size,
          fontSize: isNumber(size) ? size / 2 : '',
          ...style,
        }}
        className={classNames}
      >
        {isImage ? <span className={`${prefixCls}-image`}>{children}</span> : null}
        {!isImage && (
          <span ref={textRef} className={`${prefixCls}-text`}>
            {children}
          </span>
        )}
        {triggerIcon && (
          <div className={`${prefixCls}-trigger-icon-${triggerType}`} style={_triggerIconStyle}>
            {triggerIcon}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;

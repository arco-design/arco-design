import React, {
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import AvatarContext from './context';
import { AvatarProps } from './interface';
import { isNumber } from '../_util/is';
import useImage, { IMG_LOAD_STATUS } from '../_util/hooks/useImage';

const defaultProps: AvatarProps = {
  shape: 'circle',
  autoFixFontSize: true,
  triggerType: 'button',
};

const Avatar = forwardRef<HTMLElement, PropsWithChildren<AvatarProps>>(
  (props: PropsWithChildren<AvatarProps>, ref) => {
    const { status, setImageRul } = useImage('');
    const { getPrefixCls, componentConfig } = useContext(ConfigContext);
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
    }, [size, children, status]);

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
      },
      className
    );

    const isImage =
      children &&
      React.isValidElement(children) &&
      (children.type === 'img' || children.type === 'picture');

    useEffect(() => {
      isImage && setImageRul(children?.props?.src);
    }, [isImage]);

    const _triggerIconStyle: CSSProperties = triggerIconStyle || {};
    if (
      triggerType === 'button' &&
      (!triggerIconStyle || (triggerIconStyle && !triggerIconStyle.color)) &&
      style &&
      style.backgroundColor
    ) {
      _triggerIconStyle.color = style.backgroundColor;
    }

    const renderText = (children: React.ReactNode) => (
      <span ref={textRef} className={`${prefixCls}-text`}>
        {children}
      </span>
    );

    const renderImage = (status: IMG_LOAD_STATUS, children: React.ReactElement) => {
      if (status === IMG_LOAD_STATUS.SUCCESS)
        return <span className={`${prefixCls}-image`}>{children}</span>;
      if (status === IMG_LOAD_STATUS.FAILED) return renderText(children?.props?.alt);
    };

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
        {isImage && renderImage(status, children)}
        {!isImage && renderText(children)}
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

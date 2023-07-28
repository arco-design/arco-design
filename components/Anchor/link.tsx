import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  isValidElement,
} from 'react';
import AnchorContext from './context';
import { AnchorLinkProps } from './interface';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
import { isString, isObject, isUndefined, isNull } from '../_util/is';
import useMergeProps from '../_util/hooks/useMergeProps';

type AnchorLinkHandle = HTMLDivElement;

type AnchorLinkPropsWithChildren = React.PropsWithChildren<AnchorLinkProps>;

const DISPLAY_NAME = 'AnchorLink';

const defaultProps = {
  href: '#',
};

function isNamedComponent(type: any): type is React.ForwardRefExoticComponent<unknown> {
  return isObject(type) && type.hasOwnProperty('displayName');
}

function Link(baseProps: AnchorLinkPropsWithChildren, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const { className, style, href, title, children, ...rest } =
    useMergeProps<AnchorLinkPropsWithChildren>(
      baseProps,
      defaultProps,
      componentConfig?.['Anchor.Link']
    );
  const anchorContext = useContext(AnchorContext);
  const { currentLink, addLink, removeLink, onLinkClick, direction } = anchorContext;
  const prefixCls = getPrefixCls('anchor-link');
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-active`]: currentLink === href,
    },
    className
  );
  const linkRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => linkRef.current, []);

  useEffect(() => {
    addLink && addLink(href, linkRef.current);
    return () => {
      removeLink && removeLink(href);
    };
  }, [href]);

  return (
    <div className={classNames} style={style} ref={linkRef} {...rest}>
      {!isUndefined(title) && !isNull(title) && (
        <a
          className={`${prefixCls}-title`}
          title={isString(title) ? title : ''}
          href={href}
          data-href={href}
          onClick={(e) => {
            onLinkClick && onLinkClick(e, href);
          }}
        >
          {title}
        </a>
      )}
      {children &&
        direction !== 'horizontal' &&
        React.Children.map(children, (item) => {
          return (
            isValidElement(item) &&
            isNamedComponent(item.type) &&
            item.type.displayName === DISPLAY_NAME &&
            item
          );
        })}
    </div>
  );
}

const AnchorLinkComponent = forwardRef<AnchorLinkHandle, React.PropsWithChildren<AnchorLinkProps>>(
  Link
);

AnchorLinkComponent.displayName = DISPLAY_NAME;

export default AnchorLinkComponent;

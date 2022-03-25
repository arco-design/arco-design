import React, { PropsWithChildren, useContext } from 'react';
import { Transition } from 'react-transition-group';
import cs from '../_util/classNames';
import { CollapseContext } from './collapse';
import { ConfigContext } from '../ConfigProvider';
import IconHover from '../_class/icon-hover';
import { CollapseItemProps } from './interface';

function Item(props: PropsWithChildren<CollapseItemProps>, ref) {
  const { getPrefixCls } = useContext(ConfigContext);
  const ctx = useContext(CollapseContext);
  const {
    children,
    name,
    header,
    className,
    style,
    contentStyle,
    extra,
    disabled,
    destroyOnHide,
    expandIcon,
    showExpandIcon = true,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('collapse-item');

  const isExpanded = ctx.activeKeys.indexOf(name) > -1;
  const icon = showExpandIcon ? ('expandIcon' in props ? expandIcon : ctx.expandIcon) : null;

  return (
    <div
      ref={ref}
      {...rest}
      className={cs(
        prefixCls,
        {
          [`${prefixCls}-active`]: isExpanded,
          [`${prefixCls}-no-icon`]: !icon,
          [`${prefixCls}-disabled`]: disabled,
        },
        className
      )}
      style={style}
    >
      <div
        role="button"
        aria-disabled={disabled}
        aria-expanded={isExpanded}
        tabIndex={0}
        className={cs(`${prefixCls}-header`, `${prefixCls}-header-${ctx.expandIconPosition}`, {
          [`${prefixCls}-header-disabled`]: disabled,
        })}
        onClick={(e) => {
          !disabled && ctx.onToggle(name, e);
        }}
      >
        {icon && (
          <IconHover
            prefix={prefixCls}
            disabled={disabled}
            className={cs({
              [`${prefixCls}-icon-hover-right`]: ctx.expandIconPosition === 'right',
              [`${prefixCls}-header-icon-right`]: ctx.expandIconPosition === 'right',
            })}
          >
            <span
              className={cs(`${prefixCls}-header-icon`, {
                [`${prefixCls}-header-icon-down`]: isExpanded,
              })}
            >
              {icon}
            </span>
          </IconHover>
        )}
        <div className={`${prefixCls}-header-title`}>{header}</div>
        {extra && (
          <div
            className={`${prefixCls}-header-extra`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {extra}
          </div>
        )}
      </div>
      <Transition
        in={isExpanded}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        mountOnEnter={'destroyOnHide' in props ? destroyOnHide : ctx.destroyOnHide || ctx.lazyload}
        unmountOnExit={'destroyOnHide' in props ? destroyOnHide : ctx.destroyOnHide}
        onEnter={(e) => {
          e.style.height = 0;
          e.style.display = 'block';
        }}
        onEntering={(e) => {
          e.style.height = `${e.scrollHeight}px`;
        }}
        onEntered={(e) => {
          e.style.height = 'auto';
        }}
        onExit={(e) => {
          e.style.display = 'block';
          e.style.height = `${e.offsetHeight}px`;
          // have to trigger reflow to get animation effect on exit
          e.offsetHeight; // eslint-disable-line
        }}
        onExiting={(e) => {
          e.style.height = 0;
        }}
        onExited={(e) => {
          e.style.display = 'none';
          e.style.height = 'auto';
        }}
      >
        <div
          role="region"
          className={cs(`${prefixCls}-content`, {
            [`${prefixCls}-content-expanded`]: isExpanded,
          })}
        >
          <div style={contentStyle} className={`${prefixCls}-content-box`}>
            {children}
          </div>
        </div>
      </Transition>
    </div>
  );
}

const ItemRef = React.forwardRef<unknown, PropsWithChildren<CollapseItemProps>>(Item);

ItemRef.displayName = 'CollapseItem';

export default ItemRef;

export { CollapseItemProps };

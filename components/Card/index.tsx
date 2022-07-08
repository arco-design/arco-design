import React, { useContext } from 'react';
import cs from '../_util/classNames';
import Meta from './meta';
import Grid from './grid';
import { ConfigContext } from '../ConfigProvider';
import Spin from '../Spin';
import { CardProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultProps: CardProps = {
  size: 'default',
  bordered: true,
};

function Card(baseProps: CardProps, ref) {
  const { getPrefixCls, loadingElement, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<CardProps>(baseProps, defaultProps, componentConfig?.Card);
  const {
    className,
    children,
    bordered,
    loading,
    hoverable,
    size,
    title,
    extra,
    cover,
    actions,
    headerStyle,
    bodyStyle,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('card');

  const actionList =
    actions && actions.length ? (
      <div className={`${prefixCls}-actions`}>
        <div className={`${prefixCls}-actions-right`}>
          {actions.map((action, index) => (
            <span key={`action-${index}`} className={`${prefixCls}-actions-item`}>
              {action}
            </span>
          ))}
        </div>
      </div>
    ) : null;

  let isContainGrid = false;
  let isContainMeta = false;

  const handledChildren = React.Children.map(children, (element: JSX.Element) => {
    if (element && element.type) {
      if (element.type === Grid) {
        isContainGrid = true;
      } else if (element.type === Meta) {
        isContainMeta = true;
        return React.cloneElement(element, { actionList });
      }
    }
    return element;
  });

  return (
    <div
      {...rest}
      ref={ref}
      className={cs(
        prefixCls,
        `${prefixCls}-size-${size}`,
        {
          [`${prefixCls}-loading`]: loading,
          [`${prefixCls}-bordered`]: bordered,
          [`${prefixCls}-hoverable`]: hoverable,
          [`${prefixCls}-contain-grid`]: isContainGrid,
          [`${prefixCls}-rtl`]: rtl,
        },
        className
      )}
    >
      {title || extra ? (
        <div
          className={cs(`${prefixCls}-header`, { [`${prefixCls}-header-no-title`]: !title })}
          style={headerStyle}
        >
          {title && <div className={`${prefixCls}-header-title`}>{title}</div>}
          {extra && <div className={`${prefixCls}-header-extra`}>{extra}</div>}
        </div>
      ) : null}

      {cover ? <div className={`${prefixCls}-cover`}>{cover}</div> : null}

      <div className={`${prefixCls}-body`} style={bodyStyle}>
        {loading ? loadingElement || <Spin /> : handledChildren}
        {isContainMeta ? null : actionList}
      </div>
    </div>
  );
}

const ForwardRefCard = React.forwardRef<unknown, CardProps>(Card);

const CardComponent = ForwardRefCard as typeof ForwardRefCard & {
  Meta: typeof Meta;
  Grid: typeof Grid;
};

CardComponent.Meta = Meta;

CardComponent.Grid = Grid;

CardComponent.displayName = 'Card';

export default CardComponent;

export { CardProps };

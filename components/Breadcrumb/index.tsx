import React, { ReactNode, useContext, PropsWithChildren, forwardRef } from 'react';
import cs from '../_util/classNames';
import Item from './item';
import { ConfigContext } from '../ConfigProvider';
import Menu from '../Menu';
import IconObliqueLine from '../../icon/react-icon/IconObliqueLine';
import omit from '../_util/omit';
import { RouteProps, BreadcrumbProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const defaultItemRender = (route: RouteProps, routes: RouteProps[], paths: string[]): ReactNode => {
  if (routes.indexOf(route) === routes.length - 1) {
    return <span>{route.breadcrumbName}</span>;
  }
  return <a href={`#/${paths.join('/').replace(/^\//, '')}`}>{route.breadcrumbName}</a>;
};

const defaultProps: BreadcrumbProps = {
  separator: <IconObliqueLine />,
};

function Breadcrumb(baseProps: PropsWithChildren<BreadcrumbProps>, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<BreadcrumbProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Breadcrumb
  );
  const { className, children, style, routes, maxCount, separator, ...rest } = props;

  const prefixCls = getPrefixCls('breadcrumb');
  const itemRender = 'itemRender' in props ? props.itemRender : defaultItemRender;

  const Ellipses = (
    <span aria-label="ellipses of breadcrumb items" className={`${prefixCls}-item-ellipses`}>
      ...
    </span>
  );
  const Separator = (
    <span aria-hidden className={`${prefixCls}-item-separator`}>
      {separator}
    </span>
  );

  const getValidChild = (itemToRender: ReactNode, delta: number, index: number) => {
    const SeparatorWithKey = React.cloneElement(Separator, { key: `${index}_separator` });

    // Show ellipses
    if (delta > 0) {
      if (index === 0) {
        return [itemToRender, SeparatorWithKey, Ellipses];
      }

      if (index > delta) {
        return [SeparatorWithKey, itemToRender];
      }

      return null;
    }

    return index === 0 ? [itemToRender] : [SeparatorWithKey, itemToRender];
  };

  const getItemsByRoute = () => {
    const paths = [];
    const delta = routes.length - maxCount;

    return routes.map((route, index) => {
      paths.push((route.path || '').replace(/^\//, ''));

      const droplist = route.children ? (
        <Menu>
          {route.children.map((item) => {
            return (
              <Menu.Item key={item.path || item.breadcrumbName}>
                {itemRender(item, routes, paths)}
              </Menu.Item>
            );
          })}
        </Menu>
      ) : null;

      return getValidChild(
        <Item prefixCls={prefixCls} key={route.path || route.breadcrumbName} droplist={droplist}>
          {itemRender(route, routes, paths)}
        </Item>,
        delta,
        index
      );
    });
  };

  const getItemsByChildren = () => {
    const delta = React.Children.toArray(children).length - maxCount;
    return React.Children.map(children, (child: React.ReactElement, index) => {
      return (
        child &&
        getValidChild(
          React.cloneElement(child, {
            prefixCls,
          }),
          delta,
          index
        )
      );
    });
  };

  return (
    <div
      role="list"
      ref={ref}
      style={style}
      className={cs(prefixCls, className)}
      {...omit(rest, ['itemRender'])}
    >
      {routes && routes.length ? getItemsByRoute() : getItemsByChildren()}
    </div>
  );
}

const ForwardRefBreadcrumb = forwardRef<unknown, BreadcrumbProps>(Breadcrumb);

const BreadcrumbComponent = ForwardRefBreadcrumb as typeof ForwardRefBreadcrumb & {
  Item: typeof Item;
};

BreadcrumbComponent.displayName = 'Breadcrumb';

BreadcrumbComponent.Item = Item;

export default BreadcrumbComponent;

export { BreadcrumbProps };

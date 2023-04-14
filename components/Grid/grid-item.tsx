import React, { forwardRef, ReactNode, useContext, useEffect, useMemo } from 'react';
import { GridItemProps } from './interface';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { useResponsiveState } from './hooks/useResponsiveState';
import { GridContext, GridDataCollectorContext } from './context';
import { resolveItemData } from './utils';
import { isFunction, isString } from '../_util/is';

const defaultProps: GridItemProps = {
  suffix: false,
  offset: 0,
  span: 1,
};

function GridItem(baseProps: GridItemProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<GridItemProps>(
    baseProps,
    defaultProps,
    componentConfig?.['Grid.GridItem']
  );

  const {
    children,
    className,
    style,
    offset: propOffset,
    span: propSpan,
    __index__: computedIndex,
  } = props;
  const gridContext = useContext(GridContext);

  const { collectItemData, removeItemData } = useContext(GridDataCollectorContext);

  const { colGap, cols, displayIndexList, overflow } = gridContext;

  const offset = useResponsiveState(propOffset, 0);
  const span = useResponsiveState(propSpan, 1);

  const prefixCls = getPrefixCls('grid-item');

  const visible = displayIndexList?.includes(computedIndex);

  const mergeClassName = {
    [`${prefixCls}`]: true,
    [`${prefixCls}-rtl`]: rtl,
  };

  const classNames = cs(mergeClassName, className);

  const itemData = useMemo(() => {
    return resolveItemData(gridContext.cols, {
      suffix: !!props.suffix,
      span,
      offset,
    });
  }, [gridContext.cols, props.suffix, span, offset]);

  useEffect(() => {
    collectItemData(computedIndex, itemData);

    return () => {
      removeItemData(computedIndex);
    };
  }, [computedIndex, itemData]);

  const offsetStyle = useMemo(() => {
    const { offset, span } = itemData;
    if (offset > 0) {
      const oneSpan = `(100% - ${colGap * (span - 1)}px) / ${span}`;
      return {
        marginLeft: `calc((${oneSpan} * ${offset}) + ${colGap * offset}px)`,
      };
    }
    return {};
  }, [itemData, colGap]);

  const columnStart = useMemo(() => {
    const { suffix, span } = itemData;
    if (suffix) {
      return `${cols - span + 1}`;
    }
    return `span ${span}`;
  }, [itemData, cols]);

  const visibleStyle = !visible || span === 0 ? { display: 'none' } : {};

  const gridItemStyle = {
    gridColumn: `${columnStart} / span ${span}`,
    ...offsetStyle,
    ...visibleStyle,
  };

  return (
    <div
      ref={ref}
      className={classNames}
      style={{
        ...gridItemStyle,
        ...style,
      }}
    >
      {isFunction(children)
        ? children({ overflow })
        : React.Children.map(children, (child: ReactNode) => {
            if (
              child &&
              gridContext.collapsed &&
              React.isValidElement(child) &&
              !isString(child.type)
            ) {
              // 排除原生 dom 标签，避免 overflow 属性透传到 dom 标签上
              return React.cloneElement(child, {
                overflow,
                ...child.props,
              });
            }
            return child;
          })}
    </div>
  );
}
const ForwardRefGridItem = forwardRef(GridItem);

const GridItemComponent = ForwardRefGridItem as typeof ForwardRefGridItem & {
  __ARCO_GRID_ITEM__: boolean;
};

GridItemComponent.displayName = 'GridItem';

GridItemComponent.__ARCO_GRID_ITEM__ = true;

export default GridItemComponent;

export { GridItemProps };

import React, { forwardRef, ReactElement, useContext, useEffect, useMemo } from 'react';
import { GridItemProps } from './interface';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { useResponsiveState } from './hooks/useResponsiveState';
import { GridContext, GridDataCollectorContext } from './context';
import { resolveItemData } from './utils';

const defaultProps: GridItemProps = {
  suffix: false,
  offset: 0,
  span: 1,
};

type OtherType = {
  index: number;
};

function GridItem(baseProps: GridItemProps & OtherType, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<GridItemProps & OtherType>(
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
    index: computedIndex,
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
      {React.Children.map(children, (child: ReactElement) => {
        if (child) {
          const childProps = {
            overflow,
            ...child.props,
          };
          return child.type ? React.cloneElement(child, childProps) : child;
        }
        return null;
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

import React, { forwardRef, ReactElement, useContext, useState } from 'react';
import get from 'lodash/get';
import { GridItemData, GridProps } from './interface';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { useResponsiveState } from './hooks/useResponsiveState';
import { GridContext, GridDataCollectorContext } from './context';
import { setItemVisible } from './utils';

const defaultProps: GridProps = {
  collapsed: false,
  collapsedRows: 1,
  cols: 24,
  colGap: 0,
  rowGap: 0,
};

function Grid(baseProps: GridProps, ref) {
  const [itemDataMap, setItemDataMap] = useState<Map<number, GridItemData>>(new Map());
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<GridProps>(baseProps, defaultProps, componentConfig?.Grid);
  const {
    children,
    className,
    style,
    cols: propCols,
    colGap: propColGap,
    rowGap: propRowGap,
    collapsed,
    collapsedRows,
  } = props;

  const cols = useResponsiveState(propCols, 24);
  const colGap = useResponsiveState(propColGap, 0);
  const rowGap = useResponsiveState(propRowGap, 0);

  const gridStyle = {
    gap: `${rowGap}px ${colGap}px`,
    gridTemplateColumns: `repeat(${cols}, minmax(0px, 1fr))`,
  };

  const prefixCls = getPrefixCls('grid');
  const mergeClassName = {
    [`${prefixCls}`]: true,
    [`${prefixCls}-rtl`]: rtl,
  };

  const classNames = cs(mergeClassName, className);

  const getItemDataList = () => {
    const list: GridItemData[] = [];
    for (const [index, itemData] of itemDataMap.entries()) {
      list[index] = itemData;
    }
    return list;
  };
  const itemDataList = getItemDataList();

  const displayInfo = setItemVisible({
    cols,
    collapsed,
    collapsedRows,
    itemDataList,
  });
  return (
    <div
      ref={ref}
      className={classNames}
      style={{
        ...gridStyle,
        ...style,
      }}
    >
      <GridDataCollectorContext.Provider
        value={{
          collectItemData(index, itemData) {
            itemDataMap.set(index, itemData);
            setItemDataMap(new Map([...itemDataMap]));
          },
          removeItemData(index) {
            itemDataMap.delete(index);
            setItemDataMap(new Map([...itemDataMap]));
          },
        }}
      >
        <GridContext.Provider
          value={{
            cols,
            colGap,
            collapsed,
            overflow: displayInfo.overflow,
            displayIndexList: displayInfo.displayIndexList,
          }}
        >
          {React.Children.map(children, (child: ReactElement, index) => {
            if (child) {
              const childProps = {
                __index__: index,
                ...child.props,
              };

              return React.cloneElement(child, childProps);
            }
            return null;
          }).filter((child: ReactElement) => get(child, 'type.__ARCO_GRID_ITEM__'))}
        </GridContext.Provider>
      </GridDataCollectorContext.Provider>
    </div>
  );
}

const GridComponent = forwardRef(Grid);

GridComponent.displayName = 'Grid';

export default GridComponent;

export { GridProps };

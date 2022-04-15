import React, { useCallback, useContext, useImperativeHandle, useRef, useState } from 'react';
import throttle from 'lodash/throttle';
import Pagination, { PaginationProps } from '../Pagination';
import Spin from '../Spin';
import Item from './item';
import cs from '../_util/classNames';
import Row from '../Grid/row';
import Col from '../Grid/col';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import VirtualList, { VirtualListHandle } from '../_class/VirtualList';
import { ListProps } from './interface';
import scrollIntoView from '../_util/scrollIntoView';
import useMergeProps from '../_util/hooks/useMergeProps';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_CURRENT = 1;

const SizeList = ['small', 'default', 'large'];

const defaultProps: ListProps = {
  split: true,
  bordered: true,
  defaultCurrent: 1,
  offsetBottom: 0,
  throttleDelay: 500,
};

function List<T extends unknown = any>(baseProps: ListProps<T>, ref) {
  const {
    getPrefixCls,
    loadingElement,
    size: ctxSize,
    renderEmpty,
    componentConfig,
  } = useContext(ConfigContext);
  const props = useMergeProps<ListProps>(baseProps, defaultProps, componentConfig?.List);
  const {
    style,
    wrapperStyle,
    className,
    wrapperClassName,
    children = [],
    dataSource = [],
    size: propSize,
    footer,
    header,
    pagination,
    bordered,
    split,
    render,
    grid,
    loading,
    hoverable,
    scrollLoading,
    paginationInFooter,
    offsetBottom,
    throttleDelay,
    defaultCurrent,
    noDataElement,
    listRef,
    onReachBottom,
    onListScroll,
  } = props;

  const size = propSize || (SizeList.indexOf(ctxSize) > -1 ? ctxSize : 'default');
  const prefixCls = getPrefixCls('list');

  const refDom = useRef(null);
  const refVirtualList = useRef<VirtualListHandle>(null);
  const refScrollElement = useRef<HTMLDivElement>(null);
  const refItemListWrapper = useRef<HTMLDivElement>(null);
  const refCanTriggerReachBottom = useRef(true);

  const [pageSize, setPageSize] = useState(
    pagination && typeof pagination === 'object'
      ? pagination.pageSize || pagination.defaultPageSize || DEFAULT_PAGE_SIZE
      : DEFAULT_PAGE_SIZE
  );
  const [paginationCurrent, setPaginationCurrent] = useState(
    pagination && typeof pagination === 'object'
      ? pagination.current || pagination.defaultCurrent || DEFAULT_PAGE_CURRENT
      : DEFAULT_PAGE_CURRENT
  );
  const [pageCurrentForScroll, setPageCurrentForScroll] = useState(defaultCurrent);
  const childrenCount = React.Children.count(children);

  useImperativeHandle(listRef, () => {
    return {
      dom: refDom.current,
      scrollIntoView: (index, options?: ScrollIntoViewOptions) => {
        if (refVirtualList.current) {
          refVirtualList.current.scrollTo({ index, options });
        } else if (refItemListWrapper.current) {
          const node = refItemListWrapper.current.children[index];
          node &&
            scrollIntoView(node as HTMLElement, {
              boundary: refScrollElement.current,
              ...options,
            });
        }
      },
    };
  });

  // compatible with old API: height
  const virtualListProps = props.virtualListProps
    ? props.virtualListProps
    : props.height
    ? { height: props.height }
    : undefined;

  // pagination props
  const paginationProps: PaginationProps = {
    pageSize,
    current: paginationCurrent,
    total: dataSource.length > 0 ? dataSource.length : childrenCount,
    ...(typeof pagination === 'object' ? pagination : {}),
    onPageSizeChange: (size, current) => {
      setPageSize(size);
      pagination &&
        typeof pagination === 'object' &&
        pagination.onPageSizeChange &&
        pagination.onPageSizeChange(size, current);
    },
    onChange: (pageNumber: number, pageSize: number) => {
      setPaginationCurrent(pageNumber);
      pagination &&
        typeof pagination === 'object' &&
        pagination.onChange &&
        pagination.onChange(pageNumber, pageSize);
    },
  };
  paginationProps.current = Math.min(
    paginationProps.current,
    Math.ceil(paginationProps.total / paginationProps.pageSize)
  );

  const needHandleScroll = !!(onListScroll || onReachBottom);
  const throttledScrollHandler = useCallback(
    throttle(() => {
      if (onListScroll) {
        onListScroll(refScrollElement.current);
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = refScrollElement.current;
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);

      if (scrollBottom <= offsetBottom) {
        if (refCanTriggerReachBottom.current) {
          setPageCurrentForScroll(pageCurrentForScroll + 1);
          onReachBottom && onReachBottom(pageCurrentForScroll + 1);
          refCanTriggerReachBottom.current = false;
        }
      } else {
        refCanTriggerReachBottom.current = true;
      }
    }, throttleDelay),
    [throttleDelay, pageCurrentForScroll, onListScroll, onReachBottom]
  );

  // render content of list
  const renderListItems = () => {
    // get the data source to render current page
    const getCurrentPageItems = (items) => {
      const { current, pageSize } = paginationProps;
      const startIndex = (current - 1) * pageSize;
      return pagination && items.length > startIndex
        ? items.slice(startIndex, startIndex + pageSize)
        : items;
    };

    // The current page of the normal list children
    const getItems = (originItems: Array<any>, render?) => {
      const currentPageItems = getCurrentPageItems(originItems);
      return render ? currentPageItems.map(render) : currentPageItems;
    };

    // The current page of the Grid list children
    const getGrid = (originItems: Array<any>, render?) => {
      const currentPageItems = getCurrentPageItems(originItems);

      if (grid.column || grid.span) {
        const items: React.ReactNode[] = [];
        const { gutter, justify, align, column: gridRowSize, ...colProps } = grid;
        const rowSize = gridRowSize || Math.floor(24 / grid.span);
        const span = colProps.span || Math.floor(24 / rowSize);

        let startNum = 0;
        while (startNum < currentPageItems.length) {
          const nextStartNum = startNum + rowSize;
          const currentRow = ~~(startNum / rowSize);
          items.push(
            <Row
              key={currentRow}
              className={`${prefixCls}-row`}
              gutter={gutter}
              justify={justify}
              align={align}
            >
              {currentPageItems.slice(startNum, nextStartNum).map((item, index) => (
                <Col
                  key={`${currentRow}_${index}`}
                  className={`${prefixCls}-row-col`}
                  {...colProps}
                  span={span}
                >
                  {render ? render(item, startNum + index) : item}
                </Col>
              ))}
            </Row>
          );
          startNum = nextStartNum;
        }

        return items;
      }

      return (
        <Row className={`${prefixCls}-row`} gutter={grid.gutter}>
          {currentPageItems.map((item, index) => (
            <Col className={`${prefixCls}-row-col`} {...omit(grid, ['gutter'])} key={index}>
              {render ? render(item, index) : item}
            </Col>
          ))}
        </Row>
      );
    };

    if (dataSource.length > 0 && render) {
      return grid ? getGrid(dataSource, render) : getItems(dataSource, render);
    }
    if (childrenCount > 0) {
      return grid ? getGrid(children as []) : getItems(children as []);
    }
    if (!scrollLoading) {
      return noDataElement || renderEmpty('List');
    }

    return null;
  };

  const renderList = () => {
    const listItems = renderListItems();
    const isVirtual = virtualListProps && Array.isArray(listItems);
    const paginationElement = pagination ? (
      <Pagination
        {...paginationProps}
        className={cs(`${prefixCls}-pagination`, paginationProps && paginationProps.className)}
      />
    ) : null;
    const paginationElementInsideFooter = paginationInFooter ? paginationElement : null;
    const paginationElementOutsideFooter = paginationInFooter ? null : paginationElement;
    const scrollLoadingEle =
      scrollLoading !== undefined && scrollLoading !== null ? (
        <div className={`${prefixCls}-item ${prefixCls}-scroll-loading`}>{scrollLoading}</div>
      ) : null;

    return (
      <div
        ref={(_ref) => {
          ref = _ref;
          refDom.current = ref;
        }}
        style={wrapperStyle}
        className={cs(`${prefixCls}-wrapper`, wrapperClassName)}
      >
        <div
          style={style}
          className={cs(
            prefixCls,
            `${prefixCls}-${size}`,
            {
              [`${prefixCls}-no-border`]: !bordered,
              [`${prefixCls}-no-split`]: !split,
              [`${prefixCls}-hoverable`]: hoverable,
            },
            className
          )}
          ref={(ref) => {
            if (!isVirtual) {
              refScrollElement.current = ref;
            }
          }}
          onScroll={!isVirtual && needHandleScroll ? throttledScrollHandler : undefined}
        >
          {header ? <div className={`${prefixCls}-header`}>{header}</div> : null}

          {isVirtual ? (
            <>
              <VirtualList
                role="list"
                ref={(ref) => {
                  if (ref) {
                    refVirtualList.current = ref;
                    refScrollElement.current = ref.dom as HTMLDivElement;
                  }
                }}
                className={`${prefixCls}-content ${prefixCls}-virtual`}
                data={scrollLoadingEle ? listItems.concat(scrollLoadingEle) : listItems}
                isStaticItemHeight={false}
                onScroll={needHandleScroll ? throttledScrollHandler : undefined}
                {...virtualListProps}
              >
                {(child) => child}
              </VirtualList>
            </>
          ) : (
            <div role="list" className={`${prefixCls}-content`} ref={refItemListWrapper}>
              {listItems}
              {scrollLoadingEle}
            </div>
          )}

          {footer || paginationElementInsideFooter ? (
            <div className={`${prefixCls}-footer`}>
              {footer}
              {paginationElementInsideFooter}
            </div>
          ) : null}
        </div>

        {paginationElementOutsideFooter}
      </div>
    );
  };

  return 'loading' in props ? (
    <Spin style={{ display: 'block' }} loading={loading} element={loadingElement || <Spin />}>
      {renderList()}
    </Spin>
  ) : (
    renderList()
  );
}

interface ForwardRefListType
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ListProps> & React.RefAttributes<HTMLDivElement>
  > {
  <T = any>(
    props: React.PropsWithChildren<ListProps<T>> & {
      ref?: React.Ref<HTMLDivElement>;
    }
  ): React.ReactElement;
  Item: typeof Item;
}

const ListComponent = React.forwardRef<HTMLDivElement, ListProps>(List) as ForwardRefListType;

ListComponent.displayName = 'List';

ListComponent.Item = Item;

export default ListComponent;

export { ListProps };

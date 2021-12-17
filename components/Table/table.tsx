import React, {
  useState,
  useRef,
  useContext,
  useImperativeHandle,
  forwardRef,
  useMemo,
  useCallback,
  CSSProperties,
} from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import BTween from 'b-tween';
import { isObject, isArray } from '../_util/is';
import cs from '../_util/classNames';
import Spin, { SpinProps } from '../Spin';
import { TableProps, ColumnProps, SorterResult, GetRowKeyType } from './interface';
import Thead from './thead/index';
import Tbody from './tbody/index';
import Tfoot from './tfoot/index';
import Pagination from '../Pagination';
import { on, off } from '../_util/dom';
import { ConfigContext } from '../ConfigProvider';
import { PaginationProps } from '../Pagination/pagination';
import { getScrollBarHeight, getScrollBarWidth } from './utils';
import ColGroup from './colgroup';
import useExpand from './hooks/useExpand';
import useRowSelection from './hooks/useRowSelection';
import useComponent from './hooks/useComponent';
import useStickyOffsets from './hooks/useStickyOffsets';
import useStickyClassNames from './hooks/useStickyClassNames';
import useColumns from './hooks/useColumns';
import useUpdate from '../_util/hooks/useUpdate';
import ResizeObserver from '../_util/resizeObserver';
import useMergeProps from '../_util/hooks/useMergeProps';
import useIsomorphicLayoutEffect from '../_util/hooks/useIsomorphicLayoutEffect';

export interface TableInstance {
  getRootDomElement: () => HTMLDivElement;
}

type FilterType<T> = Partial<Record<keyof T, string[]>>;

const defaultProps: TableProps = {
  showHeader: true,
  border: true,
  hover: true,
  rowKey: 'key',
  pagePosition: 'br',
  childrenColumnName: 'children',
  indentSize: 15,
  showSorterTooltip: true,
};

function Table<T extends unknown>(baseProps: TableProps<T>, ref: React.Ref<TableInstance>) {
  const {
    getPrefixCls,
    loadingElement,
    size: ctxSize,
    tablePagination,
    renderEmpty,
    componentConfig,
  } = useContext(ConfigContext);
  const props = useMergeProps<TableProps<T>>(baseProps, defaultProps, componentConfig?.Table);
  const {
    style,
    className,
    components,
    border,
    borderCell,
    columns = [],
    data = [],
    scroll,
    noDataElement,
    showHeader,
    stripe,
    hover,
    pagination,
    onChange,
    pagePosition,
    childrenColumnName,
    indentSize,
    rowSelection,
    tableLayoutFixed,
    footer,
    virtualized,
    renderPagination,
    summary,
    rowKey,
  } = props;

  const prefixCls = getPrefixCls('table');

  // configProvider 提供的size可能和table size 不匹配，此时默认 'default'
  const size =
    props.size || (['default', 'middle', 'small'].indexOf(ctxSize) > -1 ? ctxSize : 'default');
  const refTableHead = useRef<HTMLElement | null>(null);
  const refTableBody = useRef<HTMLElement | null>(null);
  const refTableFoot = useRef<HTMLDivElement | null>(null);
  const refTable = useRef<HTMLDivElement | null>(null);
  // Not fixed header
  const refTableNF = useRef<HTMLTableElement | null>(null);
  const lastScrollLeft = useRef<number>(0);

  const scrollbarChanged = useRef<boolean>(false);

  const { currentFilters, currentSorter } = getDefaultFiltersAndSorter(columns);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [innerPageSize, setInnerPageSize] = useState<number>(
    isObject(pagination) ? pagination.defaultPageSize || 10 : 10
  );
  const [filters, setFilters] = useState<FilterType<T>>(currentFilters);
  const [sorter, setSorter] = useState<SorterResult>(currentSorter);
  const [tableViewWidth, setTableViewWidth] = useState<number>(0);

  const [groupColumns, flattenColumns] = useColumns<T>(props);
  const stickyOffsets: number[] = useStickyOffsets(flattenColumns);
  const [groupStickyClassNames, stickyClassNames] = useStickyClassNames(
    groupColumns,
    flattenColumns,
    prefixCls
  );

  const { ComponentTable, ComponentBodyWrapper, ComponentHeaderWrapper } = useComponent(components);

  const getRowKey: GetRowKeyType<T> = useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record) => record[rowKey];
  }, [rowKey]);

  function getDefaultFiltersAndSorter(columns) {
    const currentFilters = {} as Partial<Record<keyof T, string[]>>;
    const currentSorter = {} as SorterResult;
    function travel(columns) {
      if (columns && columns.length > 0) {
        columns.forEach((column, index) => {
          const innerDataIndex = column.dataIndex === undefined ? index : column.dataIndex;
          if (!column[childrenColumnName]) {
            if (column.defaultFilters) {
              currentFilters[innerDataIndex] = column.defaultFilters;
            }
            if (column.filteredValue) {
              currentFilters[innerDataIndex] = column.filteredValue;
            }
            if (column.defaultSortOrder) {
              currentSorter.field = innerDataIndex;
              currentSorter.direction = column.defaultSortOrder;
            }
            if (column.sortOrder) {
              currentSorter.field = innerDataIndex;
              currentSorter.direction = column.sortOrder;
            }
          } else {
            travel(column[childrenColumnName]);
          }
        });
      }
    }

    travel(columns);

    return { currentFilters, currentSorter };
  }

  const controlledFilter = useMemo(() => {
    // 允许 filteredValue 设置为 null，表示不筛选
    const flattenFilteredValueColumns = flattenColumns.filter(
      (column) => 'filteredValue' in column
    );
    const newFilters = {};
    // 受控的筛选，当columns中的筛选发生改变时，更新state
    if (flattenFilteredValueColumns.length) {
      flattenFilteredValueColumns.forEach((column, index) => {
        const innerDataIndex = column.dataIndex === undefined ? index : column.dataIndex;
        if (
          (column.filteredValue || column.filteredValue === null) &&
          innerDataIndex !== undefined
        ) {
          newFilters[innerDataIndex] = column.filteredValue;
        }
      });
    }

    return newFilters;
  }, [flattenColumns]);

  const controlledSorter = useMemo(() => {
    // 允许 sorter 设置为 null，表示不排序
    const flattenSortOrderColumns = flattenColumns.filter((column) => 'sortOrder' in column);
    let length = flattenSortOrderColumns.length;
    while (length--) {
      const column = flattenSortOrderColumns[length];
      if (column.sortOrder || length === 0) {
        return { field: column.dataIndex, direction: column.sortOrder };
      }
    }
    return null;
  }, [flattenColumns]);

  const innerSorter = controlledSorter || sorter || {};
  const innerFilters = useMemo<FilterType<T>>(() => {
    return {
      ...filters,
      ...controlledFilter,
    };
  }, [filters, controlledFilter]);

  /** ----------- Sorter ----------- */

  function onSort(direction, field) {
    const newSorter: SorterResult = {
      field,
      direction,
    };
    !controlledSorter && setSorter(newSorter);
    const newProcessedData = getProcessedData(newSorter, innerFilters);
    const currentData = getPageData(newProcessedData);
    onChange &&
      onChange(getPaginationProps(newProcessedData), newSorter, innerFilters, {
        currentData,
        action: 'sort',
      });
  }

  function sorterFn(sorter, direction) {
    if (typeof sorter !== 'function') {
      return;
    }
    return (a, b) => {
      const result = sorter(a, b);
      return direction === 'descend' ? -result : result;
    };
  }

  /** ----------- Sorter End ----------- */

  /** ----------- Filters ----------- */
  function onHandleFilter(column, filter: string[]) {
    const newFilters = {
      ...innerFilters,
      [column.dataIndex]: filter,
    };
    const mergedFilters = {
      ...newFilters,
      ...controlledFilter,
    };
    if (isArray(filter) && filter.length) {
      setFilters(mergedFilters);
      const newProcessedData = getProcessedData(innerSorter, newFilters);
      const currentData = getPageData(newProcessedData);
      onChange &&
        onChange(getPaginationProps(newProcessedData), innerSorter, newFilters, {
          currentData,
          action: 'filter',
        });
    } else if (isArray(filter) && !filter.length) {
      onHandleFilterReset(column);
    }
  }

  function onHandleFilterReset({ dataIndex }) {
    const newFilters = {
      ...innerFilters,
    };
    delete newFilters[dataIndex];
    setFilters(newFilters);
    const newProcessedData = getProcessedData(innerSorter, newFilters);
    const currentData = getPageData(newProcessedData);
    onChange &&
      onChange(getPaginationProps(newProcessedData), innerSorter, newFilters, {
        currentData,
        action: 'filter',
      });
  }

  /** ----------- Filters End ----------- */

  const hasFixedColumnLeft = !!flattenColumns.find((c) => c.fixed === 'left');
  const hasFixedColumnRight = !!flattenColumns.find((c) => c.fixed === 'right');
  const hasFixedColumn = hasFixedColumnLeft || hasFixedColumnRight;

  function getProcessedData(sorter, filters) {
    let _data = (data || []).slice();

    Object.keys(filters).forEach((field) => {
      if (filters[field] && filters[field].length) {
        const column = getColumnByDataIndex(field) as ColumnProps<T>;
        if (column && typeof column.onFilter === 'function') {
          _data = _data.filter((row) => {
            return filters[field].reduce(
              (pre, cur) => pre || (column.onFilter as Function)(cur, row),
              false
            );
          });
        }
      }
    });

    if (sorter.direction) {
      const column = getColumnByDataIndex(sorter.field) as ColumnProps<T>;
      if (column && typeof column.sorter === 'function') {
        _data.sort(sorterFn(column.sorter, sorter.direction));
      }
    }

    return _data;
  }

  // 获得经过 sorter 和 filters 筛选之后的 data
  const processedData = getProcessedData(innerSorter, innerFilters);

  function getPaginationProps(_processedData = processedData) {
    const pageSize =
      typeof pagination === 'object' && pagination.pageSize ? pagination.pageSize : innerPageSize;
    const paginationSize: 'small' | 'default' = size === 'small' ? 'small' : 'default';
    let selectPopupPosition: 'top' | 'bottom' = 'top';

    if (pagePosition === 'tl' || pagePosition === 'bl') {
      selectPopupPosition = 'bottom';
    } else {
      selectPopupPosition = 'top';
    }

    const total = isArray(_processedData) ? _processedData.length : 0;

    const current = Math.ceil(total / pageSize) < currentPage ? 1 : currentPage;

    if (current !== currentPage) {
      setCurrentPage(current);
    }

    let paginationProps: PaginationProps = {
      size: paginationSize,
      total,
      onChange: onPaginationChange,
      pageSize,
      current,
      selectProps: {
        triggerProps: {
          position: selectPopupPosition,
        },
      },
    };

    if (typeof pagination === 'object' && pagination.selectProps) {
      paginationProps.selectProps = {
        ...paginationProps.selectProps,
        ...pagination.selectProps,
      };
    }

    if (isObject(pagination)) {
      paginationProps = {
        ...paginationProps,
        ...(pagination as object),
      };
    }

    if (isObject(tablePagination)) {
      paginationProps = {
        ...tablePagination,
        ...paginationProps,
      };
    }

    return paginationProps;
  }

  const paginationProps = getPaginationProps();

  const pageData = getPageData();

  function getPageData(currentData = processedData, _paginationProps = paginationProps) {
    const { current = 0, pageSize = 10 } = _paginationProps;
    if (pagination === false) {
      return currentData;
    }
    if (isObject(pagination) && data.length <= pageSize) {
      return currentData;
    }
    return currentData.slice((current - 1) * pageSize, current * pageSize);
  }

  const throttleResizeHandler = debounce(resizeHandler, 100);

  const fixedHeader = !!(scroll && scroll.y);

  const summaryNode = summary?.(processedData);

  const fixedFooterPosition: 'top' | 'bottom' | undefined =
    summary && React.isValidElement(summaryNode) && summaryNode.props.fixed;

  const fixedFooter = fixedHeader && fixedFooterPosition;

  useIsomorphicLayoutEffect(() => {
    resizeHandler();
    on(window, 'resize', throttleResizeHandler);

    const tableHead = refTableHead.current;
    const tableBody = refTableBody.current;
    const tableFoot = refTableFoot.current;

    if (tableBody) {
      on(tableBody, 'scroll', tableScrollHandler);
    }

    const theadScrollContainer = tableHead && tableHead.parentNode;

    if (tableHead) {
      if (theadScrollContainer) {
        on(theadScrollContainer, 'scroll', tableScrollHandler);
      }
    }

    if (tableFoot) {
      on(tableFoot, 'scroll', tableScrollHandler);
    }

    return () => {
      off(window, 'resize', throttleResizeHandler);

      if (tableBody) {
        off(tableBody, 'scroll', tableScrollHandler);
      }

      if (theadScrollContainer) {
        off(theadScrollContainer, 'scroll', tableScrollHandler);
      }

      if (tableFoot) {
        off(tableFoot, 'scroll', tableScrollHandler);
      }
    };
  }, [hasFixedColumnLeft, hasFixedColumnLeft, scroll?.x, flattenColumns.length]);

  useUpdate(() => {
    const { total, pageSize } = getPaginationProps(data);
    const maxPageNum = Math.ceil(total / pageSize);
    if (maxPageNum < currentPage) {
      setCurrentPage(1);
    }
  }, [data.length]);

  useUpdate(() => {
    setFixedColumnClassNames();
  }, [data, hasFixedColumnLeft, hasFixedColumnLeft]);

  useImperativeHandle(ref, () => ({
    getRootDomElement,
  }));

  function getRootDomElement() {
    return refTable.current as HTMLDivElement;
  }

  function resizeHandler() {
    setFixedColumnClassNames();
    const root = getRootDomElement();
    if (root && (hasFixedColumn || (scroll && scroll.x))) {
      const ele =
        root.querySelector(`.${prefixCls}-body`) ||
        root.querySelector(`.${prefixCls}-content-inner`);
      const tableViewWidth = ele.clientWidth;
      setTableViewWidth(tableViewWidth);
    }
  }

  const setPositionClassNames = useCallback(
    throttle(() => {
      const table = refTable.current as HTMLElement;
      const tbody = (
        fixedHeader ? refTableBody.current : refTableNF.current && refTableNF.current.parentNode
      ) as HTMLElement;
      if (tbody) {
        const alignLeft = tbody.scrollLeft === 0;
        // const alignRight = tbody.scrollLeft + tbody.clientWidth >= tbody.scrollWidth;
        const alignRight =
          tbody.scrollLeft + 1 >=
          tbody.children[0].getBoundingClientRect().width - tbody.getBoundingClientRect().width;
        if (alignLeft && alignRight) {
          setFixedColumnsClassList(table.classList, `${prefixCls}-scroll-position-both`);
        } else if (alignLeft) {
          setFixedColumnsClassList(table.classList, `${prefixCls}-scroll-position-left`);
        } else if (alignRight) {
          setFixedColumnsClassList(table.classList, `${prefixCls}-scroll-position-right`);
        } else {
          setFixedColumnsClassList(table.classList, `${prefixCls}-scroll-position-middle`);
        }
      } else {
        table && resetTableClassName(table.classList);
      }
    }, 100),
    [refTable.current, refTableBody.current]
  );

  function setFixedColumnClassNames() {
    if (hasFixedColumn || (scroll && isObject(scroll) && scroll.x)) {
      const table = refTable.current as HTMLElement;

      if (table) {
        if (hasFixedColumnLeft) {
          setTableFixedClassName(table.classList, `${prefixCls}-has-fixed-col-left`);
        }
        if (hasFixedColumnRight) {
          setTableFixedClassName(table.classList, `${prefixCls}-has-fixed-col-right`);
        }
      }

      setPositionClassNames();
    }
  }

  function setTableFixedClassName(tableClassList, className) {
    if (!tableClassList.contains(className)) {
      tableClassList.add(className);
    }
  }

  function resetTableClassName(classList) {
    classList.remove(`${prefixCls}-scroll-position-both`);
    classList.remove(`${prefixCls}-scroll-position-left`);
    classList.remove(`${prefixCls}-scroll-position-right`);
    classList.remove(`${prefixCls}-scroll-position-middle`);
  }

  function setFixedColumnsClassList(classList, className) {
    if (!classList.contains(className)) {
      resetTableClassName(classList);
      classList.add(className);
    }
  }

  const {
    selectedRowKeys,
    onCheckAll,
    onCheck,
    onCheckRadio,
    setSelectedRowKeys,
    allSelectedRowKeys,
    flattenData,
  } = useRowSelection<T>(props, pageData, getRowKey);

  function getColumnByDataIndex(dataIndex) {
    return flattenColumns.find((column, index) => {
      if (column.dataIndex !== undefined) {
        return column.dataIndex === dataIndex;
      }
      return Number(dataIndex) === index;
    });
  }

  function onPaginationChange(current, pageSize) {
    setCurrentPage(current);
    setInnerPageSize(pageSize);
    if (current !== currentPage) {
      scrollToTop();
    }
    if (rowSelection && !rowSelection.checkCrossPage && selectedRowKeys.length) {
      setSelectedRowKeys([]);
      rowSelection.onChange && rowSelection.onChange([], []);
    }
    const newPaginationProps = { ...getPaginationProps(), current, pageSize };
    onChange &&
      onChange(newPaginationProps, innerSorter, innerFilters, {
        currentData: getPageData(processedData, newPaginationProps),
        action: 'paginate',
      });
  }

  function scrollToTop() {
    const tableBody = refTableBody.current;
    if (!tableBody) {
      return;
    }
    const scrollTop = refTableBody.current.scrollTop;
    const tween = new BTween({
      from: { scrollTop },
      to: { scrollTop: 0 },
      easing: 'quintInOut',
      duration: 300,
      onUpdate: (keys) => {
        refTableBody.current.scrollTop = keys.scrollTop;
      },
    });
    tween.start();
  }

  function tableScrollHandler(e) {
    const { target } = e;
    const tbody = refTableBody.current as HTMLElement;
    const theadScrollContainer =
      refTableHead.current && (refTableHead.current.parentNode as HTMLElement);
    const tfoot = refTableFoot.current;
    if (target.scrollLeft !== lastScrollLeft.current) {
      if (theadScrollContainer) {
        theadScrollContainer.scrollLeft = target.scrollLeft;
      }
      if (tbody) {
        tbody.scrollLeft = target.scrollLeft;
      }
      if (tfoot) {
        tfoot.scrollLeft = target.scrollLeft;
      }
      setFixedColumnClassNames();
    }
    lastScrollLeft.current = e.target.scrollLeft;
  }

  // isFixedHeader = false
  function tableScrollHandlerNF(e) {
    const { target } = e;
    const table = refTableNF.current as HTMLElement;
    if (target.scrollLeft !== lastScrollLeft.current) {
      table.scrollLeft = target.scrollLeft;
      setFixedColumnClassNames();
    }
    lastScrollLeft.current = e.target.scrollLeft;
  }

  const [expandedRowKeys, onClickExpandBtn] = useExpand<T>(props, flattenData, getRowKey);

  let scrollStyleY: CSSProperties = {};
  let scrollStyleX: CSSProperties = {};
  if (scroll) {
    if (scroll.x && (typeof scroll.x === 'number' || typeof scroll.x === 'string')) {
      scrollStyleX = {
        width: scroll.x,
      };
    }
    if (scroll.y && (typeof scroll.y === 'number' || typeof scroll.y === 'string')) {
      scrollStyleY = {
        maxHeight: scroll.y,
      };
    }
  }

  function setScrollBarStyle() {
    const wrapper = refTableHead.current && (refTableHead.current.parentNode as HTMLElement);
    const scrollBarHeight = getScrollBarHeight(wrapper);
    if (scrollBarHeight && scrollBarHeight > 0) {
      wrapper.style.marginBottom = `-${scrollBarHeight}px`;
      wrapper.style.paddingBottom = '0px';

      if (refTableFoot.current) {
        refTableFoot.current.style.marginBottom = `-${scrollBarHeight}px`;
        refTableFoot.current.style.paddingBottom = '0px';
      }
    }
    // 根据 Tbody 决定 Thead 是否显示纵向滚动条
    // TODO: Remove
    setTimeout(() => {
      const scrollWrapper = virtualized
        ? (refTableBody.current.children[0] as HTMLDivElement)
        : refTableBody.current;
      const scrollBarWidth = getScrollBarWidth(scrollWrapper);
      if (scrollBarWidth) {
        scrollbarChanged.current = true;
        wrapper.style.overflowY = 'scroll';

        if (refTableFoot.current) {
          refTableFoot.current.style.overflowY = 'scroll';
        }
      } else if (wrapper && scrollbarChanged.current) {
        scrollbarChanged.current = false;
        wrapper.style.overflowY = 'auto';

        if (refTableFoot.current) {
          refTableFoot.current.style.overflowY = 'auto';
        }
      }
    });
  }

  const theadNode = (
    <Thead<T>
      {...props}
      sorter={innerSorter}
      selectedRowKeys={selectedRowKeys}
      currentFilters={innerFilters}
      onCheckAll={onCheckAll}
      onSort={onSort}
      data={pageData}
      onHandleFilter={onHandleFilter}
      onHandleFilterReset={onHandleFilterReset}
      prefixCls={prefixCls}
      allSelectedRowKeys={allSelectedRowKeys}
      groupColumns={groupColumns}
      stickyOffsets={stickyOffsets}
      groupStickyClassNames={groupStickyClassNames}
    />
  );

  function renderThead() {
    const maxContentWidth = isObject(scroll) && scroll.x === 'max-content';
    return fixedHeader || virtualized ? (
      <ComponentHeaderWrapper className={`${prefixCls}-header`}>
        <ComponentTable ref={refTableHead} style={maxContentWidth ? {} : scrollStyleX}>
          <ColGroup columns={flattenColumns} prefixCls={prefixCls} />
          {theadNode}
        </ComponentTable>
      </ComponentHeaderWrapper>
    ) : (
      theadNode
    );
  }

  const footerNode = summaryNode && (
    <Tfoot<T>
      prefixCls={prefixCls}
      summary={summary}
      data={pageData}
      columns={flattenColumns}
      stickyOffsets={stickyOffsets}
      stickyClassNames={stickyClassNames}
    />
  );

  const tbodyNode = (
    <Tbody<T>
      {...props}
      selectedRowKeys={selectedRowKeys}
      expandedRowKeys={expandedRowKeys}
      onCheck={onCheck}
      onCheckRadio={onCheckRadio}
      onClickExpandBtn={onClickExpandBtn}
      columns={flattenColumns}
      data={pageData}
      prefixCls={prefixCls}
      hasFixedColumn={hasFixedColumn}
      tableViewWidth={tableViewWidth}
      indentSize={indentSize}
      noDataElement={noDataElement || renderEmpty('Table')}
      currentSorter={innerSorter}
      stickyOffsets={stickyOffsets}
      stickyClassNames={stickyClassNames}
      getRowKey={getRowKey}
      saveVirtualWrapperRef={(ref: HTMLDivElement) => {
        if (virtualized) {
          refTableBody.current = ref;
        }
      }}
    />
  );

  const tbody =
    !virtualized && !fixedFooter ? (
      <>
        {tbodyNode}
        {footerNode}
      </>
    ) : (
      tbodyNode
    );

  function renderTbody() {
    return (
      <ResizeObserver onResize={setScrollBarStyle}>
        {fixedHeader && !virtualized ? (
          <ComponentBodyWrapper
            ref={refTableBody}
            className={`${prefixCls}-body`}
            style={scrollStyleY}
          >
            <ComponentTable style={scrollStyleX}>
              <ColGroup columns={flattenColumns} prefixCls={prefixCls} />
              {tbody}
            </ComponentTable>
          </ComponentBodyWrapper>
        ) : (
          tbody
        )}
      </ResizeObserver>
    );
  }

  function renderTable() {
    let scrollStyle = {};
    if (scroll && isObject(scroll) && scroll.x) {
      scrollStyle = {
        width: scroll.x,
      };
    }

    const summaryTableNode = (
      <div className={`${prefixCls}-tfoot`} ref={refTableFoot}>
        <ComponentTable style={scrollStyle}>
          <ColGroup columns={flattenColumns} prefixCls={prefixCls} />
          {footerNode}
        </ComponentTable>
      </div>
    );

    const summaryFixedTop = summaryNode && fixedHeader && fixedFooterPosition === 'top';
    const summaryFixedBottom = summaryNode && fixedHeader && fixedFooterPosition === 'bottom';

    const body = (
      <>
        {showHeader ? renderThead() : null}
        {summaryFixedTop && summaryTableNode}
        {renderTbody()}
        {summaryFixedBottom && summaryTableNode}
      </>
    );

    return (
      <>
        <div className={`${prefixCls}-container`}>
          <div className={`${prefixCls}-content-scroll`}>
            <div
              className={`${prefixCls}-content-inner`}
              onScroll={!fixedHeader ? tableScrollHandlerNF : undefined}
            >
              {fixedHeader || virtualized ? (
                body
              ) : (
                <ComponentTable ref={refTableNF} style={scrollStyle}>
                  <ColGroup prefixCls={prefixCls} columns={flattenColumns} />
                  {body}
                </ComponentTable>
              )}
            </div>
          </div>
        </div>
        {typeof footer === 'function' && (
          <div className={`${prefixCls}-footer`}>{footer(pageData)}</div>
        )}
      </>
    );
  }

  if (!columns.length) {
    return null;
  }

  const showWrapperBorder = isObject(border) ? border.wrapper : border;
  const showCellBorder = isObject(border) ? border.cell : borderCell;
  const showHeaderCellBorder = isObject(border) ? border.cell || border.headerCell : borderCell;
  const showBodyCellBorder = isObject(border) ? border.cell || border.bodyCell : borderCell;

  const classNames = cs(
    prefixCls,
    `${prefixCls}-size-${size}`,
    {
      [`${prefixCls}-border`]: showWrapperBorder,
      [`${prefixCls}-border-cell`]: showCellBorder,
      [`${prefixCls}-border-header-cell`]: !showCellBorder && showHeaderCellBorder,
      [`${prefixCls}-border-body-cell`]: !showCellBorder && showBodyCellBorder,
      [`${prefixCls}-stripe`]: stripe,
      [`${prefixCls}-hover`]: hover,
      [`${prefixCls}-type-radio`]: rowSelection && rowSelection.type === 'radio',
      [`${prefixCls}-layout-fixed`]:
        tableLayoutFixed ||
        (scroll && (scroll.x || scroll.y)) ||
        columns.find((col) => col.ellipsis),
      [`${prefixCls}-virtualized`]: virtualized,
    },
    className
  );

  const isPaginationTop =
    pagePosition === 'tl' || pagePosition === 'tr' || pagePosition === 'topCenter';

  const paginationClassName = cs(`${prefixCls}-pagination`, {
    [`${prefixCls}-pagination-left`]: pagePosition === 'tl' || pagePosition === 'bl',
    [`${prefixCls}-pagination-center`]:
      pagePosition === 'topCenter' || pagePosition === 'bottomCenter',
    [`${prefixCls}-pagination-top`]: isPaginationTop,
  });

  let loading = props.loading as SpinProps;
  if (typeof loading === 'boolean') {
    loading = { loading };
  }

  const customPagination = typeof renderPagination === 'function';
  const paginationEle = customPagination ? (
    renderPagination(<Pagination {...paginationProps} />)
  ) : (
    <div className={paginationClassName}>
      <Pagination {...paginationProps} />
    </div>
  );

  return (
    <div ref={refTable} style={style} className={classNames}>
      <Spin element={loadingElement || <Spin />} {...loading}>
        {pagination !== false && isPaginationTop && paginationEle}
        {renderTable()}
        {pagination !== false && !isPaginationTop && paginationEle}
      </Spin>
    </div>
  );
}

const TableComponent = forwardRef<TableInstance, TableProps>(Table);

TableComponent.displayName = 'Table';

export default TableComponent as <T>(
  props: TableProps<T> & {
    ref?: React.Ref<TableInstance>;
  }
) => React.ReactElement;

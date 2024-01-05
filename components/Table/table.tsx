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
import { isObject, isArray, isNumber } from '../_util/is';
import cs from '../_util/classNames';
import Spin, { SpinProps } from '../Spin';
import {
  TableProps,
  ColumnProps,
  GetRowKeyType,
  SorterInfo,
  SortDirection,
  SorterFn,
} from './interface';
import { VirtualListHandle } from '../_class/VirtualList';
import Thead from './thead/index';
import Tbody from './tbody/index';
import Tfoot from './tfoot/index';
import Pagination from '../Pagination';
import { on, off } from '../_util/dom';
import { ConfigContext } from '../ConfigProvider';
import { PaginationProps } from '../Pagination/pagination';
import {
  getScrollBarHeight,
  getScrollBarWidth,
  deepCloneData,
  getOriginData,
  getSorterFn,
  getSorterPriority,
} from './utils';
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
import { pickDataAttributes } from '../_util/pick';
import useSorter from './hooks/useSorter';

export interface TableInstance {
  getRootDomElement: () => HTMLDivElement;
  scrollIntoView: (dataIndex: React.Key) => void;
}

type FilterType<T> = Partial<Record<keyof T, string[]>>;

const EMPTY_DATA = [];
const EMPTY_COLUMNS = [];

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
    rtl,
  } = useContext(ConfigContext);
  const props = useMergeProps<TableProps<T>>(baseProps, defaultProps, componentConfig?.Table);
  // priority: props.pagination > ConfigProvider.tablePagination > ConfigProvider.Table.pagination
  const mergePagination = useMergeProps<PaginationProps>(
    isObject(baseProps?.pagination) ? baseProps?.pagination : {},
    isObject(componentConfig?.Table?.pagination) ? componentConfig?.Table?.pagination : {},
    tablePagination || {}
  );

  const {
    style,
    className,
    components,
    border,
    borderCell,
    columns = EMPTY_COLUMNS,
    data = EMPTY_DATA,
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

  const clonedData = useMemo(
    () => deepCloneData(data, childrenColumnName),
    [data, childrenColumnName]
  );

  const prefixCls = getPrefixCls('table');

  // configProvider 提供的size可能和table size 不匹配，此时默认 'default'
  const size =
    props.size || (['default', 'middle', 'small'].indexOf(ctxSize) > -1 ? ctxSize : 'default');
  const refTableHead = useRef<HTMLElement | null>(null);
  const refTableBody = useRef<HTMLElement | null>(null);
  const refTableFoot = useRef<HTMLDivElement | null>(null);
  const refTable = useRef<HTMLDivElement | null>(null);
  const refVirtualList = useRef<VirtualListHandle | null>(null);
  // Not fixed header
  const refTableNF = useRef<HTMLTableElement | null>(null);
  const lastScrollLeft = useRef<number>(0);

  const scrollbarChanged = useRef<boolean>(false);
  const [groupColumns, flattenColumns] = useColumns<T>(props);

  const { currentFilters, defaultSorters } = getDefaultFiltersAndSorters();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [innerPageSize, setInnerPageSize] = useState<number>(
    mergePagination.pageSize || mergePagination.defaultPageSize || 10
  );
  const [filters, setFilters] = useState<FilterType<T>>(currentFilters);
  const [tableViewWidth, setTableViewWidth] = useState<number>(0);

  const [columnWidths, setColumnWidths] = useState<number[]>([]);

  const stickyOffsets: number[] = useStickyOffsets(flattenColumns);
  const [groupStickyClassNames, stickyClassNames] = useStickyClassNames(
    groupColumns,
    flattenColumns,
    prefixCls
  );
  const { currentSorter, activeSorters, getNextActiveSorters, updateStateSorters } = useSorter(
    flattenColumns,
    defaultSorters
  );

  const { ComponentTable, ComponentBodyWrapper, ComponentHeaderWrapper } = useComponent(components);

  const getRowKey: GetRowKeyType<T> = useMemo(() => {
    if (typeof rowKey === 'function') {
      return (record) => rowKey(getOriginData(record));
    }

    return (record) => record[rowKey];
  }, [rowKey]);

  function getDefaultFiltersAndSorters() {
    const currentFilters = {} as Partial<Record<keyof T, string[]>>;
    let defaultSorters: SorterInfo[] = [];
    flattenColumns.forEach((column) => {
      const innerDataIndex = column.key;
      if (column.defaultFilters) {
        currentFilters[innerDataIndex] = column.defaultFilters;
      }
      if (column.filteredValue) {
        currentFilters[innerDataIndex] = column.filteredValue;
      }
      if ('defaultSortOrder' in column || 'sortOrder' in column) {
        const priority = getSorterPriority(column.sorter);
        const direction = 'sortOrder' in column ? column.sortOrder : column.defaultSortOrder;
        const sorter: SorterInfo = {
          field: innerDataIndex,
          direction,
          sorterFn: getSorterFn(column.sorter),
          priority,
        };
        if (!direction) {
          defaultSorters.push(sorter);
        } else if (isNumber(priority)) {
          if (defaultSorters.every((item) => isNumber(item.priority) || !item.direction)) {
            defaultSorters.push(sorter);
          }
        } else if (defaultSorters.every((item) => !item.direction)) {
          defaultSorters.push(sorter);
        } else {
          defaultSorters = [sorter];
        }
      }
    });

    return { currentFilters, defaultSorters };
  }

  const controlledFilter = useMemo(() => {
    // 允许 filteredValue 设置为 undefined 表示不筛选
    const flattenFilteredValueColumns = flattenColumns.filter(
      (column) => 'filteredValue' in column
    );
    const newFilters = {};
    // 受控的筛选，当columns中的筛选发生改变时，更新state
    if (flattenFilteredValueColumns.length) {
      flattenFilteredValueColumns.forEach((column, index) => {
        const innerDataIndex = column.key || column.dataIndex || index;
        if (innerDataIndex !== undefined) {
          newFilters[innerDataIndex] = column.filteredValue;
        }
      });
    }
    return newFilters;
  }, [flattenColumns]);

  const innerFilters = useMemo<FilterType<T>>(() => {
    return Object.keys(controlledFilter).length ? controlledFilter : filters;
  }, [filters, controlledFilter]);

  /** ----------- Sorter ----------- */

  function onSort(direction, field) {
    const column = getColumnByUniqueKey(field);
    if (!column) {
      return;
    }
    const sorter: SorterInfo = {
      direction,
      field,
      sorterFn: getSorterFn(column.sorter),
      priority: getSorterPriority(column.sorter),
    };
    const nextActiveSorters = getNextActiveSorters(sorter);
    updateStateSorters(sorter, nextActiveSorters);
    const newProcessedData = getProcessedData(sorter, nextActiveSorters, innerFilters);
    const currentData = getPageData(newProcessedData);
    onChange &&
      onChange(getPaginationProps(newProcessedData), sorter, innerFilters, {
        currentData: getOriginData(currentData),
        currentAllData: getOriginData(newProcessedData),
        action: 'sort',
      });
  }

  function compareFn(activeSorters: SorterInfo[]) {
    const compare = function (fn: SorterFn, direction: SortDirection) {
      return (a, b) => {
        const result = fn(a, b);
        return direction === 'descend' ? -result : result;
      };
    };
    const sorters = [...activeSorters];
    sorters.sort((a, b) => b.priority - a.priority);
    return (a, b) => {
      for (let i = 0, l = sorters.length; i < l; i++) {
        const { sorterFn, direction } = sorters[i];
        if (typeof sorterFn !== 'function') {
          continue;
        }
        const result = compare(sorterFn, direction)(a, b);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
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
      const newProcessedData = getProcessedData(currentSorter, activeSorters, newFilters);
      const currentData = getPageData(newProcessedData);
      onChange &&
        onChange(
          getPaginationProps(newProcessedData),
          activeSorters.length === 1 ? activeSorters[0] : activeSorters,
          newFilters,
          {
            currentData: getOriginData(currentData),
            currentAllData: getOriginData(newProcessedData),
            action: 'filter',
          }
        );
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
    const newProcessedData = getProcessedData(currentSorter, activeSorters, newFilters);
    const currentData = getPageData(newProcessedData);
    onChange &&
      onChange(
        getPaginationProps(newProcessedData),
        activeSorters.length === 1 ? activeSorters[0] : activeSorters,
        newFilters,
        {
          currentData: getOriginData(currentData),
          currentAllData: getOriginData(newProcessedData),
          action: 'filter',
        }
      );
  }

  /** ----------- Filters End ----------- */

  const hasFixedColumnLeft = !!flattenColumns.find((c) => c.fixed === 'left');
  const hasFixedColumnRight = !!flattenColumns.find((c) => c.fixed === 'right');
  const hasFixedColumn = hasFixedColumnLeft || hasFixedColumnRight;

  function getProcessedData(currentSorter: SorterInfo, activeSorters: SorterInfo[], filters) {
    let _data = (clonedData || []).slice();

    Object.keys(filters).forEach((field) => {
      if (filters[field] && filters[field].length) {
        const column = getColumnByUniqueKey(field) as ColumnProps<T>;
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

    const getSortData = (d) => {
      return d
        .slice()
        .sort(compareFn(activeSorters))
        .map((item) => {
          if (isArray(item[childrenColumnName])) {
            return {
              ...item,
              [childrenColumnName]: getSortData(item[childrenColumnName]),
            };
          }
          return item;
        });
    };

    if (
      (currentSorter.direction && typeof currentSorter.sorterFn === 'function') ||
      activeSorters.length
    ) {
      return getSortData(_data);
    }

    return _data;
  }

  // 获得经过 sorter 和 filters 筛选之后的 data
  const processedData = getProcessedData(currentSorter, activeSorters, innerFilters);

  function getPaginationProps(_processedData = processedData) {
    const pageSize = mergePagination.pageSize || innerPageSize || 10;
    const paginationSize = size === 'middle' ? 'default' : size;
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

    if (isObject(mergePagination)) {
      paginationProps = {
        ...paginationProps,
        ...mergePagination,
      };
    }
    paginationProps.onChange = onPaginationChange;
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

  const summaryNode = summary?.(getOriginData(processedData));

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
  }, [hasFixedColumnLeft, hasFixedColumnRight, scroll?.x, scroll?.y, flattenColumns.length, data]);

  useUpdate(() => {
    const { total, pageSize } = getPaginationProps(data);
    const maxPageNum = Math.ceil(total / pageSize);
    if (maxPageNum < currentPage) {
      setCurrentPage(1);
    }
  }, [data?.length]);

  useUpdate(() => {
    setFixedColumnClassNames();
  }, [data, hasFixedColumnLeft, hasFixedColumnRight]);

  useImperativeHandle(ref, () => ({
    getRootDomElement,
    scrollIntoView: (dataIndex) => {
      if (refVirtualList.current) {
        refVirtualList.current.scrollTo({ key: dataIndex });
      }
    },
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
      const tableViewWidth = ele.getBoundingClientRect().width;
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
        const scrollLeft = rtl ? -tbody.scrollLeft : tbody.scrollLeft;
        const alignLeft = scrollLeft === 0;
        // const alignRight = tbody.scrollLeft + tbody.clientWidth >= tbody.scrollWidth;
        const alignRight =
          scrollLeft + 1 >=
          tbody.children[0].getBoundingClientRect().width - tbody.getBoundingClientRect().width;
        if (alignLeft && alignRight) {
          setFixedColumnsClassList(table.classList, `${prefixCls}-scroll-position-both`);
        } else if (alignLeft) {
          setFixedColumnsClassList(
            table.classList,
            `${prefixCls}-scroll-position-${rtl ? 'right' : 'left'}`
          );
        } else if (alignRight) {
          setFixedColumnsClassList(
            table.classList,
            `${prefixCls}-scroll-position-${rtl ? 'left' : 'right'}`
          );
        } else {
          setFixedColumnsClassList(table.classList, `${prefixCls}-scroll-position-middle`);
        }
      } else {
        table && resetTableClassName(table.classList);
      }
    }, 100),
    [refTable.current, refTableBody.current, fixedHeader]
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
    indeterminateKeys,
    onCheckAll,
    onCheck,
    onCheckRadio,
    setSelectedRowKeys,
    allSelectedRowKeys,
    flattenData,
  } = useRowSelection<T>(props, pageData, clonedData, getRowKey);

  // flattenColumns 在构造时优先使用了 column.key 作为主键，在查询时使用 getColumnByDataIndex 方法可能会导致bug。
  function getColumnByUniqueKey(key: string | number) {
    return flattenColumns.find((column, index) => {
      if (typeof column.key !== 'undefined') {
        if (typeof column.key === 'number' && typeof key === 'string') {
          return column.key.toString() === key;
        }
        return column.key === key;
      }
      // unnecessary
      if (typeof column.dataIndex !== 'undefined') {
        return column.dataIndex === key;
      }
      if (typeof key === 'number') {
        return index === key;
      }
      return false;
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
      onChange(
        newPaginationProps,
        activeSorters.length === 1 ? activeSorters[0] : activeSorters,
        innerFilters,
        {
          currentData: getOriginData(getPageData(processedData, newPaginationProps)),
          currentAllData: getOriginData(processedData),
          action: 'paginate',
        }
      );
    mergePagination.onChange && mergePagination.onChange(current, pageSize);
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
      const scrollWrapper = refTableBody.current;
      const scrollBarWidth = getScrollBarWidth(scrollWrapper);
      if (scrollBarWidth) {
        scrollbarChanged.current = true;
        if (wrapper) {
          wrapper.style.overflowY = 'scroll';
        }

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
      activeSorters={activeSorters}
      currentSorter={currentSorter}
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
          <ColGroup
            columns={flattenColumns}
            prefixCls={prefixCls}
            producer={false}
            columnWidths={maxContentWidth && scroll.y ? columnWidths : null}
          />
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
      indeterminateKeys={indeterminateKeys}
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
      activeSorters={activeSorters}
      currentSorter={currentSorter}
      stickyOffsets={stickyOffsets}
      stickyClassNames={stickyClassNames}
      getRowKey={getRowKey}
      saveVirtualListRef={(ref) => {
        if (virtualized) {
          refVirtualList.current = ref;
          refTableBody.current = ref?.dom;
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
    const producer =
      isObject(scroll) &&
      scroll.x === 'max-content' &&
      !!scroll.y &&
      isArray(data) &&
      data.length > 0;

    return (
      <ResizeObserver onResize={setScrollBarStyle}>
        {fixedHeader && !virtualized ? (
          <ComponentBodyWrapper
            ref={refTableBody}
            className={`${prefixCls}-body`}
            style={scrollStyleY}
          >
            <ComponentTable style={scrollStyleX}>
              <ColGroup
                columns={flattenColumns}
                prefixCls={prefixCls}
                producer={producer}
                onSetColumnWidths={setColumnWidths}
                expandedRowKeys={expandedRowKeys}
                data={data}
              />
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
      [`${prefixCls}-fixed-column`]: hasFixedColumn,
      [`${prefixCls}-virtualized`]: virtualized,
      [`${prefixCls}-rtl`]: rtl,
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

  const showPagination =
    pagination !== false && (processedData.length !== 0 || paginationProps.total > 0);

  return (
    <div ref={refTable} style={style} className={classNames} {...pickDataAttributes(props)}>
      <Spin element={loadingElement} {...loading}>
        {showPagination && isPaginationTop && paginationEle}
        {renderTable()}
        {showPagination && !isPaginationTop && paginationEle}
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

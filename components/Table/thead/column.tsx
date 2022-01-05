import React, { useState, useEffect, useContext, CSSProperties } from 'react';
import cs from '../../_util/classNames';
import { isArray, isObject, isString } from '../../_util/is';
import Trigger from '../../Trigger';
import Radio from '../../Radio/radio';
import Button from '../../Button';
import Tooltip from '../../Tooltip';
import IconCaretDown from '../../../icon/react-icon/IconCaretDown';
import IconCaretUp from '../../../icon/react-icon/IconCaretUp';
import IconFilter from '../../../icon/react-icon/IconFilter';
import Checkbox from '../../Checkbox';
import { ColumnComponentProps } from '../interface';
import { ConfigContext } from '../../ConfigProvider';
import useComponent from '../hooks/useComponent';
import useMergeValue from '../../_util/hooks/useMergeValue';
import { Locale } from '../../locale/interface';

function getTooltipContent(nextSorterDirection: 'ascend' | 'descend', locale: Locale) {
  if (nextSorterDirection === 'ascend') {
    return locale.Table.sortAscend;
  }
  if (nextSorterDirection === 'descend') {
    return locale.Table.sortDescend;
  }
  return locale.Table.cancelSort;
}

function Column<T>({
  onSort,
  onFilter,
  onHandleFilter,
  onHandleFilterReset,
  currentFilters = {},
  currentSorter,
  _key,
  dataIndex,
  title,
  sorter,
  sortDirections = ['ascend', 'descend'],
  filters = [],
  columnFixedStyle,
  className,
  cellStyle,
  headerCellStyle,
  rowSpan,
  colSpan,
  headerCellProps,
  prefixCls,
  align = 'left',
  components,
  filterIcon,
  filterDropdown,
  filterMultiple = true,
  ellipsis,
  filterDropdownProps,
  onFilterDropdownVisibleChange,
  column,
  showSorterTooltip,
  index,
}: ColumnComponentProps<T>) {
  const { locale } = useContext(ConfigContext);

  const innerDataIndex = dataIndex === undefined ? index : dataIndex;

  // stateCurrentFilter 标记了下拉框中选中的 filter 项目，在受控模式下它与 currentFilter 可以不同
  const [currentFilter, setCurrentFilter, stateCurrentFilter] = useMergeValue<string[]>([], {
    value: currentFilters[innerDataIndex] || [],
  });
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [isEnter, setEnter] = useState<boolean>(false);

  const enableSort = sorter && isArray(sortDirections) && sortDirections.length;

  const nextSortDirection = enableSort ? getNextSortDirection() : undefined;

  useEffect(() => {
    setCurrentFilter(currentFilters[innerDataIndex] || []);
  }, [currentFilters, innerDataIndex]);

  useEffect(() => {
    if (currentFilter && currentFilter !== stateCurrentFilter) {
      setCurrentFilter(currentFilter);
    }
  }, [filterVisible]);

  function getNextSortDirection() {
    const currentSortDirection = currentSorter && currentSorter.direction;
    if (!currentSortDirection || (currentSorter && currentSorter.field !== innerDataIndex)) {
      return sortDirections[0];
    }
    const sorterIndex = sortDirections.indexOf(currentSortDirection);
    if (sorterIndex < sortDirections.length) {
      return sortDirections[sorterIndex + 1];
    }
  }

  function handleFilter() {
    if (!currentFilter) return;
    onHandleFilter &&
      onHandleFilter({ onFilter, filters, dataIndex: innerDataIndex }, stateCurrentFilter);
    setFilterVisible(false);
  }

  function handleFilterReset() {
    onHandleFilterReset({ dataIndex: innerDataIndex });
    setFilterVisible(false);
  }

  function onVisibleChange(filterVisible: boolean) {
    setFilterVisible(filterVisible);
    onFilterDropdownVisibleChange && onFilterDropdownVisibleChange(filterVisible);
  }

  function onChangeFilterItem(filterValue: string, checked) {
    let filter = [...stateCurrentFilter];
    if (filterMultiple) {
      if (checked) {
        filter = filter.concat(filterValue);
      } else {
        filter.splice(
          filter.findIndex((value) => value === filterValue),
          1
        );
      }
    } else if (filter.length > 0) {
      if (filter[0] !== filterValue) {
        filter = [filterValue];
      } else {
        return;
      }
    } else {
      filter = [filterValue];
    }
    setCurrentFilter(filter);
  }

  // filterDropdown confirm
  function confirm(_filterKeys) {
    setCurrentFilter(_filterKeys || stateCurrentFilter);
    setFilterVisible(false);

    onHandleFilter &&
      onHandleFilter(
        { filters, onFilter, dataIndex: innerDataIndex },
        _filterKeys || stateCurrentFilter
      );
  }

  function renderFilters() {
    return typeof filterDropdown === 'function' ? (
      filterDropdown({
        filterKeys: stateCurrentFilter,
        setFilterKeys: (filterKeys: string[], callback?: Function) => {
          setCurrentFilter(filterKeys);
          callback && callback();
        },
        confirm,
      })
    ) : (
      <div className={`${prefixCls}-filters-popup`}>
        <div className={`${prefixCls}-filters-list`}>
          {filters.map((col) => {
            const checked = stateCurrentFilter.findIndex((value) => value === col.value) !== -1;
            return (
              <div className={`${prefixCls}-filters-item`} key={col.value}>
                {filterMultiple ? (
                  <Checkbox
                    checked={checked}
                    onChange={(checked) => onChangeFilterItem(col.value, checked)}
                  >
                    {col.text}
                  </Checkbox>
                ) : (
                  <Radio
                    checked={checked}
                    onChange={(checked) => onChangeFilterItem(col.value, checked)}
                  >
                    {col.text}
                  </Radio>
                )}
              </div>
            );
          })}
        </div>
        <div className={`${prefixCls}-filters-btn`}>
          <Button onClick={handleFilterReset} size="mini" style={{ marginRight: 8 }}>
            {locale.Table.resetText}
          </Button>
          <Button onClick={handleFilter} type="primary" size="mini">
            {locale.Table.okText}
          </Button>
        </div>
      </div>
    );
  }

  const classNameSorter = (direction) => {
    return cs(`${prefixCls}-sorter-icon`, {
      [`${prefixCls}-sorter-icon-active`]:
        currentSorter &&
        currentSorter.direction === direction &&
        currentSorter.field === innerDataIndex,
    });
  };
  const classNameFilter = cs(`${prefixCls}-filters`, {
    [`${prefixCls}-filters-open`]: filterVisible,
    [`${prefixCls}-filters-active`]: currentFilter && currentFilter.length,
  });
  let styleTh: CSSProperties = {
    ...columnFixedStyle,
  };
  if (isObject(cellStyle)) {
    styleTh = {
      ...styleTh,
      ...cellStyle,
    };
  }
  if (isObject(headerCellStyle)) {
    styleTh = {
      ...styleTh,
      ...headerCellStyle,
    };
  }
  if (align && align !== 'left') {
    styleTh.textAlign = align;
  }
  const thProps: Record<string, any> = {
    style: styleTh,
    key: _key || innerDataIndex,
  };
  if (colSpan && colSpan > 1) {
    thProps.colSpan = colSpan;
  }
  if (rowSpan && rowSpan > 1) {
    thProps.rowSpan = rowSpan;
  }

  const { ComponentTh, ComponentHeaderCell } = useComponent(components);

  const shouldRenderFilters =
    (isArray(filters) && filters.length > 0) || typeof filterDropdown === 'function';
  const titleProps = ellipsis && typeof title === 'string' ? { title } : {};

  const filterDropdownTriggerProps = filterDropdownProps && filterDropdownProps.triggerProps;

  const cellChildren = (
    <>
      {enableSort ? (
        <Tooltip
          content={getTooltipContent(nextSortDirection, locale)}
          disabled={!showSorterTooltip}
          {...(isObject(showSorterTooltip) ? showSorterTooltip : {})}
        >
          <div
            className={`${prefixCls}-cell-with-sorter`}
            onMouseEnter={() => {
              setEnter(true);
            }}
            onMouseLeave={() => {
              setEnter(false);
            }}
            onClick={() => onSort(nextSortDirection, innerDataIndex)}
          >
            <span className={`${prefixCls}-th-item-title`} {...titleProps}>
              {title}
            </span>
            {enableSort && (
              <div
                className={cs(`${prefixCls}-sorter`, {
                  [`${prefixCls}-sorter-direction-one`]: sortDirections.length === 1,
                })}
              >
                {sortDirections.indexOf('ascend') !== -1 && (
                  <div className={classNameSorter('ascend')}>
                    <IconCaretUp />
                  </div>
                )}
                {sortDirections.indexOf('descend') !== -1 && (
                  <div className={classNameSorter('descend')}>
                    <IconCaretDown />
                  </div>
                )}
              </div>
            )}
          </div>
        </Tooltip>
      ) : (
        <span className={`${prefixCls}-th-item-title`} {...titleProps}>
          {title}
        </span>
      )}
      {shouldRenderFilters && (
        <Trigger
          popup={renderFilters}
          trigger="click"
          classNames="slideDynamicOrigin"
          position="br"
          popupAlign={{ bottom: 0 }}
          popupVisible={filterVisible}
          onVisibleChange={onVisibleChange}
          {...filterDropdownTriggerProps}
        >
          <div className={classNameFilter}>{filterIcon || <IconFilter />}</div>
        </Trigger>
      )}
    </>
  );

  const cellChildrenClassName = cs(`${prefixCls}-th-item`, {
    [`${prefixCls}-cell-text-ellipsis`]: ellipsis,
    [`${prefixCls}-cell-mouseenter`]: isEnter,
    [`${prefixCls}-cell-next-${nextSortDirection}`]: isEnter && nextSortDirection,
    [`${prefixCls}-col-has-sorter`]: enableSort,
    [`${prefixCls}-col-has-filter`]: shouldRenderFilters,
  });

  return (
    colSpan !== 0 && (
      <ComponentTh
        className={cs(
          `${prefixCls}-th`,
          {
            [`${prefixCls}-col-sorted`]:
              currentSorter && currentSorter.direction && currentSorter.field === innerDataIndex,
          },
          className
        )}
        {...thProps}
        {...headerCellProps}
      >
        {(isString(ComponentHeaderCell) as JSX.IntrinsicAttributes) ? (
          <ComponentHeaderCell className={cellChildrenClassName}>
            {cellChildren}
          </ComponentHeaderCell>
        ) : (
          <ComponentHeaderCell className={cellChildrenClassName} column={column}>
            {cellChildren}
          </ComponentHeaderCell>
        )}
      </ComponentTh>
    )
  );
}

export default Column;

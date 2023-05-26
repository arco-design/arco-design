import React, { ReactNode, ReactElement, useEffect, useContext, forwardRef } from 'react';
import PageItem, { StepType, JumpPager, StepPager } from './page-item';
import useMergeValue from '../_util/hooks/useMergeValue';
import PageOption from './page-options';
import PageJumper from './page-jumper';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { PaginationProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';

export interface PaginationState {
  current: number;
  pageSize: number;
  total?: number;
  showMore?: boolean;
}

const _defaultCurrent = 1;
const _defaultPageSize = 10;

function getAllPages(pageSize = _defaultPageSize, total) {
  return Math.ceil(total / pageSize);
}

function getBufferSize(bufferSize, allPages) {
  const min = 0;
  const max = Math.floor(allPages / 2) - 1;
  const newBufferSize = Math.max(bufferSize, min);
  return Math.min(newBufferSize, max);
}

function getAdjustPageSize(sizeOptions?: number[]) {
  if (sizeOptions && sizeOptions.length) {
    return sizeOptions[0];
  }
  return _defaultPageSize;
}

const defaultProps: PaginationProps = {
  total: 0,
  pageSizeChangeResetCurrent: true,
  bufferSize: 2,
};

function Pagination(baseProps: PaginationProps, ref) {
  const { getPrefixCls, size: ctxSize, locale, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PaginationProps>(
    baseProps,
    defaultProps,
    componentConfig?.Pagination
  );
  const {
    total: propTotal,
    pageSize: propPageSize,
    current: propCurrent,
    showMore: propShowMore,
    sizeOptions: propSizeOptions,
    pageSizeChangeResetCurrent,
    defaultCurrent,
    defaultPageSize,
  } = props;

  const [current, setCurrent] = useMergeValue(_defaultCurrent, {
    defaultValue: defaultCurrent,
    value: propCurrent,
  });

  const [pageSize, setPageSize] = useMergeValue(getAdjustPageSize(propSizeOptions), {
    defaultValue: defaultPageSize,
    value: propPageSize,
  });

  const total = propTotal;
  const showMore = !!propShowMore;

  if (propCurrent && !props.onChange) {
    console.warn(
      'Warning: you have provide current prop for pagination but without onChange handler ,' +
        ' this will cause no-change when you change page. '
    );
  }

  function getAdjustedCurrent(newPageSize, newTotal) {
    const newAllPages = getAllPages(newPageSize, newTotal);
    const newCurrent = current > newAllPages ? newAllPages : current;
    return newCurrent;
  }

  useEffect(() => {
    // adjust pageSize after sizeOption changes
    const needAdjust = propSizeOptions && !propSizeOptions.includes(pageSize);
    // trigged when currentPageSize not in the options;
    if (needAdjust) {
      const adjustPageSize = getAdjustPageSize(propSizeOptions);
      if (!('pageSize' in props)) {
        setPageSize(adjustPageSize);
      }
    }
  }, [propSizeOptions]);

  useEffect(() => {
    // adjust currentPage after total and pageSize changes
    const newCurrent = getAdjustedCurrent(pageSize, total);
    if (newCurrent !== current && !('current' in props)) {
      setCurrent(newCurrent);
    }
  }, [total, current, pageSize]);

  const onChange = (pageNumber = current, size = pageSize) => {
    const { onChange } = props;
    onChange && onChange(pageNumber, size);
  };

  const onPageSizeChange = (pageSize) => {
    const { onPageSizeChange } = props;
    const allPages = getAllPages(pageSize, total);
    const newState = {
      pageSize,
    } as PaginationState;
    if (pageSizeChangeResetCurrent) {
      newState.current = 1;
    } else {
      newState.current = current > allPages ? allPages : current;
    }
    if (!('pageSize' in props)) {
      setPageSize(newState.pageSize);
    }

    if (!('current' in props) && current !== newState.current) {
      setCurrent(newState.current);
    }

    onPageSizeChange && onPageSizeChange(pageSize, newState.current);
    onChange(pageSizeChangeResetCurrent ? 1 : newState.current, pageSize);
  };

  const onPageNumberChange = (pageNumber) => {
    if (!('current' in props)) {
      setCurrent(pageNumber);
    }
    onChange(pageNumber);
  };

  const {
    className,
    style,
    pageItemStyle,
    activePageItemStyle,
    showTotal,
    sizeCanChange,
    sizeOptions,
    simple,
    mini,
    showJumper,
    selectProps,
    icons,
    disabled,
    itemRender,
    hideOnSinglePage,
  } = props;

  const size = props.size || ctxSize;
  const prefixCls = getPrefixCls('pagination');
  // compatible 1.0
  const innerSize = mini ? 'mini' : size;
  const classNames = cs(
    prefixCls,
    `${prefixCls}-size-${innerSize}`,
    {
      [`${prefixCls}-simple`]: simple,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );

  let renderPager: ReactElement;
  const pageList: ReactElement[] = [];
  const allPages = getAllPages(pageSize, total);

  const bufferSize = getBufferSize(props.bufferSize, allPages);

  if (hideOnSinglePage && allPages <= 1) {
    return null;
  }

  const pagerProps = {
    onClick: onPageNumberChange,
    rootPrefixCls: prefixCls,
    simple,
    current,
    allPages,
    icons,
    disabled,
    pageItemStyle,
    activePageItemStyle,
    itemRender,
  };

  // simple mode, no pager list
  if (simple) {
    const prefix = `${prefixCls}-item-simple`;
    renderPager = (
      <ul className={`${prefixCls}-list`}>
        <StepPager key="previous" {...pagerProps} type={StepType.previous} />
        <li className={`${prefix}-pager`}>
          <PageJumper
            disabled={disabled}
            rootPrefixCls={prefixCls}
            totalPages={allPages}
            current={current}
            onPageChange={onPageNumberChange}
            simple={{ showJumper: typeof showJumper === 'boolean' ? showJumper : true }}
            size={innerSize}
          />
        </li>
        <StepPager key="next" {...pagerProps} type={StepType.next} />
      </ul>
    );
  } else {
    // fold = ... >= 2pages;
    const beginFoldPage = 1 + 2 + bufferSize;
    const endFoldPage = allPages - 2 - bufferSize;
    if (
      // beginPage(1 page) + bufferSize * 2 + endPage(1 page) + ...(2 pages)
      allPages <= 4 + bufferSize * 2 ||
      (current === beginFoldPage && current === endFoldPage)
    ) {
      for (let i = 1; i <= allPages; i++) {
        pageList.push(<PageItem {...pagerProps} key={i} pageNum={i} />);
      }
    } else {
      let left = 1;
      let right = allPages;
      let hasJumpPre = true;
      let hasJumpNext = true;

      // fold front and back
      if (current > beginFoldPage && current < endFoldPage) {
        right = current + bufferSize;
        left = current - bufferSize;
        // fold back
      } else if (current <= beginFoldPage) {
        hasJumpPre = false;
        left = 1;
        right = Math.max(beginFoldPage, bufferSize + current);
        // fold begin
      } else if (current >= endFoldPage) {
        hasJumpNext = false;
        right = allPages;
        left = Math.min(endFoldPage, current - bufferSize);
      }

      for (let i = left; i <= right; i++) {
        pageList.push(<PageItem key={i} pageNum={i} {...pagerProps} />);
      }
      const JumpPre = (
        <JumpPager
          {...pagerProps}
          key={left - 1}
          type={StepType.previous}
          jumpPage={-(bufferSize * 2 + 1)}
        />
      );
      const JumpNext = (
        <JumpPager
          {...pagerProps}
          key={right + 1}
          type={StepType.next}
          jumpPage={bufferSize * 2 + 1}
        />
      );
      const FirstPager = <PageItem key={1} pageNum={1} {...pagerProps} />;
      const LastPager = <PageItem {...pagerProps} key={allPages} pageNum={allPages} />;
      if (hasJumpPre) {
        pageList[0] = React.cloneElement(pageList[0], {
          className: `${prefixCls}-item-after-pre`,
        });
        // TODO:
        pageList.unshift(JumpPre);
        pageList.unshift(FirstPager);
      }

      if (hasJumpNext) {
        pageList[pageList.length - 1] = React.cloneElement(pageList[pageList.length - 1], {
          className: `${prefixCls}-item-before-next`,
        });
        pageList.push(JumpNext);
        pageList.push(LastPager);
      }
    }

    renderPager = (
      <ul className={`${prefixCls}-list`}>
        <StepPager {...pagerProps} key="previous" type={StepType.previous} />
        {pageList}
        {showMore && (
          <JumpPager
            {...pagerProps}
            key={allPages + 1}
            type={StepType.next}
            jumpPage={bufferSize * 2 + 1}
          />
        )}
        <StepPager key="next" {...pagerProps} type={StepType.next} />
      </ul>
    );
  }

  let totalElement: ReactNode = null;
  if (typeof showTotal === 'boolean' && showTotal) {
    totalElement = (
      <div className={`${prefixCls}-total-text`}>
        {locale.Pagination.total?.replace('{0}', total)}
      </div>
    );
  }
  if (typeof showTotal === 'function') {
    totalElement = (
      <div className={`${prefixCls}-total-text`}>
        {showTotal(total, [(current - 1) * pageSize + 1, current * pageSize])}
      </div>
    );
  }

  return (
    <div {...pickDataAttributes(props)} className={classNames} style={style} ref={ref}>
      {totalElement}
      {renderPager}
      <PageOption
        disabled={disabled}
        rootPrefixCls={prefixCls}
        sizeCanChange={sizeCanChange}
        sizeOptions={sizeOptions}
        onPageSizeChange={onPageSizeChange}
        pageSize={pageSize}
        size={innerSize}
        selectProps={selectProps}
      />
      {!simple && showJumper && (
        <PageJumper
          disabled={disabled}
          rootPrefixCls={prefixCls}
          totalPages={allPages}
          current={current}
          onPageChange={onPageNumberChange}
          size={innerSize}
        />
      )}
    </div>
  );
}

const PaginationComponent = forwardRef<unknown, PaginationProps>(Pagination);

PaginationComponent.displayName = 'Pagination';

export default PaginationComponent;

export { PaginationProps };

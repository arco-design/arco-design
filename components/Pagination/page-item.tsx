import React, { useContext, ReactNode, CSSProperties } from 'react';
import cs from '../_util/classNames';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import IconMore from '../../icon/react-icon/IconMore';
import { ConfigContext } from '../ConfigProvider';

type itemRenderType = (
  page: number,
  type: 'page' | 'more' | 'prev' | 'next',
  originElement: ReactNode
) => ReactNode;

export interface PagerProps {
  pageItemStyle?: CSSProperties;
  activePageItemStyle?: CSSProperties;
  disabled?: boolean;
  rootPrefixCls: string;
  pageNum: number;
  current: number;
  onClick: (value: number) => void;
  itemRender?: itemRenderType;
}

export interface JumpPagerProps {
  pageItemStyle?: CSSProperties;
  disabled?: boolean;
  rootPrefixCls: string;
  type: StepType;
  current: number;
  allPages: number;
  jumpPage: number;
  onClick: (value: number) => void;
  icons?: {
    prev?: ReactNode;
    next?: ReactNode;
    more?: ReactNode;
  };
  itemRender?: itemRenderType;
}

export enum StepType {
  previous,
  next,
}
export interface StepPagerProps {
  pageItemStyle?: CSSProperties;
  disabled?: boolean;
  rootPrefixCls: string;
  type: StepType;
  current: number;
  allPages: number;
  onClick: (value: number) => void;
  icons?: {
    prev?: ReactNode;
    next?: ReactNode;
    more?: ReactNode;
  };
  itemRender?: itemRenderType;
}

/**
 * default pager item
 */

function Pager(props: PagerProps) {
  const { locale } = useContext(ConfigContext);

  const onClick = (e) => {
    const { pageNum, onClick, disabled } = props;
    if (e.currentTarget.dataset.active === 'true') {
      return;
    }

    e.stopPropagation();

    if (!disabled) {
      onClick && onClick(pageNum);
    }
  };

  const { pageNum, current, rootPrefixCls, pageItemStyle, activePageItemStyle, itemRender } = props;

  const prefixCls = `${rootPrefixCls}-item`;
  const isActive = current === pageNum;
  const classnames = cs(prefixCls, isActive ? `${prefixCls}-active` : '');

  let style = pageItemStyle;
  if (isActive) {
    style = { ...style, ...activePageItemStyle };
  }

  const ariaCurrentProps = isActive ? { 'aria-current': true } : {};

  return (
    <li
      style={style}
      className={classnames}
      onClick={onClick}
      aria-label={locale.Pagination.currentPage.replace('{0}', pageNum)}
      {...ariaCurrentProps}
    >
      {itemRender ? itemRender(pageNum, 'page', pageNum) : pageNum}
    </li>
  );
}

function getIcon(name: string, icons) {
  switch (name) {
    case 'prev':
      return icons && icons.prev ? icons.prev : <IconLeft />;
    case 'next':
      return icons && icons.next ? icons.next : <IconRight />;
    case 'more':
      return icons && icons.more ? icons.more : <IconMore />;
    default:
      return null;
  }
}

/**
 * preJump or nextJump button
 * @param props
 */
export const JumpPager = (props: JumpPagerProps) => {
  const { locale } = useContext(ConfigContext);

  const { rootPrefixCls, current, allPages, jumpPage, icons, disabled, pageItemStyle, itemRender } =
    props;

  const minCurrent = allPages > 0 ? 1 : 0;
  const nextPage = Math.min(allPages, Math.max(minCurrent, current + jumpPage));
  const prefix = `${rootPrefixCls}-item ${rootPrefixCls}-item-jumper`;

  const cls = cs(prefix);
  const onClick = () => {
    !disabled && props.onClick && props.onClick(nextPage);
  };

  const originElement = getIcon('more', icons);

  const ariaLabel =
    jumpPage > 0
      ? locale.Pagination.nextSomePages.replace('{0}', jumpPage)
      : locale.Pagination.prevSomePages.replace('{0}', -jumpPage);

  return (
    <li style={pageItemStyle} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {itemRender ? itemRender(undefined, 'more', originElement) : originElement}
    </li>
  );
};

/**
 * previous or next button
 * @param props
 */
export const StepPager = (props: StepPagerProps) => {
  const { locale } = useContext(ConfigContext);
  const { rootPrefixCls, current, allPages, type, icons, disabled, pageItemStyle, itemRender } =
    props;
  const prefixCls = `${rootPrefixCls}-item`;
  const StepIcon = type === StepType.previous ? getIcon('prev', icons) : getIcon('next', icons);
  let _disabled = false;
  if (allPages === 0) {
    // total为0
    _disabled = true;
  } else if (type === StepType.previous) {
    // 向前翻页
    _disabled = current <= 1; // current ===0 || current===1
  } else {
    // 向后翻页
    _disabled = current === allPages;
  }
  const innerDisabled = disabled || _disabled;

  let nextPage = current + (type === StepType.previous ? -1 : 1);
  nextPage = Math.max(0, Math.min(allPages, nextPage));

  const pageType = StepType.previous === type ? 'prev' : 'next';

  const cls = cs(prefixCls, `${prefixCls}-${pageType}`, {
    [`${prefixCls}-disabled`]: innerDisabled,
  });
  const onClick = () => {
    if (innerDisabled) {
      return;
    }
    props.onClick && props.onClick(nextPage);
  };

  return (
    <li
      style={pageItemStyle}
      className={cls}
      onClick={onClick}
      aria-label={locale.Pagination[pageType]}
    >
      {itemRender ? itemRender(undefined, pageType, StepIcon) : StepIcon}
    </li>
  );
};

export default Pager;

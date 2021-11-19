import React, { useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { isObject } from 'lodash';
import ResizeObserver from '../../_util/resizeObserver';
import DropdownIcon from './dropdown-icon';
import TabNavIcon from './tab-nav-icon';
import TabHeaderTitle from './tab-title';
import IconPlus from '../../../icon/react-icon/IconPlus';
import cs from '../../_util/classNames';
import { setTransformStyle } from '../../_util/style';
import { getRectDiff } from '../utils';
import { TabsContext } from '../tabs';
import { TabsProps } from '..';
import TabInk from './tab-ink';
import IconHover from '../../_class/icon-hover';
import useDomSize from '../hook/useDomSize';
import throttleByRaf from '../../_util/throttleByRaf';
import useHeaderScroll from '../hook/useHeaderScroll';

const DIRECTION_VERTICAL = 'vertical';
const ALIGN_RIGHT = 'right';
const ALIGN_LEFT = 'left';

const SCROLL_MAP = {
  delete: true,
  add: true,
};

const getHeaderStyle = ({
  direction,
  align = ALIGN_LEFT,
  headerOffset,
}: {
  direction: string;
  align: string;
  headerOffset: number;
}) => {
  let value = `translateX(${-headerOffset}px)`;
  if (align === ALIGN_RIGHT) {
    value = `translateX(${headerOffset}px)`;
  }
  if (direction === DIRECTION_VERTICAL) {
    value = `translateY(${-headerOffset}px)`;
  }

  return setTransformStyle(value);
};

const getCurrentHeaderOffset = ({
  direction,
  align = ALIGN_LEFT,
  headerDom,
  headerWrapperDom,
}: {
  direction: string;
  align: string;
  headerDom: HTMLElement;
  headerWrapperDom: HTMLElement;
}) => {
  const diffStyle = getRectDiff(headerDom, headerWrapperDom);
  if (direction === DIRECTION_VERTICAL) return -diffStyle.top;
  if (align === ALIGN_RIGHT) return diffStyle.right;
  return -diffStyle.left;
};

const TabHeader = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const ctxProps = useContext(TabsContext);
  const mergeProps = { ...props, ...ctxProps };

  const [headerWrapperRef, headerWrapperSize, setHeaderWrapperSize] = useDomSize<HTMLDivElement>();
  const [headerRef, headerSize, setHeaderSize] = useDomSize<HTMLDivElement>();

  const titleRef = useRef({});
  const [headerOffset, setHeaderOffset] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(true);

  const {
    paneChildren,
    editable,
    prefixCls,
    onAddTab,
    direction,
    type = 'line',
    overflow = 'scroll',
    activeTab,
    showAddButton,
    size = 'default',
    style,
    tabPosition,
    className,
    extra,
    animation,
    icons,
    deleteButton,
    addButton,
    renderTabTitle,
    scrollAfterEdit,
  } = mergeProps;

  const scrollConfig = isObject(scrollAfterEdit)
    ? { ...SCROLL_MAP, ...scrollAfterEdit }
    : SCROLL_MAP;

  const align = type === 'capsule' ? ALIGN_RIGHT : ALIGN_LEFT;

  const isScrollable = useMemo<boolean>(() => {
    const res =
      mergeProps.direction === 'vertical'
        ? headerWrapperSize.height < headerSize.height
        : headerWrapperSize.width < headerSize.width;

    return res;
  }, [mergeProps.direction, headerWrapperSize, headerSize]);

  const onWrapperResize = throttleByRaf((entry) => {
    const dom = entry[0] && entry[0].target;
    if (dom) {
      setHeaderWrapperSize({
        height: (dom as HTMLElement).offsetHeight,
        width: (dom as HTMLElement).offsetWidth,
        domRect: dom.getBoundingClientRect(),
      });
    }
  });
  const onHeaderResize = throttleByRaf((entry) => {
    const dom = entry[0] && entry[0].target;
    if (dom) {
      setHeaderSize({
        height: (dom as HTMLElement).offsetHeight,
        width: (dom as HTMLElement).offsetWidth,
        domRect: dom.getBoundingClientRect(),
      });
    }
  });

  const getValidOffset = useCallback(
    (offset) => {
      const maxOffset =
        direction === DIRECTION_VERTICAL
          ? headerSize.height - headerWrapperSize.height
          : headerSize.width - headerWrapperSize.width;
      let validOffset = offset;
      validOffset = Math.min(maxOffset, validOffset);
      validOffset = Math.max(validOffset, 0);
      return validOffset;
    },
    [direction, headerSize, headerWrapperSize]
  );

  const updateHeaderOffset = (offset) => {
    const nextOffset = getValidOffset(offset);
    if (nextOffset !== headerOffset) {
      setHeaderOffset(nextOffset);
    }
  };

  useEffect(() => {
    return () => {
      onHeaderResize.cancel && onHeaderResize.cancel();
      onWrapperResize.cancel && onWrapperResize.cancel();
    };
  }, []);

  // 根据激活的 tab 更新 headerOffset，所以依赖里面不能加 headerOffset
  useEffect(() => {
    if (!shouldScroll) {
      setShouldScroll(true);
      return;
    }

    const getActiveTabOffset = () => {
      const currentTitleNode = titleRef.current[activeTab];

      if (!currentTitleNode || !isScrollable) {
        return 0;
      }

      const diffStyle = getRectDiff(currentTitleNode, headerWrapperRef.current);
      const currentOffset = getCurrentHeaderOffset({
        direction,
        align,
        headerDom: headerRef.current,
        headerWrapperDom: headerWrapperRef.current,
      });

      // 垂直方向的 offset 计算，不分type
      if (direction === 'vertical') {
        let nextOffset = currentOffset;
        if (diffStyle.top < 0) {
          // 不完全在可见区
          nextOffset = currentOffset + diffStyle.top;
        } else if (diffStyle.bottom > 0) {
          // 不完全在可见区
          nextOffset = currentOffset + diffStyle.bottom;
        }
        return nextOffset;
      }

      // 水平方向的 offset 计算，分为 capsule 和其他，因为 capsule 是右对齐
      if (align === 'right') {
        let nextOffset = currentOffset;
        if (diffStyle.left < 0) {
          // 不完全在可见区
          nextOffset = currentOffset - diffStyle.left;
        } else if (diffStyle.right > 0) {
          // 不完全在可见区
          nextOffset = currentOffset - diffStyle.right;
        }
        return nextOffset;
      }

      let nextOffset = currentOffset;
      if (diffStyle.left < 0) {
        // 不完全在可见区
        nextOffset = currentOffset + diffStyle.left;
      } else if (diffStyle.right > 0) {
        // 不完全在可见区
        nextOffset = currentOffset + diffStyle.right;
      }
      return nextOffset;
    };
    let offset = getActiveTabOffset();
    offset = getValidOffset(offset);
    setHeaderOffset(offset);
  }, [activeTab, direction, overflow, isScrollable, type, getValidOffset]);

  const headerStyle = getHeaderStyle({
    direction,
    align,
    headerOffset,
  });
  const isDropdown = isScrollable && overflow === 'dropdown' && direction !== 'vertical';
  const isScroll = isScrollable && !isDropdown;
  const isEditable = editable && (type === 'card' || type === 'card-gutter' || type === 'line');

  const handleDelete = (child) => {
    mergeProps.onDeleteTab && mergeProps.onDeleteTab(child.key as string);
    setShouldScroll(scrollConfig.delete);
  };

  const handleAdd = () => {
    onAddTab && onAddTab();
    setShouldScroll(scrollConfig.add);
  };

  const renderAddIcon = (isEditable) => {
    return (
      isEditable &&
      showAddButton && (
        <div className={`${prefixCls}-add-icon`} onClick={handleAdd}>
          {addButton || (
            <IconHover prefix={`${prefixCls}-add`}>
              <span className={`${prefixCls}-add`}>{icons?.add || <IconPlus />}</span>
            </IconHover>
          )}
        </div>
      )
    );
  };

  useHeaderScroll({
    headerWrapperRef,
    headerOffset,
    align,
    direction,
    isScrollable,
    onScroll(offset) {
      updateHeaderOffset(offset);
    },
  });

  return (
    <div
      className={cs(
        `${prefixCls}-header-nav`,
        `${prefixCls}-header-nav-${direction}`,
        `${prefixCls}-header-nav-${tabPosition}`,
        `${prefixCls}-header-size-${size}`,
        `${prefixCls}-header-nav-${type}`,
        className
      )}
      style={style}
      ref={ref}
    >
      <div
        className={cs(`${prefixCls}-header-scroll`, {
          [`${prefixCls}-header-overflow-scroll`]: isScroll,
          [`${prefixCls}-header-overflow-dropdown`]: isDropdown,
        })}
      >
        {isScroll && (
          <TabNavIcon
            iconPos="prev"
            prefixCls={prefixCls}
            currentOffset={headerOffset}
            headerSize={headerSize}
            headerWrapperSize={headerWrapperSize}
            // getRef={(name) => getCalcArguments()[name]}
            direction={direction}
            align={align}
            onChange={updateHeaderOffset}
          />
        )}

        <ResizeObserver onResize={onWrapperResize}>
          <div className={`${prefixCls}-header-wrapper`} ref={headerWrapperRef}>
            <ResizeObserver onResize={onHeaderResize}>
              <div
                className={cs(`${prefixCls}-header`, {
                  [`${prefixCls}-header-no-padding`]:
                    !props.headerPadding &&
                    direction === 'horizontal' &&
                    ['line', 'text'].indexOf(type) > -1,
                })}
                ref={headerRef}
                style={headerStyle}
              >
                {paneChildren.map((child, index) => (
                  <TabHeaderTitle
                    key={index}
                    ref={(node) => {
                      titleRef.current[child.key] = node;
                    }}
                    tabKey={child.key}
                    {...child.props}
                    prefixCls={prefixCls}
                    onDeleteTab={() => handleDelete(child)}
                    renderTitle={props.children || renderTabTitle}
                    onClickTab={() => {
                      mergeProps.onClickTab && mergeProps.onClickTab(child.key as string);
                    }}
                    isActive={activeTab === child.key}
                    editable={isEditable && child.props.closable !== false}
                    deleteIcon={icons?.delete}
                    deleteButton={deleteButton}
                  />
                ))}
                {type === 'line' && (
                  <TabInk
                    disabled={
                      !!paneChildren.find(
                        (child) =>
                          child && child.props && child.props.disabled && child.key === activeTab
                      )
                    }
                    prefixCls={prefixCls}
                    animation={animation}
                    direction={direction}
                    getTitleRef={(key) => titleRef.current[key]}
                    activeTab={activeTab}
                    getHeaderRef={() => headerRef}
                  />
                )}
              </div>
            </ResizeObserver>
            {!isScrollable && renderAddIcon(isEditable)}
          </div>
        </ResizeObserver>
        {isScroll && (
          <TabNavIcon
            prefixCls={prefixCls}
            currentOffset={headerOffset}
            headerSize={headerSize}
            headerWrapperSize={headerWrapperSize}
            direction={direction}
            align={align}
            onChange={updateHeaderOffset}
          />
        )}
        {isDropdown && (
          <DropdownIcon
            onClickTab={mergeProps.onClickTab}
            paneChildren={paneChildren}
            prefixCls={prefixCls}
            currentOffset={headerOffset}
            headerSize={headerSize}
            headerWrapperSize={headerWrapperSize}
            getTitleRef={(key) => titleRef.current[key]}
            direction={direction}
          />
        )}
        {((isEditable && isScrollable) || extra) && (
          <div className={`${prefixCls}-header-extra`}>
            {isScrollable && renderAddIcon(isEditable)}
            {extra}
          </div>
        )}
      </div>
    </div>
  );
});

TabHeader.displayName = 'TabHeader';

export default TabHeader;

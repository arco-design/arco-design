import React, { useMemo } from 'react';
import IconDown from '../../../icon/react-icon/IconDown';
import Dropdown from '../../Dropdown';
import Menu from '../../Menu';
import IconHover from '../../_class/icon-hover';

export default function DropdownIcon(props) {
  const {
    prefixCls,
    currentOffset,
    headerSize,
    headerWrapperSize,
    getTitleRef,
    paneChildren,
    direction,
  } = props;
  const paneKeys = paneChildren.map((child) => child.key);
  const size = direction === 'vertical' ? headerSize.height : headerSize.width;
  const wrapperSize = direction === 'vertical' ? headerWrapperSize.height : headerWrapperSize.width;

  const tabSizes = useMemo<{
    [key: string]: { left: number; right: number; top: number; bottom: number };
  }>(() => {
    const map = {};
    const wrapperRect = headerWrapperSize.domRect;
    paneKeys.map((key) => {
      const titleDom = getTitleRef(key);
      if (!titleDom) return;
      const rect = titleDom.getBoundingClientRect();
      map[key] = {
        left: rect.left - wrapperRect.left,
        right: rect.left - wrapperRect.left + rect.width,
        top: rect.top - wrapperRect.top,
        bottom: rect.top - wrapperRect.top + rect.height,
      };
    });
    return map;
  }, [paneKeys.join(','), size, wrapperSize]);

  const rangeIndex = useMemo(() => {
    let start = -1;
    let end = -1;

    for (const key in tabSizes) {
      const { left, right } = tabSizes[key];
      if (left >= currentOffset && right - currentOffset <= wrapperSize && start === -1) {
        start = paneKeys.indexOf(key);
        end = start;
      }
      if (left >= currentOffset && right - currentOffset > wrapperSize) {
        end = paneKeys.indexOf(key);
        break;
      }
    }

    return [start, end];
  }, [tabSizes, paneKeys.join(','), currentOffset]);

  return (
    <Dropdown
      trigger="click"
      droplist={
        <Menu onClickMenuItem={props.onClickTab}>
          {paneChildren.map((child, index) => {
            if (index < rangeIndex[0] || index >= rangeIndex[1]) {
              return (
                <Menu.Item key={child.key} disabled={child.disabled}>
                  {child.props.title}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      }
    >
      <IconHover
        role="button"
        aria-label="expand tabs"
        prefix={`${prefixCls}-dropdown`}
        className={`${prefixCls}-dropdown-icon`}
      >
        <IconDown />
      </IconHover>
    </Dropdown>
  );
}

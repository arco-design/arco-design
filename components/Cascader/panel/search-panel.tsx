import React, { useEffect, useState, CSSProperties, ReactNode, useRef } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import scrollIntoView from 'scroll-into-view-if-needed';
import cs from '../../_util/classNames';
import IconCheck from '../../../icon/react-icon/IconCheck';
import { OptionProps } from '../interface';
import Node from '../base/node';
import Checkbox from '../../Checkbox';
import Store from '../base/store';
import { ArrowDown, Esc, Enter, ArrowUp } from '../../_util/keycode';
import useUpdateEffect from '../../_util/hooks/useUpdate';
import useIsFirstRender from '../../_util/hooks/useIsFirstRender';
import { isString } from '../../_util/is';
import { getMultipleCheckValue } from '../util';

export const getLegalIndex = (currentIndex, maxIndex) => {
  if (currentIndex < 0) {
    return maxIndex;
  }
  if (currentIndex > maxIndex) {
    return 0;
  }
  return currentIndex;
};

export type SearchPanelProps<T> = {
  store?: Store<T>;
  style?: CSSProperties;
  prefixCls?: string;
  multiple?: boolean;
  value: string[][];
  inputValue?: string;
  onEsc?: () => void;
  onChange?: (value: string[][]) => void;
  renderEmpty?: () => ReactNode;
};

const formatLabel = (inputValue, label, prefixCls): ReactNode => {
  let dom = label;
  if (isString(label)) {
    const index = label.toUpperCase().indexOf(inputValue.toUpperCase());
    if (index > -1) {
      const prefix = label.substr(0, index);
      const suffix = label.substr(index + inputValue.length);
      dom = (
        <>
          {prefix}
          <span className={`${prefixCls}-highlight`}>{label.substr(index, inputValue.length)}</span>
          {suffix}
        </>
      );
    }
  }
  return dom;
};

const SearchPanel = <T extends OptionProps>(props: SearchPanelProps<T>) => {
  const { store, prefixCls, multiple, onChange, inputValue, renderEmpty, style } = props;
  const value = props.value || [];

  const [options, setOptions] = useState<Node<T>[]>(store.searchNodeByLabel(inputValue) || []);
  const refActiveItem = useRef<HTMLLIElement>();
  // 用来标示是否需要scrollIntoView。如果是鼠标hover，不需要滚动。
  const isKeyboardHover = useRef<boolean>();
  const isFirstRender = useIsFirstRender();
  // 保存键盘操作的目标节点
  const [currentHoverIndex, setCurrentHoverIndex] = useState<number>(-1);

  const handleSearchOptionClick = (option: Node<T>, checked: boolean, e) => {
    e.stopPropagation();
    if (option.disabled) {
      return;
    }
    if (multiple) {
      const checkedValues = getMultipleCheckValue(props.value, store, option, checked);
      onChange && onChange(checkedValues);
    } else {
      onChange && onChange([option.pathValue]);
    }
  };

  useUpdateEffect(() => {
    setOptions(store.searchNodeByLabel(inputValue));
  }, [inputValue]);

  useUpdateEffect(() => {
    setCurrentHoverIndex((currentIndex) => {
      if (currentIndex > options.length - 1) {
        return -1;
      }
      return currentIndex;
    });
  }, [options]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();
      // 使用keycode，避免中文输入法输入时，触发enter,space等事件。
      // p.s 中文输入时，keycode 都是229
      const keyCode = e.keyCode || e.which;

      switch (keyCode) {
        case Esc.code: {
          props.onEsc();
          return false;
        }
        case ArrowDown.code:
        case ArrowUp.code: {
          isKeyboardHover.current = true;

          const diff = ArrowDown.code === keyCode ? 1 : -1;

          let nextIndex = getLegalIndex(currentHoverIndex + diff, options.length - 1);

          while (nextIndex !== currentHoverIndex) {
            const item = options[nextIndex];
            if (item.disabled) {
              nextIndex = getLegalIndex(nextIndex + diff, options.length - 1);
            } else {
              break;
            }
          }

          setCurrentHoverIndex(nextIndex);
          return false;
        }
        case Enter.code:
          const item = options[currentHoverIndex];
          if (item) {
            const isChecked = value.some((x) => {
              return isEqualWith(x, item.pathValue);
            });
            handleSearchOptionClick(item, !isChecked, e);
          }
          return false;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [options, currentHoverIndex, value]);

  useEffect(() => {
    const target = refActiveItem.current;
    if (target && (isKeyboardHover.current || isFirstRender)) {
      scrollIntoView(target, {
        behavior: 'instant',
        block: 'nearest',
        scrollMode: 'if-needed',
        boundary: target.parentNode?.parentNode as Element,
      });
    }
  }, [currentHoverIndex, options]);

  refActiveItem.current = null;

  return options.length ? (
    <div className={`${prefixCls}-list-wrapper`}>
      <ul
        role="menu"
        onMouseMove={() => {
          isKeyboardHover.current = false;
        }}
        className={cs(`${prefixCls}-list`, `${prefixCls}-list-search`, {
          [`${prefixCls}-list-multiple`]: multiple,
        })}
        style={style}
      >
        {options.map((item, i) => {
          const pathNodes = item.getPathNodes();
          const label = formatLabel(
            inputValue,
            pathNodes.map((x) => x.label).join(' / '),
            prefixCls
          );

          const isChecked = item._checked;

          return (
            <li
              role="menuitem"
              aria-disabled={item.disabled}
              ref={(node) => {
                if (i === currentHoverIndex) {
                  refActiveItem.current = node;
                }
                if (isChecked && !refActiveItem.current) {
                  refActiveItem.current = node;
                }
              }}
              className={cs(`${prefixCls}-list-search-item`, {
                [`${prefixCls}-list-search-item-active`]: isChecked,
                [`${prefixCls}-list-search-item-hover`]: i === currentHoverIndex,
                [`${prefixCls}-list-search-item-disabled`]: item.disabled,
              })}
              onClick={(e) => {
                handleSearchOptionClick(item, !isChecked, e);
              }}
              key={i}
              onMouseEnter={() => {
                if (!isKeyboardHover.current && !item.disabled) {
                  setCurrentHoverIndex(i);
                }
              }}
              onMouseLeave={() => {
                if (!isKeyboardHover.current && !item.disabled) {
                  setCurrentHoverIndex(-1);
                }
              }}
            >
              <div className={`${prefixCls}-list-item-label`}>
                {multiple ? (
                  <Checkbox checked={isChecked} disabled={item.disabled}>
                    {label}
                  </Checkbox>
                ) : (
                  <>
                    {label}
                    {isChecked && (
                      <span className={`${prefixCls}-check-icon`}>
                        <IconCheck />
                      </span>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <>{renderEmpty && renderEmpty()}</>
  );
};

export default SearchPanel;

import React, { useState, useEffect, useCallback } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cs from '../../_util/classNames';
import Option from './option';
import { isFunction, isObject, isString } from '../../_util/is';
import { CascaderPanelProps, OptionProps } from '../interface';
import useRefs from '../../_util/hooks/useRefs';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import { ArrowDown, Esc, Enter, ArrowUp, ArrowRight, ArrowLeft } from '../../_util/keycode';
import useUpdate from '../../_util/hooks/useUpdate';
import Node from '../base/node';
import { getMultipleCheckValue } from '../util';
import VirtualList, { VirtualListHandle } from '../../_class/VirtualList';
import { on, off } from '../../_util/dom';

const getLegalActiveNode = (options) => {
  for (let index = 0; index < options.length; index++) {
    if (!options[index].disabled) {
      return options[index];
    }
  }
};

const getBaseActiveNode = (currentNode) => {
  if (currentNode && currentNode.disabled) {
    let node = currentNode;
    while (node.parent) {
      if (node.parent.disabled) {
        node = node.parent;
      } else {
        break;
      }
    }
    return node;
  }
  return currentNode;
};

export const getLegalIndex = (currentIndex, maxIndex) => {
  if (currentIndex < 0) {
    return maxIndex;
  }
  if (currentIndex > maxIndex) {
    return 0;
  }
  return currentIndex;
};

const ListPanel = <T extends OptionProps>(props: CascaderPanelProps<T>) => {
  const [refWrapper, setRefWrapper] = useRefs<VirtualListHandle>();
  const forceUpdate = useForceUpdate();
  const {
    store,
    prefixCls,
    value,
    multiple,
    renderFooter,
    renderOption,
    showEmptyChildren,
    loadMore,
    renderEmpty,
    rtl,
  } = props;

  const [activeNode, setActiveNode] = useState(
    store.findNodeByValue(value && value[value.length - 1]) || null
  );

  const options = store.getOptions();
  const triggerChange = (newValue: string[][]) => {
    props.onChange && props.onChange(newValue);
  };
  const loadData = async (option) => {
    if (!option.isLeaf && isFunction(loadMore) && !option.children) {
      option.setLoading(true);
      forceUpdate();
      try {
        const options = await loadMore(option.pathValue, option.pathValue.length);
        store.appendOptionChildren(option, options);
        store.setNodeCheckedByValue(props.value);
      } catch (e) {
        console.error(e);
      }
      option.setLoading(false);
      forceUpdate();
    }
  };

  const onClickOption = async (option, isEnterClick = true) => {
    if (!option || option.disabled) {
      return;
    }
    setActiveNode(option);
    loadData(option);
    // 在键盘上下左右键操作时,isEnterClick 是false，不触发triggerChange
    if (!multiple && isEnterClick) {
      if (props.changeOnSelect || option.isLeaf) {
        triggerChange([option.pathValue]);
      }
    }
  };

  const onMultipleChecked = (option, checked: boolean) => {
    const newValue = getMultipleCheckValue(props.value, store, option, checked);

    if (option === activeNode) {
      // setActiveNode 不会执行rerender，需要forceupdate
      forceUpdate();
    }

    setActiveNode(option);
    if (!props.changeOnSelect) {
      // 父子节点关联，选中复选框时执行loadMore，否则直接选中父节点
      loadData(option);
    }
    triggerChange(newValue);
  };

  const scrollToActiveNode = useCallback(
    (targetNode = activeNode) => {
      let current = targetNode;
      while (current) {
        refWrapper[current._level]?.scrollTo({
          index: current._index,
          options: { block: 'nearest' },
        });
        current = current._level < 1 ? null : current.parent;
      }
    },
    [activeNode]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // e.stopPropagation();
      // 使用keycode，避免中文输入法输入时，触发enter,space等事件。
      // p.s 中文输入时，keycode 都是229
      const keyCode = e.keyCode || e.which;

      let nextActiveNode;
      switch (keyCode) {
        case Esc.code: {
          e.preventDefault();
          props.onEsc();
          break;
        }
        case ArrowDown.code:
        case ArrowUp.code: {
          if (!activeNode) {
            nextActiveNode = getLegalActiveNode(options);
          } else {
            const baseActiveNode = getBaseActiveNode(activeNode);
            const list = (baseActiveNode.parent && baseActiveNode.parent.children) || options;
            const diff = keyCode === ArrowDown.code ? 1 : -1;
            let nextIndex = getLegalIndex(baseActiveNode._index + diff, list.length - 1);
            while (nextIndex !== baseActiveNode._index) {
              nextActiveNode = list[nextIndex];
              if (nextActiveNode.disabled) {
                nextIndex = getLegalIndex(nextIndex + diff, list.length - 1);
              } else {
                break;
              }
            }
          }
          scrollToActiveNode(nextActiveNode);
          onClickOption(nextActiveNode, false);
          e.preventDefault();
          return false;
        }
        case ArrowRight.code: {
          if (activeNode && !activeNode.disabled) {
            const list = activeNode.children || [];
            nextActiveNode = list[0] || activeNode;
            onClickOption(nextActiveNode, false);
          }
          e.preventDefault();
          return false;
        }
        case ArrowLeft.code: {
          if (activeNode) {
            const baseActiveNode = getBaseActiveNode(activeNode);

            nextActiveNode = baseActiveNode.parent || baseActiveNode;
          }
          onClickOption(nextActiveNode, false);
          e.preventDefault();
          return false;
        }
        case Enter.code:
          if (activeNode) {
            if (multiple) {
              onMultipleChecked(activeNode, !activeNode._checked);
            } else {
              onClickOption(activeNode);
            }
          }
          e.preventDefault();
          return false;
        default:
          break;
      }
    },
    [activeNode]
  );

  useUpdate(() => {
    setActiveNode((activeNode) => {
      // store 改变时候，更新下activeNode.如果当前activeNode不存在于store里了，就设置为null
      let newActiveNode;

      if (activeNode && activeNode.pathValue && activeNode.pathValue.length) {
        const values = activeNode.pathValue;
        let parent = { children: options } as Node<T>;
        values.map((value) => {
          const list = parent.children || [];
          const item = list.find((x) => x.value === value);
          if (item) {
            parent = item;
            newActiveNode = item;
          }
        });
      }
      return newActiveNode;
    });
  }, [store]);

  useEffect(() => {
    if (props.popupVisible && options.length) {
      setTimeout(scrollToActiveNode);
    }
  }, [props.popupVisible]);

  useEffect(() => {
    const target = props.getTriggerElement();
    if (!target) {
      return;
    }

    if (props.popupVisible) {
      on(target, 'keydown', handleKeyDown);
    } else {
      off(target, 'keydown', handleKeyDown);
    }
    return () => {
      off(target, 'keydown', handleKeyDown);
    };
  }, [props.popupVisible, handleKeyDown]);

  const menus = (() => {
    const list = [options];
    const pathNodes = activeNode ? activeNode.getPathNodes() : [];
    pathNodes.forEach((option) => {
      option && option.children && list.push(option.children);
    });
    return list;
  })();

  const dropdownColumnRender = isFunction(props.dropdownColumnRender)
    ? props.dropdownColumnRender
    : (menu) => menu;

  return !menus.length || !menus[0]?.length ? (
    <>{renderEmpty()}</>
  ) : (
    <TransitionGroup component={React.Fragment}>
      {menus.map((list, level) => {
        const footer = renderFooter ? renderFooter(level, activeNode || null) : null;

        return list.length === 0 && !showEmptyChildren ? null : (
          <CSSTransition
            key={level}
            timeout={{
              enter: 300,
              exit: 0,
            }}
            classNames="cascaderSlide"
            onEnter={(e: HTMLDivElement) => {
              e.style.marginLeft = `-${e.scrollWidth}px`;
            }}
            onEntering={(e: HTMLDivElement) => {
              e.style.marginLeft = `0px`;
            }}
            onEntered={(e) => {
              e.style.marginLeft = '';
            }}
          >
            <div
              className={cs(`${prefixCls}-list-column`, {
                [`${prefixCls}-list-column-virtual`]:
                  props.virtualListProps && props.virtualListProps.threshold !== null,
                [`${prefixCls}-list-column-rtl`]: rtl,
              })}
              style={{ zIndex: menus.length - level, ...props.dropdownMenuColumnStyle }}
            >
              {dropdownColumnRender(
                <div
                  className={cs(`${prefixCls}-list-wrapper`, {
                    [`${prefixCls}-list-wrapper-with-footer`]: footer !== null,
                  })}
                >
                  {list.length === 0 ? (
                    renderEmpty && renderEmpty(props.virtualListProps ? '100%' : 120)
                  ) : (
                    <VirtualList
                      needFiller={false}
                      threshold={props.virtualListProps ? 100 : null}
                      data={list}
                      isStaticItemHeight
                      itemKey="value"
                      {...(isObject(props.virtualListProps) ? props.virtualListProps : {})}
                      wrapper="ul"
                      role="menu"
                      ref={(node) => setRefWrapper(node, level)}
                      className={cs(`${prefixCls}-list`, `${prefixCls}-list-select`, {
                        [`${prefixCls}-list-multiple`]: multiple,
                        [`${prefixCls}-list-rtl`]: rtl,
                      })}
                    >
                      {(option) => {
                        let isActive = false;
                        if (activeNode) {
                          isActive = activeNode.pathValue[level] === option.value;
                        }
                        return (
                          <li
                            tabIndex={0}
                            role="menuitem"
                            aria-haspopup={!option.isLeaf}
                            aria-expanded={isActive && !option.isLeaf}
                            aria-disabled={option.disabled}
                            key={option.value}
                            title={isString(option.label) ? option.label : undefined}
                            className={cs(`${prefixCls}-list-item`, {
                              [`${prefixCls}-list-item-active`]: isActive,
                              [`${prefixCls}-list-item-disabled`]: option.disabled,
                            })}
                          >
                            <Option
                              prefixCls={prefixCls}
                              rtl={rtl}
                              multiple={multiple}
                              option={option}
                              // 叶子节点被选中
                              selected={
                                !multiple &&
                                option.isLeaf &&
                                isEqualWith(props.value, option.pathValue)
                              }
                              onMouseEnter={() => {
                                if (option.disabled) {
                                  return;
                                }
                                if (props.expandTrigger === 'hover') {
                                  setActiveNode(option);
                                  !option.isLeaf && loadData(option);
                                }
                              }}
                              renderOption={
                                renderOption &&
                                (() => {
                                  return renderOption(option._data, level);
                                })
                              }
                              onClickOption={() => {
                                if (option.isLeaf && multiple && !option.disableCheckbox) {
                                  onMultipleChecked(option, !option._checked);
                                } else {
                                  onClickOption(option);
                                }
                              }}
                              onMultipleChecked={(checked: boolean) => {
                                onMultipleChecked(option, checked);
                              }}
                              onDoubleClickOption={props.onDoubleClickOption}
                            />
                          </li>
                        );
                      }}
                    </VirtualList>
                  )}
                  {footer && (
                    <div
                      className={`${prefixCls}-list-footer`}
                      onMouseDown={(e) => {
                        // 这里是为了阻止冒泡到面板节点的onMousedown事件。因为弹出层会阻止默认行为，避免选择框失去焦点
                        // 如果这里不阻止冒泡，footer里如果渲染了input标签，将无法被focus
                        e.stopPropagation();
                      }}
                    >
                      {footer}
                    </div>
                  )}
                </div>,
                level
              )}
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default ListPanel;

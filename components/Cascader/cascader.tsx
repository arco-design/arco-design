import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
  useContext,
  useCallback,
} from 'react';
import { isArray, isFunction, isString } from '../_util/is';
import Trigger from '../Trigger';
import CascaderPanel from './panel/list';
import SearchPanel from './panel/search-panel';
import { ConfigContext } from '../ConfigProvider';
import Store from './base/store';
import SelectView, { SelectViewHandle } from '../_class/select-view';
import { CascaderProps, OptionProps } from './interface';
import cs from '../_util/classNames';
import useMergeValue from '../_util/hooks/useMergeValue';
import useUpdate from '../_util/hooks/useUpdate';
import { Enter, Tab } from '../_util/keycode';
import useCurrentRef from './hook/useRefCurrent';
import useMergeProps from '../_util/hooks/useMergeProps';
import {
  valueInSet,
  transformValuesToSet,
  isEmptyValue,
  getConfig,
  getStore,
  formatValue,
} from './util';

export const DefaultFieldNames = {
  label: 'label',
  value: 'value',
  isLeaf: 'isLeaf',
  children: 'children',
  disabled: 'disabled',
};

const defaultProps: CascaderProps = {
  options: [],
  bordered: true,
  fieldNames: DefaultFieldNames,
  trigger: 'click',
  expandTrigger: 'click',
};

function Cascader<T extends OptionProps>(baseProps: CascaderProps<T>, ref) {
  const { getPrefixCls, renderEmpty, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<CascaderProps>(baseProps, defaultProps, componentConfig?.Cascader);
  const { disabled, renderFormat, getPopupContainer, children, triggerProps, expandTrigger } =
    props;

  const prefixCls = getPrefixCls('cascader');
  const isMultiple = props.mode === 'multiple';
  const timerRef = useRef(null);

  const [inputValue, setInputValue] = useState('');
  // 暂存被选中的值对应的节点。仅在onSearch的时候用到
  // 避免出现下拉列表改变，之前选中的option找不到对应的节点，展示上会出问题。
  const stashNodes = useRef<Store<T>['nodes']>([]);
  const [mergeValue, setValue, stateValue] = useMergeValue([], {
    value: 'value' in props ? formatValue(props.value, isMultiple) : undefined,
    defaultValue: 'defaultValue' in props ? formatValue(props.defaultValue, isMultiple) : undefined,
  });

  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    value: props.popupVisible,
    defaultValue: props.defaultPopupVisible,
  });
  const selectRef = useRef(null);
  const store = useCurrentRef<Store<T>>(
    () => getStore(props, mergeValue),
    [JSON.stringify(getConfig(props)), props.options]
  );

  useEffect(() => {
    const clearTimer = () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
    if (!popupVisible && inputValue) {
      if (timerRef.current) {
        clearTimer();
      }
      timerRef.current = setTimeout(() => {
        setInputValue('');
        timerRef.current = null;
      }, 200);
    }
    return () => {
      clearTimer();
    };
  }, [popupVisible]);

  useUpdate(() => {
    if ('value' in props) {
      const newValue = formatValue(props.value, isMultiple);
      store.setNodeCheckedByValue(newValue);
      // useMergeProps do this
      // setValue(newValue);
    }
  }, [props.value, stateValue, isMultiple]);

  useImperativeHandle(ref, () => selectRef.current, []);

  const updateStashNodes = (nodes) => {
    stashNodes.current = Array.from(new Set([].concat(nodes, stashNodes.current)));
  };

  const getSelectedOptionsByValue = (values: string[][]): OptionProps[][] => {
    const result = [];
    const valuesSet = transformValuesToSet(values);

    const findValue = (nodes) => {
      nodes.some((node) => {
        if (valueInSet(valuesSet, node.pathValue)) {
          result.push(node.getPathNodes().map((x) => x._data));
          valuesSet.delete(node.pathValue);
        }
        if (!valuesSet.size) {
          return true;
        }
      });
    };

    findValue(store.getCheckedNodes());

    if (valuesSet.size) {
      findValue(stashNodes.current);
    }

    return result;
  };

  const handleVisibleChange = useCallback(
    (newVisible) => {
      if (newVisible !== popupVisible) {
        props.onVisibleChange && props.onVisibleChange(newVisible);
        if (!('popupVisible' in props)) {
          setPopupVisible(newVisible);
        }
      }
    },
    [props.onVisibleChange, popupVisible]
  );

  const renderText = useCallback(
    (value) => {
      // store 中不存在时，从stashNodes.current中找一下对应节点
      const options = getSelectedOptionsByValue([value])[0] || [];

      let text;
      let valueShow = isArray(value) ? value.map((x) => String(x)) : [];

      if (options.length) {
        valueShow = options.map((x) => x.label);
      }
      if (isFunction(renderFormat)) {
        text = renderFormat(valueShow);
      } else if (valueShow.every((v) => isString(v))) {
        text = valueShow.join(' / ');
      } else {
        text = valueShow.reduce((total, item, index) => {
          return total.concat(index === 0 ? [item] : [' / ', item]);
        }, []);
      }
      return {
        text: text || '',
        disabled: options[options.length - 1]?.disabled,
      };
    },
    [store, renderFormat]
  );

  // isTouch: 是否是通过点击remove图标或者清除图标改变的值
  const handleChange = (newValue: string[][], isTouch?: boolean) => {
    setValue((mergeValue) => {
      const { onChange, changeOnSelect, expandTrigger } = props;
      const isSame = mergeValue === newValue;

      if (!isSame) {
        if (isTouch || !isMultiple) {
          store.setNodeCheckedByValue(newValue);
        }
      }

      const nodes = store.getCheckedNodes();
      !isSame && updateStashNodes(nodes);

      const selectedOptions = getSelectedOptionsByValue(newValue);

      if (!isSame) {
        const _value = isMultiple ? newValue : newValue[0];
        const _selectedOptions = isMultiple ? selectedOptions : selectedOptions[0];
        onChange &&
          onChange(_value, _selectedOptions, {
            dropdownVisible: popupVisible,
          });
      }

      if (!isMultiple) {
        if (inputValue) {
          // 单选时选择搜索项，直接关闭面板
          handleVisibleChange(false);
        } else if (
          (selectedOptions[0] && selectedOptions[0][selectedOptions[0].length - 1]?.isLeaf) ||
          (changeOnSelect && expandTrigger === 'hover')
        ) {
          handleVisibleChange(false);
        }
      }
      // 这里直接通过setValue修改stateValue是为了节省受控模式下，不断通过外部value查找节点，计算选中状态的操作。
      // 和useUpdate配合，在statevalue和外部传入的value不相等的时候才进行计算。
      return isSame ? mergeValue : newValue;
    });
  };

  const onRemoveCheckedItem = (item, index, e) => {
    e.stopPropagation();
    if (item.disabled) {
      return;
    }

    const newValue = mergeValue.filter((_, i) => i !== index);
    handleChange(newValue, true);
  };

  const renderEmptyEle = (width?: number): React.ReactNode => {
    const wd = width || (selectRef.current && selectRef.current.getWidth());
    return (
      <div className={`${prefixCls}-list-empty`} style={{ width: wd as number }}>
        {props.notFoundContent || renderEmpty('Cascader')}
      </div>
    );
  };

  const renderPopup = () => {
    const width = selectRef.current && selectRef.current.getWidth();
    const showSearchPanel = !isFunction(props.onSearch) && !!inputValue;
    const dropdownRender = isFunction(props.dropdownRender) ? props.dropdownRender : (menu) => menu;

    return (
      <div
        className={cs(`${prefixCls}-popup`, {
          [`${prefixCls}-popup-trigger-hover`]: props.expandTrigger === 'hover',
        })}
      >
        {dropdownRender(
          <div className={`${prefixCls}-popup-inner`} onMouseDown={(e) => e.preventDefault()}>
            {showSearchPanel ? (
              <SearchPanel
                style={{ minWidth: width } as CSSProperties}
                store={store}
                inputValue={inputValue}
                renderEmpty={() => renderEmptyEle(width)}
                multiple={isMultiple}
                onChange={handleChange}
                prefixCls={prefixCls}
                onEsc={() => {
                  handleVisibleChange(false);
                }}
                value={mergeValue}
              />
            ) : (
              <CascaderPanel
                expandTrigger={expandTrigger}
                store={store}
                dropdownColumnRender={props.dropdownColumnRender}
                renderOption={props.renderOption}
                changeOnSelect={props.changeOnSelect}
                showEmptyChildren={props.showEmptyChildren || !!props.loadMore}
                multiple={isMultiple}
                onChange={handleChange}
                loadMore={props.loadMore}
                prefixCls={prefixCls}
                renderEmpty={renderEmptyEle}
                popupVisible={popupVisible}
                value={mergeValue}
                renderFooter={props.renderFooter}
                onEsc={() => {
                  handleVisibleChange(false);
                }}
                onDoubleClickOption={() => {
                  if (props.changeOnSelect && !isMultiple) {
                    handleVisibleChange(false);
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Trigger
      popup={renderPopup}
      trigger={props.trigger}
      disabled={disabled}
      getPopupContainer={getPopupContainer}
      position="bl"
      classNames="slideDynamicOrigin"
      popupAlign={{ bottom: 4 }}
      // 动态加载时，unmountOnExit 默认为false。
      unmountOnExit={'unmountOnExit' in props ? props.unmountOnExit : !isFunction(props.loadMore)}
      popupVisible={popupVisible}
      {...triggerProps}
      onVisibleChange={handleVisibleChange}
    >
      {children || (
        <SelectView
          {...props}
          ref={selectRef}
          popupVisible={popupVisible}
          value={isMultiple ? mergeValue : mergeValue && mergeValue[0]}
          inputValue={inputValue}
          // other
          isEmptyValue={isEmptyValue(mergeValue)}
          prefixCls={prefixCls}
          isMultiple={isMultiple}
          renderText={renderText}
          onRemoveCheckedItem={onRemoveCheckedItem}
          onClear={(e) => {
            e.stopPropagation();
            if (!isMultiple) {
              handleChange([]);
            } else {
              const nodes = store.getCheckedNodes();
              const newValue = nodes.filter((x) => x.disabled).map((x) => x.pathValue);
              store.setNodeCheckedByValue(newValue);

              handleChange(newValue, true);
            }

            props.onClear && props.onClear(!!popupVisible);
          }}
          onKeyDown={(e) => {
            if (disabled) {
              return;
            }
            e.stopPropagation();
            const keyCode = e.keyCode || e.which;
            if (keyCode === Enter.code && !popupVisible) {
              handleVisibleChange(true);
              e.preventDefault();
            }
            if (keyCode === Tab.code && popupVisible) {
              handleVisibleChange(false);
            }
          }}
          // onFocus={this.onFocusInput}
          onChangeInputValue={(v) => {
            setInputValue(v);
            props.onSearch && props.onSearch(v);
            // tab键 focus 到输入框，此时下拉框未显示。如果输入值，展示下拉框
            if (!popupVisible) {
              handleVisibleChange(true);
            }
          }}
        />
      )}
    </Trigger>
  );
}

interface ForwardRefCascaderType
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<CascaderProps> & React.RefAttributes<SelectViewHandle>
  > {
  <T = any>(
    props: React.PropsWithChildren<CascaderProps<T>> & {
      ref?: React.Ref<SelectViewHandle>;
    }
  ): React.ReactElement;
}

const CascaderComponent = forwardRef<SelectViewHandle, CascaderProps<any>>(
  Cascader
) as ForwardRefCascaderType;

CascaderComponent.displayName = 'Cascader';

export default CascaderComponent;

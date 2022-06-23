import React, {
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  useMemo,
  useCallback,
  ForwardRefRenderFunction,
} from 'react';
import debounce from 'lodash/debounce';
import useStateValue, { parseValue } from './hook/useStateValue';
import { normalizeValueToArray } from './utils';
import { isArray, isFunction, isObject } from '../_util/is';
import Trigger from '../Trigger';
import Tree from '../Tree';
import { ConfigContext } from '../ConfigProvider';
import { getAllCheckedKeysByCheck } from '../Tree/util';
import SelectView from '../_class/select-view';
import { TreeSelectProps, LabelValue, DefaultFieldNames, RefTreeSelectType } from './interface';
import useTreeData from './hook/useTreeData';
import useKeyCache from './hook/useKeyCache';
import TreeList from './tree-list';
import { NodeProps } from '../Tree/interface';
import useMergeValue from '../_util/hooks/useMergeValue';
import cs from '../_util/classNames';
import useMergeProps from '../_util/hooks/useMergeProps';

function isEmptyValue(value) {
  return (
    !value ||
    (isArray(value) && value.length === 0) ||
    (isObject(value) && Object.keys(value).length === 0)
  );
}

// Generate DOM id for instance
let globalTreeSelectIndex = 0;

const defaultProps: TreeSelectProps = {
  bordered: true,
  treeCheckedStrategy: Tree.SHOW_CHILD,
  fieldNames: DefaultFieldNames,
};

const TreeSelect: ForwardRefRenderFunction<
  RefTreeSelectType,
  PropsWithChildren<TreeSelectProps>
> = (baseProps: PropsWithChildren<TreeSelectProps>, ref) => {
  const { getPrefixCls, renderEmpty, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<TreeSelectProps>>(
    baseProps,
    defaultProps,
    componentConfig?.TreeSelect
  );

  const triggerRef = useRef<Trigger>();
  const treeRef = useRef(null);
  const refSelectView = useRef(null);
  const indeterminateKeys = useRef<string[]>([]);
  const [treeData] = useTreeData(props);
  const key2nodeProps = useKeyCache(treeData, props.fieldNames);
  const [hitKeys, setHitKeys] = useState<Set<string>>();
  const [popupVisible, setPopupVisible] = useMergeValue<boolean>(false, {
    value: props.popupVisible,
  });
  const [inputValue, setInputValue] = useState<string>();

  const [value, setValue] = useStateValue(props, key2nodeProps, indeterminateKeys);

  const multiple = props.multiple || props.treeCheckable;

  const prefixCls = getPrefixCls('tree-select');
  const isFilterNode = inputValue && !isFunction(props.onSearch);

  // Unique ID of this select instance
  const instancePopupID = useMemo<string>(() => {
    const id = `${prefixCls}-popup-${globalTreeSelectIndex}`;
    globalTreeSelectIndex++;
    return id;
  }, []);

  const handleSearch = useCallback(
    (inputText) => {
      const search = debounce(async (inputText) => {
        if (isFunction(props.onSearch)) {
          await props.onSearch(inputText);
          return;
        }

        if (!inputText) return treeData;
        const hitKeys = new Set<string>();

        Object.keys(key2nodeProps).forEach((key) => {
          const nodeProps = key2nodeProps[key];
          let isHit = false;
          if (isFunction(props.filterTreeNode)) {
            if (props.filterTreeNode(inputText, <Tree.Node {...nodeProps} />)) {
              isHit = true;
            }
          } else {
            const text = nodeProps.value || nodeProps._key;
            if (text && text.indexOf(inputText) > -1) {
              isHit = true;
            }
          }
          if (isHit) {
            hitKeys.add(nodeProps.key);
          }
        });
        setHitKeys(hitKeys);
      }, 100);

      return search(inputText);
    },
    [props.onSearch, treeData, key2nodeProps, props.filterTreeNode]
  );

  const resetInputValue = () => {
    // 多选选中值时候不清除搜索文本
    let retainInputValueWhileSelect = true;
    if (isObject(props.showSearch)) {
      retainInputValueWhileSelect = props.showSearch.retainInputValueWhileSelect !== false;
    }

    if (props.multiple && !retainInputValueWhileSelect) {
      setInputValue('');
      handleSearch('');
    }
  };

  const triggerChange = useCallback<typeof setValue>(
    (newValue: LabelValue[], extra) => {
      setValue(newValue, extra);
      resetInputValue();
      if (!multiple) {
        setPopupVisible(false);
      }
    },
    [setValue]
  );

  const handleRemoveCheckedItem = (item, index, e) => {
    e.stopPropagation();
    if (item.disabled) {
      return;
    }
    if (!props.treeCheckable || props.treeCheckStrictly || !key2nodeProps[item.value]) {
      const newValue = value.filter((_, i) => i !== index);
      triggerChange(newValue, {
        trigger: key2nodeProps[item.value] || item,
        checked: false,
        selected: false,
      });
      return;
    }
    const result = getAllCheckedKeysByCheck(
      item.value,
      false,
      normalizeValueToArray(value),
      key2nodeProps,
      indeterminateKeys.current
    );
    indeterminateKeys.current = result.indeterminateKeys;
    triggerChange(parseValue(result.checkedKeys, key2nodeProps, value), {
      trigger: key2nodeProps[item.value],
      checked: false,
      selected: false,
    });
  };

  useEffect(() => {
    inputValue !== undefined && handleSearch(inputValue);
  }, [inputValue]);

  const searchKeys = useMemo<string[]>(() => {
    let newKeys: string[] = [];
    if (inputValue) {
      for (const key in key2nodeProps) {
        const item = key2nodeProps[key];

        const pathKeys = [...item.pathParentKeys, key];

        if (pathKeys.some((_key) => hitKeys && hitKeys.has(_key))) {
          newKeys = newKeys.concat(pathKeys);
        }
      }
    }
    return Array.from(new Set(newKeys));
  }, [inputValue, key2nodeProps, hitKeys]);

  useEffect(() => {
    popupVisible &&
      setTimeout(() => {
        const target = value[0];
        if (treeRef.current && target) {
          treeRef.current.scrollIntoView(target.value);
        }
      });
    inputValue && setInputValue('');
  }, [popupVisible]);

  useImperativeHandle(ref, () => ({
    focus() {
      refSelectView.current && refSelectView.current.focus();
    },
    blur() {
      refSelectView.current && refSelectView.current.blur();
    },
  }));

  const filterNode = useCallback(
    (node: NodeProps) => {
      return isFilterNode ? searchKeys.indexOf(node._key) > -1 : true;
    },
    [isFilterNode, searchKeys]
  );

  const renderText = useCallback((val) => {
    const { label = '', disabled } = val || {};
    return { text: label, disabled };
  }, []);

  const tryUpdateSelectValue = (value: LabelValue[]) => {
    setValue(value, {});
  };

  return (
    <Trigger
      autoAlignPopupWidth={false}
      autoAlignPopupMinWidth
      ref={triggerRef}
      classNames="slideDynamicOrigin"
      trigger="click"
      position="bl"
      getPopupContainer={props.getPopupContainer}
      popupAlign={{ bottom: 4 }}
      unmountOnExit={props.unmountOnExit}
      {...props.triggerProps}
      className={cs(`${prefixCls}-trigger`, props.triggerProps && props.triggerProps.className)}
      popup={() => {
        const dropdownRender = props.dropdownRender;
        const dom =
          (isFilterNode && isEmptyValue(searchKeys)) || isEmptyValue(treeData) ? (
            props.notFoundContent || renderEmpty('TreeSelect')
          ) : (
            <TreeList
              prefixCls={prefixCls}
              ref={treeRef}
              {...props}
              inputValue={inputValue}
              filterNode={filterNode}
              value={value}
              onChange={triggerChange}
              multiple={multiple}
              treeData={treeData}
            />
          );

        return (
          <div
            id={instancePopupID}
            className={`${prefixCls}-popup`}
            style={{
              maxHeight:
                props.treeProps?.height || props.treeProps?.virtualListProps?.height ? 'unset' : '',
              ...props.dropdownMenuStyle,
            }}
          >
            {isFunction(dropdownRender) ? dropdownRender(dom) : dom}
          </div>
        );
      }}
      disabled={props.disabled}
      onVisibleChange={(visible: boolean) => {
        setPopupVisible(visible);
        props.onVisibleChange && props.onVisibleChange(visible);
      }}
      popupVisible={popupVisible}
    >
      {typeof props.triggerElement === 'function'
        ? (() => {
            let valueForCallback;
            if (multiple) {
              valueForCallback = value.map((x) =>
                props.labelInValue ? { label: x.label, value: x.value } : x.value
              );
            } else {
              valueForCallback = props.labelInValue ? value[0] : value[0]?.value;
            }
            return props.triggerElement({ value: valueForCallback });
          })()
        : props.triggerElement || (
            <SelectView
              ref={refSelectView}
              ariaControls={instancePopupID}
              {...props}
              popupVisible={popupVisible}
              value={!multiple && isArray(value) ? value[0] : value}
              inputValue={inputValue}
              // other
              isEmptyValue={isEmptyValue(value)}
              prefixCls={prefixCls}
              isMultiple={multiple}
              renderText={renderText}
              onSort={tryUpdateSelectValue}
              onRemoveCheckedItem={handleRemoveCheckedItem}
              onClear={(e) => {
                e.stopPropagation();
                triggerChange([], {});
                props.onClear && props.onClear(!!popupVisible);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              onFocus={(e) => {
                e && e.stopPropagation();
              }}
              onChangeInputValue={(input) => {
                setInputValue(input);
              }}
            />
          )}
    </Trigger>
  );
};

const ForwardRefTreeSelect = forwardRef<RefTreeSelectType, PropsWithChildren<TreeSelectProps>>(
  TreeSelect
);

const TreeSelectComponent = ForwardRefTreeSelect as typeof ForwardRefTreeSelect & {
  Node: typeof Tree.Node;
  SHOW_ALL: typeof Tree.SHOW_ALL;
  SHOW_PARENT: typeof Tree.SHOW_PARENT;
  SHOW_CHILD: typeof Tree.SHOW_CHILD;
};

TreeSelectComponent.displayName = 'TreeSelect';

TreeSelectComponent.Node = Tree.Node;

TreeSelectComponent.SHOW_ALL = Tree.SHOW_ALL;

TreeSelectComponent.SHOW_PARENT = Tree.SHOW_PARENT;

TreeSelectComponent.SHOW_CHILD = Tree.SHOW_CHILD;

export default TreeSelectComponent;

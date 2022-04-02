import React, {
  ReactText,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import cs from '../_util/classNames';
import { ArrowUp, ArrowDown, Enter, Esc, Tab } from '../_util/keycode';
import Trigger from '../Trigger';
import OptGroup from './opt-group';
import Option from './option';
import ResizeObserver from '../_util/resizeObserver';
import { isArray, isFunction, isObject } from '../_util/is';
import getHotkeyHandler from '../_util/getHotkeyHandler';
import warning from '../_util/warning';
import {
  OptionProps,
  SelectProps,
  OptionInfo,
  InputValueChangeReason,
  SelectHandle,
  SelectInnerStateValue,
  LabeledValue,
} from './interface';
import SelectView, { SelectViewHandle } from '../_class/select-view';
import VirtualList from '../_class/VirtualList';
import {
  preventDefaultEvent,
  isEmptyValue,
  getValidValue,
  isSelectOption,
  isSelectOptGroup,
  flatChildren,
} from './utils';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';
import { SelectOptionProps } from '../index';

// 输入框粘贴会先触发 onPaste 后触发 onChange，但 onChange 的 value 中不包含换行符
// 如果刚刚因为粘贴触发过分词，则 onChange 不再进行分词尝试
const THRESHOLD_TOKEN_SEPARATOR_TRIGGER = 100;

const defaultProps: SelectProps = {
  trigger: 'click',
  bordered: true,
  filterOption: true,
  unmountOnExit: true,
  defaultActiveFirstOption: true,
};

function Select(baseProps: SelectProps, ref) {
  const { getPrefixCls, renderEmpty, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<SelectProps>(baseProps, defaultProps, componentConfig?.Select);
  const {
    children,
    renderFormat,
    defaultActiveFirstOption,
    disabled,
    unmountOnExit,
    notFoundContent,
    showSearch,
    tokenSeparators,
    options,
    filterOption,
    labelInValue,
    getPopupContainer,

    trigger,
    triggerElement,
    triggerProps,
    dropdownRender,
    dropdownMenuStyle,
    dropdownMenuClassName,
    virtualListProps,

    // events
    onChange,
    onDeselect,
    onClear,
    onSearch,
    onFocus,
    onBlur,
    onPopupScroll,
    onVisibleChange,
    onInputValueChange,
    onPaste,
  } = props;

  // TODO 兼容逻辑，3.0 移除 tags 模式
  let { mode, allowCreate } = props;
  if (mode === 'tags') {
    mode = 'multiple';
    allowCreate = true;
    warning(
      true,
      `[Arco Select] The 'tags' mode will be removed in the next major version, please use {mode: "multiple", allowCreate: true} instead.`
    );
  }

  const prefixCls = getPrefixCls('select');
  const isMultipleMode = mode === 'multiple';

  // TODO: 统一 useMergeValue 函数的表现
  const [stateValue, setValue] = useState(
    getValidValue(props.defaultValue, isMultipleMode, labelInValue)
  );
  const value =
    'value' in props ? getValidValue(props.value, isMultipleMode, labelInValue) : stateValue;
  const [inputValue, setInputValue, stateInputValue] = useMergeValue('', {
    value: 'inputValue' in props ? props.inputValue || '' : undefined,
  });
  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value:
      'popupVisible' in props
        ? props.popupVisible
        : triggerProps && 'popupVisible' in triggerProps
        ? triggerProps.popupVisible
        : undefined,
  });
  // allowCreate 时，用户正在创建的选项值
  const [userCreatingOption, setUserCreatingOption] = useState<string>(null);
  // allowCreate 时，由用户输入而扩展到选项中的值
  const [userCreatedOptions, setUserCreatedOptions] = useState<string[]>([]);
  // 具有选中态或者 hover 态的 option 的 value
  const [valueActive, setValueActive] = useState<OptionProps['value']>(
    isArray(value) ? value[0] : value
  );

  // 缓存较为耗时的 flatChildren 的结果
  const {
    childrenList,
    optionInfoMap,
    optionValueList,
    optionIndexListForArrowKey,
    hasOptGroup,
    hasComplexLabelInOptions,
  } = useMemo(() => {
    return flatChildren(
      { children, options, filterOption },
      {
        prefixCls,
        inputValue,
        userCreatedOptions,
        userCreatingOption,
      }
    );
  }, [children, options, filterOption, inputValue, userCreatingOption, userCreatedOptions]);

  // ref
  const refWrapper = useRef(null);
  const refTrigger = useRef(null);
  const refSelectView = useRef<SelectViewHandle>(null);
  // 用来保存 value 和选中项的映射
  const refValueMap = useRef<Array<{ value: OptionProps['value']; option: OptionInfo }>>([]);
  // 用 none 表示目前处于键盘操作中，忽略鼠标的 onMouseEnter 和 onMouseLeave 事件
  const refKeyboardArrowDirection = useRef<'up' | 'down' | 'none'>(null);
  // 触发 onInputValueChange 回调的值
  const refOnInputChangeCallbackValue = useRef(inputValue);
  // 触发 onInputValueChange 回调的原因
  const refOnInputChangeCallbackReason = useRef<InputValueChangeReason>(null);
  // 上次成功触发自动分词的时间
  const refTSLastSeparateTriggered = useRef(0);

  const isNoOptionSelected = isEmptyValue(value, isMultipleMode);
  const valueActiveDefault = defaultActiveFirstOption
    ? optionValueList[optionIndexListForArrowKey[0]]
    : undefined;

  const scrollIntoView = (optionValue) => {
    const activeOption = optionInfoMap.get(optionValue);
    if (refWrapper.current && activeOption && activeOption.child.props) {
      refWrapper.current.scrollTo({ key: activeOption.child.props._key });
    }
  };

  // 尝试更新 inputValue，触发 onInputValueChange
  const tryUpdateInputValue = (value: string, reason: InputValueChangeReason) => {
    if (value !== refOnInputChangeCallbackValue.current) {
      setInputValue(value);
      refOnInputChangeCallbackValue.current = value;
      refOnInputChangeCallbackReason.current = reason;
      onInputValueChange && onInputValueChange(value, reason);
    }
  };

  // 尝试更新 popupVisible，触发 onVisibleChange
  const tryUpdatePopupVisible = (value: boolean) => {
    if (popupVisible !== value) {
      setPopupVisible(value);
      onVisibleChange && onVisibleChange(value);
      triggerProps && triggerProps.onVisibleChange && triggerProps.onVisibleChange(value);
    }
  };

  // 处理模式切换时 value 格式的校正
  useEffect(() => {
    if (isMultipleMode) {
      if (!Array.isArray(value)) {
        setValue(value === undefined ? [] : [value as any]);
      }
    } else if (Array.isArray(value)) {
      setValue(value.length === 0 ? undefined : value[0]);
    }
  }, [isMultipleMode, value]);

  // 选项下拉框显示/隐藏时的一些自动行为
  useEffect(() => {
    if (popupVisible) {
      // 重新设置 hover 态的 Option
      const firstValue = isArray(value) ? value[0] : value;
      const nextValueActive =
        !isNoOptionSelected && optionInfoMap.has(firstValue) ? firstValue : valueActiveDefault;
      setValueActive(nextValueActive);
      // 在弹出框动画结束之后再执行scrollIntoView，否则会有不必要的滚动产生
      setTimeout(() => scrollIntoView(nextValueActive));
    } else {
      tryUpdateInputValue('', 'optionListHide');
    }
  }, [popupVisible]);

  // 处理键盘选择Option时的列表滚动
  useEffect(() => {
    if (
      refKeyboardArrowDirection.current === 'up' ||
      refKeyboardArrowDirection.current === 'down'
    ) {
      scrollIntoView(valueActive);
      refKeyboardArrowDirection.current = 'none';
    }
  }, [valueActive]);

  // 选项列表改变后，将 active 选项重置
  useEffect(() => {
    setValueActive(valueActiveDefault);
  }, [JSON.stringify(childrenList.map((child) => child?.props?.value))]);

  // 更新 refValueMap，避免数组规模无节制扩大
  useEffect(() => {
    refValueMap.current = refValueMap.current.filter((x) => {
      return isMultipleMode
        ? isArray(value) && (value as Array<string | number>).indexOf(x.value) > -1
        : x.value === value;
    });
  }, [value, isMultipleMode]);

  // allowCreate 时，value 改变时更新下拉框选项
  useEffect(() => {
    // 将无对应下拉框选项的 value 当作自定义 tag，将 value 中不存在的 valueTag 移除
    if (allowCreate && Array.isArray(value)) {
      const newUseCreatedOptions = (value as any[]).filter((v) => {
        const option = optionInfoMap.get(v);
        return !option || option._origin === 'userCreatingOption';
      });
      const validUseCreatedOptions = userCreatedOptions.filter(
        (tag) => (value as any[]).indexOf(tag) !== -1
      );
      const _userCreatedOptions = validUseCreatedOptions.concat(newUseCreatedOptions);
      if (_userCreatedOptions.toString() !== userCreatedOptions.toString()) {
        setUserCreatedOptions(_userCreatedOptions);
      }
    }
  }, [value]);

  // allowCreate 时，根据输入内容动态修改下拉框选项
  useEffect(() => {
    if (allowCreate) {
      // 避免正在输入的内容覆盖已有的选项
      setUserCreatingOption(optionInfoMap.has(inputValue) ? null : inputValue);
    }
  }, [inputValue]);

  // 在 inputValue 变化时，适时触发 onSearch
  useEffect(() => {
    const { current: reason } = refOnInputChangeCallbackReason;
    if (stateInputValue === inputValue && (reason === 'manual' || reason === 'optionListHide')) {
      onSearch && onSearch(inputValue, reason);
    }
  }, [inputValue]);

  const getOptionInfoByValue = (value: OptionProps['value']): OptionInfo => {
    const option = optionInfoMap.get(value);
    if (option) {
      const index = refValueMap.current.findIndex((item) => item.value === value);
      if (index > -1) {
        refValueMap.current.splice(index, 1, { value, option });
      } else {
        refValueMap.current.push({ value, option });
      }
      return option;
    }

    const item = refValueMap.current.find((x) => x.value === value);
    return item && item.option;
  };

  // 使用方向键选择时，获取下一个 active option 的值
  const getValueActive = (direction: 'up' | 'down') => {
    if (!optionIndexListForArrowKey.length) {
      return undefined;
    }

    if (valueActive === undefined || !optionInfoMap.has(valueActive)) {
      return optionValueList[optionIndexListForArrowKey[0]];
    }

    const activeOption = optionInfoMap.get(valueActive);
    const activeIndex = activeOption._index;
    const _index = optionIndexListForArrowKey.indexOf(activeIndex);
    const _length = optionIndexListForArrowKey.length;

    return optionValueList[
      optionIndexListForArrowKey[
        ((direction === 'up' ? _index - 1 : _index + 1) + _length) % _length
      ]
    ];
  };

  // Object should be returned when labelInValue is true
  const getValueAndOptionForCallback = (
    stateValue: SelectInnerStateValue,
    isEmpty = isEmptyValue(stateValue, isMultipleMode)
  ): { value: SelectProps['value']; option: OptionInfo | OptionInfo[] } => {
    let value: SelectProps['value'] = stateValue;
    const option =
      stateValue === undefined
        ? undefined
        : Array.isArray(stateValue)
        ? stateValue.map(getOptionInfoByValue)
        : getOptionInfoByValue(stateValue);

    if (labelInValue && !isEmpty) {
      const getOptionLabel = (optionValue: OptionProps['value'], optionInfo: OptionInfo) => {
        if (optionInfo) {
          return optionInfo.children;
        }

        // https://github.com/arco-design/arco-design/issues/442
        // Make sure parameter value has valid label if props.value is already set
        const propValue =
          'value' in props ? props.value : 'defaultValue' in props ? props.defaultValue : null;

        // Multiple mode
        if (Array.isArray(propValue)) {
          for (const item of propValue) {
            if (isObject(item) && item.value === optionValue) {
              return item.label;
            }
          }
        }
        // Single mode
        else if (isObject(propValue) && propValue.value === optionValue) {
          return propValue.label;
        }
      };

      if (Array.isArray(stateValue)) {
        value = stateValue.map((optionValue, index) => ({
          value: optionValue,
          label: getOptionLabel(optionValue, (option as OptionInfo[])[index]),
        }));
      } else {
        value = { value: stateValue, label: getOptionLabel(stateValue, option as OptionInfo) };
      }
    }

    return { option, value };
  };

  const tryUpdateSelectValue = (value: SelectInnerStateValue) => {
    setValue(value);
    if (onChange) {
      const paramsForCallback = getValueAndOptionForCallback(value);
      onChange(paramsForCallback.value, paramsForCallback.option);
    }
  };

  // 多选时，选择一个选项
  const checkOption = (valueToAdd) => {
    const option = optionInfoMap.get(valueToAdd);
    if (option) {
      const newValue = (value as string[]).concat(valueToAdd);
      tryUpdateSelectValue(newValue);
    }
  };

  // 多选时，取消一个选项
  const uncheckOption = (valueToRemove) => {
    // 取消选中时不需要检查option是否存在，因为可能已被外部剔除了此选项
    const newValue = (value as string[]).filter((v) => v !== valueToRemove);
    tryUpdateSelectValue(newValue);

    if (onDeselect) {
      const paramsForCallback = getValueAndOptionForCallback(valueToRemove, false);
      onDeselect(
        paramsForCallback.value as ReactText | LabeledValue,
        paramsForCallback.option as OptionInfo
      );
    }
  };

  const handleOptionClick = (optionValue: OptionProps['value'], disabled: boolean) => {
    if (disabled) {
      return;
    }

    if (isMultipleMode) {
      (value as Array<OptionProps['value']>).indexOf(optionValue) === -1
        ? checkOption(optionValue)
        : uncheckOption(optionValue);

      // 点击一个选项时，清空输入框内容
      if (!isObject(showSearch) || !showSearch.retainInputValueWhileSelect) {
        tryUpdateInputValue('', 'optionChecked');
      }
    } else {
      if (optionValue !== value) {
        tryUpdateSelectValue(optionValue);
      }
      setTimeout(() => {
        tryUpdatePopupVisible(false);
      });
    }
  };

  // 注册快捷键
  const hotkeyHandler = getHotkeyHandler(
    new Map([
      [Esc.code, () => tryUpdatePopupVisible(false)],
      [
        Enter.code,
        () => {
          if (popupVisible) {
            const option = optionInfoMap.get(valueActive);
            option && handleOptionClick(valueActive, option.disabled);
          } else {
            tryUpdatePopupVisible(true);
          }
        },
      ],
      [
        Tab.code,
        // 按tab键切换，关闭开启的弹出框
        () => tryUpdatePopupVisible(false),
      ],
      [
        ArrowUp.code,
        () => {
          if (popupVisible) {
            refKeyboardArrowDirection.current = 'up';
            setValueActive(getValueActive('up'));
            return false;
          }
        },
      ],
      [
        ArrowDown.code,
        () => {
          if (popupVisible) {
            refKeyboardArrowDirection.current = 'down';
            setValueActive(getValueActive('down'));
            return false;
          }
        },
      ],
    ])
  );

  const renderPopup = () => {
    // 没有设置弹出框的 width 时，需要在虚拟列表渲染的瞬间获得子元素的最大宽度
    const needMeasureLongestItem = triggerProps?.autoAlignPopupWidth === false;
    // Option 存在复杂子元素时，让获得最长子元素变得困难，此时直接禁用虚拟滚动
    const needForbidVirtual = needMeasureLongestItem && hasComplexLabelInOptions;

    const mergedNotFoundContent =
      'notFoundContent' in props ? notFoundContent : renderEmpty('Select');

    // 选项列表元素
    const eleOptionList = childrenList.length ? (
      <VirtualList
        style={dropdownMenuStyle}
        className={cs(`${prefixCls}-popup-inner`, dropdownMenuClassName)}
        ref={refWrapper}
        data={childrenList}
        height={null}
        isStaticItemHeight={!hasOptGroup}
        measureLongestItem={needMeasureLongestItem}
        itemKey={(child) => child.props._key}
        onMouseDown={preventDefaultEvent}
        onMouseMove={() => {
          refKeyboardArrowDirection.current = null;
        }}
        onScroll={(e) => onPopupScroll && onPopupScroll(e.target)}
        {...virtualListProps}
        threshold={needForbidVirtual ? null : virtualListProps?.threshold}
      >
        {(child) => {
          if (isSelectOptGroup(child)) {
            return <child.type {...child.props} prefixCls={prefixCls} />;
          }

          if (isSelectOption(child)) {
            const optionProps: Partial<SelectOptionProps> = {
              prefixCls,
              _valueActive: valueActive,
              _valueSelect: value,
              _isMultipleMode: isMultipleMode,
              _onClick: handleOptionClick,
              _onMouseEnter: (value) => {
                refKeyboardArrowDirection.current === null && setValueActive(value);
              },
              _onMouseLeave: () => {
                refKeyboardArrowDirection.current === null && setValueActive(undefined);
              },
            };

            return child && <child.type {...child.props} {...optionProps} />;
          }

          return child;
        }}
      </VirtualList>
    ) : null;

    // 无选项时的占位符元素
    const eleNoOptionPlaceholder = mergedNotFoundContent ? (
      <div
        style={dropdownMenuStyle}
        className={cs(`${prefixCls}-popup-inner`, dropdownMenuClassName)}
      >
        {mergedNotFoundContent}
      </div>
    ) : null;

    return (
      <div
        className={cs(`${prefixCls}-popup`, {
          [`${prefixCls}-popup-hidden`]: eleOptionList === null && eleNoOptionPlaceholder === null,
          [`${prefixCls}-popup-multiple`]: isMultipleMode,
        })}
      >
        {typeof dropdownRender === 'function'
          ? dropdownRender(eleOptionList || eleNoOptionPlaceholder)
          : eleOptionList || eleNoOptionPlaceholder}
      </div>
    );
  };

  const handleTokenSeparators = (str): boolean => {
    let hasSeparator = false;
    if (isMultipleMode && isArray(tokenSeparators) && tokenSeparators.length) {
      const rawValues = str.split(new RegExp(`[${tokenSeparators.join('')}]`));
      // 输入了分隔符的情况
      if (rawValues.length > 1) {
        const splitValues = rawValues.filter((v, index) => v && rawValues.indexOf(v) === index);
        const newValue = (value as any[]).slice(0);
        let needUpdate = false;

        splitValues.forEach((v) => {
          if (newValue.indexOf(v) === -1 && (allowCreate || optionInfoMap.get(v))) {
            newValue.push(v);
            needUpdate = true;
          }
        });

        if (needUpdate) {
          tryUpdateSelectValue(newValue);
        }

        hasSeparator = true;
      }
    }
    return hasSeparator;
  };

  // SelectView组件事件处理
  const selectViewEventHandlers = {
    onFocus,
    onBlur: (event) => {
      onBlur && onBlur(event);
      // 兼容：下拉列表隐藏时，失焦需要清空已输入内容
      !popupVisible && tryUpdateInputValue('', 'optionListHide');
    },
    onKeyDown: (event) => {
      // 处理特殊功能键的自动分词
      if (event.target.tagName === 'INPUT' && event.target.value) {
        const isTab = event.key === Tab.key;
        const isEnter = event.key === Enter.key;

        if (isEnter || isTab) {
          const suffix = isEnter ? '\n' : isTab ? '\t' : '';
          if (handleTokenSeparators(event.target.value + suffix)) {
            refTSLastSeparateTriggered.current = Date.now();
            // 回车后不会触发 onChangeInputValue 回调，所以在这里直接清空输入框
            tryUpdateInputValue('', 'tokenSeparator');
          }
        }
      }

      // 处理快捷键
      hotkeyHandler(event);
    },

    onChangeInputValue: (value, { nativeEvent: { inputType } }) => {
      if (
        (inputType === 'insertFromPaste' &&
          Date.now() - refTSLastSeparateTriggered.current < THRESHOLD_TOKEN_SEPARATOR_TRIGGER) ||
        handleTokenSeparators(value)
      ) {
        tryUpdateInputValue('', 'tokenSeparator');
      } else {
        tryUpdateInputValue(value, 'manual');
      }

      if (!popupVisible && value) {
        tryUpdatePopupVisible(true);
      }
    },

    onPaste: (e) => {
      if (handleTokenSeparators(e.clipboardData.getData('text'))) {
        refTSLastSeparateTriggered.current = Date.now();
      }
      onPaste && onPaste(e);
    },

    // Option Items
    onRemoveCheckedItem: (_, index, event) => {
      event.stopPropagation();
      uncheckOption(value[index]);
    },

    onClear: (event) => {
      event.stopPropagation();
      if (isMultipleMode) {
        // 保留已经被选中但被disabled的选项值
        const newValue = (value as []).filter((v) => {
          const item = optionInfoMap.get(v);
          return item && item.disabled;
        });
        tryUpdateSelectValue(newValue);
      } else {
        tryUpdateSelectValue(undefined);
      }
      tryUpdateInputValue('', 'manual');
      onClear && onClear(popupVisible);
    },
  };

  useImperativeHandle<any, SelectHandle>(
    ref,
    () => ({
      dom: refSelectView.current?.dom,
      focus() {
        refSelectView.current && refSelectView.current.focus();
      },
      blur() {
        refSelectView.current && refSelectView.current.blur();
      },
      hotkeyHandler,
      activeOptionValue: valueActive,
      getOptionInfoByValue,
      getOptionInfoList: () => [...optionInfoMap.values()].filter((info) => info._valid),
    }),
    [hotkeyHandler, optionInfoMap, valueActive]
  );

  return (
    <ResizeObserver onResize={() => refTrigger.current.updatePopupPosition()}>
      <Trigger
        ref={(ref) => (refTrigger.current = ref)}
        popup={renderPopup}
        trigger={trigger}
        disabled={disabled}
        getPopupContainer={getPopupContainer}
        classNames="slideDynamicOrigin"
        autoAlignPopupWidth
        popupAlign={{ bottom: 4 }}
        popupVisible={popupVisible}
        unmountOnExit={unmountOnExit}
        onVisibleChange={tryUpdatePopupVisible}
        {...omit(triggerProps, ['popupVisible', 'onVisibleChange'])}
      >
        {typeof triggerElement === 'function'
          ? (() => triggerElement(getValueAndOptionForCallback(value)))()
          : triggerElement || (
              <SelectView
                {...props}
                {...selectViewEventHandlers}
                ref={refSelectView}
                // state
                value={value}
                inputValue={inputValue}
                popupVisible={popupVisible}
                // other
                prefixCls={prefixCls}
                isEmptyValue={isNoOptionSelected}
                isMultiple={isMultipleMode}
                onSort={tryUpdateSelectValue}
                renderText={(value) => {
                  const option = getOptionInfoByValue(value);
                  let text = value;
                  if (isFunction(renderFormat)) {
                    const paramsForCallback = getValueAndOptionForCallback(value, false);
                    text = renderFormat(
                      (paramsForCallback.option as OptionInfo) || null,
                      paramsForCallback.value as ReactText | LabeledValue
                    );
                  } else if (option) {
                    if ('children' in option) {
                      text = option.children;
                    }
                  } else if (labelInValue && isObject(props.value)) {
                    text = (props.value as any).label;
                  }
                  return {
                    text,
                    disabled: option && option.disabled,
                  };
                }}
              />
            )}
      </Trigger>
    </ResizeObserver>
  );
}

const ForwardRefSelect = React.forwardRef<SelectHandle, SelectProps>(Select);

const SelectComponent = ForwardRefSelect as typeof ForwardRefSelect & {
  Option: typeof Option;
  OptGroup: typeof OptGroup;
};

SelectComponent.displayName = 'Select';

SelectComponent.Option = Option;

SelectComponent.OptGroup = OptGroup;

export { SelectHandle };

export default SelectComponent;

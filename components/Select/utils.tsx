import React, { ReactElement } from 'react';
import get from 'lodash/get';
import Option from './option';
import {
  SelectInnerStateValue,
  OptionInfo,
  OptionProps,
  OptionsType,
  SelectProps,
} from './interface';
import { isArray, isString, isNumber, isObject } from '../_util/is';
import getHighlightText from '../_util/getHighlightText';
import fillNBSP from '../_util/fillNBSP';

export type OptionInfoMap = Map<OptionProps['value'], OptionInfo>;

function preventDefaultEvent(e) {
  e && e.preventDefault();
}

function isEmptyValue(value, isMultiple: boolean) {
  // Illegal value is considered as unselected
  return isMultiple ? !isArray(value) || !value.length : value === undefined;
}

function getValidValue(value, isMultiple: boolean, labelInValue: boolean): SelectInnerStateValue {
  // Compatible when labelInValue is set, value is passed in the object
  if (labelInValue) {
    if (isMultiple) {
      value = Array.isArray(value)
        ? value.map((item) => (isObject(item) && 'label' in item ? item.value : item))
        : value;
    } else {
      value = isObject(value) && 'label' in value ? value.value : value;
    }
  }

  return isEmptyValue(value, isMultiple)
    ? isMultiple
      ? Array.isArray(value)
        ? value
        : []
      : undefined
    : value;
}

function isSelectOption(child): boolean {
  return get(child, 'props.isSelectOption') || get(child, 'type.__ARCO_SELECT_OPTION__');
}

function isSelectOptGroup(child): boolean {
  return get(child, 'props.isSelectOptGroup') || get(child, 'type.__ARCO_SELECT_OPTGROUP__');
}

function flatChildren(
  { children, options, filterOption }: Pick<SelectProps, 'children' | 'options' | 'filterOption'>,
  {
    inputValue = '',
    userCreatedOptions,
    userCreatingOption,
    prefixCls,
  }: {
    inputValue: string;
    userCreatedOptions?: SelectProps['options'];
    userCreatingOption?: SelectProps['options'][number];
    prefixCls: string;
  },
  // 递归过程中需要持续传递的数据
  {
    optionInfoMap = new Map(),
    optionValueList = [],
    customNodeCount = 0,
  }: {
    // 缓存所有选项的信息
    optionInfoMap?: OptionInfoMap;
    // 缓存所有选项的值
    optionValueList?: Array<OptionProps['value']>;
    // 自定义节点的数量，用于此节点 key 的生成
    customNodeCount?: number;
  } = {}
) {
  // 是否存在 OptGroup
  let hasOptGroup = false;
  // 是否存在 children 不为字符串的 Option
  let hasComplexLabelInOptions = false;

  // 经过 value 去重并且包含了 OptGroup 的 children 数组
  let childrenList: Array<ReactElement> = [];
  let optionIndexListForArrowKey: Array<number> = [];

  const getChildValue = (child: ReactElement) => {
    const propValue = get(child, 'props.value');
    const propChildren = get(child, 'props.children');
    return propValue === undefined && propChildren !== null && propChildren !== undefined
      ? propChildren.toString()
      : propValue;
  };

  const getChildKey = ({ label, value }, key?, isGroupTitle?) => {
    // 处理自定义节点的 key 值
    if (!label && !value && !key) {
      customNodeCount++;
      return `custom_node_${customNodeCount}`;
    }

    return isGroupTitle
      ? key || `group_${label}`
      : key || `${typeof value}_${value}` || `${label}_${optionInfoMap.size}`;
  };

  const handleOption = (child: ReactElement, origin: OptionInfo['_origin']) => {
    const optionValue = getChildValue(child);

    let isValidOption = true;
    if (filterOption === true) {
      isValidOption =
        optionValue !== undefined &&
        String(optionValue).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
    } else if (typeof filterOption === 'function') {
      isValidOption = !inputValue || filterOption(inputValue, child);
    }

    const existOption = optionInfoMap.get(optionValue);
    const needOverwriteUserCreatedOption =
      existOption?._origin === 'userCreatedOptions' ||
      existOption?._origin === 'userCreatingOption';

    // we don't allow two options with same value
    // however option created by user-inputting can be replaced by option from option property or children
    if (!existOption || needOverwriteUserCreatedOption) {
      if (!('_key' in child.props)) {
        child = React.cloneElement(child, {
          _key: getChildKey(child.props, child.key),
        });
      }

      const index = optionInfoMap.size;
      const option: OptionInfo = {
        child,
        ...child.props,
        value: optionValue,
        _index: index,
        _origin: origin,
        _valid: isValidOption,
      };

      optionInfoMap.set(optionValue, option);

      if (needOverwriteUserCreatedOption) {
        const indexToUpdate = childrenList.findIndex((c) => c?.props?.value === optionValue);
        if (indexToUpdate > -1) {
          isValidOption
            ? (childrenList[indexToUpdate] = child)
            : childrenList.splice(indexToUpdate, 1);
        }
      } else {
        optionValueList.push(optionValue);

        if (isValidOption) {
          childrenList.push(child);

          if (!option.disabled) {
            optionIndexListForArrowKey.push(index);
          }
        }
      }
    }

    if (typeof child.props.children !== 'string') {
      hasComplexLabelInOptions = true;
    }
  };

  const extendChildren = (arr, origin: OptionInfo['_origin']) => {
    if (origin && isArray(arr) && arr.length) {
      (arr as OptionsType).forEach((option) => {
        if (isString(option) || isNumber(option)) {
          option = {
            label: option,
            value: option,
          };
        }

        const child = (
          <Option
            _key={getChildKey(option)}
            value={option.value}
            disabled={option.disabled === true}
            extra={option.extra}
          >
            {fillNBSP(option.label)}
          </Option>
        );
        handleOption(child, origin);
      });
    }
  };

  if (userCreatingOption) {
    extendChildren([userCreatingOption], 'userCreatingOption');
  }

  if (children) {
    React.Children.map(children, (child: React.ReactElement) => {
      if (isSelectOptGroup(child)) {
        const { children, options } = child.props;
        const {
          childrenList: _childrenList,
          optionIndexListForArrowKey: _optionIndexListForArrowKey,
          hasComplexLabelInOptions: _hasComplexLabelInOptions,
        } = flatChildren(
          { children, options, filterOption },
          { inputValue, prefixCls },
          { optionInfoMap, optionValueList, customNodeCount }
        );

        if (_childrenList.length) {
          childrenList.push(
            React.cloneElement(child, {
              children: null,
              _key: getChildKey(child.props, child.key, true),
            })
          );

          childrenList = childrenList.concat(_childrenList);
          optionIndexListForArrowKey = optionIndexListForArrowKey.concat(
            _optionIndexListForArrowKey
          );
          hasOptGroup = true;
          hasComplexLabelInOptions = hasComplexLabelInOptions || _hasComplexLabelInOptions;
        }
      } else if (isSelectOption(child)) {
        handleOption(child, 'children');
      } else if (isObject(child) && child.props) {
        childrenList.push(
          React.cloneElement(child, {
            _key: getChildKey(child.props, child.key),
          })
        );
      }
    });
  }

  extendChildren(options, 'options');
  extendChildren(userCreatedOptions, 'userCreatedOptions');

  return {
    childrenList: getHighlightText({
      nodeList: childrenList,
      pattern: inputValue,
      highlightClassName: `${prefixCls}-highlight`,
    }),
    optionInfoMap,
    optionValueList,
    optionIndexListForArrowKey,
    hasOptGroup,
    hasComplexLabelInOptions,
  };
}

export {
  preventDefaultEvent,
  isEmptyValue,
  getValidValue,
  isSelectOption,
  isSelectOptGroup,
  flatChildren,
};

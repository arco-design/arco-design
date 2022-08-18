import { useState, MutableRefObject, useRef, useCallback } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import { NodeProps } from '../../Tree/interface';
import { LabelValue, TreeSelectProps } from '../interface';
import { KeyCacheType } from './useKeyCache';

import { normalizeValueToArray } from '../utils';
import { isArray, isObject, isUndefined } from '../../_util/is';
import Tree from '../../Tree';
import { getCheckedKeysByInitKeys } from '../../Tree/util';
import useUpdate from '../../_util/hooks/useUpdate';

type valueType = (string | LabelValue)[];

export interface TreeSelectState {
  value: valueType[];
  popupVisible: boolean;
  focused: boolean;
  inputValue: string;
  searchKeys: string[];
}

export const parseValue = (v: valueType, key2nodeProps, valueMap?: LabelValue[]): LabelValue[] => {
  if (v === undefined || v === null) {
    return [];
  }
  const value = isArray(v) ? v : [v];

  return value.map((x) => {
    let result: LabelValue = isObject(x) ? { ...x } : { value: x, label: undefined };

    const item = key2nodeProps[result.value];
    if (item) {
      result.label = result.label || item.title;
      result.disabled = item.disabled;
    } else if (isArray(valueMap)) {
      const v = valueMap.find((y) => y.value === result.value);
      result = {
        ...result,
        ...v,
      };
    }
    if (isUndefined(result.label)) {
      result.label = result.value;
    }
    return result;
  });
};

const getInitCheckKeys = (
  keys: string[],
  key2nodeProps: KeyCacheType,
  indeterminateKeys,
  props: TreeSelectProps
) => {
  if (!props.treeCheckStrictly) {
    const { checkedKeys: allCheckedKeys, indeterminateKeys: halfKeys } = getCheckedKeysByInitKeys(
      keys,
      key2nodeProps
    );

    let checkedKeys = allCheckedKeys;
    indeterminateKeys.current = halfKeys;
    if (props.treeCheckedStrategy === Tree.SHOW_PARENT) {
      checkedKeys = checkedKeys.filter((x) => {
        const item = key2nodeProps[x];
        if (!item || checkedKeys.indexOf(item.parentKey) === -1) {
          return true;
        }
      });
    } else if (props.treeCheckedStrategy === Tree.SHOW_CHILD) {
      checkedKeys = checkedKeys.filter((x) => {
        const item = key2nodeProps[x];
        if (!item || !item.children || !item.children.length) {
          return true;
        }
      });
    }
    return checkedKeys;
  }

  indeterminateKeys.current = [];
  return keys;
};

const useStateValue = (
  props: TreeSelectProps,
  key2nodeProps: KeyCacheType,
  indeterminateKeys: MutableRefObject<string[]>
): [
  LabelValue[],
  (
    v: LabelValue[],
    extra: {
      trigger?: NodeProps;
      checked?: boolean;
      selected?: boolean;
    }
  ) => void
] => {
  const valueCopy = useRef([]);

  const calcValue = (): LabelValue[] => {
    const propsValue = props.value || props.defaultValue || [];
    if (props.treeCheckable) {
      const initCheckedKeys = getInitCheckKeys(
        normalizeValueToArray(propsValue),
        key2nodeProps,
        indeterminateKeys,
        props
      );
      const parsedPropValue = parseValue(propsValue as valueType, key2nodeProps, valueCopy.current);

      const parsedCheckedValue = parseValue(initCheckedKeys, key2nodeProps, parsedPropValue);
      return parsedCheckedValue;
    }

    return parseValue(propsValue as valueType, key2nodeProps);
  };

  const [value, _setValue] = useState<LabelValue[]>(calcValue);

  const setValue = (value) => {
    valueCopy.current = value;
    _setValue(value);
  };

  useUpdate(() => {
    const nextValue = calcValue();

    if ('value' in props) {
      if (props.labelInValue) {
        // 以外部传入为准,只比较value
        if (!isEqualWith(normalizeValueToArray(value), normalizeValueToArray(nextValue))) {
          setValue(nextValue);
        }
      } else if (!isEqualWith(value, nextValue)) {
        setValue(nextValue);
      }
    }
  }, [
    props.treeCheckedStrategy,
    props.treeCheckStrictly,
    props.treeCheckable,
    props.value,
    key2nodeProps,
  ]);

  const setStateValue = useCallback(
    (newValue, extra) => {
      const { onChange, labelInValue } = props;
      const multiple = props.multiple || props.treeCheckable;
      if (!('value' in props)) {
        setValue(newValue);
      }
      let tmp;
      if (multiple) {
        tmp = newValue.map((x) => {
          return labelInValue ? { label: x.label, value: x.value } : x.value;
        });
      } else {
        tmp = labelInValue ? newValue[0] : newValue[0] && newValue[0].value;
      }
      onChange && onChange(tmp, extra);
    },
    [props.onChange, props.labelInValue, props.multiple, props.treeCheckable, props.value]
  );

  return [value, setStateValue];
};

export default useStateValue;

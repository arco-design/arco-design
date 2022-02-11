import { isArray } from '../_util/is';
import Store from './base/store';

export function isEmptyValue(value) {
  return !value || (isArray(value) && value.length === 0);
}

export function getConfig(props) {
  return {
    showEmptyChildren: props.showEmptyChildren,
    changeOnSelect: props.changeOnSelect,
    lazyload: !!props.loadMore,
    fieldNames: props.fieldNames,
    filterOption: props.filterOption,
  };
}

export function getStore(props, value) {
  const tmp = value ? (Array.isArray(value[0]) ? value : [value]) : [];
  return new Store(props.options || [], tmp, getConfig(props));
}

export const formatValue = (value, isMultiple): string[][] | undefined => {
  if (value === undefined) {
    return [];
  }
  if (isMultiple) {
    return value;
  }
  return [value];
};

const ValueSeparator = '__arco_cascader__';

export const transformValuesToSet = (values: string[][]) => {
  const _values = values || [];
  const valuesSet = _values.reduce((set, next) => {
    set.add(next.join(ValueSeparator));
    return set;
  }, new Set());

  return valuesSet;
};

export const valueInSet = (set, value: string[]) => {
  const _value = value || [];
  return set.has(_value.join(ValueSeparator));
};

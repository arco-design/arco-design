import { isArray } from '../_util/is';
import Store from './base/store';
import { CascaderProps } from './interface';

export const ValueSeparator = '__arco_cascader__';

export const SHOW_PARENT = 'parent';
export const SHOW_CHILD = 'child';

export function isEmptyValue(value) {
  return !value || (isArray(value) && value.length === 0);
}

export function getConfig(props: CascaderProps) {
  return {
    showEmptyChildren: props.showEmptyChildren,
    changeOnSelect: props.changeOnSelect,
    lazyload: !!props.loadMore,
    fieldNames: props.fieldNames,
    filterOption: props.filterOption,
    showParent:
      props.mode === 'multiple' && !props.changeOnSelect && props.checkedStrategy === SHOW_PARENT,
  };
}

export function getStore(props, value) {
  const tmp = value ? (Array.isArray(value[0]) ? value : [value]) : [];
  return new Store(props.options || [], tmp, getConfig(props));
}

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

export const removeValueFromSet = (set, value: string[]) => {
  const _value = value || [];
  return set.delete(_value.join(ValueSeparator));
};

export const formatValue = (value, isMultiple, store?): string[][] | undefined => {
  let _value = [];
  if (value === undefined) {
    _value = [];
  } else if (isMultiple) {
    _value = value;
  } else {
    _value = [value];
  }

  if (store && store.config.showParent) {
    const checkedNodes = store.getCheckedNodes();
    const valuesSet = transformValuesToSet(checkedNodes.map((node) => node.pathValue));
    const result = [];
    const temp = {};
    _value.map((v) => {
      v.some((_, index, arr) => {
        const curVal = arr.slice(0, index + 1);
        const pass = valueInSet(valuesSet, curVal);
        if (pass && !temp[curVal.join(ValueSeparator)]) {
          result.push(curVal);
          temp[curVal.join(ValueSeparator)] = 1;
        }
        return pass;
      });
    });

    return result;
  }
  return _value;
};

export const getMultipleCheckValue = (propsValue, store: Store<any>, option, checked) => {
  const beforeValueSet = store.getCheckedNodes().reduce((set, node) => {
    set.add(node.pathValue.join(ValueSeparator));
    return set;
  }, new Set());

  option.setCheckedState(checked);
  const checkedNodes = store.getCheckedNodes();
  const currentValue = checkedNodes.map((node) => node.pathValue);
  const currentValueSet = transformValuesToSet(currentValue);

  const newValueSet = new Set();
  return propsValue
    .filter((v) => {
      // v 不在 beforeValueSet 中，说明 v 不包含对应的option。直接返回true，不应该清除掉。
      if (!valueInSet(beforeValueSet, v) || valueInSet(currentValueSet, v)) {
        newValueSet.add(v.join(ValueSeparator));
        return true;
      }
    })
    .concat(
      currentValue.filter((v) => {
        return !valueInSet(newValueSet, v);
      })
    );
};

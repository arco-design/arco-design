import React, { useRef } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import get from 'lodash/get';
import FormItem from './form-item';
import { FormListProps, KeyType } from './interface';
import { isFunction, isUndefined } from '../_util/is';
import { FormInstance } from '.';
import { isSyntheticEvent } from './utils';
import warning from '../_util/warning';
import { FormListContext } from './context';

const isIndexLegal = (index: number, value) => {
  return !isUndefined(index) && index >= 0 && index < value.length;
};

const List = <
  SubFieldValue extends unknown = any,
  SubFieldKey extends KeyType = string,
  FieldKey extends KeyType = string
>(
  props: FormListProps<SubFieldValue, SubFieldKey, FieldKey>
) => {
  const { field, children, initialValue } = props;
  const keysRef = useRef<{ keys: number[]; id: number }>({
    id: 0,
    keys: [],
  });

  const extra = 'initialValue' in props ? { initialValue } : {};

  const currentKeys = keysRef.current.keys;

  return (
    <FormListContext.Provider
      value={{
        getItemKey: (fieldKey) => {
          const keys = fieldKey?.replace(/\[|\]/g, '.').split('.');
          const startIndex = keys.indexOf(field);
          const index = keys[startIndex + 1];

          return `${field}_${currentKeys.indexOf(index)}_${keys.slice(startIndex + 2).join('_')}`;
        },
      }}
    >
      <FormItem
        field={field}
        {...extra}
        isFormList
        noStyle
        shouldUpdate={(prev, current, info) => {
          if (info && info.isInner && !info.isFormList && info.field !== field) {
            // 如果是内部控件触发的value更新，那么不需要重新渲染整个formList。
            // info.field !== field 判断是因为如果内部修改了整个formList所绑定field的值的时候， 需要rerender，常见于formList嵌套formList

            return false;
          }
          return !isEqualWith(get(prev, field), get(current, field));
        }}
      >
        {(_, methods: FormInstance) => {
          const { getFieldValue, getInnerMethods } = methods;
          const { innerSetFieldValue } = getInnerMethods(true);
          const values = getFieldValue(field) || [];

          const add = function (defaultValue?: any, index?: number) {
            if (isSyntheticEvent(defaultValue)) {
              warning(
                true,
                'Form.List: The event object cannot be used as a parameter of the add method'
              );
              return;
            }
            const key = keysRef.current.id;

            keysRef.current.id += 1;
            const oldValue = getFieldValue(field) || [];
            let newValue = oldValue;
            if (index !== undefined && index >= 0 && index <= oldValue.length) {
              currentKeys.splice(index, 0, key);
              newValue = [...oldValue.slice(0, index), defaultValue, ...oldValue.slice(index)];
            } else {
              currentKeys.push(key);
              newValue = [...oldValue, defaultValue];
            }

            // defaultValue = undefined 时，认为当前字段未被操作过
            innerSetFieldValue(field, newValue, {
              isFormList: true,
              ignore: defaultValue === undefined,
            });
          };

          const remove = function (index: number) {
            const value = getFieldValue(field) || [];
            const newValue = value.filter((_, i) => i !== index);
            currentKeys.splice(index, 1);
            innerSetFieldValue(field, [...newValue], { isFormList: true });
          };

          const move = function (fromIndex: number, toIndex: number) {
            const value = getFieldValue(field) || [];
            if (
              fromIndex === toIndex ||
              !isIndexLegal(fromIndex, value) ||
              !isIndexLegal(toIndex, value)
            ) {
              return;
            }
            const fromId = currentKeys[fromIndex];
            currentKeys.splice(fromIndex, 1);
            currentKeys.splice(toIndex, 0, fromId);

            const fromItem = value[fromIndex];

            const newValue = [...value];
            newValue.splice(fromIndex, 1);
            newValue.splice(toIndex, 0, fromItem);

            innerSetFieldValue(field, newValue, { isFormList: true });
          };

          return (
            isFunction(children) &&
            children(
              values.map((_, index) => {
                let key = currentKeys[index];
                if (key === undefined) {
                  key = keysRef.current.id;
                  currentKeys.push(key);
                  keysRef.current.id += 1;
                }
                return {
                  field: `${field}[${index}]`,
                  key,
                };
              }),
              {
                add,
                remove,
                move,
              }
            )
          );
        }}
      </FormItem>
    </FormListContext.Provider>
  );
};

List.displayName = 'FormList';

export default List;

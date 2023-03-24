import React, { useRef } from 'react';
import get from 'lodash/get';
import FormItem from './form-item';
import { FormListProps, KeyType } from './interface';
import { isFunction, isUndefined } from '../_util/is';
import { isFieldMatch, isSyntheticEvent } from './utils';
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
      <FormItem<any, SubFieldValue[], FieldKey>
        field={field}
        {...extra}
        isFormList
        rules={props.rules}
        wrapperCol={{ span: 24 }}
        noStyle={'noStyle' in props ? props.noStyle : !props.rules}
        shouldUpdate={(prev, current, info) => {
          if (info && !info.isInner && isFieldMatch(info.field, [field])) {
            if (get(prev, field)?.length !== get(current, field)?.length) {
              // 长度不一致才需要整体渲染，如 form.setfieldsValue('a.100', 'xx')
              // 修改了某一项的话直接叫给对应的 FormItem 渲染即可
              return true;
            }
          }
          return false;
        }}
      >
        {(_, store, { value: _value, onChange }) => {
          const value = _value || [];

          // 为啥 add，move，remove 里不直接用 value，而是又 getFieldValue？
          // 因为用户可能把 add，remove，move 给 memo 了，导致 remove 直接读取的 value 不是最新的
          // 保持和 2.46.0 以前的版本一致

          const add = function (defaultValue?: any, index?: number) {
            if (isSyntheticEvent(defaultValue)) {
              warning(
                true,
                'Form.List: The event object cannot be used as a parameter of the add method'
              );
              return;
            }
            const value = store.getInnerMethods(true)?.innerGetFieldValue(field) || [];
            const key = keysRef.current.id;

            keysRef.current.id += 1;
            const oldValue = value || [];
            let newValue = oldValue;
            if (index !== undefined && index >= 0 && index <= oldValue.length) {
              currentKeys.splice(index, 0, key);
              newValue = [...oldValue.slice(0, index), defaultValue, ...oldValue.slice(index)];
            } else {
              currentKeys.push(key);
              newValue = [...oldValue, defaultValue];
            }

            // defaultValue = undefined 时，认为当前字段未被操作过
            onChange(newValue, {
              isFormList: true,
              ignore: defaultValue === undefined,
            });
          };

          const remove = function (index: number) {
            const value = store.getInnerMethods(true)?.innerGetFieldValue(field) || [];
            const newValue = value.filter((_, i) => i !== index);
            currentKeys.splice(index, 1);
            onChange([...newValue], { isFormList: true });
          };

          const move = function (fromIndex: number, toIndex: number) {
            const value = store.getInnerMethods(true)?.innerGetFieldValue(field) || [];
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

            onChange(newValue, { isFormList: true });
          };

          return (
            isFunction(children) &&
            children(
              value.map((_, index) => {
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

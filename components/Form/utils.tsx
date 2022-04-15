import cloneDeepWith from 'lodash/cloneDeepWith';
import lodashSet from 'lodash/set';
import { PropertyPath } from 'lodash';
import { Schema, SchemaType, ValidateMessagesType } from 'b-validate';
import { ReactNode } from 'react';
import { isArray, isObject, isFunction } from '../_util/is';
import { IndexedObject } from './interface';
import { RulesProps } from '..';

export function cloneDeep(value) {
  // 只有对象才执行拷贝，否则直接返回。 如果是 File，MouseEvent对象，都可以直接返回
  return cloneDeepWith(value, (val) => {
    if (!isObject(val) && !isArray(val)) {
      return val;
    }
  });
}

export const formatValidateMsg = (
  validateMessages: ValidateMessagesType,
  info: { label: ReactNode }
) => {
  return cloneDeepWith(validateMessages, (val) => {
    if (isFunction(val)) {
      return (data) => {
        return val(data, info);
      };
    }
  });
};

export function set<T extends IndexedObject>(target: T, field: PropertyPath, value: any) {
  lodashSet(target, field, cloneDeep(value));
  return target;
}

// iteratively get all keys of object including nested objects
// e.g. const myObj = { a: { b: { c: [1,2] } } }
// iterativelyGetKeys(myObj) returns ['a.b.0.c.0', 'a.b.0.c.1']
// reference https://stackoverflow.com/a/47063174
export function iterativelyGetKeys(obj, prefix = '') {
  if (!obj) {
    return [];
  }
  return Object.keys(obj).reduce((res, el) => {
    if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...iterativelyGetKeys(obj[el], `${prefix + el}.`)];
    }
    return [...res, prefix + el];
  }, []);
}

// 判断是否是个事件对象 e?.constructor?.name 可能不是 SyntheticEvent，跟业务项目的打包方式有关系
export function isSyntheticEvent(e: any): boolean {
  return e?.constructor?.name === 'SyntheticEvent' || e?.nativeEvent instanceof Event;
}

export async function schemaValidate(field, value, _rules: RulesProps[], validateMessages) {
  const rules: RulesProps[] = [..._rules];
  let current = 0;

  return new Promise(async (resolve) => {
    const warning = [];
    const validate = async (rule: RulesProps) => {
      const next = () => {
        if (current < rules.length - 1) {
          current++;
          return validate(rules[current]);
        }

        return resolve({ error: null, warning });
      };

      if (!rule) {
        return next();
      }

      const _rule = { ...rule };
      if (!_rule.type && !_rule.validator) {
        _rule.type = 'string';
      }
      const schema = new Schema({ [field]: [_rule] } as SchemaType, {
        ignoreEmptyString: true,
        validateMessages,
      });

      schema.validate({ [field]: value }, (error) => {
        if (error) {
          if (rule.validateLevel === 'warning') {
            warning.push(error[field].message);
          } else {
            return resolve({
              error,
              warning,
            });
          }
        }
        return next();
      });
    };
    validate(rules[current]);
  });
}

export const ID_SUFFIX = '_input';

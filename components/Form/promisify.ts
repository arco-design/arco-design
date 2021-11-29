// https://github.com/RyanZim/universalify/blob/master/index.js

import { KeyType, ValidateFieldsErrors } from './interface';

// form validate error
class ValidateError<FieldValue = any, FieldKey extends KeyType = string> extends Error {
  errors?: ValidateFieldsErrors<FieldValue, FieldKey> = {} as ValidateFieldsErrors<
    FieldValue,
    FieldKey
  >;

  constructor(errors?: ValidateFieldsErrors<FieldValue, FieldKey>) {
    super('form validate error, get errors by error.errors');

    this.errors = errors;
  }
}

function promisify<T = any>(fn: (...args: any[]) => any): () => Promise<T> {
  return Object.defineProperty(
    function (...args: any[]) {
      if (typeof args[args.length - 1] === 'function') fn.apply(this, args);
      else {
        return new Promise((resolve, reject) => {
          args[args.length] = (err, res) => {
            if (err) return reject(new ValidateError(err));
            resolve(res);
          };
          args.length++;
          fn.apply(this, args);
        });
      }
    },
    'name',
    { value: fn.name }
  );
}

export default promisify;

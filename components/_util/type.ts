import React from 'react';
// https://stackoverflow.com/questions/48215950/exclude-property-from-type
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Tag = string | typeof React.Component;
export type ValueOrFunc<T> = T | ((any) => T);

export type NestedKeyOf<T> = T extends object
  ? T extends Array<infer U>
    ? U extends object
      ?
          | `${number}`
          | `[${number}]`
          | `${number}.${NestedKeyOf<U>}`
          | `[${number}].${NestedKeyOf<U>}`
      : `${number}` | `[${number}]`
    : {
        [Key in keyof T & (string | number)]: NonNullable<T[Key]> extends object
          ? T[Key] extends Array<infer U>
            ?
                | `${Key}`
                | `${Key}[${number}]`
                | `${Key}.${number}`
                | `${Key}[${number}].${NestedKeyOf<U>}`
                | `${Key}.${number}.${NestedKeyOf<U>}`
            : `${Key}` | `${Key}.${NestedKeyOf<T[Key]>}`
          : `${Key}`;
      }[keyof T & (string | number)]
  : never;

import React from 'react';
// https://stackoverflow.com/questions/48215950/exclude-property-from-type
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Tag = string | typeof React.Component;
export type ValueOrFunc<T> = T | ((any) => T);

// for array
// | `${Key}`
// | `${Key}[${number}]`
// | `${Key}.${number}`
// | `${Key}[${number}].${NestedKeyOf<NonNullable<ObjectType[Key]>[0]>}`
// | `${Key}.${number}.${NestedKeyOf<NonNullable<ObjectType[Key]>[0]>}`

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: NonNullable<ObjectType[Key]> extends object
    ? NonNullable<ObjectType[Key]> extends any[]
      ? `${Key}`
      : `${Key}` | `${Key}.${NestedKeyOf<NonNullable<ObjectType[Key]>>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

import React from 'react';
// https://stackoverflow.com/questions/48215950/exclude-property-from-type
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Tag = string | typeof React.Component;
export type ValueOrFunc<T> = T | ((any) => T);

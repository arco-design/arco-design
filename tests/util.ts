import { render as ORender, RenderOptions } from '@testing-library/react';
import React from 'react';

export * from '@testing-library/react';

// import '@testing-library/jest-dom';

export const $ = function (classNames) {
  return document.querySelectorAll(classNames);
};

export const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(null), time));

export const render = (ui: React.ReactElement, options?: RenderOptions) => {
  const wrapper = {
    ...ORender(ui, {
      // container: document.body,
      ...options,
    }),
  } as ReturnType<typeof ORender> & {
    querySelector: <T extends Element>(selector: string) => T | null;
    find: <E extends Element>(selector: string) => NodeListOf<E>;
  };

  wrapper.find = <E extends Element>(selector) => {
    return document.querySelectorAll<E>(selector);
  };
  wrapper.querySelector = <T extends Element>(selector) => {
    return document.querySelector<T>(selector);
  };

  return wrapper;
};

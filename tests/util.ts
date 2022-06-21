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
    querySelector: (selector: string) => Element;
    find: (selector: string) => NodeListOf<any>;
  };

  wrapper.find = (selector) => {
    return document.querySelectorAll(selector);
  };
  wrapper.querySelector = (selector) => {
    return document.querySelector(selector) as Element;
  };

  return wrapper;
};

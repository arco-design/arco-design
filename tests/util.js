export const $ = function(classNames) {
  return document.querySelectorAll(classNames);
};

export const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

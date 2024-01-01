import React, { ReactElement } from 'react';
import { isFragment } from 'react-is';

const toArray = (children: any, ingoreEmpty = true, list: ReactElement[] = []) => {
  React.Children.forEach(children, (c: any) => {
    if ((c === null || c === undefined) && ingoreEmpty) return;
    if (Array.isArray(c)) {
      toArray(c, ingoreEmpty, list);
    } else if (isFragment(c) && c?.props?.children) {
      toArray(c.props.children, ingoreEmpty, list);
    } else {
      list.push(c);
    }
  });
  return list;
};

export default toArray;

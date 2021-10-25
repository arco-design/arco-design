/** merge multiple children to a string node */

import React from 'react';
import { isString, isNumber } from './is';

const isSingleNode = (child: React.ReactNode) => {
  return isString(child) || isNumber(child);
};

export default function mergedToString(children: any): string {
  const mergedResult = [''];
  React.Children.forEach(children, (child) => {
    const prevIndex = mergedResult.length - 1;
    const prevChild = mergedResult[prevIndex];

    if (isSingleNode(child) && isSingleNode(prevChild)) {
      mergedResult[prevIndex] = `${prevChild}${child}`;
    } else if (child && child.props && child.props.children) {
      mergedResult.push(mergedToString(child.props.children));
    }
  });

  return mergedResult.join('');
}

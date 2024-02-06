import React from 'react';
import { isFragment } from 'react-is';

export default function toArray(children) {
  let childrenList = [];
  React.Children.forEach(children, (child) => {
    if (isFragment(child) && child.props) {
      childrenList = childrenList.concat(toArray(child.props.children));
    } else if (child !== null && child !== undefined) {
      childrenList.push(child);
    }
  });

  return childrenList;
}

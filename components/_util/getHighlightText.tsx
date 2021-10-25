import React from 'react';
import { isArray } from './is';
import cs from './classNames';

export default function getHighlightText<T>({
  nodeList,
  pattern,
  highlightClassName,
}: {
  nodeList: T;
  pattern: string | RegExp;
  highlightClassName: string | string[];
}): T {
  if (!pattern) {
    return nodeList;
  }

  const transformNode = (node) => {
    if (node && node.props && typeof node.props.children === 'string') {
      const { children } = node.props;
      return React.cloneElement(node, {
        children: (() => {
          let indexOfNextRegTest = 0;
          const result = [];

          // 首先进行正则查询，将匹配项和匹配项之间的字符串依次拼接
          children.replace(pattern, (...args) => {
            const match = args[0];
            const index = args[args.length - 2];

            // 与上次匹配项之间的内容
            if (index > indexOfNextRegTest) {
              result.push(children.slice(indexOfNextRegTest, index));
            }

            // 当前匹配项
            result.push(
              <span key={index} className={cs(highlightClassName)}>
                {match}
              </span>
            );
            indexOfNextRegTest = index + match.length;
          });

          // 最后将剩余未被匹配的字符串拼接到最后
          result.push(children.slice(indexOfNextRegTest));

          return result;
        })(),
      });
    }

    return node;
  };

  return isArray(nodeList) ? nodeList.map((node) => transformNode(node)) : transformNode(nodeList);
}

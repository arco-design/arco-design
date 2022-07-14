import escapeRegExp from 'lodash/escapeRegExp';
import React, { cloneElement } from 'react';
import { isArray } from './is';

export default function getHighlightText<T>({
  nodeList,
  pattern,
  highlightClassName,
}: {
  nodeList: T;
  pattern: string;
  highlightClassName: string;
}): T {
  if (!pattern) {
    return nodeList;
  }

  const transformNode = (node) => {
    if (node && node.props && typeof node.props.children === 'string') {
      return cloneElement(
        node,
        undefined,
        <HighlightText
          text={node.props.children}
          keyword={pattern}
          highlightClassName={highlightClassName}
        />
      );
    }

    return node;
  };

  return isArray(nodeList) ? nodeList.map((node) => transformNode(node)) : transformNode(nodeList);
}

function HighlightText({
  text,
  keyword,
  highlightClassName,
}: {
  text: string;
  keyword?: string;
  highlightClassName?: string;
}) {
  if (!keyword) return <>{text}</>;

  // 注意这里的括号，这里使用了带capture group功能的正则，来split字符串
  // 从而在strArr中可以保留匹配文本
  const re = new RegExp(`(${escapeRegExp(keyword)})`, 'i');
  const strArr = text.split(re);

  return (
    <>
      {strArr.map((item, index) =>
        re.test(item) ? (
          <span key={index} className={highlightClassName}>
            {item}
          </span>
        ) : (
          <span key={index}>{item}</span>
        )
      )}
    </>
  );
}

// just to resolve CssTransition findDOMNode
import React, { ReactElement, cloneElement, isValidElement, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { supportRef } from './is';
import { callbackOriginRef, findDOMNode } from './react-dom';

export default function ArcoCSSTransition(props: CSSTransition) {
  const { children, ...rest } = props;
  const nodeRef = useRef();
  const flagRef = useRef<boolean>();

  const dom = useMemo(() => {
    // 只处理 div， span 之类的 children 即可
    if (props.nodeRef === undefined && supportRef(children) && isValidElement(children)) {
      flagRef.current = true;
      return cloneElement(children as ReactElement, {
        ref: (node) => {
          nodeRef.current = findDOMNode(node);
          callbackOriginRef(children, node);
        },
      });
    }
    flagRef.current = false;
    return children;
  }, [children, props.nodeRef]);

  if (flagRef.current) {
    ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach((key) => {
      if (props[key]) {
        rest[key] = (_maybeNode, ...args) => {
          props[key](nodeRef.current, ...args);
        };
      }
    });
  }

  return (
    <CSSTransition {...rest} nodeRef={flagRef.current ? nodeRef : undefined}>
      {dom}
    </CSSTransition>
  );
}

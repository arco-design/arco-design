import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import ResizeObserver from '../../_util/resizeObserver';
import { ConfigContext } from '../../ConfigProvider';
import classNames from '../../_util/classNames';

interface OverflowItemProps {
  className?: string | string[];
  onResize: (node: HTMLDivElement) => void;
  unregister: (node: HTMLDivElement) => void;
  hidden?: boolean;
  children: ReactNode;
}

export default function OverflowItem(props: OverflowItemProps) {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('overflow-item');
  const itemRef = useRef<HTMLDivElement>();

  useEffect(() => {
    props.onResize(itemRef.current);

    return () => {
      props.unregister(itemRef.current);
    };
  }, []);

  const hidden = props.hidden;

  return (
    <ResizeObserver
      onResize={(entry) => {
        props.onResize(entry?.[0].target as HTMLDivElement);
      }}
    >
      <div
        ref={itemRef}
        className={classNames(prefixCls, props.className, {
          [`${prefixCls}-hidden`]: hidden,
        })}
      >
        {props.children}
      </div>
    </ResizeObserver>
  );
}

import React from 'react';

export default function MenuIndent(props: {
  prefixCls: string;
  level?: number;
  levelIndent?: number;
}) {
  const { prefixCls, levelIndent } = props;
  const level = props.level - 1;
  return level > 0 ? (
    <span>
      {[...new Array(level)].map((_, index) => {
        return (
          <span key={index} className={`${prefixCls}-indent`} style={{ width: levelIndent }} />
        );
      })}
    </span>
  ) : null;
}

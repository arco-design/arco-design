import React, { CSSProperties, useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { isNumber } from '../_util/is';

export interface DotProps {
  size?: CSSProperties['fontSize'];
}

export default function DotLoading(props: DotProps) {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = `${getPrefixCls('spin')}-dot`;

  const dotStyle = {
    width: props.size,
    height: props.size,
  };

  const sizeNumber = props.size ? parseInt(String(props.size)) : 0;

  return (
    <div
      className={`${prefixCls}-list`}
      style={{
        height: props.size,
        width: isNumber(sizeNumber) && sizeNumber > 0 ? sizeNumber * 7 : '',
      }}
    >
      {[...new Array(5)].map((_, index) => {
        return <div key={index} className={prefixCls} style={dotStyle} />;
      })}
    </div>
  );
}

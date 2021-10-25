import React from 'react';
import { SkeletonImageProps } from './interface';
import cs from '../_util/classNames';

export default function image(props: SkeletonImageProps) {
  const { style, shape = 'square', size, position = 'left', className, prefixCls } = props;
  const classNames = cs(
    `${prefixCls}-image`,
    {
      [`${prefixCls}-image-${position}`]: position,
      [`${prefixCls}-image-${shape}`]: shape,
      [`${prefixCls}-image-${size}`]: size,
    },
    className
  );
  return <div className={classNames} style={style} />;
}

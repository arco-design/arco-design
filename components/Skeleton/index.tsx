import React, { forwardRef, useContext, PropsWithChildren } from 'react';
import cs from '../_util/classNames';
import { isObject } from '../_util/is';
import { SkeletonProps } from './interface';
import Text from './text';
import Image from './image';
import { ConfigContext } from '../ConfigProvider';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';

function getComponentProps(prop) {
  return isObject(prop) ? prop : {};
}

const defaultProps: SkeletonProps = {
  text: true,
  loading: true,
};

function Skeleton(baseProps: PropsWithChildren<SkeletonProps>, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<SkeletonProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Skeleton
  );
  const { style, className, animation, loading, image, text, children } = props;

  const imageProps = getComponentProps(image);
  const textProps = getComponentProps(text);
  const prefixCls = getPrefixCls('skeleton');
  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-animate`]: animation,
      [`${prefixCls}-rtl`]: rtl,
    },
    className
  );

  function renderImage() {
    return (
      image && (
        <div className={`${prefixCls}-header`}>
          <Image prefixCls={prefixCls} {...imageProps} />
        </div>
      )
    );
  }

  function renderText() {
    return (
      text && (
        <div className={`${prefixCls}-content`}>
          <Text prefixCls={prefixCls} {...textProps} />
        </div>
      )
    );
  }

  return (
    <React.Fragment>
      {loading ? (
        <div {...pickDataAttributes(props)} className={classNames} style={style} ref={ref}>
          {imageProps.position !== 'right' && renderImage()}
          {renderText()}
          {imageProps.position === 'right' && renderImage()}
        </div>
      ) : (
        children
      )}
    </React.Fragment>
  );
}

const SkeletonComponent = forwardRef<unknown, PropsWithChildren<SkeletonProps>>(Skeleton);

SkeletonComponent.displayName = 'Skeleton';

export default SkeletonComponent;

export { SkeletonProps };

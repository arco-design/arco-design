import React, { memo, useContext, forwardRef } from 'react';
import IconEmpty from '../../icon/react-icon/IconEmpty';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import { EmptyProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

function Empty(baseProps: EmptyProps, ref) {
  const { getPrefixCls, locale: globalLocale, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<EmptyProps>(baseProps, {}, componentConfig?.Empty);
  const { style, className, description, icon, imgSrc, ...rest } = props;

  const prefixCls = getPrefixCls('empty');
  const classNames = cs(prefixCls, className);
  const noData = globalLocale.Empty.noData;
  const alt = typeof description === 'string' ? description : 'empty';

  return (
    <div ref={ref} className={classNames} style={style} {...rest}>
      <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-image`}>
          {imgSrc ? <img alt={alt} src={imgSrc} /> : icon || <IconEmpty />}
        </div>
        <div className={`${prefixCls}-description`}>{description || noData}</div>
      </div>
    </div>
  );
}

const EmptyComponent = forwardRef<unknown, EmptyProps>(Empty);

EmptyComponent.displayName = 'Empty';

export default memo(EmptyComponent);

export { EmptyProps };

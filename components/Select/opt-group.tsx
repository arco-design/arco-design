import React from 'react';
import { OptGroupProps } from './interface';
import omit from '../_util/omit';

function OptGroup(props: OptGroupProps, ref) {
  const { prefixCls, label, ...rest } = props;
  return (
    <li
      ref={ref}
      className={`${prefixCls}-group-title`}
      {...omit(rest, ['_key', 'children', 'isSelectOptGroup'])}
    >
      {label}
    </li>
  );
}

const OptGroupComponent = React.forwardRef<unknown, OptGroupProps>(OptGroup);

OptGroupComponent.defaultProps = {
  // private use
  isSelectOptGroup: true,
};

export default OptGroupComponent;

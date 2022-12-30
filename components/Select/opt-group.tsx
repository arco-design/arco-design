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

const ForwardRefOptGroup = React.forwardRef<unknown, OptGroupProps>(OptGroup);

const OptGroupComponent = ForwardRefOptGroup as typeof ForwardRefOptGroup & {
  __ARCO_SELECT_OPTGROUP__?: boolean;
};

OptGroupComponent.__ARCO_SELECT_OPTGROUP__ = true;

export default OptGroupComponent;

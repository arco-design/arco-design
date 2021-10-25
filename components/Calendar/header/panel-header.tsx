import React from 'react';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import IconDoubleLeft from '../../../icon/react-icon/IconDoubleLeft';
import IconDoubleRight from '../../../icon/react-icon/IconDoubleRight';
import { isArray } from '../../_util/is';
import cs from '../../_util/classNames';

function PanelHeader(props) {
  const {
    prefixCls,
    changePageShowDate,
    headerValueFormat,
    mergedPageShowDate,
    innerMode,
    panelOperations,
  } = props;

  const isOperationAvailable = (operation) => {
    return isArray(panelOperations) ? panelOperations.indexOf(operation) > -1 : true;
  };
  const showDoubleLeft = isOperationAvailable('double-left');
  const showLeft = isOperationAvailable('left') && innerMode !== 'year';
  const showDoubleRight = isOperationAvailable('double-right');
  const showRight = isOperationAvailable('right') && innerMode !== 'year';

  const getIconClassName = (isShow) => {
    return cs(`${prefixCls}-header-icon`, { [`${prefixCls}-header-icon-hidden`]: !isShow });
  };

  return (
    <div className={`${prefixCls}-header`}>
      <div
        className={getIconClassName(showDoubleLeft)}
        onClick={() => showDoubleLeft && changePageShowDate('prev', 'year')}
      >
        {showDoubleLeft && <IconDoubleLeft />}
      </div>
      <div
        className={getIconClassName(showLeft)}
        onClick={() => showLeft && changePageShowDate('prev', 'month')}
      >
        {showLeft && <IconLeft />}
      </div>
      <div className={`${prefixCls}-header-value`}>
        {mergedPageShowDate.format(headerValueFormat)}
      </div>
      <div
        className={getIconClassName(showRight)}
        onClick={() => showRight && changePageShowDate('next', 'month')}
      >
        {showRight && <IconRight />}
      </div>
      <div
        className={getIconClassName(showDoubleRight)}
        onClick={() => showDoubleRight && changePageShowDate('next', 'year')}
      >
        {showDoubleRight && <IconDoubleRight />}
      </div>
    </div>
  );
}

export default PanelHeader;

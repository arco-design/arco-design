import React from 'react';
import { SummaryContext } from '../summary/context';
import { TfootProps } from '../interface';

function Tfoot<T>(props: TfootProps<T>) {
  const { summary, data, prefixCls, columns, stickyOffsets, stickyClassNames } = props;

  return (
    <tfoot className={`${prefixCls}-tfoot`}>
      <SummaryContext.Provider value={{ columns, stickyOffsets, stickyClassNames, prefixCls }}>
        {summary(data)}
      </SummaryContext.Provider>
    </tfoot>
  );
}

export default Tfoot;

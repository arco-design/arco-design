import React, { forwardRef, useContext } from 'react';
import { TypographyParagraphProps } from './interface';
import Base from './base';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';

function ParagraphComponent(props: TypographyParagraphProps, ref) {
  const { spacing = 'default', className } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('typography');
  const classNames = spacing === 'close' ? cs(`${prefixCls}-spacing-close`, className) : className;

  return <Base {...props} ref={ref} componentType="Paragraph" className={classNames} />;
}

const Paragraph = forwardRef<unknown, TypographyParagraphProps>(ParagraphComponent);

Paragraph.displayName = 'Paragraph';

export default Paragraph;

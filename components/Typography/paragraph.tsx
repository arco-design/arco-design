import React, { useContext } from 'react';
import { TypographyParagraphProps } from './interface';
import Base from './base';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';

function Paragraph(props: TypographyParagraphProps) {
  const { spacing = 'default', className } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('typography');
  const classNames = spacing === 'close' ? cs(`${prefixCls}-spacing-close`, className) : className;

  return <Base {...props} componentType="Paragraph" className={classNames} />;
}

Paragraph.displayName = 'Paragraph';

export default Paragraph;

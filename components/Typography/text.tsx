import React from 'react';
import { TypographyTextProps } from './interface';
import Base from './base';

function Text(props: TypographyTextProps) {
  return <Base {...props} componentType="Text" />;
}

Text.displayName = 'Text';

export default Text;

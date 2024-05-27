import React, { forwardRef } from 'react';
import { TypographyTextProps } from './interface';
import Base from './base';

function TextComponent(props: TypographyTextProps, ref) {
  return <Base {...props} componentType="Text" ref={ref} />;
}

const Text = forwardRef(TextComponent);

Text.displayName = 'Text';

export default Text;

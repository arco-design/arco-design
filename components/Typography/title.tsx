import React from 'react';
import { TypographyTitleProps } from './interface';
import Base from './base';

function Title(props: TypographyTitleProps) {
  const { heading = 1, ...rest } = props;
  return <Base heading={heading} {...rest} componentType="Title" />;
}

Title.displayName = 'Title';

export default Title;

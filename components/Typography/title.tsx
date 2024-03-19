import React, { forwardRef } from 'react';
import { TypographyTitleProps } from './interface';
import Base from './base';

function TitleComponent(props: TypographyTitleProps, ref) {
  const { heading = 1, ...rest } = props;
  return <Base heading={heading} {...rest} componentType="Title" ref={ref} />;
}

const Title = forwardRef(TitleComponent);

Title.displayName = 'Title';

export default Title;

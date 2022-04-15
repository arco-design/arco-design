import React, { useState } from 'react';
import { Typography } from '@self';

const defaultText = `A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. `;

const ellipsisProps = { rows: 2 };
const Demo = () => {
  return (
    <div>
      <Typography.Paragraph code ellipsis={ellipsisProps}>
        {defaultText}
      </Typography.Paragraph>
      <Typography.Paragraph bold underline ellipsis={ellipsisProps}>
        {defaultText}
      </Typography.Paragraph>
      <Typography.Paragraph mark ellipsis={ellipsisProps}>
        {defaultText}
      </Typography.Paragraph>
      <Typography.Text underline ellipsis={ellipsisProps}>
        {defaultText}
      </Typography.Text>
      <Typography.Text delete ellipsis={ellipsisProps}>
        {defaultText}
      </Typography.Text>
    </div>
  );
};

export default Demo;

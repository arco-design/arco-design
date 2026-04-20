/* eslint-disable no-console */
import React from 'react';
import { Typography } from '@self';

const text =
  'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';

export const Demo = () => (
  <div>
    <Typography.Ellipsis rows={2}>{text}</Typography.Ellipsis>
    <h3>字体12px; line-height: 1.5</h3>
    <Typography.Ellipsis style={{ fontSize: 12, lineHeight: 1.5 }} rows={2}>
      {text}
    </Typography.Ellipsis>
  </div>
);

export default {
  title: 'Ellipsis',
};

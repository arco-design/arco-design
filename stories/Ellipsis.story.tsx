/* eslint-disable no-console */
import React from 'react';
import { Ellipsis } from '@self';

const text =
  'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';

export const Demo = () => (
  <div>
    <Ellipsis rows={2} tooltip>
      {text}
    </Ellipsis>
  </div>
);

export default {
  title: 'Ellipsis',
};

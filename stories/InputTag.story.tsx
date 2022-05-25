import React from 'react';
import { InputTag } from '@self';
import { IconBook } from '@self/icon';

export const Demo = () => (
  <InputTag dragToSort defaultValue={['1', '2', '3']} allowClear suffix={<IconBook />} />
);

export default {
  title: 'InputTag',
};

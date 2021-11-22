import React from 'react';
import { InputTag } from '@self';
import { IconBook } from '@self/icon';

export default function () {
  return (
    <InputTag
      dragToSort
      defaultValue={['1', '2', '3']}
      allowClear
      suffix={<IconBook />}
    />
  );
}

import React from 'react';
import { InputTag } from '@self';
import { IconBook } from '@self/icon';

export default function() {
  return <InputTag allowClear suffix={<IconBook />} />;
}

import React from 'react';
import { InputTag } from '@self';

export const Demo = () => {
  const placeholder = 'Please input';
  return <InputTag defaultValue={['1', '2', '3']} dragToSort placeholder={placeholder} />;
};

export default {
  title: 'InputTag',
};

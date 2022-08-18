import React from 'react';
import { InputTag } from '@self';

export const Demo = () => {
  const placeholder = 'Please input';
  return <InputTag disabled readOnly error placeholder={placeholder} />;
};

export default {
  title: 'InputTag',
};

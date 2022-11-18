import React, { useState } from 'react';
import { InputNumber } from '@self';

function Demo1() {
  const [value, setValue] = useState(1e20);
  return (
    <InputNumber
      strictMode
      mode="button"
      value={value}
      step={1e-20}
      onChange={(value) => {
        console.log('InputNumber value is ', value);
        setValue(value);
      }}
    />
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'InputNumber',
};

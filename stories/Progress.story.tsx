import React, { useState } from 'react';
import { Progress, InputNumber } from '@self';

function Demo1() {
  const [value, setValue] = useState<number>(800);

  return (
    <div style={{ width: 600 }}>
      <Progress percent={value} />
      <Progress percent={value} status="success" />
      <Progress percent={value} status="error" />
      <br />
      <Progress percent={value} animation />
      <br />
      <Progress percent={value} status="error" animation />
      <br />
      <Progress percent={value} status="success" />
      <br />
      <Progress percent={value} status="warning" />
      <br />
      <Progress percent={value} />
      <br />
      <Progress percent={value} status="error" type="circle" />
      <Progress percent={value} status="warning" type="circle" />
      <Progress percent={value} status="success" type="circle" />
      <Progress percent={value} type="circle" />
      <br />

      <InputNumber min={0} max={100} step={5} value={value} onChange={(value) => setValue(value)} />
    </div>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Progress',
};

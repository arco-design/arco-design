/* eslint-disable no-console */
import React, { useState } from 'react';
import { Steps, Radio, StepsProps } from '@self';

const Step = Steps.Step;

function DemoSteps() {
  const [current, setCurrent] = useState(2);
  const [size, setSize] = useState<StepsProps['size']>('default');
  const [type, setType] = useState<StepsProps['type']>('default');
  const [direction, setDirection] = useState<StepsProps['direction']>('horizontal');

  return (
    <div>
      <div style={{ margin: '20px 0' }}>
        <Radio.Group
          type="button"
          value={direction}
          onChange={(direction) => {
            setDirection(direction);
          }}
        >
          <Radio value="vertical">vertical</Radio>
          <Radio value="horizontal">horizontal</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: '20px 0' }}>
        <Radio.Group
          type="button"
          value={size}
          onChange={(size) => {
            setSize(size);
          }}
        >
          <Radio value="small">small</Radio>
          <Radio value="default">default</Radio>
        </Radio.Group>
      </div>
      <div style={{ margin: '20px 0' }}>
        <Radio.Group
          type="button"
          value={type}
          onChange={(type) => {
            setType(type);
          }}
        >
          <Radio value="default">default</Radio>
          <Radio value="arrow">arrow</Radio>
          <Radio value="dot">dot</Radio>
          <Radio value="navigation">navigation</Radio>
        </Radio.Group>
      </div>
      <Steps
        size={size}
        type={type}
        direction={direction}
        current={current}
        onChange={(current, id) => {
          setCurrent(current);
          console.log(`${current} -- ${id}`);
        }}
      >
        <Step
          id="one"
          title="Step1"
          description="This is description,This is description,This is description,This is description."
        />
        <Step id="two" title="Step2" description="This is description~" />
        <Step id="three" title="Step3" description="This is description~" />
      </Steps>
    </div>
  );
}

export const Demo = () => <DemoSteps />;

export default {
  title: 'Steps',
};

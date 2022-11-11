/* eslint-disable no-console */
import React from 'react';
import { Space, Steps } from '@self';

const Step = Steps.Step;

function DemoSteps() {
  return (
    <Space direction="vertical" size={20}>
      <Steps direction="vertical" current={2}>
        <Step title="Succeeded" description="This is a description" />
        <Step
          title="Processing"
          description={
            <Steps current={2} size="small">
              <Step title="Succeeded" description="This is a description" />
              <Step title="Processing" description="This is a description" />
              <Step title="Pending" description="This is a description" />
            </Steps>
          }
        />
        <Step title="Pending" description="This is a description" />
      </Steps>

      <Steps direction="vertical" current={2} type="dot">
        <Step title="Succeeded" description="This is a description" />
        <Step
          title="Processing"
          description={
            <Steps current={2} size="small" type="dot">
              <Step title="Succeeded" description="This is a description" />
              <Step title="Processing" description="This is a description" />
              <Step title="Pending" description="This is a description" />
            </Steps>
          }
        />
        <Step title="Pending" description="This is a description" />
      </Steps>
    </Space>
  );
}

export const Demo = () => <DemoSteps />;

export default {
  title: 'Steps',
};

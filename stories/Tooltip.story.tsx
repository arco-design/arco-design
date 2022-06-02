import React from 'react';
import { Tooltip, Button } from '@self';

function DemoTooltip() {
  return (
    <div>
      <Tooltip
        triggerProps={{ autoFitPosition: false }}
        popupVisible
        content="哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
      >
        <Button style={{ marginLeft: '90vw', marginTop: '90vh' }}> click </Button>
      </Tooltip>
    </div>
  );
}

export const Demo = () => <DemoTooltip />;

export default {
  title: 'Tooltip',
};

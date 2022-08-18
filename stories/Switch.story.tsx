/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Switch } from '@self';

function DemoSwitch() {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setChecked(false);
    }, 2000);
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <div>
        <Switch
          onChange={(checked) => {
            console.log(checked);
          }}
          style={{ margin: '0 10px' }}
        />
        <Switch style={{ margin: '0 10px' }} />
        <Switch defaultChecked disabled style={{ margin: '0 10px' }} />
        <Switch size="small" defaultChecked style={{ margin: '0 10px' }} />
      </div>
      <div style={{ marginTop: 20 }}>
        <Switch checked={checked}>
          <span key="open">开开开开开开开开开</span>
          <span key="close">关</span>
        </Switch>
        <Switch>
          <span key="open">ON</span>
          <span key="close">OFF</span>
        </Switch>
        <Switch size="small">
          <span key="open">ONONONONON</span>
          <span key="close">OFFOFOFOFOFOFOOFOF</span>
        </Switch>
      </div>
    </div>
  );
}

export const Demo = () => <DemoSwitch />;

export default {
  title: 'Switch',
};

import React, { useState } from 'react';
import { Drawer, Button } from '@self';

function Demo1() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setVisible(true)} type="primary">
        Open
      </Button>
      <Drawer
        title={<span>Basic Information </span>}
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <div>Here is an example text.</div>

        <div>Here is an example text.</div>
      </Drawer>
    </>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Drawer',
};

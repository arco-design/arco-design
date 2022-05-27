/* eslint-disable no-console */
import React from 'react';
import { ResizeBox } from '@self';

function Demo1() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          height: 70,
        }}
      >
        header
      </div>
      <ResizeBox.SplitGroup
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        direction="vertical"
        onMoving={(_, params) => console.log(params)}
        panes={[
          {
            content: (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'yellow',
                }}
              >
                Panel 1
              </div>
            ),
            trigger: () => (
              <div
                style={{
                  width: '100%',
                  height: 5,
                  position: 'absolute',
                  backgroundColor: 'black',
                }}
              />
            ),
          },
          {
            content: (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'green',
                }}
              >
                Panel 2
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Resizebox',
};

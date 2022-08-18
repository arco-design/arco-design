/* eslint-disable no-console */
import React, { useState } from 'react';
import { Affix, Button } from '@self';

function Demo1() {
  const [height, setHeight] = useState(40);
  const [offset, setOffset] = useState(0);
  const toggleHeight = () => {
    setHeight(height === 100 ? 40 : 100);
  };
  const changeOffset = () => {
    setOffset(offset === 0 ? 100 : 0);
  };
  return (
    <div>
      <Affix
        offsetTop={120}
        onChange={(value) => {
          console.log(value);
        }}
      >
        <span style={{ display: 'inline-block' }}>固定在顶部120</span>
      </Affix>
      <Affix
        onChange={(value) => {
          console.log(value);
        }}
      >
        <span style={{ display: 'inline-block' }}>固定在顶部</span>
      </Affix>
      <Affix offsetBottom={120}>
        <span style={{ display: 'inline-block', marginTop: '1000px' }}>固定在底部120</span>
      </Affix>
      <div style={{ height: 2000 }} />
      <Affix offsetBottom={offset}>
        <Button style={{ height }} onClick={toggleHeight}>
          change height {height}
        </Button>
      </Affix>
      <div style={{ height: 100 }} />
      <Button onClick={changeOffset} style={{ position: 'fixed', bottom: 0, right: 0 }}>
        change offset {offset}
      </Button>
    </div>
  );
}

export default {
  title: 'Affix',
};

export const Demo = () => <Demo1 />;

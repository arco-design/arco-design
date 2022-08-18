/* eslint-disable no-console */
import React, { useState } from 'react';
import Draggable from '../../components/_class/Draggable';

import '../../components/_class/Draggable/style/index.less';

const Tag = ({ value }: { value: number }) => {
  return (
    <div
      style={{
        lineHeight: '40px',
        textAlign: 'center',
        margin: 4,
      }}
    >
      {value}
    </div>
  );
};
const moveItem = function (arr: number[], fromIndex: number, toIndex: number) {
  const isMoveLeft = fromIndex > toIndex;
  const item = arr.splice(fromIndex, 1);
  arr.splice(isMoveLeft ? toIndex : toIndex - 1, 0, ...item);
  return arr.slice();
};

function Demo1() {
  const [data, setData] = useState<number[]>(new Array(7).fill(null).map((_, index) => index));

  return (
    <Draggable
      direction="horizontal"
      onIndexChange={(index, prevIndex) => {
        const _data = moveItem(data, prevIndex, index);
        setData(_data);
        console.log(`change ${prevIndex} to ${index}`);
        console.log(_data);
      }}
      itemWrapperStyle={{ display: 'inline-block', border: '1px solid pink', padding: '0 12px' }}
    >
      {data.map((v) => (
        <Tag key={v} value={v} />
      ))}
    </Draggable>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Private Components/Draggable',
};

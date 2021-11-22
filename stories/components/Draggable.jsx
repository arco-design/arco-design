import React, { useState } from 'react';
import Draggable from '../../components/_class/Draggable';

import '../../components/_class/Draggable/style/index.less';

const Tag = ({ value, ...rest }) => {
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
const moveItem = function(arr, fromIndex, toIndex) {
  const isMoveLeft = fromIndex > toIndex;
  const item = arr.splice(fromIndex, 1);
  arr.splice(isMoveLeft ? toIndex : toIndex - 1, 0, item);
  return arr.slice();
};

export default function() {
  const [data, setData] = useState(new Array(7).fill(null).map((_, index) => index));
  return (
    <Draggable
      direction="horizontal"
      onIndexChange={(index, prevIndex) => {
        let _data = moveItem(data, prevIndex, index);
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

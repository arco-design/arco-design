import React, { useState } from 'react';
import { Rate } from '@self';

export default function Demo(props) {
  const [value, setValue] = useState(0.5);
  const onChange = (value) => {
    setValue(value);
    console.log(`Selected value ${value}`);
  };
  return (
    <>
      <Rate
        value={value}
        allowHalf
        character={<span style={{ padding: '0 4px' }}>彭</span>}
        tooltips={['one', 'two', 'three', 'four', 'five']}
        onChange={onChange}
        onHoverChange={(value) => console.log(`Hovered value ${value}`)}
      />
    </>
  );
}

import React from 'react';
import { Slider } from '@self';

function Demo() {
  const minRadius = 0.1;
  const maxRadius = 3;
  const minRadius1 = 1;
  const maxRadius1 = 3;
  return (
    <div style={{ width: 400 }}>
      <div>marks dom排列顺序为： 3，0.1</div>
      <Slider
        min={minRadius}
        max={maxRadius}
        step={0.1}
        marks={{
          [minRadius]: `${minRadius}km`,
          [maxRadius]: `${maxRadius}km`,
        }}
        tooltipVisible={false}
      />
      <div>marks dom排列顺序为： 1，3</div>
      <Slider
        min={minRadius1}
        max={maxRadius1}
        step={0.1}
        marks={{
          [minRadius1]: `${minRadius1}km`,
          [maxRadius1]: `${maxRadius1}km`,
        }}
        tooltipVisible={false}
      />

      <div style={{ width: 240 }}>
        <Slider
          defaultValue={5}
          max={15}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
          style={{ marginBottom: 80 }}
        />
        <Slider
          onlyMarkValue
          defaultValue={10}
          max={15}
          marks={{
            0: '0km',
            5: '5km',
            10: '10km',
            15: '15km',
          }}
        />
      </div>
    </div>
  );
}

export default Demo;

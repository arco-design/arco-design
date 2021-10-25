import React, { useRef, useState } from 'react';
import { Carousel, Button } from '@self';

const baseStyle = {
  color: '#ffffff',
  textAlign: 'center',
  width: '100%',
  lineHeight: '300px',
  height: '100%',
};
const itemStyle1 = {
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  ...baseStyle,
};

const itemStyle2 = {
  backgroundColor: 'rgba(255, 0, 0, 0.3)',
  ...baseStyle,
};

const itemStyle3 = {
  backgroundColor: 'rgba(0, 255, 0, 0.3)',
  ...baseStyle,
};

const itemStyle4 = {
  backgroundColor: 'rgba(0, 0, 255, 0.3)',
  ...baseStyle,
};

export default function Demo() {
  const refCarousel = useRef(null);
  const refCurrentIndex = useRef(0);

  console.log(refCarousel);

  return (
    <div>
      <div style={{ padding: '8px 16px' }}>
        <Button
          onClick={() => {
            refCarousel.current.goto({ index: refCurrentIndex.current - 1, isNegative: true });
          }}
          type="warning"
          style={{ marginLeft: '8px' }}
        >
          -1
        </Button>
        <Button
          onClick={() => {
            refCarousel.current.goto({ index: refCurrentIndex.current + 1 });
          }}
        >
          +1
        </Button>
      </div>
      <Carousel
        carousel={refCarousel}
        refWithAPI
        onChange={(index) => {
          refCurrentIndex.current = index;
        }}
        style={{ width: '100%', height: 300, margin: '0 auto', fontSize: 16 }}
      >
        <div style={itemStyle1}>
          <h1>1</h1>
        </div>
        <div style={itemStyle2}>
          <h1>2</h1>
        </div>
        <div style={itemStyle3}>
          <h1>3</h1>
        </div>
        <div style={itemStyle4}>
          <h1>4</h1>
        </div>
      </Carousel>
    </div>
  );
}

/* eslint-disable no-console */
import React, { CSSProperties, useRef } from 'react';
import { Carousel, Button } from '@self';
import { CarouselHandle } from '@self/Carousel/interface';

const BG_OPACITY = 0.4;

const BASE_STYLE: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 400,
  color: '#ffffff',
};

const itemStyle1 = {
  backgroundColor: `rgba(0, 0, 0, ${BG_OPACITY})`,
  ...BASE_STYLE,
};

const itemStyle2 = {
  backgroundColor: `rgba(255, 0, 0, ${BG_OPACITY})`,
  ...BASE_STYLE,
  height: 300,
};

const itemStyle3 = {
  backgroundColor: `rgba(0, 255, 0, ${BG_OPACITY})`,
  ...BASE_STYLE,
  height: 500,
};

const itemStyle4 = {
  backgroundColor: `rgba(0, 0, 255, ${BG_OPACITY})`,
  ...BASE_STYLE,
  height: 600,
};

function Demo1() {
  const refCarousel = useRef(null as any as CarouselHandle);
  const refCurrentIndex = useRef(0);

  console.log(refCarousel);

  return (
    <div>
      <div style={{ padding: '8px 16px' }}>
        <Button
          onClick={() => {
            refCarousel.current?.goto({ index: refCurrentIndex.current - 1, isNegative: true });
          }}
          type="primary"
          status="warning"
          style={{ marginLeft: '8px' }}
        >
          -1
        </Button>
        <Button
          onClick={() => {
            refCarousel.current?.goto({ index: refCurrentIndex.current + 1 });
          }}
        >
          +1
        </Button>
      </div>
      <Carousel
        carousel={refCarousel}
        onChange={(index) => {
          refCurrentIndex.current = index;
        }}
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

export const Demo = () => <Demo1 />;

export default {
  title: 'Carousel',
};

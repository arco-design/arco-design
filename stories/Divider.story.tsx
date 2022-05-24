import React from 'react';
import { Divider } from '@self';

const style = {
  width: 200,
  border: '1px solid #ccc',
  padding: 10,
  marginBottom: 20,
};

export const Demo = () => (
  <div>
    <div style={style}>
      fdsafsdfafsadfsadfd
      <Divider />
      fdsafsdafsafsdf
    </div>
    <div style={style}>
      fdsafsdfafsadfsadfd
      <Divider>Text</Divider>
      fdsafsdafsafsdf
    </div>
    <div style={style}>
      A
      <Divider type="vertical" />
      B
      <Divider type="vertical" />C
    </div>
  </div>
);

export default {
  title: 'Divider',
};

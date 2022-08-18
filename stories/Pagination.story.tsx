import React from 'react';
import { Pagination } from '@self';

function Demo1() {
  return (
    <div
      style={{
        padding: 10,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>70</h2>
      <Pagination sizeCanChange total={70} bufferSize={1} defaultCurrent={5} />
      <Pagination sizeCanChange total={70} bufferSize={2} defaultCurrent={5} />
      <h2>80</h2>
      <Pagination sizeCanChange total={80} bufferSize={1} defaultCurrent={5} />
      <Pagination sizeCanChange total={80} bufferSize={2} defaultCurrent={5} />
      <h2>90</h2>
      <Pagination sizeCanChange total={90} bufferSize={1} defaultCurrent={5} />
      <Pagination sizeCanChange total={90} bufferSize={2} defaultCurrent={5} />
      <h2>100</h2>
      <Pagination sizeCanChange total={100} bufferSize={1} defaultCurrent={5} />
      <Pagination sizeCanChange total={100} bufferSize={2} defaultCurrent={5} />
      <br />
    </div>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Pagination',
};

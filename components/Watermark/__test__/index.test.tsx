import React from 'react';
import componentConfigTest from '../../../tests/componentConfigTest';
import Watermark from '..';
import { render, sleep, cleanup } from '../../../tests/util';

componentConfigTest(Watermark, 'Watermark');

describe('Watermark', () => {
  beforeEach(() => {});

  afterEach(() => {
    cleanup();
  });

  it('Watermark getContainer correctly', async () => {
    const Demo = ({ getContainer }) => {
      return (
        <div>
          <div id="demo-watermark-1" />
          <div id="demo-watermark-2" />

          <Watermark getContainer={getContainer} content="Arco" />
        </div>
      );
    };

    const demo = render(<Demo getContainer={() => document.querySelector('#demo-watermark-1')} />);

    await sleep(10);

    expect(document.querySelector('#demo-watermark-1')?.children.length).toBe(1);

    demo.rerender(<Demo getContainer={() => document.querySelector('#demo-watermark-2')} />);

    await sleep(10);

    expect(document.querySelector('#demo-watermark-2')?.children.length).toBe(1);

    expect(document.querySelector('#demo-watermark-1')?.children.length).toBe(0);
  });
});

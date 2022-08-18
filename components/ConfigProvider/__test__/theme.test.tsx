import React from 'react';
import { render } from '../../../tests/util';
import ConfigProvider from '..';
import { lighten } from '../util';

describe('ConfigProvider theme', () => {
  it('global css var correctly', () => {
    render(
      <ConfigProvider theme={{ primaryColor: '#000' }}>
        <div />
      </ConfigProvider>
    );

    jest.spyOn(document.body.style, 'setProperty').mockImplementation((_, value) => {
      Object.defineProperty(window, 'getComputedStyle', {
        value: () => ({
          getPropertyValue: () => {
            return value;
          },
        }),
      });
    });

    document.body.style.setProperty('--primary-color', '#000');

    expect(getComputedStyle(document.body).getPropertyValue('--primary-color')).toBe('#000');
  });

  it('Color lighten correctly', () => {
    const color = '#666666';

    expect(lighten(color, 20)).toBe('153,153,153');
  });
});

import React from 'react';
import { render, cleanup } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Space, { SpaceSize } from '..';
import { isArray } from '../../_util/is';
import omit from '../../_util/omit';

mountTest(Space);
componentConfigTest(Space, 'Space');

const mapSize = {
  mini: 4,
  small: 8,
  medium: 16,
  large: 24,
};

function getItemStyle(component, index) {
  return component.find('.arco-space-item').item(index).style.cssText;
}

function getSizeValue(size) {
  if (typeof size === 'string') {
    return `${mapSize[size]}px`;
  }
  if (typeof size === 'number') {
    return `${size}px`;
  }
  return '8px';
}

const objToCsstext = (obj: Object) => {
  return Object.entries(obj)
    .map(([k, v]) => `${k}: ${v};`)
    .join(' ');
};

function checkSize(size?: SpaceSize | SpaceSize[]) {
  const sizeProps = size ? { size, wrap: !!isArray(size) } : {};
  const component = render(
    <Space {...sizeProps}>
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </Space>
  );
  expect(component.find('.arco-space-item')).toHaveLength(3);

  const marginValue = isArray(size)
    ? { 'margin-right': getSizeValue(size[0]), 'margin-bottom': getSizeValue(size[1]) }
    : { 'margin-right': getSizeValue(size) };

  expect(getItemStyle(component, 0)).toEqual(objToCsstext(marginValue));
  expect(getItemStyle(component, 1)).toEqual(objToCsstext(marginValue));
  expect(getItemStyle(component, 2)).toEqual(objToCsstext(omit(marginValue, ['margin-right'])));
  cleanup();
}

describe('Space', () => {
  it('should default size work', () => {
    checkSize();
    checkSize('mini');
    checkSize('small');
    checkSize('medium');
    checkSize('large');
    checkSize(['small', 'medium']);
    checkSize([20, 30]);
  });

  it('direction', () => {
    const component = render(
      <Space direction="vertical">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Space>
    );

    expect(getItemStyle(component, 0)).toEqual('margin-bottom: 8px;');
    expect(getItemStyle(component, 1)).toEqual('margin-bottom: 8px;');
    expect(getItemStyle(component, 2)).toEqual('');
  });

  it('align', () => {
    const component = render(
      <Space>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Space>
    );

    expect(component.find('.arco-space')[0].className).toBe(
      'arco-space arco-space-horizontal arco-space-align-center'
    );

    component.rerender(
      <Space direction="vertical">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Space>
    );

    expect(component.find('.arco-space')[0].className).toBe('arco-space arco-space-vertical');

    component.rerender(
      <Space direction="vertical" align="start">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Space>
    );

    expect(component.find('.arco-space')[0].className).toBe(
      'arco-space arco-space-vertical arco-space-align-start'
    );
  });
});

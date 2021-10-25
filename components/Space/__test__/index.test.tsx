import React from 'react';
import { mount } from 'enzyme';
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
  return component
    .find('.arco-space-item')
    .at(index)
    .prop('style');
}

function getSizeValue(size) {
  if (typeof size === 'string') {
    return mapSize[size];
  }
  if (typeof size === 'number') {
    return size;
  }
  return 8;
}

describe('Space', () => {
  it('different size', () => {
    function checkSize(size?: SpaceSize | SpaceSize[]) {
      const sizeProps = size ? { size, wrap: !!isArray(size) } : {};
      const component = mount(
        <Space {...sizeProps}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </Space>
      );
      expect(component.find('.arco-space-item')).toHaveLength(3);

      const marginValue = isArray(size)
        ? { marginRight: getSizeValue(size[0]), marginBottom: getSizeValue(size[1]) }
        : { marginRight: getSizeValue(size) };

      expect(getItemStyle(component, 0)).toEqual(marginValue);
      expect(getItemStyle(component, 1)).toEqual(marginValue);
      expect(getItemStyle(component, 2)).toEqual(omit(marginValue, ['marginRight']));
    }

    checkSize();
    checkSize('mini');
    checkSize('small');
    checkSize('medium');
    checkSize('large');
    checkSize(['small', 'medium']);
    checkSize([20, 30]);
  });

  it('direction', () => {
    const component = mount(
      <Space direction="vertical">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Space>
    );

    expect(getItemStyle(component, 0)).toEqual({ marginBottom: 8 });
    expect(getItemStyle(component, 1)).toEqual({ marginBottom: 8 });
    expect(getItemStyle(component, 2)).toEqual({});
  });

  it('align', () => {
    const component = mount(
      <Space>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </Space>
    );

    expect(component.find('.arco-space').prop('className')).toBe(
      'arco-space arco-space-horizontal arco-space-align-center'
    );

    component.setProps({ direction: 'vertical' });

    expect(component.find('.arco-space').prop('className')).toBe('arco-space arco-space-vertical');

    component.setProps({ align: 'start' });

    expect(component.find('.arco-space').prop('className')).toBe(
      'arco-space arco-space-vertical arco-space-align-start'
    );
  });
});

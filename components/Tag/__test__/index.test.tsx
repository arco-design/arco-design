import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Tag from '..';

mountTest(Tag);
componentConfigTest(Tag, 'Tag');

const mountTag = (props: Record<string, any>) => {
  return mount(<Tag {...props}>Hello</Tag>);
};

describe('Tag', () => {
  it('tag with type', () => {
    mountTag({ type: 'white' });
  });

  it('tag with color', () => {
    mountTag({ color: 'white' });
  });

  it('tag with hex color', () => {
    mountTag({ color: '#FFFFFF' });
  });

  it('tag with primary checked/visible value', () => {
    mountTag({
      checked: true,
      visible: true,
    });
  });

  it('close tag', () => {
    const tag = mountTag({
      closable: true,
      onClose: jest.fn(),
    });
    tag.find('IconClose').simulate('click');
    expect(tag.prop('onClose')).toBeCalled();
  });

  it('check tag', () => {
    const tag = mountTag({
      checkable: true,
      onCheck: jest.fn(),
    });
    tag.simulate('click');
    expect(tag.prop('onCheck')).toBeCalled();
  });

  it('async onClose is called while resolve', () => {
    const onClose = jest.fn().mockResolvedValue('resolve');
    const tag = mountTag({
      closable: true,
      onClose,
    });

    tag.find('IconClose').simulate('click');
    expect(tag.find('.arco-tag').hasClass('arco-tag-loading')).toBeTruthy();

    return onClose.mock.results[0].value
      .then((msg) => {
        expect(msg).toEqual('resolve');
      })
      .finally(() => {
        tag.update();
        expect(tag.find('.arco-tag').hasClass('arco-tag-loading')).toBeFalsy();
        expect(tag.find('.arco-tag').hasClass('arco-tag-hide')).toBeTruthy();
      });
  });

  it('async onClose is called while reject', () => {
    const onClose = jest.fn().mockRejectedValue('reject');
    const tag = mountTag({
      closable: true,
      onClose,
    });

    tag.find('IconClose').simulate('click');
    expect(tag.find('.arco-tag').hasClass('arco-tag-loading')).toBeTruthy();

    return onClose.mock.results[0].value
      .catch((msg) => {
        expect(msg).toEqual('reject');
      })
      .finally(() => {
        tag.update();
        expect(tag.find('.arco-tag').hasClass('arco-tag-loading')).toBeFalsy();
        expect(tag.find('.arco-tag').hasClass('arco-tag-hide')).toBeFalsy();
      });
  });
});

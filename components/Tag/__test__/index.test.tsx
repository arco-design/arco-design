import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Tag from '..';

mountTest(Tag);
componentConfigTest(Tag, 'Tag');

const mountTag = (props: Record<string, any>) => {
  return render(<Tag {...props}>Hello</Tag>);
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
    const closeHandler = jest.fn();
    const tag = mountTag({
      closable: true,
      onClose: closeHandler,
    });
    fireEvent.click(tag.find('.arco-icon-close')[0]);
    expect(closeHandler).toBeCalled();
  });

  it('check tag', () => {
    const onCheck = jest.fn();
    const tag = mountTag({
      checkable: true,
      onCheck,
    });
    fireEvent.click(tag.container.firstChild!);
    expect(onCheck).toBeCalled();
  });

  it('async onClose is called while resolve', () => {
    const onClose = jest.fn().mockResolvedValue('resolve');
    const tag = mountTag({
      closable: true,
      onClose,
    });
    fireEvent.click(tag.find('.arco-icon-close')[0]);
    expect(tag.find('.arco-tag')[0].className).toContain('arco-tag-loading');

    return onClose.mock.results[0].value
      .then((msg) => {
        expect(msg).toEqual('resolve');
      })
      .finally(() => {
        expect(tag.find('.arco-tag')[0].className).not.toContain('arco-tag-loading');
        expect(tag.find('.arco-tag')[0].className).toContain('arco-tag-hide');
      });
  });

  it('async onClose is called while reject', () => {
    const onClose = jest.fn().mockRejectedValue('reject');
    const tag = mountTag({
      closable: true,
      onClose,
    });
    fireEvent.click(tag.find('.arco-icon-close')[0]);
    expect(tag.find('.arco-tag')[0].className).toContain('arco-tag-loading');

    return onClose.mock.results[0].value
      .catch((msg) => {
        expect(msg).toEqual('reject');
      })
      .finally(() => {
        expect(tag.find('.arco-tag')[0].className).not.toContain('arco-tag-loading');
        expect(tag.find('.arco-tag')[0].className).not.toContain('arco-tag-hide');
      });
  });
});

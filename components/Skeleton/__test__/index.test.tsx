import React from 'react';
import { render, cleanup } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Skeleton from '..';
import { SkeletonProps } from '../interface';

mountTest(Skeleton);
componentConfigTest(Skeleton, 'Skeleton');

function renderSkeleton(props: SkeletonProps) {
  return render(
    <Skeleton loading {...props}>
      123
    </Skeleton>
  );
}

describe('Skeleton', () => {
  it('basic skeleton', () => {
    const wrapper = renderSkeleton({ className: 'ceshi' });
    expect(wrapper.find('.arco-skeleton').item(0).classList.contains('ceshi')).toBe(true);
  });

  describe('image', () => {
    it('size image', () => {
      (['small', 'large', 'default'] as const).forEach((size) => {
        const wrapper = renderSkeleton({ image: { size } });
        expect(
          wrapper.find('.arco-skeleton-image')[0].classList.contains(`arco-skeleton-image-${size}`)
        ).toBe(true);
        cleanup();
      });
    });

    it('prop image', () => {
      const wrapper = renderSkeleton({ image: { shape: 'circle', position: 'right' } });
      ['circle', 'right'].forEach((prop) => {
        expect(
          wrapper
            .find('.arco-skeleton-image')
            .item(0)
            .classList.contains(`arco-skeleton-image-${prop}`)
        ).toBe(true);
      });
    });
  });

  describe('text', () => {
    it('rows', () => {
      const wrapper = renderSkeleton({ text: { rows: 5 } });
      expect(wrapper.find('.arco-skeleton-text li').length).toBe(5);
    });
  });
});

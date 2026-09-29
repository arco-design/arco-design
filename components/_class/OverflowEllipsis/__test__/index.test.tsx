import React from 'react';
import { render } from '../../../../tests/util';
import OverflowEllipsis from '..';

jest.mock('../../../_util/resizeObserver', () => {
  const ReactModule = require('react') as typeof React;

  return function MockResizeObserver(props: {
    children: React.ReactNode;
    onResize?: (entries: ResizeObserverEntry[]) => void;
  }) {
    const targetRef = ReactModule.useRef<HTMLDivElement>();
    const child = props.children as React.ReactElement<{ className?: string }>;
    const isSuffixItem = child.props.className?.includes('arco-overflow-suffix-item');

    ReactModule.useLayoutEffect(() => {
      if (targetRef.current && isSuffixItem) {
        props.onResize?.([{ target: targetRef.current } as unknown as ResizeObserverEntry]);
      }
    });

    return ReactModule.createElement('div', { ref: targetRef }, props.children);
  };
});

describe('OverflowEllipsis', () => {
  it('does not loop when the suffix resize observer repeatedly reports the same size', () => {
    expect(() => {
      render(
        <OverflowEllipsis
          items={[<span key="tag">tag</span>]}
          suffixItems={[<span key="input">input</span>]}
        />
      );
    }).not.toThrow();
  });
});

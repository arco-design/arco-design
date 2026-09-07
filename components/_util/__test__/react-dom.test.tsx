import React from 'react';
import { callbackOriginRef, getReactElementRef } from '../react-dom';

describe('React element refs', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('reads an element ref without triggering a React special-prop warning', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const ref = React.createRef<HTMLDivElement>();
    const element = <div ref={ref} />;

    expect(getReactElementRef(element)).toBe(ref);
    expect(consoleError).not.toHaveBeenCalled();
  });

  it('preserves callback and object refs when an element is cloned', () => {
    const node = document.createElement('div');
    const callbackRef = jest.fn();
    const objectRef = React.createRef<HTMLDivElement>();

    callbackOriginRef(<div ref={callbackRef} />, node);
    callbackOriginRef(<div ref={objectRef} />, node);

    expect(callbackRef).toHaveBeenCalledWith(node);
    expect(objectRef.current).toBe(node);
  });
});

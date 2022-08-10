import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Button from '..';

mountTest(Button);
componentConfigTest(Button, 'Button');
componentConfigTest(Button.Group, 'Button.Group');

describe('button', () => {
  it('click callback correctly', () => {
    const mockFn = jest.fn();
    const component = render(<Button onClick={mockFn} />);
    const button = component.querySelector('button') as HTMLElement;
    fireEvent.click(button);
    const mockFnCallLength = mockFn.mock.calls.length;
    expect(mockFnCallLength).toBe(1);

    component.rerender(<Button onClick={mockFn} disabled />);

    fireEvent.click(button);
    expect(mockFn.mock.calls.length).toBe(mockFnCallLength);
  });

  it('render multiple children correctly', () => {
    const { container } = render(
      <Button>
        1{'  '}2{'  '}3{'  '}
      </Button>
    );
    expect(container.firstElementChild?.textContent).toEqual('1  2  3  ');
  });

  it('use context autoInsertSpaceInButton correctly', () => {
    const mockText = '测试';
    const realContext = React.useContext;
    const mockContext = jest.fn().mockReturnValue({
      autoInsertSpaceInButton: true,
      getPrefixCls: (componentName) => `test-${componentName}`,
    });

    const prefixCls = `.test-btn`;
    React.useContext = mockContext;

    const button = render(<Button>{mockText}</Button>);
    expect(button.querySelector(prefixCls)).toHaveClass('test-btn-two-chinese-chars');

    React.useContext = realContext;
  });

  it('render href type correctly', () => {
    const button = render(
      <Button type="primary" href="https://arco.design">
        测试
      </Button>
    );
    expect(button.find('button')).toHaveLength(0);
    expect(button.find('a')).toHaveLength(1);
    expect(button.querySelector('a')?.getAttribute('href')).not.toBeUndefined();

    act(() => {
      button.rerender(<Button type="primary" href="https://arco.design" disabled />);
    });

    expect(button.querySelector('a')?.getAttribute('href')).toBeNull();
  });
});

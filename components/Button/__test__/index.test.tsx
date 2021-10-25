import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Button from '..';

mountTest(Button);
componentConfigTest(Button, 'Button');

describe('button', () => {
  it('click callback correctly', () => {
    const mockFn = jest.fn();
    const component = mount(<Button onClick={mockFn} />);
    const button = component.find('button');
    button.simulate('click');
    const mockFnCallLength = mockFn.mock.calls.length;
    expect(mockFnCallLength).toBe(1);

    act(() => {
      component.setProps({
        disabled: true,
      });
    });

    button.simulate('click');
    expect(mockFn.mock.calls.length).toBe(mockFnCallLength);
  });

  it('render multiple children correctly', () => {
    const button = mount(
      <Button>
        1{'  '}2{'  '}3{'  '}
      </Button>
    );
    expect(button.text()).toEqual('1  2  3  ');
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

    const button = mount(<Button>{mockText}</Button>);
    expect(button.find(prefixCls).hasClass(`test-btn-two-chinese-chars`)).toBe(true);

    React.useContext = realContext;
  });

  it('render href type correctly', () => {
    const button = mount(
      <Button type="primary" href="https://arco.design">
        测试
      </Button>
    );
    expect(button.find('button')).toHaveLength(0);
    expect(button.find('a')).toHaveLength(1);
    expect(button.find('a').prop('href')).not.toBeUndefined();

    act(() => {
      button.setProps({
        disabled: true,
      });
    });
    expect(button.find('a').prop('href')).toBeUndefined();
  });
});

import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Divider from '..';

mountTest(Divider);
componentConfigTest(Divider, 'Divider');

describe('Divider', () => {
  it('render correctly', () => {
    const divider = render(<Divider />);

    expect(divider.find('.arco-divider').length).toBe(1);
  });

  it('with text', () => {
    const divider = render(<Divider>Hello</Divider>);

    expect(divider.find('.arco-divider-text').length).toBe(1);
    expect(divider.find('.arco-divider-text')[0].textContent).toBe('Hello');
  });

  it('vertical', () => {
    const divider = render(<Divider type="vertical">Hello</Divider>);

    expect(divider.find('.arco-divider-vertical').length).toBe(1);
    expect(divider.find('.arco-divider-text').length).toBe(0);
  });
});

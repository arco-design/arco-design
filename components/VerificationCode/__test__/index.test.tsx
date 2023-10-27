import React from 'react';
import componentConfigTest from '../../../tests/componentConfigTest';
import VerificationCode from '..';
import { fireEvent, render } from '../../../tests/util';

componentConfigTest(VerificationCode, 'VerificationCode');

describe('Alert', () => {
  it('control correctly', () => {
    let value = '123';

    const Demo = () => (
      <VerificationCode
        value={value}
        onChange={(v) => {
          value = v;
        }}
      />
    );

    const component = render(Demo());

    const inputs = component.querySelectorAll('input');
    inputs.forEach((input, index) => {
      expect(input.getAttribute('value')).toBe(value.split('')[index] || '');
    });

    fireEvent.change(inputs.item(3), { target: { value: 4 } });
    expect(value).toBe('1234');
    component.rerender(Demo());

    fireEvent.change(component.querySelectorAll('input').item(4), { target: { value: 5 } });
    expect(value).toBe('12345');

    component.rerender(Demo());

    fireEvent.change(component.querySelectorAll('input').item(5), { target: { value: 6 } });

    expect(value).toBe('123456');
  });
});

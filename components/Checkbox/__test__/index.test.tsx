import React from 'react';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Checkbox from '..';
import { fireEvent, render } from '../../../tests/util';

mountTest(Checkbox);
componentConfigTest(Checkbox, 'Checkbox');

describe('Checkbox uncontrolled', () => {
  it('Checkbox default check', () => {
    const wrapper = render(<Checkbox defaultChecked>Checkbox</Checkbox>);
    expect(wrapper.querySelector('.arco-checkbox')).toHaveClass('arco-checkbox-checked');
  });

  it('Checkbox onChange', () => {
    const mockFn = jest.fn();
    const wrapper = render(<Checkbox onChange={mockFn}>Checkbox</Checkbox>);
    fireEvent.click(wrapper.querySelector('.arco-checkbox'), {
      target: {
        checked: true,
      },
    });

    expect(mockFn.call.length).toBe(1);

    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-checked');
  });
});

describe('Checkbox controlled', () => {
  it('Checkbox check', () => {
    const mockFn = jest.fn();

    const wrapper = render(
      <Checkbox onChange={mockFn} checked>
        Checkbox
      </Checkbox>
    );
    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-checked');
    fireEvent.click(wrapper.find('.arco-checkbox')[0]);
    expect(mockFn.call.length).toBe(1);

    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-checked');
  });

  it('Checkbox onChange', () => {
    let checked = false;
    const wrapper = render(
      <Checkbox checked={checked} onChange={(v) => (checked = v)}>
        Checkbox
      </Checkbox>
    );
    fireEvent.click(wrapper.find('.arco-checkbox')[0]);

    expect(checked).toBe(true);
    wrapper.rerender(
      <Checkbox checked={checked} onChange={(v) => (checked = v)}>
        Checkbox
      </Checkbox>
    );

    expect(wrapper.find('.arco-checkbox')[0]).toHaveClass('arco-checkbox-checked');

    fireEvent.click(wrapper.find('.arco-checkbox')[0]);
    expect(checked).toBe(false);
    wrapper.rerender(
      <Checkbox checked={false} onChange={(v) => (checked = v)}>
        Checkbox
      </Checkbox>
    );
    expect(wrapper.querySelector('.arco-checkbox-checked')).toBe(null);
  });
});

describe('Checkbox Custom Icon', () => {
  it('custom icon is not element', () => {
    const randomIcon = `${Math.floor(Math.random() * 10)}`;
    const wrapper = render(<Checkbox icon={randomIcon}>Checkbox</Checkbox>);
    const mask = wrapper.querySelector('.arco-checkbox-mask')!;
    expect(mask.textContent).toBe(randomIcon);
  });
  it('custom icon is element', () => {
    const id = 'mock-icon';
    const wrapper = render(<Checkbox icon={<div id={id} />}>Checkbox</Checkbox>);
    const mask = wrapper.querySelector('.arco-checkbox-mask')!;
    expect(mask.querySelector(`#${id}`)).not.toBeNull();
  });
});

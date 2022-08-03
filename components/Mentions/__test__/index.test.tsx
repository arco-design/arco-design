import React from 'react';

import { fireEvent, render, sleep } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Mentions from '..';
import { ArrowDown, Enter } from '../../_util/keycode';

mountTest(Mentions);
componentConfigTest(Mentions, 'Mentions');

let wrapper: ReturnType<typeof render>;

describe('Mentions', () => {
  afterEach(() => {
    wrapper && wrapper.unmount();
    document.body.innerHTML = '';
  });

  it('Prefix works', async () => {
    wrapper = render(<Mentions options={['beijing', 'shanghai', 'guangzhou']} />);

    expect(wrapper.find('textarea')).toHaveLength(1);

    fireEvent.keyUp(wrapper.find('textarea').item(0), { key: '@', target: { value: '@' } });

    await sleep(100);

    expect(wrapper.find('.arco-select-option')).toHaveLength(3);

    fireEvent.keyUp(wrapper.find('textarea').item(0), { key: '@bei', target: { value: '@bei' } });
    await sleep(100);

    expect(wrapper.find('.arco-select-option')).toHaveLength(1);
    expect(wrapper.find('.arco-select-option .arco-select-highlight').item(0).textContent).toBe(
      'bei'
    );
  });

  it('onChange triggered by user input', () => {
    const onChange = jest.fn();

    wrapper = render(
      <Mentions options={['beijing', 'shanghai', 'guangzhou']} onChange={onChange} />
    );

    fireEvent.change(wrapper.find('textarea').item(0), { target: { value: 'hello' } });

    expect(onChange.mock.calls[0][0]).toBe('hello');
  });

  it('onChange triggered by click option', async () => {
    const onChange = jest.fn();

    wrapper = render(
      <Mentions options={['beijing', 'shanghai', 'guangzhou']} onChange={onChange} />
    );

    fireEvent.keyUp(wrapper.find('textarea').item(0), { key: '@', target: { value: '@' } });
    await sleep(10);
    fireEvent.click(wrapper.find('.arco-select-option').item(0));
    await sleep(10);

    expect(onChange.mock.calls[0][0]).toBe('@beijing');
  });

  it('Options hide when blur textarea', async () => {
    wrapper = render(<Mentions options={['beijing', 'shanghai', 'guangzhou']} />);

    fireEvent.keyUp(wrapper.find('textarea').item(0), { key: '@', target: { value: '@' } });

    await sleep(10);
    expect(wrapper.find('.arco-select-option')).toHaveLength(3);

    fireEvent.blur(wrapper.find('textarea').item(0));
    await sleep(200);
    expect(wrapper.find('.arco-select-option')).toHaveLength(0);
  });

  it('Shortcut works', async () => {
    wrapper = render(<Mentions options={['beijing', 'shanghai', 'guangzhou']} />);

    fireEvent.keyUp(wrapper.find('textarea').item(0), { key: '@', target: { value: '@' } });
    await sleep(100);

    expect(wrapper.find('.arco-select-option')).toHaveLength(3);

    fireEvent.keyDown(wrapper.find('textarea').item(0), { keyCode: ArrowDown.code });
    fireEvent.keyDown(wrapper.find('textarea').item(0), { keyCode: Enter.code });
    await sleep(100);
    expect(wrapper.find('textarea').item(0).textContent).toBe('@shanghai');
  });
});

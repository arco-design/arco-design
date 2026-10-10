import React from 'react';

import { fireEvent, render, sleep, waitFor } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Mentions, { MentionsProps } from '..';
import ConfigProvider from '../../ConfigProvider';
import { ArrowDown, Enter } from '../../_util/keycode';

mountTest(Mentions);
componentConfigTest(Mentions, 'Mentions');

let wrapper: ReturnType<typeof render>;

const typeMention = (textarea, value = '@') => {
  fireEvent.change(textarea, { target: { value } });
  fireEvent.keyUp(textarea, { key: value.slice(-1), keyCode: 50 });
};

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

  it('reports an option accepted by Enter after onChange', async () => {
    const callbacks = [];
    const onChange = jest.fn().mockImplementation(() => callbacks.push('change'));
    const onPressEnter = jest.fn().mockImplementation(() => callbacks.push('enter'));
    const onKeyDownCapture = jest.fn();

    wrapper = render(
      <Mentions
        options={['beijing']}
        onChange={onChange}
        onPressEnter={onPressEnter}
        onKeyDownCapture={onKeyDownCapture}
      />
    );
    const textarea = wrapper.find('textarea').item(0);
    fireEvent.change(textarea, { target: { value: '@' } });
    fireEvent.keyUp(textarea, { key: '@', keyCode: 50 });
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));
    callbacks.length = 0;
    onChange.mockClear();

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('@beijing');
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][0]).toBe(onKeyDownCapture.mock.calls[0][0]);
    expect(onPressEnter.mock.calls[0][1]).toBe(true);
    expect(callbacks).toEqual(['change', 'enter']);

    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));
    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onPressEnter).toHaveBeenCalledTimes(2);
    expect(onPressEnter.mock.calls[1][1]).toBe(false);
  });

  it('reports Enter without an accepted option', () => {
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = render(
      <Mentions
        defaultValue="hello"
        options={['beijing']}
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
    );

    fireEvent.keyDown(wrapper.find('textarea').item(0), {
      key: 'Enter',
      keyCode: Enter.code,
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][1]).toBe(false);
  });

  it('lets a controlled input submit only after accepting the mention', async () => {
    const onSubmit = jest.fn();
    function ChatInput() {
      const [value, setValue] = React.useState('');
      return (
        <Mentions
          value={value}
          options={['beijing']}
          onChange={setValue}
          onPressEnter={(_, didSelectOption) => {
            if (!didSelectOption) {
              onSubmit(value);
            }
          }}
        />
      );
    }
    wrapper = render(<ChatInput />);
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });
    expect(onSubmit).not.toHaveBeenCalled();
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));
    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('@beijing');
  });

  it.each<[string, Partial<MentionsProps>, KeyboardEventInit, number]>([
    [
      'disabled options',
      { options: [{ label: 'beijing', value: 'beijing', disabled: true }] },
      {},
      1,
    ],
    ['a hidden popup', { triggerProps: { popupVisible: false } }, {}, 0],
    ['Ctrl+Enter', {}, { ctrlKey: true }, 1],
  ])('reports no accepted option for %s', async (_, props, eventProps, optionCount) => {
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = render(
      <Mentions options={['beijing']} {...props} onChange={onChange} onPressEnter={onPressEnter} />
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(optionCount));
    onChange.mockClear();

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code, ...eventProps });

    expect(onChange).not.toHaveBeenCalled();
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][1]).toBe(false);
  });

  it('reports no accepted option when the search has no matches', async () => {
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = render(
      <Mentions
        options={['beijing']}
        notFoundContent="No matches"
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea, '@missing');
    await waitFor(() => expect(wrapper.getByText('No matches')).toBeTruthy());
    onChange.mockClear();

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onChange).not.toHaveBeenCalled();
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][1]).toBe(false);
  });

  it.each<[string, MentionsProps, string | undefined, string]>([
    ['a zero-valued option', { options: [0] }, '@', '@0'],
    [
      'a forced-visible popup without a search',
      { options: ['beijing'], triggerProps: { popupVisible: true } },
      undefined,
      'beijing',
    ],
  ])('reports accepting %s', async (_, props, inputValue, selectedValue) => {
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    const onVisibleChange = jest.fn();
    wrapper = render(
      <Mentions
        {...props}
        triggerProps={{ ...props.triggerProps, onVisibleChange }}
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
    );
    const textarea = wrapper.find('textarea').item(0);
    if (inputValue !== undefined) {
      typeMention(textarea, inputValue);
    }
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));
    onChange.mockClear();

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(selectedValue);
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][1]).toBe(true);
    await waitFor(() => expect(onVisibleChange).toHaveBeenCalledWith(false));
  });

  it('does not carry a mouse selection into the next Enter', async () => {
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = render(
      <Mentions options={['beijing']} onChange={onChange} onPressEnter={onPressEnter} />
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));
    onChange.mockClear();
    fireEvent.click(wrapper.find('.arco-select-option').item(0));
    expect(onChange).toHaveBeenCalledWith('@beijing');
    expect(onPressEnter).not.toHaveBeenCalled();
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][1]).toBe(false);
  });

  it('preserves the composition guard before handling Enter', async () => {
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = render(
      <Mentions options={['beijing']} onChange={onChange} onPressEnter={onPressEnter} />
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));
    onChange.mockClear();

    fireEvent.compositionStart(textarea);
    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });
    expect(onChange).not.toHaveBeenCalled();
    expect(onPressEnter).not.toHaveBeenCalled();
    fireEvent.compositionEnd(textarea);
    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onChange).toHaveBeenCalledWith('@beijing');
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][1]).toBe(true);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));
  });

  it.each(['custom', 'undefined', 'global default'])(
    'preserves the %s onKeyDown override',
    async (mode) => {
      const onKeyDown = jest.fn();
      const onChange = jest.fn();
      const onPressEnter = jest.fn();
      wrapper = render(
        <ConfigProvider
          componentConfig={mode === 'global default' ? { Mentions: { onKeyDown } } : {}}
        >
          <Mentions
            options={['beijing']}
            onKeyDown={mode === 'custom' ? onKeyDown : undefined}
            onChange={onChange}
            onPressEnter={onPressEnter}
          />
        </ConfigProvider>
      );
      const textarea = wrapper.find('textarea').item(0);
      typeMention(textarea);
      await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));
      onChange.mockClear();

      fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

      expect(onChange).not.toHaveBeenCalled();
      expect(onKeyDown).toHaveBeenCalledTimes(mode === 'undefined' ? 0 : 1);
      expect(onPressEnter).toHaveBeenCalledTimes(1);
      expect(onPressEnter.mock.calls[0][1]).toBe(false);
      if (mode !== 'undefined') {
        expect(onPressEnter.mock.calls[0][0]).toBe(onKeyDown.mock.calls[0][0]);
      }
    }
  );

  it('keeps a reentrant Enter in another instance independent', async () => {
    const firstEnter = jest.fn();
    const secondEnter = jest.fn();
    wrapper = render(
      <>
        <Mentions
          options={['beijing']}
          onChange={(value) => {
            if (value === '@beijing') {
              fireEvent.keyDown(wrapper.find('textarea').item(1), {
                key: 'Enter',
                keyCode: Enter.code,
              });
            }
          }}
          onPressEnter={firstEnter}
        />
        <Mentions options={['shanghai']} onPressEnter={secondEnter} />
      </>
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(firstEnter).toHaveBeenCalledTimes(1);
    expect(secondEnter).toHaveBeenCalledTimes(1);
    expect(firstEnter.mock.calls[0][1]).toBe(true);
    expect(secondEnter.mock.calls[0][1]).toBe(false);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));
  });

  it('restores an accepted Enter after a reentrant unaccepted Enter', async () => {
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = render(
      <Mentions
        options={['beijing']}
        onChange={onChange}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            fireEvent.click(wrapper.find('.arco-select-option').item(0));
            fireEvent.keyDown(event.currentTarget, {
              key: 'Enter',
              keyCode: Enter.code,
              ctrlKey: true,
            });
          }
        }}
        onPressEnter={onPressEnter}
      />
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));
    onChange.mockClear();

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('@beijing');
    expect(onPressEnter.mock.calls.map((args) => args[1])).toEqual([false, true]);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));
  });

  it('does not borrow an accepted option from a nested non-Enter event', async () => {
    const onChange = jest.fn();
    const onPressEnter = jest.fn();
    wrapper = render(
      <Mentions
        options={['beijing']}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.keyCode === Enter.code) {
            fireEvent.keyDown(event.currentTarget, { key: 'a', keyCode: 65 });
          } else {
            fireEvent.click(wrapper.find('.arco-select-option').item(0));
          }
        }}
        onPressEnter={onPressEnter}
      />
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));
    onChange.mockClear();

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('@beijing');
    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][1]).toBe(false);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));
  });

  it('keeps an Enter dispatched by onPressEnter independent', async () => {
    const results = [];
    wrapper = render(
      <Mentions
        options={['beijing']}
        onPressEnter={(event, didSelectOption) => {
          results.push(didSelectOption);
          if (didSelectOption) {
            fireEvent.keyDown(event.currentTarget, {
              key: 'Enter',
              keyCode: Enter.code,
              ctrlKey: true,
            });
          }
        }}
      />
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(results).toEqual([true, false]);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));
  });

  it('preserves selection errors without marking the next Enter as accepted', async () => {
    const error = new Error('selection failed');
    const errors = [];
    const onError = (event: ErrorEvent) => {
      errors.push(event.error);
      event.preventDefault();
    };
    const onPressEnter = jest.fn();
    wrapper = render(
      <Mentions
        options={['beijing']}
        onChange={(value) => {
          if (value === '@beijing') {
            throw error;
          }
        }}
        onPressEnter={onPressEnter}
      />
    );
    const textarea = wrapper.find('textarea').item(0);
    typeMention(textarea);
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(1));

    window.addEventListener('error', onError);
    try {
      fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });
    } finally {
      window.removeEventListener('error', onError);
    }
    expect(errors).toContain(error);
    expect(onPressEnter).not.toHaveBeenCalled();
    await waitFor(() => expect(wrapper.find('.arco-select-option')).toHaveLength(0));

    fireEvent.keyDown(textarea, { key: 'Enter', keyCode: Enter.code });

    expect(onPressEnter).toHaveBeenCalledTimes(1);
    expect(onPressEnter.mock.calls[0][1]).toBe(false);
  });
});

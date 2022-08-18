import React from 'react';
import { act } from 'react-dom/test-utils';
import { Enter } from '../../_util/keycode';
import mountTest from '../../../tests/mountTest';
import { cleanup, fireEvent, render } from '../../../tests/util';
import componentConfigTest from '../../../tests/componentConfigTest';
import Input from '../input';

mountTest(Input);
mountTest(Input.Search);
mountTest(Input.TextArea);
componentConfigTest(Input, 'Input');

function mountInput(component: React.ReactElement) {
  return render(component);
}
function mountInputSearch(component: React.ReactElement) {
  return render(component);
}
function mountInputTextArea(component: React.ReactElement) {
  return render(component);
}
function mountInputPassword(component: React.ReactElement) {
  return render(component);
}

const getLengthString = (len: number) => {
  return new Array(len).fill('1').join('');
};

describe('Input', () => {
  afterEach(() => {
    cleanup();
  });
  it('onChange listener correctly', () => {
    const onChange = jest.fn();
    const component = mountInput(<Input onChange={onChange} />);
    const input = component.find('input')[0];
    fireEvent.change(input, {
      target: {
        value: 'Hello',
      },
    });
    expect(onChange.mock.calls.length).toBe(1);
    // expect(component.state().value).toBe('Hello');
  });

  it('composition input', () => {
    const onChange = jest.fn();
    const component = mountInput(<Input onChange={onChange} />);
    const input = component.find('input')[0];
    fireEvent.compositionUpdate(input, {
      target: {
        value: 'aa',
      },
    });
    fireEvent.change(input, {
      target: {
        value: 'bb',
      },
    });
    expect(onChange.mock.calls.length).toBe(0);
    fireEvent.compositionEnd(input, {
      target: {
        value: 'aa',
      },
    });
    fireEvent.change(input, {
      target: {
        value: 'bb',
      },
    });
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('prefix, suffix, addBefore, addAfter correctly', () => {
    const component = mountInput(
      <Input
        style={{ maxWidth: 400 }}
        addBefore={<span>addBefore</span>}
        addAfter={<span>addAfter</span>}
        prefix={<span>prefix</span>}
        suffix={<span>suffix</span>}
        placeholder="please enter..."
      />
    );
    expect(component.find('.arco-input-group-addafter')).toHaveLength(1);
    expect(component.find('.arco-input-group-addbefore')).toHaveLength(1);
    expect(component.find('.arco-input-group-prefix')).toHaveLength(1);
    expect(component.find('.arco-input-group-suffix')).toHaveLength(1);
    expect(component.find('.arco-input-group-addbefore > span')[0].textContent).toBe('addBefore');
    expect(component.find('.arco-input-group-addafter > span')[0].textContent).toBe('addAfter');
    expect(component.find('.arco-input-group-prefix > span')[0].textContent).toBe('prefix');
    expect(component.find('.arco-input-group-suffix > span')[0].textContent).toBe('suffix');
  });
});

describe('Test Search', () => {
  it('input search (searchButton)', () => {
    const onSearch = jest.fn();
    const component = mountInputSearch(
      <Input.Search
        placeholder="please enter search text"
        style={{ marginTop: 10, maxWidth: 400 }}
        onSearch={onSearch}
        defaultValue="search text"
        searchButton
      />
    );
    expect(component.querySelector('button svg')).toHaveClass('arco-icon-search');
    fireEvent.click(component.querySelector('button'));
    expect(onSearch.mock.calls[0][0]).toBe('search text');
  });

  it('input search (icon)', () => {
    const onSearch = jest.fn();
    const component = mountInputSearch(
      <Input.Search
        placeholder="please enter search text"
        style={{ marginTop: 10, maxWidth: 400 }}
        onSearch={onSearch}
        defaultValue="custom value"
      />
    );
    fireEvent.change(component.querySelector('input'));
    const iconButton = component.find('.arco-icon-search');
    fireEvent.click(iconButton[0]);

    expect(onSearch.mock.calls[0][0]).toBe('custom value');
  });
});

describe('Test Textarea', () => {
  it('textarea', () => {
    const onChange = jest.fn();
    const component = mountInputTextArea(<Input.TextArea onChange={onChange} />);
    const textarea = component.find('textarea')[0];
    expect(textarea.textContent).toBe('');
    act(() => {
      fireEvent.change(textarea, { target: { value: 'Hello' } });
    });
    expect(onChange.mock.calls[0][0]).toBe('Hello');
  });
  it('test input onPressEnter', () => {
    const onPressEnter = jest.fn();
    const component = mountInputTextArea(<Input onPressEnter={onPressEnter} />);
    const input = component.container.querySelector('input');

    act(() => {
      input && fireEvent.keyDown(input, { keyCode: Enter.code });
    });
    expect(onPressEnter.mock.calls.length).toBe(1);
  });

  it('test onPressEnter', () => {
    const onPressEnter = jest.fn();
    const component = mountInputTextArea(<Input.TextArea onPressEnter={onPressEnter} />);
    const textarea = component.container.querySelector('textarea');

    act(() => {
      textarea && fireEvent.keyDown(textarea, { keyCode: Enter.code });
    });
    expect(onPressEnter.mock.calls.length).toBe(1);
  });

  it('test onClear', () => {
    const onClear = jest.fn();
    const component = mountInput(<Input allowClear defaultValue="123" onClear={onClear} />);
    expect(component.find('input')[0].getAttribute('value')).toBe('123');
    fireEvent.click(component.find('.arco-input-clear-icon svg')[0]);
    expect(onClear.mock.calls.length).toBe(1);
    expect(component.find('input')[0].getAttribute('value')).toBe('');
  });

  it('test contains together allowClear and readOnly and do not show the clear button', () => {
    const component = mountInput(<Input allowClear readOnly defaultValue="123" />);
    expect(component.find('.arco-input-clear-icon svg')).toHaveLength(0);
  });

  it('test password', () => {
    const component = mountInputPassword(<Input.Password visibilityToggle />);

    expect(component.find('svg')[0]).toHaveClass('arco-icon-eye-invisible');
    expect(component.find('input')[0].getAttribute('type')).toBe('password');
    fireEvent.click(component.find('svg')[0]);
    expect(component.find('svg')[0]).toHaveClass('arco-icon-eye');
    expect(component.find('input')[0].getAttribute('type')).toBe('text');

    component.rerender(<Input.Password visibilityToggle={false} />);
    expect(component.find('svg')).toHaveLength(0);
  });

  it('test maxLength', () => {
    const input = render(<Input maxLength={10} defaultValue={getLengthString(20)} />);
    const inputHtmlElement = input.find('input')[0];
    expect(inputHtmlElement).toHaveAttribute('maxlength', '10');
    expect(inputHtmlElement).toHaveAttribute('value', getLengthString(10));

    input.unmount();

    const textarea = render(<Input.TextArea maxLength={50} defaultValue={getLengthString(100)} />);
    const textareaHtmlElement = textarea.find('textarea')[0];
    expect(textareaHtmlElement).toHaveAttribute('maxlength', '50');
    expect(textareaHtmlElement.textContent).toBe(getLengthString(50));
  });

  it('test maxLength and boolean showWordLimit', () => {
    const input = render(<Input maxLength={10} defaultValue={getLengthString(5)} showWordLimit />);
    const inputLimitElement = () => input.container.querySelectorAll('.arco-input-word-limit');
    expect(inputLimitElement()[0].textContent).toEqual('5/10');

    act(() => {
      input.rerender(<Input maxLength={10} value={getLengthString(20)} showWordLimit />);
    });
    expect(inputLimitElement()[0].textContent).toEqual('10/10');

    const textarea = render(
      <Input.TextArea maxLength={50} defaultValue={getLengthString(20)} showWordLimit />
    );
    const textareaLimitElement = () =>
      textarea.container.querySelectorAll('.arco-textarea-word-limit');
    expect(textareaLimitElement()[0].textContent).toEqual('20/50');

    act(() => {
      textarea.rerender(
        <Input.TextArea maxLength={50} value={getLengthString(100)} showWordLimit />
      );
    });
    expect(textareaLimitElement()[0].textContent).toEqual('50/50');

    act(() => {
      textarea.rerender(
        <Input.TextArea maxLength={50} value={getLengthString(100)} showWordLimit={false} />
      );
      input.rerender(<Input maxLength={10} value={getLengthString(20)} showWordLimit={false} />);
    });
    expect(textareaLimitElement()).toHaveLength(0);
    expect(inputLimitElement()).toHaveLength(0);
  });

  it('test maxLength.errorOnly', () => {
    const input = render(
      <Input
        maxLength={{ length: 10, errorOnly: true }}
        defaultValue={getLengthString(20)}
        showWordLimit
      />
    );
    const inputLimitElement = () => input.find('.arco-input-word-limit');
    expect(inputLimitElement()[0].textContent).toEqual('20/10');
    expect(inputLimitElement()[0]).toHaveClass('arco-input-word-limit-error');

    const textarea = render(
      <Input.TextArea
        maxLength={{ length: 50, errorOnly: true }}
        defaultValue={getLengthString(100)}
        showWordLimit
      />
    );
    const textareaLimitElement = () =>
      textarea.container.querySelector('.arco-textarea-word-limit');
    expect(textareaLimitElement()?.textContent).toEqual('100/50');
    expect(textareaLimitElement()).toHaveClass('arco-textarea-word-limit-error');
  });
});

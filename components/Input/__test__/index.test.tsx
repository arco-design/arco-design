import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Enter } from '../../_util/keycode';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Input from '../input';
import { InputSearchProps } from '../search';
import { InputProps, TextAreaProps } from '../interface';
import { InputPasswordProps } from '../password';

mountTest(Input);
mountTest(Input.Search);
mountTest(Input.TextArea);
componentConfigTest(Input, 'Input');

function mountInput(component: React.ReactElement) {
  return mount<typeof Input, InputProps>(component);
}
function mountInputSearch(component: React.ReactElement) {
  return mount<typeof Input.Search, InputSearchProps>(component);
}
function mountInputTextArea(component: React.ReactElement) {
  return mount<typeof Input.TextArea, TextAreaProps>(component);
}
function mountInputPassword(component: React.ReactElement) {
  return mount<InputPasswordProps>(component);
}

const getLengthString = (len: number) => {
  return new Array(len).fill('1').join('');
};

describe('Input', () => {
  it('onChange listener correctly', () => {
    const onChange = jest.fn();
    const component = mountInput(<Input onChange={onChange} />);
    const input = component.find('input');
    input.simulate('change', {
      target: {
        value: 'Hello',
      },
    });
    expect(onChange.mock.calls.length).toBe(1);
    // expect(component.state().value).toBe('Hello');
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
    expect(component.find('.arco-input-group-addbefore > span').text()).toBe('addBefore');
    expect(component.find('.arco-input-group-addafter > span').text()).toBe('addAfter');
    expect(component.find('.arco-input-group-prefix > span').text()).toBe('prefix');
    expect(component.find('.arco-input-group-suffix > span').text()).toBe('suffix');
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
    const searchButton = component.find('button');
    expect(searchButton.find('svg').hasClass('arco-icon-search')).toBe(true);
    searchButton.simulate('click');
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
    component.find('input').simulate('change');
    const iconButton = component.find('.arco-icon-search');
    iconButton.simulate('click');
    expect(onSearch.mock.calls[0][0]).toBe('custom value');
  });
});

describe('Test Textarea', () => {
  it('textarea', () => {
    const onChange = jest.fn();
    const component = mountInputTextArea(<Input.TextArea onChange={onChange} />);
    const textarea = component.find('textarea');
    expect(textarea.text()).toBe('');
    act(() => {
      textarea.prop('onChange')({ currentTarget: { value: 'Hello' } } as any);
    });
    expect(onChange.mock.calls[0][0]).toBe('Hello');
  });

  it('test onPressEnter', () => {
    const onPressEnter = jest.fn();
    const component = mountInputTextArea(<Input.TextArea onPressEnter={onPressEnter} />);
    const textarea = component.find('textarea');
    textarea.simulate('keydown', {
      keyCode: Enter.code,
    });
    expect(onPressEnter.mock.calls.length).toBe(1);
  });

  it('test onClear', () => {
    const onClear = jest.fn();
    const component = mountInput(<Input allowClear defaultValue="123" onClear={onClear} />);
    expect(
      component
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('123');
    component.find('.arco-input-clear-icon svg').simulate('click');
    expect(onClear.mock.calls.length).toBe(1);
    expect(
      component
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('');
  });

  it('test password', () => {
    const component = mountInputPassword(<Input.Password visibilityToggle />);

    expect(component.find('svg').hasClass('arco-icon-eye-invisible')).toBe(true);
    expect(
      component
        .find('input')
        .getDOMNode()
        .getAttribute('type')
    ).toBe('password');
    component.find('svg').simulate('click');
    expect(component.find('svg').hasClass('arco-icon-eye')).toBe(true);
    expect(
      component
        .find('input')
        .getDOMNode()
        .getAttribute('type')
    ).toBe('text');

    component.setProps({ visibilityToggle: false });
    expect(component.find('svg')).toHaveLength(0);
  });

  it('test maxLength', () => {
    const input = mount(<Input maxLength={10} defaultValue={getLengthString(20)} />);
    const inputHtmlElement = input.find('input');
    expect(inputHtmlElement.prop('maxLength')).toEqual(10);
    expect(inputHtmlElement.prop('value')).toEqual(getLengthString(10));

    const textarea = mount(<Input.TextArea maxLength={50} defaultValue={getLengthString(100)} />);
    const textareaHtmlElement = textarea.find('textarea');
    expect(textareaHtmlElement.prop('maxLength')).toEqual(50);
    expect(textareaHtmlElement.prop('value')).toEqual(getLengthString(50));
  });

  it('test maxLength and boolean showWordLimit', () => {
    const input = mount(<Input maxLength={10} defaultValue={getLengthString(5)} showWordLimit />);
    const inputLimitElement = () => input.find('.arco-input-word-limit');
    expect(inputLimitElement().text()).toEqual('5/10');

    act(() => {
      input.setProps({ value: getLengthString(20) });
    });
    expect(inputLimitElement().text()).toEqual('10/10');

    const textarea = mount(
      <Input.TextArea maxLength={50} defaultValue={getLengthString(20)} showWordLimit />
    );
    const textareaLimitElement = () => textarea.find('.arco-textarea-word-limit');
    expect(textareaLimitElement().text()).toEqual('20/50');

    act(() => {
      textarea.setProps({ value: getLengthString(100) });
    });
    expect(textareaLimitElement().text()).toEqual('50/50');

    act(() => {
      textarea.setProps({ showWordLimit: undefined });
      input.setProps({ showWordLimit: undefined });
    });
    expect(textareaLimitElement()).toHaveLength(0);
    expect(inputLimitElement()).toHaveLength(0);
  });

  it('test maxLength.errorOnly', () => {
    const input = mount(
      <Input
        maxLength={{ length: 10, errorOnly: true }}
        defaultValue={getLengthString(20)}
        showWordLimit
      />
    );
    const inputLimitElement = () => input.find('.arco-input-word-limit');
    expect(inputLimitElement().text()).toEqual('20/10');
    expect(inputLimitElement().hasClass('arco-input-word-limit-error')).toBe(true);

    const textarea = mount(
      <Input.TextArea
        maxLength={{ length: 50, errorOnly: true }}
        defaultValue={getLengthString(100)}
        showWordLimit
      />
    );
    const textareaLimitElement = () => textarea.find('.arco-textarea-word-limit');
    expect(textareaLimitElement().text()).toEqual('100/50');
    expect(textareaLimitElement().hasClass('arco-textarea-word-limit-error')).toBe(true);
  });
});

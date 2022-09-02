import React, { useState } from 'react';
import { fireEvent } from '@testing-library/dom';
import { sleep, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Button from '../../Button';
import Select from '../select';
import { Enter, Tab } from '../../_util/keycode';
import { LabeledValue } from '../interface';

mountTest(Select);
componentConfigTest(Select, 'Select');

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const Option = Select.Option;
let wrapper = null;

describe('Select', () => {
  beforeEach(() => {
    wrapper && wrapper.unmount();
  });

  it('tokenSeparators', async () => {
    const onChange = jest.fn();
    wrapper = render(
      <Select
        popupVisible
        allowCreate
        filterOption={false}
        mode="multiple"
        tokenSeparators={[',', ';', '\n']}
        onChange={onChange}
      />
    );

    const eleInput = wrapper.querySelector('input');

    fireEvent.change(eleInput, { target: { value: 'a,b' } });
    expect(onChange.mock.calls[0][0]).toEqual(['a', 'b']);

    await sleep(100);

    fireEvent.change(eleInput, { target: { value: 'c' } });
    fireEvent.keyDown(eleInput, { key: ',' });
    expect(wrapper.find('.arco-select-option')).toHaveLength(3);
  });

  it('tokenSeparators with allowCreate-false', async () => {
    wrapper = render(
      <Select mode="multiple" tokenSeparators={[',', '|', '/', '\n']} allowCreate={false} />
    );

    const eleInput = wrapper.querySelector('input');

    fireEvent.change(eleInput, { target: { value: 'a,b' } });
    fireEvent.keyDown(eleInput, {
      key: Enter.key,
    });
    expect(wrapper.find('.arco-tag')).toHaveLength(0);

    await sleep(100);

    fireEvent.change(eleInput, { target: { value: 'c' } });
    fireEvent.keyDown(eleInput, { key: Tab.key });
    expect(wrapper.find('.arco-tag')).toHaveLength(0);
  });

  it('OptGroup works', async () => {
    wrapper = render(
      <Select popupVisible options={[1, 2, 3]}>
        <Select.OptGroup label="GroupOne">
          <Select.Option value="G1_V1">G1_V1</Select.Option>
          <Select.Option value="G1_V2">G1_V2</Select.Option>
          <Select.Option value={undefined} />
        </Select.OptGroup>
      </Select>
    );

    await sleep(100);
    expect(wrapper.querySelector('.arco-select-group-title').innerHTML).toBe('GroupOne');
    expect(wrapper.find('.arco-select-option')).toHaveLength(5);
  });

  it('onChange listener correctly', async () => {
    const onChange = jest.fn();
    wrapper = render(
      <Select defaultValue="Option 1" onChange={onChange}>
        {OPTIONS.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    );

    const eleInput = wrapper.querySelector('input');
    expect(eleInput.getAttribute('value')).toBe('Option 1');

    fireEvent.click(wrapper.querySelector('.arco-select'));
    await sleep(100);
    expect(wrapper.querySelectorAll('.arco-select-popup')).toHaveLength(1);

    fireEvent.click(wrapper.querySelectorAll('.arco-select-option')[2]);
    expect(eleInput.getAttribute('value')).toBe('Option 3');
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('multiply mode correctly, clear correctly, disabled correctly', async () => {
    const onChange = jest.fn();
    wrapper = render(
      <Select
        allowClear
        popupVisible
        mode="multiple"
        defaultValue={['Option 2', 'Option 3', 'Option 5']}
        onChange={onChange}
      >
        {OPTIONS.map((option, index) => (
          <Option key={option} value={option} disabled={index === 2}>
            {option}
          </Option>
        ))}
      </Select>
    );

    await sleep(100);

    expect(wrapper.find('.arco-tag')).toHaveLength(3);
    fireEvent.click(wrapper.querySelector('.arco-select-clear-icon'));
    expect(onChange.mock.calls[0][0]).toHaveLength(1);
    expect(wrapper.querySelectorAll('.arco-select-option-disabled')).toHaveLength(1);
  });

  it('showSearch correctly', async () => {
    wrapper = render(
      <Select showSearch>
        {OPTIONS.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    );
    const eleInput = wrapper.querySelector('input');

    fireEvent.click(wrapper.querySelector('.arco-select'));
    await sleep(100);
    expect(wrapper.querySelectorAll('.arco-select-option')[0]).toHaveClass(
      'arco-select-option-hover'
    );

    fireEvent.change(eleInput, { target: { value: OPTIONS[3] } });
    expect(wrapper.find('.arco-select-option')).toHaveLength(1);
    expect(wrapper.querySelector('.arco-select-highlight').innerHTML).toBe(OPTIONS[3]);

    fireEvent.change(eleInput, { target: { value: '@' } });
    expect(wrapper.find('.arco-select-option')).toHaveLength(0);
  });

  it('showSearch async correctly', async () => {
    const onSearch = jest.fn();
    wrapper = render(
      <Select mode="multiple" filterOption={false} options={OPTIONS} onSearch={onSearch} />
    );
    fireEvent.change(wrapper.querySelector('input'), { target: { value: 'A' } });
    expect(onSearch.mock.calls[0][0]).toBe('A');
  });

  it('popup with correct position', async () => {
    wrapper = render(
      <Select
        options={OPTIONS}
        triggerProps={{
          position: 'left',
        }}
      />
    );
    fireEvent.click(wrapper.querySelector('.arco-select'));
    await sleep(100);
    expect(wrapper.querySelector('.arco-trigger')).toHaveClass('arco-trigger-position-left');
  });

  it('show value correctly when defaultValue does not exist in options', () => {
    wrapper = render(
      <div>
        <Select mode="multiple" options={OPTIONS} defaultValue={[1]} />
        <Select options={OPTIONS} defaultValue={1} />
      </div>
    );
    expect(wrapper.find('.arco-tag')).toHaveLength(1);
    expect(wrapper.querySelector('.arco-select-view-value').innerHTML).toBe('1');
  });

  it('renderFormat correctly', () => {
    wrapper = render(
      <Select
        showSearch
        defaultValue={1}
        options={OPTIONS.map((option, index) => ({ label: option, value: index }))}
        renderFormat={(option) => `${option.value} - ${option.children}`}
      />
    );
    const eleInput = wrapper.querySelector('input');
    expect(eleInput.getAttribute('value')).toBe(`1 - ${OPTIONS[1]}`);
    fireEvent.click(wrapper.querySelector('.arco-select-view'));
    expect(eleInput.getAttribute('placeholder')).toBe(`1 - ${OPTIONS[1]}`);
  });

  it('dropdownRender', async () => {
    wrapper = render(
      <Select
        popupVisible
        options={OPTIONS}
        dropdownRender={(menu) => {
          return (
            <div>
              {menu}
              <Button>Add</Button>
            </div>
          );
        }}
      />
    );
    await sleep(100);
    expect(wrapper.querySelector('.arco-select-popup .arco-btn span').innerHTML).toBe('Add');
  });

  it('dropdownStyle & dropdownClassName', async () => {
    wrapper = render(
      <Select
        popupVisible
        options={OPTIONS}
        dropdownMenuStyle={{ fontSize: 20 }}
        dropdownMenuClassName="xxx"
      />
    );

    await sleep(100);
    const menu = wrapper.querySelector('.arco-select-popup .arco-select-popup-inner');
    expect(menu).toHaveClass('xxx');
    expect(getComputedStyle(menu).fontSize).toBe('20px');
  });

  it('Compatible when labelInValue is set, value is passed in the object', () => {
    wrapper = render(
      <>
        <Select
          className="demo-1"
          mode="multiple"
          labelInValue
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
          ]}
        />
        <Select
          className="demo-2"
          mode="multiple"
          labelInValue
          defaultValue={[{ label: '1', value: 1 }, 2] as any}
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
          ]}
        />
        <Select
          className="demo-3"
          labelInValue
          value={{ value: 1, label: 'One' }}
          renderFormat={(_, labeledValue) => {
            const { label, value } = labeledValue as LabeledValue;
            return label || value;
          }}
        />
        <Select
          className="demo-4"
          labelInValue
          mode="multiple"
          defaultValue={[{ value: 1, label: 'One' }]}
        />
        <Select
          className="demo-5"
          labelInValue
          mode="multiple"
          defaultValue={[{ value: 1, label: 'One' }]}
          renderFormat={(_, labeledValue) => {
            const { label, value } = labeledValue as LabeledValue;
            return label || value;
          }}
        />
      </>
    );

    expect(wrapper.find('.demo-1 .arco-tag')).toHaveLength(0);
    expect(wrapper.find('.demo-2 .arco-tag')).toHaveLength(2);
    expect(wrapper.querySelector('.demo-3 .arco-select-view-value')).toHaveTextContent('One');
    expect(wrapper.querySelector('.demo-4 .arco-tag')).toHaveTextContent('One');
    expect(wrapper.querySelector('.demo-5 .arco-tag')).toHaveTextContent('One');
  });

  it('User creating option will not affect original options', async () => {
    const value = 'Hello';
    wrapper = render(
      <Select
        allowCreate
        popupVisible
        mode="multiple"
        inputValue={value}
        defaultValue={[value]}
        options={[{ value, label: value, disabled: true }]}
      />
    );
    await sleep(100);
    expect(wrapper.find('.arco-select-option-disabled')).toHaveLength(1);
  });

  it('Render triggerElement correctly', () => {
    wrapper = render(
      <Select
        value="hello"
        labelInValue
        options={[{ value: 'hello', label: 'HELLO' }]}
        triggerElement={({ value: { value, label } }) => (
          <span className="custom-trigger-element">
            {label}-{value}
          </span>
        )}
      />
    );
    expect(wrapper.querySelector('.custom-trigger-element').innerHTML).toBe('HELLO-hello');
  });

  it('Mouse event callback of Select.Option', async () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();
    wrapper = render(
      <Select popupVisible>
        <Select.Option
          value={1}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      </Select>
    );

    await sleep(100);

    const eleOption = wrapper.querySelector('.arco-select-option');

    // fireEvent.mouseLeave(eleOption);
    // fireEvent.mouseEnter(eleOption);
    fireEvent.click(eleOption);

    // expect(onMouseEnter).toBeCalled();
    // expect(onMouseLeave).toBeCalled();
    expect(onClick).toBeCalled();
  });

  it('trigger onInputValueChange correctly', async () => {
    const Demo = () => {
      const [inputValue, setInputValue] = useState('');
      return (
        <Select
          popupVisible
          filterOption={false}
          mode="multiple"
          options={[1, 2, 3, 4]}
          inputValue={inputValue}
          onInputValueChange={(inputValue, reason) => {
            if (reason !== 'optionChecked') {
              setInputValue(inputValue);
            }
          }}
        />
      );
    };
    wrapper = render(<Demo />);

    await sleep(100);
    const eleInput = wrapper.querySelector('input');
    // Input 1
    fireEvent.change(eleInput, { target: { value: '1' } });
    expect(eleInput.getAttribute('value')).toBe('1');
    fireEvent.click(wrapper.querySelector('.arco-select-option'));
    expect(eleInput.getAttribute('value')).toBe('1');
    // Clear input
    fireEvent.change(eleInput, { target: { value: '' } });
    expect(eleInput.getAttribute('value')).toBe('');
  });

  it('trigger onKeyDown correctly', () => {
    const onKeyDown = jest.fn();
    const wrapper = render(<Select onKeyDown={onKeyDown} />);
    fireEvent.keyDown(wrapper.querySelector('input'));
    expect(onKeyDown).toHaveBeenCalled();
  });
});

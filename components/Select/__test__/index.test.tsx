import React from 'react';
import { mount } from 'enzyme';
import { sleep, $ } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Button from '../../Button';
import Select from '../select';
import { Enter, Tab } from '../../_util/keycode';
import { LabeledValue } from '../interface';

mountTest(Select);
componentConfigTest(Select, 'Select');

function mountSelect(component) {
  return mount(component);
}

const Option = Select.Option;
const options = [
  '南非龙虾',
  '新西兰羊排',
  '海鲜烩意面',
  '摩卡慕斯',
  '酱烧豆腐',
  '千舟一叶',
  '葱油鲷鱼',
  '提拉米苏',
  '奶油蘑菇鸡肉卷',
];

let wrapper = null;

describe('Select', () => {
  beforeEach(() => {
    wrapper && wrapper.unmount();
  });

  it('tokenSeparators', async () => {
    const onChange = jest.fn();
    wrapper = mountSelect(
      <Select
        popupVisible
        allowCreate
        mode="multiple"
        tokenSeparators={[',', ';', '\n']}
        onChange={onChange}
      />
    );

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'a,b' } })
      .simulate('keydown', {
        key: Enter.key,
      });

    expect(onChange.mock.calls[0][0]).toEqual(['a', 'b']);

    await sleep(100);

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'c' } })
      .simulate('keydown', {
        key: ',',
      })
      .simulate('change', { target: { value: 'c,' } });

    expect(wrapper.find('.arco-select-option')).toHaveLength(3);
  });

  it('tokenSeparators with allowCreate is false', async () => {
    wrapper = mountSelect(
      <Select
        mode="multiple"
        placeholder="Please select"
        tokenSeparators={[',', '|', '/', '\n']}
        allowCreate={false}
        allowClear
        style={{ width: 345 }}
      />
    );

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'a,b' } })
      .simulate('keydown', {
        key: Enter.key,
      });

    expect(wrapper.find('.arco-tag').exists()).toBeFalsy();

    await sleep(100);

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'c' } })
      .simulate('keydown', {
        key: Tab.key,
      });

    expect(wrapper.find('.arco-tag').exists()).toBeFalsy();
  });

  it('OptGroup works', () => {
    wrapper = mountSelect(
      <Select popupVisible options={[1, 2, 3]}>
        <Select.OptGroup label="GroupOne">
          <Select.Option value="G1_V1">G1_V1</Select.Option>
          <Select.Option value="G1_V2">G1_V2</Select.Option>
        </Select.OptGroup>
      </Select>
    );

    expect(wrapper.find('.arco-select-group-title').at(0).text()).toBe('GroupOne');
    expect(wrapper.find('.arco-select-option')).toHaveLength(5);
  });

  it('onChange listener correctly', () => {
    const mockFn = jest.fn();
    jest.useFakeTimers();
    wrapper = mountSelect(
      <Select
        placeholder="请选择语言"
        style={{ width: 300 }}
        defaultValue="南非龙虾"
        allowClear
        onChange={mockFn}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    );
    expect(wrapper.find('input').props().value).toBe('南非龙虾');

    wrapper.simulate('click');
    jest.runAllTimers();
    expect($('.arco-select-popup').length).toBe(1);

    wrapper.find('.arco-select-option').at(2).simulate('click');
    expect(wrapper.find('input').props().value).toBe('海鲜烩意面');
    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('multiply mode correctly,clear correctly, disabled correctly', () => {
    const onChange = jest.fn();
    wrapper = mountSelect(
      <Select
        mode="multiple"
        placeholder="请选择语言"
        style={{ width: 300 }}
        defaultValue={['新西兰羊排', '酱烧豆腐', '海鲜烩意面']}
        allowClear
        onChange={onChange}
      >
        {options.map((option, index) => (
          <Option key={option} value={option} disabled={index === 2}>
            {option}
          </Option>
        ))}
      </Select>
    );
    expect(wrapper.find('.arco-tag')).toHaveLength(3);

    wrapper.find('.arco-select').at(0).simulate('click');
    expect($('.arco-select-popup-inner .arco-select-option-disabled').length).toBe(1);

    wrapper.find('IconClose').last().simulate('click');
    expect(onChange.mock.calls[0][0]).toHaveLength(1);
  });

  it('showSearch correctly', () => {
    wrapper = mountSelect(
      <Select showSearch allowClear placeholder="请选择食物" style={{ width: 300 }}>
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    );
    const input = wrapper.find('input');

    wrapper.find('.arco-select').at(0).simulate('click');
    expect(
      wrapper
        .find('.arco-select-popup .arco-select-option')
        .at(0)
        .hasClass('arco-select-option-hover')
    ).toBeTruthy();

    input.simulate('change', { target: { value: '海鲜' } });

    expect(wrapper.find('.arco-select-popup .arco-select-option')).toHaveLength(1);
    expect(wrapper.find('.arco-select-popup .arco-select-option').at(0).text()).toEqual(
      '海鲜烩意面'
    );

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '@' } });
    expect(wrapper.find('Empty')).toHaveLength(1);
  });

  it('showSearch async correctly', () => {
    const mockFn = jest.fn();
    wrapper = mountSelect(
      <Select
        mode="multiple"
        placeholder="请选择语言"
        style={{ width: 300 }}
        onSearch={mockFn}
        filterOption={false}
        defaultValue={['新西兰羊排', '酱烧豆腐', '海鲜烩意面']}
        allowClear
      >
        {options.map((option, index) => (
          <Option key={option} value={option} disabled={index === 2}>
            {option}
          </Option>
        ))}
      </Select>
    );
    wrapper.find('.arco-select').at(0).simulate('click');
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '南' } });
    expect(mockFn.mock.calls[0][0]).toBe('南');
  });

  it('popOver correctly', () => {
    wrapper = mountSelect(
      <Select
        placeholder="请选择语言"
        style={{ width: 300 }}
        defaultValue="南非龙虾"
        allowClear
        triggerProps={{
          position: 'left',
        }}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    );
    wrapper.find('.arco-select').at(0).simulate('click');
    expect(wrapper.find('.arco-trigger').hasClass('arco-trigger-position-left')).toBeTruthy();
  });

  it('show value correctly when defaultValue does not exist in options', () => {
    wrapper = mountSelect(
      <Select className="test" mode="multiple" defaultValue={[1]}>
        {options.map((option, index) => (
          <Option key={option} value={option} disabled={index === 2}>
            {option}
          </Option>
        ))}
      </Select>
    );
    expect(wrapper.find('.arco-tag')).toHaveLength(1);
    expect(wrapper.find('.arco-tag').at(0).text()).toBe('1');

    const singleWrapper = mountSelect(
      <Select defaultValue={1}>
        {options.map((option, index) => (
          <Option key={option} value={option} disabled={index === 2}>
            {option}
          </Option>
        ))}
      </Select>
    );
    expect(singleWrapper.find('input').prop('value')).toBe(1);
  });

  it('renderFormat correctly', () => {
    wrapper = mountSelect(
      <Select
        showSearch
        allowClear
        defaultValue={1}
        placeholder="请选择食物"
        renderFormat={(option) => {
          return `${option.value} - ${option.children}`;
        }}
        options={options.map((option, index) => ({ label: option, value: index }))}
      />
    );
    const input = wrapper.find('input');
    expect(input.prop('value')).toBe(`1 - ${options[1]}`);
    wrapper.find('.arco-select-view').simulate('click');
    // expect(wrapper.find('input').prop('value')).toBeFalsy();
    expect(input.prop('placeholder')).toBe(`1 - ${options[1]}`);
  });

  it('dropdownRender', () => {
    wrapper = mountSelect(
      <Select
        dropdownRender={(menu) => {
          return (
            <div>
              {menu}
              <Button>Add</Button>
            </div>
          );
        }}
        options={options}
      />
    );
    wrapper.find('.arco-select').at(0).simulate('click');
    expect(wrapper.find('.arco-select-popup .arco-btn').text()).toBe('Add');
  });

  it('dropdownStyle & dropdownClassName', () => {
    wrapper = mountSelect(
      <Select options={options} dropdownMenuStyle={{ fontSize: 20 }} dropdownMenuClassName="xxx" />
    );
    wrapper.find('.arco-select').at(0).simulate('click');

    const menu = wrapper.find('.arco-select-popup .arco-select-popup-inner').at(0);
    expect(menu.hasClass('xxx')).toBeTruthy();
    expect(getComputedStyle(menu.getDOMNode()).getPropertyValue('font-size')).toBe('20px');
  });

  it('Compatible when labelInValue is set, value is passed in the object', () => {
    wrapper = mountSelect(
      <Select
        mode="multiple"
        labelInValue
        options={[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ]}
      />
    );

    expect(wrapper.find('.arco-tag')).toHaveLength(0);

    wrapper = mountSelect(
      <Select
        mode="multiple"
        labelInValue
        defaultValue={[{ label: '1', value: 1 }, 2] as any}
        options={[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ]}
      />
    );

    expect(wrapper.find('.arco-tag')).toHaveLength(2);

    wrapper = mountSelect(
      <Select
        placeholder="Please select"
        labelInValue
        value={{ value: 1, label: 'One' }}
        renderFormat={(_, labeledValue) => {
          const { label, value } = labeledValue as LabeledValue;
          return label || value;
        }}
      />
    );

    expect(wrapper.find('.arco-select-view-value').at(0).text()).toBe('One');

    wrapper = mountSelect(
      <Select
        placeholder="Please select"
        labelInValue
        mode="multiple"
        defaultValue={[{ value: 1, label: 'One' }]}
        renderFormat={(_, labeledValue) => {
          const { label, value } = labeledValue as LabeledValue;
          return label || value;
        }}
      />
    );

    expect(wrapper.find('.arco-input-tag-tag-content').at(0).text()).toBe('One');
  });

  it('User creating option will not affect original options', () => {
    const value = 'Hello';
    wrapper = mountSelect(
      <Select
        allowCreate
        popupVisible
        mode="multiple"
        inputValue={value}
        defaultValue={[value]}
        options={[{ value, label: value, disabled: true }]}
      />
    );
    expect(wrapper.find('.arco-select-option-disabled')).toHaveLength(1);
  });

  it('Render triggerElement correctly', () => {
    wrapper = mountSelect(
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
    expect(wrapper.find('.custom-trigger-element').at(0).text()).toBe('HELLO-hello');
  });

  it('Mouse event callback of Select.Option', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onClick = jest.fn();
    wrapper = mountSelect(
      <Select popupVisible>
        <Select.Option
          value={1}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      </Select>
    );
    wrapper
      .find('.arco-select-option')
      .at(0)
      .simulate('click')
      .simulate('mouseenter')
      .simulate('mouseleave');
    expect(onMouseEnter).toBeCalled();
    expect(onMouseLeave).toBeCalled();
    expect(onClick).toBeCalled();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import mountTest from '../../../tests/mountTest';
import Form from '..';
import { FormProps } from '../interface';
import InputNumber from '../../InputNumber';
import DatePicker from '../../DatePicker';

const FormItem = Form.Item;
const FormControl = Form.Control;

mountTest(Form);

function mountForm(component: React.ReactElement) {
  return mount<typeof Form, React.PropsWithChildren<FormProps>>(component);
}

describe('Form test', () => {
  it('basic form', () => {
    const component = mountForm(
      <Form>
        <FormItem label="name">a</FormItem>
        <FormItem label="number">1</FormItem>
      </Form>
    );

    const labels = component.find(
      '.arco-form-item .arco-form-label-item.arco-col.arco-col-5 label'
    );
    const contents = component.find('.arco-form-item .arco-form-item-wrapper.arco-col.arco-col-19');

    expect(labels).toHaveLength(2);
    expect(labels.at(0).text()).toBe(' name');
    expect(labels.at(1).text()).toBe(' number');

    expect(contents).toHaveLength(2);
    expect(contents.at(0).text()).toBe('a');
    expect(contents.at(1).text()).toBe('1');
  });

  // 这个是来测试一些兼容1.15.0以前版本的form-control独有的一些用法.（p.s: 同时提高下分支覆盖率 T . T）
  it('form control', () => {
    const onValuesChange = jest.fn();
    const formValuesChange = jest.fn();
    const onInputChange = jest.fn();

    const wrapper = mountForm(
      <Form onValuesChange={formValuesChange}>
        <FormItem>
          <FormControl field="name" onValuesChange={onValuesChange}>
            <InputNumber onChange={onInputChange} />
          </FormControl>
        </FormItem>
      </Form>
    );

    const input = wrapper.find('InputNumber');

    input.find('input').simulate('change', {
      target: { value: '12' },
    });

    expect(onInputChange).toHaveBeenCalled();
    expect(onValuesChange).toHaveBeenCalled();
    expect(formValuesChange).toHaveBeenCalled();
  });

  it('formatter form', () => {
    let formRef;
    const initDate = {
      begin: '2020-02-02',
      end: '2020-03-01',
    };
    const wrapper = mountForm(
      <Form ref={(node) => (formRef = node)}>
        <FormItem
          label="Number"
          extra="Please enter number"
          field="date"
          rules={[
            {
              required: true,
              message: 'Please enter number',
            },
          ]}
          initialValue={initDate}
          normalize={(value) => {
            return { begin: value && value[0], end: value && value[1] };
          }}
          formatter={(value) => {
            return value && value.begin ? [value.begin, value.end] : [];
          }}
        >
          <DatePicker.RangePicker />
        </FormItem>
      </Form>
    );

    expect(formRef.getFieldValue('date')).toEqual(initDate);
    expect(wrapper.find('input').at(0).getDOMNode().getAttribute('value')).toBe(initDate.begin);
    expect(wrapper.find('input').at(1).getDOMNode().getAttribute('value')).toBe(initDate.end);

    act(() => {
      wrapper.find('input').at(0).simulate('click');

      // 选中起始月份的第一天
      wrapper.find('.arco-picker-cell-in-view').first().simulate('click');

      wrapper.find('input').at(1).simulate('click');

      // 选中结束月份最后一天
      wrapper.find('.arco-picker-cell-in-view').last().simulate('click');
    });

    expect(formRef.getFieldValue('date')).toEqual({
      begin: '2020-02-01',
      end: '2020-03-31',
    });
  });

  it('getValueFromEvent', () => {
    const mockFn = jest.fn();
    const wrapper = mountForm(
      <Form>
        <FormItem
          label="Number"
          field="date"
          rules={[
            {
              required: true,
              message: 'Please enter number',
            },
          ]}
          getValueFromEvent={mockFn}
        >
          <InputNumber />
        </FormItem>
      </Form>
    );

    const input = wrapper.find('InputNumber');

    input.find('input').simulate('change', {
      target: { value: '12' },
    });
  });
});

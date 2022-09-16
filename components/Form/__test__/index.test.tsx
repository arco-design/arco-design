import React from 'react';
import { render, fireEvent } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import Form from '..';
import InputNumber from '../../InputNumber';
import DatePicker from '../../DatePicker';

const FormItem = Form.Item;
const FormControl = Form.Control;

mountTest(Form);

function mountForm(component: React.ReactElement) {
  return render(component);
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
    expect(labels[0].textContent).toBe(' name');
    expect(labels[1].textContent).toBe(' number');

    expect(contents).toHaveLength(2);
    expect(contents[0].textContent).toBe('a');
    expect(contents[1].textContent).toBe('1');
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

    fireEvent.change(wrapper.querySelector('input') as Element, {
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
    expect(wrapper.find('input')[0].getAttribute('value')).toBe(initDate.begin);
    expect(wrapper.find('input')[1].getAttribute('value')).toBe(initDate.end);

    fireEvent.click(wrapper.find('input')[0]);

    const cells = wrapper.find('.arco-picker-cell-in-view');

    // 选中起始月份的第一天

    fireEvent.click(cells[0]);

    fireEvent.click(wrapper.find('input')[1]);

    // 选中结束月份最后一天
    fireEvent.click(cells[cells.length - 1]);

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

    fireEvent.change(wrapper.querySelector('input') as Element, {
      target: { value: '12' },
    });
  });
});

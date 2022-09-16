import React, { useState } from 'react';
import { act } from 'react-test-renderer';
import { fireEvent, render } from '../../../tests/util';
import { Form, Input, Button } from '../..';
import { FormInstance } from '..';

const FormItem = Form.Item;
const FormControl = Form.Control;

interface FieldProps {
  index: number;
  initValue: string;
  action: (index: number) => void;
}

const Field: React.FC<FieldProps> = ({ index, initValue, action }) => {
  return (
    <FormItem>
      <FormControl
        field={`license${index}`}
        rules={[
          {
            required: true,
            message: '请输入名称',
          },
        ]}
        initialValue={initValue}
      >
        <Input
          addAfter={
            <Button className="delete-button" onClick={() => action(index)}>
              删除
            </Button>
          }
          afterStyle={{ border: 'none', backgroundColor: '#fff' }}
          placeholder="规则名称"
        />
      </FormControl>
    </FormItem>
  );
};

let num = 3;

interface DemoProps {
  savRef: React.Ref<FormInstance>;
  onChange?: () => void;
}

const Demo: React.FC<DemoProps> = ({ savRef, onChange }) => {
  const initialList = Array(num + 1)
    .fill(undefined)
    .map((_, i) => ({ id: i, value: `${i}` }));
  const [list, setList] = useState(initialList);

  function addFormItem() {
    num++;
    const newList = list.slice(0);
    newList.push({ id: num, value: `${num}` });
    setList(newList);
  }

  function deleteFormItem(index: number) {
    const newList = list.filter((item) => item.id !== index);
    setList(newList);
  }

  const listItems = list.map((item) => {
    return <Field key={item.id} index={item.id} initValue={item.value} action={deleteFormItem} />;
  });

  return (
    <Form
      onChange={onChange}
      wrapperCol={{ span: 24 }}
      wrapper="div"
      ref={savRef}
      style={{ width: 600 }}
    >
      {listItems}
      <div style={{ textAlign: 'right' }}>
        <Button className="add-button" onClick={addFormItem}>
          添加表单项
        </Button>
        <Button style={{ margin: '0 12px' }} type="primary">
          提交
        </Button>
      </div>
    </Form>
  );
};

function mountDemo(component: React.ReactElement) {
  return render(component);
}

describe('add and delete', () => {
  let formRef: FormInstance;
  const changeMock = jest.fn();
  const wrapper = mountDemo(
    <Demo onChange={changeMock} savRef={(node) => (formRef = node as FormInstance)} />
  );
  const addButton = wrapper.querySelector('.add-button') as Element;

  it('should add', async () => {
    expect(wrapper.find('.arco-form-item-control')).toHaveLength(4);
    expect(num).toBe(3);
    expect(Object.keys(formRef.getFieldsValue())).toEqual([
      'license0',
      'license1',
      'license2',
      'license3',
    ]);
    await act(() => {
      fireEvent.click(addButton);
    });

    expect(changeMock.call.length).toBe(1);
    expect(num).toBe(4);
    expect(wrapper.find('.arco-form-item-control')).toHaveLength(5);
    expect(`license4` in formRef.getFieldsValue()).toBe(true);

    await act(() => {
      fireEvent.click(addButton);
    });

    expect(Object.keys(formRef.getFieldsValue()).length).toBe(6);

    const key0 = Object.keys(formRef.getFieldsValue())[0];
    const delButton = wrapper.querySelector('.delete-button') as Element;

    await act(() => {
      fireEvent.click(delButton);
    });

    expect(Object.keys(formRef.getFieldsValue()).length).toBe(5);
    expect(key0 in formRef.getFieldsValue()).toBe(false);
  });
});

import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, sleep } from '../../../tests/util';
import { Form, Input, Button } from '../..';

describe('Form issue #3181', () => {
  it('onSubmit and validate should keep emptied Form.List as [] like onValuesChange', async () => {
    let formRef;
    let valuesChange: Record<string, unknown> = {};
    let submitValues: Record<string, unknown> | null = null;
    let validateValues: Record<string, unknown> | null = null;

    const wrapper = render(
      <Form
        ref={(node) => (formRef = node)}
        initialValues={{ posts: [{ title: 'a' }, { title: 'b' }] }}
        onValuesChange={(changed) => {
          valuesChange = { ...valuesChange, ...changed };
        }}
        onSubmit={(values) => {
          submitValues = values;
        }}
      >
        <Form.List field="posts">
          {(fields, { remove }) => (
            <div>
              {fields.map((item) => (
                <Form.Item key={item.key} field={`${item.field}.title`} noStyle>
                  <Input />
                </Form.Item>
              ))}
              <Button
                className="remove-all"
                onClick={() => {
                  for (let i = fields.length - 1; i >= 0; i--) {
                    remove(i);
                  }
                }}
              >
                clear
              </Button>
              <Button type="primary" htmlType="submit" className="submit-btn">
                submit
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    );

    const removeAll = wrapper.querySelector('.remove-all') as Element;
    act(() => {
      fireEvent.click(removeAll);
      fireEvent.click(removeAll);
    });

    // store keeps [] after clearing the list; getFieldsValue may omit untouched list roots
    expect(formRef.getFields()).toEqual({ posts: [] });

    fireEvent.submit(wrapper.querySelector('form') as Element);
    await sleep(20);

    await act(async () => {
      await new Promise<void>((resolve) => {
        formRef.validate((_errors, values) => {
          validateValues = values;
          resolve();
        });
      });
    });

    expect(submitValues).toEqual({ posts: [] });
    expect(validateValues).toEqual({ posts: [] });
  });
});

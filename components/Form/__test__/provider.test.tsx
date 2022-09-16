import React from 'react';
import { act } from 'react-test-renderer';
import { Form, Input, Button } from '../..';
import { sleep, render, fireEvent } from '../../../tests/util';

describe('Form.Provider', () => {
  it('form provider callback', async () => {
    const mockSubmit = jest.fn();
    const mockChange = jest.fn();
    let aForm;
    let bForm;

    const wrapper = render(
      <Form.Provider onFormSubmit={mockSubmit} onFormValuesChange={mockChange}>
        <Form id="a" ref={(node) => (aForm = node)}>
          <Form.Item field="a.input">
            <Input />
          </Form.Item>
          <Button htmlType="submit">a</Button>
        </Form>
        <Form id="b" ref={(node) => (bForm = node)}>
          <Form.Item field="b.input">
            <Input />
          </Form.Item>
          <Button htmlType="submit">b</Button>
        </Form>
        <Form>
          <Form.Item field="c.input">
            <Input />
          </Form.Item>
          <Button htmlType="submit">c</Button>
        </Form>
      </Form.Provider>
    );

    act(() => {
      fireEvent.change(wrapper.querySelector('input') as Element, {
        target: { value: '1' },
      });
    });

    expect(mockChange.mock.calls[0][0]).toEqual('a');
    expect(mockChange.mock.calls[0][1]).toEqual({ 'a.input': '1' });

    aForm.submit();
    await sleep(10);
    expect(mockSubmit.call.length).toBe(1);
    expect(mockSubmit.mock.calls[0][0]).toEqual('a');
    expect(mockSubmit.mock.calls[0][1]).toEqual({ a: { input: '1' } });
    expect(mockSubmit.mock.calls[0][2]).toEqual({ forms: { a: aForm, b: bForm } });

    bForm.submit();
    await sleep(10);

    expect(mockSubmit.mock.calls[1][0]).toEqual('b');
    expect(mockSubmit.mock.calls[1][1]).toEqual({ b: { input: undefined } });

    act(() => {
      fireEvent.change(wrapper.find('input')[2], {
        target: { value: 'c' },
      });
    });

    expect(mockChange.mock.calls[1][0]).toEqual(undefined);
    expect(mockChange.mock.calls[1][1]).toEqual({ 'c.input': 'c' });
  });
});

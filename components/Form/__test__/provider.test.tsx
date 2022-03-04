import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
import { Form, Input, Button } from '../..';
import { sleep } from '../../../tests/util';

describe('Form.Provider', () => {
  it('form provider callback', async () => {
    const mockSubmit = jest.fn();
    const mockChange = jest.fn();
    let aForm;
    let bForm;

    const wrapper = mount(
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
      wrapper
        .find('input')
        .at(0)
        .simulate('change', {
          target: { value: 1 },
        });
    });
    await sleep(10);

    expect(mockChange.mock.calls[0][0]).toEqual('a');
    expect(mockChange.mock.calls[0][1]).toEqual({ 'a.input': 1 });

    aForm.submit();
    await sleep(10);
    expect(mockSubmit.call.length).toBe(1);
    expect(mockSubmit.mock.calls[0][0]).toEqual('a');
    expect(mockSubmit.mock.calls[0][1]).toEqual({ a: { input: 1 } });
    expect(mockSubmit.mock.calls[0][2]).toEqual({ forms: { a: aForm, b: bForm } });

    bForm.submit();
    await sleep(10);

    expect(mockSubmit.mock.calls[1][0]).toEqual('b');
    expect(mockSubmit.mock.calls[1][1]).toEqual({ b: { input: undefined } });

    act(() => {
      wrapper
        .find('input')
        .at(2)
        .simulate('change', {
          target: { value: 'c' },
        });
    });
    await sleep(10);

    expect(mockChange.mock.calls[1][0]).toEqual(undefined);
    expect(mockChange.mock.calls[1][1]).toEqual({ 'c.input': 'c' });
  });
});

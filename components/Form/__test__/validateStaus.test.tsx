import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import { Form, Input } from '../..';
import { FormProps } from '../interface';

mountTest(Form);

function mountForm(component: React.ReactElement) {
  return mount<typeof Form, React.PropsWithChildren<FormProps>>(component);
}

describe('form validate status', () => {
  it('success', async () => {
    const wrapper = mountForm(
      <Form>
        <Form.Item label="name" field="name" validateStatus="success">
          <Input />
        </Form.Item>
      </Form>
    );

    expect(
      wrapper
        .find('.arco-form-item')
        .hostNodes()
        .hasClass('arco-form-item-status-success')
    ).toBe(true);
  });
  it('error', async () => {
    const wrapper = mountForm(
      <Form>
        <Form.Item label="name" field="name" validateStatus="error">
          <Input />
        </Form.Item>
      </Form>
    );

    expect(
      wrapper
        .find('.arco-form-item')
        .hostNodes()
        .hasClass('arco-form-item-status-error')
    ).toBe(true);
  });
  it('warning', async () => {
    const wrapper = mountForm(
      <Form>
        <Form.Item label="name" field="name" validateStatus="warning">
          <Input />
        </Form.Item>
      </Form>
    );

    expect(
      wrapper
        .find('.arco-form-item')
        .hostNodes()
        .hasClass('arco-form-item-status-warning')
    ).toBe(true);
  });

  it('help', async () => {
    const wrapper = mountForm(
      <Form>
        <Form.Item label="name" field="name" validateStatus="warning" help="this is warning status">
          <Input />
        </Form.Item>
      </Form>
    );

    expect(
      wrapper
        .find('.arco-form-message')
        .hostNodes()
        .hasClass('arco-form-message-help')
    ).toBe(true);
  });

  it('dont under Form', async () => {
    const wrapper = mountForm(
      <div>
        <Form.Item label="name" field="name" validateStatus="error" help="this is error status">
          <Input />
        </Form.Item>
      </div>
    );
    expect(
      wrapper
        .find('.arco-form-item')
        .hostNodes()
        .hasClass('arco-form-item-status-error')
    ).toBe(true);

    expect(
      wrapper
        .find('.arco-form-message')
        .hostNodes()
        .hasClass('arco-form-message-help')
    ).toBe(true);
  });
});

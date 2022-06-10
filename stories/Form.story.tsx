import React from 'react';
import { Form, Input, Button, Grid } from '@self';
import { IconArrowRise, IconArrowFall, IconDelete } from '@self/icon';

export const Demo = function Demo() {
  const [form] = Form.useForm();
  const values = Form.useWatch('posts', form);

  return (
    <div>
      <Form
        form={form}
        style={{ width: 600 }}
        initialValues={{
          users: ['Username'],
          posts: ['post1'],
        }}
      >
        <Form.Item label="Username" field="username" style={{ width: 370 }}>
          <Input />
        </Form.Item>

        <Form.Item shouldUpdate>
          {(v) => {
            return v.username ? (
              <Form.Item field="aaa" label="aaa">
                <Input />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.List field="posts">
          {(fields, { add, remove, move }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <Grid.Row key={item.key}>
                      <Form.Item
                        field={item.field}
                        label={`Post-${index}`}
                        style={{ width: 370 }}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>

                      <Button
                        icon={<IconDelete />}
                        shape="circle"
                        status="danger"
                        style={{ margin: '0 20px' }}
                        onClick={() => remove(index)}
                      />
                      <Button
                        shape="circle"
                        onClick={() => move(index, index > 0 ? index - 1 : index + 1)}
                      >
                        {index > 0 ? <IconArrowRise /> : <IconArrowFall />}
                      </Button>
                    </Grid.Row>
                  );
                })}
                <div>
                  <Button
                    style={{ marginRight: 20 }}
                    onClick={() => {
                      add();
                    }}
                  >
                    Add post
                  </Button>
                  <Button
                    onClick={() => {
                      add('new 2', 1);
                    }}
                  >
                    Add post to the second slot
                  </Button>
                </div>
              </div>
            );
          }}
        </Form.List>
        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
            Submit
          </Button>
          <Button
            style={{ marginRight: 20 }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Reset
          </Button>
          <Button
            status="danger"
            onClick={() => {
              form.setFields({
                'posts[0]': {
                  error: {
                    message: 'error',
                  },
                },
              });
            }}
          >
            Set `Post-0` to error state
          </Button>
        </Form.Item>
      </Form>
      <pre>{JSON.stringify(values)}</pre>
    </div>
  );
};

export default {
  title: 'Form',
};

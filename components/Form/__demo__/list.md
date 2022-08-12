---
order: 8
title:
  zh-CN: 动态增减表单项
  en-US: List
---

## zh-CN

通过`Form.List`管理数组类型的表单结构。

## en-US

Provides array management for fields.

```js
import { useRef, useState } from 'react';
import { Form, Input, Button, Grid, Space } from '@arco-design/web-react';
import { IconArrowRise, IconArrowFall, IconDelete } from '@arco-design/web-react/icon';

function App() {
  const formRef = useRef();
  return (
    <div>
      <Form
        ref={formRef}
        style={{ width: 600 }}
        autoComplete="off"
        initialValues={{
          users: ['Username'],
          posts: ['post1'],
        }}
        onSubmit={(v) => {
          console.log(v);
        }}
        onValuesChange={(_, v) => {
          console.log(_, v);
        }}
      >
        <Form.Item label="Username" field="username" style={{ width: 370 }}>
          <Input />
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
                        label={'Post-' + index}
                        style={{
                          width: 370,
                        }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Button
                        icon={<IconDelete />}
                        shape="circle"
                        status="danger"
                        style={{
                          margin: '0 20px',
                        }}
                        onClick={() => remove(index)}
                      ></Button>
                      <Button
                        shape="circle"
                        onClick={() => move(index, index > 0 ? index - 1 : index + 1)}
                      >
                        {index > 0 ? <IconArrowRise /> : <IconArrowFall />}
                      </Button>
                    </Grid.Row>
                  );
                })}
                <Space size={20}>
                  <Button
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
                </Space>
              </div>
            );
          }}
        </Form.List>
        <Form.Item style={{ marginTop: 20 }}>
          <Space size={20}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={() => {
                formRef.current.resetFields();
              }}
            >
              Reset
            </Button>
            <Button
              status="danger"
              onClick={() => {
                formRef.current.setFields({
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
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
```

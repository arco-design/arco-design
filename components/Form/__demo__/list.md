---
order: 8
title:
  zh-CN: 动态增减表单项
  en-US: List
---

## zh-CN


通过`Form.List`管理数组类型的表单结构。设置校验规则时 `Form.List` 会渲染出额外的 `DOM` 节点用来展示校验信息，如果不需要可以传入 `noStyle=false`，并通过 `Form.useFormState` 自定义校验信息的展示。

## en-US

Manage the form structure of array type through `Form.List`. When setting validation rules, `Form.List` will render an additional `DOM` node to display the validation information. If you don’t need it, you can pass in `noStyle=false` and customize the validation information through `Form.useFormState` display.

```js
import { useRef, useState } from 'react';
import { Form, Input, Button, Grid, Space } from '@arco-design/web-react';
import { IconArrowRise, IconArrowFall, IconDelete } from '@arco-design/web-react/icon';

function App() {
  const [form] = Form.useForm();
  const postsState = Form.useFormState('posts', form) || {};

  console.log(postsState, '____');

  return (
    <div>
      <Form
        form={form}
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
        <Form.Item>
          <Form.List
            rules={[
              {
                validator(v, cb) {
                  if (v?.length < 2) {
                    return cb('必须超过两条');
                  }
                  return cb();
                },
              },
            ]}
            field="posts"
          >
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
        </Form.Item>
        <Form.Item style={{ marginTop: 20 }}>
          <Space size={20}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
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
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
```

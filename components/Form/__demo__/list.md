---
order: 5
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
import { Form, Input, Button, Grid } from '@arco-design/web-react';
import { IconArrowRise, IconArrowFall } from '@arco-design/web-react/icon';

function Demo () {
  const formRef = useRef();

  return (
  <div>
    <Button
      type="primary"
      style={{ marginBottom: 20, marginRight: 20 }}
      onClick={() => {
        const posts = formRef.current.getFieldValue('posts') || [];
        formRef.current.setFieldValue('posts', posts.concat('new'))
      }}>
      setFieldValue
    </Button>
    <Button
      style={{ marginBottom: 20 }}
      onClick={() => {
        formRef.current.setFields({
          'posts[0]': {
            error: {
              message: 'error'
            }
          }
        })
      }}>
      Set `Post-0` to error state
    </Button>

    <Form
      ref={formRef}
      style={{ width: 600 }}
      initialValues={{
        users: ['Username'],
      }}
      onSubmit={(v) => {
        console.log(v);
      }}
      onValuesChange={(_, v) => {
        console.log(_, v);
      }}
    >
      <Form.Item label="Username" field="username" style={{width: 330}}>
        <Input />
      </Form.Item>
      <Form.List field="posts">
        {(fields, { add, remove, move }) => {
          return (
            <div>
              {fields.map((item, index) => {
                return (
                  <Grid.Row key={item.key} >
                    <Form.Item
                      field={item.field}
                      label={'Post-' + index}
                      style={{width: 370}}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Button status="danger" style={{ margin: '0 20px' }} onClick={() => remove(index)}>
                      Delete
                    </Button>
                    <Button status={index > 0 ? 'danger' : 'success'} onClick={() => move(index, index > 0 ?  index - 1 : index + 1)}>
                      {index > 0 ? <IconArrowRise/> : <IconArrowFall />}
                    </Button>
                  </Grid.Row>
                );
              })}
              <Grid.Row justify="space-between">
                <Button
                  onClick={() => {
                    add();
                  }}
                >
                  Add user
                </Button>
                <Button
                  onClick={() => {
                    add('new 2', 1);
                  }}
                >
                  Add user to the second slot
                </Button>
                <div>
                  <Button
                    onClick={() => {
                      formRef.current.resetFields();
                    }}
                  >
                    Reset
                  </Button>
                  <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
                    Submit
                  </Button>
                </div>
              </Grid.Row>
            </div>
          );
        }}
      </Form.List>
    </Form>
  </div>
  )
}

ReactDOM.render(<Demo />, CONTAINER);
```

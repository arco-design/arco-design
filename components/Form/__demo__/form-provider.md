---
order: 20
title:
  zh-CN: 多表单联动
  en-US: Manage multiple form data
---

## zh-CN

可以通过 `Form.Provider` 组件管理多个表单的数据。`2.30.0` 支持。需要想要获得对应的表单实例，需要为 `Form` 组件设置 `id` 属性。

## en-US

The 'form.provider' component allows you to manage data from multiple forms. `2.30.0` support. To get the corresponding Form instance, you need to set the ID property for the Form component.

```js
import React from 'react';
import {
  Form,
  Grid,
  Input,
  Button,
  Modal,
  Message,
  Tag,
  Typography,
  Table,
  Select,
  InputNumber,
  Space,
} from '@arco-design/web-react';

const defaultData = [...new Array(5)].map((_, index) => {
  return {
    key: index,
    name: 'Jane Doe ' + index,
    salary: 23000,
    email: 'jane.doe@example.com',
    gender: index % 2 > 0 ? 'male' : 'female',
    age: 20 + index,
  };
});

function ModalForm(props) {
  return (
    <div>
      <Modal visible title="Add" footer={null} onCancel={props.onCancel}>
        <Form id="modalForm" autoComplete="off">
          <Form.Item field="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5 }} label="">
            <Space>
              <Button onClick={props.onCancel}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

function RefreshForm() {
  return (
    <Form id="refreshForm" layout="inline" style={{ width: 'auto' }}>
      <Form.Item field="keyword">
        <Input.Search placeholder="enter keyword" />
      </Form.Item>
      <Button htmlType="submit">Refresh</Button>
    </Form>
  );
}

function App() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Form.Provider
        onFormValuesChange={(name, changedValues, info) => {
          console.log('onFormValuesChange: ', name, changedValues, info);
        }}
        onFormSubmit={(name, values, info) => {
          console.log('onFormSubmit: ', name, values, info);

          if (name === 'modalForm') {
            info.forms.searchForm.setFieldsValue({
              email: values.email,
            });
            setVisible(false);
          }

          Message.info({
            icon: <span></span>,
            content: (
              <div style={{ textAlign: 'left' }}>
                <span>form values:</span>
                <pre>
                  {JSON.stringify(
                    {
                      ...info.forms.searchForm.getFieldsValue(),
                      ...info.forms.refreshForm.getFieldsValue(),
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            ),
          });
        }}
      >
        <Form id="searchForm" layout="vertical">
          <Grid.Row gutter={24}>
            <Grid.Col span={8}>
              <Form.Item label="Name" field="name">
                <Input placeholder="enter name" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="Gender" field="gender">
                <Select
                  placeholder="select gender"
                  options={['All', 'Female', 'Male', 'Unknown']}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="Age" field="age">
                <InputNumber placeholder="enter age" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Space>
            <Form.Item field="email" shouldUpdate noStyle>
              {(values) => {
                return <Tag color="arcoblue">email: {values.email || 'null'}</Tag>;
              }}
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Search
            </Button>
            <Button
              onClick={() => {
                setVisible(true);
              }}
            >
              Add filter
            </Button>
          </Space>
        </Form>

        <br />
        <br />
        <Grid.Row justify="space-between" align="center">
          <Typography.Text style={{ fontSize: 18 }} bold>
            Result
          </Typography.Text>
          <RefreshForm />
        </Grid.Row>
        <br />
        {visible && (
          <ModalForm
            onCancel={() => {
              setVisible(false);
            }}
          />
        )}
      </Form.Provider>
      <Table
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
          },
          {
            title: 'Salary',
            dataIndex: 'salary',
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
          },
          {
            title: 'Age',
            dataIndex: 'age',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
        ]}
        data={defaultData}
      />
    </div>
  );
}

export default App;
```

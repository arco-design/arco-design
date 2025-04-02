import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Space, Divider } from '@self';

// 定义表单数据类型
interface FormType {
  name: {
    firstName: string;
    lastName: string;
  };
  desc: string;
  age: number;
  hobbies: string[];
}

// 类型推断演示组件
const TypeDemo = ({ value, label }: { value: any; label: string }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Typography.Text style={{ display: 'block', fontWeight: 'bold' }}>{label}</Typography.Text>
      <Card style={{ marginTop: '4px', background: '#f5f5f5' }}>
        <pre style={{ margin: 0 }}>
          {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
        </pre>
        <Typography.Text type="secondary" style={{ display: 'block', marginTop: '4px' }}>
          类型: {Array.isArray(value) ? 'array' : typeof value}
        </Typography.Text>
      </Card>
    </div>
  );
};

export const Demo = () => {
  // 使用泛型指定表单数据类型
  const [form] = Form.useForm<FormType>();
  const [formData, setFormData] = useState<Partial<FormType>>({});

  // 使用 useWatch 监听不同字段
  const name = Form.useWatch('name', form);
  // @ts-expect-error 预期报错，与form.getFieldsValue()行为保持一致
  const firstName = Form.useWatch('name.firstName', form); // 注意：这里的类型推断有限制
  const age = Form.useWatch('age', form);
  const hobbies = Form.useWatch('hobbies', form);

  // 监听多个字段
  const multipleFields = Form.useWatch(['name', 'age'], form);

  // 初始化表单数据
  useEffect(() => {
    form.setFieldsValue({
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      desc: 'Frontend Developer',
      age: 30,
      hobbies: ['Coding', 'Reading'],
    });
  }, [form]);

  // 提交表单
  const handleSubmit = () => {
    form
      .validate()
      .then((values) => {
        setFormData(values);
      })
      .catch((e) => {
        console.error('Validation failed', e);
      });
  };

  // 重置表单
  const handleReset = () => {
    form.resetFields();
    setFormData({});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography.Title heading={4}>useWatch 类型安全演示</Typography.Title>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 表单部分 */}
        <Card title="表单" style={{ width: '50%' }}>
          <Form form={form} autoComplete="off" style={{ width: '100%' }}>
            <Form.Item label="First Name" field="name.firstName" rules={[{ required: true }]}>
              <Input placeholder="请输入名字" />
            </Form.Item>

            <Form.Item label="Last Name" field="name.lastName" rules={[{ required: true }]}>
              <Input placeholder="请输入姓氏" />
            </Form.Item>

            <Form.Item label="Description" field="desc">
              <Input placeholder="请输入描述" />
            </Form.Item>

            <Form.Item label="Age" field="age" rules={[{ required: true, type: 'number' }]}>
              <Input type="number" placeholder="请输入年龄" />
            </Form.Item>

            <Form.Item label="Hobbies" field="hobbies">
              <Input
                placeholder="请输入爱好，用逗号分隔"
                onChange={(value) => {
                  const hobbies = value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean);
                  form.setFieldValue('hobbies', hobbies);
                }}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" onClick={handleSubmit}>
                  提交
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {/* 类型演示部分 */}
        <Card title="useWatch 返回值类型" style={{ width: '50%' }}>
          <Typography.Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
            useWatch
            根据传入的字段类型返回不同的类型：单个字段返回该字段的值类型，字段数组返回对象类型
          </Typography.Text>

          <TypeDemo label="name = useWatch('name', form)" value={name} />

          <TypeDemo label="firstName = useWatch('name.firstName', form)" value={firstName} />
          <Typography.Text type="warning" style={{ display: 'block', marginBottom: '16px' }}>
            注意：对于嵌套路径 name.firstName，类型系统无法正确推断出它是 string 类型
          </Typography.Text>

          <TypeDemo label="age = useWatch('age', form)" value={age} />

          <TypeDemo label="hobbies = useWatch('hobbies', form)" value={hobbies} />

          <Divider />

          <TypeDemo
            label="multipleFields = useWatch(['name', 'age'], form)"
            value={multipleFields}
          />
          <Typography.Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
            当传入字段数组时，返回包含这些字段的对象类型
          </Typography.Text>
        </Card>
      </div>

      {/* 提交的表单数据 */}
      {Object.keys(formData).length > 0 && (
        <Card title="提交的表单数据">
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
};

export default {
  title: 'Form',
};

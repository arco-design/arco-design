import React, { useState } from 'react';
import { Typography, Button, Switch, Input, Form, Descriptions, Space } from '@self';

const defaultText = `A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process. `;

const defaultConfig = {
  ellipsisStr: '...',
};
const Demo = () => {
  const [config, setConfig] = useState(defaultConfig);
  const [rows, setRows] = useState(1);
  const [text, setText] = useState(defaultText);

  const { ellipsis, ellipsisStr, expandable, suffix } = config;
  return (
    <>
      <Space align="start" size={120}>
        <Form
          onValuesChange={(_, values) => setConfig(values)}
          style={{ width: '400px' }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          size="small"
        >
          <Form.Item label="超出省略" field="ellipsis" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="展开/折叠" field="expandable" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="省略号" field="ellipsisStr" initialValue={defaultConfig.ellipsisStr}>
            <Input />
          </Form.Item>
          <Form.Item label="suffix" field="suffix">
            <Input />
          </Form.Item>
          <Form.Item label="省略展示">
            <Space size="middle">
              <Button onClick={() => setRows(Math.max(1, rows - 1))}> row- </Button>
              <Button onClick={() => setRows(rows + 1)}> row+ </Button>
            </Space>
          </Form.Item>
          <Form.Item label="文字操作">
            <Button onClick={() => setText(text + defaultText)} type="primary">
              addText
            </Button>
          </Form.Item>
        </Form>
        <Descriptions
          column={1}
          title="当前配置"
          data={[
            ...Object.entries(config).map(([label, value]) => ({
              label,
              value: String(value),
            })),
            { label: 'rows', value: rows },
          ]}
          style={{ marginBottom: 20 }}
          labelStyle={{ paddingRight: 36 }}
        />
      </Space>

      <div>
        <Typography.Paragraph
          ellipsis={ellipsis ? { rows: rows, expandable, suffix, ellipsisStr } : undefined}
        >
          {text}
        </Typography.Paragraph>
      </div>
    </>
  );
};

export default Demo;

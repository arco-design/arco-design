import React, { useState, useRef, useEffect } from 'react';
import { Typography, Button, Switch, Input, Form, Descriptions, Space } from '@self';
import ResizeObserver from 'resize-observer-polyfill';

const defaultText = `A design is a plan or specification for the construction of an object or system or for the
implementation of an activity or process. A design is a plan or specification for the
construction of an object or system or for the implementation of an activity or process`;

const defaultConfig = {
  ellipsisStr: '...',
  // ellipsis: true,
};
const App = () => {
  const [config, setConfig] = useState(defaultConfig);
  const [rows, setRows] = useState(1);
  const [text, setText] = useState(defaultText);
  const currentRef = useRef();

  const onResize = () => {
    console.log('triggered on register');
  };

  useEffect(() => {
    let key;
    if (currentRef.current) {
      key = new ResizeObserver(onResize);
      // onResize will trigger when observe start
      key.observe(currentRef.current);
    }
    return () => {
      key.disconnect();
      key = undefined;
    };
  }, []);

  const { ellipsis, ellipsisStr, expandable, suffix } = config;
  return (
    <div ref={currentRef}>
      <Space align="start" size={120}>
        <Form
          onValuesChange={(_, values) => setConfig(values)}
          style={{ width: '500px' }}
          size="small"
        >
          <Form.Item label="超出省略" field="ellipsis">
            <Switch />
          </Form.Item>
          <Form.Item label="展开/折叠" field="expandable">
            <Switch />
          </Form.Item>
          <Form.Item label="省略号" field="ellipsisStr" initialValue={defaultConfig.ellipsisStr}>
            <Input />
          </Form.Item>
          <Form.Item label="suffix" field="suffix">
            <Input />
          </Form.Item>
          <Form.Item label="r省略展示（行）">
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
          style={{ width: '200px' }}
          title="当前配置"
          data={[
            ...Object.entries(config).map(([label, value]) => ({
              label,
              value: String(value), //<Typography.Text ellipsis>{String(value)}</Typography.Text>,
            })),
            { label: 'rows', value: rows },
          ]}
          style={{ marginBottom: 20 }}
          labelStyle={{ paddingRight: 36 }}
        />
      </Space>

      <div style={{ width: 400 }}>
        <Typography.Text
          editable
          ellipsis={ellipsis ? { rows: rows, expandable, suffix, ellipsisStr } : undefined}
        >
          {text}
        </Typography.Text>
      </div>
    </div>
  );
};

export default App;

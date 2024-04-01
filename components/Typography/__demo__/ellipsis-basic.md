---
order: 5
title:
  zh-CN: 文本省略（推荐）
  en-US: Text Ellipsis(Recommended)
---

## zh-CN

当文字内容超出容器后会自动显示省略号。
当 `rows = 1` 时为单行省略，此时操作按钮默认不会展示，可以设置 `expandable = { single: true }` 开启。

## en-US

When the text content exceeds the container, an ellipsis will be automatically displayed.
When `rows = 1`, a single row is omitted. At this time, the operation button will not be displayed by default. You can set `expandable = { single: true }` to enable it.

```js
import {
  Typography,
  Button,
  Switch,
  Input,
  Form,
  Descriptions,
  Space, ResizeBox
} from '@arco-design/web-react';
import { useState } from 'react';

const defaultText = 'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';

function App() {
  const [form] = Form.useForm();
  const [config, setConfig] = useState({
    disabled: false,
    expandable: true,
    expandableSingle: false,
    expanded: false,
    showTooltip: false
  });
  const [text, setText] = useState(defaultText);
  const [rows, setRows] = useState(1);

  return (
    <div>
      <Space align="start" size={120}>
        <Form
          form={form}
          initialValues={config}
          onValuesChange={(_, values) => setConfig(values)}
          style={{ width: '400px', }}
          labelCol={{ span: 6, }}
          wrapperCol={{ span: 18, }}
          size="small"
        >
          <Form.Item label="展开/折叠" field="expanded" triggerPropName="checked">
            <Switch/>
          </Form.Item>
          <Form.Item label="省略提示" field="showTooltip" triggerPropName="checked">
            <Switch/>
          </Form.Item>
          <Form.Item label="展示操作按钮" field="expandable" triggerPropName="checked">
            <Switch/>
          </Form.Item>
          <Form.Item label="展示操作按钮（单行）" field="expandableSingle" triggerPropName="checked">
            <Switch/>
          </Form.Item>
          <Form.Item label="禁用省略" field="disabled" triggerPropName="checked">
            <Switch/>
          </Form.Item>
          <Form.Item label="省略展示">
            <Space size="medium">
              <Button onClick={() => setRows(Math.max(1, rows - 1))}>row-</Button>
              <Button onClick={() => setRows(rows + 1)}>row+</Button>
            </Space>
          </Form.Item>
          <Form.Item label="文字操作">
            <Input.TextArea value={text} onChange={setText}/>
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
            {
              label: 'rows',
              value: rows,
            },
          ]}
          style={{ marginBottom: 20, }}
          labelStyle={{ paddingRight: 36, }}
        />
      </Space>

      <ResizeBox
        directions={['right']}
        style={{
          width: 500,
          minWidth: 100,
        }}
      >
        <Typography.Ellipsis
          rows={rows} {...config}
          expandable={config.expandableSingle ? { single: true } : config.expandable}
          onExpand={(v) => form.setFieldsValue({
            expanded: v
          })}>{text}</Typography.Ellipsis>
      </ResizeBox>
    </div>
  );
}

export default App;
```

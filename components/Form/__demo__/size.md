---
order: 15
title:
  zh-CN: 不同尺寸
  en-US: Size
---

## zh-CN

通过 `size` 属性可以设置不同尺寸的表单

## en-US

The `size` attribute allows you to set forms of different sizes

```js
import { useRef, useEffect, useState } from 'react';
import {
  Form,
  AutoComplete,
  Input,
  Select,
  TreeSelect,
  Button,
  Radio,
  Cascader,
  Message,
  InputNumber,
  DatePicker,
} from '@arco-design/web-react';
const FormItem = Form.Item;
const cascaderOptions = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'beijingshi',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'Chaoyang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'shanghaishi',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};
const noLabelLayout = {
  wrapperCol: {
    span: 17,
    offset: 7,
  },
};

function App() {
  const formRef = useRef();
  const [size, setSize] = useState('default');

  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
  };

  return (
    <div style={{ maxWidth: 650 }}>
      <Form
        ref={formRef}
        {...formItemLayout}
        size={size}
        autoComplete="off"
        onValuesChange={onValuesChange}
        scrollToFirstError
      >
        <FormItem label="Form size">
          <Radio.Group type="button" value={size} onChange={setSize}>
            <Radio value="mini">mini</Radio>
            <Radio value="small">small</Radio>
            <Radio value="default">default</Radio>
            <Radio value="large">large</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label="Username">
          <Input placeholder="please enter..." />
        </FormItem>
        <FormItem label="Age">
          <InputNumber placeholder="please enter" />
        </FormItem>
        <FormItem label="Province">
          <Cascader showSearch placeholder="please select" allowClear options={cascaderOptions} />
        </FormItem>
        <FormItem label="Auto-complete">
          <AutoComplete placeholder="please enter" data={['123', '234', '345', '456']} />
        </FormItem>
        <FormItem label="Post">
          <Select
            placeholder="please select"
            options={[
              {
                label: 'one',
                value: 0,
              },
              {
                label: 'two',
                value: 1,
              },
              {
                label: 'three',
                value: 2,
              },
            ]}
            allowClear
          />
        </FormItem>
        <FormItem label="Multiple Choice">
          <Select
            mode="multiple"
            allowCreate
            placeholder="please select"
            options={['a', 'b', 'c', 'd', 'e']}
          />
        </FormItem>
        <FormItem label="TreeSelect">
          <TreeSelect allowClear placeholder="please select">
            <TreeSelect.Node key="node1" title="Trunk(node1)">
              <TreeSelect.Node key="node2" title="Leaf(node2)" />
            </TreeSelect.Node>
            <TreeSelect.Node key="node3" title="Trunk2(node3)">
              <TreeSelect.Node key="node4" title="Leaf(node4)" />
              <TreeSelect.Node key="node5" title="Leaf(node5)" />
            </TreeSelect.Node>
          </TreeSelect>
        </FormItem>
        <FormItem label="Date">
          <DatePicker showTime />
        </FormItem>
      </Form>
    </div>
  );
}

export default App;
```

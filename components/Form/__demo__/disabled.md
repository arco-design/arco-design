---
order: 14
title:
  zh-CN: 全局禁用
  en-US: Disabled
---

## zh-CN

给 `Form` 组件设置 `disabled` 可以全局禁用所有表单控件。

## en-US

Set `disabled` to the `Form` component to globally disable all form controls.

```js
import { useRef, useEffect, useState } from 'react';
import {
  Form,
  AutoComplete,
  Input,
  Select,
  Button,
  Tooltip,
  Checkbox,
  Switch,
  Radio,
  Cascader,
  Message,
  InputNumber,
  Rate,
  Slider,
  Upload,
  Grid,
  DatePicker,
  Modal,
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
  useEffect(() => {
    formRef.current.setFieldsValue({
      rate: 5,
    });
  }, []);

  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
  };

  return (
    <div style={{ maxWidth: 650 }}>
      <Form
        disabled
        autoComplete="off"
        ref={formRef}
        {...formItemLayout}
        size={size}
        initialValues={{
          slider: 20,
          'a.b[0].c': ['b'],
        }}
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
        <FormItem
          label="Username"
          field="name"
          rules={[{ required: true, message: 'username is required' }]}
        >
          <Input placeholder="please enter..." />
        </FormItem>
        <FormItem label="Age" field="age" rules={[{ type: 'number', required: true }]}>
          <InputNumber placeholder="please enter" />
        </FormItem>
        <FormItem
          label="Province"
          field="province"
          rules={[
            {
              type: 'array',
              required: true,
            },
            {
              type: 'array',
              length: 4,
              message: 'Must choose a node of length four',
            },
          ]}
        >
          <Cascader showSearch placeholder="please select" allowClear options={cascaderOptions} />
        </FormItem>
        <FormItem label="Auto-complete" field="autocomplete" rules={[{ required: true }]}>
          <AutoComplete placeholder="please enter" data={['123', '234', '345', '456']} />
        </FormItem>
        <FormItem label="Post" field="post" rules={[{ required: true }]}>
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
        <FormItem
          label="Multiple Choice"
          required
          field="a.b[0].c"
          rules={[{ type: 'array', minLength: 1, message: 'choice is required' }]}
        >
          <Select
            mode="multiple"
            allowCreate
            placeholder="please select"
            options={['a', 'b', 'c', 'd', 'e']}
          />
        </FormItem>
        <FormItem label="Score" field="score" rules={[{ required: true, type: 'number' }]}>
          <Rate />
        </FormItem>
        <FormItem
          label="Date"
          field="date"
          rules={[{ required: true, message: 'date is required' }]}
        >
          <DatePicker showTime />
        </FormItem>
        <FormItem
          label="Switch"
          field="switch"
          triggerPropName="checked"
          rules={[{ type: 'boolean', true: true, message: 'must be true' }]}
        >
          <Switch />
        </FormItem>
        <FormItem
          label="Radio"
          field="radio"
          rules={[
            {
              validator: (value, callback) => {
                if (value !== 'b') {
                  callback('you can only choose b');
                }
              },
            },
          ]}
        >
          <Radio.Group>
            <Radio value="a">A</Radio>
            <Radio value="b">B</Radio>
            <Radio disabled value="c">
              C
            </Radio>
            <Radio value="d"> D </Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          label="Slide"
          field="slider"
          rules={[
            {
              validator: (value, callback) => {
                if (value < 50) {
                  callback('must be greater than 50!');
                }
              },
            },
          ]}
        >
          <Slider></Slider>
        </FormItem>
        <Form.Item
          label="Upload"
          field="upload"
          triggerPropName="fileList"
          initialValue={[
            {
              uid: '-1',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
              name: '20200717',
            },
          ]}
        >
          <Upload
            listType="picture-card"
            multiple
            name="files"
            action="/"
            onPreview={(file) => {
              Modal.info({
                title: 'Preview',
                content: (
                  <img
                    src={file.url || URL.createObjectURL(file.originFile)}
                    style={{
                      maxWidth: '100%',
                    }}
                  ></img>
                ),
              });
            }}
          />
        </Form.Item>
        <FormItem
          {...noLabelLayout}
          field="readme"
          triggerPropName="checked"
          rules={[
            {
              type: 'boolean',
              true: true,
              message: 'must be true',
            },
          ]}
        >
          <Checkbox>I have read the employee manual</Checkbox>
        </FormItem>
        <FormItem {...noLabelLayout}>
          <Button
            onClick={async () => {
              if (formRef.current) {
                try {
                  await formRef.current.validate();
                  Message.info('pass verification, submit succeed!');
                } catch (_) {
                  console.log(formRef.current.getFieldsError());
                  Message.error('verification failed, Please check the fields!');
                }
              }
            }}
            type="primary"
            style={{
              marginRight: 24,
            }}
          >
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
            type="text"
            onClick={() => {
              Message.info(`fields: ${formRef.current.getTouchedFields().join(',')}`);
            }}
          >
            Get touched fields
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}

export default App;
```

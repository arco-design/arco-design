import React, { useRef, useEffect, useState } from 'react';

import {
  Form,
  AutoComplete,
  Input,
  Select,
  Button,
  Checkbox,
  Switch,
  Radio,
  Cascader,
  Message,
  InputNumber,
  Rate,
  Slider,
  Upload,
  DatePicker,
  ConfigProvider,
  Grid,
  FormInstance,
  FormProps,
  ConfigProviderProps,
} from '@self';

const FormItem = Form.Item;

const cascaderOptions = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'beijingshi',
        label: '北京市',
        children: [
          {
            value: 'chaoyang',
            label: '朝阳区',
            children: [
              {
                value: 'datunli',
                label: '大屯里',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'shanghaishi',
        label: '上海市',
        children: [
          {
            value: 'huangpu',
            label: '黄浦区',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 17,
  },
};
const noLabelLayout = {
  wrapperCol: {
    span: 17,
    offset: 3,
  },
};

function Demo1() {
  const formRef = useRef(null as any as FormInstance);
  const [size, setSize] = useState<ConfigProviderProps['size']>('default');
  const [layout, setLayout] = useState<FormProps['layout']>('horizontal');
  const [position, setPosition] = useState<'start' | 'end'>('start');

  useEffect(() => {
    formRef.current.setFieldsValue({ rate: 5 });
  }, []);

  return (
    <div>
      <Grid.Row style={{ marginBottom: 20, lineHeight: '40px' }}>
        <Grid.Col span={3} style={{ textAlign: 'right' }}>
          不同尺寸：
        </Grid.Col>
        <Grid.Col span={17}>
          <Radio.Group value={size} onChange={setSize} type="button">
            <Radio value="small">small</Radio>
            <Radio value="default">default</Radio>
            <Radio value="large">large</Radio>
            <Radio value="huge">huge</Radio>
          </Radio.Group>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row style={{ marginBottom: 20, lineHeight: '40px' }}>
        <Grid.Col span={3} style={{ textAlign: 'right' }}>
          表单布局：
        </Grid.Col>
        <Grid.Col span={17}>
          <Radio.Group value={layout} onChange={setLayout} type="button">
            <Radio value="horizontal">horizontal</Radio>
            <Radio value="vertical">vertical</Radio>
            <Radio value="inline">inline</Radio>
          </Radio.Group>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row style={{ marginBottom: 20, lineHeight: '40px' }}>
        <Grid.Col span={3} style={{ textAlign: 'right' }}>
          必填标实位置：
        </Grid.Col>
        <Grid.Col span={17}>
          <Radio.Group value={position} onChange={setPosition} type="button">
            <Radio value="start">start</Radio>
            <Radio value="end">end</Radio>
          </Radio.Group>
        </Grid.Col>
      </Grid.Row>
      <ConfigProvider size={size}>
        <Form
          layout={layout}
          ref={formRef}
          requiredSymbol={{ position }}
          {...formItemLayout}
          initialValues={{
            name: '名字',
            number: 100,
            singer: 0,
            radio: 'a',
            slider: 20,
            upload: [
              {
                name: '保护公主',
                url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fbbdefc1702398f2f394c57270f7f727.png~tplv-uwbnlip3yd-png.png',
              },
              {
                name: 'star.png',
                url: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73a34d47f2885cf5182d755aa0c8a7d4.png~tplv-uwbnlip3yd-png.png',
              },
            ],
          }}
          onValuesChange={(changeValue, values) => {
            console.log('onValuesChange: ', changeValue, values);
          }}
          scrollToFirstError
        >
          <FormItem label="姓名" field="name" rules={[{ required: true, message: '必须填写姓名' }]}>
            <Input placeholder="please enter..." style={{ minWidth: 200 }} />
          </FormItem>
          <FormItem
            label="数字"
            required
            field="number"
            rules={[
              {
                type: 'number',
                required: true,
              },
            ]}
          >
            <InputNumber placeholder="请输入数字" style={{ minWidth: 200 }} />
          </FormItem>
          <FormItem
            label="地点"
            field="space"
            rules={[
              {
                type: 'array',
                required: true,
              },
              {
                type: 'array',
                length: 4,
                message: '必须选择长度为四的节点',
              },
            ]}
          >
            <Cascader
              placeholder="请选择一个地点"
              style={{ minWidth: 200 }}
              allowClear
              options={cascaderOptions}
            />
          </FormItem>
          <FormItem
            label="自动补全"
            required
            field="autocomplete"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoComplete
              placeholder="请输入..."
              data={['123', '234', '345', '456']}
              style={{ minWidth: 200 }}
              // style={{ width: '100%' }}
            />
          </FormItem>
          <FormItem
            label="歌手"
            field="singer"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch={{ retainInputValue: true }}
              placeholder="请选择一个字"
              style={{ minWidth: 200 }}
              options={[
                { label: '周', value: 0 },
                { label: '杰', value: 1 },
                { label: '伦', value: 2 },
              ]}
              trigger="click"
              allowClear
            />
          </FormItem>
          <FormItem
            label="多选"
            required
            field="a.b[0].c"
            rules={[
              {
                type: 'array',
                minLength: 1,
                message: '请选择至少一个！',
              },
            ]}
          >
            <Select
              mode="tags"
              style={{ minWidth: 200 }}
              placeholder="请选择字母"
              options={['a', 'b', 'c', 'd', 'e']}
            />
          </FormItem>
          <FormItem
            label="评分"
            field="rate"
            rules={[
              {
                required: true,
                type: 'number',
                min: 4,
                message: '对不起，您的评分不能小于4（滑稽）',
              },
            ]}
          >
            <Rate />
          </FormItem>
          <FormItem
            label="日期"
            field="date"
            rules={[
              {
                required: true,
                message: '请选择日期范围',
              },
            ]}
          >
            <DatePicker.RangePicker
              style={{ minWidth: 200 }}
              showTime
              placeholder={['开始时间', '结束时间']}
            />
          </FormItem>
          <FormItem
            label="快乐吗"
            field="yesorno"
            triggerPropName="checked"
            rules={[
              {
                type: 'boolean',
                true: true,
                message: '你必须快乐！',
              },
            ]}
          >
            <Switch>
              <span key="open">是</span>
              <span key="close">否</span>
            </Switch>
          </FormItem>
          <FormItem
            label="字母"
            field="radio"
            rules={[
              {
                validator: (value, callback) => {
                  if (value !== 'b') {
                    callback('必须选择第二个！');
                  }
                },
              },
            ]}
          >
            <Radio.Group name="zhoujielun">
              <Radio value="a">A</Radio>
              <Radio value="b">B</Radio>
              <Radio disabled value="c">
                C
              </Radio>
            </Radio.Group>
          </FormItem>
          <FormItem
            label="滑动"
            field="slider"
            trigger="onAfterChange"
            validateTrigger="onAfterChange"
            rules={[
              {
                validator: (value, callback) => {
                  if (value < 50) {
                    callback('你必须大于50');
                  }
                },
              },
            ]}
          >
            <Slider style={{ minWidth: 200 }} />
          </FormItem>
          <Form.Item label="上传" field="upload" triggerPropName="fileList">
            <Upload listType="picture-card" multiple name="files" action="//upload-z2.qbox.me/" />
          </Form.Item>
          <FormItem
            {...noLabelLayout}
            field="readme"
            triggerPropName="checked"
            rules={[
              {
                type: 'boolean',
                true: true,
                message: '你还没确认呢！',
              },
            ]}
          >
            <Checkbox>以上信息确认无误</Checkbox>
          </FormItem>
          <FormItem {...noLabelLayout}>
            <Button
              onClick={async () => {
                if (formRef.current) {
                  try {
                    await formRef.current.validate();
                    Message.info('校验通过，提交成功！');
                  } catch (_) {
                    console.log(formRef.current.getFieldsError());
                    Message.error('校验失败，请检查字段！');
                  }
                }
              }}
              type="primary"
              style={{ marginRight: 24 }}
            >
              确定
            </Button>
            <Button
              onClick={() => {
                formRef.current.resetFields();
              }}
            >
              重置
            </Button>
            <Button
              type="text"
              onClick={() => {
                Message.info(`fields: ${formRef.current.getTouchedFields().join(',')}`);
              }}
            >
              获取操作过的字段
            </Button>
          </FormItem>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Form',
};

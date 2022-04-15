import React, { useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { mount } from 'enzyme';
import { act } from 'react-test-renderer';
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
  InputNumber,
  Rate,
  Slider,
  Upload,
  DatePicker,
} from '../..';
import { FormProps, FormInstance } from '../interface';
import { UploadItem } from '../../Upload';
import { sleep } from '../../../tests/util';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

const noLabelLayout = {
  wrapperCol: {
    span: 17,
    offset: 7,
  },
};

const fieldInitvalues = {
  name: undefined,
  number: undefined,
  space: undefined,
  autocomplete: undefined,
  singer: undefined,
  rate: undefined,
  date: undefined,
  yesorno: true,
  radio: 'a',
  slider: 20,
  upload: undefined,
  readme: undefined,
};

type formData = {
  name: string;
  number: number;
  space: string[];
  autocomplete: string;
  singer: number;
  rate: number;
  date: [dayjs.Dayjs, dayjs.Dayjs];
  yesorno: boolean;
  radio: string;
  slider: number;
  upload: UploadItem;
  readme: boolean;
};

function Demo(props: FormProps & { saveFormRef: (form: FormInstance<formData>) => void }) {
  const [form] = Form.useForm<formData>();
  const isDidmount = useRef(false);
  if (!isDidmount.current) {
    props.saveFormRef(form);
  }
  useEffect(() => {
    isDidmount.current = true;
  }, []);

  return (
    <div>
      <Form {...props} form={form} style={{ maxWidth: 650 }} scrollToFirstError>
        <FormItem
          label="姓名"
          required
          extra="请输入长度在 1 - 10 的名字，注意不要使用特殊符号。"
          field="name"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
            },
            {
              maxLength: 10,
              message: '最多可以输入十个字!',
            },
          ]}
        >
          <Input placeholder="please enter..." />
        </FormItem>
        <FormItem
          label="数字"
          required
          normalize={(value) => {
            if (value > 299) {
              return 10;
            }
            return value;
          }}
          field="number"
          validateTrigger={['onBlur', 'onChange']}
          rules={[
            {
              type: 'number',
              required: true,
              max: 10,
              min: 5,
            },
          ]}
        >
          <InputNumber placeholder="请输入数字" />
        </FormItem>
        <FormItem
          label="地点"
          required
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
          <Cascader placeholder="请选择一个地点" allowClear options={cascaderOptions} />
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
            style={{ width: '100%' }}
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
            placeholder="请选择一个字"
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
          label="评分"
          field="rate"
          validateTrigger="onChange"
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
          <DatePicker.RangePicker showTime placeholder={['开始时间', '结束时间']} />
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
          <RadioGroup name="zhoujielun">
            <Radio value="a">A</Radio>
            <Radio value="b">B</Radio>
            <Radio disabled value="c">
              C
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="滑动"
          field="slider"
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
          <Slider />
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
          <Button className="submit-button" type="primary">
            确定
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}

describe('UseForm', () => {
  let form: FormInstance<formData> | null = null;
  let formValues = {};
  let changeValue = {};
  let wrapper;
  let submitMock = jest.fn();
  beforeEach(() => {
    submitMock = jest.fn();
    wrapper = mount(
      <Demo
        saveFormRef={(ref) => (form = ref)}
        initialValues={fieldInitvalues}
        onSubmit={submitMock}
        onValuesChange={(c, v) => {
          changeValue = c;
          formValues = v;
        }}
      />
    );
    formValues = { ...fieldInitvalues };
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('be controled', () => {
    const InputNumber = wrapper.find('InputNumber');

    InputNumber.find('input').simulate('change', {
      target: { value: '12' },
    });
    expect(changeValue).toEqual({ number: 12 });
    expect(formValues).toEqual({ ...fieldInitvalues, number: 12 });

    const beforeValues = form.getFieldsValue();
    form.resetFields(['number']);
    expect(changeValue).toEqual({ number: undefined });
    expect(formValues).toEqual({ ...beforeValues, number: undefined });
  });

  it('setFieldValue', () => {
    form.setFieldValue('name', 'test');
    expect(changeValue).toEqual({ name: 'test' });

    // 设置单个控件的错误状态。
    form.setFields({
      name: {
        value: 'test2',
        error: {
          message: 'error !',
          requiredError: true,
          type: 'string',
        },
      },
    });

    expect(form.getFields()).toEqual({ ...fieldInitvalues, name: 'test2' });
    expect(changeValue).toEqual({ name: 'test2' });

    expect(form.getFieldsError().name).toEqual({
      message: 'error !',
      requiredError: true,
      type: 'string',
    });
  });

  it('normalize', () => {
    const InputNumber = wrapper.find('InputNumber');
    InputNumber.find('input').simulate('change', { target: { value: '300' } });
    expect(changeValue).toEqual({ number: 10 });
    expect(formValues).toEqual({ ...formValues, number: 10 });
  });

  it('array validateTrigger', async () => {
    const InputNumber = wrapper.find('InputNumber');

    form.setFieldValue('number', 120);
    act(() => {
      InputNumber.find('input').simulate('focus');
      InputNumber.find('input').simulate('blur');
    });

    await sleep(10);
    expect(form.getFieldsError().number.message).toBe('`120` 大于最大值 `10`');

    InputNumber.find('input').simulate('change', { target: { value: '12' } });
    await sleep(10);
    expect(form.getFieldsError().number.message).toBe('`12` 大于最大值 `10`');

    InputNumber.find('input').simulate('change', { target: { value: '' } });
    await sleep(10);
    expect(form.getFieldsError().number.message).toBe('number 是必填项');

    InputNumber.find('input').simulate('change', { target: { value: '1' } });

    // TODO: 是否被setField过的也是属于touche字段
    expect(form.getTouchedFields()).toEqual(['number']);

    await sleep(10);
    expect(form.getFieldsError().number.message).toBe('`1` 小于最小值 `5`');
    InputNumber.find('input').simulate('change', { target: { value: '9' } });
    await sleep(10);
    expect(form.getFieldsError()).toEqual({});
  });

  it('string validateTrigger', async () => {
    const Input = wrapper.find('Input').at(0);

    form.setFieldValue('name', '');
    Input.find('input').simulate('focus');
    Input.find('input').simulate('blur');
    await sleep(20);
    expect(form.getFieldsError().name.message).toBe('name 是必填项');
  });

  describe('validate', () => {
    beforeEach(() => {
      form.setFieldsValue({
        ...fieldInitvalues,
        name: 'test',
        number: 10,
        slider: 50,
        autocomplete: '123',
        radio: 'b',
        singer: 0,
        rate: 5,
        space: ['beijing', 'beijingshi', 'chaoyang', 'datunli'],
        date: [dayjs(), dayjs()],
      });
    });
    it('validate promise', async () => {
      let e;
      try {
        await form.validate(['radio', 'readme']);
      } catch (error) {
        e = error;
      }

      expect(form.getFieldsError()).toEqual(e.errors);
      expect(e.errors).toEqual({
        readme: {
          value: undefined,
          type: 'boolean',
          message: '你还没确认呢！',
        },
      });

      form.setFieldValue('readme', true);

      const mockFn = jest.fn();
      await form.validate();
      mockFn();

      expect(form.getFieldsError()).toEqual({});
      expect(mockFn).toHaveBeenCalled();
    });

    it('validate callback', async (done) => {
      form.validate(['radio', 'readme'], (errors) => {
        expect(form.getFieldsError()).toEqual(errors);
        expect(errors).toEqual({
          readme: {
            value: undefined,
            type: 'boolean',
            message: '你还没确认呢！',
          },
        });

        form.setFieldValue('readme', true);

        const mockFn = jest.fn();
        form.validate((e) => {
          if (!e) {
            mockFn();
          }

          expect(form.getFieldsError()).toEqual({});
          expect(mockFn).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  it('submit', async (done) => {
    form.setFieldsValue({
      ...fieldInitvalues,
      name: 'test',
      number: 10,
      slider: 50,
      autocomplete: '123',
      radio: 'b',
      singer: 0,
      rate: 5,
      space: ['beijing', 'beijingshi', 'chaoyang', 'datunli'],
      date: [dayjs(), dayjs()],
    });
    wrapper.find('form').simulate('submit');

    await sleep(10);
    expect(form.getFieldsError()).toEqual({
      readme: {
        value: undefined,
        type: 'boolean',
        message: '你还没确认呢！',
      },
    });

    form.setFieldValue('readme', true);

    wrapper.find('form').simulate('submit');

    setTimeout(() => {
      expect(form.getFieldsError()).toEqual({});
      expect(submitMock).toHaveBeenCalled();
      done();
    }, 10);
  });

  it('scrollToField', () => {
    expect(form.scrollToField).toBeInstanceOf(Function);
  });

  it('getfieldsError', async () => {
    let e;
    try {
      await form.validate(['number', 'name']);
    } catch (error) {
      e = error;
    }

    expect(form.getFieldsError().name).toEqual({
      message: 'name 是必填项',
      requiredError: true,
      type: 'string',
      value: undefined,
    });

    expect(form.getFieldsError(['name'])).toEqual({
      name: {
        message: 'name 是必填项',
        requiredError: true,
        type: 'string',
        value: undefined,
      },
    });

    expect(form.getFieldsError()).toEqual(e.errors);
    expect(form.getFieldsError()).toEqual({
      name: {
        message: 'name 是必填项',
        requiredError: true,
        type: 'string',
        value: undefined,
      },
      number: {
        message: 'number 是必填项',
        requiredError: true,
        type: 'number',
        value: undefined,
      },
    });
  });
});

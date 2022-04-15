import React from 'react';
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
import omit from '../../_util/omit';
import { sleep } from '../../../tests/util';

const FormItem = Form.Item;
const FormControl = Form.Control;
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

class Demo extends React.Component<any> {
  state = {
    formValues: null,
    changeValue: null,
  };

  render() {
    return (
      <div>
        <Form
          {...formItemLayout}
          {...omit(this.props, ['onBlur'])}
          ref={this.props.saveFormRef}
          style={{ maxWidth: 650 }}
          onValuesChange={(v, vs) => {
            this.setState({ changeValue: v, formValues: vs });
          }}
        >
          <FormItem
            label="姓名"
            required
            extra="请输入长度在 1 - 10 的名字，注意不要使用特殊符号。"
          >
            <FormControl
              field="name"
              initialValue={this.props.initialValues.name}
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
              <Input placeholder="please enter..." onBlur={this.props.onBlur} />
            </FormControl>
          </FormItem>
          <FormItem label="数字" required>
            <FormControl
              normalize={this.props.normalize}
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
            </FormControl>
          </FormItem>
          <FormItem label="地点" required>
            <FormControl
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
            </FormControl>
          </FormItem>
          <FormItem label="自动补全" required>
            <FormControl
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
            </FormControl>
          </FormItem>
          <FormItem label="歌手">
            <FormControl
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
            </FormControl>
          </FormItem>
          <FormItem label="评分">
            <FormControl
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
            </FormControl>
          </FormItem>
          <FormItem label="日期">
            <FormControl
              field="date"
              rules={[
                {
                  required: true,
                  message: '请选择日期范围',
                },
              ]}
            >
              <DatePicker.RangePicker showTime placeholder={['开始时间', '结束时间']} />
            </FormControl>
          </FormItem>
          <FormItem label="快乐吗">
            <FormControl
              field="yesorno"
              triggerPropName="checked"
              rules={[
                {
                  type: 'boolean',
                  true: true,
                  message: '你必须快乐！',
                },
              ]}
              initialValue={this.props.initialValues.yesorno}
            >
              <Switch>
                <span key="open">是</span>
                <span key="close">否</span>
              </Switch>
            </FormControl>
          </FormItem>
          <FormItem label="字母">
            <FormControl
              field="radio"
              initialValue={this.props.initialValues.radio}
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
            </FormControl>
          </FormItem>
          <FormItem label="滑动">
            <FormControl
              field="slider"
              initialValue={this.props.initialValues.slider}
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
            </FormControl>
          </FormItem>
          <Form.Item label="上传">
            <FormControl field="upload" triggerPropName="fileList">
              <Upload listType="picture-card" multiple name="files" action="//upload-z2.qbox.me/" />
            </FormControl>
          </Form.Item>
          <FormItem {...noLabelLayout}>
            <FormControl
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
            </FormControl>
          </FormItem>
          <FormItem {...noLabelLayout}>
            <Button className="submit-button" type="primary">
              确定
            </Button>
          </FormItem>
        </Form>
        {JSON.stringify(this.state.formValues)}
        {JSON.stringify(this.state.changeValue)}
      </div>
    );
  }
}

describe('ControlForm', () => {
  let formRef = null;
  let formValues = { ...fieldInitvalues };
  let wrapper;
  let onBlurMock = jest.fn();
  let submitMock = jest.fn();
  let submitFailMock = jest.fn();
  beforeEach(() => {
    onBlurMock = jest.fn();
    submitMock = jest.fn();
    submitFailMock = jest.fn();
    wrapper = mount(
      <Demo
        saveFormRef={(node) => (formRef = node)}
        initialValues={fieldInitvalues}
        onBlur={onBlurMock}
        onSubmitFailed={submitFailMock}
        onSubmit={submitMock}
      />
    );
    formValues = { ...fieldInitvalues };
    expect(formRef).toBeInstanceOf(Object);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('be controled', () => {
    wrapper.setProps({ initialValues: { ...fieldInitvalues, slider: 30 } });

    expect(formRef.getFieldsValue(['slider']).slider).toBe(20);
    const InputNumber = wrapper.find('InputNumber');

    formValues = formRef.getFieldsValue();
    InputNumber.find('input').simulate('change', {
      target: { value: '12' },
    });
    expect(wrapper.state().changeValue).toEqual({ number: 12 });
    expect(wrapper.state().formValues).toEqual({ ...formValues, number: 12 });

    formValues = formRef.getFieldsValue();
    formRef.resetFields(['slider']);
    expect(wrapper.state().changeValue).toEqual({ slider: 20 });
    expect(wrapper.state().formValues).toEqual({ ...formValues, slider: 20 });
  });

  it('setFieldValue', () => {
    formRef.setFieldValue('name', 'test');
    expect(wrapper.state().changeValue).toEqual({ name: 'test' });
    expect(wrapper.state().formValues).toEqual({
      ...fieldInitvalues,
      name: 'test',
    });

    // 设置单个控件的错误状态。
    formRef.setFields({
      name: {
        value: 'test2',
        error: {
          message: 'error !',
          requiredError: true,
          type: 'string',
        },
      },
    });

    // TODO: 是不是应该触发onValuesChange
    // expect(wrapper.state().changeValue).toEqual({ name: 'test2' });
    expect(formRef.getFields()).toEqual({ ...formValues, name: 'test2' });

    expect(formRef.getFieldsError().name).toEqual({
      message: 'error !',
      requiredError: true,
      type: 'string',
    });
  });

  it('normalize', () => {
    wrapper.setProps({
      normalize: (value) => {
        if (value > 10) {
          return 10;
        }
        return value;
      },
    });

    const InputNumber = wrapper.find('InputNumber');
    InputNumber.find('input').simulate('change', { target: { value: '12' } });
    expect(wrapper.state().changeValue).toEqual({ number: 10 });
    expect(wrapper.state().formValues).toEqual({ ...formValues, number: 10 });
  });

  it('array validateTrigger', async () => {
    const InputNumber = wrapper.find('InputNumber');

    formRef.setFieldValue('number', 120);
    act(() => {
      InputNumber.find('input').simulate('focus');
      InputNumber.find('input').simulate('blur');
    });

    await sleep(10);

    expect(formRef.getFieldsError().number.message).toBe('`120` 大于最大值 `10`');

    InputNumber.find('input').simulate('change', { target: { value: '12' } });

    await sleep(10);
    expect(formRef.getFieldsError().number.message).toBe('`12` 大于最大值 `10`');

    InputNumber.find('input').simulate('change', { target: { value: '' } });
    await sleep(10);
    expect(formRef.getFieldsError().number.message).toBe('number 是必填项');

    InputNumber.find('input').simulate('change', { target: { value: '1' } });

    // TODO: 是否被setField过的也是属于touche字段
    expect(formRef.getTouchedFields()).toEqual(['number']);
    await sleep(10);
    expect(formRef.getFieldsError().number.message).toBe('`1` 小于最小值 `5`');
    InputNumber.find('input').simulate('change', { target: { value: '9' } });
    await sleep(10);
    expect(formRef.getFieldsError()).toEqual({});
  });

  it('string validateTrigger', async () => {
    const Input = wrapper.find('Input').at(0);

    formRef.setFieldValue('name', '');
    act(() => {
      Input.find('input').simulate('focus');
      Input.find('input').simulate('blur');
    });
    await sleep(10);
    expect(formRef.getFieldsError().name.message).toBe('name 是必填项');
    expect(onBlurMock.mock.calls.length).toBe(1);
  });

  describe('validate', () => {
    beforeEach(() => {
      formRef.setFieldsValue({
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
        await formRef.validate(['radio', 'readme']);
      } catch (error) {
        e = error;
      }

      expect(formRef.getFieldsError()).toEqual(e.errors);
      expect(e.errors).toEqual({
        readme: {
          value: undefined,
          type: 'boolean',
          message: '你还没确认呢！',
        },
      });

      formRef.setFieldValue('readme', true);

      const mockFn = jest.fn();
      await formRef.validate();
      mockFn();

      expect(formRef.getFieldsError()).toEqual({});
      expect(mockFn).toHaveBeenCalled();
    });

    it('validate callback', async (done) => {
      formRef.validate(['radio', 'readme'], (errors) => {
        expect(formRef.getFieldsError()).toEqual(errors);
        expect(errors).toEqual({
          readme: {
            value: undefined,
            type: 'boolean',
            message: '你还没确认呢！',
          },
        });

        formRef.setFieldValue('readme', true);

        const mockFn = jest.fn();
        formRef.validate((e) => {
          if (!e) {
            mockFn();
          }

          expect(formRef.getFieldsError()).toEqual({});
          expect(mockFn).toHaveBeenCalled();
          done();
        });
      });
    });
  });

  it('submit', async (done) => {
    formRef.setFieldsValue({
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

    expect(formRef.getFieldsError()).toEqual({
      readme: {
        value: undefined,
        type: 'boolean',
        message: '你还没确认呢！',
      },
    });

    formRef.setFieldValue('readme', true);

    wrapper.find('form').simulate('submit');

    setTimeout(() => {
      expect(formRef.getFieldsError()).toEqual({});
      expect(submitMock).toHaveBeenCalled();
      done();
    }, 10);
  });

  it('onValidateFail', (done) => {
    wrapper.find('form').simulate('submit');

    setTimeout(() => {
      expect(submitFailMock).toHaveBeenCalled();
      done();
    }, 10);
  });

  it('label for', async () => {
    const wrapper = mount(
      <Form>
        <Form.Item field="a" label="label">
          <Input id="input" />
        </Form.Item>
      </Form>
    );

    const label = wrapper.find('label');

    expect(label.getDOMNode().getAttribute('for')).toBe('a_input');
    expect(wrapper.find('Input').getDOMNode().getAttribute('id')).toBe('input');
  });

  it('clearFields', async () => {
    let form;
    let changeValues;
    mount(
      <Form
        ref={(node) => (form = node)}
        onValuesChange={(v) => {
          changeValues = v;
        }}
      >
        <Form.Item field="a" label="label">
          <Input />
        </Form.Item>
        <Form.Item field="b" label="label">
          <Input />
        </Form.Item>
      </Form>
    );

    form.setFieldsValue({ a: 1, b: 2 });
    expect(changeValues).toEqual({ a: 1, b: 2 });

    form.clearFields('a');
    expect(changeValues).toEqual({ a: undefined });

    form.clearFields(['a', 'b']);

    expect(changeValues).toEqual({ a: undefined, b: undefined });

    form.setFieldsValue({ a: 1, b: 2 });
    form.clearFields();

    expect(changeValues).toEqual({ a: undefined, b: undefined });
    expect(form.getFieldsValue()).toEqual({ a: undefined, b: undefined });
  });
});

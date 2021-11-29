import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import { sleep } from '../../../tests/util';
import { Form, Grid, Input, Button, Select, Radio } from '../..';
import { FormListProps, FormProps } from '../interface';

mountTest(Form);

function mountForm(component: React.ReactElement) {
  return mount<typeof Form, React.PropsWithChildren<FormProps>>(component);
}

let formRef;

function getForm(
  props?: FormProps & {
    formListProps?: Partial<FormListProps>;
  }
) {
  return (
    <Form ref={(node) => (formRef = node)} {...props}>
      <Form.List field="users" {...props?.formListProps}>
        {(fields, { add, remove, move }) => {
          return (
            <div>
              {fields.map((field, index) => {
                return (
                  <Grid.Row key={field.key} className="form-list-item" style={{ marginBottom: 20 }}>
                    <Form.Item noStyle key={`${field.key}.name`} field={`${field.field}.name`}>
                      <Input placeholder="姓名" style={{ marginRight: 24 }} />
                    </Form.Item>
                    <Form.Item noStyle key={`${field.key}.age`} field={`${field.field}.age`}>
                      <Input placeholder="年龄" style={{ marginRight: 20 }} />
                    </Form.Item>
                    <Button className="remove-button" onClick={() => remove(index)}>
                      删除
                    </Button>
                  </Grid.Row>
                );
              })}
              <Grid.Row justify="space-between">
                <Button
                  className="add-button"
                  onClick={() => {
                    add();
                  }}
                >
                  添加用户
                </Button>
                <Button
                  className="add-button-A"
                  onClick={() => {
                    add({ name: 'A', age: 18 });
                  }}
                >
                  添加用户A
                </Button>
                <Button
                  className="move-button"
                  onClick={() => {
                    move(0, 2);
                  }}
                >
                  添加用户A
                </Button>
                <div>
                  <Button
                    className="reset-button"
                    onClick={() => {
                      formRef.resetFields();
                    }}
                  >
                    重置
                  </Button>
                  <Button
                    className="submit-button"
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: 20 }}
                  >
                    提交
                  </Button>
                </div>
              </Grid.Row>
            </div>
          );
        }}
      </Form.List>
    </Form>
  );
}

describe('FormList test', () => {
  it('basic', async () => {
    const wrapper = mountForm(getForm());
    function test() {
      const getItems = () => {
        return wrapper.find('.arco-row.form-list-item');
      };
      const addButton = wrapper.find('.add-button').at(0);
      // const removeButton = wrapper.find('.remove-button');
      expect(getItems()).toHaveLength(0);

      addButton.simulate('click');

      act(() => {});

      expect(getItems()).toHaveLength(1);

      addButton.simulate('click');

      act(() => {});

      expect(getItems()).toHaveLength(2);

      wrapper.find('input').forEach((input, i) => {
        (input.props().onChange as Function)({ target: { value: `hello${i}` } });
      });

      expect(formRef.getFieldsValue()).toEqual({
        users: [
          { name: 'hello0', age: 'hello1' },
          { name: 'hello2', age: 'hello3' },
        ],
      });

      formRef.setFieldValue('users', [
        { name: 'hello0', age: 'hello1' },
        { name: '111', age: '111' },
      ]);

      act(() => {});

      expect(getItems()).toHaveLength(2);
      expect(formRef.getFieldsValue()).toEqual({
        users: [
          { name: 'hello0', age: 'hello1' },
          { name: '111', age: '111' },
        ],
      });

      const removeBtn = getItems().at(0).find('Button');
      removeBtn.simulate('click');

      act(() => {});

      expect(getItems()).toHaveLength(1);

      expect(formRef.getFieldsValue()).toEqual({
        users: [{ name: '111', age: '111' }],
      });

      addButton.simulate('click');
      expect(getItems()).toHaveLength(2);

      expect(formRef.getFieldsValue()).toEqual({
        users: [
          { name: '111', age: '111' },
          { name: undefined, age: undefined },
        ],
      });
    }
    test();

    wrapper.find('Button.reset-button').simulate('click');

    // 重置后回到初始状态，再次执行测试case
    test();
  });

  it('set initvalues', async () => {
    const defaultUsers = [
      { name: 'a', age: 20 },
      { name: '', age: '' },
      { name: 'b', age: '10' },
    ];
    const wrapper = mountForm(
      getForm({
        initialValues: {
          users: defaultUsers,
        },
      })
    );
    function test() {
      const getItems = () => {
        return wrapper.find('.arco-row.form-list-item');
      };
      expect(getItems()).toHaveLength(3);

      const addButton = wrapper.find('Button.add-button-A');
      addButton.simulate('click');
      act(() => {});

      expect(getItems()).toHaveLength(4);

      expect(formRef.getFieldsValue()).toEqual({
        users: [...defaultUsers, { name: 'A', age: 18 }],
      });

      let curValues = formRef.getFieldsValue().users;
      const removeBtn = getItems().at(0).find('Button');
      removeBtn.simulate('click');

      act(() => {});

      expect(getItems()).toHaveLength(3);

      expect(formRef.getFieldsValue()).toEqual({
        users: curValues.slice(1),
      });
      curValues = formRef.getFieldsValue().users;

      wrapper.find('Button.add-button').simulate('click');

      act(() => {});
      expect(getItems()).toHaveLength(4);
      expect(formRef.getFieldsValue()).toEqual({
        users: [...curValues, { name: undefined, age: undefined }],
      });
    }
    test();

    wrapper.find('Button.reset-button').simulate('click');

    // 重置后回到初始状态，再次执行测试case
    test();
  });

  it('update correctly', () => {
    const wrapper = mountForm(
      <Form ref={(node) => (formRef = node)}>
        <Form.List field="users.a.b">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => {
                  return (
                    <Grid.Row
                      key={field.key}
                      className="form-list-item"
                      style={{ marginBottom: 20 }}
                    >
                      <Form.Item noStyle key={`${field.key}`} field={`${field.field}`}>
                        <Input placeholder="姓名" style={{ marginRight: 24 }} />
                      </Form.Item>
                      <Button className="remove-button" onClick={() => remove(index)}>
                        删除
                      </Button>
                    </Grid.Row>
                  );
                })}
                <Button
                  className="add-button"
                  onClick={() => {
                    add();
                  }}
                >
                  添加用户
                </Button>
              </div>
            );
          }}
        </Form.List>
      </Form>
    );

    const getItems = () => {
      return wrapper.find('.arco-row.form-list-item');
    };
    expect(getItems()).toHaveLength(0);

    const addButton = wrapper.find('Button.add-button');
    // 再添加一个用户
    addButton.simulate('click');
    act(() => {});

    expect(getItems()).toHaveLength(1);

    expect(formRef.getFieldsValue()).toEqual({
      users: { a: { b: [undefined] } },
    });

    // 再添加一个用户
    addButton.simulate('click');
    act(() => {});

    expect(getItems()).toHaveLength(2);
    const removeBtn = getItems().at(0).find('Button');
    removeBtn.simulate('click');

    act(() => {});

    expect(getItems()).toHaveLength(1);
  });

  it('setError correctly', async () => {
    let formRef;
    const wrapper = mountForm(
      <Form ref={(node) => (formRef = node)} initialValues={{ posts: ['111', '222', '333'] }}>
        <Form.List field="posts">
          {(fields) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <Grid.Row key={item.key}>
                      <Form.Item
                        className="form-list-item"
                        field={item.field}
                        label={`Post-${index}`}
                        style={{ width: 370 }}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Grid.Row>
                  );
                })}
              </div>
            );
          }}
        </Form.List>
      </Form>
    );
    formRef.setFields({
      'posts[1]': {
        error: {
          message: 'error',
        },
      },
    });

    wrapper.update();

    expect(wrapper.find('.arco-form-message').length).toBe(1);
  });

  it('submit correctly', async () => {
    let formRef;
    let submitValues = {};
    const wrapper = mountForm(
      <Form
        ref={(node) => (formRef = node)}
        onSubmit={(values) => {
          submitValues = values;
        }}
      >
        <Form.List field="posts">
          {(fields, { add }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <Grid.Row key={item.key} className="form-list-item">
                      <Form.Item field={`${item.field}.type`} label="Type">
                        <Radio.Group options={['A', 'B']} />
                      </Form.Item>
                      <Form.Item shouldUpdate noStyle>
                        {(values) => {
                          return values.posts?.[index]?.type === 'A' ? (
                            <Form.Item field={`${item.field}.a`} label="Select A">
                              <Input placeholder="Please enter name A" />
                            </Form.Item>
                          ) : (
                            <Form.Item field={`${item.field}.b`} label="Name B">
                              <Select
                                options={['B1', 'B2', 'B3']}
                                placeholder="Please select name B"
                              />
                            </Form.Item>
                          );
                        }}
                      </Form.Item>
                    </Grid.Row>
                  );
                })}
                <Button
                  className="add-button"
                  onClick={() => {
                    add();
                  }}
                >
                  Add user
                </Button>
              </div>
            );
          }}
        </Form.List>
      </Form>
    );

    const getItems = () => {
      return wrapper.find('.arco-row.form-list-item');
    };
    expect(getItems()).toHaveLength(0);

    const addButton = wrapper.find('Button.add-button');
    // 再添加一个用户
    addButton.simulate('click');
    act(() => {});

    expect(getItems()).toHaveLength(1);

    wrapper.find('Select').simulate('click');

    wrapper.find('.arco-select-option').at(1).simulate('click');

    expect(formRef.getFieldsValue()).toEqual({ posts: [{ type: undefined, b: 'B2' }] });

    wrapper.find('.arco-radio input').at(0).simulate('change');

    expect(formRef.getFields()).toEqual({ posts: [{ type: 'A', b: 'B2' }] });
    expect(formRef.getFieldsValue()).toEqual({ posts: [{ type: 'A', a: undefined }] });

    wrapper
      .find('input.arco-input')
      .at(0)
      .simulate('change', {
        target: {
          value: 'Hello',
        },
      });

    expect(formRef.getFields()).toEqual({ posts: [{ b: 'B2', type: 'A', a: 'Hello' }] });
    expect(formRef.getFieldsValue()).toEqual({ posts: [{ type: 'A', a: 'Hello' }] });

    formRef.submit();
    await sleep(10);
    expect(formRef.getFieldsValue()).toEqual(submitValues);
  });

  it('move method', async () => {
    const defaultUsers = [
      { name: 'a', age: 20 },
      { name: 'b', age: 20 },
      { name: 'c', age: 10 },
      { name: 'd', age: 10 },
    ];
    const wrapper = mountForm(
      getForm({
        initialValues: {
          users: defaultUsers,
        },
      })
    );
    const getItems = () => {
      return wrapper.find('.arco-row.form-list-item');
    };

    expect(getItems()).toHaveLength(4);
    const moveBtn = wrapper.find('Button.move-button');

    await act(() => {
      moveBtn.simulate('click');
    });

    expect(formRef.getFieldsValue()).toEqual({
      users: [
        { name: 'b', age: 20 },
        { name: 'c', age: 10 },
        { name: 'a', age: 20 },
        { name: 'd', age: 10 },
      ],
    });
  });

  it('initial correctly', async () => {
    const defaultUsers = [{ name: 'a', age: 20 }];
    const wrapper = mountForm(
      getForm({
        formListProps: {
          initialValue: defaultUsers,
        },
      })
    );
    const getItems = () => {
      return wrapper.find('.arco-row.form-list-item');
    };

    expect(getItems()).toHaveLength(1);
    const moveBtn = wrapper.find('Button.remove-button');

    await act(() => {
      moveBtn.simulate('click');
    });

    expect(formRef.getFieldsValue()).toEqual({});
  });
});

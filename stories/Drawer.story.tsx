import React, { useState } from 'react';
import {
  Drawer,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Modal,
  ResizeBox,
  Popconfirm,
} from '@self';

export const Demo = () => {
  return (
    <ResizeBox.Split
      size={0.5}
      panes={[
        <div key="1">
          输入框校验是否能聚焦
          <Input style={{ width: 300 }} />
        </div>,
        <div key="2">
          <h3>Drawer focuslock</h3>
          <iframe
            style={{ width: '100%', height: 300 }}
            title="i"
            src="http://localhost:6006/iframe.html?id=drawer--demo-drawer&args=&viewMode=story"
          />
          <h3>Modal focuslock</h3>
          <iframe
            style={{ width: '100%', height: 300 }}
            title="i"
            src="http://localhost:6006/iframe.html?id=drawer--demo-modal&args=&viewMode=story"
          />
          <h3>popconfirm focuslock</h3>
          <iframe
            title="i"
            style={{ width: '100%', height: 300 }}
            src="http://localhost:6006/iframe.html?id=drawer--demo-confirm&args=&viewMode=story"
          />
        </div>,
      ]}
    />
  );
};

export const DemoDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const formItemLayout = {
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
      >
        Open Drawer
      </Button>
      <Drawer
        width={314}
        title={<span>Basic Information </span>}
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={() => {
          form.validate().then((res) => {
            setConfirmLoading(true);
            setTimeout(() => {
              setVisible(false);
              setConfirmLoading(false);
            }, 1500);
          });
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form {...formItemLayout} form={form} layout="vertical">
          <Form.Item label="Name" field="name" rules={[{ required: true }]}>
            <Input placeholder="Plear enter" />
          </Form.Item>
          <Form.Item label="URL" required field="url" rules={[{ required: true }]}>
            <Input placeholder="Plear enter" prefix="http://" suffix=".com" />
          </Form.Item>
          <Form.Item label="Hometown" field="hometown" rules={[{ required: true }]}>
            <Select placeholder="Plear select" options={['Beijing', 'Shanghai']} />
          </Form.Item>
          <Form.Item label="Date of Birth" field="birthday" rules={[{ required: true }]}>
            <DatePicker placeholder="Plear select" />
          </Form.Item>
          <Form.Item
            label="Self Introduction"
            required
            field="introduction"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Plear enter" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
export const DemoModal = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        open
      </Button>

      <Modal visible={visible}>
        <Input />
      </Modal>
    </div>
  );
};

export const DemoConfirm = () => {
  return (
    <div>
      <Popconfirm title={<Input />}>
        <Button>open</Button>
      </Popconfirm>
    </div>
  );
};

export default {
  title: 'Drawer',
};

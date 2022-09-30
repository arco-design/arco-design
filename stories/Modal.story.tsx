import React, { useState } from 'react';
import { Modal, Button, Alert, Select } from '@self';

function Demo1() {
  const [visible, setVisible] = useState<boolean>(false);

  const options = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return (
    <>
      <Button onClick={() => setVisible(true)} type="primary">
        打开对话框
      </Button>

      <Button
        onClick={() => {
          Modal.info({
            title: 'info',
            content: 'content...',
          });
        }}
        type="primary"
      >
        Modal.info
      </Button>
      <Modal
        title="基础"
        visible={visible}
        onConfirm={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Alert type="info" showIcon content="这是一个最简单的Modal应用" />
        <Select>
          {options.map((option, index) => (
            <Select.Option key={index} disabled={index === 3} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Modal',
};

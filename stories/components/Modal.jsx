import React, { useState } from 'react';
import { ConfigProvider, Table, Trigger, Button, Menu, Modal, Dropdown, Input } from '@self';

const ModalTest = (props) => {
  const { children } = props;

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  return (
    <div>
      <div onClick={handleClick}>{children}</div>

      <Modal title="test modal" visible={visible} onCancel={() => setVisible(false)}>
        <Input.TextArea rows={3} />
      </Modal>
    </div>
  );
};

const Demo = () => {
  const dropList = (
    <Menu>
      <Menu.Item key="modal">
        <ModalTest>this is a test</ModalTest>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'test column',
      render: () => {
        return (
          <Trigger popup={() => dropList} unmountOnExit={false}>
            <Button>test</Button>
          </Trigger>
        );
      },
    },

    {
      title: 'test column',
      render: () => {
        return (
          <Dropdown droplist={dropList} unmountOnExit={false}>
            <Button>test</Button>
          </Dropdown>
        );
      },
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
  ];

  return (
    <ConfigProvider focusLock={{ modal: false, drawer: false }}>
      <Table columns={columns} data={data} />
    </ConfigProvider>
  );
};

export default Demo;

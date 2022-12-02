import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Modal from '../modal';
import { ConfirmProps } from '../confirm';

export type HookModalRef = {
  update: (config: ConfirmProps) => void;
  close: () => void;
};

function HookModal(props, ref) {
  const [visible, setVisible] = useState(true);
  const [config, setConfig] = useState<ConfirmProps>(props);

  useImperativeHandle(ref, () => ({
    update: (config: ConfirmProps) => {
      setConfig(config);
    },
    close: () => {
      setVisible(false);
    },
  }));

  function onOk() {
    const ret = config.onOk && config.onOk();
    if (ret && ret.then) {
      setConfig((config) => ({
        ...config,
        confirmLoading: true,
      }));
      ret.then(
        () => {
          setVisible(false);
        },
        (e: Error) => {
          console.error(e);
          setConfig((config) => ({
            ...config,
            confirmLoading: false,
          }));
        }
      );
    }
    if (!ret) {
      setVisible(false);
    }
  }

  function onCancel() {
    config.onCancel && config.onCancel();
    setVisible(false);
  }

  return (
    <Modal unmountOnExit simple {...config} visible={visible} onOk={onOk} onCancel={onCancel}>
      {config.content}
    </Modal>
  );
}

export default forwardRef(HookModal);

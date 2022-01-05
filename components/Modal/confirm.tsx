import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Modal, { ModalProps } from './modal';
import IconInfoCircleFill from '../../icon/react-icon/IconInfoCircleFill';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import { getModalConfig, destroyList, getConfigProviderProps } from './config';
import ConfigProvider from '../ConfigProvider';

export interface ConfirmProps extends ModalProps {
  content?: ReactNode;
  icon?: ReactNode | null;
  isNotice?: boolean;
  noticeType?: string;
}

function ConfirmModal(props: ConfirmProps) {
  const { prefixCls, simple } = getModalConfig();
  return (
    <Modal prefixCls={prefixCls} simple={simple} {...props}>
      {props.content}
    </Modal>
  );
}

// 如果是消息提示型弹出框，那么只有确认按钮
export const normalizeConfig = (_config: ConfirmProps): ConfirmProps => {
  if (_config.isNotice) {
    let icon = _config.icon;
    if (!icon && icon !== null) {
      switch (_config.noticeType) {
        case 'info':
          icon = <IconInfoCircleFill />;
          break;
        case 'success':
          icon = <IconCheckCircleFill />;
          break;
        case 'warning':
          icon = <IconExclamationCircleFill />;
          break;
        case 'error':
          icon = <IconCloseCircleFill />;
          break;
        default:
          break;
      }
    }
    _config.title = (
      <span>
        {icon}
        {_config.title}
      </span>
    );
    _config.hideCancel = true;
  } else {
    _config.title = (
      <span>
        {_config.icon !== null && (_config.icon || <IconExclamationCircleFill />)}
        {_config.title}
      </span>
    );
  }
  return _config;
};

function confirm(config: ConfirmProps, renderFunc?: (props: ConfirmProps) => void) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const configProviderProps = getConfigProviderProps();

  function render(props: ConfirmProps) {
    ReactDOM.render(
      <ConfigProvider {...configProviderProps}>
        <ConfirmModal {...props} onCancel={onCancel} />
      </ConfigProvider>,
      div
    );
  }

  const renderFunction = renderFunc || render;

  let modalConfig: ConfirmProps = {
    ...config,
    visible: false,
  };
  const onOk = () => {
    let ret;
    const _onOk = config.onOk || config.onConfirm;
    if (_onOk) {
      ret = _onOk();
    }
    if (ret && ret.then) {
      modalConfig.confirmLoading = true;
      renderFunction(modalConfig);
      ret.then(
        () => {
          onCancel(true);
        },
        (e: Error) => {
          console.error(e);
          modalConfig.confirmLoading = false;
          renderFunction(modalConfig);
        }
      );
    }
    if (!ret) {
      onCancel(true);
    }
  };
  // 如果是promise，那么处理loading和加载完成关闭
  modalConfig.onOk = onOk;
  modalConfig = normalizeConfig(modalConfig);

  modalConfig.visible = true;
  renderFunction(modalConfig);

  function destroy() {
    const unmountEle = ReactDOM.unmountComponentAtNode(div);
    if (unmountEle && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    for (let i = 0; i < destroyList.length; i++) {
      const fn = destroyList[i];
      if (fn === close) {
        destroyList.splice(i, 1);
        break;
      }
    }
  }

  function onCancel(isOnOk?: boolean) {
    !isOnOk && config.onCancel && config.onCancel();
    modalConfig.visible = false;
    modalConfig.afterClose = () => {
      config.afterClose && config.afterClose();
      destroy();
    };
    renderFunction(modalConfig);
  }

  function update(newConfig: ConfirmProps) {
    modalConfig = {
      ...modalConfig,
      title: config.title, // 避免 newConfig 未传递 title 时，icon 出现多个的问题
      ...newConfig,
    };

    modalConfig = normalizeConfig(modalConfig);
    renderFunction(modalConfig);
  }

  function close() {
    modalConfig.visible = false;
    modalConfig.afterClose = () => {
      config.afterClose && config.afterClose();
      destroy();
    };
    renderFunction(modalConfig);
  }

  destroyList.push(close);

  return {
    close,
    update,
  };
}

export default confirm;

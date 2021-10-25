import React, { createRef, ReactElement } from 'react';
import ContextHolderElement, { HolderRef } from './contextHolder';
import HookModal, { HookModalRef } from './hookModal';
import { normalizeConfig, ConfirmProps } from '../confirm';
import { destroyList } from '../config';

type hookNodalFunction = (
  config: ConfirmProps
) => {
  close: () => void;
  update: (config: ConfirmProps) => void;
};

type modalFunctionsType = {
  confirm?: hookNodalFunction;
  info?: hookNodalFunction;
  success?: hookNodalFunction;
  warning?: hookNodalFunction;
  error?: hookNodalFunction;
};

function useModal(): [modalFunctionsType, ReactElement] {
  const contextHolderRef = createRef<HolderRef>();
  const holderEle = <ContextHolderElement ref={contextHolderRef} />;

  let uuid = 0;

  function addNewModal(config) {
    uuid += 1;
    const modalRef = createRef<HookModalRef>();

    function afterClose() {
      config.afterClose && config.afterClose();
      removeModalInstance();
    }

    const simpleModal = (
      <HookModal key={uuid} ref={modalRef} {...normalizeConfig(config)} afterClose={afterClose} />
    );

    contextHolderRef.current.addInstance(simpleModal);

    function removeModalInstance() {
      contextHolderRef.current.removeInstance(simpleModal);
    }

    function close() {
      modalRef.current.close();
    }

    destroyList.push(close);

    return {
      close,
      update: modalRef.current?.update,
    };
  }

  const modalFuncs: modalFunctionsType = {
    confirm: (config: ConfirmProps) => {
      return addNewModal({
        ...config,
      });
    },
  };

  ['info', 'success', 'warning', 'error'].forEach((type) => {
    modalFuncs[type] = (config: ConfirmProps) => {
      return addNewModal({
        ...config,
        isNotice: true,
        noticeType: type,
      });
    };
  });

  return [modalFuncs, holderEle];
}

export default useModal;

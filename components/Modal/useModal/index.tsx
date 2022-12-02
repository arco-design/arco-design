import React, { createRef, useRef, ReactElement } from 'react';
import ContextHolderElement, { HolderRef } from '../../_util/contextHolder';
import HookModal, { HookModalRef } from './hookModal';
import { normalizeConfig, ConfirmProps } from '../confirm';
import { destroyList } from '../config';

type hookNodalFunction = (config: ConfirmProps) => {
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
  const contextHolderRef = useRef<HolderRef>();
  const holderEle = <ContextHolderElement ref={contextHolderRef} />;

  let uuid = 0;

  function addNewModal(config) {
    uuid += 1;
    const modalRef = createRef<HookModalRef>();
    let currentConfig = { ...config };

    function afterClose() {
      config.afterClose && config.afterClose();
      removeModalInstance();
    }

    const modal = (
      <HookModal
        key={uuid}
        ref={modalRef}
        {...normalizeConfig({ ...config })}
        afterClose={afterClose}
      />
    );

    contextHolderRef.current?.addInstance(modal);

    function removeModalInstance() {
      contextHolderRef.current?.removeInstance(modal);
    }

    function close() {
      modalRef.current?.close();
    }

    function update(newConfig) {
      currentConfig = {
        ...currentConfig,
        ...newConfig,
      };
      modalRef.current?.update(normalizeConfig({ ...currentConfig }));
    }

    destroyList.push(close);

    return {
      close,
      update,
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

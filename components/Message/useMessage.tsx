import React, { createRef } from 'react';
import ContextHolderElement, { HolderRef } from '../_util/contextHolder';
import Message, { ConfigProps, MessageType } from '.';
import { MessageProps } from './interface';
import { isString } from '../_util/is';

type hookMessageFunc = (config: MessageProps | string) => MessageType;

export type messageFuncType = {
  info?: hookMessageFunc;
  success?: hookMessageFunc;
  warning?: hookMessageFunc;
  error?: hookMessageFunc;
  normal?: hookMessageFunc;
};

function useMessage(commonConfig: ConfigProps = {}): [messageFuncType, JSX.Element] {
  const { maxCount, duration = 3000, prefixCls: _prefixCls } = commonConfig;
  const contextHolderRef = createRef<HolderRef>();
  const holderEle = <ContextHolderElement ref={contextHolderRef} />;
  const messageInstance = {};
  let notice;

  function addNotice(config: MessageProps) {
    let prefixCls, rtl;
    if (contextHolderRef.current) {
      const contextConfig = contextHolderRef.current.getContextConfig();
      rtl = contextConfig.rtl;
      prefixCls = contextConfig.prefixCls;
    }
    const mergedPrefixCls = _prefixCls || prefixCls;
    const _noticeProps = {
      position: 'top',
      duration,
      ...config,
    };
    const { position, transitionClassNames } = _noticeProps;
    let id;
    if (messageInstance[position]) {
      const notices = messageInstance[position].state.notices;
      if (notices.length >= maxCount) {
        const updated = notices[0];
        id = updated.id;
        notices.shift();
        messageInstance[position].add({ ..._noticeProps, id });
      } else {
        id = messageInstance[position].add(_noticeProps);
      }
    } else {
      notice = (
        <Message
          transitionClassNames={transitionClassNames}
          ref={(instance) => {
            messageInstance[position] = instance;
            if (messageInstance[position]) {
              id = messageInstance[position].add(_noticeProps);
            }
          }}
          prefixCls={mergedPrefixCls}
          rtl={rtl}
        />
      );
      contextHolderRef.current.addInstance(notice);
    }

    const close = () => {
      if (messageInstance[position]) {
        messageInstance[position].remove(id);
      }
    };

    return close;
  }

  const messageFuncs: messageFuncType = {};

  ['info', 'success', 'warning', 'error', 'normal'].forEach((type) => {
    messageFuncs[type] = (config: MessageProps | string) => {
      const _config: MessageProps = isString(config) ? { content: config } : config;
      return addNotice({
        ..._config,
        type,
      });
    };
  });

  return [messageFuncs, holderEle];
}

export default useMessage;

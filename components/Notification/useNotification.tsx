import React, { createRef } from 'react';
import ContextHolderElement, { HolderRef } from '../_util/contextHolder';
import Notification, { ConfigProps } from '.';
import { NotificationProps, NotificationHookReturnType } from './interface';
import { isUndefined } from '../_util/is';

// @deprecated
export type notificationFuncType = NotificationHookReturnType;

function useNotification(
  commonConfig: ConfigProps = {}
): [NotificationHookReturnType, JSX.Element] {
  const { maxCount, duration = 3000, prefixCls: _prefixCls, getContainer } = commonConfig;
  const contextHolderRef = createRef<HolderRef>();
  const holderEle = <ContextHolderElement ref={contextHolderRef} />;
  const notificationInstance: { [key: string]: any } = {};
  let notice;

  function addNotice(noticeProps: NotificationProps) {
    let prefixCls, rtl;
    if (contextHolderRef.current) {
      const contextConfig = contextHolderRef.current.getContextConfig();
      rtl = contextConfig.rtl;
      prefixCls = contextConfig.prefixCls;
    }
    const mergedPrefixCls = _prefixCls || prefixCls;
    let position = noticeProps.position;
    if (isUndefined(noticeProps.position)) {
      position = rtl ? 'topLeft' : 'topRight';
    }
    const _noticeProps = {
      duration,
      ...noticeProps,
    };
    let id;
    const createInstanceProxy = (pos: string) => ({
      add: (props: NotificationProps) => notificationInstance[pos]?.add?.(props),
      remove: (targetId: string) => notificationInstance[pos]?.remove?.(targetId),
      clear: () => notificationInstance[pos]?.clear?.(),
    });

    if (notificationInstance[position]) {
      const notices = notificationInstance[position].state.notices;
      if (notices.length >= maxCount) {
        const updated = notices[0];
        id = updated.id;
        notices.shift();
        notificationInstance[position].add({ ..._noticeProps, id });
      } else {
        id = notificationInstance[position].add(_noticeProps);
      }
    } else {
      notice = (
        <Notification
          ref={(instance) => {
            notificationInstance[position] = instance;
            if (notificationInstance[position]) {
              id = notificationInstance[position].add(_noticeProps);
            }
          }}
          prefixCls={mergedPrefixCls}
          rtl={rtl}
          getContainer={getContainer}
        />
      );
      contextHolderRef.current.addInstance(notice);
    }
    // Always return a proxy object tied to the position so caller can call remove/clear
    return createInstanceProxy(position);
  }

  const notificationFuncs: NotificationHookReturnType = {};

  ['info', 'success', 'warning', 'error', 'normal'].forEach((type) => {
    notificationFuncs[type] = (config: NotificationProps) => {
      return addNotice({
        ...config,
        type,
      });
    };
  });

  // expose remove/clear on the returned api as well (iterate all positions)
  notificationFuncs.remove = (id: string) => {
    Object.values(notificationInstance).forEach((inst: any) => {
      inst?.remove?.(id);
    });
  };

  notificationFuncs.clear = () => {
    Object.values(notificationInstance).forEach((inst: any) => {
      inst?.clear?.();
    });
  };

  return [notificationFuncs, holderEle];
}

export default useNotification;

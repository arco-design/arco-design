import React, { ReactInstance } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createPortal } from 'react-dom';
import { render as ReactDOMRender } from '../_util/react-dom';
import BaseNotification from '../_class/notification';
import Notice from '../_class/notice';
import cs from '../_util/classNames';
import { isNumber, isUndefined } from '../_util/is';
import { NotificationProps, NotificationHookReturnType } from './interface';
import useNotification from './useNotification';

const notificationTypes = ['info', 'success', 'error', 'warning', 'normal'];

let notificationInstance: {
  [key in NotificationProps['position']]?: {
    instance?: Notification;
    pending?: Promise<null>;
  };
} = {};

export type ConfigProps = {
  maxCount?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  duration?: number;
  rtl?: boolean;
};

// global config
let maxCount;
let prefixCls;
let duration;
let container;
let rtl;

class Notification extends BaseNotification {
  static useNotification: (config?: ConfigProps) => [NotificationHookReturnType, JSX.Element];

  static success: (config: NotificationProps) => ReactInstance;

  static info: (config: NotificationProps) => ReactInstance;

  static warning: (config: NotificationProps) => ReactInstance;

  static error: (config: NotificationProps) => ReactInstance;

  static normal: (config: NotificationProps) => ReactInstance;

  static config = (options: ConfigProps = {}): void => {
    if (isNumber(options.maxCount)) {
      maxCount = options.maxCount;
    }
    if (options.prefixCls) {
      prefixCls = options.prefixCls;
    }
    if (isNumber(options.duration)) {
      duration = options.duration;
    }
    if (typeof options.rtl === 'boolean') {
      rtl = options.rtl;
    }
    if (options.getContainer && options.getContainer() !== container) {
      container = options.getContainer();
      Object.values(notificationInstance).forEach(({ instance: notice }) => notice?.clear());
      notificationInstance = {};
    }
  };

  static clear: () => void = () => {
    Object.values(notificationInstance).forEach(({ instance }) => {
      instance?.clear();
    });
  };

  static remove: (id: string) => void = (id: string) => {
    Object.values(notificationInstance).forEach(({ instance }) => {
      instance?.remove(id);
    });
  };

  static addInstance: (config: NotificationProps) => ReactInstance = (
    noticeProps: NotificationProps
  ) => {
    let position = noticeProps.position;
    if (isUndefined(noticeProps.position)) {
      position = rtl ? 'topLeft' : 'topRight';
    }
    const _noticeProps = {
      duration,
      ...noticeProps,
    };
    const { instance, pending } = notificationInstance[position] || {};
    if (instance || pending) {
      const add = () => {
        const { instance } = notificationInstance[position] || {};
        const notices = instance.state.notices;
        const updated = notices.find((notice) => notice.id === noticeProps.id);
        const _mergerProps = {
          ..._noticeProps,
          update: updated,
        };
        if (notices.length >= maxCount) {
          if (updated) {
            instance.add({
              ..._mergerProps,
              id: updated.id,
            });
          } else {
            notices.shift();
            instance.add(_mergerProps);
          }
        } else {
          instance.add({ ..._mergerProps });
        }
        return instance;
      };

      if (instance) {
        add();
      } else if (pending?.then) {
        pending.then(() => {
          add();
          notificationInstance[position].pending = null;
        });
      }
      return instance;
    }
    const div = document.createElement('div');

    (container || document.body).appendChild(div);
    notificationInstance[position] = {};
    notificationInstance[position].pending = new Promise((resolve) => {
      ReactDOMRender(
        <Notification
          ref={(instance) => {
            if (!notificationInstance[position]) {
              // getContainer 变化时，会重置 notificationInstance
              // pending 中的逻辑执行晚于重置逻辑时，这里需判空
              notificationInstance[position] = {};
            }
            notificationInstance[position].instance = instance;
            instance.add(_noticeProps);
            resolve(null);
            return instance;
          }}
        />,
        div
      );
    });
    return notificationInstance[position].instance;
  };

  remove = (id: string) => {
    const noticeItem = this.state.notices.find((item) => item.id === id);
    if (noticeItem) {
      this.update({ ...noticeItem, style: { ...noticeItem.style, opacity: 0 } });
    }

    // 200 是透明度动画结束的时间
    setTimeout(() => {
      super.remove(id);
    }, 200);
  };

  render() {
    const { notices } = this.state;
    const { prefixCls: _prefixCls, rtl: _rtl, getContainer } = this.props;
    let position = this.state.position;
    const mergedRtl = !isUndefined(_rtl) ? _rtl : rtl;
    if (isUndefined(position)) {
      position = mergedRtl ? 'topLeft' : 'topRight';
    }
    const mergedPrefixCls = _prefixCls || prefixCls;
    const prefixClsNotification = mergedPrefixCls
      ? `${mergedPrefixCls}-notification`
      : 'arco-notification';
    let transitionClass: string;
    if (position === 'topLeft' || position === 'bottomLeft') {
      transitionClass = 'slideNoticeLeft';
    } else {
      transitionClass = 'slideNoticeRight';
    }
    const classNames = cs(
      `${prefixClsNotification}-wrapper`,
      `${prefixClsNotification}-wrapper-${position}`,
      { [`${prefixClsNotification}-wrapper-rtl`]: rtl }
    );

    const container = getContainer?.();

    const dom = (
      <div className={classNames}>
        <TransitionGroup component={null}>
          {notices.map((notice) => (
            <CSSTransition
              key={notice.id}
              timeout={{
                enter: 400,
                exit: 300,
              }}
              classNames={transitionClass}
              onExit={(e) => {
                e.style.height = `${e.scrollHeight}px`;
              }}
              onExiting={(e) => {
                e.style.height = 0;
              }}
              onExited={(e) => {
                e.style.height = 0;
                notice.onClose && notice.onClose();
              }}
            >
              <Notice
                {...notice}
                onClose={this.remove}
                prefixCls={prefixClsNotification}
                iconPrefix={mergedPrefixCls}
                classPrefixCls={mergedPrefixCls}
                noticeType="notification"
                rtl={mergedRtl}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );

    return container ? createPortal(dom, container) : dom;
  }
}

notificationTypes.forEach((type) => {
  Notification[type] = (noticeProps: NotificationProps) => {
    return Notification.addInstance({
      ...noticeProps,
      type,
    });
  };
});

Notification.useNotification = useNotification;

export default Notification;

export { NotificationProps };

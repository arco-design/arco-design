import React, { ReactInstance } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { render as ReactDOMRender } from '../_util/react-dom';
import BaseNotification from '../_class/notification';
import Notice from '../_class/notice';
import cs from '../_util/classNames';
import { isNumber, isUndefined } from '../_util/is';
import { NotificationProps } from './interface';
import useNotification, { notificationFuncType } from './useNotification';

const notificationTypes = ['info', 'success', 'error', 'warning', 'normal'];
let notificationInstance: object = {};

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
  static useNotification: (config?: ConfigProps) => [notificationFuncType, JSX.Element];

  static success: (config: NotificationProps) => ReactInstance;

  static info: (config: NotificationProps) => ReactInstance;

  static warning: (config: NotificationProps) => ReactInstance;

  static error: (config: NotificationProps) => ReactInstance;

  static normal: (config: NotificationProps) => ReactInstance;

  static config = (options: ConfigProps = {}): void => {
    if (options.maxCount) {
      maxCount = options.maxCount;
    }
    if (options.prefixCls) {
      prefixCls = options.prefixCls;
    }
    if (isNumber(options.duration)) {
      duration = options.duration;
    }
    if (options.rtl) {
      rtl = options.rtl;
    }
    if (options.getContainer && options.getContainer() !== container) {
      container = options.getContainer();
      Object.keys(notificationInstance).forEach((notice) => notificationInstance[notice].clear());
      notificationInstance = {};
    }
  };

  static clear: () => void = () => {
    Object.keys(notificationInstance).forEach((ins) => {
      notificationInstance[ins].clear();
    });
  };

  static remove: (id: string) => void = (id: string) => {
    Object.keys(notificationInstance).forEach((ins) => {
      notificationInstance[ins].remove(id);
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
    if (notificationInstance[position]) {
      const notices = notificationInstance[position].state.notices;
      if (notices.length >= maxCount) {
        const updated = notices[0];
        notices.shift();
        notificationInstance[position].add({
          ..._noticeProps,
          id: updated.id,
        });
      } else {
        notificationInstance[position].add(_noticeProps);
      }
      return notificationInstance[position];
    }
    const div = document.createElement('div');
    let instance = null;
    (container || document.body).appendChild(div);
    ReactDOMRender(
      <Notification
        ref={(ref) => {
          notificationInstance[position] = ref;
          notificationInstance[position].add(_noticeProps);
          instance = notificationInstance[position];
          return instance;
        }}
      />,
      div
    );
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
    const { prefixCls: _prefixCls, rtl: _rtl } = this.props;
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

    return (
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
                noticeType="notification"
                rtl={mergedRtl}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
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

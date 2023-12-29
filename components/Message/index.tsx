import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { render } from '../_util/react-dom';
import BaseNotification from '../_class/notification';
import Notice from '../_class/notice';
import cs from '../_util/classNames';
import { MessageProps, MessageHookReturnType } from './interface';
import { isUndefined, isNumber } from '../_util/is';
import useMessage from './useMessage';

const messageTypes = ['info', 'success', 'error', 'warning', 'loading', 'normal'];
let messageInstance: {
  [key in MessageProps['position']]?: {
    instance?: Message;
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

let maxCount;
let prefixCls;
let duration;
let container;
let rtl;

export interface MessageType {
  (): void;
}

function addInstance(noticeProps: MessageProps) {
  const _noticeProps: MessageProps = {
    position: 'top',
    duration,
    ...noticeProps,
  };
  const { position, transitionClassNames, transitionTimeout } = _noticeProps;
  let id;

  const { instance, pending } = messageInstance[position] || {};
  if (instance || pending) {
    const add = () => {
      const { instance } = messageInstance[position] || {};
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
        id = instance.add(_mergerProps);
      }
    };

    if (instance) {
      add();
    } else if (pending?.then) {
      pending.then(() => {
        add();
        messageInstance[position].pending = null;
      });
    }
  } else {
    const div = document.createElement('div');
    (container || document.body).appendChild(div);

    messageInstance[position] = {};

    messageInstance[position].pending = new Promise((resolve) => {
      render(
        <Message
          transitionClassNames={transitionClassNames}
          transitionTimeout={transitionTimeout}
          ref={(instance) => {
            if (!messageInstance[position]) {
              // getContainer 变化时，会重置 messageInstance
              // pending 中的逻辑执行晚于重置逻辑时，这里需判空
              messageInstance[position] = {};
            }
            messageInstance[position].instance = instance;
            id = instance.add(_noticeProps);
            resolve(null);
          }}
        />,
        div
      );
    });
  }

  const result = () => {
    messageInstance[position]?.instance?.remove(id);
  };

  return result;
}

class Message extends BaseNotification {
  static useMessage: (config?: ConfigProps) => [MessageHookReturnType, JSX.Element];

  static success: (config: MessageProps | string) => MessageType;

  static info: (config: MessageProps | string) => MessageType;

  static warning: (config: MessageProps | string) => MessageType;

  static error: (config: MessageProps | string) => MessageType;

  static loading: (config: MessageProps | string) => MessageType;

  static normal: (config: MessageProps | string) => MessageType;

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
      Object.values(messageInstance).forEach(({ instance }) => instance?.clear());
      messageInstance = {};
    }
  };

  static clear: () => void = () => {
    Object.values(messageInstance).forEach(({ instance }) => {
      instance?.clear();
    });
  };

  static addInstance = addInstance;

  remove = (id: string) => {
    const noticeItem = this.state.notices.find((item) => item.id === id);
    if (noticeItem) {
      this.update({
        ...noticeItem,
        style: { ...noticeItem.style, opacity: 0 },
      });
    }

    // 100 是透明度动画结束的时间
    setTimeout(() => {
      super.remove(id);
    }, 100);
  };

  render() {
    const {
      transitionClassNames,
      transitionTimeout: _transitionTimeout,
      prefixCls: _prefixCls,
      rtl: _rtl,
    } = this.props;
    const { notices, position } = this.state;
    const mergedPrefixCls = _prefixCls || prefixCls;
    const mergedRtl = !isUndefined(_rtl) ? _rtl : rtl;
    const prefixClsMessage = mergedPrefixCls ? `${mergedPrefixCls}-message` : 'arco-message';
    const transitionTimeout = {
      enter: isNumber(_transitionTimeout?.enter) ? _transitionTimeout?.enter : 100,
      exit: isNumber(_transitionTimeout?.exit) ? _transitionTimeout?.exit : 300,
    };

    const classNames = cs(`${prefixClsMessage}-wrapper`, `${prefixClsMessage}-wrapper-${position}`);
    return (
      <div className={classNames}>
        <TransitionGroup component={null}>
          {notices.map((notice) => (
            <CSSTransition
              key={notice.id}
              timeout={transitionTimeout}
              classNames={transitionClassNames || `fadeMessage`}
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
                prefixCls={prefixClsMessage}
                classPrefixCls={mergedPrefixCls}
                iconPrefix={mergedPrefixCls}
                onClose={this.remove}
                noticeType="message"
                rtl={mergedRtl}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

messageTypes.forEach((type) => {
  Message[type] = (noticeProps: MessageProps | string) => {
    const props = typeof noticeProps === 'string' ? { content: noticeProps } : noticeProps;
    return addInstance({
      ...props,
      type,
    });
  };
});

Message.useMessage = useMessage;

export default Message;

export { MessageProps };

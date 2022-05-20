import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BaseNotification from '../_class/notification';
import Notice from '../_class/notice';
import cs from '../_util/classNames';
import { MessageProps } from './interface';

const messageTypes = ['info', 'success', 'error', 'warning', 'loading', 'normal'];
let messageInstance: object = {};

type ConfigProps = {
  maxCount?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  duration?: number;
};

let maxCount;
let prefixCls;
let duration;
let container;

export interface MessageType {
  (): void;
}

function addInstance(noticeProps: MessageProps) {
  const _noticeProps = {
    position: 'top',
    duration,
    ...noticeProps,
  };
  const { position, transitionClassNames } = _noticeProps;
  let id;
  if (messageInstance[position]) {
    const notices = messageInstance[position].state.notices;
    if (notices.length >= maxCount) {
      const updated = notices[0];
      id = updated.id;
      notices.shift();
      messageInstance[position].add({
        ..._noticeProps,
        id,
      });
    } else {
      id = messageInstance[position].add(_noticeProps);
    }
  } else {
    const div = document.createElement('div');
    (container || document.body).appendChild(div);

    ReactDOM.render(
      <Message
        transitionClassNames={transitionClassNames}
        ref={(instance) => {
          messageInstance[position] = instance;
          id = messageInstance[position].add(_noticeProps);
        }}
      />,
      div
    );
  }

  const result = () => {
    if (messageInstance[position]) {
      messageInstance[position].remove(id);
    }
  };

  return result;
}

class Message extends BaseNotification {
  static success: (config: MessageProps | string) => MessageType;

  static info: (config: MessageProps | string) => MessageType;

  static warning: (config: MessageProps | string) => MessageType;

  static error: (config: MessageProps | string) => MessageType;

  static loading: (config: MessageProps | string) => MessageType;

  static normal: (config: MessageProps | string) => MessageType;

  static config = (options: ConfigProps = {}): void => {
    if (options.maxCount) {
      maxCount = options.maxCount;
    }
    if (options.prefixCls) {
      prefixCls = options.prefixCls;
    }
    if (options.duration) {
      duration = options.duration;
    }
    if (options.getContainer && options.getContainer() !== container) {
      container = options.getContainer();
      Object.keys(messageInstance).forEach((notice) => messageInstance[notice].clear());
      messageInstance = {};
    }
  };

  static clear: () => void = () => {
    Object.keys(messageInstance).forEach((ins) => {
      messageInstance[ins].clear();
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
    const { transitionClassNames } = this.props;
    const { notices, position } = this.state;
    const prefixClsMessage = prefixCls ? `${prefixCls}-message` : 'arco-message';

    const classNames = cs(`${prefixClsMessage}-wrapper`, `${prefixClsMessage}-wrapper-${position}`);

    return (
      <div className={classNames}>
        <TransitionGroup component={null}>
          {notices.map((notice) => (
            <CSSTransition
              key={notice.id}
              timeout={{
                enter: 100,
                exit: 300,
              }}
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
                iconPrefix={prefixCls}
                onClose={this.remove}
                noticeType="message"
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

export default Message;

export { MessageProps };

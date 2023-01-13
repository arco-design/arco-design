import React, { Component, ReactNode, CSSProperties } from 'react';
import IconClose from '../../icon/react-icon/IconClose';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import IconInfoCircleFill from '../../icon/react-icon/IconInfoCircleFill';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import IconLoading from '../../icon/react-icon/IconLoading';
import cs from '../_util/classNames';
import IconHover from '../_class/icon-hover';
import { IconContext } from '../../icon/react-icon/context';

export interface NoticeProps {
  style?: CSSProperties;
  className?: string;
  title?: ReactNode | string;
  content?: ReactNode | string;
  duration?: number;
  showIcon?: boolean;
  icon?: ReactNode;
  id?: string;
  onClose?: (id) => void;
  position?: string;
  type?: string;
  btn?: ReactNode;
  prefixCls?: string;
  iconPrefix?: string;
  noticeType?: 'message' | 'notification';
  update?: boolean;
  closable?: boolean;
  rtl?: boolean;
}

class Notice extends Component<NoticeProps, {}> {
  static defaultProps = {
    type: 'info',
    showIcon: true,
    noticeType: 'message',
    duration: 3000,
  };

  wrapper: Element;

  timer: any;

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.duration !== this.props.duration || this.props.update) {
      this.removeTimer();
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.removeTimer();
  }

  startTimer = () => {
    const { duration, onClose, id } = this.props;
    // 自动关闭
    if (duration !== 0) {
      this.timer = window.setTimeout(() => {
        onClose && onClose(id);
        this.removeTimer();
      }, duration);
    }
  };

  removeTimer = () => {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  };

  onClose: React.MouseEventHandler<HTMLSpanElement> = () => {
    this.props.onClose && this.props.onClose(this.props.id);
  };

  renderIcon = () => {
    const { showIcon, icon, type, prefixCls, iconPrefix } = this.props;
    let content: ReactNode;
    if (icon) {
      content = icon;
    } else if (showIcon) {
      switch (type) {
        case 'info':
          content = <IconInfoCircleFill />;
          break;
        case 'success':
          content = <IconCheckCircleFill />;
          break;
        case 'error':
          content = <IconCloseCircleFill />;
          break;
        case 'warning':
          content = <IconExclamationCircleFill />;
          break;
        case 'loading':
          content = <IconLoading />;
          break;
        default:
          break;
      }
      content = (
        <IconContext.Provider value={iconPrefix ? { prefixCls: iconPrefix } : {}}>
          {content}
        </IconContext.Provider>
      );
    }
    return <span className={`${prefixCls}-icon`}>{content}</span>;
  };

  onMouseEnter = () => {
    this.removeTimer();
  };

  onMouseLeave = () => {
    // An update operation may be triggered after mouseEnter to start a new timer.
    // mouseEnter(clear) => clickBtn => update(new timer) => mouseLeave
    this.removeTimer();
    this.startTimer();
  };

  render() {
    const {
      title,
      content,
      showIcon,
      className,
      style,
      type,
      btn,
      icon,
      prefixCls,
      closable,
      noticeType,
      iconPrefix,
      rtl,
    } = this.props;
    const classNames = cs(
      prefixCls,
      `${prefixCls}-${type}`,
      {
        [`${prefixCls}-closable`]: closable,
        [`${prefixCls}-rtl`]: rtl,
      },
      className
    );

    let _closable = 'closable' in this.props ? closable : true;

    let shouldRenderIcon = showIcon;
    if (type === 'normal' && !icon) {
      shouldRenderIcon = false;
    }

    if (noticeType === 'message') {
      _closable = closable;
      return (
        <div
          style={{ textAlign: 'center' }}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <div className={classNames} style={style} role="alert">
            {shouldRenderIcon && this.renderIcon()}
            <span className={`${prefixCls}-content`}>{content}</span>
            {_closable && (
              <IconHover
                prefix={prefixCls}
                className={`${prefixCls}-close-btn`}
                onClick={this.onClose}
              >
                <IconClose />
              </IconHover>
            )}
          </div>
        </div>
      );
    }

    if (noticeType === 'notification') {
      return (
        <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <div className={classNames} style={style} role="alert">
            {shouldRenderIcon && <div className={`${prefixCls}-left`}>{this.renderIcon()}</div>}
            <div className={`${prefixCls}-right`}>
              {title && <div className={`${prefixCls}-title`}>{title}</div>}
              <div className={`${prefixCls}-content`}>{content}</div>
              {btn && <div className={`${prefixCls}-btn-wrapper`}>{btn}</div>}
            </div>
            {_closable && (
              <IconHover
                prefix={prefixCls}
                className={`${prefixCls}-close-btn`}
                onClick={this.onClose}
              >
                <IconContext.Provider value={iconPrefix ? { prefixCls: iconPrefix } : {}}>
                  <IconClose />
                </IconContext.Provider>
              </IconHover>
            )}
          </div>
        </div>
      );
    }
  }
}

export default Notice;

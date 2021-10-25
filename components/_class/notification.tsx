/* eslint-disable react/no-unused-state */
import { Component } from 'react';

function getId(noticeProps) {
  if (noticeProps.id) {
    return noticeProps.id;
  }
  return `arco_notice_id_${Date.now()}`;
}

interface BaseNoticeState {
  notices: { [key: string]: any }[];
  position?: string;
}

class BaseNotice extends Component<any, BaseNoticeState> {
  constructor(props) {
    super(props);

    this.state = {
      notices: [],
      position: 'topRight',
    };
    this.remove = this.remove.bind(this);
  }

  add = (noticeProps) => {
    const oldNotices = this.state.notices;
    // update notice
    if (noticeProps.id && ~oldNotices.findIndex((notice) => notice.id === noticeProps.id)) {
      this.update(noticeProps);
      return noticeProps.id;
    }
    const id: string = getId(noticeProps);
    const newNotices = oldNotices.concat({
      ...noticeProps,
      id,
    });
    this.setState({
      notices: newNotices,
      position: noticeProps.position,
    });
    return id;
  };

  update = (newNotice) => {
    const updatedNotices = this.state.notices.map((oldNotice) => {
      if (newNotice.id === oldNotice.id) {
        newNotice.update = true;
        return newNotice;
      }
      return oldNotice;
    });
    this.setState(
      {
        notices: updatedNotices,
      },
      () => {
        const notices = this.state.notices.map((oldNotice) => {
          if (newNotice.id === oldNotice.id && oldNotice.update) {
            delete oldNotice.update;
          }
          return oldNotice;
        });
        this.setState({ notices });
      }
    );
  };

  remove(id: string) {
    const newNotices = this.state.notices.filter((notice) => notice.id !== id);
    this.setState({
      notices: newNotices,
    });
  }

  clear = () => {
    this.setState({
      notices: [],
    });
  };
}

export default BaseNotice;

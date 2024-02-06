/* eslint-disable react/no-unused-state */
import { Component } from 'react';

function getId(noticeProps) {
  if (noticeProps?.id) {
    return noticeProps?.id;
  }
  return `arco_notice_id_${Math.random().toFixed(10).slice(2)}`;
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
    const id: string = getId(noticeProps);

    const oldNotices = this.state.notices;

    // update notice
    if (noticeProps.id && ~oldNotices.findIndex((notice) => notice.id === noticeProps.id)) {
      this.update(noticeProps);
    } else {
      this.setState((prevState) => {
        return {
          notices: prevState.notices.concat({
            ...noticeProps,
            id,
          }),
          position: noticeProps.position,
        };
      });
    }

    return id;
  };

  update = (newNotice) => {
    const updatedNotices = this.state.notices.map((oldNotice) =>
      newNotice.id === oldNotice.id ? newNotice : oldNotice
    );

    this.setState(
      {
        notices: updatedNotices,
      },
      () => {
        const notices = updatedNotices.map((notice) => {
          if (newNotice.id === notice.id) delete notice.update;
          return notice;
        });
        this.setState({ notices });
      }
    );
  };

  remove(id: string) {
    this.setState((state) => {
      const newNotices = state.notices.filter((notice) => notice.id !== id);

      return {
        notices: newNotices,
      };
    });
  }

  clear = () => {
    this.setState({
      notices: [],
    });
  };
}

export default BaseNotice;

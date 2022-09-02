import axios from 'axios';
import { Message } from '@arco-design/web-react';

const chat = (link) => {
  const aLink = document.createElement('a');
  aLink.href = link;
  aLink.click();
};

function joinChat() {
  if (!window.user) {
    Message.error({ content: '请先登陆' });
    return;
  }
  axios
    .get(`//arco.design/api/oncall/joinChat?email=${window.user.email}`)
    .then((res) => {
      if (res.data.status === 'success') {
        chat('lark://client/chat/6659915789467910412');
      }
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line
      Message.error({ content: '未知错误，请重试！' });
    });
}

const chatWithOpenIdFactory = (openId) => () =>
  chat(`lark://applink.feishu.cn/client/chat/open?openId=${openId}`);

export default joinChat;
export { chatWithOpenIdFactory };

import React from 'react';
import { render, $, sleep } from '../../../tests/util';
import Notification from '..';
import Notice from '../../_class/notice';
import { IconMessage } from '../../../icon';

it('render correctly', () => {
  const notification = render(
    <div>
      <Notice type="info" content="Info Content" prefixCls="arco-notification" />
      <Notice type="success" content="Success Content" prefixCls="arco-notification" />
      <Notice type="warning" content="Warning Content" prefixCls="arco-notification" />
      <Notice type="error" content="Error Content" prefixCls="arco-notification" />
      <Notice type="Normal" content="Normal Content" prefixCls="arco-notification" />
      <Notice
        type="Normal"
        content="Normal Content"
        icon={<IconMessage />}
        prefixCls="arco-notification"
      />
    </div>
  );
  expect(notification.container.firstChild).toMatchSnapshot();
});

describe('open message', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    Notification.clear();
    jest.runAllTimers();
  });

  it('Open message number and icon type, title, content correct', () => {
    Notification.info({
      title: 'Title',
      content: 'Content',
    });
    expect($('.arco-notification').length).toBe(1);
    expect($('.arco-notification .arco-notification-icon .arco-icon-info-circle-fill').length).toBe(
      1
    );
    expect($('.arco-notification .arco-notification-title')[0].innerHTML).toBe('Title');
    expect($('.arco-notification .arco-notification-content')[0].innerHTML).toBe('Content');
    jest.runAllTimers();
    Notification.info({
      content: 'Content',
      showIcon: false,
    });
    expect($('.arco-notification').length).toBe(1);
    expect($('.arco-notification .arco-notification-icon .arco-icon-info-circle-fill').length).toBe(
      0
    );
  });

  it('Muti instances number correct', () => {
    const number = 5;
    for (let i = 0; i < number; i++) {
      Notification.info({
        content: 'Content',
      });
    }
    expect($('.arco-notification').length).toBe(number);
  });

  it('Different position correct', () => {
    (['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).forEach((position) => {
      Notification.info({
        content: 'Content',
        position,
      });
      expect($(`.arco-notification-wrapper-${position} .arco-notification`).length).toBe(1);
    });
  });

  it('update old notification', () => {
    Notification.info({
      content: 'Old Content',
      id: 'update',
    });
    Notification.info({
      content: 'New Content',
      id: 'update',
    });
    expect($('.arco-notification .arco-notification-content')[0].innerHTML).toBe('New Content');
  });

  // it('close notification manually', () => {
  //   Notification.info({
  //     content: 'Content',
  //   });
  //   expect($('.arco-notification').length).toBe(1);
  //   $('.arco-notification .close')[0].simulate('click');
  //   jest.runAllTimers();
  //   expect($('.arco-notification').length).toBe(0);
  // });

  it('notice icon prefix', () => {
    Notification.config({
      prefixCls: 'aaa',
    });
    Notification.success({
      content: 'New Content',
    });

    expect($('.aaa-notification')).toHaveLength(1);

    expect($('.aaa-icon-check-circle-fill')).toHaveLength(1);

    Notification.config({
      prefixCls: 'arco',
    });
  });

  it('closable=false', () => {
    Notification.info({
      content: 'closable=false',
      id: 'update',
      closable: false,
      closeIcon: 'xxx',
    });
    expect($('.arco-notification-close-btn').length).toBe(0);
  });

  it('closeicon=xxx', () => {
    Notification.info({
      content: 'closeicon=xxx',
      id: 'update',
      closable: true,
      closeIcon: 'xxx',
    });

    expect($('.arco-notification-close-btn').length).toBe(1);
    expect($('.arco-notification-close-btn').item(0).textContent).toBe('xxx');
  });

  it('update when maxCount', async () => {
    jest.useRealTimers();

    Notification.config({ maxCount: 2, duration: 0 });

    Notification.info({ content: 'content1' });

    Notification.info({ id: 'update', content: 'content update 1' });

    Notification.info({ id: 'update', content: 'content update 2' });

    expect($('.arco-notification').length).toBe(2);
    expect($('.arco-notification .arco-notification-content')[0].innerHTML).toBe('content1');
    expect($('.arco-notification .arco-notification-content')[1].innerHTML).toBe(
      'content update 2'
    );

    Notification.info({ content: 'content 2' });

    await sleep(1000);

    expect($('.arco-notification').length).toBe(2);
    expect($('.arco-notification .arco-notification-content')[0].innerHTML).toBe(
      'content update 2'
    );
    expect($('.arco-notification .arco-notification-content')[1].innerHTML).toBe('content 2');

    Notification.info({ id: 'update', content: 'content update 3' });

    expect($('.arco-notification').length).toBe(2);
    expect($('.arco-notification .arco-notification-content')[0].innerHTML).toBe(
      'content update 3'
    );
    expect($('.arco-notification .arco-notification-content')[1].innerHTML).toBe('content 2');
  });
});

import React from 'react';
import { render, $, sleep } from '../../../tests/util';
import Message from '..';
import Notice from '../../_class/notice';
import { IconMessage } from '../../../icon';

it('render correctly', () => {
  const message = render(
    <div>
      <Notice type="info" content="Info type" prefixCls="arco-message" />
      <Notice type="success" content="Success type" prefixCls="arco-message" />
      <Notice type="warning" content="Warning type" prefixCls="arco-message" />
      <Notice type="error" content="Error type" prefixCls="arco-message" />
      <Notice type="normal" content="Normal type" prefixCls="arco-message" />
      <Notice type="normal" content="Custom icon" icon={<IconMessage />} prefixCls="arco-message" />
    </div>
  );
  expect(message.container.firstChild).toMatchSnapshot();
});

describe('open message', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    Message.clear();
    jest.runAllTimers();
  });

  it('Open message number and icon type, content correct', () => {
    Message.info({
      content: 'Content',
    });
    expect($('.arco-message').length).toBe(1);
    expect($('.arco-message .arco-message-icon .arco-icon-info-circle-fill').length).toBe(1);
    expect($('.arco-message .arco-message-content')[0].innerHTML).toBe('Content');
    jest.runAllTimers();
    Message.info({
      content: 'Content',
      showIcon: false,
    });
    expect($('.arco-message').length).toBe(1);
    expect($('.arco-message .arco-message-icon .arco-icon-info-circle-fill').length).toBe(0);
  });

  it('Muti instances number correct', () => {
    const number = 5;
    for (let i = 0; i < number; i++) {
      Message.info({
        content: 'Content',
      });
    }
    expect($('.arco-message').length).toBe(number);
  });

  it('Different position correct', () => {
    (['top', 'bottom'] as const).forEach((position) => {
      Message.info({
        content: 'Content',
        position,
      });
      expect($(`.arco-message-wrapper-${position} .arco-message`).length).toBe(1);
    });
  });

  it('notice icon prefix', () => {
    Message.config({
      prefixCls: 'aaa',
    });
    Message.success({
      content: 'New Content',
    });

    expect($('.aaa-message')).toHaveLength(1);

    expect($('.aaa-icon-check-circle-fill')).toHaveLength(1);

    Message.config({
      prefixCls: 'arco',
    });
  });

  it('closable=false', () => {
    Message.info({
      content: 'closable=false',
      closable: false,
      closeIcon: 'xxx',
    });
    expect($('.arco-message-close-btn').length).toBe(0);
  });

  it('closeicon=xxx', () => {
    Message.info({
      content: 'closeicon=xxx',
      closable: true,
      closeIcon: 'xxx',
    });

    expect($('.arco-message-close-btn').length).toBe(1);
    expect($('.arco-message-close-btn').item(0).textContent).toBe('xxx');
  });

  it('update when maxCount', async () => {
    jest.useRealTimers();

    Message.config({ maxCount: 2, duration: 0 });

    Message.info('content1');

    Message.info({ id: 'update', content: 'content update 1' });

    Message.info({ id: 'update', content: 'content update 2' });

    expect($('.arco-message').length).toBe(2);
    expect($('.arco-message .arco-message-content')[0].innerHTML).toBe('content1');
    expect($('.arco-message .arco-message-content')[1].innerHTML).toBe('content update 2');

    Message.info('content 2');

    await sleep(1000);

    expect($('.arco-message').length).toBe(2);
    expect($('.arco-message .arco-message-content')[0].innerHTML).toBe('content update 2');
    expect($('.arco-message .arco-message-content')[1].innerHTML).toBe('content 2');

    Message.info({ id: 'update', content: 'content update 3' });

    expect($('.arco-message').length).toBe(2);
    expect($('.arco-message .arco-message-content')[0].innerHTML).toBe('content update 3');
    expect($('.arco-message .arco-message-content')[1].innerHTML).toBe('content 2');
  });
});

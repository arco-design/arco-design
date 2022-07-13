import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Comment from '..';
import Avatar from '../../Avatar';
import Button from '../../Button';

mountTest(Comment);
componentConfigTest(Comment, 'Comment');

describe('Comment', () => {
  it('render basic Comment', () => {
    const actions = new Array(5).fill(5).map((_, index) => (
      <Button key={index} className="customer-actions">
        {index}
      </Button>
    ));
    const wrapper = render(
      <Comment
        actions={actions}
        author="Socrates"
        avatar={
          <Avatar>
            <img
              alt="avatar"
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ee428f1389b4291b1f9bbd82b24105d~tplv-uwbnlip3yd-image.image"
            />
          </Avatar>
        }
        content={<div>Comment body content.</div>}
        datetime="1 hour"
      />
    );
    expect(wrapper.find('.arco-avatar')).toHaveLength(1);
    expect(wrapper.find('.arco-comment-actions')[0].querySelectorAll('.arco-btn')).toHaveLength(5);
    expect(wrapper.find('.arco-comment-datetime')[0].innerHTML).toEqual('1 hour');
    expect(wrapper.find('.arco-comment-content')[0].textContent).toEqual('Comment body content.');
  });

  it('render align right actions', () => {
    const wrapper = render(
      <Comment
        actions={[<Button key={1}>actions</Button>]}
        content={<div>Comment body content.</div>}
        datetime="1 hour"
      />
    );
    expect(wrapper.find('.arco-comment-actions')[0].className).toContain(
      'arco-comment-actions-align-left'
    );

    expect(wrapper.find('.arco-comment-title')[0].className).toContain(
      'arco-comment-title-align-left'
    );

    wrapper.rerender(
      <Comment
        actions={[<Button key={1}>actions</Button>]}
        content={<div>Comment body content.</div>}
        datetime="1 hour"
        align={{ datetime: 'right' }}
      />
    );

    expect(wrapper.find('.arco-comment-title-align-right')).toHaveLength(1);

    wrapper.rerender(
      <Comment
        actions={[<Button key={1}>actions</Button>]}
        content={<div>Comment body content.</div>}
        datetime="1 hour"
        align="right"
      />
    );

    expect(wrapper.find('.arco-comment-actions-align-right')).toHaveLength(1);
  });

  it('render children Node correctly', () => {
    const wrapper = render(
      <Comment>
        <Comment>
          <Comment />
        </Comment>
      </Comment>
    );
    expect(wrapper.find('.arco-comment-inner-content')).toHaveLength(3);
  });
});

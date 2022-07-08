import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Timeline from '..';

const TimelineItem = Timeline.Item;

mountTest(Timeline);
componentConfigTest(Timeline, 'Timeline');
componentConfigTest(Timeline.Item, 'Timeline.Item');

describe('Timeline', () => {
  it('Prop horizontal & reverse works', () => {
    const wrapper = render(
      <Timeline direction="horizontal" reverse>
        <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
        <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
        <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
      </Timeline>
    );

    expect(wrapper.find('.arco-timeline').item(0).className).toContain(
      'arco-timeline-direction-horizontal'
    );

    expect(wrapper.find('.arco-timeline-item-content').item(0).innerHTML).toBe(
      'The third milestone'
    );
  });

  it('Ignore invalid child', () => {
    const wrapper = render(
      <Timeline>
        <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
        <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
        <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
        <div>hello world</div>
      </Timeline>
    );

    expect(wrapper.find('.arco-timeline-item')).toHaveLength(3);
  });

  it('Pending status', () => {
    const wrapper = render(
      <Timeline pending>
        <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
        <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
        <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
      </Timeline>
    );

    expect(
      wrapper.find('.arco-timeline-item .arco-timeline-item-dot-line').item(2).style.borderLeftStyle
    ).toBe('dashed');
  });
});

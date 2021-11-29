import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Timeline from '..';

const TimelineItem = Timeline.Item;

mountTest(Timeline);
componentConfigTest(Timeline, 'Timeline');

let wrapper = null;

describe('Timeline', () => {
  beforeEach(() => {
    wrapper && wrapper.unmount();
  });

  it('Prop horizontal & reverse works', () => {
    wrapper = mount(
      <Timeline direction="horizontal" reverse>
        <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
        <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
        <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
      </Timeline>
    );

    expect(
      wrapper
        .find('.arco-timeline')
        .at(0)
        .prop('className')
        .indexOf('arco-timeline-direction-horizontal') > -1
    ).toBe(true);

    expect(wrapper.find('.arco-timeline-item-content').at(0).text()).toBe('The third milestone');
  });

  it('Ignore invalid child', () => {
    wrapper = mount(
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
    wrapper = mount(
      <Timeline pending>
        <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
        <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
        <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
      </Timeline>
    );

    expect(
      wrapper.find('.arco-timeline-item .arco-timeline-item-dot-line').at(2).prop('style')
        .borderLeftStyle
    ).toBe('dashed');
  });
});

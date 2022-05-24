import React from 'react';
import { Timeline } from '@self';
import { IconPublic } from '@self/icon';

const TimelineItem = Timeline.Item;

export const Demo = () => (
  <div style={{ width: 500 }}>
    <Timeline>
      <TimelineItem label="2018-05-12">TopBuzz launched for international markets</TimelineItem>
      <TimelineItem label="2018-04-10">BuzzVideo launched for international markets</TimelineItem>
      <TimelineItem label="2019-04-09">Invested in Dailyhunt in India</TimelineItem>
    </Timeline>

    <Timeline>
      <TimelineItem label="2018-05-12" dotColor="#52C419">
        TopBuzz launched for international markets
      </TimelineItem>
      <TimelineItem label="2018-04-10" dotColor="#F5222D">
        BuzzVideo launched for international markets
      </TimelineItem>
      <TimelineItem label="2019-04-09">Invested in Dailyhunt in India</TimelineItem>
    </Timeline>

    <Timeline>
      <TimelineItem label="2018-05-12" dotColor="#52C419">
        TopBuzz launched for international markets
      </TimelineItem>
      <TimelineItem label="2018-04-10" dotColor="#F5222D">
        BuzzVideo launched for international markets
      </TimelineItem>
      <TimelineItem label="2019-04-09" dot={<IconPublic style={{ fontSize: 30 }} />}>
        Invested in Dailyhunt in India
      </TimelineItem>
    </Timeline>

    <Timeline>
      <TimelineItem label="2018-05-12" dotColor="#52C419" lineType="dashed">
        TopBuzz launched for international markets
        <div style={{ fontSize: 12, color: '#39424E', marginTop: 8 }}>
          ByteDance is a technology company operating a range of content platforms that inform
        </div>
      </TimelineItem>
      <TimelineItem label="2018-04-10" dotColor="#F5222D" lineType="dashed">
        BuzzVideo launched for international markets
      </TimelineItem>
      <TimelineItem label="2019-04-09" lineType="dashed">
        Invested in Dailyhunt in India
      </TimelineItem>
    </Timeline>
  </div>
);

export default {
  title: 'Timeline',
};

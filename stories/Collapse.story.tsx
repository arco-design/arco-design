import React from 'react';
import { Collapse } from '@self';

const CollapseItem = Collapse.Item;

const props = {
  style: {
    background: '#f5f5f7',
    marginBottom: '10px',
  },
  className: 'customClass',
};

export const Demo = () => (
  <Collapse defaultActiveKey={['1', '2']} style={{ border: 'none' }}>
    <CollapseItem header="琼恩·雪诺" name="1" {...props}>
      艾德公爵的私生儿子，与罗柏·史塔克同龄，兄弟关系亲密无间。其母身份不明，艾德公爵拒绝向任何人透露——有人传说那是南方某家族的一位贵族小姐，也有人说是一个寻常的使女。
    </CollapseItem>
    <CollapseItem header="丹尼莉丝·坦格利安" name="2" {...props}>
      坦格利安王朝的末代君王伊里斯·坦格利安二世的幼女，银发紫眼，美貌异于常人。丹妮莉丝出生时一场剧烈的风暴袭击了龙石岛，“风暴降生”因此得名。
    </CollapseItem>
    <CollapseItem header="提利昂·兰尼斯特" name="3" {...props}>
      泰温公爵和乔安娜夫人的第三个也是最小的孩子。因为是个侏儒，他有时候被戏称为小恶魔和半人。他利用自己的智慧屡次化险为夷，帮助兰尼斯特家族赢得了五王之战，但命运的不公使得他成为了一个弑亲者和通缉犯，踏上了流亡之路。
    </CollapseItem>
    <CollapseItem header="瑟曦·兰尼斯特·拜拉席恩" name="4" {...props}>
      泰溫公爵和喬安娜夫人的長女，是詹姆·蘭尼斯特的孿生姐姐。在篡奪者戰爭之後她嫁給了新王勞勃·拜拉席恩，成為七大王國的王后。
    </CollapseItem>
  </Collapse>
);

export default {
  title: 'Collapse',
};
